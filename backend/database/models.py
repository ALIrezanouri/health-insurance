from datetime import datetime
from uuid import uuid4
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict

class InsuranceCompany(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    name: str
    logo_url: Optional[str] = None
    website: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={datetime: lambda v: v.isoformat()}
    )

class MedicalCenter(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    name: str
    address: str
    location: Dict = {"type": "Point", "coordinates": [0.0, 0.0]}  # GeoJSON
    phone: Optional[str] = None
    services: List[str]  # ["dentistry", "imaging", "lab"]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={datetime: lambda v: v.isoformat()}
    )

class InsuranceContract(BaseModel):
    center_id: str
    insurance_id: str
    accepted_services: List[str]  # Services covered by this insurance
    contract_status: str = "active"  # active/expired/pending
    last_verified: datetime = Field(default_factory=datetime.utcnow)
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={datetime: lambda v: v.isoformat()}
    )