from typing import Optional, Tuple
from config import settings
import requests

def geocode_address(address: str) -> Optional[Tuple[float, float]]:
    """
    Convert address to coordinates using Google Maps Geocoding API
    Returns (latitude, longitude) tuple or None if failed
    """
    if not settings.GOOGLE_MAPS_API_KEY:
        # Return dummy coordinates if no API key
        return None
    
    try:
        url = "https://maps.googleapis.com/maps/api/geocode/json"
        params = {
            "address": address,
            "key": settings.GOOGLE_MAPS_API_KEY
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()
        
        data = response.json()
        if data["status"] == "OK" and len(data["results"]) > 0:
            location = data["results"][0]["geometry"]["location"]
            return (location["lat"], location["lng"])
    except Exception:
        pass
    
    return None