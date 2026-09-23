import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
export default function NotFound() {
  return (
    <div className="empty-state not-found">
      <SEO title="Page not found" />
      <span className="eyebrow">404 · A LITTLE LOST</span>
      <h1>This piece is missing.</h1>
      <p>Let’s find our way back to something beautiful.</p>
      <Link to="/shop" className="button">
        Explore the collection
      </Link>
    </div>
  );
}
