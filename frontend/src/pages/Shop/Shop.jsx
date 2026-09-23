import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import SEO from "../../components/SEO";
import { categories, products } from "../../data/products";
export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "All jewelry";
  const collection = params.get("collection");
  const query = params.get("q") || "";
  const title = query
    ? "A little something called “" + query + "”"
    : collection === "new"
      ? "Fresh little obsessions."
      : collection === "bestsellers"
        ? "Loved, worn, repeated."
        : collection === "gifts"
          ? "A little love, beautifully wrapped."
          : "Find a piece of yourself.";
  const filtered = products
    .filter(
      (p) =>
        (category === "All jewelry" || p.category === category) &&
        (!params.get("max") || p.price <= Number(params.get("max"))) &&
        (!query ||
          (p.name + " " + p.material + " " + p.category)
            .toLowerCase()
            .includes(query.toLowerCase())) &&
        (collection !== "new" || p.tag === "NEW") &&
        (collection !== "bestsellers" || p.id <= 4) &&
        (collection !== "gifts" || p.price <= 110),
    )
    .sort((a, b) =>
      params.get("sort") === "price-low"
        ? a.price - b.price
        : params.get("sort") === "price-high"
          ? b.price - a.price
          : a.id - b.id,
    );
  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  };
  return (
    <>
      <SEO title={collection ? title : category} />
      <div className="page-intro">
        <span className="eyebrow">THE MAGNOLIA COLLECTION</span>
        <h1>{title}</h1>
        <p>Thoughtful treasures, for every version of you.</p>
      </div>
      <section className="container shop-section">
        <div className="shop-toolbar">
          <div className="category-tabs">
            {categories.map((c) => (
              <button
                className={category === c ? "active" : ""}
                onClick={() => update("category", c === "All jewelry" ? "" : c)}
                key={c}
              >
                {c}
              </button>
            ))}
          </div>
          <select
            aria-label="Sort products"
            value={params.get("sort") || "featured"}
            onChange={(e) => update("sort", e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </div>
        <p className="results-count">
          {filtered.length} beautiful little{" "}
          {filtered.length === 1 ? "piece" : "pieces"}
          {(query || collection || params.get("max")) && (
            <button className="text-link" onClick={() => setParams({})}>
              Clear filters
            </button>
          )}
        </p>
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {!filtered.length && (
          <div className="empty-state">
            <h2>No pieces found just yet.</h2>
            <p>Try another search or explore the full collection.</p>
            <button className="button" onClick={() => setParams({})}>
              Explore all jewelry
            </button>
          </div>
        )}
      </section>
    </>
  );
}
