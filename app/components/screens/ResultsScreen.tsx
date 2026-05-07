"use client";

import { useState } from "react";
import type { AssessmentState } from "../../lib/assessment";
import type { AssessmentResults } from "../../lib/results";

type Props = {
  state: AssessmentState;
  results: AssessmentResults;
  onRestart: () => void;
  onCreateAccount: () => void;
  onSignIn: () => void;
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
    };

const ROADMAP_STAGES: RoadmapStage[] = [
  { num: "01", name: "Compliance & Disclosure", active: true, width: 15, dur: "2–4 wks", owner: "RESEARCHER" },
  { num: "02", name: "NDA & CDA", active: false, left: 15, width: 12 },
  { num: "03", name: "Term Sheet", active: false, left: 27, width: 23 },
  { num: "04", name: "Due Diligence", active: false, left: 50, width: 15 },
  { num: "05", name: "License Agreement", active: false, left: 65, width: 12 },
  { num: "06", name: "Execution", active: false, left: 77, width: 23 },
];

const AXIS_TICKS = ["Wk 1", "Wk 4", "Wk 7", "Wk 13", "Wk 17", "Wk 20", "Wk 26+"];

function dealSummaryBullets(state: AssessmentState): string[] {
  const dealType = state.q1 || "IP Licensing";
  const ttoBullet =
    state.q4 === "Actively involved"
      ? "TTO is leading this deal"
      : "TTO must be briefed before any further communication";
  return [
    `${dealType} — Nexar Robotics interested in commercial use`,
    "Estimated timeline: 4–6 months to signed agreement",
    "Currently at Stage 1 — 2 compliance actions required before responding",
    ttoBullet,
  ];
}

const stub = (label: string) => () => console.log(`TODO: ${label}`);

export default function ResultsScreen({
  state,
  results,
  onRestart,
  onCreateAccount,
  onSignIn,
}: Props) {
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
  const displayInstitution =
    state.profile.institution || "Warsaw University of Technology";

  const dealTypeChip = state.q1 || "IP Licensing";
  const ipStatusChip = state.q2 || "Patent application filed";

  const publicationChip = (() => {
    switch (state.q3) {
      case "Published":
        return "Paper published in IEEE Transactions on Robotics";
      case "Not yet submitted":
        return "Paper not yet submitted";
      case "Conference presentation only":
        return "Conference presentation only";
      case "Under journal review":
      default:
        return "Paper under review at IEEE Transactions on Robotics";
    }
  })();

  const ttoActive = state.q4 === "Actively involved";
  const ttoChipText =
    state.q4 === "Actively involved"
      ? "TTO actively involved"
      : state.q4 === "Aware, but not yet formally engaged"
      ? "TTO informally aware"
      : "TTO not yet briefed";
  const ttoChipColor = ttoActive ? "var(--teal)" : "var(--terra)";

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
            onClick={onCreateAccount}
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
                  <span className="res-meta-txt">{dealTypeChip}</span>
                  <span className="res-meta-sep">·</span>
                  <span className="res-meta-txt">{displayInstitution}</span>
                  <span className="res-meta-sep">·</span>
                  <span className="res-meta-txt">{ipStatusChip}</span>
                  <span className="res-meta-sep">·</span>
                  <span className="res-meta-txt">{publicationChip}</span>
                  <span className="res-meta-sep">·</span>
                  <span
                    className="res-meta-txt"
                    style={{ color: ttoChipColor }}
                  >
                    {ttoChipText}
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
                Your deal roadmap
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
                    <div
                      className="gantt-bar-locked"
                      style={{
                        left: `${stage.left}%`,
                        width: `${stage.width}%`,
                      }}
                    ></div>
                  )}
                </div>
              </div>
            ))}

            <div className="gantt-summary">
              <div className="gantt-summary-lbl">
                <span className="ms" style={{ fontSize: "12px" }}>
                  auto_awesome
                </span>
                Deal summary
              </div>
              <ul className="gantt-summary-list">
                {dealSummaryBullets(state).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
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
              {results.complianceAlerts.map((alert, i) => {
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
              {results.safeActions.map((action, i) => (
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
            <button className="sb-unlock-btn" onClick={onCreateAccount}>
              Create account to unlock →
            </button>
            <div className="sb-unlock-signin">
              Have an account?{" "}
              <span onClick={onSignIn}>Sign in</span>
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
