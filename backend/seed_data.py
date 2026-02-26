import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def seed_database():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    # Clear existing data
    await db.products.delete_many({})
    await db.blog.delete_many({})
    
    # Seed products
    products = [
        {
            "id": "product_1",
            "name": "Enchanted Forest",
            "description": "A mystical terrarium featuring lush moss, ferns, and miniature fairy figurines creating a magical woodland scene.",
            "price": 49.99,
            "image": "/ablak.jpg",
            "category": "terrarium",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "product_2",
            "name": "Fairy's Haven",
            "description": "Delicate air plants and crystals come together in this whimsical display, perfect for bringing magic to any space.",
            "price": 39.99,
            "image": "/ablak.jpg",
            "category": "terrarium",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "product_3",
            "name": "Mystic Garden",
            "description": "A stunning arrangement of succulents and colorful stones in a geometric glass vessel, radiating natural beauty.",
            "price": 54.99,
            "image": "/ablak.jpg",
            "category": "terrarium",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "product_4",
            "name": "DIY Starter Kit",
            "description": "Everything you need to create your own magical terrarium, including glass vessel, soil, plants, and decorations.",
            "price": 34.99,
            "image": "/ablak.jpg",
            "category": "diy-kit",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "product_5",
            "name": "Premium Collection",
            "description": "Our largest terrarium featuring a diverse ecosystem with rare plants and hand-crafted miniature elements.",
            "price": 89.99,
            "image": "/ablak.jpg",
            "category": "terrarium",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "product_6",
            "name": "Desktop Magic",
            "description": "A compact terrarium perfect for your workspace, bringing a touch of nature and tranquility to your desk.",
            "price": 29.99,
            "image": "/ablak.jpg",
            "category": "terrarium",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    await db.products.insert_many(products)
    print(f"✓ Inserted {len(products)} products")
    
    # Seed blog posts
    blog_posts = [
        {
            "id": "blog_1",
            "title": "The Art of Terrarium Care: A Beginner's Guide",
            "excerpt": "Learn the essential tips and tricks for keeping your terrarium thriving. From watering schedules to light requirements, we cover everything you need to know.",
            "content": "Full blog post content here...",
            "image": "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=800",
            "author": "Emma Green",
            "published_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "blog_2",
            "title": "Choosing the Perfect Plants for Your Miniature Garden",
            "excerpt": "Not all plants are suitable for terrariums. Discover which species thrive in enclosed environments and create stunning visual displays.",
            "content": "Full blog post content here...",
            "image": "https://images.unsplash.com/photo-1703615230006-518a7d799016?auto=format&fit=crop&w=800&q=80",
            "author": "Oliver Forest",
            "published_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "blog_3",
            "title": "Creating Magical Scenes: Design Tips from Our Experts",
            "excerpt": "Transform your terrarium from simple to spectacular with our professional design techniques and creative inspiration.",
            "content": "Full blog post content here...",
            "image": "https://images.unsplash.com/photo-1655623454749-0a90b1f514fc?auto=format&fit=crop&w=800&q=80",
            "author": "Lily Bloom",
            "published_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    await db.blog.insert_many(blog_posts)
    print(f"✓ Inserted {len(blog_posts)} blog posts")
    
    client.close()
    print("✓ Database seeding complete!")

if __name__ == "__main__":
    asyncio.run(seed_database())
