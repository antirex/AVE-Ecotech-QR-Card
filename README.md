# AVE EcoTech — Website

Live site (GitHub Pages): `https://antirex.github.io/AVE-Ecotech-QR-Card/`

A single-page marketing website for **AVE EcoTech Pvt Ltd** — turning waste into sustainable infrastructure with 100% recycled, zero-cement construction materials (EcoTiles).

An editorial design — Fraunces serif display type, a warm cream/sage palette with terracotta and deep-forest-green accents — using real product photography from the company deck.

## What's here
- `index.html` — page markup (no build step)
- `styles.css` — all styles (light + dark themes via `[data-theme]`)
- `script.js` — behavior (theme toggle, mobile menu, scroll reveals, contact form)
- `images/` — product & lifestyle photos (extracted and optimized from the company deck), plus the transparent logo mark
- `favicon.png` / `favicon-32.png` / `apple-touch-icon.png` — brand favicons
- `robots.txt` / `sitemap.xml` — SEO
- `AVE-EcoTech-Deck.pdf` — company brochure, linked from the hero, EcoTiles section, contact section, and footer
- `logo.jpeg` — original AVE EcoTech logo (brand asset)
- `ave_ecotech_qr.png` — constant QR code (points to the GitHub Pages URL above)
- `product_brochure_QR.png` — QR code pointing to the product brochure (Google Drive)

## Features
- Light / dark theme toggle (remembers choice, respects OS preference)
- Responsive across phones/tablets/laptops/desktops (zero horizontal overflow)
- Contact form delivers inquiries to `aveecotech@gmail.com` via FormSubmit
- SEO: Open Graph + Twitter cards + JSON-LD structured data + sitemap

## How the QR code works
The printed QR code always points to the GitHub Pages URL. Visitors now land directly on the website. To change what visitors see, just edit `index.html` and commit — the QR code never needs to be reprinted.

## Sections
Hero · About (Biological Heritage Meets Technical Precision) · Material Properties · EcoTiles Series spec sheet · Comparison (Cement Paver vs EcoTiles) · Applications · Contact / inquiry form

## Setup (GitHub Pages)
**Settings → Pages → Source: Deploy from branch → Branch: `main` → `/` (root) → Save**

## QR code for website (as of 16/03/2026)
![AVE EcoTech QR Code](ave_ecotech_qr.png)

## QR code for brochure (as of 04/08/2026)
<img src="product_brochure_QR.png" alt="Product Brochure QR Code" width="250">

