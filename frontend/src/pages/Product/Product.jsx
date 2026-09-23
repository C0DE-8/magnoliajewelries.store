import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiHeart, FiTruck, FiGift, FiShare2, FiCheck } from "react-icons/fi";
import { products, money } from "../../data/products";
import { ShopContext } from "../../context/ShopContext";
import ProductCard from "../../components/ProductCard";
import SEO from "../../components/SEO";
import NotFound from "../NotFound/NotFound";
export default function Product() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  if (!product) return <NotFound />;
  return <ProductDetail key={slug} product={product} />;
}
function ProductDetail({ product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const { favorites, toggleFavorite, addToBag } = useContext(ShopContext);
  const share = async () => {
    try {
      if (navigator.share)
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      else {
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage("Link copied");
      }
    } catch {
      setShareMessage("Copy the page address to share this piece.");
    }
  };
  return (
    <>
      <SEO
        title={product.name}
        description={product.description}
        image={"/images/" + product.image + ".jpg"}
      />
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/shop">All jewelry</Link>
          <span>/</span>
          <Link to={"/shop?category=" + product.category}>
            {product.category}
          </Link>
          <span>/</span>
          {product.name}
        </div>
        <section className="product-detail">
          <div className="detail-image">
            <img src={"/images/" + product.image + ".jpg"} alt={product.name} />
          </div>
          <div className="detail-copy">
            <span className="eyebrow">A LITTLE PIECE OF MAGNOLIA</span>
            <h1>{product.name}</h1>
            <p className="detail-material">{product.material}</p>
            <p className="detail-price">{money(product.price)}</p>
            <p>{product.description}</p>
            <div className="finish">
              <span className="gold-swatch" /> Warm gold
            </div>
            <label className="size-label" htmlFor="size">
              {product.category === "Rings" ? "Ring size" : "Size"}{" "}
              <Link to="/information/sizing">Size guide</Link>
            </label>
            <select
              id="size"
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
                setAdded(false);
              }}
            >
              {product.sizes.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <div className="purchase-actions">
              <button
                className="button"
                onClick={() => {
                  addToBag(product.id, size);
                  setAdded(true);
                }}
              >
                {added ? (
                  <>
                    <FiCheck /> Add another to bag
                  </>
                ) : (
                  "Add to bag"
                )}
              </button>
              <button
                className={
                  "favorite-button " +
                  (favorites.includes(product.id) ? "saved" : "")
                }
                aria-label="Save to wishlist"
                aria-pressed={favorites.includes(product.id)}
                onClick={() => toggleFavorite(product.id)}
              >
                <FiHeart />
              </button>
            </div>
            {added && (
              <p className="added-message" role="status">
                A lovely choice. <Link to="/bag">View your bag →</Link>
              </p>
            )}
            <div className="detail-perks">
              <span>
                <FiTruck /> Complimentary delivery on orders £100+
              </span>
              <span>
                <FiGift /> A little gift, beautifully wrapped
              </span>
            </div>
            <details>
              <summary>Details & materials</summary>
              <p>
                {product.material}. This is a demonstration product; photography
                is illustrative. Final measurements and specifications will be
                available when the collection launches.
              </p>
            </details>
            <details>
              <summary>Care for your piece</summary>
              <p>
                Keep dry, avoid perfumes and lotions, and gently polish with a
                soft cloth. Store separately in a soft pouch.
              </p>
            </details>
            <button className="share-button" onClick={share}>
              <FiShare2 /> Share this piece
            </button>
            <span role="status" className="share-status">
              {shareMessage}
            </span>
          </div>
        </section>
        <section className="section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">BETTER TOGETHER</span>
              <h2>A few more to fall for.</h2>
            </div>
          </div>
          <div className="product-grid">
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
