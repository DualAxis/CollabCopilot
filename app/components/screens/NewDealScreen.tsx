"use client";

import { useState } from "react";
import WorkspaceShell from "../layout/WorkspaceShell";

const DEAL_TYPES = [
  {
    id: "ip-licensing",
    icon: "gavel",
    label: "IP Licensing",
    sub: "License your technology",
  },
  {
    id: "sponsored-research",
    icon: "science",
    label: "Sponsored Research",
    sub: "Industry-funded",
  },
  {
    id: "joint-research",
    icon: "handshake",
    label: "Joint Research",
    sub: "Collaborative project",
  },
  {
    id: "fee-for-service",
    icon: "biotech",
    label: "Fee-for-Service",
    sub: "Deliver an output",
  },
  {
    id: "spin-off",
    icon: "rocket_launch",
    label: "Spin-off",
    sub: "Start a venture",
  },
] as const;

type DealTypeId = (typeof DEAL_TYPES)[number]["id"];

type Props = {
  onLogoClick: () => void;
  onOpenProfile: () => void;
  onNavDeals: () => void;
  onNavRoadmap?: () => void;
  onNavChecklists?: () => void;
  onNavDocuments?: () => void;
  onNavKnowledge?: () => void;
  onCancel: () => void;
  onContinue: () => void;
  userName?: string;
  userInstitution?: string;
};

export default function NewDealScreen({
  onLogoClick,
  onOpenProfile,
  onNavDeals,
  onNavRoadmap,
  onNavChecklists,
  onNavDocuments,
  onNavKnowledge,
  onCancel,
  onContinue,
  userName,
  userInstitution,
}: Props) {
  const [dealName, setDealName] = useState(
    "Nexar Robotics \u2014 Cobot Algorithm License"
  );
  const [dealType, setDealType] = useState<DealTypeId>("ip-licensing");
  const [context, setContext] = useState(
    "Nexar Robotics contacted me about licensing my adaptive cobot collision-avoidance algorithm. Provisional patent filed. Paper currently under review at IEEE Transactions on Robotics. Technology Transfer Office not yet briefed."
  );

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
      <div className="nd-inner">
        <div className="breadcrumb">
          <span onClick={onNavDeals} style={{ cursor: "pointer" }}>
            My Deals
          </span>
          <span className="bc-sep">{"\u203a"}</span>
          <span className="bc-act">Start New Deal</span>
        </div>

        <div style={{ marginBottom: 28 }}>
          <h1
            style={{
              fontFamily: "'DM Serif Display',serif",
              fontSize: 28,
              fontWeight: 400,
              color: "var(--navy)",
              marginBottom: 6,
            }}
          >
            Start a new deal
          </h1>
          <p
            style={{
              fontSize: 13.5,
              color: "var(--text-light)",
              lineHeight: 1.55,
            }}
          >
            CollabPilot will generate a personalised roadmap once all parties
            are set up.
          </p>
        </div>

        <div className="fsec">
          <div className="fsec-lbl">Deal name</div>
          <input
            className="f-input"
            type="text"
            value={dealName}
            onChange={(e) => setDealName(e.target.value)}
            style={{ width: "100%", marginBottom: 0 }}
          />
        </div>

        <div className="fsec">
          <div className="fsec-lbl">Deal type</div>
          <div className="dt-grid">
            {DEAL_TYPES.map((t) => {
              const sel = dealType === t.id;
              return (
                <div
                  key={t.id}
                  className={`dt-card${sel ? " sel" : ""}`}
                  onClick={() => setDealType(t.id)}
                >
                  <div className="dt-ic">
                    <span
                      className="ms"
                      style={{
                        fontSize: 22,
                        color: sel ? "var(--teal)" : "var(--text-mid)",
                      }}
                    >
                      {t.icon}
                    </span>
                  </div>
                  <div className="dt-lbl">{t.label}</div>
                  <div className="dt-sub">{t.sub}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="fsec">
          <div
            className="fsec-lbl"
            style={{ display: "flex", alignItems: "center", gap: 5 }}
          >
            <span className="ms" style={{ fontSize: 12 }}>
              auto_awesome
            </span>
            Context {"\u2014"} CollabPilot pre-filled from your assessment
          </div>
          <textarea
            className="a-textarea"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            style={{ minHeight: 72, marginBottom: 0 }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: 9,
            justifyContent: "flex-end",
            marginTop: 16,
          }}
        >
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-primary" onClick={onContinue}>
            Continue {"\u2014"} Invite parties {"\u2192"}
          </button>
        </div>
      </div>
    </WorkspaceShell>
  );
}
