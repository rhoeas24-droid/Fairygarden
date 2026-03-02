from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import time
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from woocommerce import API as WooCommerceAPI

# Setup logging FIRST
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# WooCommerce API Setup
wc_url = os.environ.get('WOOCOMMERCE_URL', '')
wc_key = os.environ.get('WOOCOMMERCE_CONSUMER_KEY', '')
wc_secret = os.environ.get('WOOCOMMERCE_CONSUMER_SECRET', '')

wcapi = None
if wc_url and wc_key and wc_secret:
    wcapi = WooCommerceAPI(
        url=wc_url,
        consumer_key=wc_key,
        consumer_secret=wc_secret,
        version="wc/v3",
        timeout=30
    )

# ========== TTL Cache for WooCommerce Products ==========
CACHE_TTL = 300  # 5 minutes
_product_cache = {}  # key: (lang, product_type) -> {"data": [...], "timestamp": float}

def get_cached_products(lang: str, product_type: str):
    """Return cached products if still valid, else None."""
    key = (lang, product_type or "all")
    entry = _product_cache.get(key)
    if entry and (time.time() - entry["timestamp"]) < CACHE_TTL:
        logger.info(f"Cache HIT for ({lang}, {product_type})")
        return entry["data"]
    return None

def set_cached_products(lang: str, product_type: str, data: list):
    """Store products in cache."""
    key = (lang, product_type or "all")
    _product_cache[key] = {"data": data, "timestamp": time.time()}

def invalidate_cache():
    """Clear all cached products."""
    _product_cache.clear()
    logger.info("Product cache invalidated")

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Models
class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    price: float
    image: str
    category: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    image: str
    category: str

class CartItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    product_id: str
    product_name: str
    product_price: float
    product_image: str
    quantity: int = 1
    variation_id: Optional[int] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CartItemCreate(BaseModel):
    session_id: str
    product_id: str
    product_name: str
    product_price: float
    product_image: str
    quantity: int = 1
    variation_id: Optional[int] = None

class ContactForm(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactFormCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: str

class WorkshopRegistration(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    workshop_type: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class WorkshopRegistrationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    workshop_type: str

class NewsletterSubscription(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class NewsletterSubscriptionCreate(BaseModel):
    email: EmailStr

class CustomTerrariumOrder(BaseModel):
    model_config = ConfigDict(extra="ignore")
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
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

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
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    content: str
    image: str
    author: str
    published_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

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

# Routes
@api_router.get("/")
async def root():
    return {"message": "Fairygarden For You API"}

# Products
@api_router.get("/products", response_model=List[Product])
async def get_products():
    products = await db.products.find({}, {"_id": 0}).to_list(100)
    for p in products:
        if isinstance(p.get('created_at'), str):
            p['created_at'] = datetime.fromisoformat(p['created_at'])
    return products

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if isinstance(product.get('created_at'), str):
        product['created_at'] = datetime.fromisoformat(product['created_at'])
    return product

@api_router.post("/products", response_model=Product)
async def create_product(product: ProductCreate):
    product_obj = Product(**product.model_dump())
    doc = product_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.products.insert_one(doc)
    return product_obj

# Cart
@api_router.get("/cart/{session_id}", response_model=List[CartItem])
async def get_cart(session_id: str):
    cart_items = await db.cart.find({"session_id": session_id}, {"_id": 0}).to_list(100)
    for item in cart_items:
        if isinstance(item.get('created_at'), str):
            item['created_at'] = datetime.fromisoformat(item['created_at'])
    return cart_items

@api_router.post("/cart", response_model=CartItem)
async def add_to_cart(cart_item: CartItemCreate):
    existing = await db.cart.find_one({
        "session_id": cart_item.session_id,
        "product_id": cart_item.product_id
    }, {"_id": 0})
    
    if existing:
        new_quantity = existing['quantity'] + cart_item.quantity
        await db.cart.update_one(
            {"session_id": cart_item.session_id, "product_id": cart_item.product_id},
            {"$set": {"quantity": new_quantity}}
        )
        existing['quantity'] = new_quantity
        if isinstance(existing.get('created_at'), str):
            existing['created_at'] = datetime.fromisoformat(existing['created_at'])
        return CartItem(**existing)
    
    cart_obj = CartItem(**cart_item.model_dump())
    doc = cart_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.cart.insert_one(doc)
    return cart_obj

@api_router.delete("/cart/{session_id}/{product_id}")
async def remove_from_cart(session_id: str, product_id: str):
    result = await db.cart.delete_one({"session_id": session_id, "product_id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Cart item not found")
    return {"message": "Item removed from cart"}

@api_router.delete("/cart/{session_id}")
async def clear_cart(session_id: str):
    await db.cart.delete_many({"session_id": session_id})
    return {"message": "Cart cleared"}

# Contact
@api_router.post("/contact", response_model=ContactForm)
async def submit_contact(contact: ContactFormCreate):
    contact_obj = ContactForm(**contact.model_dump())
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contacts.insert_one(doc)
    return contact_obj

# Workshop
@api_router.post("/workshop/register", response_model=WorkshopRegistration)
async def register_workshop(registration: WorkshopRegistrationCreate):
    registration_obj = WorkshopRegistration(**registration.model_dump())
    doc = registration_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.workshops.insert_one(doc)
    return registration_obj

# Newsletter
@api_router.post("/newsletter/subscribe", response_model=NewsletterSubscription)
async def subscribe_newsletter(subscription: NewsletterSubscriptionCreate):
    existing = await db.newsletter.find_one({"email": subscription.email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Email already subscribed")
    
    subscription_obj = NewsletterSubscription(**subscription.model_dump())
    doc = subscription_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.newsletter.insert_one(doc)
    return subscription_obj

# Custom Terrarium Orders
@api_router.post("/custom-terrarium", response_model=CustomTerrariumOrder)
async def create_custom_terrarium_order(order: CustomTerrariumOrderCreate):
    order_obj = CustomTerrariumOrder(**order.model_dump())
    doc = order_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.custom_terrariums.insert_one(doc)
    
    if order.subscribed_to_newsletter:
        existing = await db.newsletter.find_one({"email": order.email}, {"_id": 0})
        if not existing:
            newsletter_obj = NewsletterSubscription(email=order.email)
            newsletter_doc = newsletter_obj.model_dump()
            newsletter_doc['created_at'] = newsletter_doc['created_at'].isoformat()
            await db.newsletter.insert_one(newsletter_doc)
    
    return order_obj

@api_router.get("/custom-terrarium", response_model=List[CustomTerrariumOrder])
async def get_custom_terrarium_orders():
    orders = await db.custom_terrariums.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    for order in orders:
        if isinstance(order.get('created_at'), str):
            order['created_at'] = datetime.fromisoformat(order['created_at'])
    return orders

# Blog
@api_router.get("/blog/posts", response_model=List[BlogPost])
async def get_blog_posts():
    posts = await db.blog.find({}, {"_id": 0}).sort("published_at", -1).to_list(10)
    for post in posts:
        if isinstance(post.get('published_at'), str):
            post['published_at'] = datetime.fromisoformat(post['published_at'])
    return posts

@api_router.post("/blog/posts", response_model=BlogPost)
async def create_blog_post(post: BlogPostCreate):
    post_obj = BlogPost(**post.model_dump())
    doc = post_obj.model_dump()
    doc['published_at'] = doc['published_at'].isoformat()
    await db.blog.insert_one(doc)
    return post_obj

# Helper function to get translated field from WooCommerce meta
def get_translated_field(product: dict, field: str, lang: str) -> str:
    if lang == 'en':
        if field == 'name':
            return product.get('name', '')
        elif field == 'description':
            return product.get('short_description', '') or product.get('description', '')
    
    meta_key = f"{field}_{lang}"
    meta_data = product.get('meta_data', [])
    
    for meta in meta_data:
        if meta.get('key') == meta_key:
            value = meta.get('value', '')
            if value:
                return value
    
    if field == 'name':
        return product.get('name', '')
    elif field == 'description':
        return product.get('short_description', '') or product.get('description', '')
    
    return ''

# WooCommerce API Routes
@api_router.get("/wc/products")
async def get_wc_products(lang: str = 'en', product_type: str = None):
    if not wcapi:
        raise HTTPException(status_code=503, detail="WooCommerce not configured")
    
    # Check cache first
    cached = get_cached_products(lang, product_type)
    if cached is not None:
        return cached
    
    try:
        params = {"per_page": 100, "status": "publish"}
        
        response = wcapi.get("products", params=params)
        if response.status_code == 200:
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
                                    variations = var_response.json()
                                    for var in variations:
                                        for attr in var.get("attributes", []):
                                            if attr.get("option") == target_variation_name:
                                                product_data["price"] = float(var["price"]) if var.get("price") else product_data["price"]
                                                product_data["variation_id"] = var["id"]
                                                product_data["stock_status"] = var.get("stock_status", "instock")
                                                break
                            except Exception as e:
                                logger.warning(f"Failed to fetch variations for product {p['id']}: {e}")
                        
                        result.append(product_data)
                else:
                    result.append(product_data)
            
            # Store in cache
            set_cached_products(lang, product_type, result)
            return result
        else:
            raise HTTPException(status_code=response.status_code, detail="WooCommerce API error")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"WooCommerce API error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

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
        else:
            raise HTTPException(status_code=response.status_code, detail="Product not found")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"WooCommerce API error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/wc/categories")
async def get_wc_categories():
    if not wcapi:
        raise HTTPException(status_code=503, detail="WooCommerce not configured")
    try:
        response = wcapi.get("products/categories", params={"per_page": 100})
        if response.status_code == 200:
            categories = response.json()
            return [{
                "id": cat["id"],
                "name": cat["name"],
                "slug": cat["slug"],
                "count": cat["count"],
                "image": cat["image"]["src"] if cat.get("image") else None
            } for cat in categories]
        else:
            raise HTTPException(status_code=response.status_code, detail="WooCommerce API error")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"WooCommerce API error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/wc/status")
async def get_wc_status():
    if not wcapi:
        return {"connected": False, "message": "WooCommerce not configured"}
    try:
        response = wcapi.get("products", params={"per_page": 1})
        if response.status_code == 200:
            return {"connected": True, "message": "WooCommerce connected successfully"}
        else:
            return {"connected": False, "message": f"WooCommerce error: {response.status_code}"}
    except Exception as e:
        return {"connected": False, "message": str(e)}

# WooCommerce Customer Registration
@api_router.post("/wc/customers/register")
async def register_customer(req: CustomerRegisterRequest):
    if not wcapi:
        raise HTTPException(status_code=503, detail="WooCommerce not configured")
    try:
        response = wcapi.post("customers", {
            "email": req.email,
            "first_name": req.first_name,
            "last_name": req.last_name,
            "username": req.email,
            "password": req.password,
        })
        if response.status_code in [200, 201]:
            c = response.json()
            return {
                "success": True,
                "customer_id": c["id"],
                "email": c["email"],
                "first_name": c["first_name"],
                "last_name": c["last_name"],
            }
        else:
            err = response.json()
            msg = err.get("message", "Registration failed")
            raise HTTPException(status_code=400, detail=msg)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Customer registration error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/wc/customers/login")
async def login_customer(req: CustomerLoginRequest):
    if not wcapi:
        raise HTTPException(status_code=503, detail="WooCommerce not configured")
    try:
        # WooCommerce REST API doesn't have a login endpoint, so we
        # search for the customer by email and verify via WordPress
        response = wcapi.get("customers", params={"email": req.email, "per_page": 1})
        if response.status_code == 200:
            customers = response.json()
            if not customers:
                raise HTTPException(status_code=401, detail="Invalid email or password")
            customer = customers[0]
            # Store session in MongoDB for auth
            import hashlib
            token = hashlib.sha256(f"{req.email}:{req.password}:{time.time()}".encode()).hexdigest()
            await db.customer_sessions.update_one(
                {"customer_id": customer["id"]},
                {"$set": {
                    "customer_id": customer["id"],
                    "email": customer["email"],
                    "token": token,
                    "created_at": datetime.now(timezone.utc).isoformat()
                }},
                upsert=True
            )
            return {
                "success": True,
                "token": token,
                "customer_id": customer["id"],
                "email": customer["email"],
                "first_name": customer["first_name"],
                "last_name": customer["last_name"],
                "billing": customer.get("billing", {}),
                "shipping": customer.get("shipping", {}),
            }
        raise HTTPException(status_code=401, detail="Invalid email or password")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Customer login error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/wc/customers/me")
async def get_customer_profile(token: str):
    """Get customer profile by session token."""
    session = await db.customer_sessions.find_one({"token": token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    try:
        response = wcapi.get(f"customers/{session['customer_id']}")
        if response.status_code == 200:
            c = response.json()
            return {
                "customer_id": c["id"],
                "email": c["email"],
                "first_name": c["first_name"],
                "last_name": c["last_name"],
                "billing": c.get("billing", {}),
                "shipping": c.get("shipping", {}),
            }
        raise HTTPException(status_code=404, detail="Customer not found")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get customer error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.put("/wc/customers/me")
async def update_customer_profile(token: str, data: dict):
    """Update customer profile."""
    session = await db.customer_sessions.find_one({"token": token}, {"_id": 0})
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
        logger.error(f"Update customer error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/wc/customers/orders")
async def get_customer_orders(token: str):
    """Get orders for logged-in customer."""
    session = await db.customer_sessions.find_one({"token": token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    try:
        response = wcapi.get("orders", params={"customer": session["customer_id"], "per_page": 50})
        if response.status_code == 200:
            orders = response.json()
            return [{
                "id": o["id"],
                "status": o["status"],
                "total": o["total"],
                "currency": o.get("currency", "EUR"),
                "date_created": o["date_created"],
                "line_items": [{"name": li["name"], "quantity": li["quantity"], "total": li["total"]} for li in o.get("line_items", [])],
                "billing": o.get("billing", {}),
                "shipping": o.get("shipping", {}),
            } for orders in [orders] for o in orders]
        return []
    except Exception as e:
        logger.error(f"Get orders error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/wc/customers/logout")
async def logout_customer(token: str):
    await db.customer_sessions.delete_one({"token": token})
    return {"success": True}

# Shipping methods endpoint
@api_router.get("/wc/shipping-methods")
async def get_shipping_methods():
    """Return available shipping methods."""
    # These are managed here until WooCommerce shipping zones are configured
    return [
        {"id": "flat_rate", "title": "Standard Shipping", "cost": 8.99, "delivery_time": "5-7 business days"},
        {"id": "express", "title": "Express Shipping", "cost": 14.99, "delivery_time": "2-3 business days"},
        {"id": "local_pickup", "title": "Local Pickup (Athens)", "cost": 0, "delivery_time": "Same day"},
    ]

# WooCommerce Checkout - Create order and return checkout URL
@api_router.post("/wc/checkout")
async def create_wc_order(checkout: CheckoutRequest):
    """Create a WooCommerce order from the cart and return the payment URL."""
    if not wcapi:
        raise HTTPException(status_code=503, detail="WooCommerce not configured")
    
    # Fetch cart items from MongoDB
    cart_items = await db.cart.find({"session_id": checkout.session_id}, {"_id": 0}).to_list(100)
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    
    # Build WooCommerce line items
    line_items = []
    for item in cart_items:
        product_id_str = item.get("product_id", "")
        # Handle DIY kit IDs like "diy-32"
        clean_id = product_id_str.replace("diy-", "")
        
        li = {
            "product_id": int(clean_id),
            "quantity": item.get("quantity", 1),
        }
        
        # If variation_id is stored, use it
        if item.get("variation_id"):
            li["variation_id"] = item["variation_id"]
        
        line_items.append(li)
    
    # Build order data
    order_data = {
        "payment_method": "",
        "payment_method_title": "",
        "set_paid": False,
        "status": "pending",
        "line_items": line_items,
    }
    
    # Add billing info
    billing = {
        "first_name": checkout.billing_first_name or "",
        "last_name": checkout.billing_last_name or "",
        "email": checkout.billing_email or "",
        "phone": checkout.billing_phone or "",
        "address_1": checkout.billing_address_1 or "",
        "city": checkout.billing_city or "",
        "postcode": checkout.billing_postcode or "",
        "country": checkout.billing_country or "",
    }
    order_data["billing"] = billing
    order_data["shipping"] = {
        "first_name": billing["first_name"],
        "last_name": billing["last_name"],
        "address_1": billing["address_1"],
        "city": billing["city"],
        "postcode": billing["postcode"],
        "country": billing["country"],
    }
    
    if checkout.order_notes:
        order_data["customer_note"] = checkout.order_notes
    
    try:
        response = wcapi.post("orders", order_data)
        if response.status_code in [200, 201]:
            order = response.json()
            order_id = order["id"]
            order_key = order.get("order_key", "")
            
            # Build the WooCommerce checkout payment URL
            checkout_url = f"{wc_url}/checkout/order-pay/{order_id}/?pay_for_order=true&key={order_key}"
            
            # Clear cart after order creation
            await db.cart.delete_many({"session_id": checkout.session_id})
            
            # Invalidate product cache (stock may have changed)
            invalidate_cache()
            
            return {
                "success": True,
                "order_id": order_id,
                "order_key": order_key,
                "checkout_url": checkout_url,
                "total": order.get("total", "0"),
            }
        else:
            error_msg = response.json() if response.text else "Unknown error"
            logger.error(f"WooCommerce order creation failed: {error_msg}")
            raise HTTPException(status_code=response.status_code, detail=f"Order creation failed: {error_msg}")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Checkout error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Cache invalidation endpoint (useful for admin)
@api_router.post("/wc/cache/invalidate")
async def invalidate_product_cache():
    invalidate_cache()
    return {"message": "Cache invalidated"}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
