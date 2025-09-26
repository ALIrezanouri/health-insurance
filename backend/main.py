from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v1.public import centers, insurance
from api.v1.admin import router as admin_router
from database.connection import init_db, close_db
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database connection
    await init_db()
    yield
    # Close database connection
    await close_db()

app = FastAPI(lifespan=lifespan, title="HealthInsurance Hub API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include public API routes
app.include_router(centers.router, prefix="/api/v1/public/centers", tags=["centers"])
app.include_router(insurance.router, prefix="/api/v1/public/insurance", tags=["insurance"])

# Include admin API routes
app.include_router(admin_router, prefix="/api/v1", tags=["admin"])

@app.get("/")
async def root():
    return {"message": "HealthInsurance Hub API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}