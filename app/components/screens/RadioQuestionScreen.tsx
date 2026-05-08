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

const TOTAL_STEPS = 7;

function resolveInitialIdx(
  config: RadioQuestionConfig,
  state: AssessmentState
): number | null {
  const stored = state[config.field];
  if (!stored) return null;
  const idx = config.options.findIndex((o) => o.label === stored);
  return idx >= 0 ? idx : null;
}

export default function RadioQuestionScreen({
  config,
  state,
  setState,
  onContinue,
  onBack,
}: Props) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(() =>
    resolveInitialIdx(config, state)
  );
  const [showHint, setShowHint] = useState(false);
  const [shaking, setShaking] = useState(false);

  const pickOption = (i: number) => {
    setSelectedIdx(i);
    setShowHint(false);
  };

  const handleContinue = () => {
    if (selectedIdx === null) {
      setShowHint(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
      return;
    }
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
            style={{ fontSize: "12px", color: "var(--text-light)" }}
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
        <p className="q-required">* Select one option to continue</p>

        <div className="opts">
          {config.options.map((opt, i) => {
            const isSel = selectedIdx === i;
            const cls = isSel
              ? opt.warning
                ? "opt warn-sel sel"
                : "opt sel"
              : "opt";
            const radioStyle =
              opt.warning && isSel
                ? { borderColor: "var(--teal)", background: "var(--teal)" }
                : undefined;
            return (
              <div key={i} className={cls} onClick={() => pickOption(i)}>
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
          <button
            className={`btn-primary a-continue-btn${shaking ? " shake" : ""}`}
            onClick={handleContinue}
          >
            Continue →
          </button>
        </div>

        <div className={`a-required-hint${showHint ? " show" : ""}`}>
          <span className="ms">error</span>
          <div className="a-required-hint-inner">
            <div className="a-required-hint-title">Selection required</div>
            <div className="a-required-hint-desc">
              Please select one option above to continue.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
