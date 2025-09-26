import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # API Settings
    API_V1_STR: str = "/api/v1"
    
    # Database Settings
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    MONGODB_DB: str = os.getenv("MONGODB_DB", "health_insurance_hub")
    
    # Google Maps Settings
    GOOGLE_MAPS_API_KEY: str = os.getenv("GOOGLE_MAPS_API_KEY", "")
    
    # Admin Settings
    ADMIN_API_KEY: str = os.getenv("ADMIN_API_KEY", "default_admin_key")
    
    class Config:
        case_sensitive = True

settings = Settings()