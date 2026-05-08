"use client";

type Props = {
  onStartAssessment: () => void;
  onSignIn: () => void;
  onLogoClick: () => void;
};

type Benefit = {
  icon: string;
  title: string;
  desc: string;
};

type Step = {
  num: string;
  title: string;
  desc: string;
};

const BENEFITS: Benefit[] = [
  {
    icon: "verified_user",
    title: "Compliance from day one",
    desc: "Before anyone discusses terms, know exactly what can and cannot be shared — protecting IP, publication rights, and institutional policy from the very first email.",
  },
  {
    icon: "route",
    title: "A roadmap everyone can see",
    desc: "A personalised 6-stage deal roadmap — shared across researcher, TTO, and business partner in real time. Every party knows where the deal stands and what comes next.",
  },
  {
    icon: "folder_open",
    title: "Documents, checklists, one workspace",
    desc: "All deal materials organised by stage. AI-drafted emails, compliance checklists, document templates — no email threads, no version confusion.",
  },
];

const STEPS: Step[] = [
  {
    num: "1",
    title: "AI Assessment",
    desc: "Answer 6 adaptive questions about the deal, IP status, and situation. Takes under 2 minutes.",
  },
  {
    num: "2",
    title: "Instant Results",
    desc: "Compliance flags, safe actions for today, and a preview of the personalised 6-stage deal roadmap.",
  },
  {
    num: "3",
    title: "Your Workspace",
    desc: "Documents, checklists, and AI guidance organised by stage — everything the deal needs in one place.",
  },
  {
    num: "4",
    title: "Navigate Together",
    desc: "Researcher, TTO, and business partner on one live roadmap — progress visible to all, in real time.",
  },
];

export default function LandingScreen({
  onStartAssessment,
  onSignIn,
  onLogoClick,
}: Props) {
  return (
    <div id="s-landing" className="screen active">
      <nav className="top-nav dark" style={{ position: "relative", zIndex: 2 }}>
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

      {/* HERO */}
      <div className="v8-hero">
        <div className="v8-hero-grid"></div>
        <div className="v8-hero-glow"></div>
        <div className="v8-hero-inner">
          {/* demo content */}
          <div className="v8-eye">
            University · Industry · Research commercialisation
          </div>
          <h1 className="v8-h1">
            Navigate your research deal
            <br />
            from first email to <em>signed agreement.</em>
          </h1>
          <p className="v8-sub">
            Three parties. One shared workspace. AI-guided every step of the
            way.
          </p>
          <button className="v8-cta" onClick={onStartAssessment}>
            Take the Free Assessment →
          </button>
        </div>
      </div>

      {/* BENEFITS */}
      <div className="v8-benefits">
        {/* demo content */}
        <div className="v8-sec-eye">Built for the deal</div>
        <div className="v8-sec-h">What is CollabPilot for?</div>
        <div className="v8-sec-sub">
          Getting from a commercial inquiry to a signed agreement takes months
          — navigating IP compliance, TTO coordination, and business partner
          trust at the same time. CollabPilot makes that journey structured,
          transparent, and shared across all three parties.
        </div>
        <div className="v8-benefits-grid">
          {BENEFITS.map((b) => (
            <div className="v8-bcard" key={b.title}>
              <div className="v8-bcard-icon">
                <span className="ms">{b.icon}</span>
              </div>
              <div className="v8-bcard-title">{b.title}</div>
              <div className="v8-bcard-desc">{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="v8-hiw">
        {/* demo content */}
        <div className="v8-sec-eye">How it works</div>
        <div className="v8-sec-h" style={{ textAlign: "center" }}>
          From assessment to roadmap in minutes
        </div>
        <div className="v8-steps">
          {STEPS.map((s) => (
            <div className="v8-step" key={s.num}>
              <div className="v8-step-num">{s.num}</div>
              <div className="v8-step-title">{s.title}</div>
              <div className="v8-step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER STRIP */}
      <div className="v8-foot">
        {/* demo content */}
        <div className="v8-foot-txt">
          Trusted across IP licensing · Sponsored research · Joint research ·
          Fee-for-service
        </div>
      </div>
    </div>
  );
}
