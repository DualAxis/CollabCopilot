"use client";

import { useEffect, useState } from "react";
import { getBrowserClient } from "../../lib/supabase-browser";
import type { AssessmentState } from "../../lib/assessment";

type Props = {
  state: AssessmentState;
  onGoToDashboard: () => void;
};

export default function AccountCreatedScreen({ state, onGoToDashboard }: Props) {
  const [displayName, setDisplayName] = useState<string>(
    state.profile.name || "there"
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const supabase = getBrowserClient();
        const { data } = await supabase.auth.getUser();
        if (cancelled) return;
        const meta = (data.user?.user_metadata ?? {}) as {
          full_name?: string;
          name?: string;
        };
        const name = meta.full_name || meta.name || state.profile.name;
        if (name) setDisplayName(name);
      } catch {
        // Fall back to whatever's already in state.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [state.profile.name]);

  return (
    <div
      id="s-account-created"
      className="screen active"
      style={{ background: "var(--off-white)" }}
    >
      <nav className="top-nav">
        <div className="nav-logo" style={{ cursor: "default" }}>
          <div className="logo-dot"></div>
          <span className="logo-text">CollabPilot</span>
        </div>
      </nav>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          textAlign: "center",
          maxWidth: "480px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "var(--sage-faint)",
            border: "2px solid var(--sage)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            margin: "0 auto 20px",
            animation: "popIn .4s both",
          }}
        >
          ✓
        </div>
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "26px",
            color: "var(--navy)",
            marginBottom: "8px",
            animation: "fadeUp .4s .1s both",
          }}
        >
          Account created successfully
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "var(--text-mid)",
            lineHeight: 1.6,
            marginBottom: "28px",
            animation: "fadeUp .4s .2s both",
          }}
        >
          Welcome to CollabPilot, <strong>{displayName}</strong>. Your account is
          active and ready.
        </p>
        <div
          style={{
            background: "var(--white)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "18px 20px",
            width: "100%",
            textAlign: "left",
            marginBottom: "24px",
            animation: "fadeUp .4s .3s both",
          }}
        >
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--teal)",
              marginBottom: "10px",
            }}
          >
            Your account includes
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                color: "var(--text-mid)",
              }}
            >
              <span style={{ color: "var(--teal)" }}>✓</span>Stage 1 compliance
              checklist for any deal
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                color: "var(--text-mid)",
              }}
            >
              <span style={{ color: "var(--teal)" }}>✓</span>6-stage roadmap
              overview for your deal type
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                color: "var(--text-mid)",
              }}
            >
              <span style={{ color: "var(--teal)" }}>✓</span>1 free document
              template
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                color: "var(--text-mid)",
              }}
            >
              <span style={{ color: "var(--teal)" }}>✓</span>Knowledge Library —
              free sections
            </div>
          </div>
        </div>
        <button
          className="btn-primary"
          onClick={onGoToDashboard}
          style={{
            fontSize: "15px",
            padding: "14px 32px",
            animation: "fadeUp .4s .4s both",
          }}
        >
          Go to my dashboard →
        </button>
      </div>
    </div>
  );
}
