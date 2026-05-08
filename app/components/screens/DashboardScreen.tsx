"use client";

import WorkspaceShell from "../layout/WorkspaceShell";

type Props = {
  onNewDeal: () => void;
  onOpenDeal: () => void;
  onLogoClick: () => void;
  onOpenProfile: () => void;
  onNavDeals?: () => void;
  onNavKnowledge?: () => void;
  userName?: string;
  userInstitution?: string;
};

const DEMO_DEAL = {
  id: "nexar-robotics",
  partner: "Nexar Robotics \u2014 Cobot Algorithm License",
  meta: "IP Licensing \u2022 Exclusive   \u00B7   Stage 1 \u2014 Compliance & Disclosure",
  status: "Active",
  body: "Assessment complete \u2014 2 compliance flags to address before responding to Nexar Robotics",
  footer: "May 7, 2026 \u00B7 Dr. Paulina Chen \u00B7 WUT",
};

export default function DashboardScreen({
  onNewDeal,
  onOpenDeal,
  onLogoClick,
  onOpenProfile,
  onNavDeals,
  onNavKnowledge,
  userName,
  userInstitution,
}: Props) {
  return (
    <WorkspaceShell
      mode={{ kind: "overview", active: "deals" }}
      onLogoClick={onLogoClick}
      onOpenProfile={onOpenProfile}
      onNavDeals={onNavDeals}
      onNavKnowledge={onNavKnowledge}
      userName={userName}
      userInstitution={userInstitution}
    >
      <div className="dash-head" style={{ padding: 0, border: "none" }}>
        <div className="dash-row">
          <h2 className="dash-h">My Deals</h2>
          <button
            className="btn-primary"
            onClick={onNewDeal}
            style={{ fontSize: 13, padding: "9px 18px" }}
          >
            + Start New Deal
          </button>
        </div>
        <p className="dash-sub">Your first deal is ready to set up</p>
      </div>

      <div className="deals-wrap">
        <div className="block-alert">
          <span className="ba-ic">
            <span className="ms" style={{ fontSize: 16, color: "var(--terra)" }}>
              warning
            </span>
          </span>
          <div className="ba-txt">
            <strong>Action needed &mdash; Nexar Robotics.</strong> 2 compliance
            risks identified in your assessment. Open the deal to see your Stage
            1 checklist and full roadmap.
          </div>
        </div>
        <div>
          <div className="ds-lbl">Your first deal</div>
          <div
            className="deal-card dc-prog"
            role="button"
            tabIndex={0}
            onClick={onOpenDeal}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpenDeal();
              }
            }}
            style={{
              border: "1px solid rgba(14,107,115,.25)",
              background: "var(--white)",
              cursor: "pointer",
            }}
          >
            <div className="dc-head">
              <div>
                <div className="dc-co">{DEMO_DEAL.partner}</div>
                <div className="dc-type" style={{ marginTop: 5 }}>
                  {DEMO_DEAL.meta}
                </div>
              </div>
              <span className="badge b-live">&bull; {DEMO_DEAL.status}</span>
            </div>
            <div
              style={{
                fontSize: 13.5,
                color: "var(--text-mid)",
                lineHeight: 1.6,
                marginBottom: 14,
              }}
            >
              {DEMO_DEAL.body}
            </div>
            <div
              className="dc-foot"
              style={{
                borderTop: "1px solid var(--off-white)",
                paddingTop: 12,
              }}
            >
              <div style={{ fontSize: 12.5, color: "var(--text-light)" }}>
                {DEMO_DEAL.footer}
              </div>
              <button
                type="button"
                className="btn-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDeal();
                }}
                style={{ fontSize: 12.5, padding: "6px 14px" }}
              >
                Open deal brief &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceShell>
  );
}
