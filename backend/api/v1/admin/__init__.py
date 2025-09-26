from fastapi import APIRouter
from . import centers, insurance, contracts

router = APIRouter(prefix="/admin")

router.include_router(centers.router, prefix="/centers", tags=["admin-centers"])
router.include_router(insurance.router, prefix="/insurance", tags=["admin-insurance"])
router.include_router(contracts.router, prefix="/contracts", tags=["admin-contracts"])