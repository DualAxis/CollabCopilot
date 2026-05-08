"use client";

import WorkspaceShell from "../layout/WorkspaceShell";
import AILabel from "../ui/AILabel";

type Props = {
  onSignOut: () => void;
};

export default function DashboardPlaceholderScreen({ onSignOut }: Props) {
  return (
    <WorkspaceShell active="deals" onSignOut={onSignOut}>
      <AILabel context="Workspace preview" />
      <h1
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "30px",
          color: "var(--navy)",
          fontWeight: 400,
          margin: "8px 0 10px",
          letterSpacing: "-0.2px",
        }}
      >
        Your workspace is taking shape
      </h1>
      <p
        style={{
          fontSize: "14px",
          color: "var(--text-mid)",
          lineHeight: 1.65,
          maxWidth: "640px",
        }}
      >
        You are in demo mode. The deals dashboard, deal brief, roadmap,
        documents and knowledge library land in upcoming milestones.
      </p>
    </WorkspaceShell>
  );
}
