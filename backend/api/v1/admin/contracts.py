from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
import pandas as pd
from io import StringIO, BytesIO
from database.connection import get_db
from datetime import datetime

router = APIRouter()

@router.post("/upload")
async def upload_contracts(file: UploadFile = File(...)):
    """
    Upload insurance contracts from Excel/CSV file
    """
    try:
        # Read file content
        content = await file.read()
        
        # Determine file type and read accordingly
        if file.filename and file.filename.endswith('.csv'):
            df = pd.read_csv(StringIO(content.decode('utf-8')))
        else:
            # For Excel files
            df = pd.read_excel(BytesIO(content))
        
        # Convert dataframe to list of dictionaries
        contracts_data = df.to_dict('records')
        
        # Add created_at timestamp to each contract
        for contract in contracts_data:
            contract['created_at'] = datetime.utcnow()
            # If last_verified is not provided, set it to now
            if 'last_verified' not in contract:
                contract['last_verified'] = datetime.utcnow()
        
        # Get database instance
        db = get_db()
        
        # Insert contracts into database
        if contracts_data:
            result = await db.insurance_contracts.insert_many(contracts_data)
            return {
                "success": True,
                "message": f"Successfully uploaded {len(result.inserted_ids)} contracts",
                "inserted_count": len(result.inserted_ids)
            }
        else:
            return {
                "success": True,
                "message": "No data found in the file",
                "inserted_count": 0
            }
            
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing file: {str(e)}")

@router.get("/template")
async def get_contracts_template():
    """
    Get CSV template for insurance contracts
    """
    template_data = [
        ['center_id', 'insurance_id', 'accepted_services', 'contract_status'],
        ['center1', 'asia123', 'dentistry,orthodontics', 'active'],
        ['center2', 'saman456', 'imaging,mri', 'active']
    ]
    
    # Convert to CSV format
    csv_content = '\n'.join([','.join(row) for row in template_data])
    
    return {
        "filename": "contracts_template.csv",
        "content": csv_content
    }