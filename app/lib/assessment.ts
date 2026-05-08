export type ScreenId =
  | "s-landing"
  | "s-profile"
  | "s-q0"
  | "s-q1"
  | "s-q2"
  | "s-q3"
  | "s-q4"
  | "s-q5"
  | "s-context"
  | "s-processing"
  | "s-results"
  | "s-login"
  | "s-account-created"
  | "s-empty-dashboard"
  | "s-dashboard"
  | "s-deal-brief"
  | "s-roadmap"
  | "s-knowledge-library"
  | "s-knowledge-library-deal"
  | "s-profile-user";

// Role ids follow collabpilot_demo4.html. Tech Notes v2 §2.2 uses "industry"
// where demo4 uses "business"; the rest map 1:1 (researcher -> researcher,
// tto -> tto). Keep demo4 ids here to avoid a project-wide rename.
export type Role = "researcher" | "business" | "tto";

export type AssessmentState = {
  profile: {
    name: string;
    institution: string;
    email: string;
    area: string[];
    role: Role | null;
  };
  q0: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  context: string;
};

export const INITIAL_ASSESSMENT: AssessmentState = {
  profile: {
    name: "",
    institution: "",
    email: "",
    area: [],
    role: null,
  },
  q0: "",
  q1: "",
  q2: "",
  q3: "",
  q4: "",
  q5: "",
  context: "",
};

export type RadioOption = {
  label: string;
  desc: string;
  warning?: string;
  preselected?: boolean;
};

export type RadioQuestionConfig = {
  id: ScreenId;
  step: number;
  field: "q0" | "q1" | "q2" | "q3" | "q4" | "q5";
  eyebrow: string;
  title: string;
  sub: string;
  options: RadioOption[];
  prev: ScreenId;
  next: ScreenId;
};

export const AREA_OPTIONS: string[] = [
  "Robotics & Automation",
  "Life Sciences",
  "Materials Science",
  "Physics & Photonics",
  "Chemical Engineering",
  "Energy & Sustainability",
  "Computer Science & AI",
  "Other",
];

export const RADIO_QUESTIONS: RadioQuestionConfig[] = [
  {
    id: "s-q0",
    step: 2,
    field: "q0",
    eyebrow: "Assessment · Process Stage",
    title: "Where are you in the process?",
    sub: "This helps us understand which compliance rules and next steps apply to your situation right now.",
    options: [
      {
        label: "First contact received",
        desc: "A company or partner has just reached out — no formal discussions have started yet",
      },
      {
        label: "In discussion",
        desc: "You've had initial conversations and are exploring whether a deal makes sense",
      },
      {
        label: "Drafting terms",
        desc: "Both parties are actively negotiating deal terms or reviewing a term sheet",
      },
      {
        label: "Already signed",
        desc: "A deal is in place — you need guidance on managing the active collaboration",
      },
      {
        label: "Something else",
        desc: "My situation doesn't fit neatly into the above — I'll describe it in a moment",
      },
    ],
    prev: "s-profile",
    next: "s-q1",
  },
  {
    id: "s-q1",
    step: 3,
    field: "q1",
    eyebrow: "Assessment · Deal Structure",
    title: "What kind of deal is this likely to be?",
    sub: "Select the option that best describes the commercial interest you've received.",
    options: [
      {
        label: "IP Licensing",
        desc: "A company wants to use or commercialise your technology under a license agreement",
      },
      {
        label: "Sponsored Research Agreement",
        desc: "A company wants to fund research at your institution in exchange for IP rights",
      },
      {
        label: "Joint Research",
        desc: "You and a company want to collaborate on a shared research project",
      },
      {
        label: "Fee-for-Service",
        desc: "A company is paying for a specific deliverable, analysis, or consultation",
      },
      {
        label: "Spin-off / New Venture",
        desc: "You're exploring founding a company around your research technology",
      },
    ],
    prev: "s-q0",
    next: "s-q2",
  },
  {
    id: "s-q2",
    step: 4,
    field: "q2",
    eyebrow: "Assessment · Intellectual Property",
    title: "What is the current IP status of your technology?",
    sub: "This determines what you can and cannot share with a potential partner today.",
    options: [
      {
        label: "Patent application filed",
        desc: "A patent application has been submitted and is under examination — protection is pending",
      },
      {
        label: "Provisional patent filed",
        desc: "A provisional application has been submitted — 12 months of protection from filing date",
      },
      {
        label: "Patent granted",
        desc: "A full patent has been approved and is in force",
      },
      {
        label: "Trade secret / know-how only",
        desc: "No patent filed — value is in the process or knowledge",
      },
      {
        label: "No IP protection yet",
        desc: "Technology is not yet protected by any formal mechanism",
      },
    ],
    prev: "s-q1",
    next: "s-q3",
  },
  {
    id: "s-q3",
    step: 5,
    field: "q3",
    eyebrow: "Assessment · Publication",
    title: "What is the publication status of your research?",
    sub: "Publication timing creates specific compliance obligations that affect what you can share and when.",
    options: [
      {
        label: "Under journal review",
        desc: "Paper submitted and currently being peer-reviewed — not yet publicly available",
        warning: "⚠ Compliance implications — CollabPilot will explain",
      },
      {
        label: "Published",
        desc: "Research is publicly available in a journal or preprint",
      },
      {
        label: "Not yet submitted",
        desc: "Paper is in draft stage and has not been sent to a journal",
      },
      {
        label: "Conference presentation only",
        desc: "Research has been presented publicly but not published in a journal",
      },
    ],
    prev: "s-q2",
    next: "s-q4",
  },
  {
    id: "s-q4",
    step: 6,
    field: "q4",
    eyebrow: "Assessment · Technology Transfer Office Involvement",
    title: "How involved is your Technology Transfer Office in this specific deal?",
    sub: "Your Technology Transfer Office legally owns and manages the Intellectual Property. Their level of involvement determines what steps you can take next.",
    options: [
      {
        label: "Not yet involved in this deal",
        desc: "I haven't opened a case with my Technology Transfer Office for this deal yet — this would be my first step",
        warning: "⚠ Action required before you can proceed",
      },
      {
        label: "Aware, but not yet formally engaged",
        desc: "I've mentioned Nexar Robotics' interest to my Technology Transfer Office but no formal case has been opened for this deal",
      },
      {
        label: "Actively involved",
        desc: "The Technology Transfer Office has opened a case for this deal and is leading the process",
      },
    ],
    prev: "s-q3",
    next: "s-processing",
  },
];
