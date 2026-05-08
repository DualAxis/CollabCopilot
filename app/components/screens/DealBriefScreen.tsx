"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import WorkspaceShell from "../layout/WorkspaceShell";
import type {
  DealBrief,
  WhoBlock,
  WhatBlock,
  GoalsBlock,
  PartyAccessStatus,
} from "../../lib/dealBrief";

type Props = {
  dealBrief: DealBrief;
  setDealBrief: Dispatch<SetStateAction<DealBrief>>;
  onBackToDealsList: () => void;
  onSignOut: () => void;
  onNavDeals?: () => void;
  onNavRoadmap?: () => void;
  userName?: string;
  userRole?: string;
};

const DEAL_NAME_LINES = [
  "Nexar Robotics \u2014",
  "Cobot Algorithm License",
];

function statusBadgeStyle(
  status: PartyAccessStatus
): React.CSSProperties {
  const base: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 500,
    padding: "2px 8px",
    borderRadius: 100,
    marginLeft: 8,
  };
  if (status === "Joined" || status === "Owner") {
    return {
      ...base,
      background: "var(--sage-faint)",
      color: "var(--sage)",
    };
  }
  if (status === "Invited") {
    return {
      ...base,
      background: "var(--amber-faint)",
      color: "var(--amber-text)",
    };
  }
  return {
    ...base,
    background: "var(--off-white)",
    color: "var(--text-light)",
  };
}

const PUBLICATION_ALERT_RE = /review/i;

export default function DealBriefScreen({
  dealBrief,
  setDealBrief,
  onBackToDealsList,
  onSignOut,
  onNavDeals,
  onNavRoadmap,
  userName,
  userRole,
}: Props) {
  const [editingWho, setEditingWho] = useState(false);
  const [draftWho, setDraftWho] = useState<WhoBlock>(dealBrief.who);

  const [editingWhat, setEditingWhat] = useState(false);
  const [draftWhat, setDraftWhat] = useState<WhatBlock>(dealBrief.what);

  const [editingGoals, setEditingGoals] = useState(false);
  const [draftGoals, setDraftGoals] = useState<GoalsBlock>(dealBrief.goals);

  const startEditWho = () => {
    setDraftWho(dealBrief.who);
    setEditingWho(true);
  };
  const saveWho = () => {
    setDealBrief((prev) => ({ ...prev, who: draftWho }));
    setEditingWho(false);
  };
  const cancelWho = () => setEditingWho(false);

  const startEditWhat = () => {
    setDraftWhat(dealBrief.what);
    setEditingWhat(true);
  };
  const saveWhat = () => {
    setDealBrief((prev) => ({ ...prev, what: draftWhat }));
    setEditingWhat(false);
  };
  const cancelWhat = () => setEditingWhat(false);

  const startEditGoals = () => {
    setDraftGoals(dealBrief.goals);
    setEditingGoals(true);
  };
  const saveGoals = () => {
    setDealBrief((prev) => ({ ...prev, goals: draftGoals }));
    setEditingGoals(false);
  };
  const cancelGoals = () => setEditingGoals(false);

  const publication = dealBrief.what.publicationStatus;
  const publicationIsAlert = PUBLICATION_ALERT_RE.test(publication);

  return (
    <WorkspaceShell
      active="deals"
      onSignOut={onSignOut}
      onNavDeals={onNavDeals}
      onNavRoadmap={onNavRoadmap}
      userName={userName}
      userRole={userRole}
    >
      <div style={{ marginTop: 4 }}>
        <div className="brief-crumb">
          <span onClick={onBackToDealsList}>My Deals</span>
          <span className="brief-crumb-sep">&rsaquo;</span>
          <span style={{ color: "var(--text-dark)" }}>Nexar Robotics</span>
        </div>

        <div className="brief-title-row">
          <h1 className="brief-title">
            {DEAL_NAME_LINES[0]}
            <br />
            {DEAL_NAME_LINES[1]}
          </h1>
        </div>
        <div className="brief-badges">
          <span className="brief-badge type">IP Licensing &middot; Exclusive</span>
          <span className="brief-badge stage">
            Stage 1 &middot; Compliance &amp; Disclosure
          </span>
          <span className="brief-badge status">&bull; Active</span>
        </div>

        {/* WHO */}
        <div className="brief-section">
          <div className="brief-section-head">
            <span className="brief-sec-label">Who</span>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {!editingWho && (
                <button className="brief-edit" onClick={startEditWho}>
                  Edit
                </button>
              )}
              {editingWho && (
                <>
                  <button
                    className="brief-edit"
                    style={{ color: "var(--navy)" }}
                    onClick={saveWho}
                  >
                    Save
                  </button>
                  <button
                    className="brief-edit"
                    style={{ color: "var(--text-light)" }}
                    onClick={cancelWho}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
          {!editingWho ? (
            <div className="brief-grid">
              <div className="brief-field">
                <div className="brief-field-label">Researcher</div>
                <div className="brief-field-value">
                  {dealBrief.who.researcher}
                </div>
              </div>
              <div className="brief-field">
                <div className="brief-field-label">Institution</div>
                <div className="brief-field-value">
                  {dealBrief.who.institution}
                </div>
              </div>
              <div className="brief-field">
                <div className="brief-field-label">Business partner</div>
                <div className="brief-field-value">
                  {dealBrief.who.businessPartner}
                  <span style={statusBadgeStyle(dealBrief.who.businessStatus)}>
                    {dealBrief.who.businessStatus}
                  </span>
                </div>
              </div>
              <div className="brief-field">
                <div className="brief-field-label">TTO officer</div>
                <div className="brief-field-value">
                  {dealBrief.who.ttoOfficer}
                  <span style={statusBadgeStyle(dealBrief.who.ttoStatus)}>
                    {dealBrief.who.ttoStatus}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="brief-grid">
              <div className="brief-field">
                <div className="brief-field-label">Researcher</div>
                <input
                  className="f-input"
                  value={draftWho.researcher}
                  onChange={(e) =>
                    setDraftWho({ ...draftWho, researcher: e.target.value })
                  }
                  style={{ marginBottom: 0, fontSize: 14, padding: "8px 12px" }}
                />
              </div>
              <div className="brief-field">
                <div className="brief-field-label">Institution</div>
                <input
                  className="f-input"
                  value={draftWho.institution}
                  onChange={(e) =>
                    setDraftWho({ ...draftWho, institution: e.target.value })
                  }
                  style={{ marginBottom: 0, fontSize: 14, padding: "8px 12px" }}
                />
              </div>
              <div className="brief-field">
                <div className="brief-field-label">Business partner</div>
                <input
                  className="f-input"
                  value={draftWho.businessPartner}
                  onChange={(e) =>
                    setDraftWho({
                      ...draftWho,
                      businessPartner: e.target.value,
                    })
                  }
                  style={{ marginBottom: 0, fontSize: 14, padding: "8px 12px" }}
                />
              </div>
              <div className="brief-field">
                <div className="brief-field-label">TTO officer</div>
                <input
                  className="f-input"
                  value={draftWho.ttoOfficer}
                  onChange={(e) =>
                    setDraftWho({ ...draftWho, ttoOfficer: e.target.value })
                  }
                  style={{ marginBottom: 0, fontSize: 14, padding: "8px 12px" }}
                />
              </div>
            </div>
          )}
        </div>

        {/* WHAT */}
        <div className="brief-section">
          <div className="brief-section-head">
            <span className="brief-sec-label">What</span>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {!editingWhat && (
                <button className="brief-edit" onClick={startEditWhat}>
                  Edit
                </button>
              )}
              {editingWhat && (
                <>
                  <button
                    className="brief-edit"
                    style={{ color: "var(--navy)" }}
                    onClick={saveWhat}
                  >
                    Save
                  </button>
                  <button
                    className="brief-edit"
                    style={{ color: "var(--text-light)" }}
                    onClick={cancelWhat}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
          {!editingWhat ? (
            <div className="brief-grid">
              <div className="brief-field">
                <div className="brief-field-label">Deal type</div>
                <div className="brief-field-value">
                  {dealBrief.what.dealType}
                </div>
              </div>
              <div className="brief-field">
                <div className="brief-field-label">Research area</div>
                <div className="brief-field-value">
                  {dealBrief.what.researchArea}
                </div>
              </div>
              <div className="brief-field">
                <div className="brief-field-label">IP status</div>
                <div className="brief-field-value">
                  {dealBrief.what.ipStatus}
                </div>
              </div>
              <div className="brief-field">
                <div className="brief-field-label">Publication status</div>
                <div
                  className={`brief-field-value${
                    publicationIsAlert ? " alert" : ""
                  }`}
                >
                  {publication}
                </div>
              </div>
            </div>
          ) : (
            <div className="brief-grid">
              <div className="brief-field">
                <div className="brief-field-label">Deal type</div>
                <input
                  className="f-input"
                  value={draftWhat.dealType}
                  onChange={(e) =>
                    setDraftWhat({ ...draftWhat, dealType: e.target.value })
                  }
                  style={{ marginBottom: 0, fontSize: 14, padding: "8px 12px" }}
                />
              </div>
              <div className="brief-field">
                <div className="brief-field-label">Research area</div>
                <input
                  className="f-input"
                  value={draftWhat.researchArea}
                  onChange={(e) =>
                    setDraftWhat({ ...draftWhat, researchArea: e.target.value })
                  }
                  style={{ marginBottom: 0, fontSize: 14, padding: "8px 12px" }}
                />
              </div>
              <div className="brief-field">
                <div className="brief-field-label">IP status</div>
                <input
                  className="f-input"
                  value={draftWhat.ipStatus}
                  onChange={(e) =>
                    setDraftWhat({ ...draftWhat, ipStatus: e.target.value })
                  }
                  style={{ marginBottom: 0, fontSize: 14, padding: "8px 12px" }}
                />
              </div>
              <div className="brief-field">
                <div className="brief-field-label">Publication status</div>
                <input
                  className="f-input"
                  value={draftWhat.publicationStatus}
                  onChange={(e) =>
                    setDraftWhat({
                      ...draftWhat,
                      publicationStatus: e.target.value,
                    })
                  }
                  style={{ marginBottom: 0, fontSize: 14, padding: "8px 12px" }}
                />
              </div>
            </div>
          )}
        </div>

        {/* GOALS */}
        <div className="brief-section">
          <div className="brief-section-head">
            <span className="brief-sec-label">Goals</span>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {!editingGoals && (
                <button className="brief-edit" onClick={startEditGoals}>
                  Edit
                </button>
              )}
              {editingGoals && (
                <>
                  <button
                    className="brief-edit"
                    style={{ color: "var(--navy)" }}
                    onClick={saveGoals}
                  >
                    Save
                  </button>
                  <button
                    className="brief-edit"
                    style={{ color: "var(--text-light)" }}
                    onClick={cancelGoals}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
          {!editingGoals ? (
            <div className="brief-goal-grid">
              <div className="brief-goal-item">
                <div className="brief-goal-who">Researcher</div>
                <div className="brief-goal-txt">
                  {dealBrief.goals.researcher}
                </div>
              </div>
              <div className="brief-goal-item">
                <div className="brief-goal-who">Business</div>
                <div className="brief-goal-txt">
                  {dealBrief.goals.business}
                </div>
              </div>
              <div className="brief-goal-item">
                <div className="brief-goal-who">Timeline target</div>
                <div className="brief-goal-txt">
                  {dealBrief.goals.timeline}
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              <div>
                <div
                  className="brief-field-label"
                  style={{
                    fontSize: 12,
                    color: "var(--text-light)",
                    marginBottom: 4,
                  }}
                >
                  Researcher goal
                </div>
                <textarea
                  className="a-textarea"
                  value={draftGoals.researcher}
                  onChange={(e) =>
                    setDraftGoals({
                      ...draftGoals,
                      researcher: e.target.value,
                    })
                  }
                  style={{
                    minHeight: 60,
                    fontSize: 14,
                    padding: "10px 12px",
                    marginBottom: 0,
                  }}
                />
              </div>
              <div>
                <div
                  className="brief-field-label"
                  style={{
                    fontSize: 12,
                    color: "var(--text-light)",
                    marginBottom: 4,
                  }}
                >
                  Business goal
                </div>
                <textarea
                  className="a-textarea"
                  value={draftGoals.business}
                  onChange={(e) =>
                    setDraftGoals({
                      ...draftGoals,
                      business: e.target.value,
                    })
                  }
                  style={{
                    minHeight: 60,
                    fontSize: 14,
                    padding: "10px 12px",
                    marginBottom: 0,
                  }}
                />
              </div>
              <div>
                <div
                  className="brief-field-label"
                  style={{
                    fontSize: 12,
                    color: "var(--text-light)",
                    marginBottom: 4,
                  }}
                >
                  Timeline target
                </div>
                <input
                  className="f-input"
                  value={draftGoals.timeline}
                  onChange={(e) =>
                    setDraftGoals({
                      ...draftGoals,
                      timeline: e.target.value,
                    })
                  }
                  style={{ marginBottom: 0, fontSize: 14, padding: "8px 12px" }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Living document */}
        <div className="brief-doc">
          <div className="brief-doc-head">
            <div>
              <div className="brief-doc-title">Deal Brief</div>
              <div
                className="brief-doc-sub"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: "var(--teal)",
                  fontSize: "12.5px",
                }}
              >
                <span className="ms" style={{ fontSize: 12 }}>
                  auto_awesome
                </span>
                CollabPilot &middot; AI-maintained &middot; updates at every
                milestone
              </div>
            </div>
          </div>

          <div className="brief-ai-block">
            <div className="brief-ai-label">
              <span className="ms" style={{ fontSize: 12 }}>
                auto_awesome
              </span>
              CollabPilot summary
            </div>
            <ul className="brief-ai-list">
              {dealBrief.aiSummary.map((item, i) => (
                <li key={i}>
                  <span className="brief-ai-cat">{item.category}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 11,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "var(--text-light)",
              marginBottom: 16,
            }}
          >
            Deal log
          </div>
          <div className="brief-log">
            {dealBrief.log.map((entry, i) => {
              const pending = entry.state === "pending";
              return (
                <div key={i} className="brief-log-entry">
                  <div className="brief-log-spine">
                    <div
                      className="brief-log-dot"
                      style={
                        pending
                          ? {
                              background: "var(--border)",
                              boxShadow: "0 0 0 1.5px var(--border)",
                            }
                          : undefined
                      }
                    ></div>
                    <div className="brief-log-line"></div>
                  </div>
                  <div className="brief-log-body">
                    <div
                      className="brief-log-event"
                      style={
                        pending
                          ? {
                              color: "var(--text-light)",
                              fontWeight: 400,
                            }
                          : undefined
                      }
                    >
                      {entry.event}
                    </div>
                    <div className="brief-log-meta">{entry.meta}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </WorkspaceShell>
  );
}
