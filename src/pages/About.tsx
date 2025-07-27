import React from "react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">About This Project</h1>
        <p className="mb-6">
          The Income Equity & Affordability Analyzer shines a light on wage gaps
          and rent burdens across demographics. By combining datasets from the
          MIT Living Wage Calculator, Bureau of Labor Statistics, and Pew
          Research, we offer an interactive, equity-focused dashboard that
          compares your personal metrics against national and demographic
          benchmarks.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Creators</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Ayman Alabbasi</li>
          <li>Emilio L. Aleman</li>
          <li>Bruck Gebre</li>
          <li>Joshua Shields</li>
        </ul>
      </div>
    </div>
  )
}