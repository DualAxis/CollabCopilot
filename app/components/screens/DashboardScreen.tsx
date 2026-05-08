"use client";

import WorkspaceShell from "../layout/WorkspaceShell";

export type DashboardDealCard = {
  partner: string;
  dealType: string;
  currentStage: number;
  alertCount: number;
  dateLabel: string;
  researcher: string;
  institution: string;
};

type Props = {
  deal: DashboardDealCard;
  onNewDeal: () => void;
  onOpenDeal: () => void;
  onLogoClick: () => void;
  onOpenProfile: () => void;
  onNavDeals?: () => void;
  onNavKnowledge?: () => void;
  userName?: string;
  userInstitution?: string;
};

const STAGE_TITLES: Record<number, string> = {
  1: "Compliance & Disclosure",
  2: "NDA & CDA",
  3: "Term Sheet",
  4: "Due Diligence",
  5: "License Agreement",
  6: "Execution",
};

function plural(n: number, singular: string, pluralForm: string): string {
  return `${n} ${n === 1 ? singular : pluralForm}`;
}

export default function DashboardScreen({
  deal,
  onNewDeal,
  onOpenDeal,
  onLogoClick,
  onOpenProfile,
  onNavDeals,
  onNavKnowledge,
  userName,
  userInstitution,
}: Props) {
  const stage = Math.min(6, Math.max(1, Math.round(deal.currentStage)));
  const stageTitle = STAGE_TITLES[stage] ?? STAGE_TITLES[1];

  const meta = `${deal.dealType} \u00B7 Stage ${stage} \u2014 ${stageTitle}`;
  const cardTitle = deal.partner;
  const footer = `${deal.dateLabel} \u00B7 ${deal.researcher} \u00B7 ${deal.institution}`;

  const body =
    deal.alertCount > 0
      ? `Assessment complete \u2014 ${plural(
          deal.alertCount,
          "compliance flag",
          "compliance flags"
        )} to address before responding to ${deal.partner}`
      : `Assessment complete \u2014 open the deal to see your Stage ${stage} checklist and full roadmap`;

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
        {deal.alertCount > 0 && (
          <div className="block-alert">
            <span className="ba-ic">
              <span
                className="ms"
                style={{ fontSize: 16, color: "var(--terra)" }}
              >
                warning
              </span>
            </span>
            <div className="ba-txt">
              <strong>Action needed &mdash; {deal.partner}.</strong>{" "}
              {plural(deal.alertCount, "compliance risk", "compliance risks")}{" "}
              identified in your assessment. Open the deal to see your Stage{" "}
              {stage} checklist and full roadmap.
            </div>
          </div>
        )}
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
                <div className="dc-co">{cardTitle}</div>
                <div className="dc-type" style={{ marginTop: 5 }}>
                  {meta}
                </div>
              </div>
              <span className="badge b-live">&bull; Active</span>
            </div>
            <div
              style={{
                fontSize: 13.5,
                color: "var(--text-mid)",
                lineHeight: 1.6,
                marginBottom: 14,
              }}
            >
              {body}
            </div>
            <div
              className="dc-foot"
              style={{
                borderTop: "1px solid var(--off-white)",
                paddingTop: 12,
              }}
            >
              <div style={{ fontSize: 12.5, color: "var(--text-light)" }}>
                {footer}
              </div>
              <button
                type="button"
                className="btn-primary"
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
