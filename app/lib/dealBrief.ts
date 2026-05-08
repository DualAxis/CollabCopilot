import type { AssessmentState } from "./assessment";

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

export type DealBrief = {
  who: WhoBlock;
  what: WhatBlock;
  goals: GoalsBlock;
  signoffs: SignoffsBlock;
  aiSummary: AISummaryItem[];
  log: DealLogEntry[];
};

const FALLBACK_PUBLICATION = "Under review \u00B7 IEEE Transactions on Robotics";

function resolveDealType(q1: string): string {
  if (!q1) return "IP Licensing \u2014 Exclusive";
  if (q1 === "IP Licensing") return "IP Licensing \u2014 Exclusive";
  return q1;
}

function resolvePublication(q3: string): string {
  if (!q3) return FALLBACK_PUBLICATION;
  if (q3 === "Under journal review") return FALLBACK_PUBLICATION;
  return q3;
}

export function buildInitialDealBrief(state: AssessmentState): DealBrief {
  const name = state.profile.name.trim();
  const institution = state.profile.institution.trim();
  const area = state.profile.area[0];

  return {
    who: {
      researcher: name || "Dr. Paulina Chen",
      researcherStatus: "Owner",
      institution: institution || "Warsaw University of Technology",
      businessPartner: "Nexar Robotics \u00B7 Marek Nowak, BD Lead",
      businessStatus: "Not yet invited",
      ttoOfficer: "Katarzyna W. \u2014 WUT TTO",
      ttoStatus: "Joined",
    },
    what: {
      dealType: resolveDealType(state.q1),
      researchArea: area || "Robotics & Automation",
      ipStatus: state.q2 || "Patent application filed",
      publicationStatus: resolvePublication(state.q3),
    },
    goals: {
      researcher:
        "Commercialise IP while protecting publication rights and patent scope",
      business:
        "Secure exclusive licence to integrate the algorithm into their cobot product line",
      timeline: "Signed agreement within 4\u20136 months",
    },
    signoffs: {
      researcher: "Confirmed",
      tto: "Pending",
      business: "Invitation pending",
    },
    aiSummary: [
      {
        category: "What it is",
        text: "Exclusive IP licensing deal for a cobot collision-avoidance algorithm between WUT and Nexar Robotics",
      },
      {
        category: "What\u2019s done",
        text: "Assessment completed \u00B7 2 compliance risks identified \u00B7 Account created \u00B7 Deal initialised",
      },
      {
        category: "What\u2019s next",
        text: "Brief TTO \u00B7 Initiate CDA with Nexar \u00B7 Confirm publication embargo with IEEE",
      },
      {
        category: "Current risk",
        text: "TTO not yet briefed \u00B7 Paper under review creates CDA urgency before any data is shared",
      },
      {
        category: "Timeline",
        text: "Stage 1 estimated 2\u20134 weeks \u00B7 Full deal 4\u20136 months to signed agreement",
      },
    ],
    log: [
      {
        event: "Assessment completed",
        meta: "May 7, 2026 \u00B7 AI analysis run \u00B7 2 urgent compliance flags identified",
        state: "done",
      },
      {
        event: "Account created",
        meta: "May 7, 2026 \u00B7 Researcher tier \u00B7 WUT institutional email verified",
        state: "done",
      },
      {
        event: "Nexar Robotics identified as prospective partner",
        meta: "May 7, 2026 \u00B7 Entered during assessment \u00B7 Invitation pending",
        state: "done",
      },
      {
        event: "TTO officer invited",
        meta: "Pending \u00B7 Katarzyna W. \u2014 invitation not yet sent",
        state: "pending",
      },
      {
        event: "CDA initiated",
        meta: "Pending \u00B7 Required before any technical data is shared",
        state: "pending",
      },
    ],
  };
}
