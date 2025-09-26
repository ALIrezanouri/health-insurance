import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

async def verify_data():
    """Script to verify data insertion"""
    # Initialize database connection
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    db = client[settings.MONGODB_DB]
    
    # Count documents in each collection
    insurance_count = await db.insurance_companies.count_documents({})
    centers_count = await db.medical_centers.count_documents({})
    contracts_count = await db.insurance_contracts.count_documents({})
    
    print(f"Insurance companies: {insurance_count}")
    print(f"Medical centers: {centers_count}")
    print(f"Insurance contracts: {contracts_count}")
    
    # Show sample data
    if insurance_count > 0:
        print("\nSample insurance companies:")
        async for company in db.insurance_companies.find().limit(3):
            print(f"- {company['name']}")
    
    if centers_count > 0:
        print("\nSample medical centers:")
        async for center in db.medical_centers.find().limit(3):
            print(f"- {center['name']} ({', '.join(center['services'])})")
    
    # Close database connection
    client.close()

if __name__ == "__main__":
    asyncio.run(verify_data())