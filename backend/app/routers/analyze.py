from fastapi import APIRouter
from app.models.analysis import IncomeRequest, AnalysisResult
from app.services.calculator import perform_full_analysis

router = APIRouter()

@router.post("/analyze", response_model=AnalysisResult)
def analyze(request: IncomeRequest):
    return perform_full_analysis(request)
