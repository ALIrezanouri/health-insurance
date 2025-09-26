from fastapi import APIRouter, Depends, HTTPException

router = APIRouter()

def get_admin_key(api_key: str = Depends(lambda x: x.headers.get("X-Admin-Key"))):
    if api_key != "default_admin_key":
        raise HTTPException(
            status_code=401,
            detail="Invalid admin key"
        )
    return api_key

@router.post("/process")
async def process_data(admin_key: str = Depends(get_admin_key)):
    """
    Process pending data operations
    """
    # This would contain logic to process any pending operations
    return {
        "status": "success",
        "message": "Data processed successfully"
    }