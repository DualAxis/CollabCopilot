"use client";

import { useState, useCallback } from "react";
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
import EmptyDashboardScreen from "./components/screens/EmptyDashboardScreen";
import DashboardScreen from "./components/screens/DashboardScreen";

type LoginMode = "create" | "signin";

export default function Home() {
  const [screen, setScreen] = useState<ScreenId>("s-landing");
  const [assessment, setAssessment] = useState<AssessmentState>(INITIAL_ASSESSMENT);
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [loginMode, setLoginMode] = useState<LoginMode>("create");
  const [cameFromAssessment, setCameFromAssessment] = useState<boolean>(false);

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

  const goToLogin = (mode: LoginMode, fromAssessment: boolean) => {
    setLoginMode(mode);
    setCameFromAssessment(fromAssessment);
    setScreen("s-login");
  };

  const goAfterSignup = () => {
    setScreen(cameFromAssessment ? "s-dashboard" : "s-empty-dashboard");
  };

  // Demo: always 1 deal exists -> s-dashboard.
  // TODO(production): const { count } = await supabase.from('deals').select('id',{count:'exact',head:true}).eq('owner_id', userId);
  // if (count === 0) -> s-empty-dashboard; if (count === 1) -> s-deal-brief; if (count > 1) -> s-dashboard.
  const goToDeals = () => setScreen("s-dashboard");

  return (
    <>
      {screen === "s-landing" && (
        <LandingScreen
          onStartAssessment={() => setScreen("s-profile")}
          onSignIn={() => goToLogin("signin", false)}
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
          onCreateAccount={() => goToLogin("create", true)}
          onSignIn={() => goToLogin("signin", true)}
        />
      )}
      {screen === "s-login" && (
        <LoginScreen
          state={assessment}
          onBack={() => setScreen("s-landing")}
          initialMode={loginMode}
          onContinue={(mode) => {
            if (mode === "create") setScreen("s-account-created");
            else goAfterSignup();
          }}
        />
      )}
      {screen === "s-account-created" && (
        <AccountCreatedScreen
          state={assessment}
          onGoToDashboard={goAfterSignup}
        />
      )}
      {screen === "s-empty-dashboard" && (
        <EmptyDashboardScreen
          onStartDeal={() => setScreen("s-profile")}
          onSignOut={() => setScreen("s-landing")}
          onNavDeals={goToDeals}
          userName={assessment.profile.name || "Demo user"}
        />
      )}
      {screen === "s-dashboard" && (
        <DashboardScreen
          onNewDeal={() => setScreen("s-profile")}
          onSignOut={() => setScreen("s-landing")}
          onNavDeals={goToDeals}
          userName={assessment.profile.name || "Demo user"}
        />
      )}
    </>
  );
}
