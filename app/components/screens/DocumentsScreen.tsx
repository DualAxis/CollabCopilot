"use client";

import { useState, useMemo } from "react";
import WorkspaceShell from "../layout/WorkspaceShell";
import EmailDraftModal from "../modals/EmailDraftModal";
import {
  EMAIL_TEMPLATES,
  type EmailTemplateKey,
} from "../../lib/emailTemplates";
import type { DealBrief } from "../../lib/dealBrief";

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
  templateKey?: EmailTemplateKey;
};

function activeDocsForDeal(b: DealBrief): ActiveDoc[] {
  const partner = b.display.shellDealName;
  const inst = b.who.institution;
  const date = b.display.logDateLabel;
  const st = b.display.stageNumber;
  return [
    {
      status: "done",
      icon: "description",
      iconColor: "var(--sage)",
      name: "IP Disclosure Form",
      meta: `Submitted to ${inst} TTO \u00b7 ${date} \u00b7 Required for Stage ${st}`,
      badge: "Submitted",
      cta: "View",
    },
    {
      status: "inprog",
      icon: "edit_note",
      iconColor: "var(--amber-text)",
      name: "Confidential Disclosure Agreement \u2014 Draft",
      meta: `Initiated with ${partner} \u00b7 Awaiting TTO review \u00b7 Updated ${date}`,
      badge: "In progress",
      cta: "Continue \u2192",
    },
  ];
}

function templatesForDeal(b: DealBrief): Template[] {
  const st = b.display.stageNumber;
  return [
    {
      locked: false,
      name: "TTO Briefing Template",
      meta: `Stage ${st} \u00b7 Pre-filled with your deal context \u00b7 Ready to send`,
      templateKey: "tto-briefing",
    },
    {
      locked: false,
      name: "Non-Confidential Research Summary",
      meta: `Stage ${st} \u00b7 Safe to share before CDA \u00b7 AI-drafted from your profile`,
      /* Document-template branch deferred to M22 */
    },
    {
      locked: false,
      name: `Holding Reply to ${b.display.shellDealName}`,
      meta: `Stage ${st} \u00b7 AI-drafted \u00b7 Polite, no technical data, buys 5 days`,
      templateKey: "holding-reply",
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
}

function personaEmailDraft(
  key: EmailTemplateKey,
  dealBrief: DealBrief
): { to: string; subject: string; body: string; title: string; primaryLabel: string; footerNote: string } {
  const partner = dealBrief.display.shellDealName;
  const name = dealBrief.who.researcher;
  const inst = dealBrief.who.institution;
  const base = EMAIL_TEMPLATES[key];
  if (key === "tto-briefing") {
    return {
      ...base,
      to: "",
      subject: `TTO Briefing \u2014 ${partner} inquiry`,
      body: `Hi,

I'd like to brief you on a commercial inquiry I've received from ${partner} regarding a potential ${dealBrief.what.dealType}.

Assessment context:
\u2022 IP status: ${dealBrief.what.ipStatus}
\u2022 Publication: ${dealBrief.what.publicationStatus}
\u2022 Research area: ${dealBrief.what.researchArea}

I have not shared non-public technical details. Could we schedule a call this week?

Best regards,
${name}
${inst}`,
    };
  }
  if (key === "holding-reply") {
    return {
      ...base,
      to: "",
      title: `Holding Reply to ${partner}`,
      subject: `Re: collaboration inquiry \u2014 ${partner}`,
      body: `Hello,

Thank you for your interest in working with ${inst}. I'm coordinating with our Technology Transfer Office on appropriate next steps and will follow up shortly.

Best regards,
${name}
${inst}`,
    };
  }
  return base;
}

type Props = {
  dealBrief: DealBrief;
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
  dealBrief,
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
  const [openTemplateKey, setOpenTemplateKey] =
    useState<EmailTemplateKey | null>(null);

  const activeDocs = useMemo(() => activeDocsForDeal(dealBrief), [dealBrief]);
  const templates = useMemo(() => templatesForDeal(dealBrief), [dealBrief]);
  const emailDraft = openTemplateKey
    ? personaEmailDraft(openTemplateKey, dealBrief)
    : null;

  return (
    <WorkspaceShell
      mode={{
        kind: "inDeal",
        active: "documents",
        dealName: dealBrief.display.shellDealName,
        dealSubLabel: dealBrief.display.shellDealSubLabel,
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
            {dealBrief.display.shellDealName}
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
            {dealBrief.display.inDealScreenSubtitle}
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
            {activeDocs.map((d) => (
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
                `Stage ${dealBrief.display.stageNumber} available \u00b7 Stages 2\u20136 unlock as you progress`
              }
            </span>
          </div>
          <div className="doc-list">
            {templates.map((t) =>
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
                      onClick={
                        t.templateKey
                          ? () => setOpenTemplateKey(t.templateKey!)
                          : noop /* Document-template branch deferred to M22 */
                      }
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
      {openTemplateKey && emailDraft && (
        <EmailDraftModal
          open
          onClose={() => setOpenTemplateKey(null)}
          title={emailDraft.title}
          initialTo={emailDraft.to}
          initialSubject={emailDraft.subject}
          initialBody={emailDraft.body}
          primaryLabel={emailDraft.primaryLabel}
          footerNote={emailDraft.footerNote}
          onPrimary={() => setOpenTemplateKey(null)}
        />
      )}
    </WorkspaceShell>
  );
}
