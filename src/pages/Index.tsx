import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { InputForm } from "@/components/InputForm";
import { ResultsDashboard } from "@/components/ResultsDashboard";

type AppState = "landing" | "form" | "results";

interface FormData {
  jobTitle: string;
  monthlyIncome: string;
  monthlyRent: string;
  location: string;
  race: string;
  gender: string;
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("landing");
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleStartAnalysis = () => {
    setCurrentState("form");
  };

  const handleBackToLanding = () => {
    setCurrentState("landing");
  };

  const handleAnalyze = (data: FormData) => {
    setFormData(data);
    setCurrentState("results");
  };

  const handleBackToForm = () => {
    setCurrentState("form");
  };

  const handleStartOver = () => {
    setFormData(null);
    setCurrentState("landing");
  };

  if (currentState === "landing") {
    return <LandingPage onStartAnalysis={handleStartAnalysis} />;
  }

  if (currentState === "form") {
    return (
      <InputForm 
        onBack={handleBackToLanding} 
        onAnalyze={handleAnalyze} 
      />
    );
  }

  if (currentState === "results" && formData) {
    return (
      <ResultsDashboard 
        formData={formData}
        onBack={handleBackToForm}
        onStartOver={handleStartOver}
      />
    );
  }

  return null;
};

export default Index;