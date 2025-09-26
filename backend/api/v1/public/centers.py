from fastapi import APIRouter, Query
from typing import List, Optional
from services.search import search_medical_centers

router = APIRouter()

@router.get("/")
async def get_centers(
    insurance_id: List[str] = Query(default=[]),
    service: List[str] = Query(default=[]),
    city: Optional[str] = None,
    province: Optional[str] = None
):
    """
    Get medical centers with optional filtering by insurance, services, city, and province
    """
    centers = await search_medical_centers(
        insurance_ids=insurance_id if insurance_id else None,
        services=service if service else None,
        city=city,
        province=province
    )
    
    return centers