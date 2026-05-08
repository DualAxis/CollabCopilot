"use client";

import { useState, useMemo } from "react";
import WorkspaceShell from "../layout/WorkspaceShell";
import EmailDraftModal from "../modals/EmailDraftModal";
import type { DealBrief } from "../../lib/dealBrief";

function buildForwardingDraft(dealBrief: DealBrief) {
  const partner = dealBrief.display.shellDealName;
  const name = dealBrief.who.researcher;
  const inst = dealBrief.who.institution;
  const pub = dealBrief.what.publicationStatus;
  return {
    title: "Forwarding email to TTO \u2014 draft",
    to: "",
    subject: `FWD: ${partner} \u2014 commercial inquiry`,
    body: `Hi,

I wanted to bring this to your attention. I've received an inquiry from ${partner} as part of a potential ${dealBrief.what.dealType}.

Context from my assessment:
\u2022 IP status: ${dealBrief.what.ipStatus}
\u2022 Publication: ${pub}
\u2022 Institution: ${inst}

I have not shared non-public technical data. Could we schedule a short alignment call this week?

Best regards,
${name}
${inst}`,
  };
}

type Props = {
  dealBrief: DealBrief;
  onLogoClick: () => void;
  onOpenProfile: () => void;
  onNavDeals: () => void;
  onNavDealBrief?: () => void;
  onNavRoadmap?: () => void;
  onNavDocuments?: () => void;
  onNavKnowledge?: () => void;
  userName?: string;
  userInstitution?: string;
};

export default function ChecklistsScreen({
  dealBrief,
  onLogoClick,
  onOpenProfile,
  onNavDeals,
  onNavDealBrief,
  onNavRoadmap,
  onNavDocuments,
  onNavKnowledge,
  userName,
  userInstitution,
}: Props) {
  const [activeStatus, setActiveStatus] = useState<"active" | "done">("active");
  const [step3Done, setStep3Done] = useState<boolean>(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const forwardingDraft = useMemo(
    () => buildForwardingDraft(dealBrief),
    [dealBrief]
  );
  const isDone = activeStatus === "done";
  const toggleActive = () => setActiveStatus("done");
  const step3Unlocked = isDone;
  const toggleStep3 = () => {
    if (!step3Unlocked) return;
    setStep3Done((prev) => !prev);
  };

  const doneCount = 1 + (isDone ? 1 : 0) + (step3Done ? 1 : 0);
  const activeCount =
    (isDone ? 0 : 1) + (step3Unlocked && !step3Done ? 1 : 0);
  const upcomingCount = 5 - doneCount - activeCount;

  const statusPillStyle: React.CSSProperties = isDone
    ? {
        fontSize: 12,
        fontWeight: 500,
        display: "inline-flex",
        padding: "3px 10px",
        borderRadius: 100,
        background: "var(--sage-faint)",
        color: "var(--sage)",
        marginTop: 8,
      }
    : {
        fontSize: 12,
        fontWeight: 500,
        display: "inline-flex",
        padding: "3px 10px",
        borderRadius: 100,
        background: "rgba(14,107,115,.12)",
        color: "var(--teal)",
        marginTop: 8,
      };

  return (
    <WorkspaceShell
      mode={{
        kind: "inDeal",
        active: "checklists",
        dealName: dealBrief.display.shellDealName,
        dealSubLabel: dealBrief.display.shellDealSubLabel,
      }}
      onLogoClick={onLogoClick}
      onOpenProfile={onOpenProfile}
      onNavDeals={onNavDeals}
      onNavDealBrief={onNavDealBrief}
      onNavRoadmap={onNavRoadmap}
      onNavDocuments={onNavDocuments}
      onNavKnowledge={onNavKnowledge}
      userName={userName}
      userInstitution={userInstitution}
    >
      <div className="doc-inner">
        <div className="brief-crumb" style={{ marginBottom: 20 }}>
          <span onClick={onNavDealBrief} style={{ cursor: "pointer" }}>
            {dealBrief.display.shellDealName}
          </span>
          <span className="brief-crumb-sep">{"\u203a"}</span>
          <span style={{ color: "var(--text-dark)" }}>Checklists</span>
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
            Checklists
          </h1>
          <p
            style={{
              fontSize: 13.5,
              color: "var(--text-light)",
              lineHeight: 1.55,
            }}
          >
            {dealBrief.display.inDealScreenSubtitle}
          </p>
        </div>

        <div className="doc-section">
          <div className="doc-section-head">
            <span className="doc-sec-label">
              {`${dealBrief.display.badgeStageLine} \u00B7 Get your TTO in the loop`}
            </span>
            <span style={{ fontSize: 12.5, color: "var(--text-light)" }}>
              {`${doneCount} done \u00b7 ${activeCount} active \u00b7 ${upcomingCount} upcoming`}
            </span>
          </div>

          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {/* 1. Done */}
            <div
              className="cl-item done"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "14px 18px",
                background: "var(--white)",
                borderBottom: "1px solid var(--off-white)",
              }}
            >
              <div
                className="cl-checkbox done-c"
                style={{ marginTop: 1, flexShrink: 0 }}
              >
                {"\u2713"}
              </div>
              <div style={{ flex: 1 }}>
                <div className="cl-txt done-t">
                  Hold the technical-data reply (CDA pending)
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-light)",
                    marginTop: 2,
                  }}
                >
                  {"Completed \u00b7 No confidential data shared"}
                </div>
              </div>
            </div>

            {/* 2. Active (two-column grid) */}
            <div
              className="cl-item active"
              style={{
                borderTop: "1px solid var(--off-white)",
                borderBottom: "1px solid var(--off-white)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 0,
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "16px 18px",
                    borderRight: "1px solid rgba(14,107,115,.15)",
                  }}
                >
                  <div
                    className={`cl-checkbox active-c${isDone ? " done-c" : ""}`}
                    onClick={toggleActive}
                    title="Toggle status"
                    style={{ marginTop: 2, flexShrink: 0 }}
                  >
                    {isDone ? "\u2713" : ""}
                  </div>
                  <div>
                    <div className={`cl-txt${isDone ? " done-t" : ""}`}>
                      Forward {dealBrief.display.shellDealName} email to your
                      TTO
                    </div>
                    <div className="cl-badge" style={{ marginTop: 4 }}>
                      {"\u2192 Next action"}
                    </div>
                    <div style={statusPillStyle}>
                      {isDone ? "Done" : "Active"}
                    </div>
                  </div>
                </div>
                <div style={{ padding: "16px 18px" }}>
                  <div className="cl-ai-label">
                    <span className="ms" style={{ fontSize: 12 }}>
                      auto_awesome
                    </span>
                    CollabPilot suggestion
                  </div>
                  <div className="cl-ai-body">
                    {`A forwarding email to your Technology Transfer Office (${dealBrief.who.institution}) has been drafted \u2014 includes your deal context from the assessment.`}
                  </div>
                  <button
                    className="btn-secondary"
                    onClick={() => setReviewOpen(true)}
                    style={{ fontSize: 13, padding: "8px 18px" }}
                  >
                    Review draft
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Upcoming -> becomes active when step 2 is done */}
            <div
              className={`cl-item ${step3Done ? "done" : "upcoming"}`}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "14px 18px",
                background: step3Unlocked && !step3Done
                  ? "var(--teal-faint)"
                  : "var(--white)",
                borderBottom: "1px solid var(--off-white)",
              }}
            >
              <div
                className={`cl-checkbox${
                  step3Done
                    ? " done-c"
                    : step3Unlocked
                      ? " active-c"
                      : ""
                }`}
                onClick={step3Unlocked ? toggleStep3 : undefined}
                role={step3Unlocked ? "button" : undefined}
                tabIndex={step3Unlocked ? 0 : undefined}
                title={step3Unlocked ? "Toggle status" : undefined}
                style={{
                  marginTop: 1,
                  flexShrink: 0,
                  cursor: step3Unlocked ? "pointer" : "default",
                }}
              >
                {step3Done ? "\u2713" : ""}
              </div>
              <div style={{ flex: 1 }}>
                <div className={`cl-txt${step3Done ? " done-t" : ""}`}>
                  Disclose paper-under-review status to TTO
                </div>
                {step3Unlocked && !step3Done && (
                  <div className="cl-badge" style={{ marginTop: 4 }}>
                    {"\u2192 Next action"}
                  </div>
                )}
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-light)",
                    marginTop: 4,
                  }}
                >
                  {step3Done
                    ? "Completed \u00b7 Status disclosed to TTO"
                    : step3Unlocked
                      ? "Active \u00b7 Click the box to mark complete"
                      : "Available once previous action is complete"}
                </div>
              </div>
            </div>

            {/* 4. Locked */}
            <div
              className="cl-item locked"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "14px 18px",
                background: "var(--white)",
                borderBottom: "1px solid var(--off-white)",
                pointerEvents: "none",
              }}
            >
              <span className="ms cl-locked-ic" style={{ flexShrink: 0 }}>
                lock
              </span>
              <div style={{ flex: 1 }}>
                <div className="cl-txt locked-t">
                  Schedule TTO + co-inventor alignment call
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-light)",
                    marginTop: 2,
                  }}
                >
                  Unlocks after TTO is briefed
                </div>
              </div>
            </div>

            {/* 5. Locked (last) */}
            <div
              className="cl-item locked"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "14px 18px",
                background: "var(--white)",
                pointerEvents: "none",
              }}
            >
              <span className="ms cl-locked-ic" style={{ flexShrink: 0 }}>
                lock
              </span>
              <div style={{ flex: 1 }}>
                <div className="cl-txt locked-t">
                  Initiate CDA with {dealBrief.display.shellDealName} via TTO
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-light)",
                    marginTop: 2,
                  }}
                >
                  Unlocks after TTO briefing is confirmed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EmailDraftModal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        title={forwardingDraft.title}
        initialTo={forwardingDraft.to}
        initialSubject={forwardingDraft.subject}
        initialBody={forwardingDraft.body}
        primaryLabel={"Send \u2192"}
        footerNote="CollabPilot suggestion \u00b7 Editable"
        onPrimary={() => {
          setReviewOpen(false);
          setActiveStatus("done");
        }}
      />
    </WorkspaceShell>
  );
}
