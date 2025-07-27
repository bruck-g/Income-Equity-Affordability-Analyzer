import csv
from app.models.analysis import IncomeRequest, AnalysisResult

# ---------- Helpers ---------- #
def get_living_wage(location):
    with open("app/data/living_wage.csv") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["location"].lower() == location.lower():
                return float(row["living_wage"])
    return None

def get_avg_salary(job_title, location):
    with open("app/data/average_salaries.csv") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["location"].lower() == location.lower() and row["job_title"].lower() == job_title.lower():
                return float(row["average_salary"])
    return None

def get_race_gender_avg(job_title, location, race, gender):
    with open("app/data/wage_by_race_gender.csv") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if (
                row["location"].lower() == location.lower()
                and row["job_title"].lower() == job_title.lower()
                and row["race"].lower() == race.lower()
                and row["gender"].lower() == gender.lower()
            ):
                return float(row["average_salary"])
    return None

# ---------- Main Analysis ---------- #
def perform_full_analysis(req: IncomeRequest) -> AnalysisResult:
    income = req.monthly_income
    rent = req.monthly_rent
    location = req.location
    job = req.job_title
    race = req.race
    gender = req.gender

    # --- Rent Burden --- #
    rent_burden = round((rent / income) * 100, 2)
    rent_label = "Good" if rent_burden <= 30 else "High"

    # --- Living Wage --- #
    living_wage = get_living_wage(location)
    if living_wage:
        annual_income = income * 12
        living_wage_percent = round((annual_income / living_wage) * 100, 2)
        living_label = "Above Living Wage" if living_wage_percent >= 100 else "Below Living Wage"
    else:
        living_wage_percent = 0
        living_label = "Unknown"

    # --- Wage Gap (overall) --- #
    avg_salary = get_avg_salary(job, location)
    if avg_salary:
        wage_gap = round((avg_salary - (income * 12)), 2)
        wage_gap_label = "Below Average" if wage_gap > 0 else "Above Average"
    else:
        wage_gap = 0
        wage_gap_label = "Unknown"

    # --- Wage Gap (race/gender specific) --- #
    race_gender_avg = get_race_gender_avg(job, location, race, gender)
    if race_gender_avg:
        wage_gap_race_gender = round((race_gender_avg - (income * 12)), 2)
        wage_gap_race_gender_label = "Below Group Avg" if wage_gap_race_gender > 0 else "Above Group Avg"
    else:
        wage_gap_race_gender = 0
        wage_gap_race_gender_label = "Unknown"

    # --- Financial Pressure --- #
    pressure_score = round((rent_burden + (100 - living_wage_percent) + abs(wage_gap) / 1000), 2)
    pressure_label = "High Stress" if pressure_score > 100 else "Moderate" if pressure_score > 50 else "Low Stress"

    # --- Suggestion --- #
    if avg_salary and wage_gap > 0:
        suggestion = f"Consider negotiating for +${wage_gap:,.0f} to match the overall average."
    else:
        suggestion = "You're earning at or above the average."

    return AnalysisResult(
        rent_burden=rent_burden,
        rent_label=rent_label,
        wage_gap=wage_gap,
        wage_gap_label=wage_gap_label,
        wage_gap_race_gender=wage_gap_race_gender,
        wage_gap_race_gender_label=wage_gap_race_gender_label,
        living_wage_percent=living_wage_percent,
        living_wage_label=living_label,
        financial_pressure_score=pressure_score,
        financial_label=pressure_label,
        suggestion=suggestion
    )
