"use client";

import WorkspaceShell from "../layout/WorkspaceShell";
import type {
  DealBrief,
  PartyAccessStatus,
  SignoffStatus,
} from "../../lib/dealBrief";

type Props = {
  dealBrief: DealBrief;
  onBackToDealsList: () => void;
  onLogoClick: () => void;
  onOpenProfile: () => void;
  onNavDealBrief?: () => void;
  onNavChecklists?: () => void;
  onNavDocuments?: () => void;
  onNavKnowledge?: () => void;
  userName?: string;
  userInstitution?: string;
};

type Stage = {
  num: string;
  name: string;
  dur: string;
  ownerLabel: string;
};

const LOCKED_STAGES: Stage[] = [
  {
    num: "02",
    name: "Due Diligence",
    dur: "~4 weeks \u00B7 Financial analysis + Intellectual Property scope review",
    ownerLabel: "Technology Transfer Office",
  },
  {
    num: "03",
    name: "Term Sheet",
    dur: "3\u20136 weeks \u00B7 Heads of terms + exclusivity scope discussion",
    ownerLabel: "Technology Transfer Office + Business",
  },
  {
    num: "04",
    name: "Negotiation",
    dur: "1\u20139 months \u00B7 Legal review + three-party sign-off",
    ownerLabel: "ALL 3",
  },
  {
    num: "05",
    name: "Signature",
    dur: "2\u20133 weeks \u00B7 Execution + final IP assignment confirmation",
    ownerLabel: "ALL 3",
  },
  {
    num: "06",
    name: "Post-Deal",
    dur: "Ongoing \u00B7 Milestone tracking, royalties, reporting obligations",
    ownerLabel: "ALL 3",
  },
];

function partyAccessBadgeStyle(
  status: PartyAccessStatus
): React.CSSProperties {
  const base: React.CSSProperties = {
    fontSize: 11.5,
    fontWeight: 500,
    padding: "3px 10px",
    borderRadius: 100,
  };
  if (status === "Joined" || status === "Owner") {
    return {
      ...base,
      background: "var(--sage-faint)",
      color: "var(--sage)",
    };
  }
  if (status === "Invited") {
    return {
      ...base,
      background: "var(--amber-faint)",
      color: "var(--amber-text)",
    };
  }
  return {
    ...base,
    background: "var(--off-white)",
    color: "var(--text-light)",
  };
}

function signoffClass(status: SignoffStatus): string {
  if (status === "Confirmed") return "cb-st ok";
  if (status === "Pending") return "cb-st wait";
  return "cb-st pend";
}

function splitBusinessPartner(value: string): { name: string; role: string } {
  const idx = value.indexOf(",");
  if (idx === -1) return { name: value, role: "" };
  const name = value.slice(0, idx).trim();
  const role = value.slice(idx + 1).trim();
  return { name: name || value, role };
}

function splitTtoOfficer(value: string): { name: string; suffix: string } {
  const idx = value.indexOf("\u2014");
  if (idx === -1) return { name: value, suffix: "" };
  return {
    name: value.slice(0, idx).trim(),
    suffix: value.slice(idx + 1).trim(),
  };
}

export default function RoadmapScreen({
  dealBrief,
  onBackToDealsList,
  onLogoClick,
  onOpenProfile,
  onNavDealBrief,
  onNavChecklists,
  onNavDocuments,
  onNavKnowledge,
  userName,
  userInstitution,
}: Props) {
  const { who, signoffs, display } = dealBrief;
  const business = splitBusinessPartner(who.businessPartner);
  const tto = splitTtoOfficer(who.ttoOfficer);
  const currentStage = Math.min(
    6,
    Math.max(1, Math.round(display.stageNumber))
  );

  const stage1Active = currentStage === 1;

  return (
    <WorkspaceShell
      mode={{
        kind: "inDeal",
        active: "roadmap",
        dealName: display.shellDealName,
        dealSubLabel: display.shellDealSubLabel,
      }}
      onLogoClick={onLogoClick}
      onOpenProfile={onOpenProfile}
      onNavDeals={onBackToDealsList}
      onNavDealBrief={onNavDealBrief}
      onNavChecklists={onNavChecklists}
      onNavDocuments={onNavDocuments}
      onNavKnowledge={onNavKnowledge}
      userName={userName}
      userInstitution={userInstitution}
    >
      <div className="rm-page" style={{ padding: 0 }}>
        {/* Breadcrumb */}
        <div className="brief-crumb" style={{ marginBottom: 16 }}>
          <span onClick={onBackToDealsList}>My Deals</span>
          <span className="brief-crumb-sep">&rsaquo;</span>
          <span>{display.shellDealName}</span>
          <span className="brief-crumb-sep">&rsaquo;</span>
          <span style={{ color: "var(--text-dark)" }}>Roadmap</span>
        </div>

        {/* Title block */}
        <div className="rm-head">
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 12,
            }}
          >
            <span className="brief-badge type">{display.badgeDealType}</span>
            <span className="brief-badge stage">{display.badgeStageLine}</span>
            <span className="brief-badge status">&bull; Active</span>
          </div>
          <h2 className="rm-h">Shared Deal Roadmap</h2>
          <p className="rm-sub">
            All three parties see the same roadmap in real time. Each party
            confirms their commitment before the deal advances.
          </p>
        </div>

        {/* Ownership line */}
        <div
          style={{
            fontSize: 12.5,
            color: "var(--text-light)",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            className="ms"
            style={{ fontSize: 14, color: "var(--text-light)" }}
          >
            person
          </span>
          Roadmap created by{" "}
          <strong style={{ color: "var(--text-dark)", fontWeight: 500 }}>
            {who.researcher}
          </strong>{" "}
          &middot; Researcher &middot; {who.institution} &middot;{" "}
          {display.logDateLabel}
        </div>

        {/* Parties & Access */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: 9,
              borderBottom: "1px solid var(--border)",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "var(--teal)",
              }}
            >
              Parties &amp; Access
            </span>
            <span
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 10,
                color: "var(--text-light)",
                letterSpacing: ".07em",
                textTransform: "uppercase",
              }}
            >
              3-party visibility
            </span>
          </div>
          <div
            style={{
              border: "1px solid var(--border)",
              borderTop: "none",
              borderRadius: "0 0 10px 10px",
              overflow: "hidden",
            }}
          >
            {/* Researcher */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 18px",
                background: "var(--white)",
              }}
            >
              <span
                className="ms"
                style={{
                  fontSize: 18,
                  color: "var(--text-light)",
                  flexShrink: 0,
                }}
              >
                person
              </span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--text-dark)",
                  }}
                >
                  {who.researcher}
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: "var(--text-light)",
                    marginTop: 2,
                  }}
                >
                  Researcher &middot; {who.institution}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={partyAccessBadgeStyle(who.researcherStatus)}>
                  {who.researcherStatus}
                </span>
                <span
                  style={{
                    fontSize: 11.5,
                    fontWeight: 500,
                    padding: "3px 10px",
                    borderRadius: 100,
                    background: "var(--sage-faint)",
                    color: "var(--sage)",
                  }}
                >
                  &#x2713; Active
                </span>
              </div>
            </div>

            {/* TTO */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 18px",
                background: "var(--white)",
                borderTop: "1px solid var(--off-white)",
              }}
            >
              <span
                className="ms"
                style={{
                  fontSize: 18,
                  color: "var(--text-light)",
                  flexShrink: 0,
                }}
              >
                account_balance
              </span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--text-dark)",
                  }}
                >
                  {tto.name}
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: "var(--text-light)",
                    marginTop: 2,
                  }}
                >
                  TTO Officer &middot; {who.institution}
                </div>
              </div>
              <span style={partyAccessBadgeStyle(who.ttoStatus)}>
                {who.ttoStatus}
              </span>
            </div>

            {/* Business */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 18px",
                background: "var(--white)",
                borderTop: "1px solid var(--off-white)",
              }}
            >
              <span
                className="ms"
                style={{
                  fontSize: 18,
                  color: "var(--text-light)",
                  flexShrink: 0,
                }}
              >
                business
              </span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--text-dark)",
                  }}
                >
                  {business.name}
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: "var(--text-light)",
                    marginTop: 2,
                  }}
                >
                  Business Partner{business.role ? ` \u00B7 ${business.role}` : ""}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={partyAccessBadgeStyle(who.businessStatus)}>
                  {who.businessStatus}
                </span>
                {who.businessStatus === "Not yet invited" && (
                  <button
                    type="button"
                    className="btn-secondary"
                    aria-disabled="true"
                    title="Coming soon"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      fontSize: 13,
                      padding: "7px 16px",
                      cursor: "not-allowed",
                    }}
                  >
                    Draft invitation
                  </button>
                  /* TODO: wire to s-invite modal in invitation-flow milestone */
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stages — stage 1 + rows 2–6; badge reflects dealBrief.display.stageNumber */}
        <div className="stage-list">
          <div className={stage1Active ? "si active" : "si done"}>
            <div className="si-head">
              <div
                className={stage1Active ? "si-num n-act" : "si-num n-done"}
              >
                01
              </div>
              <div className="si-info">
                <div className="si-name" style={{ fontSize: 16 }}>
                  Compliance &amp; Disclosure
                </div>
                <div className="si-dur">
                  {stage1Active
                    ? "Estimated 2\u20134 weeks \u00b7 Now in progress"
                    : "Estimated 2\u20134 weeks \u00b7 Complete"}
                </div>
              </div>
              <div className="si-right">
                {stage1Active ? (
                  <span className="badge b-progress">&bull; In Progress</span>
                ) : (
                  <span className="badge b-done">Done</span>
                )}
                <span
                  className="si-owner"
                  style={{
                    color: stage1Active ? "var(--teal)" : "var(--sage)",
                  }}
                >
                  RESEARCHER
                </span>
              </div>
            </div>
            {stage1Active && (
            <div className="si-body">
              <div className="si-steps">
                <div className="si-step">
                  <span className="step-ok">&#x2713;</span>
                  File Intellectual Property Disclosure Form with Technology
                  Transfer Office
                </div>
                <div className="si-step">
                  <span className="step-pend">
                    <span
                      className="ms"
                      style={{ fontSize: 14, color: "var(--amber-text)" }}
                    >
                      schedule
                    </span>
                  </span>
                  Technology Transfer Office briefing &mdash; schedule within
                  48 hours
                </div>
                <div className="si-step">
                  <span className="step-pend">
                    <span
                      className="ms"
                      style={{ fontSize: 14, color: "var(--amber-text)" }}
                    >
                      schedule
                    </span>
                  </span>
                  Initiate Confidential Disclosure Agreement with{" "}
                  {business.name} (managed by Technology Transfer Office)
                </div>
                <div className="si-step">
                  <span className="step-dot"></span>
                  Confirm publication obligations before sharing unpublished
                  findings ({dealBrief.what.publicationStatus})
                </div>
                <div className="si-step">
                  <span className="step-dot"></span>
                  Prepare non-confidential algorithm overview (no
                  implementation details)
                </div>
              </div>
              <div className="doc-tags">
                <span className="dtag">
                  <span
                    className="ms"
                    style={{ fontSize: 12, color: "var(--text-mid)" }}
                  >
                    description
                  </span>{" "}
                  Intellectual Property Disclosure Form
                </span>
                <span className="dtag">
                  <span
                    className="ms"
                    style={{ fontSize: 12, color: "var(--text-mid)" }}
                  >
                    assignment
                  </span>{" "}
                  Technology Transfer Office Briefing Template
                </span>
                <span className="dtag">
                  <span
                    className="ms"
                    style={{ fontSize: 12, color: "var(--text-mid)" }}
                  >
                    lock
                  </span>{" "}
                  Confidential Disclosure Agreement Template
                </span>
              </div>
            </div>
            )}
          </div>

          {LOCKED_STAGES.map((stage, i) => {
            const sn = i + 2;
            const done = currentStage > sn;
            const active = currentStage === sn;
            const siClass = active ? "si active" : done ? "si done" : "si locked";
            const numClass = active
              ? "si-num n-act"
              : done
                ? "si-num n-done"
                : "si-num n-lock";
            return (
            <div key={stage.num} className={siClass}>
              <div className="si-head">
                <div className={numClass}>{stage.num}</div>
                <div className="si-info">
                  <div className="si-name">{stage.name}</div>
                  <div className="si-dur">{stage.dur}</div>
                </div>
                <div className="si-right">
                  {done ? (
                    <span className="badge b-done">Done</span>
                  ) : active ? (
                    <span className="badge b-progress">&bull; In Progress</span>
                  ) : (
                    <span className="badge b-pending">Upcoming</span>
                  )}
                  <span className="si-owner">{stage.ownerLabel}</span>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Roadmap sign-off */}
        <div className="confirm-block">
          <div className="cb-h">Roadmap sign-off</div>
          <p
            style={{
              fontSize: 13.5,
              color: "var(--text-light)",
              lineHeight: 1.6,
              marginBottom: 16,
            }}
          >
            Each party must confirm before this deal goes LIVE. Confirming
            means you agree to collaborate under the shared roadmap terms.
          </p>
          <div className="cb-rows">
            <div className="cb-row">
              <div className="cb-who">
                <span
                  className="ms"
                  style={{ fontSize: 16, color: "var(--text-light)" }}
                >
                  person
                </span>
                {who.researcher} &mdash; Researcher
              </div>
              <div className={signoffClass(signoffs.researcher)}>
                {signoffs.researcher === "Confirmed" ? "\u2713 " : ""}
                {signoffs.researcher}
              </div>
            </div>
            <div className="cb-row">
              <div className="cb-who">
                <span
                  className="ms"
                  style={{ fontSize: 16, color: "var(--text-light)" }}
                >
                  account_balance
                </span>
                {tto.name} &mdash; Technology Transfer Officer
              </div>
              <div className={signoffClass(signoffs.tto)}>{signoffs.tto}</div>
            </div>
            <div className="cb-row">
              <div className="cb-who">
                <span
                  className="ms"
                  style={{ fontSize: 16, color: "var(--text-light)" }}
                >
                  business
                </span>
                {business.name}
                {business.role
                  ? ` \u2014 ${business.role}`
                  : " \u2014 Business partner"}
              </div>
              <div className={signoffClass(signoffs.business)}>
                {signoffs.business}
              </div>
            </div>
          </div>
          <div className="cb-note">
            The deal becomes{" "}
            <strong style={{ color: "var(--navy)" }}>LIVE</strong> once all
            three parties have confirmed. Currently waiting on TTO review and{" "}
            {business.name} acceptance.
          </div>
        </div>
      </div>
    </WorkspaceShell>
  );
}
