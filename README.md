# Dhamaka Bites — Website

Static catalogue website for Dhamaka Bites, Tooting, London.

## File structure
- `index.html`        — the page (structure only; no content edits needed here)
- `css/style.css`     — all styling
- `js/config.js`      — **edit here**: phone, address, hours, order links, social links, ratings, hero photos
- `js/menu.js`        — **edit here**: dishes and prices
- `js/main.js`        — site logic (no need to edit for content)
- `assets/`           — logo, favicon, and food photos
- `_headers`          — security headers (Cloudflare Pages / Netlify)
- `robots.txt`, `sitemap.xml` — SEO
- `404.html`          — not-found page

## Common edits
**Change a price or dish:** open `js/menu.js`, edit the item, save, redeploy.
**Update hours / links / add social:** open `js/config.js`.
**Add food photos to the homepage slideshow:** put images in `assets/img/`, then in
`js/config.js` set `heroSlides: ["assets/img/dish1.jpg", "assets/img/dish2.jpg", ...]`.

## Deploy
Connected to Git → every push auto-deploys. Or drag the folder into Cloudflare Pages / Netlify.

© Dhamaka Bites. Built by [your agency].
