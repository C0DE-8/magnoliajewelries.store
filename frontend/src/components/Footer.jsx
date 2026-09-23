import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
export default function Footer() {
  return (
    <footer>
      <div className="footer-main container">
        <div className="footer-brand">
          <Link to="/" className="wordmark">
            magnolia<span>J E W E L R I E S</span>
          </Link>
          <p>
            Little treasures. Lasting stories.
            <br />
            Jewelry to feel like you.
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          <Link to="/shop">All jewelry</Link>
          <Link to="/shop?collection=new">New arrivals</Link>
          <Link to="/shop?collection=gifts">The gift edit</Link>
          <Link to="/about">Our story</Link>
        </div>
        <div>
          <h3>Here to help</h3>
          <Link to="/information/delivery">Delivery & returns</Link>
          <Link to="/information/care">Jewelry care</Link>
          <Link to="/information/sizing">Size guide</Link>
          <Link to="/information/contact">
            Contact us <FiArrowUpRight />
          </Link>
        </div>
        <div className="footer-note">
          <span className="eyebrow">THE MAGNOLIA WAY</span>
          <p>
            Wear what you love.
            <br />
            Keep it close.
          </p>
          <span>Thoughtful pieces for your everyday.</span>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© {new Date().getFullYear()} Magnolia Jewelries</span>
        <div>
          <Link to="/information/privacy">Privacy policy</Link>
          <Link to="/information/terms">Terms of use</Link>
          <span>United Kingdom · GBP £</span>
        </div>
      </div>
    </footer>
  );
}
