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
import logging
import time
import asyncio
import hashlib
from datetime import datetime, timezone
import json as json_module
from woocommerce import API as WooCommerceAPI

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MySQL Database
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
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute('''CREATE TABLE IF NOT EXISTS cart (
                id VARCHAR(36) PRIMARY KEY,
                session_id VARCHAR(100) NOT NULL,
                product_id VARCHAR(36) NOT NULL,
                product_name VARCHAR(255),
                product_price DECIMAL(10,2),
                product_image VARCHAR(500),
                quantity INT DEFAULT 1,
                variation_id INT DEFAULT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_session (session_id)
            )''')
            cursor.execute('''CREATE TABLE IF NOT EXISTS contacts (
                id VARCHAR(36) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                company VARCHAR(255),
                message TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )''')
            cursor.execute('''CREATE TABLE IF NOT EXISTS workshops (
                id VARCHAR(36) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50),
                workshop_type VARCHAR(100),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )''')
            cursor.execute('''CREATE TABLE IF NOT EXISTS newsletter (
                id VARCHAR(36) PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )''')
            cursor.execute('''CREATE TABLE IF NOT EXISTS custom_terrariums (
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
            )''')
            cursor.execute('''CREATE TABLE IF NOT EXISTS blog (
                id VARCHAR(36) PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                excerpt TEXT,
                content LONGTEXT,
                image VARCHAR(500),
                author VARCHAR(255),
                published_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )''')
            cursor.execute('''CREATE TABLE IF NOT EXISTS customer_sessions (
                id VARCHAR(36) PRIMARY KEY,
                customer_id INT NOT NULL,
                email VARCHAR(255),
                token VARCHAR(255) UNIQUE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_token (token),
                INDEX idx_customer (customer_id)
            )''')
        conn.commit()
        logger.info("Database tables initialized")
    except Exception as e:
        logger.error(f"Database init error: {e}")
    finally:
        conn.close()

try:
    init_db()
except Exception as e:
    logger.error(f"Could not initialize database: {e}")

# WooCommerce API Setup
wc_url = os.environ.get('WOOCOMMERCE_URL', '')
wc_key = os.environ.get('WOOCOMMERCE_CONSUMER_KEY', '')
wc_secret = os.environ.get('WOOCOMMERCE_CONSUMER_SECRET', '')

wcapi = None
if wc_url and wc_key and wc_secret:
    wcapi = WooCommerceAPI(url=wc_url, consumer_key=wc_key, consumer_secret=wc_secret, version="wc/v3", timeout=30)
    logger.info("WooCommerce API configured")
else:
    logger.warning("WooCommerce credentials missing")

# ========== File-Based Product Cache ==========
CACHE_DIR = Path(__file__).parent / 'product_cache'
CACHE_DIR.mkdir(exist_ok=True)
CACHE_REFRESH_INTERVAL = 600
_bg_task_started = False

def _cache_file(lang: str, product_type: str) -> Path:
    return CACHE_DIR / f"{lang}_{product_type or 'all'}.json"

def get_cached_products_file(lang: str, product_type: str):
    f = _cache_file(lang, product_type)
    if f.exists():
        try:
            data = json_module.loads(f.read_text(encoding='utf-8'))
            if data and len(data) > 0:
                return data
        except Exception as e:
            logger.error(f"Cache read error: {e}")
    if lang != 'en':
        fallback = _cache_file('en', product_type)
        if fallback.exists():
            try:
                data = json_module.loads(fallback.read_text(encoding='utf-8'))
                if data and len(data) > 0:
                    logger.info(f"Serving English fallback for ({lang}, {product_type or 'all'})")
                    return data
            except Exception:
                pass
    return None

def set_cached_products_file(lang: str, product_type: str, data: list):
    f = _cache_file(lang, product_type)
    try:
        f.write_text(json_module.dumps(data, ensure_ascii=False), encoding='utf-8')
        logger.info(f"Cache saved: {f.name} -> {len(data)} products")
    except Exception as e:
        logger.error(f"Cache write error: {e}")

def get_translated_field(product: dict, field: str, lang: str) -> str:
    if lang == 'en':
        if field == 'name':
            return product.get('name', '')
        elif field == 'description':
            return product.get('short_description', '') or product.get('description', '')
    meta_key = f"{field}_{lang}"
    for meta in product.get('meta_data', []):
        if meta.get('key') == meta_key:
            value = meta.get('value', '')
            if value:
                return value
    if field == 'name':
        return product.get('name', '')
    elif field == 'description':
        return product.get('short_description', '') or product.get('description', '')
    return ''

def _fetch_wc_products_sync(lang: str, product_type: str):
    if not wcapi:
        return None
    try:
        params = {"per_page": 100, "status": "publish"}
        response = wcapi.get("products", params=params)
        if response.status_code != 200:
            logger.error(f"WooCommerce API returned {response.status_code}")
            return None
        products = response.json()
        result = []
        for p in products:
            is_variable = p.get("type") == "variable"
            product_data = {
                "id": str(p["id"]),
                "name": get_translated_field(p, 'name', lang),
                "description": get_translated_field(p, 'description', lang),
                "price": float(p["price"]) if p["price"] else 0,
                "regular_price": float(p["regular_price"]) if p.get("regular_price") else 0,
                "sale_price": float(p["sale_price"]) if p.get("sale_price") else None,
                "image": p["images"][0]["src"] if p.get("images") else "",
                "images": [img["src"] for img in p.get("images", [])],
                "category": p["categories"][0]["name"] if p.get("categories") else "Uncategorized",
                "categories": [cat["name"] for cat in p.get("categories", [])],
                "stock_status": p.get("stock_status", "instock"),
                "permalink": p.get("permalink", ""),
                "wc_id": p["id"],
                "product_type": p.get("type", "simple"),
                "dimensions": {
                    "height": p.get("dimensions", {}).get("height", ""),
                    "width": p.get("dimensions", {}).get("width", ""),
                    "length": p.get("dimensions", {}).get("length", "")
                },
                "weight": p.get("weight", ""),
                "attributes": {attr["name"]: attr["options"] for attr in p.get("attributes", [])}
            }
            if product_type:
                categories = product_data["categories"]
                attributes = product_data.get("attributes", {})
                termek_tipus = attributes.get("Termék típus", [])
                should_include = False
                target_variation_name = None
                if product_type == "ready-florarium":
                    target_variation_name = "Ready Florarium"
                    if "Ready Florariums" in categories or "Ready Florarium" in termek_tipus:
                        should_include = True
                elif product_type == "diy-kit":
                    target_variation_name = "DIY Kit"
                    if "DIY Kits" in categories or "DIY Kit" in termek_tipus:
                        should_include = True
                if should_include:
                    if is_variable and target_variation_name:
                        try:
                            var_response = wcapi.get(f"products/{p['id']}/variations", params={"per_page": 10})
                            if var_response.status_code == 200:
                                for var in var_response.json():
                                    for attr in var.get("attributes", []):
                                        if attr.get("option") == target_variation_name:
                                            product_data["price"] = float(var["price"]) if var.get("price") else product_data["price"]
                                            product_data["variation_id"] = var["id"]
                                            product_data["stock_status"] = var.get("stock_status", "instock")
                                            break
                        except Exception as e:
                            logger.warning(f"Failed to fetch variations for {p['id']}: {e}")
                    result.append(product_data)
            else:
                result.append(product_data)
        return result
    except Exception as e:
        logger.error(f"WooCommerce fetch error: {e}")
        return None

async def fetch_wc_products_from_api(lang: str, product_type: str):
    return await asyncio.to_thread(_fetch_wc_products_sync, lang, product_type)

async def refresh_product_cache():
    langs = ['en', 'el', 'it', 'hu']
    product_types = [None, 'ready-florarium', 'diy-kit']
    for lang in langs:
        for pt in product_types:
            try:
                data = await fetch_wc_products_from_api(lang, pt)
                if data is not None and len(data) > 0:
                    set_cached_products_file(lang, pt, data)
                else:
                    logger.warning(f"WC empty for ({lang}, {pt or 'all'}), keeping old cache")
            except Exception as e:
                logger.error(f"Cache refresh failed ({lang}, {pt}): {e}")

async def background_cache_refresher():
    logger.info("Starting initial product cache refresh...")
    await refresh_product_cache()
    logger.info("Initial cache refresh complete")
    while True:
        await asyncio.sleep(CACHE_REFRESH_INTERVAL)
        logger.info("Background cache refresh...")
        await refresh_product_cache()

# ========== FastAPI App ==========
app = FastAPI()
api_router = APIRouter()

# Pydantic Models
class CartItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    product_id: str
    product_name: str
    product_price: float
    product_image: str
    quantity: int = 1
    variation_id: Optional[int] = None

class CartItemCreate(BaseModel):
    session_id: str
    product_id: str
    product_name: str
    product_price: float
    product_image: str
    quantity: int = 1
    variation_id: Optional[int] = None

class ContactFormCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: str

class WorkshopRegistrationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    workshop_type: str

class NewsletterSubscriptionCreate(BaseModel):
    email: EmailStr

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

class BlogPostCreate(BaseModel):
    title: str
    excerpt: str
    content: str
    image: str
    author: str

class CheckoutRequest(BaseModel):
    session_id: str
    customer_id: Optional[int] = None
    billing_first_name: Optional[str] = ""
    billing_last_name: Optional[str] = ""
    billing_email: Optional[str] = ""
    billing_phone: Optional[str] = ""
    billing_address_1: Optional[str] = ""
    billing_city: Optional[str] = ""
    billing_postcode: Optional[str] = ""
    billing_country: Optional[str] = ""
    shipping_first_name: Optional[str] = ""
    shipping_last_name: Optional[str] = ""
    shipping_address_1: Optional[str] = ""
    shipping_city: Optional[str] = ""
    shipping_postcode: Optional[str] = ""
    shipping_country: Optional[str] = ""
    same_as_billing: bool = True
    shipping_method: Optional[str] = ""
    shipping_method_title: Optional[str] = ""
    order_notes: Optional[str] = ""
    subscribe_newsletter: bool = False
    payment_method: Optional[str] = ""

class CustomerRegisterRequest(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str

class CustomerLoginRequest(BaseModel):
    email: EmailStr
    password: str

# ========== Routes ==========
@api_router.get("/")
async def root():
    return {"message": "Fairygarden For You API"}

# WooCommerce Products (file-based cache)
@api_router.get("/wc/products")
async def get_wc_products(lang: str = 'en', product_type: str = None):
    if not wcapi:
        raise HTTPException(status_code=503, detail="WooCommerce not configured")
    cached = get_cached_products_file(lang, product_type)
    if cached is not None:
        logger.info(f"Serving {len(cached)} products from file cache ({lang}, {product_type or 'all'})")
        return cached
    logger.info(f"Cache MISS ({lang}, {product_type or 'all'}), fetching from WooCommerce...")
    try:
        data = await fetch_wc_products_from_api(lang, product_type)
    except Exception as e:
        logger.error(f"WooCommerce API error: {e}")
        data = None
    if data is not None and len(data) > 0:
        set_cached_products_file(lang, product_type, data)
        return data
    logger.error(f"No cache and WC failed for ({lang}, {product_type or 'all'})")
    return []

@api_router.get("/wc/products/{product_id}")
async def get_wc_product(product_id: int, lang: str = 'en'):
    if not wcapi:
        raise HTTPException(status_code=503, detail="WooCommerce not configured")
    try:
        response = wcapi.get(f"products/{product_id}")
        if response.status_code == 200:
            p = response.json()
            return {
                "id": str(p["id"]),
                "name": get_translated_field(p, 'name', lang),
                "description": get_translated_field(p, 'description', lang),
                "short_description": get_translated_field(p, 'description', lang),
                "price": float(p["price"]) if p["price"] else 0,
                "regular_price": float(p["regular_price"]) if p.get("regular_price") else 0,
                "sale_price": float(p["sale_price"]) if p.get("sale_price") else None,
                "image": p["images"][0]["src"] if p.get("images") else "",
                "images": [img["src"] for img in p.get("images", [])],
                "category": p["categories"][0]["name"] if p.get("categories") else "Uncategorized",
                "categories": [cat["name"] for cat in p.get("categories", [])],
                "stock_status": p.get("stock_status", "instock"),
                "permalink": p.get("permalink", ""),
                "wc_id": p["id"]
            }
        raise HTTPException(status_code=response.status_code, detail="Product not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/wc/categories")
async def get_wc_categories():
    if not wcapi:
        raise HTTPException(status_code=503, detail="WooCommerce not configured")
    try:
        response = wcapi.get("products/categories", params={"per_page": 100})
        if response.status_code == 200:
            return [{"id": c["id"], "name": c["name"], "slug": c["slug"], "count": c["count"],
                     "image": c["image"]["src"] if c.get("image") else None} for c in response.json()]
        raise HTTPException(status_code=response.status_code, detail="WooCommerce API error")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/wc/status")
async def get_wc_status():
    if not wcapi:
        return {"connected": False, "message": "WooCommerce not configured"}
    try:
        response = wcapi.get("products", params={"per_page": 1})
        return {"connected": response.status_code == 200, "message": "OK" if response.status_code == 200 else f"Error {response.status_code}"}
    except Exception as e:
        return {"connected": False, "message": str(e)}

# Cart (MySQL)
@api_router.get("/cart/{session_id}")
async def get_cart(session_id: str):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM cart WHERE session_id = %s", (session_id,))
            items = cursor.fetchall()
            for item in items:
                item['product_price'] = float(item['product_price']) if item.get('product_price') else 0
                item['quantity'] = int(item.get('quantity', 1))
            return items
    finally:
        conn.close()

@api_router.post("/cart")
async def add_to_cart(cart_item: CartItemCreate):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM cart WHERE session_id = %s AND product_id = %s",
                          (cart_item.session_id, cart_item.product_id))
            existing = cursor.fetchone()
            if existing:
                new_qty = existing['quantity'] + cart_item.quantity
                cursor.execute("UPDATE cart SET quantity = %s WHERE id = %s", (new_qty, existing['id']))
                conn.commit()
                existing['quantity'] = new_qty
                existing['product_price'] = float(existing['product_price'])
                return existing
            item_id = str(uuid.uuid4())
            cursor.execute(
                "INSERT INTO cart (id, session_id, product_id, product_name, product_price, product_image, quantity, variation_id) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",
                (item_id, cart_item.session_id, cart_item.product_id, cart_item.product_name,
                 cart_item.product_price, cart_item.product_image, cart_item.quantity, cart_item.variation_id))
            conn.commit()
            return {**cart_item.model_dump(), "id": item_id}
    finally:
        conn.close()

@api_router.delete("/cart/{session_id}/{product_id}")
async def remove_from_cart(session_id: str, product_id: str):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute("DELETE FROM cart WHERE session_id = %s AND product_id = %s", (session_id, product_id))
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

# Contact
@api_router.post("/contact")
async def submit_contact(contact: ContactFormCreate):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cid = str(uuid.uuid4())
            cursor.execute("INSERT INTO contacts (id, name, email, company, message) VALUES (%s,%s,%s,%s,%s)",
                          (cid, contact.name, contact.email, contact.company, contact.message))
        conn.commit()
        return {**contact.model_dump(), "id": cid}
    finally:
        conn.close()

# Workshop
@api_router.post("/workshop/register")
async def register_workshop(reg: WorkshopRegistrationCreate):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            rid = str(uuid.uuid4())
            cursor.execute("INSERT INTO workshops (id, name, email, phone, workshop_type) VALUES (%s,%s,%s,%s,%s)",
                          (rid, reg.name, reg.email, reg.phone, reg.workshop_type))
        conn.commit()
        return {**reg.model_dump(), "id": rid}
    finally:
        conn.close()

# Newsletter
@api_router.post("/newsletter/subscribe")
async def subscribe_newsletter(sub: NewsletterSubscriptionCreate):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM newsletter WHERE email = %s", (sub.email,))
            if cursor.fetchone():
                raise HTTPException(status_code=400, detail="Email already subscribed")
            sid = str(uuid.uuid4())
            cursor.execute("INSERT INTO newsletter (id, email) VALUES (%s,%s)", (sid, sub.email))
        conn.commit()
        return {**sub.model_dump(), "id": sid}
    finally:
        conn.close()

# Custom Terrarium
@api_router.post("/custom-terrarium")
async def create_custom_terrarium_order(order: CustomTerrariumOrderCreate):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            oid = str(uuid.uuid4())
            cursor.execute(
                """INSERT INTO custom_terrariums (id,name,email,size,glass_type,world,lighting,message,calculated_price,deposit_amount,subscribed_to_newsletter)
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
                (oid, order.name, order.email, order.size, order.glass_type, order.world,
                 order.lighting, order.message, order.calculated_price, order.deposit_amount, order.subscribed_to_newsletter))
            if order.subscribed_to_newsletter:
                cursor.execute("SELECT id FROM newsletter WHERE email = %s", (order.email,))
                if not cursor.fetchone():
                    cursor.execute("INSERT INTO newsletter (id, email) VALUES (%s,%s)", (str(uuid.uuid4()), order.email))
        conn.commit()
        return {**order.model_dump(), "id": oid, "status": "pending"}
    finally:
        conn.close()

@api_router.get("/custom-terrarium")
async def get_custom_terrarium_orders():
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM custom_terrariums ORDER BY created_at DESC")
            return cursor.fetchall()
    finally:
        conn.close()

# Blog
@api_router.get("/blog/posts")
async def get_blog_posts():
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM blog ORDER BY published_at DESC LIMIT 10")
            return cursor.fetchall()
    finally:
        conn.close()

@api_router.post("/blog/posts")
async def create_blog_post(post: BlogPostCreate):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            pid = str(uuid.uuid4())
            cursor.execute("INSERT INTO blog (id,title,excerpt,content,image,author) VALUES (%s,%s,%s,%s,%s,%s)",
                          (pid, post.title, post.excerpt, post.content, post.image, post.author))
        conn.commit()
        return {**post.model_dump(), "id": pid}
    finally:
        conn.close()

# Auth - WooCommerce Customers
@api_router.post("/wc/customers/register")
async def register_customer(req: CustomerRegisterRequest):
    if not wcapi:
        raise HTTPException(status_code=503, detail="WooCommerce not configured")
    try:
        response = wcapi.post("customers", {
            "email": req.email, "first_name": req.first_name,
            "last_name": req.last_name, "username": req.email, "password": req.password,
        })
        if response.status_code in [200, 201]:
            c = response.json()
            return {"success": True, "customer_id": c["id"], "email": c["email"],
                    "first_name": c["first_name"], "last_name": c["last_name"]}
        err = response.json()
        raise HTTPException(status_code=400, detail=err.get("message", "Registration failed"))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/wc/customers/login")
async def login_customer(req: CustomerLoginRequest):
    if not wcapi:
        raise HTTPException(status_code=503, detail="WooCommerce not configured")
    try:
        response = wcapi.get("customers", params={"email": req.email, "per_page": 1})
        if response.status_code == 200:
            customers = response.json()
            if not customers:
                raise HTTPException(status_code=401, detail="Invalid email or password")
            customer = customers[0]
            token = hashlib.sha256(f"{req.email}:{req.password}:{time.time()}".encode()).hexdigest()
            conn = get_db()
            try:
                with conn.cursor() as cursor:
                    cursor.execute("DELETE FROM customer_sessions WHERE customer_id = %s", (customer["id"],))
                    cursor.execute("INSERT INTO customer_sessions (id,customer_id,email,token) VALUES (%s,%s,%s,%s)",
                                  (str(uuid.uuid4()), customer["id"], customer["email"], token))
                conn.commit()
            finally:
                conn.close()
            return {
                "success": True, "token": token, "customer_id": customer["id"],
                "email": customer["email"], "first_name": customer["first_name"],
                "last_name": customer["last_name"],
                "billing": customer.get("billing", {}), "shipping": customer.get("shipping", {}),
            }
        raise HTTPException(status_code=401, detail="Invalid email or password")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def _get_session_by_token(token: str):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM customer_sessions WHERE token = %s", (token,))
            return cursor.fetchone()
    finally:
        conn.close()

@api_router.get("/wc/customers/me")
async def get_customer_profile(token: str):
    session = _get_session_by_token(token)
    if not session:
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    try:
        response = wcapi.get(f"customers/{session['customer_id']}")
        if response.status_code == 200:
            c = response.json()
            return {"customer_id": c["id"], "email": c["email"], "first_name": c["first_name"],
                    "last_name": c["last_name"], "billing": c.get("billing", {}), "shipping": c.get("shipping", {})}
        raise HTTPException(status_code=404, detail="Customer not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.put("/wc/customers/me")
async def update_customer_profile(token: str, data: dict):
    session = _get_session_by_token(token)
    if not session:
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    try:
        allowed = {"first_name", "last_name", "billing", "shipping"}
        update_data = {k: v for k, v in data.items() if k in allowed}
        response = wcapi.put(f"customers/{session['customer_id']}", update_data)
        if response.status_code == 200:
            c = response.json()
            return {"success": True, "first_name": c["first_name"], "last_name": c["last_name"]}
        raise HTTPException(status_code=400, detail="Update failed")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/wc/customers/orders")
async def get_customer_orders(token: str):
    session = _get_session_by_token(token)
    if not session:
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    try:
        response = wcapi.get("orders", params={"customer": session["customer_id"], "per_page": 50})
        if response.status_code == 200:
            return [{"id": o["id"], "status": o["status"], "total": o["total"],
                     "currency": o.get("currency", "EUR"), "date_created": o["date_created"],
                     "line_items": [{"name": li["name"], "quantity": li["quantity"], "total": li["total"]}
                                   for li in o.get("line_items", [])],
                     "billing": o.get("billing", {}), "shipping": o.get("shipping", {})}
                    for o in response.json()]
        return []
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/wc/customers/logout")
async def logout_customer(token: str):
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute("DELETE FROM customer_sessions WHERE token = %s", (token,))
        conn.commit()
    finally:
        conn.close()
    return {"success": True}

# Shipping methods
@api_router.get("/wc/shipping-methods")
async def get_shipping_methods():
    return [
        {"id": "flat_rate", "title": "Standard Shipping", "cost": 8.99, "delivery_time": "5-7 business days"},
        {"id": "express", "title": "Express Shipping", "cost": 14.99, "delivery_time": "2-3 business days"},
        {"id": "local_pickup", "title": "Local Pickup (Athens)", "cost": 0, "delivery_time": "Same day"},
    ]

# Checkout
@api_router.post("/wc/checkout")
async def create_wc_order(checkout: CheckoutRequest):
    if not wcapi:
        raise HTTPException(status_code=503, detail="WooCommerce not configured")
    conn = get_db()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM cart WHERE session_id = %s", (checkout.session_id,))
            cart_items = cursor.fetchall()
    finally:
        conn.close()
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    line_items = []
    for item in cart_items:
        clean_id = str(item.get("product_id", "")).replace("diy-", "")
        li = {"product_id": int(clean_id), "quantity": item.get("quantity", 1)}
        if item.get("variation_id"):
            li["variation_id"] = item["variation_id"]
        line_items.append(li)
    billing = {
        "first_name": checkout.billing_first_name or "", "last_name": checkout.billing_last_name or "",
        "email": checkout.billing_email or "", "phone": checkout.billing_phone or "",
        "address_1": checkout.billing_address_1 or "", "city": checkout.billing_city or "",
        "postcode": checkout.billing_postcode or "", "country": checkout.billing_country or "",
    }
    order_data = {"set_paid": False, "status": "pending", "line_items": line_items, "billing": billing}
    if checkout.payment_method == "bacs":
        order_data["payment_method"] = "bacs"
        order_data["payment_method_title"] = "Direct Bank Transfer"
    if checkout.customer_id:
        order_data["customer_id"] = checkout.customer_id
    if checkout.same_as_billing:
        order_data["shipping"] = {k: billing[k] for k in ["first_name","last_name","address_1","city","postcode","country"]}
    else:
        order_data["shipping"] = {
            "first_name": checkout.shipping_first_name or billing["first_name"],
            "last_name": checkout.shipping_last_name or billing["last_name"],
            "address_1": checkout.shipping_address_1 or "", "city": checkout.shipping_city or "",
            "postcode": checkout.shipping_postcode or "", "country": checkout.shipping_country or "",
        }
    shipping_methods = {
        "flat_rate": {"id": "flat_rate", "title": "Standard Shipping", "total": "8.99"},
        "express": {"id": "express", "title": "Express Shipping", "total": "14.99"},
        "local_pickup": {"id": "local_pickup", "title": "Local Pickup", "total": "0.00"},
    }
    sm = shipping_methods.get(checkout.shipping_method, {})
    if sm:
        order_data["shipping_lines"] = [{"method_id": sm["id"], "method_title": sm["title"], "total": sm["total"]}]
    if checkout.order_notes:
        order_data["customer_note"] = checkout.order_notes
    try:
        response = wcapi.post("orders", order_data)
        if response.status_code in [200, 201]:
            order = response.json()
            order_id = order["id"]
            order_key = order.get("order_key", "")
            # Clear cart
            conn = get_db()
            try:
                with conn.cursor() as cursor:
                    cursor.execute("DELETE FROM cart WHERE session_id = %s", (checkout.session_id,))
                conn.commit()
                if checkout.subscribe_newsletter and checkout.billing_email:
                    with conn.cursor() as cursor:
                        cursor.execute("SELECT id FROM newsletter WHERE email = %s", (checkout.billing_email,))
                        if not cursor.fetchone():
                            cursor.execute("INSERT INTO newsletter (id,email) VALUES (%s,%s)",
                                          (str(uuid.uuid4()), checkout.billing_email))
                    conn.commit()
            finally:
                conn.close()
            asyncio.create_task(refresh_product_cache())
            if checkout.payment_method == "bacs":
                return {"success": True, "order_id": order_id, "order_key": order_key,
                        "payment_method": "bacs", "checkout_url": None, "total": order.get("total", "0")}
            checkout_url = f"{wc_url}/checkout/order-pay/{order_id}/?pay_for_order=true&key={order_key}"
            return {"success": True, "order_id": order_id, "order_key": order_key,
                    "payment_method": "online", "checkout_url": checkout_url, "total": order.get("total", "0")}
        error_msg = response.json() if response.text else "Unknown error"
        raise HTTPException(status_code=response.status_code, detail=f"Order creation failed: {error_msg}")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Cache management
@api_router.post("/wc/cache/invalidate")
async def invalidate_product_cache():
    await refresh_product_cache()
    return {"message": "Cache refreshed"}

@api_router.get("/wc/cache/status")
async def get_cache_status():
    entries = []
    if CACHE_DIR.exists():
        for f in sorted(CACHE_DIR.glob("*.json")):
            try:
                data = json_module.loads(f.read_text(encoding='utf-8'))
                entries.append({"file": f.name, "count": len(data) if isinstance(data, list) else 0,
                               "size_bytes": f.stat().st_size,
                               "modified": datetime.fromtimestamp(f.stat().st_mtime, tz=timezone.utc).isoformat()})
            except Exception:
                entries.append({"file": f.name, "error": "unreadable"})
    return {"cache_type": "file", "entries": entries}

# Legacy endpoints (for frontend compatibility)
@api_router.get("/products")
async def get_products():
    return []

@api_router.get("/products/{product_id}")
async def get_product(product_id: str):
    raise HTTPException(status_code=404, detail="Use /api/wc/products instead")

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    global _bg_task_started
    if not _bg_task_started:
        _bg_task_started = True
        asyncio.create_task(background_cache_refresher())
        logger.info("Background cache refresher started")
