"use client";

type Props = {
  onStartAssessment: () => void;
  onSignIn: () => void;
};

export default function LandingScreen({ onStartAssessment, onSignIn }: Props) {
  return (
    <div id="s-landing" className="screen active">
      <div className="land-bg"></div>
      <div className="land-grid"></div>

      <nav className="top-nav dark" style={{ position: "relative", zIndex: 2 }}>
        <div
          className="nav-logo"
          onClick={() => console.log("TODO: navigate home (goHome)")}
          style={{ cursor: "pointer" }}
        >
          <div className="logo-dot"></div>
          <span className="logo-text">CollabPilot</span>
        </div>
        <div className="nav-actions">
          <button
            type="button"
            onClick={onSignIn}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "transparent",
              color: "rgba(255,255,255,0.75)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13.5px",
              fontWeight: 500,
              padding: "8px 18px",
              borderRadius: "100px",
              border: "1.5px solid rgba(255,255,255,0.25)",
              cursor: "pointer",
              transition: "all .2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
              e.currentTarget.style.color = "rgba(255,255,255,0.75)";
            }}
          >
            Sign in
          </button>
          <button
            className="btn-primary"
            onClick={onStartAssessment}
            style={{ padding: "8px 18px", fontSize: "13px" }}
          >
            Take the Assessment
          </button>
        </div>
      </nav>

      <div className="land-inner">
        <div className="land-eye">Starts where matchmaking platforms stop</div>
        <h1 className="land-h1">
          A company just emailed you<br />about your research.<br />
          <em>What now?</em>
        </h1>
        <p className="land-sub">
          Three parties. One deal.{" "}
          <strong>
            Your deal is secured, tailored to you, and credible to your partner.
          </strong>{" "}
          CollabPilot navigates the post-match complexity no platform currently
          addresses.
        </p>

        <div className="prompts">
          <div className="prompt">
            <div className="prompt-ic">📩</div>
            <div className="prompt-txt">
              &ldquo;A company reached out about licensing my robotics
              algorithm. They want exclusivity. What should I do first?&rdquo;
            </div>
          </div>
          <div className="prompt">
            <div className="prompt-ic">⚖️</div>
            <div className="prompt-txt">
              &ldquo;My paper is under review and a company wants to discuss
              commercialisation. Is that even allowed?&rdquo;
            </div>
          </div>
          <div className="prompt">
            <div className="prompt-ic">🏛️</div>
            <div className="prompt-txt">
              &ldquo;I don&rsquo;t know if I need to involve my Technology
              Transfer Office before talking to industry.&rdquo;
            </div>
          </div>
        </div>

        <div className="land-cta">
          <button
            className="btn-primary"
            onClick={onStartAssessment}
            style={{ fontSize: "15px", padding: "14px 32px" }}
          >
            Take the Free Assessment →
          </button>
        </div>

        <div className="land-foot" style={{ marginTop: "22px" }}>
          Trusted by researchers navigating IP licensing · Sponsored research ·
          Joint research
        </div>
      </div>
    </div>
  );
}
