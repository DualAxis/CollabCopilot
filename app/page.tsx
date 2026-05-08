"use client";

import { useState, useCallback } from "react";
import {
  type ScreenId,
  type AssessmentState,
  INITIAL_ASSESSMENT,
  RADIO_QUESTIONS,
  deriveCurrentStageFromState,
} from "./lib/assessment";
import { type AssessmentResults, MOCK_RESULTS } from "./lib/results";
import { type DealBrief, buildInitialDealBrief } from "./lib/dealBrief";
import LandingScreen from "./components/screens/LandingScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import RadioQuestionScreen from "./components/screens/RadioQuestionScreen";
import ProcessingScreen from "./components/screens/ProcessingScreen";
import ResultsScreen from "./components/screens/ResultsScreen";
import LoginScreen from "./components/screens/LoginScreen";
import AccountCreatedScreen from "./components/screens/AccountCreatedScreen";
import EmptyDashboardScreen from "./components/screens/EmptyDashboardScreen";
import DashboardScreen from "./components/screens/DashboardScreen";
import DealBriefScreen from "./components/screens/DealBriefScreen";
import RoadmapScreen from "./components/screens/RoadmapScreen";
import ProfileUserScreen from "./components/screens/ProfileUserScreen";
import KnowledgeLibraryScreen from "./components/screens/KnowledgeLibraryScreen";
import DocumentsScreen from "./components/screens/DocumentsScreen";
import ChecklistsScreen from "./components/screens/ChecklistsScreen";
import NewDealScreen from "./components/screens/NewDealScreen";
import InviteScreen from "./components/screens/InviteScreen";
import ConfirmedScreen from "./components/screens/ConfirmedScreen";

type LoginMode = "create" | "signin";

export default function Home() {
  const [screen, setScreen] = useState<ScreenId>("s-landing");
  const [assessment, setAssessment] = useState<AssessmentState>(INITIAL_ASSESSMENT);
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [loginMode, setLoginMode] = useState<LoginMode>("create");
  const [cameFromAssessment, setCameFromAssessment] = useState<boolean>(false);
  const [dealBrief, setDealBrief] = useState<DealBrief>(() =>
    buildInitialDealBrief(INITIAL_ASSESSMENT, null)
  );

  const radioConfig = RADIO_QUESTIONS.find((q) => q.id === screen);

  const handleAnalysisComplete = useCallback(
    (r: AssessmentResults) => {
      setResults(r);
      setDealBrief(buildInitialDealBrief(assessment, r));
      setScreen("s-results");
    },
    [assessment]
  );

  const handleRestart = () => {
    setAssessment(INITIAL_ASSESSMENT);
    setResults(null);
    setDealBrief(buildInitialDealBrief(INITIAL_ASSESSMENT, null));
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

  // Demo: 1-deal flow always lands on the deal brief. Tech Notes v2 §1.3.
  // TODO(production): query deals.count -> 0/1/2+ -> s-empty-dashboard / s-deal-brief / s-dashboard.
  const goToDeals = () => setScreen("s-deal-brief");
  const goToDealsList = () => setScreen("s-dashboard");
  const goToRoadmap = () => setScreen("s-roadmap");
  const goHome = () => setScreen("s-landing");
  const goToProfile = () => setScreen("s-profile-user");
  const goToKnowledge = () => setScreen("s-knowledge-library");
  const goToKnowledgeDeal = () => setScreen("s-knowledge-library-deal");
  const goToDocuments = () => setScreen("s-documents");
  const goToChecklists = () => setScreen("s-checklists");
  const goToNewDeal = () => setScreen("s-new-deal");
  const goToInvite = () => setScreen("s-invite");
  const goToConfirmed = () => setScreen("s-confirmed");
  const onSignOut = () => setScreen("s-landing");
  const userInstitution =
    assessment.profile.institution || "Warsaw University of Technology";

  return (
    <>
      {screen === "s-landing" && (
        <LandingScreen
          onStartAssessment={() => setScreen("s-profile")}
          onSignIn={() => goToLogin("signin", false)}
          onLogoClick={goHome}
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
          onContinue={(mode, loginProfile) => {
            if (loginProfile) {
              setAssessment((prev) => ({
                ...prev,
                profile: {
                  ...prev.profile,
                  name: loginProfile.name || prev.profile.name,
                  email: loginProfile.email || prev.profile.email,
                },
              }));
            }
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
          onLogoClick={goHome}
          onOpenProfile={goToProfile}
          onNavDeals={goToDealsList}
          onNavKnowledge={goToKnowledge}
          onCreateDealManual={goToNewDeal}
          userName={assessment.profile.name || "Demo user"}
          userInstitution={userInstitution}
        />
      )}
      {screen === "s-dashboard" && (
        <DashboardScreen
          deal={{
            partner: assessment.profile.partner.trim() || "Nexar Robotics",
            dealType: assessment.q1 || "IP Licensing",
            currentStage: deriveCurrentStageFromState(assessment),
            alertCount: results?.complianceAlerts.length ?? 0,
            dateLabel: new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
            researcher: assessment.profile.name.trim() || "Dr. Paulina Chen",
            institution: userInstitution,
          }}
          onNewDeal={goToNewDeal}
          onOpenDeal={() => setScreen("s-deal-brief")}
          onLogoClick={goHome}
          onOpenProfile={goToProfile}
          onNavDeals={goToDealsList}
          onNavKnowledge={goToKnowledge}
          userName={assessment.profile.name || "Demo user"}
          userInstitution={userInstitution}
        />
      )}
      {screen === "s-deal-brief" && (
        <DealBriefScreen
          dealBrief={dealBrief}
          setDealBrief={setDealBrief}
          onBackToDealsList={goToDealsList}
          onLogoClick={goHome}
          onOpenProfile={goToProfile}
          onNavRoadmap={goToRoadmap}
          onNavChecklists={goToChecklists}
          onNavDocuments={goToDocuments}
          onNavKnowledge={goToKnowledgeDeal}
          userName={assessment.profile.name || "Demo user"}
          userInstitution={userInstitution}
        />
      )}
      {screen === "s-roadmap" && (
        <RoadmapScreen
          dealBrief={dealBrief}
          onBackToDealsList={goToDealsList}
          onLogoClick={goHome}
          onOpenProfile={goToProfile}
          onNavDealBrief={goToDeals}
          onNavChecklists={goToChecklists}
          onNavDocuments={goToDocuments}
          onNavKnowledge={goToKnowledgeDeal}
          userName={assessment.profile.name || "Demo user"}
          userInstitution={userInstitution}
        />
      )}
      {screen === "s-profile-user" && (
        <ProfileUserScreen
          onSignOut={onSignOut}
          onLogoClick={goHome}
          onNavDeals={goToDealsList}
          onOpenProfile={goToProfile}
          userName={assessment.profile.name || "Dr. Paulina Chen"}
          userInstitution={userInstitution}
          userEmail={assessment.profile.email || "p.chen@pw.edu.pl"}
          userArea={assessment.profile.area[0] || "Robotics & Automation"}
          userRole={assessment.profile.role}
        />
      )}
      {screen === "s-knowledge-library" && (
        <KnowledgeLibraryScreen
          mode="global"
          onLogoClick={goHome}
          onOpenProfile={goToProfile}
          onNavDeals={goToDealsList}
          userName={assessment.profile.name || "Demo user"}
          userInstitution={userInstitution}
        />
      )}
      {screen === "s-knowledge-library-deal" && (
        <KnowledgeLibraryScreen
          mode="deal"
          dealBrief={dealBrief}
          onLogoClick={goHome}
          onOpenProfile={goToProfile}
          onNavDeals={goToDealsList}
          onNavDealBrief={goToDeals}
          onNavRoadmap={goToRoadmap}
          onNavChecklists={goToChecklists}
          onNavDocuments={goToDocuments}
          userName={assessment.profile.name || "Demo user"}
          userInstitution={userInstitution}
        />
      )}
      {screen === "s-documents" && (
        <DocumentsScreen
          dealBrief={dealBrief}
          onLogoClick={goHome}
          onOpenProfile={goToProfile}
          onNavDeals={goToDealsList}
          onNavDealBrief={goToDeals}
          onNavRoadmap={goToRoadmap}
          onNavChecklists={goToChecklists}
          onNavKnowledge={goToKnowledgeDeal}
          userName={assessment.profile.name || "Demo user"}
          userInstitution={userInstitution}
        />
      )}
      {screen === "s-checklists" && (
        <ChecklistsScreen
          dealBrief={dealBrief}
          onLogoClick={goHome}
          onOpenProfile={goToProfile}
          onNavDeals={goToDealsList}
          onNavDealBrief={goToDeals}
          onNavRoadmap={goToRoadmap}
          onNavDocuments={goToDocuments}
          onNavKnowledge={goToKnowledgeDeal}
          userName={assessment.profile.name || "Demo user"}
          userInstitution={userInstitution}
        />
      )}
      {screen === "s-new-deal" && (
        <NewDealScreen
          onLogoClick={goHome}
          onOpenProfile={goToProfile}
          onNavDeals={goToDealsList}
          onNavRoadmap={goToRoadmap}
          onNavChecklists={goToChecklists}
          onNavDocuments={goToDocuments}
          onNavKnowledge={goToKnowledgeDeal}
          onCancel={goToDealsList}
          onContinue={goToInvite}
          userName={assessment.profile.name || "Demo user"}
          userInstitution={userInstitution}
        />
      )}
      {screen === "s-invite" && (
        <InviteScreen
          onLogoClick={goHome}
          onOpenProfile={goToProfile}
          onNavDeals={goToDealsList}
          onNavRoadmap={goToRoadmap}
          onNavChecklists={goToChecklists}
          onNavDocuments={goToDocuments}
          onNavKnowledge={goToKnowledgeDeal}
          onBack={goToNewDeal}
          onContinue={goToConfirmed}
          userName={assessment.profile.name || "Demo user"}
          userInstitution={userInstitution}
        />
      )}
      {screen === "s-confirmed" && (
        <ConfirmedScreen
          onLogoClick={goHome}
          onBack={goToInvite}
          onOpenRoadmap={goToRoadmap}
        />
      )}
    </>
  );
}
