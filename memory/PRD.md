# Fairygarden For You - PRD

## Problem Statement
Single-page e-commerce website for a magical terrarium brand "Fairygarden For You". Full React frontend + FastAPI backend + WooCommerce integration.

## Core Architecture
- **Frontend**: React, Tailwind CSS, react-i18next (en/el/it), Framer Motion, lucide-react
- **Backend**: FastAPI (Python), MongoDB (sessions/forms), WooCommerce REST API (products/orders/customers)
- **Deployment**: cPanel/Passenger via manual curl commands from catbox.moe
- **Caching**: File-based JSON cache (`product_cache/*.json`) - survives process restarts

## What's Implemented
- Hero section with glass-morphism text
- Shop section (TerrariumGallery, DIYKits) with WooCommerce products
- Multi-step checkout modal with auth pre-step
- User auth (register/login/account) via WooCommerce Customer API
- Contact, Workshop, Newsletter forms (MongoDB)
- Custom terrarium builder
- Blog preview
- Cookie consent banner (GDPR)
- Terms & Conditions, Privacy Policy
- Multi-language support (en/el/it)
- File-based product cache system (P0 fix - March 2, 2026)

## File-Based Cache System (CRITICAL FIX)
- Products cached in `/product_cache/*.json` files
- `/api/wc/products` reads from file cache FIRST
- Background task refreshes cache every 10 min from WooCommerce
- If WooCommerce fails, old cache preserved (never overwritten with empty)
- Cache miss: sync fetch from WC, then write to file
- Survives process kills, cPanel/Passenger restarts, MongoDB outages

## Key Endpoints
- `GET /api/wc/products?lang=en&product_type=ready-florarium` - Products from file cache
- `GET /api/wc/cache/status` - Cache file status
- `POST /api/wc/cache/invalidate` - Force refresh cache
- `POST /api/wc/checkout` - Create WooCommerce order
- `POST /api/wc/customers/register` - Register customer
- `POST /api/wc/customers/login` - Login customer

## Test Results
- 80/80 tests passing (47 backend + 33 frontend)
- All product cache endpoints verified
- Auth, checkout, cart flows tested

## Backlog
- P1: Bank transfer text finalization
- P1: Shipping costs/options confirmation  
- P1: WooCommerce admin setup guidance
- P2: Coupon codes/discounts
- P2: Product reviews/ratings
- P2: Wishlist feature
- P2: Search bar
- P2: SEO meta tags
