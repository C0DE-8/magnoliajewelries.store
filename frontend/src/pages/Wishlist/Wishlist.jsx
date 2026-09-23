import { useContext } from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { ShopContext } from "../../context/ShopContext";
import { products } from "../../data/products";
import ProductCard from "../../components/ProductCard";
import SEO from "../../components/SEO";
export default function Wishlist() {
  const { favorites } = useContext(ShopContext);
  const saved = products.filter((p) => favorites.includes(p.id));
  return (
    <>
      <SEO title="Your saved pieces" noIndex />
      <div className="page-intro">
        <span className="eyebrow">KEEP THEM CLOSE</span>
        <h1>Your little wish list.</h1>
        <p>All the pieces you’ve fallen for, in one lovely place.</p>
      </div>
      <section className="container shop-section">
        {saved.length ? (
          <div className="product-grid">
            {saved.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <FiHeart />
            <h2>A little room for love.</h2>
            <p>Tap the heart on any piece to save it here.</p>
            <Link className="button" to="/shop">
              Find your favorites
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
