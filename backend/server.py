from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from woocommerce import API as WooCommerceAPI

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
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CartItemCreate(BaseModel):
    session_id: str
    product_id: str
    product_name: str
    product_price: float
    product_image: str
    quantity: int = 1

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
    size: str  # S, M, L, XL
    glass_type: str  # container, bottle
    world: str  # minimal, colorful, fairytale, magical, carnivorous, jungle
    lighting: bool
    message: Optional[str] = None
    calculated_price: float
    deposit_amount: Optional[float] = None
    subscribed_to_newsletter: bool = False
    status: str = "pending"  # pending, contacted, in_progress, completed
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
    
    # Also subscribe to newsletter if opted in
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
    """Get translated field from WooCommerce custom meta fields.
    Custom fields format: name_el, name_it, description_el, description_it
    """
    if lang == 'en':
        # English is the default, use the main field
        if field == 'name':
            return product.get('name', '')
        elif field == 'description':
            return product.get('short_description', '') or product.get('description', '')
    
    # Look for translated field in meta_data
    meta_key = f"{field}_{lang}"
    meta_data = product.get('meta_data', [])
    
    for meta in meta_data:
        if meta.get('key') == meta_key:
            value = meta.get('value', '')
            if value:
                return value
    
    # Fallback to English if translation not found
    if field == 'name':
        return product.get('name', '')
    elif field == 'description':
        return product.get('short_description', '') or product.get('description', '')
    
    return ''

# WooCommerce API Routes
@api_router.get("/wc/products")
async def get_wc_products(lang: str = 'en', product_type: str = None):
    """Fetch products from WooCommerce with optional language translation.
    
    product_type filter:
    - 'ready-florarium': Show products in Ready Florariums category OR variable products with that variation
    - 'diy-kit': Show products in DIY Kits category OR variable products with that variation
    """
    if not wcapi:
        raise HTTPException(status_code=503, detail="WooCommerce not configured")
    try:
        # Build params based on filter
        params = {"per_page": 100, "status": "publish"}
        
        response = wcapi.get("products", params=params)
        if response.status_code == 200:
            products = response.json()
            result = []
            
            for p in products:
                is_variable = p.get("type") == "variable"
                
                # Build product data
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
                
                # Filter by product_type
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
                        # For variable products, fetch the specific variation price
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
            
            return result
        else:
            raise HTTPException(status_code=response.status_code, detail="WooCommerce API error")
    except Exception as e:
        logger.error(f"WooCommerce API error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/wc/products/{product_id}")
async def get_wc_product(product_id: int, lang: str = 'en'):
    """Fetch single product from WooCommerce with optional language translation"""
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
    except Exception as e:
        logger.error(f"WooCommerce API error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/wc/categories")
async def get_wc_categories():
    """Fetch product categories from WooCommerce"""
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
    except Exception as e:
        logger.error(f"WooCommerce API error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/wc/status")
async def get_wc_status():
    """Check WooCommerce connection status"""
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

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()