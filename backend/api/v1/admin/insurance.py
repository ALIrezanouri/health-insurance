from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
import pandas as pd
from io import StringIO, BytesIO
from database.connection import get_db

router = APIRouter()

@router.post("/upload")
async def upload_insurance_companies(file: UploadFile = File(...)):
    """
    Upload insurance companies from Excel/CSV file
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
        insurance_data = df.to_dict('records')
        
        # Get database instance
        db = get_db()
        
        # Insert insurance companies into database
        if insurance_data:
            result = await db.insurance_companies.insert_many(insurance_data)
            return {
                "success": True,
                "message": f"Successfully uploaded {len(result.inserted_ids)} insurance companies",
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
async def get_insurance_template():
    """
    Get CSV template for insurance companies
    """
    template_data = [
        ['id', 'name', 'logo_url', 'website'],
        ['asia123', 'بیمه آسیا', '', 'https://www.asiainsurance.ir'],
        ['saman456', 'بیمه سامان', '', 'https://www.samaninsurance.ir']
    ]
    
    # Convert to CSV format
    csv_content = '\n'.join([','.join(row) for row in template_data])
    
    return {
        "filename": "insurance_companies_template.csv",
        "content": csv_content
    }