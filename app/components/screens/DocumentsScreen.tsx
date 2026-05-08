"use client";

import WorkspaceShell from "../layout/WorkspaceShell";

type ActiveDoc = {
  status: "done" | "inprog";
  icon: string;
  iconColor: string;
  name: string;
  meta: string;
  badge: "Submitted" | "In progress";
  cta: string;
};

type Template = {
  locked: boolean;
  stage?: string;
  name: string;
  meta: string;
};

const ACTIVE_DOCS: ActiveDoc[] = [
  {
    status: "done",
    icon: "description",
    iconColor: "var(--sage)",
    name: "IP Disclosure Form",
    meta: "Submitted to WUT TTO \u00b7 May 7, 2026 \u00b7 Required for Stage 1",
    badge: "Submitted",
    cta: "View",
  },
  {
    status: "inprog",
    icon: "edit_note",
    iconColor: "var(--amber-text)",
    name: "Confidential Disclosure Agreement \u2014 Draft",
    meta: "Initiated with Nexar Robotics \u00b7 Awaiting TTO review \u00b7 Updated May 7, 2026",
    badge: "In progress",
    cta: "Continue \u2192",
  },
];

const TEMPLATES: Template[] = [
  {
    locked: false,
    name: "TTO Briefing Template",
    meta: "Stage 1 \u00b7 Pre-filled with your deal context \u00b7 Ready to send",
  },
  {
    locked: false,
    name: "Non-Confidential Research Summary",
    meta: "Stage 1 \u00b7 Safe to share before CDA \u00b7 AI-drafted from your profile",
  },
  {
    locked: false,
    name: "Holding Reply to Nexar Robotics",
    meta: "Stage 1 \u00b7 AI-drafted \u00b7 Polite, no technical data, buys 5 days",
  },
  { locked: true, stage: "Stage 2", name: "NDA Template", meta: "Stage 2" },
  {
    locked: true,
    stage: "Stage 3",
    name: "Term Sheet Template",
    meta: "Stage 3",
  },
  {
    locked: true,
    stage: "Stage 5",
    name: "License Agreement Template",
    meta: "Stage 5",
  },
];

type Props = {
  onLogoClick: () => void;
  onOpenProfile: () => void;
  onNavDeals: () => void;
  onNavDealBrief?: () => void;
  onNavRoadmap?: () => void;
  onNavChecklists?: () => void;
  onNavKnowledge?: () => void;
  userName?: string;
  userInstitution?: string;
};

export default function DocumentsScreen({
  onLogoClick,
  onOpenProfile,
  onNavDeals,
  onNavDealBrief,
  onNavRoadmap,
  onNavChecklists,
  onNavKnowledge,
  userName,
  userInstitution,
}: Props) {
  const noop = (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault();

  return (
    <WorkspaceShell
      mode={{
        kind: "inDeal",
        active: "documents",
        dealName: "Nexar Robotics",
        dealSubLabel: "IP Licensing \u00b7 Stage 1",
      }}
      onLogoClick={onLogoClick}
      onOpenProfile={onOpenProfile}
      onNavDeals={onNavDeals}
      onNavDealBrief={onNavDealBrief}
      onNavRoadmap={onNavRoadmap}
      onNavChecklists={onNavChecklists}
      onNavKnowledge={onNavKnowledge}
      userName={userName}
      userInstitution={userInstitution}
    >
      <div className="doc-inner">
        <div className="brief-crumb" style={{ marginBottom: 20 }}>
          <span onClick={onNavDealBrief} style={{ cursor: "pointer" }}>
            Nexar Robotics
          </span>
          <span className="brief-crumb-sep">{"\u203a"}</span>
          <span style={{ color: "var(--text-dark)" }}>My Documents</span>
        </div>

        <div style={{ marginBottom: 32 }}>
          <h1
            style={{
              fontFamily: "'DM Serif Display',serif",
              fontSize: 28,
              fontWeight: 400,
              color: "var(--navy)",
              marginBottom: 6,
            }}
          >
            My Documents
          </h1>
          <p
            style={{
              fontSize: 13.5,
              color: "var(--text-light)",
              lineHeight: 1.55,
            }}
          >
            {"Stage 1 \u2014 Compliance & Disclosure \u00b7 Nexar Robotics deal"}
          </p>
        </div>

        <div className="doc-section">
          <div className="doc-section-head">
            <span className="doc-sec-label">This deal</span>
            <span style={{ fontSize: 12.5, color: "var(--text-light)" }}>
              {"2 documents \u00b7 1 done \u00b7 1 in progress"}
            </span>
          </div>
          <div className="doc-list">
            {ACTIVE_DOCS.map((d) => (
              <div className="doc-row" key={d.name}>
                <div className={`doc-ic ${d.status}`}>
                  <span
                    className="ms"
                    style={{ fontSize: 18, color: d.iconColor }}
                  >
                    {d.icon}
                  </span>
                </div>
                <div className="doc-body">
                  <div className="doc-name">{d.name}</div>
                  <div className="doc-meta">{d.meta}</div>
                </div>
                <div className="doc-right">
                  <span className={`doc-badge ${d.status}`}>{d.badge}</span>
                  <button
                    className="btn-secondary"
                    onClick={noop}
                    style={{ fontSize: 13, padding: "7px 16px" }}
                  >
                    {d.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="doc-section">
          <div className="doc-section-head">
            <span className="doc-sec-label">Templates</span>
            <span style={{ fontSize: 12.5, color: "var(--text-light)" }}>
              {
                "Stage 1 available \u00b7 Stages 2\u20136 unlock as you progress"
              }
            </span>
          </div>
          <div className="doc-list">
            {TEMPLATES.map((t) =>
              t.locked ? (
                <div
                  className="doc-row"
                  key={t.name}
                  style={{ opacity: 0.4, pointerEvents: "none" }}
                >
                  <div className="doc-ic locked">
                    <span
                      className="ms"
                      style={{ fontSize: 18, color: "var(--text-light)" }}
                    >
                      assignment
                    </span>
                  </div>
                  <div className="doc-body">
                    <div className="doc-name locked">{t.name}</div>
                    <div className="doc-meta">{t.meta}</div>
                  </div>
                  <div className="doc-right">
                    <span className="doc-badge locked">{t.stage}</span>
                  </div>
                </div>
              ) : (
                <div className="doc-row" key={t.name}>
                  <div className="doc-ic tmpl">
                    <span
                      className="ms"
                      style={{ fontSize: 18, color: "var(--text-mid)" }}
                    >
                      assignment
                    </span>
                  </div>
                  <div className="doc-body">
                    <div className="doc-name">{t.name}</div>
                    <div className="doc-meta">{t.meta}</div>
                  </div>
                  <div className="doc-right">
                    <button
                      className="btn-secondary"
                      onClick={noop}
                      style={{ fontSize: 13, padding: "7px 16px" }}
                    >
                      Use template
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </WorkspaceShell>
  );
}
