"use client";

import { useState } from "react";
import type { AssessmentState } from "../../lib/assessment";
import {
  deriveCurrentStageFromState,
  remainingTimelineForStage,
} from "../../lib/assessment";
import type { AssessmentResults } from "../../lib/results";
import AILabel from "../ui/AILabel";

type Props = {
  state: AssessmentState;
  results: AssessmentResults;
  onRestart: () => void;
  onCreateAccount: () => void;
  onSignIn: () => void;
};

type RoadmapStageBase = {
  num: string;
  name: string;
  /** % offset from the left of the gantt track */
  left: number;
  /** % width on the gantt track */
  width: number;
};

type RoadmapStage =
  | (RoadmapStageBase & {
      status: "active";
      dur: string;
      owner: string;
    })
  | (RoadmapStageBase & { status: "done" | "locked" });

const STAGE_DEFS: (RoadmapStageBase & { dur: string; owner: string })[] = [
  { num: "01", name: "Compliance & Disclosure", left: 0, width: 15, dur: "2\u20134 wks", owner: "RESEARCHER" },
  { num: "02", name: "NDA & CDA", left: 15, width: 12, dur: "1\u20132 wks", owner: "TTO" },
  { num: "03", name: "Term Sheet", left: 27, width: 23, dur: "3\u20136 wks", owner: "TTO + PARTNER" },
  { num: "04", name: "Due Diligence", left: 50, width: 15, dur: "2\u20134 wks", owner: "PARTNER" },
  { num: "05", name: "License Agreement", left: 65, width: 12, dur: "2\u20134 wks", owner: "TTO + LEGAL" },
  { num: "06", name: "Execution", left: 77, width: 23, dur: "ongoing", owner: "ALL PARTIES" },
];

function buildRoadmapStages(currentStage: number): RoadmapStage[] {
  const stage = Math.min(6, Math.max(1, Math.round(currentStage)));
  return STAGE_DEFS.map((def, i) => {
    const idx = i + 1;
    if (idx < stage) return { ...def, status: "done" } as RoadmapStage;
    if (idx === stage)
      return { ...def, status: "active" } as RoadmapStage;
    return { ...def, status: "locked" } as RoadmapStage;
  });
}

const AXIS_TICKS = ["Wk 1", "Wk 4", "Wk 7", "Wk 13", "Wk 17", "Wk 20", "Wk 26+"];

const STAGE_NAMES: Record<number, string> = {
  1: "Stage 1 (Compliance & Disclosure)",
  2: "Stage 2 (NDA & CDA)",
  3: "Stage 3 (Term Sheet)",
  4: "Stage 4 (Due Diligence)",
  5: "Stage 5 (License Agreement)",
  6: "Stage 6 (Execution)",
};

/** Lower-case descriptor used inline (e.g. "Stage 3 term sheet checklist"). */
const STAGE_DESCRIPTORS: Record<number, string> = {
  1: "compliance",
  2: "NDA & CDA",
  3: "term sheet",
  4: "due diligence",
  5: "license agreement",
  6: "execution",
};

function unlockNote(stage: number): string {
  const s = Math.min(6, Math.max(1, Math.round(stage)));
  if (s >= 6) return "Stage 6 unlocked";
  const right =
    s + 1 === 6
      ? "Stage 6 requires an account"
      : `Stages ${s + 1}\u20136 require an account`;
  return `Stage ${s} unlocked \u00b7 ${right}`;
}

function dealSummaryBullets(
  state: AssessmentState,
  currentStage: number
): string[] {
  const dealType = state.q1 || "IP Licensing";
  const partner = state.profile.partner.trim() || "the partner";
  const stage = Math.min(6, Math.max(1, Math.round(currentStage)));
  const stageLabel = STAGE_NAMES[stage] ?? STAGE_NAMES[1];
  const stageBullet =
    stage === 1
      ? `Currently at ${stageLabel} \u2014 2 compliance actions required before responding`
      : `Currently at ${stageLabel}`;
  const ttoBullet =
    state.q4 === "Actively involved"
      ? "TTO is leading this deal"
      : "TTO must be briefed before any further communication";
  return [
    `${dealType} \u00b7 ${partner}`,
    `Estimated timeline: ${remainingTimelineForStage(stage)}`,
    stageBullet,
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

  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2800);
  };

  const displayName = state.profile.name || "Dr. Paulina Chen";
  const displayInstitution =
    state.profile.institution || "Warsaw University of Technology";

  const dealTypeChip = state.q1 || "IP Licensing";
  const ipStatusChip = state.q2 || "Patent application filed";

  const publicationChip = (() => {
    switch (state.q3) {
      case "Published":
        return "Paper published";
      case "Not yet submitted":
        return "Paper not yet submitted";
      case "Conference presentation only":
        return "Conference presentation only";
      case "Under journal review":
        return "Paper under journal review";
      default:
        return "Publication status not specified";
    }
  })();

  // The Gantt timeline + deal-summary bullet are driven by a deterministic
  // q0-based derivation rather than results.currentStage. This guarantees the
  // active stage box matches the user's q0 answer even when the API falls
  // back to MOCK_RESULTS or the model picks a different stage.
  const currentStage = deriveCurrentStageFromState(state);

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
                <div className="res-status-row" style={{ marginBottom: "6px" }}>
                  <div className="res-status-dot"></div>
                  <span className="res-status-txt">Assessment complete</span>
                </div>
                <div
                  className="res-hdr-title-row"
                  style={{ flexDirection: "column", alignItems: "flex-start", gap: "2px" }}
                >
                  <span className="res-hdr-name">Assessment Result</span>
                  <span className="res-hdr-subname">{displayName}</span>
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

          {/* ── Download partial report (CP-DL-01) ── */}
          <div className="res-download-bar">
            <div className="res-dl-left">
              <span
                className="ms"
                style={{ fontSize: "18px", color: "var(--text-light)" }}
              >
                download
              </span>
              <div>
                <div className="res-dl-txt">
                  Download your Stage {currentStage} assessment report
                </div>
                <div className="res-dl-note">
                  ⚠ This report will not be available after you leave this page
                </div>
              </div>
            </div>
            <button
              className="res-dl-btn"
              onClick={handleDownload}
              style={
                downloaded
                  ? { color: "var(--sage)", borderColor: "var(--sage)" }
                  : undefined
              }
            >
              <span className="ms" style={{ fontSize: "15px" }}>
                {downloaded ? "check_circle" : "download"}
              </span>
              {downloaded ? "Downloaded" : "Download PDF"}
            </button>
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
                {unlockNote(currentStage)}
              </span>
            </div>

            <div className="gantt-axis-row">
              {AXIS_TICKS.map((tick) => (
                <div key={tick} className="gantt-axis-tick">
                  {tick}
                </div>
              ))}
            </div>

            {buildRoadmapStages(currentStage).map((stage) => (
              <div key={stage.num} className="gantt-stage-row">
                <div className="gantt-stage-lbl">
                  <span
                    className="gantt-stage-num"
                    style={
                      stage.status === "locked"
                        ? { color: "var(--text-light)" }
                        : undefined
                    }
                  >
                    {stage.num}
                  </span>
                  <span
                    className={`gantt-stage-nm${stage.status === "locked" ? " lk" : ""}`}
                  >
                    {stage.name}
                  </span>
                </div>
                <div className="gantt-track">
                  {stage.status === "active" && (
                    <div
                      className="gantt-bar-active"
                      style={{
                        left: `${stage.left}%`,
                        width: `${stage.width}%`,
                      }}
                    >
                      <span className="gantt-bar-dur">{stage.dur}</span>
                      <span className="gantt-bar-owner">{stage.owner}</span>
                    </div>
                  )}
                  {stage.status === "done" && (
                    <div
                      className="gantt-bar-done"
                      style={{
                        left: `${stage.left}%`,
                        width: `${stage.width}%`,
                      }}
                    ></div>
                  )}
                  {stage.status === "locked" && (
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
              <AILabel context="Deal summary" className="gantt-summary-lbl" />
              <ul className="gantt-summary-list">
                {dealSummaryBullets(state, currentStage).map((b, i) => (
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
                  <div
                    className="module-summary"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      marginTop: 2,
                    }}
                  >
                    <span
                      className="ms"
                      style={{ fontSize: 12, color: "var(--teal)" }}
                    >
                      auto_awesome
                    </span>
                    <span style={{ fontSize: 12, color: "var(--teal)" }}>
                      CollabPilot analysis
                    </span>
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
              <div style={{ marginBottom: "14px" }}>
                <AILabel context="Compliance analysis" />
              </div>
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
                      Why did CollabPilot flag this?
                    </button>
                    <div
                      className={`alert-why-body${isOpen ? " open" : ""}`}
                    >
                      <div style={{ marginBottom: "8px" }}>
                        <AILabel context="Reasoning" />
                      </div>
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
                  <div
                    className="module-summary"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      marginTop: 2,
                    }}
                  >
                    <span
                      className="ms"
                      style={{ fontSize: 12, color: "var(--teal)" }}
                    >
                      auto_awesome
                    </span>
                    <span style={{ fontSize: 12, color: "var(--teal)" }}>
                      CollabPilot suggestion
                    </span>
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
              <div style={{ marginBottom: "14px" }}>
                <AILabel context="Suggested actions" />
              </div>
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
              Create your account to unlock your Stage {currentStage}{" "}
              checklist, full roadmap, and AI-drafted reply. 14-day trial
              {"\u2014"} no credit card.
            </div>
            <div className="sb-unlock-list">
              <div className="sb-unlock-item">
                <span className="sb-unlock-check">✓</span>Stage {currentStage}{" "}
                {STAGE_DESCRIPTORS[currentStage] ?? "compliance"} checklist (5
                items)
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
                <span className="sb-unlock-check">✓</span>My Deal Brief — your
                assessment saved as a deal
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
