from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
import pandas as pd
from io import StringIO, BytesIO
from database.connection import get_db

router = APIRouter()

@router.post("/upload")
async def upload_medical_centers(file: UploadFile = File(...)):
    """
    Upload medical centers from Excel/CSV file
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
        centers_data = df.to_dict('records')
        
        # Get database instance
        db = get_db()
        
        # Insert centers into database
        if centers_data:
            result = await db.medical_centers.insert_many(centers_data)
            return {
                "success": True,
                "message": f"Successfully uploaded {len(result.inserted_ids)} medical centers",
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
async def get_centers_template():
    """
    Get CSV template for medical centers
    """
    template_data = [
        ['id', 'name', 'address', 'city', 'province', 'phone', 'services'],
        ['center1', 'کلینیک دندانپزشکی تهران', 'تهران، خیابان ولیعصر، پلاک 123', 'تهران', 'تهران', '02112345678', 'dentistry,orthodontics'],
        ['center2', 'مرکز تصویربرداری پرشیا', 'تهران، میدان تجریش، خیابان تجریش، پلاک 45', 'تهران', 'تهران', '02187654321', 'imaging,mri,ctscan']
    ]
    
    # Convert to CSV format
    csv_content = '\n'.join([','.join(row) for row in template_data])
    
    return {
        "filename": "medical_centers_template.csv",
        "content": csv_content
    }