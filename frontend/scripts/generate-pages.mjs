import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { products } from "../src/data/products.js";
import { articles } from "../src/data/editorial.js";

const origin = (
  process.env.SITE_URL || "https://magnoliajewelries.store"
).replace(/\/$/, "");
const output = resolve("dist");
const template = await readFile(resolve(output, "index.html"), "utf8");
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
const defaultDescription =
  "Discover Magnolia Jewelries. Thoughtful gold pieces, beautiful gemstones, and little treasures for your everyday. Find a piece of yourself.";
const pages = [
  { path: "", title: "Jewelry for your everyday, and your forever" },
  { path: "shop", title: "The jewelry collection" },
  { path: "about", title: "Our story" },
  { path: "checkout", title: "Checkout & invoice", private: true },
  { path: "journal", title: "The Magnolia journal" },
  ...articles.map((article) => ({
    path: "journal/" + article.slug,
    title: article.title,
    description: article.excerpt,
    image: "/images/" + article.image + ".jpg",
  })),
  { path: "wishlist", title: "Your saved pieces", private: true },
  { path: "bag", title: "Your shopping bag", private: true },
  ...["delivery", "care", "sizing", "contact", "privacy", "terms"].map(
    (topic) => ({
      path: "information/" + topic,
      title: {
        delivery: "Delivery & returns",
        care: "Jewelry care",
        sizing: "Size guide",
        contact: "Contact us",
        privacy: "Privacy policy",
        terms: "Terms of use",
      }[topic],
    }),
  ),
  ...products.map((product) => ({
    path: "product/" + product.slug,
    title: product.name,
    description: product.description,
    image: "/images/" + product.image + ".jpg",
  })),
];
for (const page of pages) {
  const title = page.title + " | Magnolia Jewelries";
  const url = origin + "/" + page.path;
  const image = origin + (page.image || "/images/social-cover.jpg");
  let html = template.replace(
    /<title>[\s\S]*?<\/title>/,
    "<title>" + escape(title) + "</title>",
  );
  const metadata = {
    description: page.description || defaultDescription,
    "og:title": title,
    "og:description": page.description || defaultDescription,
    "og:url": url,
    "og:image": image,
    "og:image:alt": page.title,
    "twitter:title": title,
    "twitter:description": page.description || defaultDescription,
    "twitter:image": image,
  };
  for (const [key, value] of Object.entries(metadata)) {
    const attribute = key.startsWith("og:") ? "property" : "name";
    html = html.replace(
      new RegExp(
        "<meta\\s+" + attribute + '="' + key + '"\\s+content="[^"]*"\\s*/>',
      ),
      "<meta " +
        attribute +
        '="' +
        key +
        '" content="' +
        escape(value) +
        '" />',
    );
  }
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    '<link rel="canonical" href="' + escape(url) + '" />',
  );
  if (page.image)
    html = html.replace(
      /\s*<meta property="og:image:(width|height)"[^>]*>/g,
      "",
    );
  if (page.private)
    html = html.replace(
      "</head>",
      '<meta name="robots" content="noindex,follow" />\n  </head>',
    );
  const directory = resolve(output, page.path);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, "index.html"), html);
}
await writeFile(
  resolve(output, "sitemap.xml"),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    pages
      .filter((page) => !page.private)
      .map(
        (page) =>
          "<url><loc>" + escape(origin + "/" + page.path) + "</loc></url>",
      )
      .join("") +
    "</urlset>\n",
);
await writeFile(
  resolve(output, "robots.txt"),
  "User-agent: *\nAllow: /\nSitemap: " + origin + "/sitemap.xml\n",
);
console.log(
  "Generated " +
    pages.length +
    " route documents with social metadata, plus sitemap and robots.txt.",
);
