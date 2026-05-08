"use client";

import WorkspaceShell from "../layout/WorkspaceShell";

type Props = {
  onSignOut: () => void;
  onLogoClick: () => void;
  onNavDeals: () => void;
  onOpenProfile: () => void;
  userName?: string;
  userInstitution?: string;
};

export default function ProfileUserScreen({
  onSignOut,
  onLogoClick,
  onNavDeals,
  onOpenProfile,
  userName,
  userInstitution,
}: Props) {
  return (
    <WorkspaceShell
      mode={{ kind: "overview", active: "deals" }}
      onLogoClick={onLogoClick}
      onOpenProfile={onOpenProfile}
      onNavDeals={onNavDeals}
      userName={userName}
      userInstitution={userInstitution}
    >
      <div style={{ padding: "8px 0" }}>
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 24,
            color: "var(--navy)",
            marginBottom: 8,
          }}
        >
          Profile
        </h2>
        <p
          style={{
            fontSize: 13.5,
            color: "var(--text-light)",
            marginBottom: 24,
          }}
        >
          Coming soon &mdash; full Account / Licence / Settings page lands in
          M15.
        </p>
        <button className="btn-secondary" onClick={onSignOut}>
          Sign out
        </button>
      </div>
    </WorkspaceShell>
  );
}
