from fastapi import APIRouter
from api.v1.admin import upload as admin_upload
from api.v1.admin import process as admin_process
from api.v1.public import centers, insurance, search as public_search

router = APIRouter()

# Include admin routes
admin_router = APIRouter(prefix="/admin")
admin_router.include_router(admin_upload.router, prefix="/insurance", tags=["admin"])
admin_router.include_router(admin_process.router, prefix="/process", tags=["admin"])

# Include public routes
public_router = APIRouter(prefix="/public")
public_router.include_router(centers.router, prefix="/centers", tags=["public"])
public_router.include_router(insurance.router, prefix="/insurance", tags=["public"])
public_router.include_router(public_search.router, prefix="/search", tags=["public"])

# Add routers to main router
router.include_router(admin_router)
router.include_router(public_router)