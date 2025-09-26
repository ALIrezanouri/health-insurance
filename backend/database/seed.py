import asyncio
import sys
import os

# Add the parent directory to the path so we can import from the backend package
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.connection import init_db, db, close_db
from database.models import InsuranceCompany
from datetime import datetime

async def seed_database():
    """Seed the database with initial data"""
    # Initialize database connection
    await init_db()
    
    if db is None:
        print("Failed to initialize database connection")
        return
    
    # Check if we already have insurance companies
    try:
        count = await db.insurance_companies.count_documents({})
    except Exception as e:
        print(f"Error checking existing data: {e}")
        await close_db()
        return
    
    if count == 0:
        # Add more insurance companies
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
            },
            {
                "id": "iran1234",
                "name": "بیمه ایران",
                "logo_url": None,
                "website": "https://www.iraninsurance.ir",
                "created_at": datetime.utcnow()
            },
            {
                "id": "alborz567",
                "name": "بیمه البرز",
                "logo_url": None,
                "website": "https://www.alborzinsurance.ir",
                "created_at": datetime.utcnow()
            },
            {
                "id": "dana890",
                "name": "بیمه دانا",
                "logo_url": None,
                "website": "https://www.danainsurance.ir",
                "created_at": datetime.utcnow()
            },
            {
                "id": "mellat111",
                "name": "بیمه ملت",
                "logo_url": None,
                "website": "https://www.mellatinsurance.ir",
                "created_at": datetime.utcnow()
            }
        ]
        
        # Insert insurance companies
        try:
            result = await db.insurance_companies.insert_many(insurance_companies)
            print(f"Inserted {len(result.inserted_ids)} insurance companies")
        except Exception as e:
            print(f"Error inserting insurance companies: {e}")
            await close_db()
            return
    else:
        print("Database already seeded with insurance companies")
    
    # Check if we already have medical centers
    try:
        center_count = await db.medical_centers.count_documents({})
    except Exception as e:
        print(f"Error checking existing medical centers: {e}")
        await close_db()
        return
    
    if center_count == 0:
        # Add more medical centers across different cities
        medical_centers = [
            # Tehran centers
            {
                "id": "center1",
                "name": "کلینیک دندانپزشکی تهران",
                "address": "تهران، خیابان ولیعصر، پلاک 123",
                "city": "تهران",
                "province": "تهران",
                "phone": "02112345678",
                "services": ["dentistry", "orthodontics"],
                "created_at": datetime.utcnow()
            },
            {
                "id": "center2",
                "name": "مرکز تصویربرداری پرشیا",
                "address": "تهران، میدان تجریش، خیابان تجریش، پلاک 45",
                "city": "تهران",
                "province": "تهران",
                "phone": "02187654321",
                "services": ["imaging", "mri", "ctscan"],
                "created_at": datetime.utcnow()
            },
            {
                "id": "center3",
                "name": "آزمایشگاه مرکزی تهران",
                "address": "تهران، خیابان انقلاب، پلاک 200",
                "city": "تهران",
                "province": "تهران",
                "phone": "02155667788",
                "services": ["lab", "blood_test", "urine_test"],
                "created_at": datetime.utcnow()
            },
            {
                "id": "center4",
                "name": "کلینیک فیزیوتراپی تهران",
                "address": "تهران، خیابان شریعتی، پلاک 300",
                "city": "تهران",
                "province": "تهران",
                "phone": "02166778899",
                "services": ["physiotherapy", "massage"],
                "created_at": datetime.utcnow()
            },
            {
                "id": "center5",
                "name": "مرکز سلامت زنان تهران",
                "address": "تهران، خیابان میرداماد، پلاک 150",
                "city": "تهران",
                "province": "تهران",
                "phone": "02177889900",
                "services": ["gynecology", "ultrasound"],
                "created_at": datetime.utcnow()
            },
            # Isfahan centers
            {
                "id": "center6",
                "name": "کلینیک دندانپزشکی اصفهان",
                "address": "اصفهان، میدان نقش جهان، پلاک 10",
                "city": "اصفهان",
                "province": "اصفهان",
                "phone": "03131234567",
                "services": ["dentistry", "cosmetic_dentistry"],
                "created_at": datetime.utcnow()
            },
            {
                "id": "center7",
                "name": "مرکز تصویربرداری اصفهان",
                "address": "اصفهان، خیابان جاده سلطانی، پلاک 50",
                "city": "اصفهان",
                "province": "اصفهان",
                "phone": "03132345678",
                "services": ["imaging", "mri", "ultrasound"],
                "created_at": datetime.utcnow()
            },
            # Shiraz centers
            {
                "id": "center8",
                "name": "آزمایشگاه مرکزی شیراز",
                "address": "شیراز، میدان قرآن، پلاک 20",
                "city": "شیراز",
                "province": "فارس",
                "phone": "07131112233",
                "services": ["lab", "blood_test", "dna_test"],
                "created_at": datetime.utcnow()
            },
            {
                "id": "center9",
                "name": "کلینیک چشم پزشکی شیراز",
                "address": "شیراز، خیابان زند، پلاک 75",
                "city": "شیراز",
                "province": "فارس",
                "phone": "07132223344",
                "services": ["optometry", "lasik", "cataract"],
                "created_at": datetime.utcnow()
            },
            # Mashhad centers
            {
                "id": "center10",
                "name": "مرکز سلامت مشهد",
                "address": "مشهد، خیابان امام رضا، پلاک 100",
                "city": "مشهد",
                "province": "خراسان رضوی",
                "phone": "05131112233",
                "services": ["general_medicine", "vaccination", "checkup"],
                "created_at": datetime.utcnow()
            },
            {
                "id": "center11",
                "name": "کلینیک توانبخشی مشهد",
                "address": "مشهد، میدان معلم، پلاک 30",
                "city": "مشهد",
                "province": "خراسان رضوی",
                "phone": "05132223344",
                "services": ["physiotherapy", "occupational_therapy"],
                "created_at": datetime.utcnow()
            },
            {
                "id": "center12",
                "name": "آزمایشگاه پیشرفته مشهد",
                "address": "مشهد، خیابان فردوسی، پلاک 200",
                "city": "مشهد",
                "province": "خراسان رضوی",
                "phone": "05133334455",
                "services": ["lab", "genetic_test", "hormone_test"],
                "created_at": datetime.utcnow()
            }
        ]
        
        # Insert medical centers
        try:
            result = await db.medical_centers.insert_many(medical_centers)
            print(f"Inserted {len(result.inserted_ids)} medical centers")
        except Exception as e:
            print(f"Error inserting medical centers: {e}")
            await close_db()
            return
    else:
        print("Database already seeded with medical centers")
    
    # Check if we already have insurance contracts
    try:
        contract_count = await db.insurance_contracts.count_documents({})
    except Exception as e:
        print(f"Error checking existing insurance contracts: {e}")
        await close_db()
        return
    
    if contract_count == 0:
        # Add more insurance contracts
        insurance_contracts = [
            # Tehran center contracts
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
                "center_id": "center1",
                "insurance_id": "parsian789",
                "accepted_services": ["dentistry", "cosmetic_dentistry"],
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
                "center_id": "center2",
                "insurance_id": "novin123",
                "accepted_services": ["imaging", "ctscan"],
                "contract_status": "active",
                "last_verified": datetime.utcnow()
            },
            {
                "center_id": "center3",
                "insurance_id": "novin123",
                "accepted_services": ["lab", "blood_test"],
                "contract_status": "active",
                "last_verified": datetime.utcnow()
            },
            {
                "center_id": "center3",
                "insurance_id": "iran1234",
                "accepted_services": ["lab", "urine_test", "blood_test"],
                "contract_status": "active",
                "last_verified": datetime.utcnow()
            },
            {
                "center_id": "center4",
                "insurance_id": "alborz567",
                "accepted_services": ["physiotherapy"],
                "contract_status": "active",
                "last_verified": datetime.utcnow()
            },
            {
                "center_id": "center5",
                "insurance_id": "dana890",
                "accepted_services": ["gynecology", "ultrasound"],
                "contract_status": "active",
                "last_verified": datetime.utcnow()
            },
            {
                "center_id": "center5",
                "insurance_id": "mellat111",
                "accepted_services": ["gynecology"],
                "contract_status": "active",
                "last_verified": datetime.utcnow()
            },
            
            # Isfahan center contracts
            {
                "center_id": "center6",
                "insurance_id": "asia123",
                "accepted_services": ["dentistry"],
                "contract_status": "active",
                "last_verified": datetime.utcnow()
            },
            {
                "center_id": "center6",
                "insurance_id": "saman456",
                "accepted_services": ["dentistry", "cosmetic_dentistry"],
                "contract_status": "active",
                "last_verified": datetime.utcnow()
            },
            {
                "center_id": "center7",
                "insurance_id": "parsian789",
                "accepted_services": ["imaging", "mri", "ultrasound"],
                "contract_status": "active",
                "last_verified": datetime.utcnow()
            },
            {
                "center_id": "center7",
                "insurance_id": "novin123",
                "accepted_services": ["imaging"],
                "contract_status": "active",
                "last_verified": datetime.utcnow()
            },
            
            # Shiraz center contracts
            {
                "center_id": "center8",
                "insurance_id": "iran1234",
                "accepted_services": ["lab", "blood_test", "dna_test"],
                "contract_status": "active",
                "last_verified": datetime.utcnow()
            },
            {
                "center_id": "center8",
                "insurance_id": "alborz567",
                "accepted_services": ["lab"],
                "contract_status": "active",
                "last_verified": datetime.utcnow()
            },
            {
                "center_id": "center9",
                "insurance_id": "dana890",
                "accepted_services": ["optometry", "lasik"],
                "contract_status": "active",
                "last_verified": datetime.utcnow()
            },
            
            # Mashhad center contracts
            {
                "center_id": "center10",
                "insurance_id": "mellat111",
                "accepted_services": ["general_medicine", "checkup"],
                "contract_status": "active",
                "last_verified": datetime.utcnow()
            },
            {
                "center_id": "center10",
                "insurance_id": "asia123",
                "accepted_services": ["vaccination"],
                "contract_status": "active",
                "last_verified": datetime.utcnow()
            },
            {
                "center_id": "center11",
                "insurance_id": "saman456",
                "accepted_services": ["physiotherapy"],
                "contract_status": "active",
                "last_verified": datetime.utcnow()
            },
            {
                "center_id": "center12",
                "insurance_id": "parsian789",
                "accepted_services": ["lab", "genetic_test"],
                "contract_status": "active",
                "last_verified": datetime.utcnow()
            }
        ]
        
        # Insert insurance contracts
        try:
            result = await db.insurance_contracts.insert_many(insurance_contracts)
            print(f"Inserted {len(result.inserted_ids)} insurance contracts")
        except Exception as e:
            print(f"Error inserting insurance contracts: {e}")
            await close_db()
            return
    else:
        print("Database already seeded with insurance contracts")
    
    # Close database connection
    await close_db()

if __name__ == "__main__":
    asyncio.run(seed_database())