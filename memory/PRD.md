# Fairygarden For You - Product Requirements Document

## Original Problem Statement
Design a single-page website homepage for a magical terrarium brand called "Fairygarden For You" with the tagline 'A Touch of Magic in a Bottle'. The aesthetic should be a dark enchanted forest with gold accents.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: FastAPI (Python)
- **Database**: MySQL on cPanel
- **Deployment**: cPanel with Phusion Passenger

## Live URLs
- **Website**: https://fairygarden4u.com
- **Backend API**: https://fairygarden4u.com/api

---

## What's Been Implemented

### Core Features
- [x] Hero section with animated stars/sparkles
- [x] Terrarium Gallery with golden window frame design
- [x] Product Detail Modal (fixed broken frame image)
- [x] "Build Your Own Terrarium" configurator with price calculator
- [x] Shopping cart functionality
- [x] DIY Kits section
- [x] For Business section with inquiry form
- [x] Workshops section with signup form
- [x] Blog Preview section
- [x] About section with "About Me" and "Our Story" modals
- [x] Footer with newsletter signup
- [x] Sticky navigation header
- [x] Scroll to Top button
- [x] Cookie consent banner (GDPR)
- [x] Language switcher (EN, HU, GR, IT)
- [x] Responsive design (mobile, tablet, desktop)
- [x] Custom favicon and page title

### Legal Pages (March 1, 2025)
- [x] **Terms & Conditions Modal** - Full unabbreviated text from user's document
- [x] **Privacy Policy Modal** - Full unabbreviated text from user's document
- [x] Footer links to T&C and Privacy modals
- [x] All form checkbox links updated to open modals:
  - Workshop form privacy link
  - For Business form privacy link
  - Custom Terrarium Builder privacy & terms links
  - Cookie Consent privacy link
  - Newsletter form privacy link
- [x] Removed T&C and Privacy links from main navigation

### Recent Updates (Feb 28, 2025)
- [x] Doubled stars and sparkles density (60 stars in Hero, 360 particles in MagicalDivider)
- [x] Smooth, flowing animations (linear easing, 12-22 second cycles, elliptical paths)
- [x] Fixed Product Detail Modal broken frame image
- [x] Updated Premium Collection product image

---

## Pending Tasks

### P1 - High Priority
- [ ] Stripe payment integration
- [ ] Admin dashboard (products, orders, blog management)
- [ ] Replace remaining placeholder content (About Us, contact info)

### P2 - Medium Priority
- [ ] User accounts (registration, login, order history)
- [ ] Full blog page with detailed post views
- [ ] SEO meta tags implementation

### P3 - Low Priority
- [ ] Database cleanup (remove duplicate product entries)

---

## Database Schema

**Table**: `products` in `medisolu_fairygarden`
- `id` (UUID)
- `name` (VARCHAR)
- `description` (TEXT)
- `price` (DECIMAL)
- `image` (VARCHAR - absolute URL)
- `category` (VARCHAR)
- `created_at` (DATETIME)

---

## Code Architecture

### Modal System
- **App.js**: Contains global modal state (isTermsOpen, isPrivacyOpen)
- **Event Listeners**: Use `window.dispatchEvent(new CustomEvent('openTermsModal'))` to trigger modals from anywhere
- **Modal Components**: Located in `/app/frontend/src/components/sections/`
  - `TermsConditions.js` - Exports `TermsModal` component with full legal text
  - `PrivacyPolicy.js` - Exports `PrivacyModal` component with full GDPR text

### Key Files
- `frontend/src/components/sections/Footer.js` - Footer with legal links
- `frontend/src/components/Navigation.js` - Main menu (no longer has legal links)
- `frontend/src/components/sections/Workshops.js` - Workshop form
- `frontend/src/components/sections/ForBusiness.js` - Business inquiry form
- `frontend/src/components/CustomTerrariumBuilder.js` - Build Your Own form
- `frontend/src/components/CookieConsent.js` - GDPR cookie banner
- `frontend/src/locales/*.json` - Translation files (hu, en, el, it)

---

## Deployment Notes

### Critical: cPanel Deployment Process
1. Build frontend: `yarn build`
2. Upload JS/CSS to file hosting (litterbox.catbox.moe)
3. User runs `curl -L -o` commands in cPanel Terminal
4. Update `index.html` with new filenames via `sed`
5. Backend restart: `touch ~/fairygarden-backend/tmp/restart.txt`

### Important Files on cPanel
```
/home/medisolu/
├── fairygarden4u.com/          # Frontend webroot
│   ├── static/css/main.*.css
│   ├── static/js/main.*.js
│   ├── ablak_frame.png         # Golden window frame
│   └── [product images].jpg
│
└── fairygarden-backend/        # Backend
    ├── server.py
    └── tmp/restart.txt         # Touch to restart
```

### Cache Issues
Always instruct user to:
1. Restart backend: `touch ~/fairygarden-backend/tmp/restart.txt`
2. Hard refresh: Ctrl+Shift+R
3. Check in incognito window

---

## User Language
The user communicates in **Hungarian**. All responses should be in Hungarian.
