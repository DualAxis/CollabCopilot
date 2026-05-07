"use client";

import { useState } from "react";
import type {
  AssessmentState,
  RadioQuestionConfig,
} from "../../lib/assessment";

type Props = {
  config: RadioQuestionConfig;
  state: AssessmentState;
  setState: React.Dispatch<React.SetStateAction<AssessmentState>>;
  onContinue: () => void;
  onBack: () => void;
};

const TOTAL_STEPS = 6;

function findInitialIdx(config: RadioQuestionConfig, state: AssessmentState): number {
  const stored = state[config.field];
  if (stored) {
    const idx = config.options.findIndex((o) => o.label === stored);
    if (idx >= 0) return idx;
  }
  const presel = config.options.findIndex((o) => o.preselected);
  return presel >= 0 ? presel : 0;
}

export default function RadioQuestionScreen({
  config,
  state,
  setState,
  onContinue,
  onBack,
}: Props) {
  const [selectedIdx, setSelectedIdx] = useState<number>(() =>
    findInitialIdx(config, state)
  );

  const handleContinue = () => {
    const chosen = config.options[selectedIdx];
    setState((s) => ({ ...s, [config.field]: chosen.label }));
    onContinue();
  };

  return (
    <div id={config.id} className="screen screen-assess active">
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
          <span
            className="mono"
            style={{ fontSize: "11px", color: "var(--text-light)" }}
          >
            Step {config.step} of {TOTAL_STEPS}
          </span>
        </div>
      </nav>

      <div className="assess-body">
        <div className="a-prog">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
            const cls =
              i < config.step - 1 ? "done" : i === config.step - 1 ? "cur" : "";
            return <div key={i} className={`a-step ${cls}`}></div>;
          })}
          <span className="a-lbl">
            Step {config.step} of {TOTAL_STEPS}
          </span>
        </div>

        <div className="a-eye">{config.eyebrow}</div>
        <h2 className="a-h">{config.title}</h2>
        <p className="a-sub">{config.sub}</p>

        <div className="opts">
          {config.options.map((opt, i) => {
            const isSel = selectedIdx === i;
            const baseCls = opt.warning ? "opt warn-sel" : "opt";
            const cls = isSel ? `${baseCls} sel` : baseCls;
            const radioStyle =
              opt.warning && isSel
                ? { borderColor: "var(--teal)", background: "var(--teal)" }
                : undefined;
            return (
              <div
                key={i}
                className={cls}
                onClick={() => setSelectedIdx(i)}
              >
                <div className="radio" style={radioStyle}>
                  {isSel && <div className="radio-dot"></div>}
                </div>
                <div>
                  <div className="opt-lbl">{opt.label}</div>
                  <div className="opt-desc">{opt.desc}</div>
                  {opt.warning && (
                    <div className="opt-warn">{opt.warning}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="a-foot">
          <button className="a-back" onClick={onBack}>
            ← Back
          </button>
          <button className="btn-primary" onClick={handleContinue}>
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
