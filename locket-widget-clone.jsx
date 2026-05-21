import { useState, useRef, useEffect, useCallback } from "react";

// ─── FONTS ────────────────────────────────────────────────────────────────────
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --locket-cream: #FFF8F0;
      --locket-warm: #FFEEDD;
      --locket-peach: #FF7B5C;
      --locket-coral: #FF4C2E;
      --locket-dark: #1A0F0A;
      --locket-mid: #53250a;
      --locket-muted: #8C6A57;
      --locket-gold: #FFB347;
      --locket-green: #4CAF8C;
      --locket-blue: #4C8AFF;
      --locket-purple: #9B5DE5;
      --font-display: 'Syne', sans-serif;
      --font-body: 'DM Sans', sans-serif;
      --radius-widget: 22px;
      --shadow-card: 0 8px 32px rgba(26,15,10,0.12), 0 2px 8px rgba(26,15,10,0.08);
      --shadow-float: 0 20px 60px rgba(26,15,10,0.2), 0 4px 16px rgba(26,15,10,0.1);
    }

    html, body { height: 100%; font-family: var(--font-body); background: var(--locket-dark); color: var(--locket-cream); overflow: hidden; }
    #root { height: 100%; }

    /* ── SCROLLBAR ── */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 2px; }

    /* ── ANIMATIONS ── */
    @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes popIn { from { opacity:0; transform:scale(0.85); } to { opacity:1; transform:scale(1); } }
    @keyframes slideLeft { from { opacity:0; transform:translateX(32px); } to { opacity:1; transform:translateX(0); } }
    @keyframes wiggle { 0%,100%{transform:rotate(-2deg) scale(1.02);} 50%{transform:rotate(2deg) scale(1.02);} }
    @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.5;} }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes heartPop { 0%{transform:scale(0);opacity:1;} 60%{transform:scale(1.4);} 100%{transform:scale(1);opacity:0;} }
    @keyframes shimmer { 0%{background-position:-200% 0;} 100%{background-position:200% 0;} }
    @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
    @keyframes notifSlide { from{transform:translateY(-80px);opacity:0;} 10%{transform:translateY(0);opacity:1;} 85%{transform:translateY(0);opacity:1;} to{transform:translateY(-80px);opacity:0;} }

    .animate-fadeup { animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }
    .animate-fadein { animation: fadeIn 0.4s ease both; }
    .animate-popin { animation: popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both; }
    .animate-slideLeft { animation: slideLeft 0.4s cubic-bezier(0.16,1,0.3,1) both; }

    .delay-1 { animation-delay: 0.1s; }
    .delay-2 { animation-delay: 0.2s; }
    .delay-3 { animation-delay: 0.3s; }
    .delay-4 { animation-delay: 0.4s; }
    .delay-5 { animation-delay: 0.55s; }
    .delay-6 { animation-delay: 0.7s; }

    /* ── LAYOUT ── */
    .app-shell {
      width: 100%; height: 100vh; display: flex; align-items: center; justify-content: center;
      background: radial-gradient(ellipse at 30% 20%, #2d1a10 0%, #1A0F0A 60%);
      position: relative; overflow: hidden;
    }
    .app-shell::before {
      content: ''; position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(circle at 70% 80%, rgba(255,123,92,0.06) 0%, transparent 60%);
    }

    /* ── PHONE FRAME ── */
    .phone-frame {
      width: 390px; height: 844px; background: #000; border-radius: 54px;
      box-shadow: 0 0 0 2px #333, 0 30px 80px rgba(0,0,0,0.7), 0 0 0 10px #111;
      position: relative; overflow: hidden; flex-shrink: 0;
    }
    .phone-notch {
      position: absolute; top: 0; left: 50%; transform: translateX(-50%);
      width: 126px; height: 36px; background: #000; border-radius: 0 0 22px 22px;
      z-index: 100;
    }
    .phone-screen { width: 100%; height: 100%; overflow: hidden; position: relative; }

    /* ── SCREEN VIEWS ── */
    .screen { width: 100%; height: 100%; position: absolute; top: 0; left: 0; overflow-y: auto; overflow-x: hidden; }

    /* ── STATUS BAR ── */
    .status-bar {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 24px 8px; font-size: 13px; font-weight: 600; color: #fff;
      position: sticky; top: 0; z-index: 10; backdrop-filter: blur(20px);
    }
    .status-bar .time { font-family: var(--font-display); font-size: 15px; }
    .status-icons { display: flex; gap: 6px; align-items: center; }

    /* ── BUTTONS ── */
    .btn-primary {
      width: 100%; padding: 18px; border-radius: 16px; border: none;
      background: linear-gradient(135deg, var(--locket-coral), var(--locket-peach));
      color: #fff; font-family: var(--font-display); font-size: 17px; font-weight: 700;
      cursor: pointer; letter-spacing: 0.3px;
      box-shadow: 0 4px 20px rgba(255,76,46,0.35);
      transition: transform 0.15s, box-shadow 0.15s;
    }
    .btn-primary:active { transform: scale(0.97); box-shadow: 0 2px 10px rgba(255,76,46,0.3); }

    .btn-ghost {
      background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
      color: var(--locket-cream); padding: 14px 20px; border-radius: 14px;
      font-family: var(--font-body); font-size: 15px; cursor: pointer;
      transition: background 0.2s;
    }
    .btn-ghost:active { background: rgba(255,255,255,0.14); }

    .btn-icon {
      width: 44px; height: 44px; border-radius: 50%; border: none;
      background: rgba(255,255,255,0.08); color: #fff; cursor: pointer;
      display: flex; align-items: center; justify-content: center; font-size: 20px;
      transition: background 0.2s, transform 0.15s;
    }
    .btn-icon:active { transform: scale(0.9); }

    /* ── INPUT ── */
    .input-field {
      width: 100%; padding: 16px 18px; border-radius: 14px;
      background: rgba(255,255,255,0.07); border: 1.5px solid rgba(255,255,255,0.1);
      color: var(--locket-cream); font-family: var(--font-body); font-size: 16px;
      outline: none; transition: border-color 0.2s, background 0.2s;
    }
    .input-field:focus { border-color: var(--locket-peach); background: rgba(255,255,255,0.1); }
    .input-field::placeholder { color: var(--locket-muted); }

    /* ── ONBOARDING ── */
    .onboard-screen {
      background: linear-gradient(180deg, #1A0F0A 0%, #0D0705 100%);
      display: flex; flex-direction: column; align-items: center;
      padding: 0 28px 48px; min-height: 100%;
    }
    .locket-logo {
      width: 80px; height: 80px; border-radius: 24px;
      background: linear-gradient(135deg, var(--locket-coral), var(--locket-gold));
      display: flex; align-items: center; justify-content: center;
      font-size: 38px; margin: 60px auto 24px;
      box-shadow: 0 8px 32px rgba(255,76,46,0.4);
    }
    .onboard-title { font-family: var(--font-display); font-size: 32px; font-weight: 800; text-align: center; line-height: 1.1; }
    .onboard-sub { font-size: 16px; color: var(--locket-muted); text-align: center; margin-top: 10px; line-height: 1.5; }

    .widget-preview-row { display: flex; gap: 14px; justify-content: center; margin: 32px 0; }
    .widget-mini {
      width: 140px; height: 140px; border-radius: 20px; overflow: hidden; position: relative;
      box-shadow: var(--shadow-float); flex-shrink: 0;
    }
    .widget-mini img, .widget-mini .widget-placeholder { width: 100%; height: 100%; object-fit: cover; }
    .widget-mini-label {
      position: absolute; bottom: 0; left: 0; right: 0; padding: 8px 10px 10px;
      background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
      font-size: 11px; font-weight: 600; color: #fff;
    }

    /* ── INVITE SCREEN ── */
    .invite-screen { padding: 0 24px 48px; background: #0D0705; min-height: 100%; }
    .section-title { font-family: var(--font-display); font-size: 22px; font-weight: 700; margin-bottom: 4px; }
    .section-sub { font-size: 14px; color: var(--locket-muted); margin-bottom: 20px; }

    .friend-card {
      display: flex; align-items: center; gap: 14px; padding: 14px 16px;
      background: rgba(255,255,255,0.04); border-radius: 16px; margin-bottom: 10px;
      border: 1px solid rgba(255,255,255,0.06); cursor: pointer;
      transition: background 0.2s;
    }
    .friend-card:active { background: rgba(255,255,255,0.08); }
    .friend-card.selected { background: rgba(255,76,46,0.12); border-color: rgba(255,76,46,0.3); }

    .friend-avatar {
      width: 48px; height: 48px; border-radius: 50%; object-fit: cover;
      flex-shrink: 0; font-size: 22px; display: flex; align-items: center; justify-content: center;
    }
    .friend-info { flex: 1; }
    .friend-name { font-weight: 600; font-size: 15px; }
    .friend-handle { font-size: 13px; color: var(--locket-muted); margin-top: 1px; }
    .friend-check {
      width: 28px; height: 28px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.2);
      display: flex; align-items: center; justify-content: center; font-size: 14px;
      transition: all 0.2s;
    }
    .friend-check.active { background: var(--locket-coral); border-color: var(--locket-coral); }

    .invite-link-card {
      background: linear-gradient(135deg, rgba(255,76,46,0.15), rgba(255,179,71,0.1));
      border: 1px solid rgba(255,76,46,0.25); border-radius: 16px; padding: 18px;
      display: flex; align-items: center; gap: 14px; margin-bottom: 20px;
    }
    .invite-link-icon { font-size: 28px; }
    .invite-link-text { font-size: 14px; color: var(--locket-muted); }
    .invite-link-copy {
      margin-left: auto; background: var(--locket-coral); border: none;
      color: #fff; padding: 8px 14px; border-radius: 10px; font-size: 13px;
      font-weight: 600; cursor: pointer;
    }

    /* ── CAMERA SCREEN ── */
    .camera-screen { background: #000; position: relative; min-height: 100%; }
    .camera-feed {
      width: 100%; aspect-ratio: 3/4; background: #111; position: relative;
      overflow: hidden;
    }
    .camera-feed video { width: 100%; height: 100%; object-fit: cover; }
    .camera-feed canvas { width: 100%; height: 100%; object-fit: cover; }
    .camera-overlay {
      position: absolute; inset: 0; display: flex; flex-direction: column;
      align-items: center; justify-content: flex-end; padding: 0 0 24px;
    }
    .camera-controls {
      display: flex; align-items: center; justify-content: center; gap: 28px;
      padding: 20px 0 16px;
    }
    .shutter-btn {
      width: 76px; height: 76px; border-radius: 50%; border: 4px solid #fff;
      background: #fff; cursor: pointer; position: relative;
      box-shadow: 0 0 0 5px rgba(255,255,255,0.2);
      transition: transform 0.15s;
    }
    .shutter-btn:active { transform: scale(0.93); }
    .shutter-btn::after {
      content: ''; position: absolute; inset: 5px; border-radius: 50%;
      background: linear-gradient(135deg, var(--locket-coral), var(--locket-gold));
    }

    .camera-timer {
      position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
      font-family: var(--font-display); font-size: 80px; font-weight: 800; color: #fff;
      text-shadow: 0 4px 20px rgba(0,0,0,0.5);
      animation: pulse 0.8s ease infinite;
    }

    .sent-overlay {
      position: absolute; inset: 0; background: rgba(0,0,0,0.85);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 16px; z-index: 20;
    }
    .sent-icon { font-size: 64px; animation: popIn 0.5s cubic-bezier(0.34,1.56,0.64,1); }
    .sent-text { font-family: var(--font-display); font-size: 28px; font-weight: 800; color: #fff; }
    .sent-sub { font-size: 15px; color: rgba(255,255,255,0.6); }

    .widget-preview-floating {
      background: rgba(0,0,0,0.7); backdrop-filter: blur(20px);
      border-radius: 20px; padding: 14px; margin: 0 20px;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .widget-preview-label { font-size: 12px; color: rgba(255,255,255,0.5); margin-bottom: 10px; font-weight: 500; }
    .widget-preview-row-inner { display: flex; gap: 10px; align-items: center; }
    .widget-small {
      width: 70px; height: 70px; border-radius: 14px; overflow: hidden; position: relative;
    }
    .widget-medium {
      flex: 1; height: 70px; border-radius: 14px; overflow: hidden; position: relative;
    }
    .widget-small img, .widget-medium img,
    .widget-small canvas, .widget-medium canvas { width: 100%; height: 100%; object-fit: cover; }

    .recipient-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
    .recipient-chip {
      display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.1);
      border-radius: 20px; padding: 4px 10px 4px 4px; font-size: 13px;
    }
    .chip-avatar { width: 24px; height: 24px; border-radius: 50%; font-size: 12px; display: flex; align-items: center; justify-content: center; }

    /* ── FEED SCREEN ── */
    .feed-screen { background: #0D0705; min-height: 100%; }
    .feed-header {
      padding: 16px 20px 12px; display: flex; align-items: center; justify-content: space-between;
    }
    .feed-logo { font-family: var(--font-display); font-size: 22px; font-weight: 800; }
    .feed-logo span { color: var(--locket-coral); }

    .feed-scroll { padding: 8px 16px 100px; }
    .feed-photo-card {
      border-radius: 24px; overflow: hidden; margin-bottom: 16px;
      position: relative; box-shadow: var(--shadow-card);
      animation: fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both;
    }
    .feed-photo-card img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; }
    .feed-photo-card canvas { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; }
    .feed-photo-meta {
      position: absolute; bottom: 0; left: 0; right: 0; padding: 20px 16px 14px;
      background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);
    }
    .feed-sender { font-size: 15px; font-weight: 600; color: #fff; }
    .feed-time { font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 2px; }

    .reaction-row { display: flex; gap: 10px; padding: 12px 14px; background: rgba(255,255,255,0.04); flex-wrap: wrap; }
    .reaction-chip {
      display: flex; align-items: center; gap: 4px; background: rgba(255,255,255,0.08);
      border-radius: 20px; padding: 6px 10px; font-size: 16px; cursor: pointer;
      border: 1px solid rgba(255,255,255,0.06); transition: transform 0.15s, background 0.15s;
    }
    .reaction-chip:active { transform: scale(1.15); background: rgba(255,255,255,0.14); }
    .reaction-chip.mine { background: rgba(255,76,46,0.15); border-color: rgba(255,76,46,0.3); }
    .reaction-count { font-size: 12px; color: rgba(255,255,255,0.6); font-weight: 600; }
    .add-reaction-btn {
      background: transparent; border: 1.5px dashed rgba(255,255,255,0.2); border-radius: 20px;
      padding: 6px 12px; font-size: 16px; color: rgba(255,255,255,0.4); cursor: pointer;
    }

    /* ── WIDGET SCREEN ── */
    .widget-screen { background: #0D0705; min-height: 100%; padding: 0 20px 80px; }
    .widget-tab-row {
      display: flex; gap: 8px; padding: 12px 0; overflow-x: auto; -webkit-overflow-scrolling: touch;
    }
    .widget-tab {
      flex-shrink: 0; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 600;
      cursor: pointer; transition: all 0.2s; border: 1.5px solid rgba(255,255,255,0.1);
      color: rgba(255,255,255,0.5); background: transparent;
    }
    .widget-tab.active { background: var(--locket-coral); border-color: var(--locket-coral); color: #fff; }

    .homescreen-mock {
      border-radius: 28px; overflow: hidden; position: relative;
      aspect-ratio: 9/19.5; margin: 0 -4px;
    }
    .homescreen-bg {
      width: 100%; height: 100%; object-fit: cover;
      background: linear-gradient(160deg, #1a3a5c, #2d1a3e, #0d1a2d);
      position: absolute; inset: 0;
    }
    .homescreen-overlay {
      position: absolute; inset: 0; display: flex; flex-direction: column;
    }
    .homescreen-time-block { padding: 60px 0 20px; text-align: center; }
    .homescreen-bigtime { font-family: var(--font-display); font-size: 72px; font-weight: 800; color: rgba(255,255,255,0.95); line-height: 1; }
    .homescreen-date { font-size: 17px; color: rgba(255,255,255,0.7); margin-top: 4px; }

    .widget-grid { padding: 16px 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .placed-widget {
      border-radius: 20px; overflow: hidden; position: relative;
      aspect-ratio: 1; box-shadow: 0 4px 20px rgba(0,0,0,0.4);
      animation: popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
    }
    .placed-widget.large { grid-column: span 2; aspect-ratio: 2/1; }
    .placed-widget img, .placed-widget canvas { width: 100%; height: 100%; object-fit: cover; display: block; }
    .widget-sender-badge {
      position: absolute; bottom: 0; left: 0; right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.75), transparent);
      padding: 20px 10px 8px; font-size: 11px; font-weight: 700; color: #fff;
    }
    .widget-live-dot {
      display: inline-block; width: 6px; height: 6px; border-radius: 50%;
      background: #4CAF8C; margin-right: 4px;
      animation: pulse 1.5s ease infinite;
    }

    .lockscreen-mock {
      border-radius: 28px; overflow: hidden; position: relative;
      aspect-ratio: 9/19.5; margin: 0 -4px;
      background: linear-gradient(180deg, #0a1628, #1a0a2e);
    }
    .lockscreen-widgets { position: absolute; bottom: 80px; left: 0; right: 0; padding: 0 20px; }
    .lockscreen-widget-row { display: flex; gap: 10px; }
    .lockscreen-widget {
      flex: 1; border-radius: 18px; overflow: hidden; height: 72px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    }
    .lockscreen-widget img, .lockscreen-widget canvas { width: 100%; height: 100%; object-fit: cover; }

    /* ── NAV BAR ── */
    .nav-bar {
      position: absolute; bottom: 0; left: 0; right: 0;
      background: rgba(13,7,5,0.92); backdrop-filter: blur(20px);
      border-top: 1px solid rgba(255,255,255,0.06);
      display: flex; padding: 8px 8px 28px; z-index: 50;
    }
    .nav-item {
      flex: 1; display: flex; flex-direction: column; align-items: center;
      gap: 4px; padding: 8px; cursor: pointer; border-radius: 14px;
      transition: background 0.2s; color: rgba(255,255,255,0.35);
      border: none; background: transparent;
    }
    .nav-item.active { color: var(--locket-coral); }
    .nav-item:active { background: rgba(255,255,255,0.05); }
    .nav-icon { font-size: 22px; line-height: 1; }
    .nav-label { font-size: 10px; font-weight: 600; letter-spacing: 0.3px; }

    .nav-capture {
      width: 56px; height: 56px; border-radius: 50%; margin-top: -20px;
      background: linear-gradient(135deg, var(--locket-coral), var(--locket-gold));
      display: flex; align-items: center; justify-content: center; font-size: 26px;
      box-shadow: 0 4px 20px rgba(255,76,46,0.45); cursor: pointer;
      border: none; flex-shrink: 0; transition: transform 0.15s;
    }
    .nav-capture:active { transform: scale(0.92); }

    /* ── NOTIFICATION ── */
    .notification-toast {
      position: absolute; top: 50px; left: 16px; right: 16px; z-index: 200;
      background: rgba(30,20,16,0.95); backdrop-filter: blur(30px);
      border-radius: 16px; padding: 14px 16px; display: flex; align-items: center; gap: 12px;
      box-shadow: var(--shadow-float); border: 1px solid rgba(255,255,255,0.08);
      animation: notifSlide 4s cubic-bezier(0.16,1,0.3,1) forwards;
    }
    .notif-app-icon {
      width: 40px; height: 40px; border-radius: 10px;
      background: linear-gradient(135deg, var(--locket-coral), var(--locket-gold));
      display: flex; align-items: center; justify-content: center; font-size: 20px;
      flex-shrink: 0;
    }
    .notif-content { flex: 1; }
    .notif-title { font-size: 14px; font-weight: 700; color: #fff; }
    .notif-body { font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 1px; }
    .notif-thumb {
      width: 44px; height: 44px; border-radius: 10px; object-fit: cover; font-size: 20px;
      display: flex; align-items: center; justify-content: center;
    }

    /* ── PROFILE SCREEN ── */
    .profile-screen { background: #0D0705; min-height: 100%; padding: 0 20px 100px; }
    .profile-hero { text-align: center; padding: 32px 0 24px; }
    .profile-avatar-big {
      width: 88px; height: 88px; border-radius: 50%; margin: 0 auto 14px;
      font-size: 42px; display: flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, var(--locket-coral), var(--locket-gold));
      box-shadow: 0 8px 32px rgba(255,76,46,0.35);
    }
    .profile-name { font-family: var(--font-display); font-size: 24px; font-weight: 700; }
    .profile-handle { font-size: 14px; color: var(--locket-muted); margin-top: 4px; }
    .stats-row { display: flex; gap: 0; background: rgba(255,255,255,0.04); border-radius: 18px; overflow: hidden; margin: 20px 0; }
    .stat-item { flex: 1; padding: 18px 0; text-align: center; }
    .stat-item:not(:last-child) { border-right: 1px solid rgba(255,255,255,0.06); }
    .stat-num { font-family: var(--font-display); font-size: 22px; font-weight: 800; color: var(--locket-coral); }
    .stat-label { font-size: 11px; color: var(--locket-muted); margin-top: 3px; font-weight: 500; }

    .setting-row {
      display: flex; align-items: center; gap: 14px; padding: 16px 0;
      border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer;
    }
    .setting-icon { font-size: 20px; width: 36px; text-align: center; }
    .setting-label { flex: 1; font-size: 15px; }
    .setting-arrow { color: rgba(255,255,255,0.3); font-size: 14px; }

    /* ── PHOTO GRID ── */
    .photo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; margin: 0 -20px; }
    .photo-grid-item { aspect-ratio: 1; overflow: hidden; position: relative; }
    .photo-grid-item img, .photo-grid-item canvas { width: 100%; height: 100%; object-fit: cover; }
    .photo-grid-badge {
      position: absolute; top: 6px; right: 6px; background: rgba(0,0,0,0.6);
      border-radius: 8px; padding: 2px 6px; font-size: 10px; font-weight: 700;
    }

    /* ── SHIMMER LOADING ── */
    .shimmer {
      background: linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }

    /* misc */
    .divider { height: 1px; background: rgba(255,255,255,0.06); margin: 16px 0; }
    .pill-tag {
      display: inline-flex; align-items: center; gap: 4px;
      background: rgba(76,175,140,0.15); color: var(--locket-green);
      border-radius: 20px; padding: 4px 10px; font-size: 12px; font-weight: 600;
    }
    .tag-red { background: rgba(255,76,46,0.15); color: var(--locket-coral); }
    .tag-gold { background: rgba(255,179,71,0.15); color: var(--locket-gold); }
  `}</style>
);

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const FRIENDS = [
  { id: 1, name: "Maya Chen", handle: "@maya.c", emoji: "👩‍🦱", color: "#FF6B9D", selected: true },
  { id: 2, name: "Jake Rivera", handle: "@jakey", emoji: "🧔", color: "#4C8AFF", selected: true },
  { id: 3, name: "Priya Sharma", handle: "@priya_s", emoji: "👩‍🦰", color: "#9B5DE5", selected: false },
  { id: 4, name: "Leo Park", handle: "@leopark", emoji: "👨‍🎤", color: "#FFB347", selected: false },
  { id: 5, name: "Sasha Kim", handle: "@sasha.kim", emoji: "🧑‍🎨", color: "#4CAF8C", selected: false },
];

const EMOJIS = ["❤️", "😂", "😍", "🔥", "😮", "👏", "✨", "💯"];

const SAMPLE_PHOTOS = [
  { id: 1, emoji: "🌅", bg: "linear-gradient(135deg,#FF6B35,#F7C59F)", sender: "Maya Chen", time: "2m ago", reactions: [{e:"❤️",c:3,mine:false},{e:"🔥",c:1,mine:true}] },
  { id: 2, emoji: "☕", bg: "linear-gradient(135deg,#3D2314,#8C6A57)", sender: "Jake Rivera", time: "14m ago", reactions: [{e:"😍",c:2,mine:false}] },
  { id: 3, emoji: "🌿", bg: "linear-gradient(135deg,#1a4a2e,#4CAF8C)", sender: "You", time: "1h ago", reactions: [{e:"✨",c:4,mine:false},{e:"👏",c:2,mine:false}] },
  { id: 4, emoji: "🎸", bg: "linear-gradient(135deg,#1a0a2e,#9B5DE5)", sender: "Leo Park", time: "3h ago", reactions: [] },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const ColorCircle = ({ friend, size = 48 }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: friend.color,
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.45, flexShrink: 0 }}>
    {friend.emoji}
  </div>
);

const PhotoCard = ({ photo, style }) => (
  <div style={{ width: "100%", height: "100%",
    background: photo ? photo.bg : "linear-gradient(135deg,#2d1a10,#3D2314)",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, ...style }}>
    {photo ? photo.emoji : "📷"}
  </div>
);

const StatusBar = ({ dark }) => (
  <div className="status-bar" style={{ background: dark ? "rgba(0,0,0,0.4)" : "transparent" }}>
    <span className="time">9:41</span>
    <div className="status-icons">
      <span style={{ fontSize: 13 }}>●●●</span>
      <span style={{ fontSize: 13 }}>WiFi</span>
      <span style={{ fontSize: 13 }}>🔋</span>
    </div>
  </div>
);

// ─── NOTIFICATION TOAST ───────────────────────────────────────────────────────
const NotifToast = ({ notif }) => (
  <div className="notification-toast">
    <div className="notif-app-icon">🔒</div>
    <div className="notif-content">
      <div className="notif-title">Locket Widget</div>
      <div className="notif-body">{notif.text}</div>
    </div>
    <div className="notif-thumb" style={{ background: SAMPLE_PHOTOS[0].bg, borderRadius: 10, fontSize: 20 }}>
      {notif.emoji}
    </div>
  </div>
);

// ─── ONBOARDING SCREEN ────────────────────────────────────────────────────────
const OnboardScreen = ({ onNext }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      emoji: "📸",
      title: "Share your\nmoment instantly",
      sub: "Take a photo and it appears live on your closest friends' home screens — just like magic.",
    },
    {
      emoji: "🏠",
      title: "Always on their\nhome screen",
      sub: "Your photos become beautiful widgets that live on their phone, always visible.",
    },
    {
      emoji: "💬",
      title: "React with\na single tap",
      sub: "Send emoji reactions that float right back to the sender.",
    },
  ];

  return (
    <div className="screen">
      <div className="onboard-screen">
        <StatusBar />
        <div className="locket-logo animate-popin">🔒</div>
        <div className="animate-fadeup delay-1" style={{ textAlign: "center" }}>
          <h1 className="onboard-title" style={{ whiteSpace: "pre-line" }}>{steps[step].title}</h1>
          <p className="onboard-sub">{steps[step].sub}</p>
        </div>

        {/* Widget preview */}
        <div className="widget-preview-row animate-fadeup delay-2">
          <div className="widget-mini" style={{ background: SAMPLE_PHOTOS[0].bg }}>
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>🌅</div>
            <div className="widget-mini-label"><span className="widget-live-dot" />Maya</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div className="widget-mini" style={{ height: 65, background: SAMPLE_PHOTOS[1].bg }}>
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>☕</div>
            </div>
            <div className="widget-mini" style={{ height: 65, background: SAMPLE_PHOTOS[2].bg }}>
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>🌿</div>
            </div>
          </div>
        </div>

        {/* Dot indicator */}
        <div style={{ display: "flex", gap: 8, margin: "8px 0 28px", justifyContent: "center" }} className="animate-fadeup delay-3">
          {steps.map((_, i) => (
            <div key={i} onClick={() => setStep(i)} style={{
              width: i === step ? 20 : 8, height: 8, borderRadius: 4,
              background: i === step ? "var(--locket-coral)" : "rgba(255,255,255,0.2)",
              transition: "all 0.3s", cursor: "pointer",
            }} />
          ))}
        </div>

        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }} className="animate-fadeup delay-4">
          {step < steps.length - 1 ? (
            <button className="btn-primary" onClick={() => setStep(s => s + 1)}>Continue</button>
          ) : (
            <button className="btn-primary" onClick={onNext}>Get Started →</button>
          )}
          <button className="btn-ghost" onClick={onNext}>Log in</button>
        </div>

        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 20, textAlign: "center" }}>
          By continuing you agree to our Terms of Service &amp; Privacy Policy
        </p>
      </div>
    </div>
  );
};

// ─── INVITE SCREEN ────────────────────────────────────────────────────────────
const InviteScreen = ({ friends, setFriends, onDone }) => {
  const [copied, setCopied] = useState(false);
  const selected = friends.filter(f => f.selected);

  const toggle = (id) => setFriends(prev => prev.map(f => f.id === id ? { ...f, selected: !f.selected } : f));

  const handleCopy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="screen">
      <div className="invite-screen">
        <StatusBar />
        <div style={{ marginBottom: 28 }}>
          <div className="animate-fadeup delay-1">
            <div className="section-title">Invite friends 👋</div>
            <div className="section-sub">Choose who can see your live photos</div>
          </div>

          <div className="invite-link-card animate-fadeup delay-2">
            <div className="invite-link-icon">🔗</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>Share your link</div>
              <div className="invite-link-text">locket.cam/invite/you123</div>
            </div>
            <button className="invite-link-copy" onClick={handleCopy}>
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>

          <div className="animate-fadeup delay-3">
            <div style={{ fontSize: 13, color: "var(--locket-muted)", marginBottom: 10, fontWeight: 600 }}>
              SUGGESTED ({friends.length})
            </div>
            {friends.map((f, i) => (
              <div key={f.id} className={`friend-card animate-fadeup ${f.selected ? "selected" : ""}`}
                onClick={() => toggle(f.id)}
                style={{ animationDelay: `${0.3 + i * 0.06}s` }}>
                <ColorCircle friend={f} />
                <div className="friend-info">
                  <div className="friend-name">{f.name}</div>
                  <div className="friend-handle">{f.handle}</div>
                </div>
                <div className={`friend-check ${f.selected ? "active" : ""}`}>
                  {f.selected ? "✓" : ""}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fadeup delay-5">
          <button className="btn-primary" onClick={onDone}>
            {selected.length > 0 ? `Connect with ${selected.length} friend${selected.length > 1 ? "s" : ""} →` : "Skip for now"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── CAMERA SCREEN ────────────────────────────────────────────────────────────
const CameraScreen = ({ friends, onPhotoTaken }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [captured, setCaptured] = useState(false);
  const [sentAnim, setSentAnim] = useState(false);
  const [activeFilter, setActiveFilter] = useState(0);
  const [flip, setFlip] = useState(true);

  const selectedFriends = friends.filter(f => f.selected);
  const filters = ["Normal", "Warm", "Cool", "B&W", "Vivid"];

  // Filter effects definition
  const filterStyles = [
    {},  // Normal
    { filter: "saturate(1.3) hue-rotate(10deg)" },  // Warm
    { filter: "saturate(0.8) hue-rotate(-20deg)" },  // Cool
    { filter: "grayscale(1)" },  // B&W
    { filter: "saturate(1.5) contrast(1.2) brightness(1.05)" },  // Vivid
  ];

  useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        if (videoRef.current) { videoRef.current.srcObject = stream; setHasCamera(true); }
      } catch { setHasCamera(false); }
    })();
    return () => { if (videoRef.current?.srcObject) videoRef.current.srcObject.getTracks().forEach(t => t.stop()); };
  }, []);

  const startCountdown = () => {
    let c = 3;
    setCountdown(c);
    const interval = setInterval(() => {
      c--;
      if (c === 0) { clearInterval(interval); setCountdown(null); takePhoto(); }
      else setCountdown(c);
    }, 1000);
  };

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video && hasCamera) {
      canvas.width = video.videoWidth || 400;
      canvas.height = video.videoHeight || 500;
      const ctx = canvas.getContext("2d");
      if (flip) { ctx.translate(canvas.width, 0); ctx.scale(-1, 1); }
      ctx.drawImage(video, 0, 0);
    }
    setCaptured(true);
    setTimeout(() => { setSentAnim(true); }, 200);
    setTimeout(() => { setSentAnim(false); setCaptured(false); onPhotoTaken && onPhotoTaken(); }, 3500);
  };

  return (
    <div className="screen camera-screen">
      <div className="camera-feed">
        {hasCamera ? (
          <video ref={videoRef} autoPlay playsInline muted
            style={{ width: "100%", height: "100%", objectFit: "cover", transform: flip ? "scaleX(-1)" : "none", ...filterStyles[activeFilter] }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg,#1a0a2e,#2d1a10)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div style={{ fontSize: 64 }}>📷</div>
            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "0 40px" }}>
              Camera preview<br /><span style={{ fontSize: 12 }}>Allow camera access for live preview</span>
            </div>
          </div>
        )}
        {countdown && <div className="camera-timer">{countdown}</div>}

        {sentAnim && (
          <div className="sent-overlay animate-fadein">
            <div className="sent-icon">🚀</div>
            <div className="sent-text">Sent!</div>
            <div className="sent-sub">Delivered to {selectedFriends.length} friend{selectedFriends.length !== 1 ? "s" : ""}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              {selectedFriends.slice(0, 4).map(f => <ColorCircle key={f.id} friend={f} size={36} />)}
            </div>
          </div>
        )}

        <StatusBar dark />
      </div>

      {/* Filter strip */}
      <div style={{ display: "flex", gap: 8, padding: "12px 20px 4px", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        {filters.map((f, i) => (
          <button key={i} onClick={() => setActiveFilter(i)}
            style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 20, border: "none",
              background: activeFilter === i ? "var(--locket-coral)" : "rgba(255,255,255,0.1)",
              color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", }}>
            {f}
          </button>
        ))}
      </div>

      {/* Widget preview */}
      <div className="widget-preview-floating" style={{ margin: "10px 20px" }}>
        <div className="widget-preview-label">WIDGET PREVIEW</div>
        {selectedFriends.length > 0 ? (
          <>
            <div className="recipient-chips">
              {selectedFriends.map(f => (
                <div key={f.id} className="recipient-chip">
                  <ColorCircle friend={f} size={24} />
                  {f.name.split(" ")[0]}
                </div>
              ))}
            </div>
            <div className="widget-preview-row-inner">
              <div className="widget-small" style={{ background: "rgba(255,255,255,0.05)", border: "1.5px dashed rgba(255,255,255,0.2)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "rgba(255,255,255,0.3)" }}>
                📸
              </div>
              <div className="widget-medium" style={{ background: "rgba(255,255,255,0.05)", border: "1.5px dashed rgba(255,255,255,0.2)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "rgba(255,255,255,0.3)" }}>
                2×1 widget
              </div>
            </div>
          </>
        ) : (
          <div style={{ padding: "16px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
            Select friends to preview how your photo will appear
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="camera-controls">
        <button className="btn-icon" onClick={() => setFlip(f => !f)} title="Flip">🔄</button>
        <button className="shutter-btn" onClick={takePhoto} />
        <button className="btn-icon" onClick={startCountdown} title="Timer">⏱️</button>
      </div>
    </div>
  );
};

// ─── FEED SCREEN ─────────────────────────────────────────────────────────────
const FeedScreen = ({ friends, photos, setPhotos }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(null);
  const [notification, setNotification] = useState(null);

  const react = (photoId, emoji) => {
    setPhotos(prev => prev.map(p => {
      if (p.id !== photoId) return p;
      const exists = p.reactions.find(r => r.e === emoji);
      if (exists) {
        return { ...p, reactions: p.reactions.map(r => r.e === emoji ? { ...r, c: r.c + 1, mine: true } : r) };
      }
      return { ...p, reactions: [...p.reactions, { e: emoji, c: 1, mine: true }] };
    }));
    setShowEmojiPicker(null);
    setNotification({ text: `You reacted ${emoji}`, emoji });
    setTimeout(() => setNotification(null), 4200);
  };

  return (
    <div className="screen feed-screen">
      {notification && <NotifToast notif={notification} />}
      <div className="feed-header">
        <div className="feed-logo">lock<span>et</span></div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span className="pill-tag">🟢 Live</span>
          <button className="btn-icon" style={{ width: 36, height: 36, fontSize: 18 }}>🔔</button>
        </div>
      </div>

      {/* Friends row */}
      <div style={{ display: "flex", gap: 14, padding: "8px 16px 16px", overflowX: "auto" }}>
        {friends.filter(f => f.selected).map(f => (
          <div key={f.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <div style={{ position: "relative" }}>
              <ColorCircle friend={f} size={52} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 14, height: 14, borderRadius: "50%", background: "var(--locket-green)", border: "2px solid #0D0705" }} />
            </div>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{f.name.split(" ")[0]}</span>
          </div>
        ))}
      </div>

      <div className="feed-scroll">
        {photos.map((photo, idx) => (
          <div key={photo.id} className="feed-photo-card" style={{ animationDelay: `${idx * 0.08}s` }}>
            <div style={{ width: "100%", aspectRatio: "1", background: photo.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72 }}>
              {photo.emoji}
            </div>
            <div className="feed-photo-meta">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ColorCircle friend={friends.find(f => f.name === photo.sender) || { emoji: "😊", color: "#555" }} size={28} />
                <div>
                  <div className="feed-sender">{photo.sender}</div>
                  <div className="feed-time">{photo.time}</div>
                </div>
              </div>
            </div>

            {/* Reactions */}
            <div className="reaction-row">
              {photo.reactions.map((r, i) => (
                <button key={i} className={`reaction-chip ${r.mine ? "mine" : ""}`} onClick={() => react(photo.id, r.e)}>
                  <span>{r.e}</span>
                  <span className="reaction-count">{r.c}</span>
                </button>
              ))}
              <button className="add-reaction-btn" onClick={() => setShowEmojiPicker(showEmojiPicker === photo.id ? null : photo.id)}>
                {showEmojiPicker === photo.id ? "✕" : "＋"}
              </button>
            </div>

            {showEmojiPicker === photo.id && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "12px 14px", background: "rgba(0,0,0,0.5)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {EMOJIS.map(e => (
                  <button key={e} onClick={() => react(photo.id, e)}
                    style={{ fontSize: 26, background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 8, transition: "transform 0.15s" }}
                    onMouseEnter={ev => ev.target.style.transform = "scale(1.3)"}
                    onMouseLeave={ev => ev.target.style.transform = "scale(1)"}>
                    {e}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── WIDGET SCREEN ────────────────────────────────────────────────────────────
const WidgetScreen = ({ friends, photos }) => {
  const [tab, setTab] = useState("home");
  const [size, setSize] = useState("grid");

  const selectedFriends = friends.filter(f => f.selected);

  return (
    <div className="screen widget-screen">
      <StatusBar />
      <div style={{ padding: "8px 0 4px" }}>
        <div className="section-title">Widget Preview</div>
        <div className="section-sub">See how your photos appear on devices</div>
      </div>

      <div className="widget-tab-row">
        {["home", "lock", "sizes"].map(t => (
          <button key={t} className={`widget-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t === "home" ? "🏠 Home Screen" : t === "lock" ? "🔒 Lock Screen" : "📐 Sizes"}
          </button>
        ))}
      </div>

      {tab === "home" && (
        <div className="animate-slideLeft">
          <div className="homescreen-mock">
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#0a1628,#1a0a2e,#0d1a2d)" }} />
            {/* Subtle star pattern */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.4, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="homescreen-overlay">
              <div className="homescreen-time-block">
                <div className="homescreen-bigtime">9:41</div>
                <div className="homescreen-date">Thursday, May 21</div>
              </div>
              <div className="widget-grid">
                {selectedFriends.slice(0, 3).map((f, i) => (
                  <div key={f.id} className={`placed-widget ${i === 0 ? "large" : ""}`}
                    style={{ background: photos[i % photos.length]?.bg || f.color, animationDelay: `${i * 0.1}s` }}>
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: i === 0 ? 56 : 38 }}>
                      {photos[i % photos.length]?.emoji || "📷"}
                    </div>
                    <div className="widget-sender-badge">
                      <span className="widget-live-dot" />{f.name.split(" ")[0]}
                    </div>
                  </div>
                ))}
                {/* App icons row */}
                {["📱","🎵","📸","🗺️"].map((icon, i) => (
                  <div key={i} style={{ aspectRatio: "1", borderRadius: 16, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{icon}</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14 }}>
            <span className="pill-tag">✓ Active</span>
            <span style={{ fontSize: 13, color: "var(--locket-muted)" }}>Widgets update instantly on send</span>
          </div>
        </div>
      )}

      {tab === "lock" && (
        <div className="animate-slideLeft">
          <div className="lockscreen-mock">
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#0a1628,#1a0a2e)" }} />
            <StatusBar dark />
            <div style={{ position: "absolute", top: "15%", left: 0, right: 0, textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 72, fontWeight: 800, color: "rgba(255,255,255,0.92)", lineHeight: 1 }}>9:41</div>
              <div style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", marginTop: 4 }}>Thursday, May 21</div>
            </div>
            {/* Lock screen widgets */}
            <div className="lockscreen-widgets">
              <div className="lockscreen-widget-row">
                {selectedFriends.slice(0, 3).map((f, i) => (
                  <div key={f.id} className="lockscreen-widget" style={{ background: photos[i % photos.length]?.bg || f.color }}>
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>
                      {photos[i % photos.length]?.emoji || "📷"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: "absolute", bottom: 28, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
              <div style={{ width: 140, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.4)" }} />
            </div>
          </div>
        </div>
      )}

      {tab === "sizes" && (
        <div className="animate-slideLeft">
          {[
            { label: "Small (2×2)", w: "70px", h: "70px", idx: 0 },
            { label: "Medium (4×2)", w: "150px", h: "70px", idx: 1 },
            { label: "Large (4×4)", w: "150px", h: "150px", idx: 2 },
          ].map(({ label, w, h, idx }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ width: w, height: h, borderRadius: 16, overflow: "hidden", background: photos[idx % photos.length]?.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: parseInt(h) * 0.4, flexShrink: 0 }}>
                {photos[idx % photos.length]?.emoji || "📷"}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{label}</div>
                <div style={{ fontSize: 13, color: "var(--locket-muted)", marginTop: 3 }}>
                  {idx === 0 ? "Single friend photo" : idx === 1 ? "Two friends side-by-side" : "Full album view"}
                </div>
                <span className="pill-tag" style={{ marginTop: 6, display: "inline-flex", fontSize: 11 }}>Available</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── PROFILE SCREEN ───────────────────────────────────────────────────────────
const ProfileScreen = ({ friends, photos }) => (
  <div className="screen profile-screen">
    <StatusBar />
    <div className="profile-hero animate-fadeup">
      <div className="profile-avatar-big">😊</div>
      <div className="profile-name">You</div>
      <div className="profile-handle">@your.locket</div>
    </div>

    <div className="stats-row animate-fadeup delay-1">
      <div className="stat-item">
        <div className="stat-num">{photos.length}</div>
        <div className="stat-label">Photos</div>
      </div>
      <div className="stat-item">
        <div className="stat-num">{friends.filter(f => f.selected).length}</div>
        <div className="stat-label">Friends</div>
      </div>
      <div className="stat-item">
        <div className="stat-num">{photos.reduce((a, p) => a + p.reactions.length, 0)}</div>
        <div className="stat-label">Reactions</div>
      </div>
    </div>

    {/* Photo grid */}
    <div style={{ marginBottom: 20 }} className="animate-fadeup delay-2">
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10, color: "var(--locket-muted)" }}>YOUR PHOTOS</div>
      <div className="photo-grid">
        {photos.map((photo, i) => (
          <div key={photo.id} className="photo-grid-item">
            <div style={{ width: "100%", height: "100%", background: photo.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>
              {photo.emoji}
            </div>
            {photo.reactions.length > 0 && (
              <div className="photo-grid-badge">{photo.reactions[0].e}</div>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Settings */}
    <div className="animate-fadeup delay-3">
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--locket-muted)" }}>SETTINGS</div>
      {[
        { icon: "🔔", label: "Notifications" },
        { icon: "🎨", label: "Widget appearance" },
        { icon: "🔒", label: "Privacy & groups" },
        { icon: "⭐", label: "Upgrade to Pro", tag: "PRO" },
        { icon: "❓", label: "Help & Support" },
      ].map(({ icon, label, tag }) => (
        <div key={label} className="setting-row">
          <span className="setting-icon">{icon}</span>
          <span className="setting-label">{label}</span>
          {tag && <span className="pill-tag tag-gold" style={{ fontSize: 11 }}>{tag}</span>}
          <span className="setting-arrow">›</span>
        </div>
      ))}
    </div>
  </div>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [appState, setAppState] = useState("onboard"); // onboard | invite | main
  const [activeTab, setActiveTab] = useState("feed");
  const [friends, setFriends] = useState(FRIENDS);
  const [photos, setPhotos] = useState(SAMPLE_PHOTOS);
  const [notification, setNotification] = useState(null);

  const handlePhotoTaken = () => {
    const newPhoto = {
      id: Date.now(), emoji: ["🌟","🎉","🌈","🍕","🎵","🦋","🌸","✨"][Math.floor(Math.random() * 8)],
      bg: `linear-gradient(135deg, hsl(${Math.random()*360},60%,25%), hsl(${Math.random()*360},50%,35%))`,
      sender: "You", time: "Just now", reactions: [],
    };
    setPhotos(p => [newPhoto, ...p]);
    setTimeout(() => {
      setNotification({ text: "Maya Chen reacted ❤️", emoji: "❤️" });
      setTimeout(() => setNotification(null), 4200);
    }, 2000);
    setTimeout(() => setActiveTab("feed"), 3600);
  };

  const tabs = [
    { id: "feed", icon: "🏠", label: "Feed" },
    { id: "widgets", icon: "📱", label: "Widgets" },
    { id: "camera", icon: null, label: "" },
    { id: "friends", icon: "👥", label: "Friends" },
    { id: "profile", icon: "👤", label: "Me" },
  ];

  if (appState === "onboard") return (
    <>
      <FontLink />
      <div className="app-shell">
        <div className="phone-frame">
          <div className="phone-notch" />
          <div className="phone-screen">
            <OnboardScreen onNext={() => setAppState("invite")} />
          </div>
        </div>
      </div>
    </>
  );

  if (appState === "invite") return (
    <>
      <FontLink />
      <div className="app-shell">
        <div className="phone-frame">
          <div className="phone-notch" />
          <div className="phone-screen">
            <InviteScreen friends={friends} setFriends={setFriends} onDone={() => setAppState("main")} />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <FontLink />
      <div className="app-shell">
        <div className="phone-frame">
          <div className="phone-notch" />
          <div className="phone-screen" style={{ background: "#0D0705" }}>
            {notification && <NotifToast notif={notification} />}

            {/* SCREENS */}
            {activeTab === "feed" && <FeedScreen friends={friends} photos={photos} setPhotos={setPhotos} />}
            {activeTab === "widgets" && <WidgetScreen friends={friends} photos={photos} />}
            {activeTab === "camera" && <CameraScreen friends={friends} onPhotoTaken={handlePhotoTaken} />}
            {activeTab === "friends" && <InviteScreen friends={friends} setFriends={setFriends} onDone={() => setActiveTab("feed")} />}
            {activeTab === "profile" && <ProfileScreen friends={friends} photos={photos} />}

            {/* NAV BAR */}
            <div className="nav-bar">
              {tabs.map(t => (
                t.icon === null ? (
                  <button key={t.id} className="nav-capture" onClick={() => setActiveTab("camera")}>📸</button>
                ) : (
                  <button key={t.id} className={`nav-item ${activeTab === t.id ? "active" : ""}`} onClick={() => setActiveTab(t.id)}>
                    <span className="nav-icon">{t.icon}</span>
                    <span className="nav-label">{t.label}</span>
                  </button>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Side hints */}
        <div style={{ position: "absolute", right: "calc(50% - 250px)", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 16, opacity: 0.7, pointerEvents: "none" }}>
          {["Real-time delivery", "Widget-first design", "Emoji reactions", "Camera with filters"].map((hint, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, animation: `fadeUp 0.5s ${i * 0.1 + 0.3}s both` }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--locket-coral)" }} />
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)", whiteSpace: "nowrap" }}>{hint}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
