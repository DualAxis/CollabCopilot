"use client";

import { useState } from "react";
import {
  type ScreenId,
  type AssessmentState,
  INITIAL_ASSESSMENT,
  RADIO_QUESTIONS,
} from "./lib/assessment";
import LandingScreen from "./components/screens/LandingScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import RadioQuestionScreen from "./components/screens/RadioQuestionScreen";
import ContextScreen from "./components/screens/ContextScreen";
import ProcessingScreen from "./components/screens/ProcessingScreen";
import ResultsScreen from "./components/screens/ResultsScreen";

export default function Home() {
  const [screen, setScreen] = useState<ScreenId>("s-landing");
  const [assessment, setAssessment] = useState<AssessmentState>(INITIAL_ASSESSMENT);

  const radioConfig = RADIO_QUESTIONS.find((q) => q.id === screen);

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
        <ProcessingScreen onComplete={() => setScreen("s-results")} />
      )}
      {screen === "s-results" && (
        <ResultsScreen
          state={assessment}
          onRestart={() => {
            setAssessment(INITIAL_ASSESSMENT);
            setScreen("s-landing");
          }}
        />
      )}
    </>
  );
}
