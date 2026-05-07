"use client";

import { useEffect, useState } from "react";
import type { AssessmentState } from "../../lib/assessment";
import { type AssessmentResults, MOCK_RESULTS } from "../../lib/results";

type Props = {
  state: AssessmentState;
  onComplete: (results: AssessmentResults) => void;
};

type Status = "loading" | "error";

export default function ProcessingScreen({ state, onComplete }: Props) {
  const [status, setStatus] = useState<Status>("loading");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [attempt, setAttempt] = useState<number>(0);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setErrorMsg("");

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
        onComplete(data.results);
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
  }, [state, onComplete, attempt]);

  const useSampleData = () => onComplete(MOCK_RESULTS);
  const retry = () => setAttempt((n) => n + 1);

  return (
    <div
      id="s-processing"
      className="screen active"
      style={{ background: "var(--navy)" }}
    >
      <div className="proc-bg"></div>
      <div className="proc-inner">
        {status === "loading" && (
          <>
            <div className="proc-spinner"></div>
            <div className="proc-lbl">Working on it</div>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "28px",
                color: "#fff",
                textAlign: "center",
                fontWeight: 400,
                marginBottom: "10px",
              }}
            >
              Analysing your situation&hellip;
            </h2>
            <p
              style={{
                fontSize: "13.5px",
                color: "rgba(255,255,255,.5)",
                textAlign: "center",
                lineHeight: 1.6,
                maxWidth: "420px",
              }}
            >
              Pulling the right compliance rules and drafting your roadmap based
              on the answers you provided.
            </p>
          </>
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
