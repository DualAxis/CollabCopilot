"use client";

import { useState } from "react";
import type { AssessmentState } from "../../lib/assessment";

type Props = {
  state: AssessmentState;
  onBack: () => void;
  onContinue: (mode: "create" | "signin") => void;
  initialMode?: "create" | "signin";
};

type Mode = "create" | "signin";

export default function LoginScreen({
  state,
  onBack,
  onContinue,
  initialMode = "create",
}: Props) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [name, setName] = useState<string>(state.profile.name);
  const [email, setEmail] = useState<string>(state.profile.email);

  const isCreate = mode === "create";

  const switchMode = (next: Mode) => {
    if (next === mode) return;
    setMode(next);
  };

  return (
    <div
      id="s-login"
      className="screen active"
      style={{ background: "var(--off-white)" }}
    >
      <nav className="top-nav">
        <div
          className="nav-logo"
          onClick={onBack}
          style={{ cursor: "pointer" }}
        >
          <div className="logo-dot"></div>
          <span className="logo-text">CollabPilot</span>
        </div>
        <div className="nav-actions">
          <button className="nav-link" onClick={onBack}>
            ← Start Assessment
          </button>
        </div>
      </nav>

      <div className="login-wrap">
        <form
          className="login-card"
          onSubmit={(e) => {
            e.preventDefault();
            onContinue(mode);
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              marginBottom: "22px",
              cursor: "pointer",
            }}
            onClick={onBack}
          >
            <div className="logo-dot"></div>
            <span className="logo-text">CollabPilot</span>
          </div>

          <div className="unlock-box">
            <div className="ul-eye">What you unlock</div>
            <div className="ul-item">
              <span className="ul-ic">✓</span>Stage 1 compliance checklist — 5
              action items, AI pre-filled
            </div>
            <div className="ul-item">
              <span className="ul-ic">✓</span>Full 6-stage deal roadmap with
              timeline estimates
            </div>
            <div className="ul-item">
              <span className="ul-ic">✓</span>AI-drafted holding reply to your
              partner
            </div>
          </div>

          <h2 className="l-h">Welcome to CollabPilot</h2>
          <p className="l-sub">
            {isCreate
              ? "Create your account to unlock your full roadmap and checklist."
              : "Sign in to continue with your roadmap."}
          </p>

          <div className="toggle-row">
            <button
              type="button"
              className={`t-btn${isCreate ? " on" : ""}`}
              onClick={() => switchMode("create")}
            >
              Create account
            </button>
            <button
              type="button"
              className={`t-btn${!isCreate ? " on" : ""}`}
              onClick={() => switchMode("signin")}
            >
              Sign in
            </button>
          </div>

          <button
            type="button"
            className="g-btn"
            onClick={() => onContinue(mode)}
          >
            <svg className="g-ic" viewBox="0 0 18 18">
              <path
                fill="#4285F4"
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
              />
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
              />
              <path
                fill="#FBBC05"
                d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
              />
              <path
                fill="#EA4335"
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"
              />
            </svg>
            <span>
              {isCreate ? "Continue with Google" : "Sign in with Google"}
            </span>
          </button>

          <div className="or-div">or</div>

          {isCreate && (
            <div id="name-field-wrap">
              <label className="f-label">Full name</label>
              <input
                className="f-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. Paulina Chen"
                autoComplete="name"
              />
            </div>
          )}

          <label className="f-label">Institutional email</label>
          <input
            className="f-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="p.chen@pw.edu.pl"
            style={{ marginBottom: "6px" }}
            autoComplete="email"
            required
          />

          <button
            type="submit"
            className="btn-primary"
            style={{
              width: "100%",
              justifyContent: "center",
              marginTop: "4px",
            }}
          >
            {isCreate ? "Create account to unlock →" : "Send sign-in link →"}
          </button>

          <div className="inst-note">
            Using CollabPilot through your institution?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Activate institutional access →
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
