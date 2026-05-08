"use client";

type Props = {
  onSignOut: () => void;
};

export default function DashboardPlaceholderScreen({ onSignOut }: Props) {
  return (
    <div
      id="s-dashboard-placeholder"
      className="screen active"
      style={{ background: "var(--off-white)" }}
    >
      <nav className="top-nav">
        <div className="nav-logo" style={{ cursor: "default" }}>
          <div className="logo-dot"></div>
          <span className="logo-text">CollabPilot</span>
        </div>
        <div className="nav-actions">
          <button className="nav-link" onClick={onSignOut}>
            ← Sign out
          </button>
        </div>
      </nav>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
        }}
      >
        <div
          style={{
            background: "var(--white)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "40px 36px",
            maxWidth: "440px",
            width: "100%",
            textAlign: "center",
            boxShadow: "0 4px 28px rgba(0,0,0,.055)",
          }}
        >
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--teal)",
              marginBottom: "10px",
            }}
          >
            Signed in
          </div>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "24px",
              color: "var(--navy)",
              marginBottom: "10px",
              fontWeight: 400,
            }}
          >
            Dashboard ships in M8
          </h2>
          <p
            style={{
              fontSize: "13.5px",
              color: "var(--text-mid)",
              lineHeight: 1.6,
              marginBottom: "20px",
            }}
          >
            You&rsquo;re in demo mode &mdash; no account required. The deals
            dashboard, deal brief, roadmap, documents and knowledge library
            land in upcoming milestones.
          </p>
          <button
            className="btn-secondary"
            onClick={onSignOut}
            style={{ fontSize: "13px", padding: "9px 18px" }}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
