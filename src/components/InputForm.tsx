import { useState } from "react";
import { ArrowLeft, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { db } from "@/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

interface FormData {
  jobTitle: string;
  monthlyIncome: string;
  monthlyRent: string;
  location: string;
  race: string;
  gender: string;
}

interface InputFormProps {
  onBack: () => void;
  onAnalyze: (data: FormData) => void;
}

interface SubmissionData {
  jobTitle: string;
  monthlyIncome: number;
  monthlyRent: number;
  zipCode: string;
  race: string;
  gender: string;
  rentBurden: number;
  timestamp: Timestamp;
}

export function InputForm({ onBack, onAnalyze }: InputFormProps) {
  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    monthlyIncome: "",
    monthlyRent: "",
    location: "",
    race: "",
    gender: ""
  });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (Object.values(formData).every((value) => value !== "")) {
    onAnalyze(formData);

    const income = parseFloat(formData.monthlyIncome);
    const rent = parseFloat(formData.monthlyRent);
    const rentBurden = rent / income;

    const submissionData: SubmissionData = {
      jobTitle: formData.jobTitle,
      monthlyIncome: income,
      monthlyRent: rent,
      zipCode: formData.location,
      race: formData.race,
      gender: formData.gender,
      rentBurden,
      timestamp: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "submissions"), submissionData);
      console.log("Data saved to Firestore!");
    } catch (error) {
      console.error("Error saving data to Firestore:", error);
    }
  }
};


  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = Object.values(formData).every(value => value !== "");

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="shadow-elegant bg-gradient-card animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Tell us about your job and expenses
            </CardTitle>
            <p className="text-muted-foreground">
              We'll analyze your financial situation and compare it to relevant benchmarks
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g. Software Engineer"
                    value={formData.jobTitle}
                    onChange={(e) => updateField("jobTitle", e.target.value)}
                    className="transition-all duration-200 focus:shadow-card"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">Monthly Income ($)</Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    placeholder="5000"
                    value={formData.monthlyIncome}
                    onChange={(e) => updateField("monthlyIncome", e.target.value)}
                    className="transition-all duration-200 focus:shadow-card"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyRent">Monthly Rent ($)</Label>
                  <Input
                    id="monthlyRent"
                    type="number"
                    placeholder="1500"
                    value={formData.monthlyRent}
                    onChange={(e) => updateField("monthlyRent", e.target.value)}
                    className="transition-all duration-200 focus:shadow-card"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State or ZIP"
                    value={formData.location}
                    onChange={(e) => updateField("location", e.target.value)}
                    className="transition-all duration-200 focus:shadow-card"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Race/Ethnicity</Label>
                  <Select value={formData.race} onValueChange={(value) => updateField("race", value)}>
                    <SelectTrigger className="transition-all duration-200 focus:shadow-card">
                      <SelectValue placeholder="Select race/ethnicity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="black">Black or African American</SelectItem>
                      <SelectItem value="latinx">Hispanic or Latino/Latina/Latinx</SelectItem>
                      <SelectItem value="asian">Asian</SelectItem>
                      <SelectItem value="indigenous">American Indian or Alaska Native</SelectItem>
                      <SelectItem value="white">White</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => updateField("gender", value)}>
                    <SelectTrigger className="transition-all duration-200 focus:shadow-card">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="woman">Woman</SelectItem>
                      <SelectItem value="man">Man</SelectItem>
                      <SelectItem value="nonbinary">Nonbinary</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full transition-all duration-200 hover:shadow-elegant"
                disabled={!isFormValid}
              >
                <Calculator className="mr-2 h-5 w-5" />
                Analyze My Income
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}