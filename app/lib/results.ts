export type ComplianceAlert = {
  flag: string;
  title: string;
  description: string;
  ruleFired: string;
  sourceUrl: string;
  sourceLabel: string;
};

export type SafeAction = {
  title: string;
  description: string;
};

export type ChecklistItem = {
  label: string;
  state: "done" | "active" | "plain" | "locked";
  badge?: string;
};

export type AssessmentResults = {
  summary: string;
  complianceAlerts: ComplianceAlert[];
  safeActions: SafeAction[];
  nextSteps: ChecklistItem[];
  draftedReply: string;
};

export const MOCK_RESULTS: AssessmentResults = {
  summary:
    "You have received a first-contact inquiry from Nexar Robotics about licensing your adaptive cobot collision-avoidance algorithm under an exclusive license. This deal is at <strong>Stage 1 (Compliance &amp; Disclosure)</strong> — the most critical phase, where two compliance risks must be resolved before any further discussion. Estimated total timeline if well-managed: <strong>4–6 months</strong>. Biggest risk right now: your TTO has not been briefed, and Nexar is already forming an opinion of your credibility based on your first response.",
  complianceAlerts: [
    {
      flag: "Action required today",
      title: "Do not share technical data before a CDA is signed",
      description:
        "Your paper is under review at IEEE Transactions on Robotics. Before any algorithm specifications, source code, or unpublished findings are shared with Nexar Robotics, a Confidential Disclosure Agreement must be in place. This is a hard requirement under WUT licensing policy.",
      ruleFired:
        "Rule fired: PUBLICATION_UNDER_REVIEW + COMMERCIAL_CONTACT + NO_CDA → UIDP Article 4.2 conflict. Peer review creates a quasi-public disclosure event. Sharing technical details with a commercial party simultaneously — without a CDA — may constitute public disclosure and affect your patent application scope.",
      sourceUrl: "https://uidp.org/publication/contract-accords/",
      sourceLabel: "UIDP Contract Accords — Article 4.2",
    },
    {
      flag: "Action required before responding",
      title: "Brief your TTO before any further communication with Nexar",
      description:
        "The IP in your algorithm belongs to WUT, not you personally. Any discussion of commercialisation terms — including exclusivity — must involve your TTO. Proceeding without them creates ownership ambiguity and may invalidate any preliminary agreement.",
      ruleFired:
        "Rule fired: IP_LICENSING + TTO_NOT_INFORMED + PARTNER_IDENTIFIED → WUT IP Ownership Policy breach. IP generated during employment belongs to the university, not the researcher. Any LOI or preliminary agreement signed without TTO involvement may be challenged or reversed.",
      sourceUrl:
        "https://www.autm.net/resources-surveys/research-and-education-resources/statt/",
      sourceLabel: "AUTM STATT Licensing Guide — University IP Ownership",
    },
  ],
  safeActions: [
    {
      title: "Send a brief professional acknowledgement to Nexar",
      description:
        "\"Thank you for your interest — I'm looping in the appropriate team.\" No technical detail needed. Buys time and signals professionalism without compliance risk. CollabPilot can generate this template once you log in.",
    },
    {
      title: "Share your public conference abstract only",
      description:
        "If you presented the algorithm publicly at a conference, that specific public-domain material may be shared. Do not share anything beyond what is already in the public record — no implementation details, datasets, or unpublished findings.",
    },
  ],
  nextSteps: [
    {
      label: "Hold the technical-data reply (CDA pending)",
      state: "done",
    },
    {
      label: "Forward Nexar Robotics email to your TTO",
      state: "active",
      badge: "→ Next action",
    },
    {
      label: "Disclose paper-under-review status to TTO",
      state: "plain",
    },
    {
      label: "Schedule TTO + co-inventor alignment call",
      state: "locked",
    },
    {
      label: "Initiate CDA with Nexar Robotics (via TTO)",
      state: "locked",
    },
  ],
  draftedReply:
    "Dear Marek,\n\nThank you for reaching out about my work on adaptive cobot collision-avoidance. I'm currently coordinating with Warsaw University of Technology's Technology Transfer Office on the appropriate next steps for any commercial discussion.\n\nOnce that internal review is complete I'd be happy to schedule a follow-up — likely within the next two weeks. In the meantime, please direct any technical questions to my TTO contact, whom I'll introduce by email.\n\nBest regards,\nDr. Paulina Chen\nWarsaw University of Technology",
};
