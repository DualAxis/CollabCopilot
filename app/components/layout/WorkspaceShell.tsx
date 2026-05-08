"use client";

import type { ReactNode } from "react";

type OverviewActive = "deals" | "knowledge";
type InDealActive =
  | "deal-brief"
  | "roadmap"
  | "checklists"
  | "documents"
  | "knowledge";

export type ShellMode =
  | { kind: "overview"; active: OverviewActive }
  | {
      kind: "inDeal";
      active: InDealActive;
      dealName: string;
      dealSubLabel: string;
    };

type Props = {
  children: ReactNode;
  mode: ShellMode;
  userName?: string;
  userInstitution?: string;
  onLogoClick?: () => void;
  onOpenProfile?: () => void;
  onNavDeals?: () => void;
  onNavDealBrief?: () => void;
  onNavRoadmap?: () => void;
  onNavChecklists?: () => void;
  onNavDocuments?: () => void;
  onNavKnowledge?: () => void;
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

type ItemProps = {
  active?: boolean;
  className?: string;
  icon: string;
  label: string;
  onClick?: () => void;
};

function NavItem({ active, className, icon, label, onClick }: ItemProps) {
  const cn = `nav-item${className ? " " + className : ""}${
    active ? " active" : ""
  }`;
  if (onClick) {
    return (
      <button
        type="button"
        className={cn}
        onClick={onClick}
        style={{
          border: "none",
          background: "transparent",
          width: "auto",
          textAlign: "left",
          font: "inherit",
          cursor: "pointer",
        }}
      >
        <span className="nav-icon">
          <span className="ms">{icon}</span>
        </span>
        {label}
      </button>
    );
  }
  return (
    <div
      className={cn}
      title="Coming soon"
      style={{ cursor: "default" }}
    >
      <span className="nav-icon">
        <span className="ms">{icon}</span>
      </span>
      {label}
    </div>
  );
}

export default function WorkspaceShell({
  children,
  mode,
  userName = "Demo user",
  userInstitution = "Warsaw University of Technology",
  onLogoClick,
  onOpenProfile,
  onNavDeals,
  onNavDealBrief,
  onNavRoadmap,
  onNavChecklists,
  onNavDocuments,
  onNavKnowledge,
}: Props) {
  return (
    <div className="screen workspace active">
      <div className="app-shell">
        <aside className="sidebar">
          <div
            className="sidebar-logo"
            onClick={onLogoClick}
            style={onLogoClick ? { cursor: "pointer" } : undefined}
          >
            <div className="logo-dot"></div>
            <div className="sidebar-brand">
              <span className="sidebar-brand-name">CollabPilot</span>
              <span className="sidebar-brand-sub">Navigator</span>
            </div>
          </div>
          <nav className="sidebar-nav">
            {mode.kind === "overview" ? (
              <>
                <div className="nav-sec">Workspace</div>
                <NavItem
                  className="nav-deals"
                  icon="work"
                  label="My Deals"
                  active={mode.active === "deals"}
                  onClick={onNavDeals}
                />
                <div className="nav-divider"></div>
                <div className="nav-sec">Resources</div>
                <NavItem
                  icon="menu_book"
                  label="Knowledge Library"
                  active={mode.active === "knowledge"}
                  onClick={onNavKnowledge}
                />
                <div className="nav-divider"></div>
              </>
            ) : (
              <>
                <div className="nav-sec">Workspace</div>
                <NavItem
                  className="nav-back-link"
                  icon="arrow_back"
                  label="My Deals"
                  onClick={onNavDeals}
                />
                <div className="nav-divider"></div>
                <div className="deal-context-section">
                  <div className="deal-context-dot"></div>
                  <div className="deal-context-info">
                    <div className="deal-context-name">{mode.dealName}</div>
                    <div className="deal-context-sub">{mode.dealSubLabel}</div>
                  </div>
                </div>
                <NavItem
                  className="sub"
                  icon="description"
                  label="Deal Brief"
                  active={mode.active === "deal-brief"}
                  onClick={onNavDealBrief}
                />
                <NavItem
                  className="sub"
                  icon="route"
                  label="My Roadmap"
                  active={mode.active === "roadmap"}
                  onClick={onNavRoadmap}
                />
                <NavItem
                  className="sub"
                  icon="checklist"
                  label="Checklists"
                  active={mode.active === "checklists"}
                  onClick={onNavChecklists}
                />
                <NavItem
                  className="sub"
                  icon="folder_open"
                  label="My Documents"
                  active={mode.active === "documents"}
                  onClick={onNavDocuments}
                />
                <div className="nav-divider"></div>
                <div className="nav-sec">Resources</div>
                <NavItem
                  icon="menu_book"
                  label="Knowledge Library"
                  active={mode.active === "knowledge"}
                  onClick={onNavKnowledge}
                />
                <div className="nav-divider"></div>
              </>
            )}
          </nav>
          <div
            className="sidebar-footer"
            onClick={onOpenProfile}
            style={onOpenProfile ? undefined : { cursor: "default" }}
          >
            <div className="avatar">{initials(userName)}</div>
            <div className="footer-user-info">
              <div className="avatar-name">{userName}</div>
              <div className="avatar-role">{userInstitution}</div>
            </div>
            <span className="ms footer-chevron">chevron_right</span>
          </div>
        </aside>
        <main className="main-area">
          <div className="main-inner">{children}</div>
        </main>
      </div>
    </div>
  );
}
