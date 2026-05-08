"use client";

import { useEffect, useState } from "react";
import type { AssessmentState } from "../../lib/assessment";
import { type AssessmentResults, MOCK_RESULTS } from "../../lib/results";

type Props = {
  state: AssessmentState;
  onComplete: (results: AssessmentResults) => void;
};

type Status = "loading" | "error";

const REASONING_ROWS: { main: string; sub: string }[] = [
  {
    main: "Mapping your answers to compliance rules",
    sub: "Cross-checking with UIDP Contract Accords and your institutional policy",
  },
  {
    main: "Checking publication and IP conflicts",
    sub: "Reviewing patent status against publication timing",
  },
  {
    main: "Reviewing TTO involvement and disclosure obligations",
    sub: "Determining required approvals before any technical data is shared",
  },
  {
    main: "Surfacing safe actions you can take today",
    sub: "Identifying steps that don\u2019t require formal terms or signed agreements",
  },
  {
    main: "Generating your 6-stage roadmap",
    sub: "Preparing compliance report, safe actions, and personalised roadmap preview",
  },
];

const REVEAL_INTERVAL_MS = 700;

export default function ProcessingScreen({ state, onComplete }: Props) {
  const [status, setStatus] = useState<Status>("loading");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [attempt, setAttempt] = useState<number>(0);
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [pendingResults, setPendingResults] =
    useState<AssessmentResults | null>(null);

  useEffect(() => {
    if (status !== "loading") return;
    setRevealedCount(0);
    let cancelled = false;
    const interval = setInterval(() => {
      if (cancelled) return;
      setRevealedCount((c) => {
        if (c >= REASONING_ROWS.length) {
          clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, REVEAL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [status, attempt]);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setErrorMsg("");
    setPendingResults(null);

    (async () => {
      try {
        const res = await fetch("/api/analyse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state }),
        });
        if (!res.ok) {
          const data = await res
            .json()
            .catch(() => ({} as { error?: string; code?: string }));
          if (res.status === 429 || data?.code === "rate_limit") {
            throw new Error(
              data?.error ||
                "Anthropic rate limit reached. Please wait ~60 seconds and try again."
            );
          }
          throw new Error(data?.error || `Request failed (${res.status})`);
        }
        const data = (await res.json()) as { results: AssessmentResults };
        if (cancelled) return;
        setPendingResults(data.results);
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : "Something went wrong";
        setErrorMsg(msg);
        setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [state, attempt]);

  const useSampleData = () => onComplete(MOCK_RESULTS);
  const retry = () => setAttempt((n) => n + 1);

  const ready =
    pendingResults !== null && revealedCount >= REASONING_ROWS.length;

  return (
    <div
      id="s-processing"
      className="screen active"
      style={{ background: "var(--navy)" }}
    >
      <div className="proc-bg"></div>
      <div className="proc-inner">
        {status === "loading" && (
          <div className="proc-card">
            <div className="proc-icon-wrap">
              <span className="ms ms-lg" style={{ color: "#fff" }}>
                explore
              </span>
            </div>
            <h2 className="proc-card-h">Analysing your situation</h2>
            <p className="proc-card-sub">
              Cross-referencing your answers against compliance rules and
              best-practice benchmarks{"\u2026"}
            </p>
            <div className="proc-card-steps">
              {REASONING_ROWS.map((row, i) => {
                const isVis = i < revealedCount;
                return (
                  <div
                    key={i}
                    className={`proc-item${isVis ? " vis" : ""}`}
                  >
                    <div
                      className={`proc-item-icon${isVis ? " done" : ""}`}
                    >
                      {isVis ? (
                        <span className="ms" style={{ fontSize: 14 }}>
                          check
                        </span>
                      ) : (
                        i + 1
                      )}
                    </div>
                    <div className="proc-item-body">
                      <div className="proc-item-main">{row.main}</div>
                      <div className="proc-item-sub">{row.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={`proc-btn-wrap${ready ? " visible" : ""}`}>
              <button
                className="btn-primary"
                onClick={() =>
                  pendingResults && onComplete(pendingResults)
                }
                disabled={!ready}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: 15,
                  padding: "14px 24px",
                }}
              >
                See my results {"\u2192"}
              </button>
            </div>
          </div>
        )}

        {status === "error" && (
          <>
            <div className="proc-lbl" style={{ color: "#ffb4a8" }}>
              Analysis failed
            </div>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "26px",
                color: "#fff",
                textAlign: "center",
                fontWeight: 400,
                marginBottom: "10px",
              }}
            >
              We could not reach the AI service
            </h2>
            <p
              style={{
                fontSize: "13.5px",
                color: "rgba(255,255,255,.6)",
                textAlign: "center",
                lineHeight: 1.6,
                maxWidth: "440px",
                marginBottom: "20px",
              }}
            >
              {errorMsg || "An unexpected error occurred."}
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                className="btn-primary"
                onClick={retry}
                style={{ fontSize: "13px", padding: "10px 18px" }}
              >
                Try again
              </button>
              <button
                className="btn-secondary"
                onClick={useSampleData}
                style={{
                  fontSize: "13px",
                  padding: "10px 18px",
                  background: "transparent",
                  color: "#fff",
                  borderColor: "rgba(255,255,255,.3)",
                }}
              >
                Use sample data
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
