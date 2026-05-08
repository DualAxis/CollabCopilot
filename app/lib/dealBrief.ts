import {
  type AssessmentState,
  deriveCurrentStageFromState,
  goalTimelineForStage,
  remainingTimelineForStage,
} from "./assessment";
import type { AssessmentResults } from "./results";

export type PartyAccessStatus =
  | "Owner"
  | "Joined"
  | "Invited"
  | "Not yet invited";

export type WhoBlock = {
  researcher: string;
  researcherStatus: PartyAccessStatus;
  institution: string;
  businessPartner: string;
  businessStatus: PartyAccessStatus;
  ttoOfficer: string;
  ttoStatus: PartyAccessStatus;
};

export type WhatBlock = {
  dealType: string;
  researchArea: string;
  ipStatus: string;
  publicationStatus: string;
};

export type GoalsBlock = {
  researcher: string;
  business: string;
  timeline: string;
};

export type SignoffStatus = "Confirmed" | "Pending" | "Invitation pending";

export type SignoffsBlock = {
  researcher: SignoffStatus;
  tto: SignoffStatus;
  business: SignoffStatus;
};

export type AISummaryItem = { category: string; text: string };

export type DealLogEntry = {
  event: string;
  meta: string;
  state: "done" | "pending";
};

/** Header / shell copy derived from the latest assessment run. */
export type DealBriefDisplay = {
  stageNumber: number;
  shellDealName: string;
  shellDealSubLabel: string;
  titleLine1: string;
  titleLine2: string;
  badgeDealType: string;
  badgeStageLine: string;
  logDateLabel: string;
  /** Subtitle under H1 on checklists / documents / similar deal-scoped pages */
  inDealScreenSubtitle: string;
};

export type DealBrief = {
  display: DealBriefDisplay;
  who: WhoBlock;
  what: WhatBlock;
  goals: GoalsBlock;
  signoffs: SignoffsBlock;
  aiSummary: AISummaryItem[];
  log: DealLogEntry[];
};

const STAGE_TITLES: Record<number, string> = {
  1: "Compliance & Disclosure",
  2: "NDA & CDA",
  3: "Term Sheet",
  4: "Due Diligence",
  5: "License Agreement",
  6: "Execution",
};

function formatLogDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function resolveDealType(q1: string): string {
  if (!q1) return "IP Licensing \u2014 Exclusive";
  if (q1 === "IP Licensing") return "IP Licensing \u2014 Exclusive";
  return q1;
}

function resolvePublication(q3: string): string {
  if (!q3) return "Not specified in assessment";
  return q3;
}

function buildDisplay(
  partner: string,
  institution: string,
  areaLabel: string,
  dealTag: string,
  dealType: string,
  stage: number,
  stageTitle: string
): DealBriefDisplay {
  const titleLine2 = `${areaLabel} \u00B7 ${dealTag}`;
  const shellDealSubLabel = `${dealTag} \u00B7 Stage ${stage}`;
  const inDealScreenSubtitle = `Stage ${stage} \u2014 ${stageTitle} \u00B7 ${partner} deal`;

  return {
    stageNumber: stage,
    shellDealName: partner,
    shellDealSubLabel,
    titleLine1: `${partner} \u2014`,
    titleLine2,
    badgeDealType: dealType,
    badgeStageLine: `Stage ${stage} \u00B7 ${stageTitle}`,
    logDateLabel: formatLogDate(new Date()),
    inDealScreenSubtitle,
  };
}

export function buildInitialDealBrief(
  state: AssessmentState,
  results?: AssessmentResults | null
): DealBrief {
  const partner = state.profile.partner.trim() || "Business partner";
  const name = state.profile.name.trim();
  const institution = state.profile.institution.trim();
  const email = state.profile.email.trim();
  const area = state.profile.area[0]?.trim();
  const areaLabel = area || "Research collaboration";

  const researcher = name || "Researcher";
  const instDisplay = institution || "Your institution";
  const dealType = resolveDealType(state.q1);
  const stage = deriveCurrentStageFromState(state);
  const stageTitle = STAGE_TITLES[stage] ?? STAGE_TITLES[1];
  const rawDealTag = state.q1 || "Commercial deal";
  const display = buildDisplay(
    partner,
    instDisplay,
    areaLabel,
    rawDealTag,
    dealType,
    stage,
    stageTitle
  );

  const alertCount = results?.complianceAlerts.length ?? 0;
  const alertPhrase =
    alertCount === 0
      ? "No compliance flags from the latest analysis"
      : alertCount === 1
        ? "1 compliance risk flagged in the latest analysis"
        : `${alertCount} compliance risks flagged in the latest analysis`;

  const ttoOfficer = `Technology Transfer Office \u2014 ${instDisplay}`;

  const goalsResearcher = `Advance a ${state.q1 || "commercial collaboration"} with ${partner} while protecting ${instDisplay} IP, publication obligations, and internal approvals.`;
  const goalsBusiness = `Progress the opportunity with ${instDisplay} under the assessed deal structure and timeline.`;

  const aiWhatItIs = `${dealType} between ${instDisplay} and ${partner} (${areaLabel}).`;
  const aiWhatsDone = `Assessment completed \u00B7 ${alertPhrase} \u00B7 Account created \u00B7 Deal initialised`;
  const aiWhatsNext =
    alertCount > 0
      ? `Align with your TTO \u00B7 Confirm what can be shared with ${partner} \u00B7 Document publication and IP status before next outreach`
      : `Confirm roles with your TTO \u00B7 Agree what can be shared with ${partner} \u00B7 Set next milestone dates`;

  const pub = state.q3;
  const aiRisk =
    pub === "Under journal review"
      ? `Publication timing may limit what you can share before agreements are in place \u00B7 coordinate with ${instDisplay} TTO and ${partner}`
      : `Track IP disclosure and publication obligations as discussions with ${partner} move forward`;

  const aiTimeline = `Current roadmap position: Stage ${stage} (${stageTitle}) \u00B7 indicative ${remainingTimelineForStage(stage)} \u00B7 confirm dates with your TTO and ${partner}`;

  const emailVerified = email ? `${email} verified` : "Researcher email on file";

  return {
    display,
    who: {
      researcher,
      researcherStatus: "Owner",
      institution: instDisplay,
      businessPartner: partner,
      businessStatus: "Not yet invited",
      ttoOfficer,
      ttoStatus: "Joined",
    },
    what: {
      dealType,
      researchArea: areaLabel,
      ipStatus: state.q2 || "Not specified in assessment",
      publicationStatus: resolvePublication(state.q3),
    },
    goals: {
      researcher: goalsResearcher,
      business: goalsBusiness,
      timeline: goalTimelineForStage(stage),
    },
    signoffs: {
      researcher: "Confirmed",
      tto: "Pending",
      business: "Invitation pending",
    },
    aiSummary: [
      { category: "What it is", text: aiWhatItIs },
      { category: "What\u2019s done", text: aiWhatsDone },
      { category: "What\u2019s next", text: aiWhatsNext },
      { category: "Current risk", text: aiRisk },
      { category: "Timeline", text: aiTimeline },
    ],
    log: [
      {
        event: "Assessment completed",
        meta: `${display.logDateLabel} \u00B7 AI analysis run \u00B7 ${alertPhrase}`,
        state: "done",
      },
      {
        event: "Account created",
        meta: `${display.logDateLabel} \u00B7 Researcher tier \u00B7 ${emailVerified}`,
        state: "done",
      },
      {
        event: `${partner} identified as prospective partner`,
        meta: `${display.logDateLabel} \u00B7 Entered during assessment \u00B7 Invitation pending`,
        state: "done",
      },
      {
        event: "TTO alignment",
        meta: `Pending \u00B7 Confirm assigned TTO contact at ${instDisplay}`,
        state: "pending",
      },
      {
        event: "CDA initiated",
        meta: `Pending \u00B7 Required before any non-public technical data is shared with ${partner}`,
        state: "pending",
      },
    ],
  };
}
