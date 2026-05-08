"use client";

import { useState } from "react";
import type { AssessmentState } from "../../lib/assessment";

type Props = {
  state: AssessmentState;
  setState: React.Dispatch<React.SetStateAction<AssessmentState>>;
  onAnalyse: () => void;
  onBack: () => void;
};

const TOTAL_STEPS = 8;

const SUGGESTIONS: string[] = [
  "Is a 3-year exclusivity request from Nexar Robotics standard for this type of deal?",
  "I haven't told my TTO yet — what happens if I respond to Nexar before briefing them?",
  "My paper is under review at IEEE Transactions on Robotics — what exactly can I share right now?",
  "I presented the algorithm at a conference last month — does that create any IP risk?",
];

const AUTOFILL_TEXT =
  "Nexar Robotics is asking for 3-year exclusivity on my cobot collision-avoidance algorithm. My paper on the same algorithm is currently under review at IEEE Transactions on Robotics, and I haven't briefed my TTO at WUT yet. They've also asked for a response by next Friday.";

export default function ContextScreen({
  state,
  setState,
  onAnalyse,
  onBack,
}: Props) {
  const [usedSuggestions, setUsedSuggestions] = useState<Set<number>>(new Set());
  const [mode, setMode] = useState<"type" | "mic">("type");

  const setContext = (context: string) =>
    setState((s) => ({ ...s, context }));

  const addSuggestion = (idx: number) => {
    if (usedSuggestions.has(idx)) return;
    const suggestion = SUGGESTIONS[idx];
    setState((s) => ({
      ...s,
      context: s.context ? `${s.context}\n${suggestion}` : suggestion,
    }));
    setUsedSuggestions((prev) => {
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  };

  const handleAutofill = () => setContext(AUTOFILL_TEXT);

  return (
    <div id="s-context" className="screen screen-assess active">
      <nav className="top-nav">
        <div
          className="nav-logo"
          onClick={() => console.log("TODO: navigate home (goHome)")}
          style={{ cursor: "pointer" }}
        >
          <div className="logo-dot"></div>
          <span className="logo-text">CollabPilot</span>
        </div>
        <div className="nav-actions">
          <button className="nav-link" onClick={onBack}>
            ← Back
          </button>
        </div>
      </nav>

      <div className="assess-body">
        <div className="a-prog">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`a-step ${i < TOTAL_STEPS - 1 ? "done" : "cur"}`}
            ></div>
          ))}
          <span className="a-lbl">Step 8 of {TOTAL_STEPS} (removed)</span>
        </div>

        <div className="a-eye">Assessment · Optional</div>
        <h2 className="a-h">Anything else on your mind?</h2>
        <p className="a-sub">
          This step is optional. Based on your answers, here are some questions
          you might want to address — tap any to add it to your note, or write
          your own.
        </p>

        <ul className="ctx-bullets">
          {SUGGESTIONS.map((s, i) => {
            const used = usedSuggestions.has(i);
            const liStyle = used
              ? {
                  opacity: 0.45,
                  pointerEvents: "none" as const,
                  borderColor: "var(--border)",
                  background: "var(--off-white)",
                }
              : undefined;
            const dotStyle = used
              ? {
                  background: "var(--sage)",
                  borderColor: "var(--sage)",
                  color: "#fff",
                }
              : undefined;
            return (
              <li key={i} style={liStyle} onClick={() => addSuggestion(i)}>
                <div className="ctx-bullet-dot" style={dotStyle}>
                  {used ? "✓" : "+"}
                </div>
                <span>{s}</span>
              </li>
            );
          })}
        </ul>

        <div
          style={{
            fontSize: "12px",
            color: "var(--text-light)",
            marginTop: "-4px",
            marginBottom: "14px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "12px",
              color: "var(--teal)",
              letterSpacing: "0.06em",
            }}
          >
            ✦ AI-suggested
          </span>{" "}
          based on your previous answers
        </div>

        <div className="ctx-wrapper">
          <div className={`ctx-frame${mode === "mic" ? " recording" : ""}`}>
            <textarea
              id="ctx-ta"
              value={state.context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Type your question or concern here, or tap a suggestion above to add it…"
            ></textarea>
            <div
              className={`ctx-record-overlay${mode === "mic" ? " active" : ""}`}
            >
              <div className="rec-dot"></div>
              <div className="rec-waves">
                <div className="rec-wave"></div>
                <div className="rec-wave"></div>
                <div className="rec-wave"></div>
                <div className="rec-wave"></div>
                <div className="rec-wave"></div>
              </div>
              <div className="rec-label">Listening — speak now</div>
            </div>
            <div className="ctx-frame-foot">
              <span className="ctx-char-count">
                {state.context.length} characters
              </span>
              <div className="ctx-mode-btns">
                <button
                  className={`ctx-mode-btn${mode === "type" ? " active" : ""}`}
                  onClick={() => setMode("type")}
                  title="Type your answer"
                >
                  <span className="ms ms-sm">keyboard</span>
                </button>
                <button
                  className={`ctx-mode-btn${mode === "mic" ? " active" : ""}`}
                  onClick={() => setMode(mode === "mic" ? "type" : "mic")}
                  title="Record with microphone"
                >
                  <span className="ms ms-sm">mic</span>
                </button>
              </div>
              <button
                className="ctx-demo-btn"
                onClick={handleAutofill}
                title="Fill demo scenario"
              >
                autofill
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px",
            paddingTop: "14px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <button className="a-back" onClick={onBack}>
            ← Back
          </button>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              className="btn-secondary"
              onClick={onAnalyse}
              style={{ fontSize: "13px", padding: "9px 18px" }}
            >
              Skip →
            </button>
            <button className="btn-primary" onClick={onAnalyse}>
              Analyse my situation →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
