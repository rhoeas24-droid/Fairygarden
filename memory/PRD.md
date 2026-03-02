# Fairygarden For You - Product Requirements Document

## Original Problem Statement
Design and build a single-page website for a magical terrarium brand, "Fairygarden For You". The project includes a full React frontend, FastAPI backend, and complete e-commerce solution powered by WooCommerce.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Framer Motion, react-i18next, @tsparticles/react v3
- **Backend**: FastAPI (Python), Motor (async MongoDB driver)
- **E-commerce/CMS**: WordPress + WooCommerce (Variable Products, Custom Fields for translations)
- **Database**: MongoDB (cart, forms, sessions), MySQL (WordPress/WooCommerce)
- **Deployment**: Manual cPanel deployment via curl commands

## Live URLs
- **Website**: https://fairygarden4u.com
- **Backend API**: https://fairygarden4u.com/api
- **Preview**: https://enchanted-terrariums.preview.emergentagent.com

---

## What's Been Implemented

### Core Features
- [x] Hero section with animated stars/sparkles
- [x] Terrarium Gallery with golden window frame design
- [x] Product Detail Modal
- [x] "Build Your Own Terrarium" configurator with price calculator
- [x] Shopping cart functionality with variation_id support
- [x] DIY Kits section
- [x] For Business section with inquiry form
- [x] Workshops section with signup form
- [x] Blog Preview section
- [x] About section with particle "murmuration" animation
- [x] Footer with newsletter signup
- [x] Sticky navigation header
- [x] Scroll to Top button
- [x] Cookie consent banner (GDPR)
- [x] Language switcher (EN, GR, IT)
- [x] Responsive design (mobile, tablet, desktop)
- [x] Custom favicon and page title

### Legal Pages
- [x] Terms & Conditions Modal
- [x] Privacy Policy Modal
- [x] Footer links to T&C and Privacy modals
- [x] All form checkbox links updated to open modals

### WooCommerce Integration
- [x] Variable Products (Ready Florarium / DIY Kit variants)
- [x] Custom fields for translations (name_el, name_it, description_el, description_it)
- [x] Backend proxy for WooCommerce REST API
- [x] Category-based product filtering
- [x] Variation price fetching for Variable Products
- [x] DIY Kit Details Modal

### Backend TTL Cache (Mar 2, 2026)
- [x] 5-minute TTL cache for WooCommerce product API responses
- [x] Cache invalidation endpoint (POST /api/wc/cache/invalidate)
- [x] Automatic cache invalidation on checkout
- [x] Logger initialization fix (moved to top of server.py)

### WooCommerce Checkout (Mar 2, 2026)
- [x] POST /api/wc/checkout creates WooCommerce order from cart
- [x] Returns checkout URL for WooCommerce native payment page
- [x] Cart cleared automatically after order creation
- [x] **Custom CheckoutModal** with dark forest/gold design matching the site
- [x] Billing details form (name, email, phone)
- [x] Shipping address form (address, city, postcode, country)
- [x] Order notes field
- [x] Order summary with cart items and total
- [x] Loading state and error handling
- [x] Redirects to WooCommerce payment page in new tab after order creation
- [x] Multi-language support (EN, GR, IT) for all checkout labels

### Bug Fixes (Mar 2, 2026)
- [x] Fixed DIY Kit price bug (removed incorrect 0.85 multiplier)
- [x] Added variation_id support in cart items
- [x] Fixed GoldButton disabled state support
- [x] Fixed SparkleBackground tsparticles v3 incompatibility
- [x] Corrected Greek/Italian gender translations for Founder title

---

## Pending Tasks

### P1 - High Priority
- [ ] Customer Portal (registration, login, order history)
- [ ] Admin Dashboard confirmation (WooCommerce admin sufficient?)
- [ ] Shipping cost calculation
- [ ] Order confirmation email verification

### P2 - Medium Priority
- [ ] Coupon codes and discounts
- [ ] Product reviews and ratings
- [ ] Wishlist feature
- [ ] Product search bar
- [ ] SEO meta tags implementation
- [ ] Order tracking feature

### P3 - Low Priority / Tech Debt
- [ ] Legacy MySQL `products` table cleanup
- [ ] i18n-navigation test update (quarantined)
- [ ] server.py refactoring for even better WC API handling

---

## Database Schema

### MongoDB Collections
- `cart`: session_id, product_id, product_name, product_price, product_image, quantity, variation_id
- `contacts`: name, email, company, message
- `workshops`: name, email, phone, workshop_type
- `newsletter`: email
- `custom_terrariums`: name, email, size, glass_type, world, lighting, calculated_price
- `blog`: title, excerpt, content, image, author

### WooCommerce (WordPress MySQL)
- Products, Categories, Variations via REST API

---

## Key API Endpoints
- `GET /api/wc/products?lang=en&product_type=ready-florarium|diy-kit` - Products (cached)
- `GET /api/wc/products/{id}?lang=en` - Single product
- `POST /api/wc/checkout` - Create WooCommerce order, return checkout URL
- `POST /api/wc/cache/invalidate` - Clear product cache
- `POST/GET/DELETE /api/cart/{session_id}` - Cart CRUD
- `POST /api/contact` - Contact form
- `POST /api/workshop/register` - Workshop registration
- `POST /api/newsletter/subscribe` - Newsletter
- `POST /api/custom-terrarium` - Custom terrarium order

---

## Code Architecture

### Key Files
- `backend/server.py` - FastAPI backend with WC proxy, cache, checkout
- `frontend/src/components/CheckoutModal.js` - Custom checkout form
- `frontend/src/components/CartDrawer.js` - Cart with checkout modal trigger
- `frontend/src/components/sections/TerrariumGallery.js` - Ready Florariums
- `frontend/src/components/sections/DIYKits.js` - DIY Kits
- `frontend/src/contexts/CartContext.js` - Cart state management
- `frontend/src/components/SparkleBackground.js` - Particle animation (v3)
- `frontend/src/locales/{en,el,it}.json` - Translations

---

## Deployment Notes

### Critical: cPanel Deployment Process
1. Build frontend: `yarn build`
2. Upload JS/CSS to file hosting (litterbox.catbox.moe)
3. User runs `curl -L -o` commands in cPanel Terminal
4. Backend restart: `touch ~/fairygarden-backend/tmp/restart.txt`

### Cache Issues
Always instruct user to:
1. Restart backend: `touch ~/fairygarden-backend/tmp/restart.txt`
2. Hard refresh: Ctrl+Shift+R
3. Check in incognito window

---

## User Language
The user communicates in **Hungarian**. All responses must be in Hungarian.

## Testing Status
- Backend: 29/29 tests pass
- Frontend: 16/16 tests pass
- Total: 45/45 (100% pass rate)
- Test files: /app/backend/tests/test_woocommerce.py, /app/tests/e2e/woocommerce-products.spec.ts, /app/tests/e2e/cart-checkout.spec.ts, /app/tests/e2e/checkout-modal.spec.ts
