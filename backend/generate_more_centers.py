import asyncio
import sys
import os
import random
from datetime import datetime

# Add the parent directory to the path so we can import from the backend package
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database.connection import init_db, db, close_db

async def generate_more_centers():
    """Generate more medical centers data"""
    # Initialize database connection
    await init_db()
    
    if db is None:
        print("Failed to initialize database connection")
        return
    
    # Check current number of centers
    try:
        current_count = await db.medical_centers.count_documents({})
        print(f"Current number of medical centers: {current_count}")
    except Exception as e:
        print(f"Error checking existing data: {e}")
        await close_db()
        return
    
    # Define more medical centers to add
    additional_centers = []
    
    # Cities and provinces to use
    cities_provinces = [
        ("تهران", "تهران"),
        ("اصفهان", "اصفهان"),
        ("شیراز", "فارس"),
        ("تبریز", "آذربایجان شرقی"),
        ("مشهد", "خراسان رضوی"),
        ("اهواز", "خوزستان"),
        ("کرج", "البرز"),
        ("قم", "قم"),
        ("کرمانشاه", "کرمانشاه"),
        ("ارومیه", "آذربایجان غربی"),
        ("رشت", "گیلان"),
        ("زاهدان", "سیستان و بلوچستان"),
        ("کرمان", "کرمان"),
        ("اردبیل", "اردبیل"),
        ("همدان", "همدان")
    ]
    
    # Services to use
    services = [
        "dentistry", "imaging", "lab", "general", "specialist",
        "orthodontics", "mri", "ctscan", "blood_test", "urine_test",
        "gynecology", "ultrasound", "cosmetic_dentistry", "optometry",
        "lasik", "physiotherapy", "occupational_therapy", "vaccination",
        "checkup", "genetic_test", "hormone_test", "dna_test"
    ]
    
    # Generate 100 more centers
    for i in range(100):
        center_id = f"center{current_count + i + 1}"
        city, province = random.choice(cities_provinces)
        
        # Generate center name
        center_names = [
            f"کلینیک {city} {random.choice(['شمال', 'جنوب', 'شرق', 'غرب', 'مرکز'])}",
            f"مرکز درمانی {city}",
            f"کلینیک تخصصی {city}",
            f"مرکز سلامت {province}",
            f"کلینیک پیشرفته {city}"
        ]
        
        center_name = random.choice(center_names)
        
        # Generate address
        streets = [
            "خیابان ولیعصر", "خیابان انقلاب", "خیابان فردوسی", 
            "خیابان مفتح", "خیابان جمهوری", "خیابان شریعتی",
            "میدان تجریش", "میدان ونک", "میدان آزادی", 
            "خیابان کریمخان", "خیابان میرداماد", "خیابان جمهوری اسلامی"
        ]
        
        address = f"{city}، {random.choice(streets)}، پلاک {random.randint(1, 500)}"
        
        # Generate phone number
        phone = f"0{random.randint(21, 99)}{random.randint(1000000, 9999999)}"
        
        # Select random services (3-7 services)
        selected_services = random.sample(services, random.randint(3, 7))
        
        additional_centers.append({
            "id": center_id,
            "name": center_name,
            "address": address,
            "city": city,
            "province": province,
            "phone": phone,
            "services": selected_services,
            "created_at": datetime.utcnow()
        })
    
    # Insert additional medical centers
    try:
        if additional_centers:
            result = await db.medical_centers.insert_many(additional_centers)
            print(f"Inserted {len(result.inserted_ids)} additional medical centers")
            print(f"Total medical centers now: {current_count + len(result.inserted_ids)}")
        else:
            print("No additional centers to insert")
    except Exception as e:
        print(f"Error inserting additional medical centers: {e}")
        await close_db()
        return
    
    # Close database connection
    await close_db()

if __name__ == "__main__":
    asyncio.run(generate_more_centers())