"use client";

import { useState, useCallback, useEffect } from "react";
import {
  type ScreenId,
  type AssessmentState,
  INITIAL_ASSESSMENT,
  RADIO_QUESTIONS,
} from "./lib/assessment";
import { type AssessmentResults, MOCK_RESULTS } from "./lib/results";
import LandingScreen from "./components/screens/LandingScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import RadioQuestionScreen from "./components/screens/RadioQuestionScreen";
import ProcessingScreen from "./components/screens/ProcessingScreen";
import ResultsScreen from "./components/screens/ResultsScreen";
import LoginScreen from "./components/screens/LoginScreen";
import AccountCreatedScreen from "./components/screens/AccountCreatedScreen";
import DashboardPlaceholderScreen from "./components/screens/DashboardPlaceholderScreen";

type LoginMode = "create" | "signin";

export default function Home() {
  const [screen, setScreen] = useState<ScreenId>("s-landing");
  const [assessment, setAssessment] = useState<AssessmentState>(INITIAL_ASSESSMENT);
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [loginMode, setLoginMode] = useState<LoginMode>("create");
  const [loginError, setLoginError] = useState<string | null>(null);

  const radioConfig = RADIO_QUESTIONS.find((q) => q.id === screen);

  const handleAnalysisComplete = useCallback((r: AssessmentResults) => {
    setResults(r);
    setScreen("s-results");
  }, []);

  const handleRestart = () => {
    setAssessment(INITIAL_ASSESSMENT);
    setResults(null);
    setScreen("s-landing");
  };

  const goToLogin = (mode: LoginMode) => {
    setLoginMode(mode);
    setLoginError(null);
    setScreen("s-login");
  };

  // Read auth status from the URL once on mount and route accordingly. We
  // strip the query immediately so a refresh doesn't re-trigger the same
  // routing decision and so OAuth-related params never linger in history.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const signup = params.get("signup");
    const signin = params.get("signin");
    const auth = params.get("auth");
    const message = params.get("message");

    if (signup === "success") {
      setScreen("s-account-created");
      window.history.replaceState({}, "", "/");
      return;
    }
    if (signin === "success") {
      setScreen("s-dashboard-placeholder");
      window.history.replaceState({}, "", "/");
      return;
    }
    if (auth === "error") {
      setLoginError(message || "Authentication failed. Please try again.");
      setLoginMode("create");
      setScreen("s-login");
      window.history.replaceState({}, "", "/");
    }
  }, []);

  return (
    <>
      {screen === "s-landing" && (
        <LandingScreen
          onStartAssessment={() => setScreen("s-profile")}
          onSignIn={() => goToLogin("signin")}
        />
      )}
      {screen === "s-profile" && (
        <ProfileScreen
          state={assessment}
          setState={setAssessment}
          onContinue={() => setScreen("s-q0")}
          onBack={() => setScreen("s-landing")}
        />
      )}
      {radioConfig && (
        <RadioQuestionScreen
          key={radioConfig.id}
          config={radioConfig}
          state={assessment}
          setState={setAssessment}
          onContinue={() => setScreen(radioConfig.next)}
          onBack={() => setScreen(radioConfig.prev)}
        />
      )}
      {screen === "s-processing" && (
        <ProcessingScreen
          state={assessment}
          onComplete={handleAnalysisComplete}
        />
      )}
      {screen === "s-results" && (
        <ResultsScreen
          state={assessment}
          results={results ?? MOCK_RESULTS}
          onRestart={handleRestart}
          onCreateAccount={() => goToLogin("create")}
          onSignIn={() => goToLogin("signin")}
        />
      )}
      {screen === "s-login" && (
        <LoginScreen
          state={assessment}
          onBack={() => setScreen("s-landing")}
          initialMode={loginMode}
          initialError={loginError}
        />
      )}
      {screen === "s-account-created" && (
        <AccountCreatedScreen
          state={assessment}
          onGoToDashboard={() => setScreen("s-dashboard-placeholder")}
        />
      )}
      {screen === "s-dashboard-placeholder" && (
        <DashboardPlaceholderScreen
          onSignOut={() => setScreen("s-landing")}
        />
      )}
    </>
  );
}
