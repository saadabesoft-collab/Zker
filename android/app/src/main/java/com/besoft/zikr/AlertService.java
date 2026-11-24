package com.besoft.zikr;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ServiceInfo;
import android.content.res.AssetFileDescriptor;
import android.media.AudioAttributes;
import android.media.MediaPlayer;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.provider.Settings;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;

import androidx.core.app.NotificationCompat;
import androidx.core.app.ServiceCompat;

import org.json.JSONObject;

import java.util.Locale;

/**
 * Shows one reminder: posts the notification, opens the pop-up over other apps,
 * and plays its sound (the adhan, or the reminder text read aloud in Arabic).
 */
public class AlertService extends Service {
    static final String ACTION_ALERT = "com.besoft.zikr.ALERT";
    static final String ACTION_STOP = "com.besoft.zikr.STOP";
    static final String CH_MAIN = "zikr_alerts_v1";
    static final String CH_SOFT = "zikr_soft_v1";

    private final Handler handler = new Handler(Looper.getMainLooper());
    private TextToSpeech tts;
    private boolean ttsReady;
    private boolean ttsInitDone;
    private MediaPlayer player;
    private JSONObject current;
    private String pendingSpeech;
    private AudioAttributes pendingAttrs;
    private Runnable timeout;

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent == null) {
            stopSelf();
            return START_NOT_STICKY;
        }
        String action = intent.getAction();
        if (ACTION_STOP.equals(action)) {
            int id = intent.getIntExtra("id", 0);
            if (current != null && (id == 0 || current.optInt("id") == id)) finishCurrent();
            else if (current == null) stopSelf();
            return START_NOT_STICKY;
        }
        if (ACTION_ALERT.equals(action)) {
            try {
                JSONObject it = new JSONObject(intent.getStringExtra("item"));
                if (current != null) finish(false);
                current = it;
                Notification n = build(this, it);
                int id = it.optInt("id");
                if (Build.VERSION.SDK_INT >= 29) {
                    startForeground(id, n, ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK);
                } else {
                    startForeground(id, n);
                }
                if (!it.optBoolean("soft") && Build.VERSION.SDK_INT >= 23 && Settings.canDrawOverlays(this)) {
                    try {
                        startActivity(popupIntent(this, it));
                    } catch (Exception ignored) {}
                }
                play(it);
            } catch (Exception e) {
                stopSelf();
            }
        }
        return START_NOT_STICKY;
    }

    static void ensureChannels(Context c) {
        if (Build.VERSION.SDK_INT < 26) return;
        NotificationManager nm = (NotificationManager) c.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null) return;
        NotificationChannel main = new NotificationChannel(CH_MAIN, "تذكيرات ذِكْر", NotificationManager.IMPORTANCE_HIGH);
        main.setDescription("الصلاة والأذان والأذكار والورد والصيام والصدقة");
        main.setSound(null, null);
        main.enableVibration(true);
        main.setVibrationPattern(new long[]{0, 400, 200, 400});
        main.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
        main.setBypassDnd(false);
        nm.createNotificationChannel(main);
        NotificationChannel soft = new NotificationChannel(CH_SOFT, "ذكر خفيف", NotificationManager.IMPORTANCE_DEFAULT);
        soft.setSound(null, null);
        soft.enableVibration(false);
        nm.createNotificationChannel(soft);
    }

    static Intent popupIntent(Context c, JSONObject it) {
        Intent pop = new Intent(c, ReminderActivity.class);
        pop.putExtra("item", it.toString());
        pop.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        return pop;
    }

    static Intent appIntent(Context c, String key, String act) {
        Intent open = new Intent(c, MainActivity.class);
        open.putExtra("zikr_key", key);
        open.putExtra("zikr_act", act);
        open.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        return open;
    }

    static Notification build(Context c, JSONObject it) {
        ensureChannels(c);
        int id = it.optInt("id");
        String key = it.optString("key");
        boolean persist = it.optBoolean("persistent");
        boolean soft = it.optBoolean("soft");
        int imm = PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE;

        PendingIntent openPi = PendingIntent.getActivity(c, id ^ 0x08000000, appIntent(c, key, "open"), imm);
        PendingIntent actPi = PendingIntent.getActivity(c, id ^ 0x10000000, appIntent(c, key, "act"), imm);
        PendingIntent popPi = PendingIntent.getActivity(c, id ^ 0x20000000, popupIntent(c, it), imm);
        Intent dis = new Intent(c, DismissReceiver.class);
        dis.setAction(DismissReceiver.ACTION_DISMISS);
        dis.putExtra("key", key);
        dis.putExtra("id", id);
        PendingIntent disPi = PendingIntent.getBroadcast(c, id, dis, imm);
        Intent mute = new Intent(c, AlertService.class);
        mute.setAction(ACTION_STOP);
        mute.putExtra("id", id);
        PendingIntent mutePi = PendingIntent.getService(c, id ^ 0x04000000, mute, imm);

        String body = it.optString("body");
        String big = body;
        String hadith = it.optString("hadith");
        if (hadith.length() > 0) big = body + "\n\n«" + hadith + "»\n" + it.optString("src");

        NotificationCompat.Builder b = new NotificationCompat.Builder(c, soft ? CH_SOFT : CH_MAIN)
                .setSmallIcon(R.drawable.ic_stat_zikr)
                .setColor(0xFF1A8A6C)
                .setContentTitle(it.optString("title"))
                .setContentText(body)
                .setStyle(new NotificationCompat.BigTextStyle().bigText(big))
                .setContentIntent(soft ? openPi : popPi)
                .setOngoing(persist)
                .setAutoCancel(!persist)
                .setSilent(soft)
                .setPriority(soft ? NotificationCompat.PRIORITY_DEFAULT : NotificationCompat.PRIORITY_MAX)
                .setCategory(soft ? NotificationCompat.CATEGORY_REMINDER : NotificationCompat.CATEGORY_ALARM)
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                .setWhen(System.currentTimeMillis())
                .setShowWhen(true);
        if (!soft) {
            b.addAction(0, "إغلاق", disPi);
            String label = it.optString("actionLabel");
            if (label.length() > 0) b.addAction(0, label, actPi);
            if (!"none".equals(it.optString("sound"))) b.addAction(0, "اسكت الصوت", mutePi);
            b.setFullScreenIntent(popPi, true);
        }
        return b.build();
    }

    private void play(JSONObject it) {
        String sound = it.optString("sound", "tts");
        boolean loud = it.optBoolean("loud", true);
        boolean adhan = "adhan".equals(sound);
        AudioAttributes aa = new AudioAttributes.Builder()
                .setUsage(loud ? AudioAttributes.USAGE_ALARM : AudioAttributes.USAGE_NOTIFICATION)
                .setContentType(adhan ? AudioAttributes.CONTENT_TYPE_MUSIC : AudioAttributes.CONTENT_TYPE_SPEECH)
                .build();
        if ("none".equals(sound)) {
            armTimeout(4000);
            return;
        }
        if (adhan) {
            int res = getResources().getIdentifier(it.optString("adhanFile", "adhan_abdulbasit"), "raw", getPackageName());
            if (res != 0) {
                try {
                    player = new MediaPlayer();
                    player.setAudioAttributes(aa);
                    AssetFileDescriptor afd = getResources().openRawResourceFd(res);
                    player.setDataSource(afd.getFileDescriptor(), afd.getStartOffset(), afd.getLength());
                    afd.close();
                    player.setOnCompletionListener(mp -> handler.post(this::finishCurrent));
                    player.prepare();
                    player.start();
                    armTimeout(6 * 60 * 1000);
                    return;
                } catch (Exception e) {
                    releasePlayer();
                }
            }
        }
        String text = it.optString("speech");
        if (text.length() == 0) {
            armTimeout(4000);
            return;
        }
        speak(text, aa);
        armTimeout(2 * 60 * 1000);
    }

    private void speak(String text, AudioAttributes aa) {
        pendingSpeech = text;
        pendingAttrs = aa;
        if (tts == null) {
            tts = new TextToSpeech(getApplicationContext(), status -> {
                ttsInitDone = true;
                ttsReady = status == TextToSpeech.SUCCESS;
                if (ttsReady) {
                    int r = tts.setLanguage(new Locale("ar"));
                    if (r == TextToSpeech.LANG_MISSING_DATA || r == TextToSpeech.LANG_NOT_SUPPORTED) ttsReady = false;
                }
                handler.post(this::doSpeak);
            });
        } else if (ttsInitDone) {
            doSpeak();
        }
    }

    private void doSpeak() {
        if (pendingSpeech == null) return;
        if (!ttsReady) {
            pendingSpeech = null;
            armTimeout(4000);
            return;
        }
        tts.setAudioAttributes(pendingAttrs);
        tts.setSpeechRate(0.92f);
        tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
            @Override public void onStart(String id) {}
            @Override public void onDone(String id) { handler.post(AlertService.this::finishCurrent); }
            @Override public void onError(String id) { handler.post(AlertService.this::finishCurrent); }
        });
        Bundle p = new Bundle();
        p.putFloat(TextToSpeech.Engine.KEY_PARAM_VOLUME, 1f);
        tts.speak(pendingSpeech, TextToSpeech.QUEUE_FLUSH, p, "zikr" + System.currentTimeMillis());
        pendingSpeech = null;
    }

    private void armTimeout(long ms) {
        if (timeout != null) handler.removeCallbacks(timeout);
        timeout = this::finishCurrent;
        handler.postDelayed(timeout, ms);
    }

    private void releasePlayer() {
        if (player != null) {
            try { player.stop(); } catch (Exception ignored) {}
            try { player.release(); } catch (Exception ignored) {}
            player = null;
        }
    }

    /** Stop the sound, keep the notification on screen, and re-arm a repeat if it was not closed. */
    private void finishCurrent() {
        finish(true);
    }

    private void finish(boolean stopService) {
        if (timeout != null) handler.removeCallbacks(timeout);
        timeout = null;
        releasePlayer();
        pendingSpeech = null;
        if (tts != null) {
            try { tts.stop(); } catch (Exception ignored) {}
        }
        JSONObject it = current;
        current = null;
        if (it != null) {
            String key = it.optString("key");
            int id = it.optInt("id");
            if (it.optBoolean("persistent") && !Scheduler.isDismissed(this, key)) {
                long rep = it.optLong("repeat", 15) * 60000L;
                long next = System.currentTimeMillis() + rep;
                long exp = it.optLong("exp", 0);
                if (rep > 0 && (exp == 0 || next < exp)) {
                    try {
                        JSONObject copy = new JSONObject(it.toString());
                        copy.put("time", next);
                        Scheduler.setAlarm(this, id | Scheduler.REPEAT_FLAG, next, copy.toString());
                    } catch (Exception ignored) {}
                }
            }
        }
        if (stopService) {
            ServiceCompat.stopForeground(this, ServiceCompat.STOP_FOREGROUND_DETACH);
            stopSelf();
        }
    }

    @Override
    public void onDestroy() {
        releasePlayer();
        if (tts != null) {
            try { tts.shutdown(); } catch (Exception ignored) {}
            tts = null;
        }
        super.onDestroy();
    }
}
