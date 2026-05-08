"use client";

import WorkspaceShell from "../layout/WorkspaceShell";

type Props = {
  onStartDeal: () => void;
  onSignOut: () => void;
  onNavDeals?: () => void;
  userName?: string;
  userRole?: string;
};

export default function EmptyDashboardScreen({
  onStartDeal,
  onSignOut,
  onNavDeals,
  userName,
  userRole,
}: Props) {
  return (
    <WorkspaceShell
      active="deals"
      onSignOut={onSignOut}
      onNavDeals={onNavDeals}
      userName={userName}
      userRole={userRole}
    >
      <div className="dash-head" style={{ padding: 0, border: "none" }}>
        <div className="dash-row">
          <h2 className="dash-h">My Deals</h2>
          <button
            className="btn-primary"
            onClick={onStartDeal}
            style={{ fontSize: 13, padding: "9px 18px" }}
          >
            + Start Assessment
          </button>
        </div>
        <p className="dash-sub">
          No deals yet &mdash; take the assessment to get started
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 32px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "var(--teal-faint)",
            border: "2px dashed rgba(14,107,115,.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <span className="ms" style={{ fontSize: 32, color: "var(--teal)" }}>
            map
          </span>
        </div>
        <h3
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 20,
            color: "var(--navy)",
            marginBottom: 8,
          }}
        >
          No deals yet
        </h3>
        <p
          style={{
            fontSize: 13.5,
            color: "var(--text-light)",
            lineHeight: 1.65,
            maxWidth: 360,
            marginBottom: 24,
          }}
        >
          Take the free assessment to get a personalised compliance check and
          your deal roadmap. It takes under 2 minutes.
        </p>
        <button
          className="btn-primary"
          onClick={onStartDeal}
          style={{ fontSize: 14, padding: "13px 28px" }}
        >
          Take the Assessment to start your first deal &rarr;
        </button>
        {/* TODO(M14): replace with "Create it manually -> s-new-deal" link */}
      </div>
    </WorkspaceShell>
  );
}
