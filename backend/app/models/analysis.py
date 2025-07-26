from pydantic import BaseModel

class IncomeRequest(BaseModel):
    job_title: str
    monthly_income: float
    monthly_rent: float
    location: str
    race: str
    gender: str

class AnalysisResult(BaseModel):
    rent_burden: float
    rent_label: str

    wage_gap: float
    wage_gap_label: str
    wage_gap_race_gender: float
    wage_gap_race_gender_label: str

    living_wage_percent: float
    living_wage_label: str

    financial_pressure_score: float
    financial_label: str

    suggestion: str
