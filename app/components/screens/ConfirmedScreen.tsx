"use client";

type Props = {
  onBack: () => void;
  onLogoClick: () => void;
  onOpenRoadmap: () => void;
};

export default function ConfirmedScreen({
  onBack,
  onLogoClick,
  onOpenRoadmap,
}: Props) {
  return (
    <div className="screen active" style={{ background: "var(--white)" }}>
      <nav className="top-nav">
        <div
          className="nav-logo"
          onClick={onLogoClick}
          style={{ cursor: "pointer" }}
        >
          <div className="logo-dot"></div>
          <span className="logo-text">CollabPilot</span>
        </div>
        <div className="nav-actions">
          <button
            className="btn-secondary"
            onClick={onBack}
            style={{ fontSize: 13, padding: "7px 13px" }}
          >
            {"\u2190"} Back
          </button>
        </div>
      </nav>
      <div className="conf-inner">
        <div className="conf-badge">
          <span className="ms" style={{ fontSize: 30, color: "var(--teal)" }}>
            celebration
          </span>
        </div>
        <h2 className="conf-h">Katarzyna W. joined your deal</h2>
        <p className="conf-sub">
          Your Technology Transfer Officer has accepted the invitation. All
          three parties are now connected to the shared roadmap.
        </p>
        <div className="conf-parties">
          <div className="cp">
            <div className="cp-ic">
              <span
                className="ms"
                style={{ fontSize: 18, color: "var(--teal)" }}
              >
                person
              </span>
            </div>
            <div className="cp-name">Dr. Paulina Chen</div>
            <div className="cp-st ok">{"\u2713"} Joined</div>
          </div>
          <div className="cp">
            <div className="cp-ic">
              <span
                className="ms"
                style={{ fontSize: 18, color: "var(--teal)" }}
              >
                account_balance
              </span>
            </div>
            <div className="cp-name">Katarzyna W.</div>
            <div className="cp-st ok">{"\u2713"} Just joined</div>
          </div>
          <div className="cp">
            <div className="cp-ic">
              <span
                className="ms"
                style={{ fontSize: 18, color: "var(--text-mid)" }}
              >
                business
              </span>
            </div>
            <div className="cp-name">Nexar Robotics {"\u2014"} Marek Nowak</div>
            <div className="cp-st pend">Invited</div>
          </div>
        </div>
        <button
          className="btn-primary"
          onClick={onOpenRoadmap}
          style={{
            fontSize: 15,
            padding: "14px 32px",
            animation: "fadeUp .4s .4s both",
          }}
        >
          Open the shared roadmap {"\u2192"}
        </button>
      </div>
    </div>
  );
}
