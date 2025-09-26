from typing import List, Optional, Dict, Any
from database.connection import get_db
from database.models import MedicalCenter, InsuranceContract

async def search_medical_centers(
    insurance_ids: Optional[List[str]] = None,
    services: Optional[List[str]] = None,
    city: Optional[str] = None,
    province: Optional[str] = None,
    limit: int = 50
) -> List[Dict[str, Any]]:
    """
    Search for medical centers based on insurance, services, city, and province
    """
from typing import List, Optional, Dict, Any
from database.connection import get_db
from database.models import MedicalCenter, InsuranceContract

# Assuming MongoDB's GeoJSON Point format for location
# Example: {"type": "Point", "coordinates": [-73.97, 40.77]}

async def search_medical_centers(
    insurance_ids: Optional[List[str]] = None,
    services: Optional[List[str]] = None,
    location: Optional[Dict[str, Any]] = None,  # Expecting {"lat": float, "lng": float}
    radius: float = 10.0,  # Radius in kilometers
    city: Optional[str] = None,
    province: Optional[str] = None,
    limit: int = 50
) -> List[Dict[str, Any]]:
    """
    Search for medical centers based on insurance, services, location, city, and province
    """
    # Build query based on filters
    query = {}
    
    # Get database instance
    db = get_db()

    # Geospatial query
    if location and "lat" in location and "lng" in location:
        # MongoDB expects coordinates in [longitude, latitude] format
        # Convert radius from km to meters for $nearSphere if needed, or use $centerSphere with radians
        # For simplicity, let's assume radius is in km and use $nearSphere with meters
        # $nearSphere takes distance in meters. 1km = 1000m
        # Note: Ensure 'location' field in MongoDB is indexed as a geospatial point (2dsphere)
        query["location"] = {
            "$nearSphere": {
                "$geometry": {
                    "type": "Point",
                    "coordinates": [location["lng"], location["lat"]]  # [longitude, latitude]
                },
                "$minDistance": 0,  # Minimum distance (optional, can be 0)
                "$maxDistance": radius * 1000  # Maximum distance in meters
            }
        }

    # If insurance filter is specified, find centers with contracts for those insurances
    if insurance_ids:
        # Find all contracts matching the insurance IDs
        contract_cursor = db.insurance_contracts.find({
            "insurance_id": {"$in": insurance_ids},
            "contract_status": "active"
        })
        contract_center_ids = [contract["center_id"] async for contract in contract_cursor]

        # Add to main query - search by 'id' field
        if contract_center_ids:
            # If there's already a geospatial query, we need to combine them.
            # For now, assuming no conflict, but in a real app, this needs careful handling.
            # If query already has 'location', we might need to use $and operator.
            if "location" in query:
                query["$and"] = [
                    query.pop("location"), # Temporarily remove location to add it back in $and
                    {"id": {"$in": contract_center_ids}}
                ]
                query["location"] = query.pop("$and")[0] # Put location back in the $and clause
                query["$and"].append({"id": {"$in": contract_center_ids}})
            else:
                query["id"] = {"$in": contract_center_ids}
        else:
            # No matching contracts, return empty result
            return []

    # If services filter is specified
    if services:
        query["services"] = {"$in": services}
        
    # If city filter is specified
    if city:
        query["city"] = city
        
    # If province filter is specified
    if province:
        query["province"] = province

    # Execute query
    # Note: If using $and, the find method needs to handle it correctly.
    # The current structure might need adjustment if both location and insurance_ids are present.
    # For now, let's assume a simpler query structure for demonstration.
    # A more robust solution would involve building the query dynamically with $and.
    
    # Rebuilding query to handle potential $and for combined filters
    final_query = {}
    geo_query = None
    
    if "location" in query:
        geo_query = query.pop("location")
        
    if query: # If there are other filters besides location
        if geo_query:
            final_query["$and"] = [geo_query, query]
        else:
            final_query = query
    elif geo_query: # Only location filter is present
        final_query = geo_query
    else: # No filters, return empty or all (depending on desired behavior)
        # For now, if no filters, we might want to return empty or fetch all with limit
        # Let's assume no filters means fetch all up to limit
        pass # Query remains empty, will fetch all up to limit

    cursor = db.medical_centers.find(final_query).limit(limit)
    centers = []

    async for center_doc in cursor:
        # Get insurance contracts for this center
        contracts_cursor = db.insurance_contracts.find({
            "center_id": center_doc["id"],
            "contract_status": "active"
        })

        contracts = []
        async for contract in contracts_cursor:
            # Get insurance company details
            insurance = await db.insurance_companies.find_one({
                "id": contract["insurance_id"]
            })

            if insurance:
                contracts.append({
                    "id": insurance["id"],
                    "name": insurance["name"],
                    "services": contract["accepted_services"]
                })

        center_data = {
            "id": center_doc["id"],
            "name": center_doc["name"],
            "address": center_doc["address"],
            "city": center_doc.get("city"),
            "province": center_doc.get("province"),
            "phone": center_doc.get("phone"),
            "services": center_doc["services"],
            "accepted_insurance": contracts
        }

        centers.append(center_data)

    return centers

async def get_all_insurance_companies() -> List[Dict[str, Any]]:
    """
    Get all insurance companies
    """
    db = get_db()
    cursor = db.insurance_companies.find({})
    companies = []

    async for company in cursor:
        companies.append({
            "id": company["id"],
            "name": company["name"],
            "logo_url": company.get("logo_url"),
            "website": company.get("website")
        })

    return companies
