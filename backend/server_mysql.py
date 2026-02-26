from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import pymysql
import pymysql.cursors
import os
import uuid
from datetime import datetime, timezone
import json

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Database configuration
DB_CONFIG = {
    'host': os.environ.get('DB_HOST', 'localhost'),
    'user': os.environ.get('DB_USER'),
    'password': os.environ.get('DB_PASSWORD'),
    'database': os.environ.get('DB_NAME'),
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor
}

def get_db():
    return pymysql.connect(**DB_CONFIG)

def init_db():
    """Create tables if they don't exist"""
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            # Products table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS products (
                    id VARCHAR(36) PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    description TEXT,
                    price DECIMAL(10,2) NOT NULL,
                    image VARCHAR(500),
                    category VARCHAR(100),
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Cart table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS cart (
                    id VARCHAR(36) PRIMARY KEY,
                    session_id VARCHAR(100) NOT NULL,
                    product_id VARCHAR(36) NOT NULL,
                    product_name VARCHAR(255),
                    product_price DECIMAL(10,2),
                    product_image VARCHAR(500),
                    quantity INT DEFAULT 1,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_session (session_id)
                )
            ''')
            
            # Contacts table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS contacts (
                    id VARCHAR(36) PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    company VARCHAR(255),
                    message TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Workshops table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS workshops (
                    id VARCHAR(36) PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    phone VARCHAR(50),
                    workshop_type VARCHAR(100),
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Newsletter table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS newsletter (
                    id VARCHAR(36) PRIMARY KEY,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Custom terrarium orders table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS custom_terrariums (
                    id VARCHAR(36) PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    size VARCHAR(50),
                    glass_type VARCHAR(50),
                    world VARCHAR(100),
                    lighting BOOLEAN DEFAULT FALSE,
                    message TEXT,
                    calculated_price DECIMAL(10,2),
                    deposit_amount DECIMAL(10,2),
                    subscribed_to_newsletter BOOLEAN DEFAULT FALSE,
                    status VARCHAR(50) DEFAULT 'pending',
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Blog posts table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS blog (
                    id VARCHAR(36) PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    excerpt TEXT,
                    content LONGTEXT,
                    image VARCHAR(500),
                    author VARCHAR(255),
                    published_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
        conn.commit()
    finally:
        conn.close()

# Initialize database on startup
try:
    init_db()
    print("Database tables initialized successfully")
except Exception as e:
    print(f"Database initialization error: {e}")

app = FastAPI()
api_router = APIRouter()

# Pydantic models
class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    price: float
    image: str
    category: str
    created_at: Optional[datetime] = None

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    image: str
    category: str

class CartItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    product_id: str
    product_name: str
    product_price: float
    product_image: str
    quantity: int = 1

class CartItemCreate(BaseModel):
    session_id: str
    product_id: str
    product_name: str
    product_price: float
    product_image: str
    quantity: int = 1

class ContactForm(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: str

class ContactFormCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: str

class WorkshopRegistration(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    workshop_type: str

class WorkshopRegistrationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    workshop_type: str

class NewsletterSubscription(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr

class NewsletterSubscriptionCreate(BaseModel):
    email: EmailStr

class CustomTerrariumOrder(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    size: str
    glass_type: str
    world: str
    lighting: bool
    message: Optional[str] = None
    calculated_price: float
    deposit_amount: Optional[float] = None
    subscribed_to_newsletter: bool = False
    status: str = "pending"

class CustomTerrariumOrderCreate(BaseModel):
    name: str
    email: EmailStr
    size: str
    glass_type: str
    world: str
    lighting: bool
    message: Optional[str] = None
    calculated_price: float
    deposit_amount: Optional[float] = None
    subscribed_to_newsletter: bool = False

class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    content: str
    image: str
    author: str
    published_at: Optional[datetime] = None

class BlogPostCreate(BaseModel):
    title: str
    excerpt: str
    content: str
    image: str
    author: str

# Routes
@api_router.get("/")
async def root():
    return {"message": "Fairygarden For You API"}

@api_router.get("/products", response_model=List[Product])
async def get_products():
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM products ORDER BY created_at DESC")
            products = cursor.fetchall()
            return products
    finally:
        conn.close()

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM products WHERE id = %s", (product_id,))
            product = cursor.fetchone()
            if not product:
                raise HTTPException(status_code=404, detail="Product not found")
            return product
    finally:
        conn.close()

@api_router.post("/products", response_model=Product)
async def create_product(product: ProductCreate):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            product_id = str(uuid.uuid4())
            cursor.execute(
                "INSERT INTO products (id, name, description, price, image, category) VALUES (%s, %s, %s, %s, %s, %s)",
                (product_id, product.name, product.description, product.price, product.image, product.category)
            )
        conn.commit()
        return {**product.model_dump(), "id": product_id}
    finally:
        conn.close()

@api_router.get("/cart/{session_id}", response_model=List[CartItem])
async def get_cart(session_id: str):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM cart WHERE session_id = %s", (session_id,))
            items = cursor.fetchall()
            return items
    finally:
        conn.close()

@api_router.post("/cart", response_model=CartItem)
async def add_to_cart(cart_item: CartItemCreate):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            # Check if item exists
            cursor.execute(
                "SELECT * FROM cart WHERE session_id = %s AND product_id = %s",
                (cart_item.session_id, cart_item.product_id)
            )
            existing = cursor.fetchone()
            
            if existing:
                new_quantity = existing['quantity'] + cart_item.quantity
                cursor.execute(
                    "UPDATE cart SET quantity = %s WHERE id = %s",
                    (new_quantity, existing['id'])
                )
                conn.commit()
                return {**existing, "quantity": new_quantity}
            else:
                item_id = str(uuid.uuid4())
                cursor.execute(
                    "INSERT INTO cart (id, session_id, product_id, product_name, product_price, product_image, quantity) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                    (item_id, cart_item.session_id, cart_item.product_id, cart_item.product_name, cart_item.product_price, cart_item.product_image, cart_item.quantity)
                )
                conn.commit()
                return {**cart_item.model_dump(), "id": item_id}
    finally:
        conn.close()

@api_router.delete("/cart/{session_id}/{product_id}")
async def remove_from_cart(session_id: str, product_id: str):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                "DELETE FROM cart WHERE session_id = %s AND product_id = %s",
                (session_id, product_id)
            )
        conn.commit()
        return {"message": "Item removed from cart"}
    finally:
        conn.close()

@api_router.delete("/cart/{session_id}")
async def clear_cart(session_id: str):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute("DELETE FROM cart WHERE session_id = %s", (session_id,))
        conn.commit()
        return {"message": "Cart cleared"}
    finally:
        conn.close()

@api_router.post("/contact", response_model=ContactForm)
async def submit_contact(contact: ContactFormCreate):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            contact_id = str(uuid.uuid4())
            cursor.execute(
                "INSERT INTO contacts (id, name, email, company, message) VALUES (%s, %s, %s, %s, %s)",
                (contact_id, contact.name, contact.email, contact.company, contact.message)
            )
        conn.commit()
        return {**contact.model_dump(), "id": contact_id}
    finally:
        conn.close()

@api_router.post("/workshop/register", response_model=WorkshopRegistration)
async def register_workshop(registration: WorkshopRegistrationCreate):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            reg_id = str(uuid.uuid4())
            cursor.execute(
                "INSERT INTO workshops (id, name, email, phone, workshop_type) VALUES (%s, %s, %s, %s, %s)",
                (reg_id, registration.name, registration.email, registration.phone, registration.workshop_type)
            )
        conn.commit()
        return {**registration.model_dump(), "id": reg_id}
    finally:
        conn.close()

@api_router.post("/newsletter/subscribe", response_model=NewsletterSubscription)
async def subscribe_newsletter(subscription: NewsletterSubscriptionCreate):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            # Check if already subscribed
            cursor.execute("SELECT * FROM newsletter WHERE email = %s", (subscription.email,))
            if cursor.fetchone():
                raise HTTPException(status_code=400, detail="Email already subscribed")
            
            sub_id = str(uuid.uuid4())
            cursor.execute(
                "INSERT INTO newsletter (id, email) VALUES (%s, %s)",
                (sub_id, subscription.email)
            )
        conn.commit()
        return {**subscription.model_dump(), "id": sub_id}
    finally:
        conn.close()

@api_router.post("/custom-terrarium", response_model=CustomTerrariumOrder)
async def create_custom_terrarium_order(order: CustomTerrariumOrderCreate):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            order_id = str(uuid.uuid4())
            cursor.execute(
                """INSERT INTO custom_terrariums 
                (id, name, email, size, glass_type, world, lighting, message, calculated_price, deposit_amount, subscribed_to_newsletter) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
                (order_id, order.name, order.email, order.size, order.glass_type, order.world, 
                 order.lighting, order.message, order.calculated_price, order.deposit_amount, order.subscribed_to_newsletter)
            )
            
            # Also subscribe to newsletter if requested
            if order.subscribed_to_newsletter:
                cursor.execute("SELECT * FROM newsletter WHERE email = %s", (order.email,))
                if not cursor.fetchone():
                    cursor.execute(
                        "INSERT INTO newsletter (id, email) VALUES (%s, %s)",
                        (str(uuid.uuid4()), order.email)
                    )
        conn.commit()
        return {**order.model_dump(), "id": order_id, "status": "pending"}
    finally:
        conn.close()

@api_router.get("/custom-terrarium", response_model=List[CustomTerrariumOrder])
async def get_custom_terrarium_orders():
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM custom_terrariums ORDER BY created_at DESC")
            orders = cursor.fetchall()
            return orders
    finally:
        conn.close()

@api_router.get("/blog/posts", response_model=List[BlogPost])
async def get_blog_posts():
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM blog ORDER BY published_at DESC LIMIT 10")
            posts = cursor.fetchall()
            return posts
    finally:
        conn.close()

@api_router.post("/blog/posts", response_model=BlogPost)
async def create_blog_post(post: BlogPostCreate):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            post_id = str(uuid.uuid4())
            cursor.execute(
                "INSERT INTO blog (id, title, excerpt, content, image, author) VALUES (%s, %s, %s, %s, %s, %s)",
                (post_id, post.title, post.excerpt, post.content, post.image, post.author)
            )
        conn.commit()
        return {**post.model_dump(), "id": post_id}
    finally:
        conn.close()

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
