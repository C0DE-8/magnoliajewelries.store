# Magnolia Jewelries

A responsive React storefront with a warm ivory, burgundy, and gold visual identity.

## Run locally

Use Node.js 22.16+ (or a supported newer release).

```sh
npm install
npm run dev
```

## Project structure

- `src/pages/`: Home, Shop, Product, Wishlist, Bag, About, Information, and NotFound, each in its own folder.
- `src/components/`: reusable Header, Footer, ProductCard, and SEO.
- `src/context/ShopContext.jsx`: persistent favorites and shopping bag.
- `src/data/products.js`: eight editable demo products, prices, images, and sizes.
- `src/index.css`: design tokens, layouts, and mobile styles.
- `public/images/`: locally stored demo photography and social preview.
- `scripts/generate-pages.mjs`: builds route-specific social metadata, sitemap, and robots.txt.
- `tests/storefront.spec.js`: browser tests for shopping interactions and sharing metadata.

React Router DOM handles navigation. React Icons supplies interface icons. Favorites and bag contents are saved in localStorage, with an in-memory fallback.

## Check and build

```sh
npm run lint
npm run build
npm run test:e2e
npm run preview
```

Browser tests use installed Google Chrome. Run the build before tests. Tests cover image loading, search, filters, sorting, wishlist persistence, bag quantities and totals, mobile navigation, product metadata, the not-found page, and newsletter feedback.

## Deployment and link previews

Deploy the complete `dist` directory. The build generates 19 HTML entry documents, including one per product. Their Open Graph and Twitter metadata is present in the initial HTML so social crawlers can read each product's title, description, and image without executing JavaScript.

The default public origin is `https://magnoliajewelries.store`. Set the `SITE_URL` environment variable before building if deploying elsewhere. Images must be publicly reachable for sharing previews.

Serve existing route directories before the SPA fallback. Netlify's `public/_redirects` and the Vercel filesystem-first routes are included. On other hosts, serve the requested route's `index.html` if present, then fall back to the root `index.html` for unknown routes. Use `frontend` as the project root, `npm run build` as the build command, and `dist` as the output directory.

## Demo boundaries

Product names, prices, materials, photography, and delivery costs are illustrative. Replace them with your actual catalog before launch. Payments, orders, newsletter delivery, customer support, and inventory are not connected. Checkout and newsletter interactions explain their demo status; neither collects payment nor sends email.

Fonts load from Google Fonts. Photo source identifiers are in `public/images/credits.txt`. Replace the placeholder delivery, privacy, terms, and contact copy with your business's approved information before opening the shop.
