"use client";

import WorkspaceShell from "../layout/WorkspaceShell";
import type { Role } from "../../lib/assessment";

type Props = {
  userName?: string;
  userInstitution?: string;
  userEmail?: string;
  userArea?: string;
  /** Role chosen on Step 1 of the assessment; drives the role line + plan name. */
  userRole?: Role | null;
  onSignOut: () => void;
  onLogoClick: () => void;
  onNavDeals: () => void;
  onOpenProfile: () => void;
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((s) => s[0]!)
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const ROLE_HEADER: Record<Role, string> = {
  researcher: "Researcher / Academic",
  business: "Business Partner",
  tto: "Technology Transfer Officer",
};

const ROLE_PLAN_NAME: Record<Role, string> = {
  researcher: "Researcher Individual",
  business: "Business Partner Individual",
  tto: "Technology Transfer Office Individual",
};

export default function ProfileUserScreen({
  userName = "Dr. Paulina Chen",
  userInstitution = "Warsaw University of Technology",
  userEmail = "p.chen@pw.edu.pl",
  userArea = "Robotics & Automation",
  userRole = null,
  onSignOut,
  onLogoClick,
  onNavDeals,
  onOpenProfile,
}: Props) {
  const roleHeader = userRole ? ROLE_HEADER[userRole] : null;
  const planName = userRole
    ? ROLE_PLAN_NAME[userRole]
    : "Individual (free trial)";

  return (
    <WorkspaceShell
      mode={{ kind: "profile" }}
      onLogoClick={onLogoClick}
      onOpenProfile={onOpenProfile}
      onNavDeals={onNavDeals}
      userName={userName}
      userInstitution={userInstitution}
    >
      <div className="profile-page" style={{ padding: 0 }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "var(--teal-faint)",
              border: "2px solid var(--teal)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'DM Mono', monospace",
              fontSize: 18,
              fontWeight: 500,
              color: "var(--teal)",
              flexShrink: 0,
            }}
          >
            {initials(userName)}
          </div>
          <div>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 24,
                color: "var(--navy)",
                fontWeight: 400,
                marginBottom: 3,
              }}
            >
              {userName}
            </h2>
            {roleHeader && (
              <div style={{ fontSize: 13, color: "var(--text-light)" }}>
                {roleHeader}
              </div>
            )}
          </div>
        </div>

        {/* Account details */}
        <div className="profile-section">
          <div className="profile-section-title">Account details</div>
          <div className="profile-field">
            <div className="profile-field-label">Email</div>
            <div className="profile-field-value">{userEmail}</div>
          </div>
          <div className="profile-field">
            <div className="profile-field-label">Institution</div>
            <div className="profile-field-value">{userInstitution}</div>
          </div>
          <div className="profile-field">
            <div className="profile-field-label">Research area</div>
            <div className="profile-field-value">{userArea}</div>
          </div>
        </div>

        {/* Licence */}
        <div className="profile-section">
          <div className="profile-section-title">Licence</div>
          <div className="profile-field">
            <div className="profile-field-label">Current plan</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 4,
              }}
            >
              <div className="profile-field-value">{planName}</div>
              <span className="profile-badge">&bull; Active</span>
            </div>
            <div className="profile-field-sub">
              14-day free trial &middot; No credit card required &middot;
              Renews &mdash;
            </div>
          </div>
          <div className="profile-field">
            <div className="profile-field-label">Institution licence</div>
            <div className="profile-field-value">Not connected</div>
            <div className="profile-field-sub">
              Ask your Technology Transfer Office to activate an institutional
              licence
            </div>
          </div>
        </div>

        {/* Settings */}
        {/* demo content */}
        <div className="profile-section">
          <div className="profile-section-title">Settings</div>
          <div className="profile-field">
            <div className="profile-field-label">Email notifications</div>
            <div className="profile-field-value">
              On &mdash; deal updates and compliance alerts
            </div>
          </div>
          <div className="profile-field">
            <div className="profile-field-label">Language</div>
            <div className="profile-field-value">English (UK)</div>
          </div>
          <div className="profile-field">
            <div className="profile-field-label">AI content</div>
            <div className="profile-field-value">
              Show CollabPilot AI label on all generated content
            </div>
            <div className="profile-field-sub">
              Required for transparency &mdash; cannot be disabled
            </div>
          </div>
          <div className="profile-field">
            <div className="profile-field-label">Data &amp; privacy</div>
            <div
              style={{ marginTop: 4, display: "flex", gap: 10 }}
            >
              <button
                type="button"
                className="btn-secondary"
                aria-disabled="true"
                title="Coming soon"
                onClick={(e) => e.preventDefault()}
                style={{ fontSize: 13, padding: "7px 14px" }}
              >
                Download my data
              </button>
              <button
                type="button"
                className="btn-secondary"
                aria-disabled="true"
                title="Coming soon"
                onClick={(e) => e.preventDefault()}
                style={{
                  fontSize: 13,
                  padding: "7px 14px",
                  color: "var(--terra)",
                  borderColor: "var(--terra-border)",
                }}
              >
                Delete account
              </button>
            </div>
          </div>
        </div>

        {/* Session (NEW - hosts the relocated Sign-out) */}
        <div className="profile-section">
          <div className="profile-section-title">Session</div>
          <div className="profile-field">
            <div className="profile-field-label">Account session</div>
            <div className="profile-field-value">
              Signed in as {userName}
            </div>
            <div style={{ marginTop: 4, display: "flex", gap: 10 }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={onSignOut}
                style={{ fontSize: 13, padding: "7px 14px" }}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceShell>
  );
}
