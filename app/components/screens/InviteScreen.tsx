"use client";

import { useState } from "react";
import WorkspaceShell from "../layout/WorkspaceShell";

type Props = {
  onLogoClick: () => void;
  onOpenProfile: () => void;
  onNavDeals: () => void;
  onNavRoadmap?: () => void;
  onNavChecklists?: () => void;
  onNavDocuments?: () => void;
  onNavKnowledge?: () => void;
  onBack: () => void;
  onContinue: () => void;
  userName?: string;
  userInstitution?: string;
};

export default function InviteScreen({
  onLogoClick,
  onOpenProfile,
  onNavDeals,
  onNavRoadmap,
  onNavChecklists,
  onNavDocuments,
  onNavKnowledge,
  onBack,
  onContinue,
  userName,
  userInstitution,
}: Props) {
  const [bizEmail, setBizEmail] = useState("marek.nowak@nexarrobotics.com");
  const [bizSent, setBizSent] = useState(false);

  return (
    <WorkspaceShell
      mode={{
        kind: "inDeal",
        active: "deal-brief",
        dealName: "Nexar Robotics",
        dealSubLabel: "IP Licensing \u00b7 Stage 1",
      }}
      onLogoClick={onLogoClick}
      onOpenProfile={onOpenProfile}
      onNavDeals={onNavDeals}
      onNavRoadmap={onNavRoadmap}
      onNavChecklists={onNavChecklists}
      onNavDocuments={onNavDocuments}
      onNavKnowledge={onNavKnowledge}
      userName={userName}
      userInstitution={userInstitution}
    >
      <div className="inv-inner">
        <div className="breadcrumb">
          <span onClick={onNavDeals} style={{ cursor: "pointer" }}>
            My Deals
          </span>
          <span className="bc-sep">{"\u203a"}</span>
          <span onClick={onBack} style={{ cursor: "pointer" }}>
            New Deal
          </span>
          <span className="bc-sep">{"\u203a"}</span>
          <span className="bc-act">Invite Parties</span>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div className="dash-h" style={{ marginBottom: 4 }}>
            Invite your deal partners
          </div>
          <p className="dash-sub">
            All three parties need to join before the roadmap goes live {"\u2014"}{" "}
            everyone sees the same status in real time.
          </p>
        </div>

        <div
          className="inv-party"
          style={{
            borderColor: "rgba(14,107,115,.18)",
            background: "rgba(14,107,115,.02)",
          }}
        >
          <div className="inv-ph">
            <div className="inv-pic tto">
              <span
                className="ms"
                style={{ fontSize: 20, color: "var(--teal)" }}
              >
                person
              </span>
            </div>
            <div>
              <div className="inv-pname">You {"\u2014"} Dr. Paulina Chen</div>
              <div className="inv-prole">
                Researcher {"\u00b7"} WUT Robotics Department
              </div>
            </div>
            <span className="badge b-complete" style={{ marginLeft: "auto" }}>
              {"\u2713"} Joined
            </span>
          </div>
        </div>

        <div className="inv-party">
          <div className="inv-ph">
            <div className="inv-pic tto">
              <span
                className="ms"
                style={{ fontSize: 20, color: "var(--teal)" }}
              >
                account_balance
              </span>
            </div>
            <div>
              <div className="inv-pname">Technology Transfer Office</div>
              <div className="inv-prole">
                Institutional {"\u2014"} WUT / Politechnika Warszawska
              </div>
            </div>
            <span className="inv-tag">Pending</span>
          </div>
          <div className="inv-sent" style={{ marginBottom: 8 }}>
            <span className="inv-sent-ic">{"\u2713"}</span>
            <span className="inv-sent-txt">
              Invitation sent to katarzyna.w@pw.edu.pl
            </span>
          </div>
          <div style={{ fontSize: 12.5, color: "var(--text-light)" }}>
            Your Technology Transfer Officer will receive an email with
            instructions to join this deal. They must accept before Stage 2 can
            begin.
          </div>
        </div>

        <div className="inv-party">
          <div className="inv-ph">
            <div className="inv-pic biz">
              <span
                className="ms"
                style={{ fontSize: 20, color: "var(--teal)" }}
              >
                business
              </span>
            </div>
            <div>
              <div className="inv-pname">Business Partner</div>
              <div className="inv-prole">Nexar Robotics {"\u2014"} BD Team</div>
            </div>
            <span className="inv-tag">{bizSent ? "Sent" : "Pending"}</span>
          </div>
          {bizSent && (
            <div className="inv-sent" style={{ marginBottom: 8 }}>
              <span className="inv-sent-ic">{"\u2713"}</span>
              <span className="inv-sent-txt">
                Invitation sent to {bizEmail}
              </span>
            </div>
          )}
          <div className="inv-row">
            <div style={{ flex: 1 }}>
              <label className="f-label">Business contact email</label>
              <input
                className="f-input"
                type="email"
                value={bizEmail}
                onChange={(e) => setBizEmail(e.target.value)}
                disabled={bizSent}
              />
            </div>
            <button
              className="btn-primary"
              style={{ flexShrink: 0, marginTop: 18 }}
              onClick={() => setBizSent(true)}
              disabled={bizSent}
            >
              {bizSent ? "Sent" : "Send invite"}
            </button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 9,
            justifyContent: "flex-end",
            marginTop: 6,
          }}
        >
          <button className="btn-secondary" onClick={onBack}>
            {"\u2190"} Back
          </button>
          <button className="btn-primary" onClick={onContinue}>
            Continue {"\u2014"} View roadmap {"\u2192"}
          </button>
        </div>
      </div>
    </WorkspaceShell>
  );
}
