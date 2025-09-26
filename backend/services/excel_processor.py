import pandas as pd
import uuid
from datetime import datetime
from typing import Dict, List, Any
from database.models import MedicalCenter, InsuranceContract
from services.geocoding import geocode_address
from database.connection import db

def process_insurance_excel(file_path: str, insurance_id: str) -> Dict[str, int]:
    """
    Process insurance Excel file and convert to standard format
    Returns statistics about processed data
    """
    df = pd.read_excel(file_path)
    
    # Standardize columns
    column_mapping = {
        'نام مرکز': 'name',
        'نام': 'name',
        'آدرس': 'address',
        'تلفن': 'phone',
        'شماره تماس': 'phone',
        'خدمات': 'services',
        'نوع': 'type',
        'نوع خدمات': 'services'
    }
    
    # Find available columns using flexible matching
    available_columns = {}
    for col in df.columns:
        for key, value in column_mapping.items():
            if key in col or value in col:
                available_columns[col] = value
                break
    
    # Rename columns if found
    if available_columns:
        df = df.rename(columns=available_columns)
    
    # Validate required columns
    required_columns = ['name', 'address']
    if not all(col in df.columns for col in required_columns):
        raise ValueError("Excel file is missing required columns (name, address)")
    
    # Process services column if exists
    if 'services' in df.columns:
        df['services'] = df['services'].apply(
            lambda x: [s.strip() for s in str(x).split(',')] if pd.notna(x) else []
        )
    else:
        df['services'] = [[] for _ in range(len(df))]
    
    # Convert addresses to coordinates
    if 'address' in df.columns:
        df['coordinates'] = df['address'].apply(
            lambda addr: geocode_address(addr) if pd.notna(addr) else None
        )
    else:
        df['coordinates'] = [None for _ in range(len(df))]
    
    # Convert to database format
    centers = []
    contracts = []
    for _, row in df.iterrows():
        # Create center if it doesn't exist
        existing_center = db.medical_centers.find_one({"address": row['address']})
        if existing_center:
            center_id = existing_center['_id']
        else:
            center = MedicalCenter(
                name=row['name'],
                address=row['address'],
                phone=row.get('phone'),
                services=row['services'],
                location={
                    "type": "Point",
                    "coordinates": row['coordinates'] or [0, 0]
                }
            )
            result = db.medical_centers.insert_one(center.dict())
            center_id = result.inserted_id
        
        # Create or update contract
        contract = InsuranceContract(
            center_id=str(center_id),
            insurance_id=insurance_id,
            accepted_services=row['services'],
            contract_status="active",
            last_verified=datetime.utcnow()
        )
        contracts.append(contract.dict())
        
        centers.append({
            "id": str(center_id),
            "name": row['name'],
            "address": row['address']
        })
    
    # Bulk update contracts
    if contracts:
        # First remove existing contracts for this insurance
        db.insurance_contracts.delete_many({"insurance_id": insurance_id})
        # Insert new contracts
        db.insurance_contracts.insert_many(contracts)
    
    return {
        "processed_rows": len(df),
        "skipped_rows": 0,
        "centers_added": len(centers),
        "contracts_updated": len(contracts)
    }