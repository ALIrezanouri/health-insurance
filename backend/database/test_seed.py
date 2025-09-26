import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from config import settings
from datetime import datetime

async def test_seed():
    """Test script to seed the database with initial data"""
    # Initialize database connection
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    db = client[settings.MONGODB_DB]
    
    # Create indexes for better performance
    await db.medical_centers.create_index([("location", "2dsphere")])
    await db.medical_centers.create_index([("name", 1)])
    await db.medical_centers.create_index([("services", 1)])
    await db.insurance_contracts.create_index([("center_id", 1), ("insurance_id", 1)])
    
    # Check if we already have insurance companies
    count = await db.insurance_companies.count_documents({})
    
    # Clear existing data for a fresh start
    await db.insurance_companies.delete_many({})
    await db.medical_centers.delete_many({})
    await db.insurance_contracts.delete_many({})
    
    # Add sample insurance companies
    insurance_companies = [
        {
            "id": "asia123",
            "name": "بیمه آسیا",
            "logo_url": None,
            "website": "https://www.asiainsurance.ir",
            "created_at": datetime.utcnow()
        },
        {
            "id": "saman456",
            "name": "بیمه سامان",
            "logo_url": None,
            "website": "https://www.samaninsurance.ir",
            "created_at": datetime.utcnow()
        },
        {
            "id": "parsian789",
            "name": "بیمه پارسیان",
            "logo_url": None,
            "website": "https://www.parsianinsurance.ir",
            "created_at": datetime.utcnow()
        },
        {
            "id": "novin123",
            "name": "بیمه نوین",
            "logo_url": None,
            "website": "https://www.novininsurance.ir",
            "created_at": datetime.utcnow()
        }
    ]
    
    # Insert insurance companies
    result = await db.insurance_companies.insert_many(insurance_companies)
    print(f"Inserted {len(result.inserted_ids)} insurance companies")
    
    # Add some sample medical centers
    medical_centers = [
        {
            "id": "center1",
            "name": "کلینیک دندانپزشکی تهران",
            "address": "تهران، خیابان ولیعصر، پلاک 123",
            "location": {"type": "Point", "coordinates": [51.4215, 35.6940]},  # Tehran coordinates
            "phone": "02112345678",
            "services": ["dentistry", "orthodontics"],
            "created_at": datetime.utcnow()
        },
        {
            "id": "center2",
            "name": "مرکز تصویربرداری پرشیا",
            "address": "تهران، میدان تجریش، خیابان تجریش، پلاک 45",
            "location": {"type": "Point", "coordinates": [51.4285, 35.7965]},  # Tehran coordinates
            "phone": "02187654321",
            "services": ["imaging", "mri", "ctscan"],
            "created_at": datetime.utcnow()
        },
        {
            "id": "center3",
            "name": "آزمایشگاه مرکزی تهران",
            "address": "تهران، خیابان انقلاب، پلاک 200",
            "location": {"type": "Point", "coordinates": [51.4394, 35.6997]},  # Tehran coordinates
            "phone": "02155667788",
            "services": ["lab", "blood_test", "urine_test"],
            "created_at": datetime.utcnow()
        }
    ]
    
    # Insert medical centers
    result = await db.medical_centers.insert_many(medical_centers)
    print(f"Inserted {len(result.inserted_ids)} medical centers")
    
    # Add some sample insurance contracts
    insurance_contracts = [
        {
            "center_id": "center1",
            "insurance_id": "asia123",
            "accepted_services": ["dentistry"],
            "contract_status": "active",
            "last_verified": datetime.utcnow()
        },
        {
            "center_id": "center1",
            "insurance_id": "saman456",
            "accepted_services": ["dentistry", "orthodontics"],
            "contract_status": "active",
            "last_verified": datetime.utcnow()
        },
        {
            "center_id": "center2",
            "insurance_id": "parsian789",
            "accepted_services": ["imaging", "mri"],
            "contract_status": "active",
            "last_verified": datetime.utcnow()
        },
        {
            "center_id": "center3",
            "insurance_id": "novin123",
            "accepted_services": ["lab", "blood_test"],
            "contract_status": "active",
            "last_verified": datetime.utcnow()
        }
    ]
    
    # Insert insurance contracts
    result = await db.insurance_contracts.insert_many(insurance_contracts)
    print(f"Inserted {len(result.inserted_ids)} insurance contracts")
    
    # Close database connection
    client.close()

if __name__ == "__main__":
    asyncio.run(test_seed())