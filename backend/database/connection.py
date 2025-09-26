from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

# Global variables for database connection
client = None
db = None

async def init_db():
    """Initialize database connection"""
    global client, db

    try:
        client = AsyncIOMotorClient(settings.MONGODB_URL)
        db = client[settings.MONGODB_DB]

        # Test the connection
        await db.command('ping')
        print(f"Successfully connected to MongoDB: {settings.MONGODB_DB}")

        # Create indexes for better performance
        await db.medical_centers.create_index([("location", "2dsphere")])
        await db.medical_centers.create_index([("name", 1)])
        await db.medical_centers.create_index([("services", 1)])
        await db.insurance_contracts.create_index([("center_id", 1), ("insurance_id", 1)])

    except Exception as e:
        print(f"Failed to initialize database: {e}")
        raise

async def close_db():
    """Close database connection"""
    global client
    if client:
        client.close()

def get_db():
    """Get database instance"""
    if db is None:
        raise RuntimeError("Database not initialized. Call init_db() first.")
    return db
