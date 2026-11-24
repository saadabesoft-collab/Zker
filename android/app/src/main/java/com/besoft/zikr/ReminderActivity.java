package com.besoft.zikr;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.os.Build;
import android.os.Bundle;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import org.json.JSONObject;

/** The pop-up card shown over other apps and over the lock screen when a reminder fires. */
public class ReminderActivity extends Activity {
    private JSONObject item;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT >= 27) {
            setShowWhenLocked(true);
            setTurnScreenOn(true);
        } else {
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED | WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON);
        }
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        render(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        render(intent);
    }

    private int dp(float v) {
        return (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v, getResources().getDisplayMetrics());
    }

    private GradientDrawable round(int color, float radiusDp) {
        GradientDrawable g = new GradientDrawable();
        g.setColor(color);
        g.setCornerRadius(dp(radiusDp));
        return g;
    }

    private TextView text(String s, float sp, int color, boolean bold) {
        TextView t = new TextView(this);
        t.setText(s);
        t.setTextSize(TypedValue.COMPLEX_UNIT_SP, sp);
        t.setTextColor(color);
        t.setLineSpacing(0, 1.25f);
        t.setTextDirection(View.TEXT_DIRECTION_RTL);
        t.setGravity(Gravity.START);
        if (bold) t.setTypeface(Typeface.DEFAULT_BOLD);
        return t;
    }

    private Button button(String s, int bg, int fg) {
        Button b = new Button(this);
        b.setText(s);
        b.setAllCaps(false);
        b.setTextSize(TypedValue.COMPLEX_UNIT_SP, 16);
        b.setTextColor(fg);
        b.setTypeface(Typeface.DEFAULT_BOLD);
        b.setBackground(round(bg, 14));
        b.setMinHeight(dp(52));
        return b;
    }

    private void render(Intent intent) {
        try {
            item = new JSONObject(intent.getStringExtra("item"));
        } catch (Exception e) {
            finish();
            return;
        }
        final String key = item.optString("key");
        final int id = item.optInt("id");

        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(0xB3000000);
        root.setLayoutDirection(View.LAYOUT_DIRECTION_RTL);

        ScrollView scroll = new ScrollView(this);
        scroll.setFillViewport(false);
        FrameLayout.LayoutParams sp = new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT, Gravity.CENTER);
        sp.setMargins(dp(18), dp(24), dp(18), dp(24));
        root.addView(scroll, sp);

        LinearLayout card = new LinearLayout(this);
        card.setOrientation(LinearLayout.VERTICAL);
        card.setBackground(round(Color.WHITE, 26));
        card.setClipToOutline(true);
        scroll.addView(card, new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));

        GradientDrawable head = new GradientDrawable(GradientDrawable.Orientation.TL_BR, new int[]{0xFF1A8A6C, 0xFF2A7FB3});
        float r = dp(26);
        head.setCornerRadii(new float[]{r, r, r, r, 0, 0, 0, 0});
        LinearLayout header = new LinearLayout(this);
        header.setOrientation(LinearLayout.HORIZONTAL);
        header.setGravity(Gravity.CENTER_VERTICAL);
        header.setBackground(head);
        header.setPadding(dp(20), dp(16), dp(20), dp(16));
        TextView brand = text("ذِكْر", 24, Color.WHITE, true);
        header.addView(brand);
        View spacer = new View(this);
        header.addView(spacer, new LinearLayout.LayoutParams(0, 1, 1f));
        TextView kind = text(item.optString("kindLabel", "تذكير"), 14, 0xE6FFFFFF, false);
        header.addView(kind);
        card.addView(header);

        LinearLayout body = new LinearLayout(this);
        body.setOrientation(LinearLayout.VERTICAL);
        body.setPadding(dp(20), dp(18), dp(20), dp(20));
        card.addView(body);

        body.addView(text(item.optString("title"), 23, 0xFF10201B, true));
        TextView msg = text(item.optString("body"), 17, 0xFF3B4A45, false);
        msg.setPadding(0, dp(6), 0, 0);
        body.addView(msg);

        String hadith = item.optString("hadith");
        if (hadith.length() > 0) {
            LinearLayout hb = new LinearLayout(this);
            hb.setOrientation(LinearLayout.VERTICAL);
            hb.setBackground(round(0xFFEAF4F7, 16));
            hb.setPadding(dp(16), dp(14), dp(16), dp(14));
            LinearLayout.LayoutParams hp = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
            hp.setMargins(0, dp(16), 0, 0);
            TextView ht = text("قال رسول الله ﷺ:", 13, 0xFF2A7FB3, true);
            hb.addView(ht);
            TextView h = text("«" + hadith + "»", 18, 0xFF12352B, false);
            h.setTypeface(Typeface.SERIF);
            h.setPadding(0, dp(6), 0, dp(6));
            hb.addView(h);
            hb.addView(text(item.optString("src"), 13, 0xFF5A6B64, false));
            body.addView(hb, hp);
        }

        LinearLayout row = new LinearLayout(this);
        row.setOrientation(LinearLayout.HORIZONTAL);
        LinearLayout.LayoutParams rp = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        rp.setMargins(0, dp(20), 0, 0);
        body.addView(row, rp);

        String label = item.optString("actionLabel");
        if (label.length() > 0) {
            Button act = button(label, 0xFF1A8A6C, Color.WHITE);
            LinearLayout.LayoutParams ap = new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f);
            ap.setMarginEnd(dp(10));
            row.addView(act, ap);
            act.setOnClickListener(v -> {
                DismissReceiver.dismiss(this, key, id);
                startActivity(AlertService.appIntent(this, key, "act"));
                finish();
            });
        }
        Button close = button("إغلاق", 0xFFE3ECEA, 0xFF10201B);
        row.addView(close, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f));
        close.setOnClickListener(v -> {
            DismissReceiver.dismiss(this, key, id);
            finish();
        });

        if (!"none".equals(item.optString("sound"))) {
            Button mute = button("اسكت الصوت", Color.TRANSPARENT, 0xFF2A7FB3);
            LinearLayout.LayoutParams mp = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
            mp.setMargins(0, dp(6), 0, 0);
            body.addView(mute, mp);
            mute.setOnClickListener(v -> {
                Intent stop = new Intent(this, AlertService.class);
                stop.setAction(AlertService.ACTION_STOP);
                stop.putExtra("id", id);
                try { startService(stop); } catch (Exception ignored) {}
                mute.setVisibility(View.GONE);
            });
        }

        TextView foot = text("BeSoft", 12, 0xFF9AA9A3, false);
        foot.setGravity(Gravity.CENTER);
        foot.setPadding(0, dp(10), 0, 0);
        body.addView(foot, new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));

        setContentView(root);
    }

    @Override
    public void onBackPressed() {
        Intent stop = new Intent(this, AlertService.class);
        stop.setAction(AlertService.ACTION_STOP);
        stop.putExtra("id", item != null ? item.optInt("id") : 0);
        try { startService(stop); } catch (Exception ignored) {}
        super.onBackPressed();
    }
}
