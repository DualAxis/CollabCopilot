"use client";

import { useState } from "react";
import type { AssessmentState } from "../../lib/assessment";
import { MOCK_RESULTS } from "../../lib/results";

type Props = {
  state: AssessmentState;
  onRestart: () => void;
};

type RoadmapStage =
  | {
      num: string;
      name: string;
      active: true;
      width: number;
      dur: string;
      owner: string;
    }
  | {
      num: string;
      name: string;
      active: false;
      left: number;
      width: number;
      label: string;
    };

const ROADMAP_STAGES: RoadmapStage[] = [
  { num: "01", name: "Compliance & Disclosure", active: true, width: 15, dur: "2–4 wks", owner: "RESEARCHER" },
  { num: "02", name: "NDA & CDA", active: false, left: 15, width: 12, label: "~3 wks · TTO" },
  { num: "03", name: "Term Sheet", active: false, left: 27, width: 23, label: "3–6 wks · TTO + Business" },
  { num: "04", name: "Due Diligence", active: false, left: 50, width: 15, label: "~4 wks · TTO" },
  { num: "05", name: "License Agreement", active: false, left: 65, width: 12, label: "2–3 wks · All 3" },
  { num: "06", name: "Execution", active: false, left: 77, width: 23, label: "Ongoing · All 3" },
];

const AXIS_TICKS = ["Wk 1", "Wk 4", "Wk 7", "Wk 13", "Wk 17", "Wk 20", "Wk 26+"];

const stub = (label: string) => () => console.log(`TODO M6: ${label}`);

export default function ResultsScreen({ state, onRestart }: Props) {
  const [openWhy, setOpenWhy] = useState<Set<number>>(new Set());

  const toggleWhy = (i: number) =>
    setOpenWhy((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });

  const displayName = state.profile.name || "Dr. Paulina Chen";

  return (
    <div
      id="s-results"
      className="screen active"
      style={{ background: "var(--off-white)" }}
    >
      <nav className="top-nav">
        <div
          className="nav-logo"
          style={{ cursor: "pointer" }}
          onClick={stub("goHome")}
        >
          <div className="logo-dot"></div>
          <span className="logo-text">CollabPilot</span>
        </div>
        <div className="nav-actions">
          <button
            className="nav-link"
            onClick={onRestart}
            style={{ marginRight: "4px" }}
          >
            ← Redo assessment
          </button>
          <button
            className="btn-primary"
            onClick={stub("login")}
            style={{ fontSize: "13px", padding: "8px 16px" }}
          >
            Create account →
          </button>
        </div>
      </nav>

      <div className="res-page">
        <div className="res-main-col">
          {/* ── Header block ── */}
          <div>
            <div className="res-hdr">
              <div className="res-hdr-left">
                <div className="res-status-row">
                  <div className="res-status-dot"></div>
                  <span className="res-status-txt">Assessment complete</span>
                </div>
                <div className="res-hdr-title-row">
                  <span className="res-hdr-name">Assessment Result</span>
                  <span className="res-hdr-dot">·</span>
                  <span
                    className="res-hdr-name"
                    style={{ color: "var(--teal)", fontStyle: "italic" }}
                  >
                    {displayName}
                  </span>
                </div>
                <div className="res-hdr-meta">
                  <span className="res-meta-txt">IP Licensing</span>
                  <span className="res-meta-sep">·</span>
                  <span className="res-meta-txt">
                    Warsaw University of Technology
                  </span>
                  <span className="res-meta-sep">·</span>
                  <span className="res-meta-txt">Patent application filed</span>
                  <span className="res-meta-sep">·</span>
                  <span className="res-meta-txt">
                    Paper under review at IEEE Transactions on Robotics
                  </span>
                  <span className="res-meta-sep">·</span>
                  <span
                    className="res-meta-txt"
                    style={{ color: "var(--terra)" }}
                  >
                    TTO not yet briefed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Gantt card ── */}
          <div className="gantt-card">
            <div className="gantt-card-head">
              <div className="gantt-card-title">
                <span
                  className="ms"
                  style={{ fontSize: "15px", color: "var(--teal)" }}
                >
                  map
                </span>
                Your personalised deal roadmap
              </div>
              <span className="gantt-unlock-note">
                Stage 1 unlocked · Stages 2–6 require an account
              </span>
            </div>

            <div className="gantt-axis-row">
              {AXIS_TICKS.map((tick) => (
                <div key={tick} className="gantt-axis-tick">
                  {tick}
                </div>
              ))}
            </div>

            {ROADMAP_STAGES.map((stage) => (
              <div key={stage.num} className="gantt-stage-row">
                <div className="gantt-stage-lbl">
                  <span
                    className="gantt-stage-num"
                    style={
                      stage.active
                        ? undefined
                        : { color: "var(--text-light)" }
                    }
                  >
                    {stage.num}
                  </span>
                  <span
                    className={`gantt-stage-nm${stage.active ? "" : " lk"}`}
                  >
                    {stage.name}
                  </span>
                </div>
                <div className="gantt-track">
                  {stage.active ? (
                    <div
                      className="gantt-bar-active"
                      style={{ width: `${stage.width}%` }}
                    >
                      <span className="gantt-bar-dur">{stage.dur}</span>
                      <span className="gantt-bar-owner">{stage.owner}</span>
                    </div>
                  ) : (
                    <>
                      <div
                        className="gantt-bar-locked"
                        style={{
                          left: `${stage.left}%`,
                          width: `${stage.width}%`,
                        }}
                      ></div>
                      <div
                        className="gantt-bar-locked-label"
                        style={{ left: `${stage.left + 1}%` }}
                      >
                        {stage.label}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}

            <div className="gantt-unlock-bar">
              <span className="gantt-unlock-txt">
                Stages 2–6 locked — create an account, 14-day trial, no credit
                card
              </span>
              <button
                className="gantt-unlock-btn"
                onClick={stub("login")}
              >
                Create account to unlock →
              </button>
            </div>

            <div className="gantt-summary">
              <div className="gantt-summary-lbl">
                <span className="ms" style={{ fontSize: "12px" }}>
                  auto_awesome
                </span>
                AI-generated deal summary
              </div>
              <div
                className="gantt-summary-txt"
                dangerouslySetInnerHTML={{ __html: MOCK_RESULTS.summary }}
              ></div>
            </div>
          </div>

          {/* ── Module 1 — Compliance alerts ── */}
          <div className="module">
            <div className="module-head" style={{ cursor: "default" }}>
              <div className="module-head-left">
                <div className="module-icon urgent">
                  <span className="ms" style={{ fontSize: "14px" }}>
                    warning
                  </span>
                </div>
                <div>
                  <div className="module-title">Compliance alerts</div>
                  <div className="module-summary">
                    Act on these before responding to Nexar
                  </div>
                </div>
              </div>
              <div className="module-head-right">
                <span className="module-badge urgent">2 urgent</span>
                <span
                  className="module-chevron ms"
                  style={{ fontSize: "18px" }}
                >
                  expand_less
                </span>
              </div>
            </div>
            <div className="module-body" style={{ display: "block" }}>
              {MOCK_RESULTS.complianceAlerts.map((alert, i) => {
                const isOpen = openWhy.has(i);
                return (
                  <div key={i} className="alert-item">
                    <div className="alert-flag">⚠ {alert.flag}</div>
                    <div className="alert-ititle">{alert.title}</div>
                    <div className="alert-idesc">{alert.description}</div>
                    <button
                      className="alert-why-btn"
                      onClick={() => toggleWhy(i)}
                    >
                      <span className="ms" style={{ fontSize: "13px" }}>
                        {isOpen ? "expand_more" : "chevron_right"}
                      </span>{" "}
                      Why did AI flag this?
                    </button>
                    <div
                      className={`alert-why-body${isOpen ? " open" : ""}`}
                    >
                      <div className="alert-why-rule">{alert.ruleFired}</div>
                      <div className="alert-why-src">
                        <span className="ms" style={{ fontSize: "12px" }}>
                          link
                        </span>
                        Source:{" "}
                        <a
                          href={alert.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {alert.sourceLabel}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Module 2 — Safe actions today ── */}
          <div className="module">
            <div className="module-head" style={{ cursor: "default" }}>
              <div className="module-head-left">
                <div className="module-icon safe">
                  <span className="ms" style={{ fontSize: "14px" }}>
                    check_circle
                  </span>
                </div>
                <div>
                  <div className="module-title">Safe actions today</div>
                  <div className="module-summary">
                    What you can do right now without compliance risk
                  </div>
                </div>
              </div>
              <div className="module-head-right">
                <span className="module-badge safe">2 actions</span>
                <span
                  className="module-chevron ms"
                  style={{ fontSize: "18px" }}
                >
                  expand_less
                </span>
              </div>
            </div>
            <div className="module-body" style={{ display: "block" }}>
              {MOCK_RESULTS.safeActions.map((action, i) => (
                <div key={i} className="safe-item">
                  <div className="safe-dot">✓</div>
                  <div>
                    <div className="safe-title">{action.title}</div>
                    <div className="safe-desc">{action.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Module 3 — Next steps checklist ── */}
          <div className="module">
            <div className="module-head" style={{ cursor: "default" }}>
              <div className="module-head-left">
                <div className="module-icon check">
                  <span className="ms" style={{ fontSize: "14px" }}>
                    checklist
                  </span>
                </div>
                <div>
                  <div className="module-title">Next steps checklist</div>
                  <div className="module-summary">
                    Your Stage 1 action list — 1 done, 3 to go
                  </div>
                </div>
              </div>
              <div className="module-head-right">
                <span className="module-badge check">Stage 1</span>
                <span
                  className="module-chevron ms"
                  style={{ fontSize: "18px" }}
                >
                  expand_less
                </span>
              </div>
            </div>
            <div className="module-body" style={{ display: "block" }}>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  color: "var(--text-light)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                This week · Get your TTO in the loop
              </div>

              {MOCK_RESULTS.nextSteps.map((item, i) => {
                if (item.state === "done") {
                  return (
                    <div key={i} className="cl-item done">
                      <div className="cl-checkbox done-c">✓</div>
                      <div className="cl-txt done-t">{item.label}</div>
                    </div>
                  );
                }
                if (item.state === "active") {
                  return (
                    <div key={i} className="cl-item active">
                      <div className="cl-checkbox active-c"></div>
                      <div>
                        <div className="cl-txt">{item.label}</div>
                        {item.badge && (
                          <div className="cl-badge">{item.badge}</div>
                        )}
                      </div>
                    </div>
                  );
                }
                if (item.state === "locked") {
                  return (
                    <div key={i} className="cl-item locked">
                      <div className="cl-locked-ic">🔒</div>
                      <div className="cl-txt locked-t">{item.label}</div>
                    </div>
                  );
                }
                return (
                  <div key={i} className="cl-item">
                    <div className="cl-checkbox"></div>
                    <div className="cl-txt">{item.label}</div>
                  </div>
                );
              })}

              <div className="ai-action-card">
                <div className="ai-action-left">
                  <span className="ai-action-star">✦</span>
                  <span className="ai-action-txt">
                    CollabPilot drafted a holding reply to Nexar — polite, no
                    technical data, buys you 5 days.
                  </span>
                </div>
                <button
                  className="ai-action-btn"
                  onClick={stub("review draft")}
                >
                  Review draft
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="res-sidebar-col">
          <div className="sb-card dark">
            <div className="sb-unlock-chip">✦ Your next step</div>
            <div className="sb-unlock-h">Your roadmap is ready</div>
            <div className="sb-unlock-sub">
              Create your account to unlock your Stage 1 checklist, full
              roadmap, and AI-drafted reply. 14-day trial — no credit card.
            </div>
            <div className="sb-unlock-list">
              <div className="sb-unlock-item">
                <span className="sb-unlock-check">✓</span>Stage 1 compliance
                checklist (5 items)
              </div>
              <div className="sb-unlock-item">
                <span className="sb-unlock-check">✓</span>Full 6-stage roadmap
                with durations
              </div>
              <div className="sb-unlock-item">
                <span className="sb-unlock-check">✓</span>AI-drafted holding
                reply to Nexar
              </div>
              <div className="sb-unlock-item">
                <span className="sb-unlock-check">✓</span>My Deal Brief — AI
                deal summary
              </div>
            </div>
            <button className="sb-unlock-btn" onClick={stub("login")}>
              Create account to unlock →
            </button>
            <div className="sb-unlock-signin">
              Have an account?{" "}
              <span onClick={stub("signin")}>Sign in</span>
            </div>
          </div>

          <div className="sb-card">
            <div className="sb-kl-label">Knowledge library</div>
            <div className="sb-kl-title">IP Disclosure Checklist</div>
            <div className="sb-kl-desc">
              A step-by-step guide to notifying your TTO and protecting patent
              rights before publication or commercial discussion.
            </div>
            <div className="sb-kl-tag">↗ Triggered by your compliance flag</div>
            <button
              className="btn-secondary"
              onClick={stub("read library")}
              style={{ fontSize: "13px", padding: "9px 18px" }}
            >
              Read in Library →
            </button>
          </div>

          <div className="sb-card">
            <div className="sb-pricing-label">Researcher plan</div>
            <div className="sb-pricing-h">Researcher Individual License</div>
            <div className="sb-pricing-desc">
              Full 6-stage roadmap, institution-specific rules, complete
              document intelligence. <strong>14-day free trial</strong> — no
              credit card required.
            </div>
            <button
              className="btn-secondary"
              onClick={stub("see pricing")}
              style={{ fontSize: "13px", padding: "9px 18px" }}
            >
              See what&rsquo;s included →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
