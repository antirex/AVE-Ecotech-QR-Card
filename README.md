# AVE EcoTech — Website

Live site (GitHub Pages): `https://antirex.github.io/AVE-Ecotech-QR-Card/`

A single-page marketing website for **AVE EcoTech Pvt Ltd** — turning waste into sustainable infrastructure with 100% recycled, zero-cement construction materials (EcoTiles).

Built to the **AVE EcoTech Brand Guidelines (Edition 1.0, 2026)** with content from the product brochure:
- **Colour** — Deep Forest `#12322A`, Sage Mist `#E3EAE0`, Paper White `#F7F8F5`, Basalt `#161815`, with Kiln Clay `#C4753A` as an accent only (never a background, never body text, never type on a light ground)
- **Type** — Space Grotesk (display, sentence case), IBM Plex Sans (body), IBM Plex Mono (labels — upper case, letterspaced)
- **Devices** — hairline rules, the spec block, single-weight 24-grid icons. No gradients, no drop shadows, no decorative illustration
- **Voice** — plain speaking: no green vocabulary without a number behind it

## What's here
- `index.html` — page markup (no build step)
- `styles.css` — all styles (light + dark themes via `[data-theme]`)
- `script.js` — behavior (theme toggle, mobile menu, scroll reveals, contact form)
- `images/` — product & application photos (from the product brochure), `tile-*.jpg` single-colour tiles for the colour picker (cut from the product photo; `tile-sand.jpg` is a re-tinted colour preview), `partners/` logos, `monogram.svg`, `og-image.jpg` (social share card) and `AVE-BondBadge-Reverse.jpg` (supplied reverse logo artwork)
- `favicon.png` / `favicon-32.png` / `apple-touch-icon.png` — favicons (the brick monogram)
- `robots.txt` / `sitemap.xml` — SEO
- `AVE-EcoTech-Brochure.pdf` — current product brochure. **Not linked directly**: every "Get the brochure" button opens a short lead form (name, phone, email, organisation, role) that is emailed via FormSubmit, then the download starts. The brochure keeps the detail the site deliberately leaves out (full specs, test data, the cement comparison)
- `AVE-EcoTech-Deck.pdf` — previous company deck (no longer linked from the site)
- `logo.jpeg` — previous AVE EcoTech logo (superseded by the brick monogram)
- `ave_ecotech_qr.png` — constant QR code (points to the GitHub Pages URL above)
- `product_brochure_QR.png` — QR code pointing to the product brochure (Google Drive)

## Features
- Light / dark theme toggle (remembers choice, respects OS preference)
- Responsive across phones/tablets/laptops/desktops (zero horizontal overflow)
- Contact form and brochure lead form both deliver to `aveecotech@gmail.com` via FormSubmit
- Colour picker: click a swatch and the tile photo changes
- Verified with a headless-Chrome sweep: no horizontal overflow at any width from 320px to 3840px, light and dark
- SEO: Open Graph + Twitter cards + JSON-LD structured data + sitemap

## How the QR code works
The printed QR code always points to the GitHub Pages URL. Visitors now land directly on the website. To change what visitors see, just edit `index.html` and commit — the QR code never needs to be reprinted.

## Sections
Hero (tagline, animated brick bond, four key figures) · 01 Why it matters (the planet, in sourced numbers) · 02 The product (colour picker, brochure CTA) · 03 Proof (what buyers say, trusted by; founders block is in the HTML, commented out until names/photos arrive) · 04 Who it is for (builders · green architects · government) + Green credits (IGBC · LEED · GRIHA · GEM) · 05 Where it is used · 06 About us (vision, mission, four commitments) · 07 FAQ (accordion, also published as FAQPage structured data) · 08 Next step (contact / inquiry form)

The site is written for the buyer — builders, green architects, public bodies — not as a product sheet. It never names the raw-material recipe; it says "plastic and industrial waste". It does not name the testing laboratory either. Copy is kept short on purpose — detail lives in the gated brochure.

## Setup (GitHub Pages)
**Settings → Pages → Source: Deploy from branch → Branch: `main` → `/` (root) → Save**

## QR code for website (as of 16/03/2026)
<img src="ave_ecotech_qr.png" alt="Website QR Code" width="250">

## QR code for brochure (as of 04/08/2026)
<img src="product_brochure_QR.png" alt="Product Brochure QR Code" width="250">

