from fastapi import APIRouter
from services.search import get_all_insurance_companies

router = APIRouter()

@router.get("/")
async def get_insurance_companies():
    """
    Get all insurance companies
    """
    companies = await get_all_insurance_companies()
    return companies