import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"
import { LandingPage } from "@/components/LandingPage"
import { InputForm } from "@/components/InputForm"
import { ResultsDashboard } from "@/components/ResultsDashboard"
import AboutPage from "@/pages/About"

type AppState = "landing" | "form" | "results" | "about"

interface FormData {
  jobTitle: string
  monthlyIncome: string
  monthlyRent: string
  location: string
  race: string
  gender: string
}

export default function Index() {
  const [currentState, setCurrentState] = useState<AppState>("landing")
  const [formData, setFormData] = useState<FormData | null>(null)

  // dark‐mode state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme")
    if (saved) return saved === "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
    localStorage.setItem("theme", darkMode ? "dark" : "light")
  }, [darkMode])

  // navigation handlers
  const handleStartAnalysis = () => setCurrentState("form")
  const handleBackToLanding = () => setCurrentState("landing")
  const handleAnalyze = (data: FormData) => {
    setFormData(data)
    setCurrentState("results")
  }
  const handleBackToForm = () => setCurrentState("form")
  const handleStartOver = () => {
    setFormData(null)
    setCurrentState("landing")
  }

  // pick which “page” to render
  let page = null
  switch (currentState) {
    case "landing":
      page = <LandingPage onStartAnalysis={handleStartAnalysis} />
      break
    case "form":
      page = <InputForm onBack={handleBackToLanding} onAnalyze={handleAnalyze} />
      break
    case "results":
      if (formData) {
        page = (
          <ResultsDashboard
            formData={formData}
            onBack={handleBackToForm}
            onStartOver={handleStartOver}
          />
        )
      }
      break
    case "about":
      page = <AboutPage />
      break
  }

  return (
    <div className="flex flex-col min-h-screen text-foreground transition-colors">
      <header className="flex items-center justify-between p-4 bg-card border-b">
        <nav className="flex space-x-4">
          <button
            onClick={() => setCurrentState("landing")}
            className={
              currentState === "landing"
                ? "font-semibold"
                : "opacity-70 hover:opacity-100"
            }
          >
            Home
          </button>
          <button
            onClick={() => setCurrentState("about")}
            className={
              currentState === "about"
                ? "font-semibold"
                : "opacity-70 hover:opacity-100"
            }
          >
            About
          </button>
        </nav>
        <button
          onClick={() => setDarkMode((d) => !d)}
          className="p-2 rounded hover:bg-muted focus:outline-none"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-foreground" />
          ) : (
            <Moon className="w-5 h-5 text-foreground" />
          )}
        </button>
      </header>

      <main className="flex-1">{page}</main>
    </div>
  )
}