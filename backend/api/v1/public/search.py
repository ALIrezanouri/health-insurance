from fastapi import APIRouter, Query
from typing import List, Optional
from services.search import search_medical_centers

router = APIRouter()

@router.get("/")
async def search_centers(
    insurance_id: List[str] = Query(default=[]),
    service: List[str] = Query(default=[]),
    lat: Optional[float] = None,
    lng: Optional[float] = None,
    radius: float = 10.0
):
    """
    Search for medical centers based on various criteria
    """
    location = None
    location_data = None
    if lat is not None and lng is not None:
        location_data = {"lat": lat, "lng": lng}
    
    centers = await search_medical_centers(
        insurance_ids=insurance_id if insurance_id else None,
        services=service if service else None,
        location=location_data,
        radius=radius
    )
    
    return {
        "results": centers,
        "count": len(centers)
    }
