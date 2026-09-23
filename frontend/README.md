# Magnolia Jewelries

A responsive React storefront with a warm ivory, burgundy, and gold visual identity.

## Run locally

Use Node.js 22.16+ (or a supported newer release).

```sh
npm install
npm run dev
```

## Project structure

- `src/pages/`: Home, Shop, Product, Wishlist, Bag, Checkout, Invoice, Journal, About, Information, and NotFound, each in its own folder.
- `src/components/`: reusable Header, Footer, ProductCard, and SEO.
- `src/context/ShopContext.jsx`: persistent favorites and shopping bag.
- `src/data/products.js`: twelve editable demo products, prices, images, sizes, style references, fit, and care information.
- `src/data/store.js`: customer-facing contact details, payment preferences, currency, delivery, and wrapping prices.
- `src/data/editorial.js`: journal articles and FAQs.
- `src/context/InvoiceContext.jsx`: invoice snapshots in sessionStorage, with an in-memory fallback and removal controls.
- `src/commerce.css`: slider, editorial sections, checkout, invoice, and print styles.
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

Deploy the complete `dist` directory. The build generates 28 HTML entry documents, including one per product and journal article. Their Open Graph and Twitter metadata is present in the initial HTML so social crawlers can read each product's title, description, and image without executing JavaScript. Personal invoices are not included in the build or sitemap.

The default public origin is `https://magnoliajewelries.store`. Set the `SITE_URL` environment variable before building if deploying elsewhere. Images must be publicly reachable for sharing previews.

Serve existing route directories before the SPA fallback. Netlify's `public/_redirects` and the Vercel filesystem-first routes are included. On other hosts, serve the requested route's `index.html` if present, then fall back to the root `index.html` for unknown routes. Use `frontend` as the project root, `npm run build` as the build command, and `dist` as the output directory.

## Demo boundaries

Product names, prices, materials, photography, and delivery costs are illustrative. Replace them with your actual catalog before launch. Inventory, order submission, payment verification, and newsletter delivery are not connected.

## Contact-to-pay flow

Customers select a preferred payment method, enter delivery details, and create an itemized order-request invoice. No payment is taken on the website. The invoice includes a unique reference, issue date, immutable item/price snapshot, delivery, optional gift wrapping, total, and payment preference. It can be printed or saved as PDF using the browser print dialog, downloaded as a text record, or copied as a message.

Add your public `supportEmail`, `whatsapp` (international digits), and optional `businessAddress` in `src/data/store.js`. WhatsApp and email links then appear on invoices and open a prefilled message; sending remains the customer's choice. Until contact details are supplied, the invoice offers a copyable request without inventing contact information. Payment methods are preferences to discuss, not claims that every method is accepted.

Invoices and customer information are saved only in the current tab's sessionStorage (up to ten invoices), never in the share URL or localStorage. They survive refresh in the same tab but may disappear when it closes. Customers can remove individual invoices. If browser storage is unavailable, the invoice remains available in memory with a save-before-leaving notice. Nothing is transmitted to Magnolia automatically. A production order service is needed for cross-device invoice lookup, order management, and payment confirmation.

The homepage carousel supports previous/next, direct slide selection, keyboard arrows, and pause/play. It pauses on hover and focus and starts paused for reduced-motion preferences. Browser tests cover checkout validation, total calculations, invoice persistence and deletion, download/print controls, mobile layouts, storage failures, editorial links, and the slider.

Fonts load from Google Fonts. Photo source identifiers are in `public/images/credits.txt`. Replace the placeholder delivery, privacy, terms, and contact copy with your business's approved information before opening the shop.
