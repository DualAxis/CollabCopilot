export type EmailTemplateKey = "tto-briefing" | "holding-reply";

export type EmailTemplate = {
  title: string;
  to: string;
  subject: string;
  body: string;
  primaryLabel: string;
  footerNote: string;
};

export const EMAIL_TEMPLATES: Record<EmailTemplateKey, EmailTemplate> = {
  "tto-briefing": {
    title: "TTO Briefing Template",
    to: "katarzyna.w@pw.edu.pl",
    subject: "TTO Briefing \u2014 Nexar Robotics IP Licensing Inquiry",
    body: "Hi Katarzyna,\n\nI'd like to brief you on a commercial inquiry I've received. Nexar Robotics (Marek Nowak, BD Lead) has contacted me regarding licensing my adaptive cobot collision-avoidance algorithm.\n\nKey details:\n\u2022 IP status: Patent application filed May 1, 2026\n\u2022 Publication: Paper under review at IEEE Transactions on Robotics\n\u2022 Request: 3-year exclusive licensing agreement\n\nI haven't shared any technical data yet. Could we schedule a call this week to discuss next steps?\n\nBest regards,\nDr. Paulina Chen\nWUT",
    primaryLabel: "Create document \u2192",
    footerNote: "CollabPilot \u00b7 Pre-filled from your deal context \u00b7 Editable",
  },
  "holding-reply": {
    title: "Holding Reply to Nexar Robotics",
    to: "marek.nowak@nexarrobotics.com",
    subject: "Re: Licensing inquiry \u2014 follow-up",
    body: "Dear Marek,\n\nThank you for your interest in our cobot collision-avoidance research.\n\nI'm currently reviewing your inquiry with our Technology Transfer Office to ensure we follow the correct process before proceeding. I expect to be in touch with next steps within the next 5 business days.\n\nI look forward to exploring this further.\n\nBest regards,\nDr. Paulina Chen\nWUT",
    primaryLabel: "Create document \u2192",
    footerNote: "CollabPilot \u00b7 Pre-filled from your deal context \u00b7 Editable",
  },
};
