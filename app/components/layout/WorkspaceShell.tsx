"use client";

import type { ReactNode } from "react";

type NavId = "deals" | "roadmap" | "documents" | "checklists" | "knowledge";

type Props = {
  children: ReactNode;
  active?: NavId;
  userName?: string;
  userRole?: string;
  onSignOut: () => void;
  onNavDeals?: () => void;
  onNavRoadmap?: () => void;
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((s) => s[0]!)
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function WorkspaceShell({
  children,
  active = "deals",
  userName = "Demo user",
  userRole = "Researcher",
  onSignOut,
  onNavDeals,
  onNavRoadmap,
}: Props) {
  return (
    <div className="screen workspace active">
      <div className="app-shell">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-dot"></div>
            <span className="logo-text">CollabPilot</span>
          </div>
          <nav className="sidebar-nav">
            <div className="nav-sec">Workspace</div>
            <button
              type="button"
              className={`nav-item${active === "deals" ? " active" : ""}`}
              onClick={onNavDeals}
              style={{
                border: "none",
                background: "transparent",
                width: "auto",
                textAlign: "left",
                font: "inherit",
                cursor: onNavDeals ? "pointer" : "default",
              }}
            >
              <span className="nav-icon">
                <span className="ms">work</span>
              </span>
              My Deals
            </button>
            <button
              type="button"
              className={`nav-item${active === "roadmap" ? " active" : ""}`}
              onClick={onNavRoadmap}
              style={{
                border: "none",
                background: "transparent",
                width: "auto",
                textAlign: "left",
                font: "inherit",
                cursor: onNavRoadmap ? "pointer" : "default",
              }}
            >
              <span className="nav-icon">
                <span className="ms">timeline</span>
              </span>
              My Roadmap
            </button>
            <div
              className={`nav-item${active === "documents" ? " active" : ""}`}
            >
              <span className="nav-icon">
                <span className="ms">description</span>
              </span>
              My Documents
            </div>
            <div
              className={`nav-item${active === "checklists" ? " active" : ""}`}
            >
              <span className="nav-icon">
                <span className="ms">checklist</span>
              </span>
              Checklists
            </div>
            <div className="nav-sec">Resources</div>
            <div
              className={`nav-item${active === "knowledge" ? " active" : ""}`}
            >
              <span className="nav-icon">
                <span className="ms">menu_book</span>
              </span>
              Knowledge Library
            </div>
          </nav>
          <div className="sidebar-footer">
            <div className="avatar">{initials(userName)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="avatar-name">{userName}</div>
              <div className="avatar-role">{userRole}</div>
            </div>
            <button
              className="nav-link"
              onClick={onSignOut}
              aria-label="Sign out"
              title="Sign out"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
              }}
            >
              <span className="ms ms-sm">logout</span>
            </button>
          </div>
        </aside>
        <main className="main-area">
          <div className="main-inner">{children}</div>
        </main>
      </div>
    </div>
  );
}
