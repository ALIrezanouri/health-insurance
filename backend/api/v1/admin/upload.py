from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
from config import settings
from services.excel_processor import process_insurance_excel
import tempfile
import os

router = APIRouter()

def get_admin_key(api_key: str = Depends(lambda x: x.headers.get("X-Admin-Key"))):
    if api_key != settings.ADMIN_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin key"
        )
    return api_key

@router.post("/upload")
async def upload_insurance_excel(
    file: UploadFile = File(...),
    insurance_id: str = None,
    admin_key: str = Depends(get_admin_key)
):
    """
    Upload and process insurance Excel file
    """
    if not insurance_id:
        raise HTTPException(
            status_code=400,
            detail="Insurance ID is required"
        )
    
    if not file.filename.endswith(('.xlsx', '.xls')):
        raise HTTPException(
            status_code=400,
            detail="Only Excel files are allowed"
        )
    
    # Save uploaded file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx") as tmp:
        content = await file.read()
        tmp.write(content)
        tmp_path = tmp.name
    
    try:
        # Process the file
        result = process_insurance_excel(tmp_path, insurance_id)
        return {
            "status": "success",
            "insurance_id": insurance_id,
            "processed_rows": result["processed_rows"],
            "centers_added": result["centers_added"],
            "contracts_updated": result["contracts_updated"]
        }
    finally:
        # Clean up temporary file
        os.unlink(tmp_path)