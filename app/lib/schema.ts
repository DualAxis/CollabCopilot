import { z } from "zod";

export const ComplianceAlertSchema = z.object({
  flag: z
    .string()
    .describe("Short urgency banner like 'Action required today'"),
  title: z.string().describe("One-line headline of the risk"),
  description: z
    .string()
    .describe("Plain-English explanation of the risk, 60-90 words"),
  ruleFired: z
    .string()
    .describe(
      "Pseudo-rule trace beginning with 'Rule fired:' followed by the conflicting conditions and the policy citation"
    ),
  sourceUrl: z
    .string()
    .url()
    .describe(
      "https URL on uidp.org, autm.net, or a recognised university IP policy page"
    ),
  sourceLabel: z
    .string()
    .describe(
      "Human-readable label for the source, e.g. 'UIDP Contract Accords \u2014 Article 4.2'"
    ),
});

export const SafeActionSchema = z.object({
  title: z.string(),
  description: z
    .string()
    .describe("60-90 words, concrete, no compliance risk"),
});

export const ChecklistItemSchema = z.object({
  label: z.string(),
  state: z.enum(["done", "active", "plain", "locked"]),
  badge: z
    .string()
    .optional()
    .describe("Only set when state is 'active', e.g. '\u2192 Next action'"),
});

export const AssessmentResultsSchema = z.object({
  summary: z
    .string()
    .describe(
      "70-110 word executive summary. May contain inline <strong>...</strong> tags for emphasis on stage name and timeline. No other HTML."
    ),
  currentStage: z
    .number()
    .int()
    .min(1)
    .max(6)
    .describe(
      "Which of the 6 deal-roadmap stages the user is currently in. 1 = Compliance & Disclosure, 2 = NDA & CDA, 3 = Term Sheet, 4 = Due Diligence, 5 = License Agreement, 6 = Execution. Always 1 if the TTO has not yet been involved (a deal cannot progress past compliance without TTO ownership)."
    ),
  complianceAlerts: z.array(ComplianceAlertSchema).length(2),
  safeActions: z.array(SafeActionSchema).length(2),
  nextSteps: z
    .array(ChecklistItemSchema)
    .length(5)
    .describe(
      "Exactly 5 items in this order: 1 'done', 1 'active' with a badge, 1 'plain', 2 'locked'."
    ),
  draftedReply: z
    .string()
    .describe(
      "Email body addressed to the partner contact. Plain text with \\n line breaks. No subject line. Sign-off as the researcher."
    ),
});

export type AssessmentResultsInferred = z.infer<typeof AssessmentResultsSchema>;
