# Fairygarden For You - PRD

## Problem Statement
Full-stack e-commerce website for a magical terrarium brand "Fairygarden For You". React frontend + FastAPI backend + WooCommerce/WordPress integration.

## Core Architecture
- **Frontend**: React, react-router-dom, Tailwind CSS, react-i18next (en/el only), Framer Motion, lucide-react
- **Backend**: FastAPI (Python), MongoDB (sessions/forms), WooCommerce REST API (products/orders/customers)
- **Newsletter**: MailPoet via WordPress admin-ajax.php endpoint
- **Deployment**: cPanel via manual curl + tar extraction, SpeedyCache must be cleared after each deploy
- **Caching**: File-based JSON cache (`product_cache/*.json`) - survives process restarts

## What's Implemented
- Hero section with glass-morphism text
- Shop section (TerrariumGallery, DIYKits, Plants, SubstratesBugs) with WooCommerce products
- Multi-step checkout modal with auth pre-step
- User auth (register/login/account) via WooCommerce Customer API
- Contact, Workshop, Newsletter forms (MailPoet integration)
- Custom terrarium builder
- Blog preview
- Cookie consent banner (GDPR)
- Terms & Conditions, Privacy Policy
- Multi-language support (English and Greek only)
- File-based product cache system
- **Corporate Multi-Page Section** (March 19, 2026):
  - `/corporate` - Main corporate landing page
  - `/corporate/experiences` - Team experiences index
  - `/corporate/experiences/retreat` - Team Retreat page
  - `/corporate/experiences/team-building` - Team Building page
  - `/corporate/solutions` - Florarium solutions index
  - `/corporate/solutions/branded-florariums` - Branded Florariums page
  - `/corporate/solutions/office-decor` - Office Decor page
  - `/corporate/solutions/event-decor` - Event Decor page
  - `/corporate/solutions/partner-gifts` - Partner Gifts page
- "Under Construction" banner (temporarily disabled with BANNER_ENABLED flag)

## Key Files - Corporate Section
- `/app/frontend/src/pages/corporate/CorporateHome.js` - Main corporate page
- `/app/frontend/src/pages/corporate/CorporateLayout.js` - Layout wrapper
- `/app/frontend/src/pages/corporate/experiences/ExperiencesIndex.js` - Experiences listing
- `/app/frontend/src/pages/corporate/solutions/SolutionsIndex.js` - Solutions listing
- `/app/frontend/src/components/UnderConstructionBanner.js` - Banner (disabled)

## Key Endpoints
- `GET /api/wc/products?lang=en&product_type=ready-florarium` - Products from file cache
- `GET /api/wc/cache/status` - Cache file status
- `POST /api/wc/cache/invalidate` - Force refresh cache
- `POST /api/wc/checkout` - Create WooCommerce order
- `POST /api/wc/customers/register` - Register customer
- `POST /api/wc/customers/login` - Login customer
- `POST https://fairygarden4u.com/shop/wp-admin/admin-ajax.php` (action=mailpoet_subscribe) - Newsletter

## Deployment Instructions
1. Build frontend: `cd /app/frontend && yarn build`
2. Create package: `cd /app/frontend/build && tar -czf ../public/deploy.tar.gz *`
3. User runs curl command from catbox.moe URL to extract to webroot
4. Clear SpeedyCache in WordPress admin after deploy

## Test Results
- 80/80 tests passing (47 backend + 33 frontend)
- All product cache endpoints verified
- Auth, checkout, cart flows tested

## Backlog
- P1: Content population for 8 corporate subpages
- P1: Add products for Plants and Substrates & Bugs WooCommerce categories
- P1: Bank transfer text finalization
- P1: Shipping costs/options confirmation  
- P1: WooCommerce admin setup guidance
- P2: Mobile app (novenyapp) integration with WooCommerce
- P2: Coupon codes/discounts
- P2: Product reviews/ratings
- P2: Wishlist feature
- P2: Search bar
- P2: SEO meta tags
