"use client";

import type { DealBrief } from "../../lib/dealBrief";

type Props = {
  onBack: () => void;
  onLogoClick: () => void;
  onOpenRoadmap: () => void;
  dealBrief: DealBrief;
  userName?: string;
  userInstitution?: string;
};

export default function ConfirmedScreen({
  onBack,
  onLogoClick,
  onOpenRoadmap,
  dealBrief,
  userName,
  userInstitution,
}: Props) {
  const researcherLabel =
    (userName && userName.trim()) ||
    (dealBrief.who.researcher.trim() !== "Researcher"
      ? dealBrief.who.researcher
      : "You");
  const institutionLabel =
    (userInstitution && userInstitution.trim()) ||
    dealBrief.who.institution ||
    "Your institution";
  const partner = dealBrief.who.businessPartner;

  return (
    <div className="screen active" style={{ background: "var(--white)" }}>
      <nav className="top-nav">
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
            className="btn-secondary"
            onClick={onBack}
            style={{ fontSize: 13, padding: "7px 13px" }}
          >
            {"\u2190"} Back
          </button>
        </div>
      </nav>
      <div className="conf-inner">
        <div className="conf-badge">
          <span className="ms" style={{ fontSize: 30, color: "var(--teal)" }}>
            celebration
          </span>
        </div>
        <h2 className="conf-h">Your Technology Transfer Officer joined</h2>
        <p className="conf-sub">
          The TTO at {institutionLabel} has accepted the invitation. All three
          parties are now connected to the shared roadmap.
        </p>
        <div className="conf-parties">
          <div className="cp">
            <div className="cp-ic">
              <span
                className="ms"
                style={{ fontSize: 18, color: "var(--teal)" }}
              >
                person
              </span>
            </div>
            <div className="cp-name">{researcherLabel}</div>
            <div className="cp-st ok">{"\u2713"} Joined</div>
          </div>
          <div className="cp">
            <div className="cp-ic">
              <span
                className="ms"
                style={{ fontSize: 18, color: "var(--teal)" }}
              >
                account_balance
              </span>
            </div>
            <div className="cp-name">
              Technology Transfer Office {"\u2014"} {institutionLabel}
            </div>
            <div className="cp-st ok">{"\u2713"} Just joined</div>
          </div>
          <div className="cp">
            <div className="cp-ic">
              <span
                className="ms"
                style={{ fontSize: 18, color: "var(--text-mid)" }}
              >
                business
              </span>
            </div>
            <div className="cp-name">
              {partner} {"\u2014"} BD Team
            </div>
            <div className="cp-st pend">Invited</div>
          </div>
        </div>
        <button
          className="btn-primary"
          onClick={onOpenRoadmap}
          style={{
            fontSize: 15,
            padding: "14px 32px",
            animation: "fadeUp .4s .4s both",
          }}
        >
          Open the shared roadmap {"\u2192"}
        </button>
      </div>
    </div>
  );
}
