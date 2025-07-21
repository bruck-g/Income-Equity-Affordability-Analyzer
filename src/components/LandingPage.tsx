import { ArrowRight, BarChart3, DollarSign, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface LandingPageProps {
  onStartAnalysis: () => void;
}

export function LandingPage({ onStartAnalysis }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Are You Being Paid Fairly?
          </h1>
          <p className="text-lg lg:text-xl mb-8 opacity-90 max-w-2xl mx-auto animate-fade-in">
            Get a quick, equity-focused snapshot of your income, rent burden, 
            and wage gap compared to national and racial averages.
          </p>
          <Button 
            onClick={onStartAnalysis}
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 shadow-elegant animate-scale-in"
          >
            Start Analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-6 animate-scale-in">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold ml-3">Rent Burden Analysis</h3>
            </div>
            <p className="text-white/80">
              Understand what percentage of your income goes to housing costs
            </p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-6 animate-scale-in">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold ml-3">Wage Gap Insights</h3>
            </div>
            <p className="text-white/80">
              Compare your earnings to demographic and industry averages
            </p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-6 animate-scale-in">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold ml-3">Financial Health</h3>
            </div>
            <p className="text-white/80">
              Get personalized recommendations to improve your financial position
            </p>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/5 backdrop-blur-sm border-t border-white/20 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-white/60">
            <p>&copy; 2025 Income Equity Analyzer. Promoting financial transparency and wage equity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}