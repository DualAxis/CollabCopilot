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
import ContextScreen from "./components/screens/ContextScreen";
import ProcessingScreen from "./components/screens/ProcessingScreen";
import ResultsScreen from "./components/screens/ResultsScreen";

export default function Home() {
  const [screen, setScreen] = useState<ScreenId>("s-landing");
  const [assessment, setAssessment] = useState<AssessmentState>(INITIAL_ASSESSMENT);
  const [results, setResults] = useState<AssessmentResults | null>(null);

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

  return (
    <>
      {screen === "s-landing" && (
        <LandingScreen onStartAssessment={() => setScreen("s-profile")} />
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
      {screen === "s-context" && (
        <ContextScreen
          state={assessment}
          setState={setAssessment}
          onAnalyse={() => setScreen("s-processing")}
          onBack={() => setScreen("s-q5")}
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
        />
      )}
    </>
  );
}
