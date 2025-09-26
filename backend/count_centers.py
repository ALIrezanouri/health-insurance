import asyncio
from database.connection import init_db, db, close_db

async def count_centers():
    await init_db()
    count = await db.medical_centers.count_documents({})
    print(f"Medical centers in database: {count}")
    await close_db()

if __name__ == "__main__":
    asyncio.run(count_centers())