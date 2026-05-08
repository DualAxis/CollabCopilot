"use client";

import type { AssessmentState, Role } from "../../lib/assessment";
import { AREA_OPTIONS } from "../../lib/assessment";

type Props = {
  state: AssessmentState;
  setState: React.Dispatch<React.SetStateAction<AssessmentState>>;
  onContinue: () => void;
  onBack: () => void;
};

const TOTAL_STEPS = 6;

const ROLES: { id: Role; ic: string; name: string; desc: string }[] = [
  {
    id: "researcher",
    ic: "school",
    name: "Researcher / Academic",
    desc: "University PI, postdoc, or department lead commercialising research",
  },
  {
    id: "business",
    ic: "factory",
    name: "Business Partner",
    desc: "Company or investor entering a deal with a research institution",
  },
  {
    id: "tto",
    ic: "account_balance",
    name: "TTO / Intermediary",
    desc: "Technology transfer officer managing the process",
  },
];

export default function ProfileScreen({
  state,
  setState,
  onContinue,
  onBack,
}: Props) {
  const profile = state.profile;

  const setName = (name: string) =>
    setState((s) => ({ ...s, profile: { ...s.profile, name } }));

  const setInstitution = (institution: string) =>
    setState((s) => ({ ...s, profile: { ...s.profile, institution } }));

  const setEmail = (email: string) =>
    setState((s) => ({ ...s, profile: { ...s.profile, email } }));

  const pickArea = (area: string) =>
    setState((s) => {
      const alreadySelected = s.profile.area.includes(area);
      const nextArea = alreadySelected ? [] : [area];
      return { ...s, profile: { ...s.profile, area: nextArea } };
    });

  const pickRole = (role: Role) =>
    setState((s) => ({ ...s, profile: { ...s.profile, role } }));

  const canContinue = Boolean(
    profile.name.trim() &&
      profile.institution.trim() &&
      profile.email.trim() &&
      profile.role
  );

  return (
    <div id="s-profile" className="screen screen-assess active">
      <nav className="top-nav">
        <div
          className="nav-logo"
          onClick={() => console.log("TODO: navigate home (goHome)")}
          style={{ cursor: "pointer" }}
        >
          <div className="logo-dot"></div>
          <span className="logo-text">CollabPilot</span>
        </div>
        <div className="nav-actions">
          <button className="nav-link" onClick={onBack}>
            ← Back
          </button>
        </div>
      </nav>

      <div className="prof-body">
        <div className="prof-inner">
          <div className="a-prog" style={{ marginBottom: "20px" }}>
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div key={i} className={`a-step ${i === 0 ? "cur" : ""}`}></div>
            ))}
            <span className="a-lbl">Step 1 of {TOTAL_STEPS}</span>
          </div>

          <div className="a-eye">Assessment · Profile</div>
          <h2 className="a-h">Let&rsquo;s start with you and this deal</h2>
          <p className="a-sub" style={{ marginBottom: "24px" }}>
            Tell us about yourself — we&rsquo;ll tailor the next questions and
            surface the right compliance rules for your institution.
          </p>

          <div className="prof-field">
            <label className="prof-label" htmlFor="prof-name">
              Full name
            </label>
            <input
              id="prof-name"
              className="prof-input"
              type="text"
              placeholder="Dr. Paulina Chen"
              value={profile.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="prof-field">
            <label className="prof-label" htmlFor="prof-institution">
              Institution or company name
            </label>
            <input
              id="prof-institution"
              className="prof-input"
              type="text"
              placeholder="Warsaw University of Technology"
              value={profile.institution}
              onChange={(e) => setInstitution(e.target.value)}
            />
          </div>

          <div className="prof-field">
            <label className="prof-label" htmlFor="prof-inst-email">
              Institutional or company email{" "}
              <span className="prof-label-hint">(.edu · .ac.uk · .pl)</span>
            </label>
            <input
              id="prof-inst-email"
              className="prof-input"
              type="email"
              placeholder="p.chen@pw.edu.pl"
              value={profile.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="prof-input-hint">
              Used to surface institution-specific compliance rules. Never
              shared.
            </div>
          </div>

          <div className="prof-field">
            <label className="prof-label">Research area or industry</label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "6px",
              }}
            >
              {AREA_OPTIONS.map((area) => {
                const sel = profile.area.includes(area);
                return (
                  <div
                    key={area}
                    className={`area-chip${sel ? " sel" : ""}`}
                    onClick={() => pickArea(area)}
                  >
                    {area}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="prof-field">
            <label className="prof-label">Your role</label>
            <div className="role-cards">
              {ROLES.map((role) => {
                const sel = profile.role === role.id;
                return (
                  <div
                    key={role.id}
                    className={`role-card${sel ? " sel" : ""}`}
                    onClick={() => pickRole(role.id)}
                  >
                    <div className="role-ic">
                      <span
                        className="ms"
                        style={{ fontSize: "24px", color: "var(--teal)" }}
                      >
                        {role.ic}
                      </span>
                    </div>
                    <div>
                      <div className="role-name">{role.name}</div>
                      <div className="role-desc">{role.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="a-foot" style={{ marginTop: "8px" }}>
            <button className="a-back" onClick={onBack}>
              ← Back
            </button>
            <button
              className="btn-primary"
              onClick={onContinue}
              disabled={!canContinue}
              style={
                !canContinue
                  ? { opacity: 0.5, cursor: "not-allowed" }
                  : undefined
              }
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
