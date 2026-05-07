"use client";

import type { AssessmentState } from "../../lib/assessment";

type Props = {
  state: AssessmentState;
  onRestart: () => void;
};

export default function ResultsScreen({ state, onRestart }: Props) {
  return (
    <div
      id="s-results"
      className="screen active"
      style={{
        background: "var(--off-white)",
        padding: "40px",
        overflowY: "auto",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--teal)",
            marginBottom: "10px",
          }}
        >
          Milestone 2 — debug placeholder
        </div>
        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "32px",
            color: "var(--navy)",
            fontWeight: 400,
            marginBottom: "8px",
          }}
        >
          Results coming in M3
        </h1>
        <p
          style={{
            fontSize: "13.5px",
            color: "var(--text-mid)",
            marginBottom: "24px",
            lineHeight: 1.6,
          }}
        >
          The full Gantt roadmap, compliance alerts, safe actions, next-steps
          checklist, and sidebar will land in Milestone 3 once the Claude API
          is wired up. Below is the assessment state we&rsquo;ll feed into it.
        </p>

        <pre
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid var(--border)",
            fontFamily: "'DM Mono', monospace",
            fontSize: "12px",
            lineHeight: 1.55,
            color: "var(--text-dark)",
            overflowX: "auto",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {JSON.stringify(state, null, 2)}
        </pre>

        <button
          className="btn-primary"
          onClick={onRestart}
          style={{ marginTop: "28px" }}
        >
          Start over
        </button>
      </div>
    </div>
  );
}
