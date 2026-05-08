"use client";

import { useState } from "react";
import WorkspaceShell from "../layout/WorkspaceShell";

type Mode = "global" | "deal";

type Resource = {
  url: string;
  source: string;
  title: string;
  desc: string;
  tag: string;
  metaSuffix: string;
};

const KL_RESOURCES: Resource[] = [
  {
    url: "https://tlo.mit.edu/researchers-mit-community",
    source: "MIT Technology Licensing Office",
    title: "Researchers \u0026 MIT Community \u2014 IP Protection",
    desc: "Resources and guidance on IP disclosure, licensing, and technology transfer for researchers at any university",
    tag: "TTO not yet briefed",
    metaSuffix: "MIT Technology Licensing Office \u00b7 TTO not yet briefed",
  },
  {
    url: "https://uidp.org/publication/contract-accords-2020/",
    source: "UIDP \u2014 University-Industry Demonstration Partnership",
    title: "Contract Accords",
    desc: "Best practices for university-industry research agreements, including Article 4.2 on publication and IP conflict",
    tag: "Publication conflict \u00b7 CDA required",
    metaSuffix: "UIDP \u00b7 Publication conflict \u00b7 CDA required",
  },
  {
    url: "https://www.gov.uk/guidance/university-and-business-collaboration-agreements-lambert-toolkit",
    source: "Lambert Toolkit \u2014 UK Government",
    title: "Model Agreements for University-Business Collaboration",
    desc: "Decision tree and model contracts for IP licensing, sponsored research, and joint projects",
    tag: "IP Licensing deal type",
    metaSuffix: "Lambert Toolkit \u2014 UK Gov \u00b7 IP Licensing deal type",
  },
  {
    url: "https://autm.net/about-tech-transfer/principles-and-guidelines",
    source: "AUTM \u2014 Association of University Technology Managers",
    title: "Technology Transfer Guidelines \u0026 Principles",
    desc: "Comprehensive principles and guidelines for the technology transfer process, covering IP ownership, licensing, and deal structuring",
    tag: "Exclusivity request \u00b7 First-time deal",
    metaSuffix: "AUTM \u00b7 Exclusivity request \u00b7 First-time deal",
  },
  {
    url: "https://intellectual-property-helpdesk.ec.europa.eu/regional-helpdesks/european-ip-helpdesk_en",
    source: "EU IPR Helpdesk",
    title: "IP Management in Research Collaborations",
    desc: "EU-funded guidance on managing IP in publicly funded research, including CDA requirements and TTO roles",
    tag: "EU-based research institution",
    metaSuffix: "EU IPR Helpdesk \u00b7 EU-based research institution",
  },
  {
    url: "https://www.epo.org/en/learning",
    source: "European Patent Office",
    title: "European Patent Academy",
    desc: "EPO learning hub for universities and TTOs \u2014 patent filing, IP management, technology transfer, and learning paths for researchers",
    tag: "Patent application filed",
    metaSuffix: "European Patent Office \u00b7 Patent application filed",
  },
];

type Props = {
  mode: Mode;
  onLogoClick: () => void;
  onOpenProfile: () => void;
  onNavDeals: () => void;
  onNavDealBrief?: () => void;
  onNavRoadmap?: () => void;
  onNavChecklists?: () => void;
  onNavDocuments?: () => void;
  userName?: string;
  userInstitution?: string;
};

export default function KnowledgeLibraryScreen({
  mode,
  onLogoClick,
  onOpenProfile,
  onNavDeals,
  onNavDealBrief,
  onNavRoadmap,
  onNavChecklists,
  onNavDocuments,
  userName,
  userInstitution,
}: Props) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const isDeal = mode === "deal";

  const shellMode = isDeal
    ? ({
        kind: "inDeal",
        active: "knowledge",
        dealName: "Nexar Robotics",
        dealSubLabel: "IP Licensing \u00b7 Stage 1",
      } as const)
    : ({ kind: "overview", active: "knowledge" } as const);

  const subLine = isDeal
    ? "6 resources matched to this deal \u00b7 IP Licensing \u00b7 Stage 1 \u00b7 Warsaw University of Technology"
    : "6 resources matched to your deal \u00b7 IP Licensing \u00b7 Stage 1 \u00b7 WUT";

  const gridBtnStyle: React.CSSProperties =
    view === "grid"
      ? {
          width: 34,
          height: 34,
          borderRadius: 8,
          border: "1px solid var(--teal)",
          background: "var(--teal)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all .2s",
        }
      : {
          width: 34,
          height: 34,
          borderRadius: 8,
          border: "1px solid var(--border)",
          background: "var(--white)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all .2s",
        };

  const listBtnStyle: React.CSSProperties =
    view === "list"
      ? {
          width: 34,
          height: 34,
          borderRadius: 8,
          border: "1px solid var(--teal)",
          background: "var(--teal)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all .2s",
        }
      : {
          width: 34,
          height: 34,
          borderRadius: 8,
          border: "1px solid var(--border)",
          background: "var(--white)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all .2s",
        };

  const gridIconColor = view === "grid" ? "#fff" : "var(--text-light)";
  const listIconColor = view === "list" ? "#fff" : "var(--text-light)";

  return (
    <WorkspaceShell
      mode={shellMode}
      onLogoClick={onLogoClick}
      onOpenProfile={onOpenProfile}
      onNavDeals={onNavDeals}
      onNavDealBrief={onNavDealBrief}
      onNavRoadmap={onNavRoadmap}
      onNavChecklists={onNavChecklists}
      onNavDocuments={onNavDocuments}
      userName={userName}
      userInstitution={userInstitution}
    >
      <div className="doc-inner" style={{ maxWidth: 960 }}>
        {isDeal && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 24,
              fontSize: 13,
              color: "var(--text-light)",
            }}
          >
            <span
              onClick={onNavDealBrief}
              onMouseOver={(e) =>
                ((e.currentTarget as HTMLSpanElement).style.color =
                  "var(--teal)")
              }
              onMouseOut={(e) =>
                ((e.currentTarget as HTMLSpanElement).style.color =
                  "var(--text-light)")
              }
              style={{
                cursor: "pointer",
                color: "var(--text-light)",
                transition: "color .15s",
              }}
            >
              Nexar Robotics
            </span>
            <span style={{ color: "var(--border)" }}>{"\u203a"}</span>
            <span style={{ color: "var(--text-dark)", fontWeight: 500 }}>
              Resources
            </span>
          </div>
        )}

        <div
          style={{
            marginBottom: isDeal ? 24 : 28,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div>
            {isDeal && (
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 12,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "var(--teal)",
                  marginBottom: 6,
                }}
              >
                {"Resources \u00b7 Nexar Robotics"}
              </div>
            )}
            <h1
              style={{
                fontFamily: "'DM Serif Display',serif",
                fontSize: 28,
                fontWeight: 400,
                color: "var(--navy)",
                marginBottom: 6,
              }}
            >
              Knowledge Library
            </h1>
            <p
              style={{
                fontSize: 13.5,
                color: "var(--text-light)",
                lineHeight: 1.55,
              }}
            >
              {subLine}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexShrink: 0,
            }}
          >
            <button
              type="button"
              onClick={() => setView("grid")}
              style={gridBtnStyle}
              aria-label="Grid view"
            >
              <span
                className="ms"
                style={{ fontSize: 16, color: gridIconColor }}
              >
                grid_view
              </span>
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              style={listBtnStyle}
              aria-label="List view"
            >
              <span
                className="ms"
                style={{ fontSize: 16, color: listIconColor }}
              >
                view_list
              </span>
            </button>
          </div>
        </div>

        {isDeal ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "'DM Mono',monospace",
              fontSize: 12,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "var(--teal)",
              paddingBottom: 10,
              borderBottom: "1px solid var(--border)",
              marginBottom: 20,
            }}
          >
            <span className="ms" style={{ fontSize: 14 }}>
              auto_awesome
            </span>
            AI-matched for this deal
          </div>
        ) : (
          <div
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 12,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "var(--teal)",
              paddingBottom: 10,
              borderBottom: "1px solid var(--border)",
              marginBottom: 20,
            }}
          >
            Matched for this deal
          </div>
        )}

        {view === "grid" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {KL_RESOURCES.map((r) => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <div className="kl-card">
                  <span className="ms kl-ext">open_in_new</span>
                  <div className="kl-source">{r.source}</div>
                  <div className="kl-title">{r.title}</div>
                  <div className="kl-desc">{r.desc}</div>
                  <div className="kl-tag">{r.tag}</div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="doc-list">
            {KL_RESOURCES.map((r) => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <div className="doc-row">
                  <div className="doc-ic tmpl">
                    <span
                      className="ms"
                      style={{ fontSize: 18, color: "var(--teal)" }}
                    >
                      menu_book
                    </span>
                  </div>
                  <div className="doc-body">
                    <div className="doc-name">{r.title}</div>
                    <div className="doc-meta">{r.metaSuffix}</div>
                  </div>
                  <div className="doc-right">
                    <button
                      type="button"
                      className="doc-action"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      Open{" "}
                      <span className="ms" style={{ fontSize: 14 }}>
                        open_in_new
                      </span>
                    </button>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </WorkspaceShell>
  );
}
