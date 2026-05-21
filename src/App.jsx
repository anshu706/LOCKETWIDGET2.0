import { useState, useRef, useEffect } from "react";

const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --locket-cream: #FFF8F0;
      --locket-peach: #FF7B5C;
      --locket-coral: #FF4C2E;
      --locket-dark: #1A0F0A;
      --locket-muted: #8C6A57;
      --locket-gold: #FFB347;
      --locket-green: #4CAF8C;
      --locket-blue: #4C8AFF;
      --locket-purple: #9B5DE5;
      --font-display: 'Syne', sans-serif;
      --font-body: 'DM Sans', sans-serif;
    }

    html, body { height: 100%; font-family: var(--font-body); background: linear-gradient(135deg, #0D0705 0%, #1A0F0A 50%, #2d1a10 100%); color: var(--locket-cream); }
    #root { min-height: 100vh; }

    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
    ::-webkit-scrollbar-thumb { background: var(--locket-coral); border-radius: 4px; }

    @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes popIn { from { opacity:0; transform:scale(0.85); } to { opacity:1; transform:scale(1); } }
    @keyframes slideLeft { from { opacity:0; transform:translateX(32px); } to { opacity:1; transform:translateX(0); } }

    .animate-fadeup { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both; }
    .animate-fadein { animation: fadeIn 0.4s ease both; }
    .animate-popin { animation: popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
    .animate-slideLeft { animation: slideLeft 0.5s cubic-bezier(0.16,1,0.3,1) both; }

    .delay-1 { animation-delay: 0.1s; }
    .delay-2 { animation-delay: 0.2s; }
    .delay-3 { animation-delay: 0.3s; }
    .delay-4 { animation-delay: 0.4s; }
    .delay-5 { animation-delay: 0.5s; }

    .app-container { display: flex; min-height: 100vh; gap: 0; }

    .sidebar {
      width: 280px;
      background: rgba(13, 7, 5, 0.8);
      backdrop-filter: blur(20px);
      border-right: 1px solid rgba(255,255,255,0.06);
      padding: 32px 24px;
      display: flex;
      flex-direction: column;
      gap: 32px;
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
    }

    .logo-section { display: flex; align-items: center; gap: 14px; margin-bottom: 8px; }
    .logo-icon {
      width: 48px; height: 48px; border-radius: 14px;
      background: linear-gradient(135deg, var(--locket-coral), var(--locket-gold));
      display: flex; align-items: center; justify-content: center;
      font-size: 24px; box-shadow: 0 8px 24px rgba(255,76,46,0.3);
    }

    .logo-text {
      font-family: var(--font-display);
      font-size: 20px; font-weight: 800;
      background: linear-gradient(135deg, var(--locket-coral), var(--locket-gold));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .nav-section h3 {
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      color: var(--locket-muted); margin-bottom: 12px; letter-spacing: 1px;
    }

    .nav-items { display: flex; flex-direction: column; gap: 8px; }

    .nav-item {
      display: flex; align-items: center; gap: 12px; padding: 12px 16px;
      border-radius: 12px; cursor: pointer; transition: all 0.3s;
      border: 1px solid transparent; color: rgba(255,255,255,0.6);
      font-size: 14px; font-weight: 500;
    }

    .nav-item:hover { background: rgba(255,76,46,0.1); color: var(--locket-cream); }
    .nav-item.active {
      background: linear-gradient(135deg, rgba(255,76,46,0.2), rgba(255,179,71,0.1));
      border-color: var(--locket-coral); color: var(--locket-coral); font-weight: 600;
    }

    .nav-icon { font-size: 18px; }

    .main-content { flex: 1; overflow-y: auto; padding: 40px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
    .header-title { font-family: var(--font-display); font-size: 32px; font-weight: 800; margin-bottom: 8px; }
    .header-subtitle { font-size: 14px; color: var(--locket-muted); }
    .header-actions { display: flex; gap: 12px; }

    .btn { padding: 12px 24px; border-radius: 12px; border: none; font-family: var(--font-body); font-weight: 600; cursor: pointer; transition: all 0.3s; font-size: 14px; }
    .btn-primary { background: linear-gradient(135deg, var(--locket-coral), var(--locket-peach)); color: white; box-shadow: 0 8px 24px rgba(255,76,46,0.3); }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(255,76,46,0.4); }
    .btn-secondary { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: var(--locket-cream); }
    .btn-secondary:hover { background: rgba(255,255,255,0.15); }

    .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; margin-bottom: 40px; }
    .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 24px; backdrop-filter: blur(10px); transition: all 0.3s; }
    .card:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,76,46,0.3); transform: translateY(-4px); }
    .card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .card-icon { font-size: 32px; }
    .card-title { font-family: var(--font-display); font-size: 18px; font-weight: 700; }
    .card-content { font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.7); }

    .feed-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-bottom: 40px; }
    .photo-card { border-radius: 16px; overflow: hidden; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-size: 80px; position: relative; box-shadow: 0 12px 32px rgba(26,15,10,0.3); cursor: pointer; transition: all 0.3s; }
    .photo-card:hover { transform: scale(1.05); box-shadow: 0 16px 40px rgba(255,76,46,0.3); }
    .photo-meta { position: absolute; bottom: 0; left: 0; right: 0; padding: 16px; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); }
    .photo-sender { font-weight: 600; font-size: 13px; margin-bottom: 4px; }
    .photo-time { font-size: 11px; color: rgba(255,255,255,0.7); }

    .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }
    .stat-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,76,46,0.3); border-radius: 16px; padding: 24px; text-align: center; }
    .stat-number { font-family: var(--font-display); font-size: 36px; font-weight: 800; color: var(--locket-coral); margin-bottom: 8px; }
    .stat-label { font-size: 12px; text-transform: uppercase; color: var(--locket-muted); font-weight: 600; }

    @media (max-width: 1024px) {
      .sidebar { width: 100%; height: auto; flex-direction: row; gap: 24px; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); align-items: center; overflow-x: auto; }
      .main-content { padding: 30px 20px; }
      .cards-grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
    }

    @media (max-width: 768px) {
      .main-content { padding: 20px 16px; }
      .header-title { font-size: 24px; }
      .cards-grid { grid-template-columns: 1fr; gap: 16px; }
      .feed-grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
      .photo-card { font-size: 60px; }
    }

    @media (max-width: 480px) {
      .main-content { padding: 16px; }
      .header-title { font-size: 20px; }
      .cards-grid { gap: 12px; }
      .feed-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
      .photo-card { font-size: 48px; }
    }
  `}</style>
);

const FRIENDS = [
  { id: 1, name: "Maya Chen", emoji: "?????", color: "#FF6B9D" },
  { id: 2, name: "Jake Rivera", emoji: "??", color: "#4C8AFF" },
  { id: 3, name: "Priya Sharma", emoji: "?????", color: "#9B5DE5" },
  { id: 4, name: "Leo Park", emoji: "?????", color: "#FFB347" },
];

const PHOTOS = [
  { id: 1, emoji: "??", bg: "linear-gradient(135deg,#FF6B35,#F7C59F)", sender: "Maya Chen", time: "2m ago" },
  { id: 2, emoji: "?", bg: "linear-gradient(135deg,#3D2314,#8C6A57)", sender: "Jake Rivera", time: "14m ago" },
  { id: 3, emoji: "??", bg: "linear-gradient(135deg,#1a4a2e,#4CAF8C)", sender: "You", time: "1h ago" },
  { id: 4, emoji: "??", bg: "linear-gradient(135deg,#1a0a2e,#9B5DE5)", sender: "Leo Park", time: "3h ago" },
  { id: 5, emoji: "??", bg: "linear-gradient(135deg,#FF4C2E,#FFB347)", sender: "You", time: "2h ago" },
  { id: 6, emoji: "??", bg: "linear-gradient(135deg,#0a1628,#1a0a2e)", sender: "Priya Sharma", time: "5h ago" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("feed");
  const videoRef = useRef(null);

  useEffect(() => {
    if (activeTab === "camera") {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
        .then(stream => { if (videoRef.current) videoRef.current.srcObject = stream; })
        .catch(() => {});
    }
  }, [activeTab]);

  const navItems = [
    { id: "feed", icon: "??", label: "Feed" },
    { id: "friends", icon: "??", label: "Friends" },
    { id: "camera", icon: "??", label: "Camera" },
    { id: "widgets", icon: "??", label: "Widgets" },
    { id: "profile", icon: "??", label: "Profile" },
  ];

  return (
    <>
      <FontLink />
      <div className="app-container">
        <div className="sidebar animate-slideLeft">
          <div className="logo-section">
            <div className="logo-icon">??</div>
            <div className="logo-text">Locket</div>
          </div>
          <div className="nav-section">
            <h3>Explore</h3>
            <div className="nav-items">
              {navItems.map(item => (
                <button key={item.id} className={`nav-item ${activeTab === item.id ? "active" : ""}`} onClick={() => setActiveTab(item.id)}>
                  <span className="nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="main-content animate-fadein">
          {activeTab === "feed" && (
            <>
              <div className="header">
                <div>
                  <div className="header-title">Your Feed</div>
                  <div className="header-subtitle">Latest moments from your friends</div>
                </div>
                <div className="header-actions">
                  <button className="btn btn-primary" onClick={() => setActiveTab("camera")}>?? Capture</button>
                </div>
              </div>
              <div className="feed-grid">
                {PHOTOS.map((photo, idx) => (
                  <div key={photo.id} className="photo-card animate-fadeup" style={{ background: photo.bg, animationDelay: `${idx * 0.08}s` }}>
                    <div style={{ fontSize: 80 }}>{photo.emoji}</div>
                    <div className="photo-meta">
                      <div className="photo-sender">{photo.sender}</div>
                      <div className="photo-time">{photo.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "friends" && (
            <>
              <div className="header">
                <div>
                  <div className="header-title">Friends</div>
                  <div className="header-subtitle">Your Locket circle</div>
                </div>
                <div className="header-actions">
                  <button className="btn btn-primary">+ Add Friend</button>
                </div>
              </div>
              <div className="cards-grid">
                {FRIENDS.map((friend, idx) => (
                  <div key={friend.id} className="card animate-fadeup" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="card-header">
                      <div style={{ width: 48, height: 48, borderRadius: "50%", background: friend.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                        {friend.emoji}
                      </div>
                      <div>
                        <div className="card-title">{friend.name}</div>
                        <div style={{ fontSize: 12, color: "var(--locket-muted)" }}>Active now</div>
                      </div>
                    </div>
                    <div className="card-content">Shared 24 photos • Last update 2 hours ago</div>
                    <button className="btn btn-secondary" style={{ width: "100%", marginTop: 16 }}>View</button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "camera" && (
            <>
              <div className="header">
                <div>
                  <div className="header-title">Capture Moment</div>
                  <div className="header-subtitle">Share a photo with your friends</div>
                </div>
              </div>
              <div style={{ maxWidth: 600, margin: "0 auto" }}>
                <div className="card" style={{ aspectRatio: "4/3", overflow: "hidden", marginBottom: 24 }}>
                  <video ref={videoRef} autoPlay playsInline muted style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 16 }} />
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <button className="btn btn-primary" style={{ flex: 1 }}>?? Capture</button>
                  <button className="btn btn-secondary" style={{ flex: 1 }}>?? Flip</button>
                </div>
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 12, textTransform: "uppercase", color: "var(--locket-muted)" }}>Send to</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))", gap: 12 }}>
                    {FRIENDS.map(friend => (
                      <div key={friend.id} style={{ textAlign: "center", cursor: "pointer" }}>
                        <div style={{ width: 64, height: 64, borderRadius: "50%", background: friend.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 8px", cursor: "pointer", transition: "transform 0.3s" }} onMouseEnter={e => e.target.style.transform = "scale(1.1)"} onMouseLeave={e => e.target.style.transform = "scale(1)"}>
                          {friend.emoji}
                        </div>
                        <div style={{ fontSize: 12 }}>{friend.name.split(" ")[0]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "widgets" && (
            <>
              <div className="header">
                <div>
                  <div className="header-title">Widget Styles</div>
                  <div className="header-subtitle">How your photos appear on devices</div>
                </div>
              </div>
              <div className="cards-grid">
                {[
                  { title: "Home Screen", desc: "2×2 grid widget", icon: "??" },
                  { title: "Lock Screen", desc: "Minimal widget", icon: "??" },
                  { title: "Dynamic Island", desc: "Mini widget", icon: "??" },
                  { title: "Always-On Display", desc: "Status widget", icon: "?" },
                ].map((widget, idx) => (
                  <div key={idx} className="card animate-fadeup" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="card-header">
                      <div className="card-icon">{widget.icon}</div>
                      <div className="card-title">{widget.title}</div>
                    </div>
                    <div className="card-content">{widget.desc}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "profile" && (
            <>
              <div className="header">
                <div>
                  <div className="header-title">Your Profile</div>
                  <div className="header-subtitle">Your Locket statistics</div>
                </div>
              </div>
              <div className="stats-row">
                <div className="stat-card animate-fadeup">
                  <div className="stat-number">{PHOTOS.length}</div>
                  <div className="stat-label">Photos Shared</div>
                </div>
                <div className="stat-card animate-fadeup delay-1">
                  <div className="stat-number">{FRIENDS.length}</div>
                  <div className="stat-label">Friends Connected</div>
                </div>
                <div className="stat-card animate-fadeup delay-2">
                  <div className="stat-number">48</div>
                  <div className="stat-label">Total Reactions</div>
                </div>
              </div>
              <div className="cards-grid">
                <div className="card animate-fadeup delay-3">
                  <div style={{ fontSize: 14, lineHeight: 1.8 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>?? Notifications</div>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>Get updates when friends share</div>
                  </div>
                </div>
                <div className="card animate-fadeup delay-4">
                  <div style={{ fontSize: 14, lineHeight: 1.8 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>?? Customization</div>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>Personalize your widgets</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
