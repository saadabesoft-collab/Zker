package com.besoft.zikr;

import android.Manifest;
import android.app.AlarmManager;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.PowerManager;
import android.provider.Settings;

import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.content.ContextCompat;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.json.JSONArray;
import org.json.JSONObject;

/** Bridge between the web app and the native reminder engine. */
@CapacitorPlugin(name = "Zikr")
public class ZikrPlugin extends Plugin {
    static ZikrPlugin instance;
    static JSObject pendingLaunch;

    @Override
    public void load() {
        instance = this;
        AlertService.ensureChannels(getContext());
        if (getActivity() != null) capture(getActivity().getIntent());
    }

    @Override
    protected void handleOnNewIntent(Intent intent) {
        super.handleOnNewIntent(intent);
        capture(intent);
    }

    static void capture(Intent i) {
        if (i == null) return;
        String key = i.getStringExtra("zikr_key");
        if (key == null) return;
        JSObject o = new JSObject();
        o.put("key", key);
        o.put("act", i.getStringExtra("zikr_act"));
        i.removeExtra("zikr_key");
        pendingLaunch = o;
        if (instance != null) instance.notifyListeners("launch", o, true);
    }

    static void emit(String event, String key, String act) {
        if (instance == null || key == null) return;
        JSObject o = new JSObject();
        o.put("key", key);
        o.put("act", act);
        instance.notifyListeners(event, o);
    }

    @PluginMethod
    public void schedule(PluginCall call) {
        JSArray items = call.getArray("items", new JSArray());
        Scheduler.replaceAll(getContext(), items);
        call.resolve();
    }

    @PluginMethod
    public void dismiss(PluginCall call) {
        String key = call.getString("key");
        int id = call.getInt("id", 0);
        Context c = getContext();
        Scheduler.markDismissed(c, key);
        Scheduler.takeAcks(c);
        Scheduler.cancelAlarm(c, id | Scheduler.REPEAT_FLAG);
        NotificationManager nm = (NotificationManager) c.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm != null) nm.cancel(id);
        Intent stop = new Intent(c, AlertService.class);
        stop.setAction(AlertService.ACTION_STOP);
        stop.putExtra("id", id);
        try { c.startService(stop); } catch (Exception ignored) {}
        call.resolve();
    }

    @PluginMethod
    public void getAcks(PluginCall call) {
        JSObject r = new JSObject();
        JSONArray a = Scheduler.takeAcks(getContext());
        r.put("keys", a);
        call.resolve(r);
    }

    @PluginMethod
    public void getLaunch(PluginCall call) {
        JSObject r = pendingLaunch != null ? pendingLaunch : new JSObject();
        pendingLaunch = null;
        call.resolve(r);
    }

    @PluginMethod
    public void status(PluginCall call) {
        Context c = getContext();
        JSObject r = new JSObject();
        r.put("notifications", NotificationManagerCompat.from(c).areNotificationsEnabled());
        AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
        r.put("exact", Build.VERSION.SDK_INT < 31 || (am != null && am.canScheduleExactAlarms()));
        r.put("overlay", Build.VERSION.SDK_INT < 23 || Settings.canDrawOverlays(c));
        PowerManager pm = (PowerManager) c.getSystemService(Context.POWER_SERVICE);
        r.put("battery", pm != null && pm.isIgnoringBatteryOptimizations(c.getPackageName()));
        NotificationManager nm = (NotificationManager) c.getSystemService(Context.NOTIFICATION_SERVICE);
        r.put("fullScreen", Build.VERSION.SDK_INT < 34 || (nm != null && nm.canUseFullScreenIntent()));
        call.resolve(r);
    }

    @PluginMethod
    public void requestNotif(PluginCall call) {
        if (Build.VERSION.SDK_INT >= 33 && ContextCompat.checkSelfPermission(getContext(), Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED && getActivity() != null) {
            ActivityCompat.requestPermissions(getActivity(), new String[]{Manifest.permission.POST_NOTIFICATIONS}, 7101);
        }
        call.resolve();
    }

    @PluginMethod
    public void open(PluginCall call) {
        String what = call.getString("what", "app");
        Context c = getContext();
        Uri pkg = Uri.parse("package:" + c.getPackageName());
        Intent i;
        switch (what) {
            case "notifications":
                i = new Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS).putExtra(Settings.EXTRA_APP_PACKAGE, c.getPackageName());
                break;
            case "exact":
                i = Build.VERSION.SDK_INT >= 31 ? new Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM, pkg) : null;
                break;
            case "overlay":
                i = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, pkg);
                break;
            case "battery":
                i = new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS, pkg);
                break;
            case "fullscreen":
                i = Build.VERSION.SDK_INT >= 34 ? new Intent(Settings.ACTION_MANAGE_APP_USE_FULL_SCREEN_INTENT, pkg) : null;
                break;
            case "tts":
                i = new Intent("com.android.settings.TTS_SETTINGS");
                break;
            default:
                i = null;
        }
        if (i == null) i = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, pkg);
        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        try {
            c.startActivity(i);
        } catch (Exception e) {
            try {
                c.startActivity(new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, pkg).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
            } catch (Exception ignored) {}
        }
        call.resolve();
    }

    @PluginMethod
    public void test(PluginCall call) {
        JSObject it = call.getObject("item");
        if (it == null) {
            call.reject("no item");
            return;
        }
        Intent s = new Intent(getContext(), AlertService.class);
        s.setAction(AlertService.ACTION_ALERT);
        s.putExtra("item", it.toString());
        ContextCompat.startForegroundService(getContext(), s);
        call.resolve();
    }
}
