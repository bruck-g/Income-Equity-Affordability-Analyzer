import { ArrowLeft, RefreshCw, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface FormData {
  jobTitle: string;
  monthlyIncome: string;
  monthlyRent: string;
  location: string;
  race: string;
  gender: string;
}

interface ResultsDashboardProps {
  formData: FormData;
  onBack: () => void;
  onStartOver: () => void;
}

export function ResultsDashboard({ formData, onBack, onStartOver }: ResultsDashboardProps) {
  // Calculate metrics (these would come from real data in production)
  const income = parseFloat(formData.monthlyIncome);
  const rent = parseFloat(formData.monthlyRent);
  const rentBurdenPercent = Math.round((rent / income) * 100);
  
  // Mock data for demo
  const avgIncomeForJob = income * 1.15; // 15% higher average
  const wageGap = Math.round(avgIncomeForJob - income);
  const livingWageComparison = income > 4500 ? "above" : "below";
  const livingWagePercent = Math.round((income / 4500) * 100);
  
  const getRentBurdenStatus = () => {
    if (rentBurdenPercent < 30) return { status: "good", color: "success", text: "Good" };
    if (rentBurdenPercent < 50) return { status: "moderate", color: "warning", text: "Moderate" };
    return { status: "high", color: "destructive", text: "High Risk" };
  };

  const getFinancialPressure = () => {
    const score = (rentBurdenPercent > 50 ? 2 : rentBurdenPercent > 30 ? 1 : 0) + 
                  (wageGap > 0 ? 1 : 0) + 
                  (livingWageComparison === "below" ? 1 : 0);
    
    if (score <= 1) return { level: "Low", color: "success", icon: CheckCircle2 };
    if (score <= 2) return { level: "Medium", color: "warning", icon: AlertTriangle };
    return { level: "High", color: "destructive", icon: AlertTriangle };
  };

  const rentBurden = getRentBurdenStatus();
  const financialPressure = getFinancialPressure();

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Form
          </Button>
          <Button variant="outline" onClick={onStartOver}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Start Over
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 animate-fade-in">Your Equity Snapshot</h1>
          <p className="text-muted-foreground animate-fade-in">
            Analysis for {formData.jobTitle} in {formData.location}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Rent Burden Card */}
          <Card className={`shadow-card animate-scale-in border-l-4 border-l-${rentBurden.color}`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                💰 Rent Burden
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{rentBurdenPercent}%</div>
              <div className={`text-sm font-medium text-${rentBurden.color}`}>
                {rentBurden.text}
              </div>
              <Progress value={rentBurdenPercent} className="mt-3" />
              <p className="text-xs text-muted-foreground mt-2">
                of your income goes to rent
              </p>
            </CardContent>
          </Card>

          {/* Wage Gap Card */}
          <Card className="shadow-card animate-scale-in border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                📉 Wage Gap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">${wageGap.toLocaleString()}</div>
                <TrendingDown className="ml-2 h-4 w-4 text-destructive" />
              </div>
              <div className="text-sm font-medium text-destructive">
                Below Average
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                less than average for your role
              </p>
            </CardContent>
          </Card>

          {/* Living Wage Comparison Card */}
          <Card className="shadow-card animate-scale-in border-l-4 border-l-accent">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                📊 Living Wage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">{livingWagePercent}%</div>
                {livingWageComparison === "above" ? (
                  <TrendingUp className="ml-2 h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="ml-2 h-4 w-4 text-destructive" />
                )}
              </div>
              <div className={`text-sm font-medium text-${livingWageComparison === "above" ? "success" : "destructive"}`}>
                {livingWageComparison === "above" ? "Above" : "Below"} Living Wage
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                of local living wage estimate
              </p>
            </CardContent>
          </Card>

          {/* Financial Pressure Card */}
          <Card className={`shadow-card animate-scale-in border-l-4 border-l-${financialPressure.color}`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                ⚠️ Financial Pressure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">{financialPressure.level}</div>
                <financialPressure.icon className={`ml-2 h-4 w-4 text-${financialPressure.color}`} />
              </div>
              <div className={`text-sm font-medium text-${financialPressure.color}`}>
                Risk Level
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                based on combined factors
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Income Comparison Chart */}
          <Card className="shadow-card animate-scale-in">
            <CardHeader>
              <CardTitle>Income Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Your Income</span>
                    <span className="font-medium">${income.toLocaleString()}</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Group Average</span>
                    <span className="font-medium">${(income * 1.1).toLocaleString()}</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">White Male Average</span>
                    <span className="font-medium">${avgIncomeForJob.toLocaleString()}</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="shadow-card animate-scale-in">
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rentBurdenPercent > 30 && (
                  <div className="p-3 bg-warning/10 rounded-lg">
                    <h4 className="font-medium text-warning mb-1">Housing Costs</h4>
                    <p className="text-sm">Consider ways to reduce housing expenses or increase income.</p>
                  </div>
                )}
                {wageGap > 0 && (
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <h4 className="font-medium text-primary mb-1">Salary Negotiation</h4>
                    <p className="text-sm">Research market rates and consider discussing compensation with your employer.</p>
                  </div>
                )}
                <div className="p-3 bg-success/10 rounded-lg">
                  <h4 className="font-medium text-success mb-1">Financial Health</h4>
                  <p className="text-sm">Continue tracking your expenses and building an emergency fund.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}