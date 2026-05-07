"use client";

import { useEffect } from "react";

type Props = {
  onComplete: () => void;
};

export default function ProcessingScreen({ onComplete }: Props) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2500);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div
      id="s-processing"
      className="screen active"
      style={{ background: "var(--navy)" }}
    >
      <div className="proc-bg"></div>
      <div className="proc-inner">
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
          Analysing your situation…
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
          Pulling the right compliance rules and drafting your roadmap based on
          the answers you provided.
        </p>
      </div>
    </div>
  );
}
