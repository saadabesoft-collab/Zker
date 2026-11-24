package com.besoft.zikr;

import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/** "إغلاق" pressed on the notification or in the pop-up. */
public class DismissReceiver extends BroadcastReceiver {
    static final String ACTION_DISMISS = "com.besoft.zikr.DISMISS";

    @Override
    public void onReceive(Context c, Intent intent) {
        dismiss(c, intent.getStringExtra("key"), intent.getIntExtra("id", 0));
    }

    static void dismiss(Context c, String key, int id) {
        Scheduler.markDismissed(c, key);
        Scheduler.cancelAlarm(c, id | Scheduler.REPEAT_FLAG);
        NotificationManager nm = (NotificationManager) c.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm != null) nm.cancel(id);
        Intent stop = new Intent(c, AlertService.class);
        stop.setAction(AlertService.ACTION_STOP);
        stop.putExtra("id", id);
        try { c.startService(stop); } catch (Exception ignored) {}
        ZikrPlugin.emit("ack", key, "ack");
    }
}
