import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiMenu,
  FiX,
  FiArrowRight,
} from "react-icons/fi";
import { ShopContext } from "../context/ShopContext";
export default function Header() {
  const { favorites, bag } = useContext(ShopContext);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="announcement">
        A little something, forever yours.{" "}
        <span>Complimentary delivery on orders £100+</span>
        <span className="announcement-star">✧</span>
      </div>
      <header className="header">
        <div className="header-inner">
          <button
            className="icon-button mobile-menu"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <FiX /> : <FiMenu />}
          </button>
          <Link to="/" className="wordmark" aria-label="Magnolia home">
            magnolia<span>J E W E L R I E S</span>
          </Link>
          <nav
            className={menu ? "nav open" : "nav"}
            aria-label="Main navigation"
            onClick={() => setMenu(false)}
          >
            <NavLink to="/shop">Shop all</NavLink>
            <Link to="/shop?collection=new">
              New arrivals <span className="tiny-dot" />
            </Link>
            <Link to="/shop?collection=bestsellers">Bestsellers</Link>
            <Link to="/shop?collection=gifts">The gift edit</Link>
            <NavLink to="/about">Our story</NavLink>
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              aria-label="Search jewelry"
              aria-expanded={search}
              onClick={() => setSearch(!search)}
            >
              {search ? <FiX /> : <FiSearch />}
            </button>
            <Link
              className="icon-button"
              to="/wishlist"
              aria-label={"Wishlist, " + favorites.length + " saved pieces"}
            >
              <FiHeart />
              {favorites.length > 0 && (
                <span className="count">{favorites.length}</span>
              )}
            </Link>
            <Link
              className="icon-button"
              to="/bag"
              aria-label={
                "Shopping bag, " +
                bag.reduce((a, b) => a + b.quantity, 0) +
                " items"
              }
            >
              <FiShoppingBag />
              {bag.length > 0 && (
                <span className="count">
                  {bag.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
        {search && (
          <form
            className="search-form"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/shop?q=" + encodeURIComponent(query));
              setSearch(false);
            }}
          >
            <FiSearch />
            <input
              autoFocus
              aria-label="Search products"
              placeholder="Find your next forever piece…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="icon-button" aria-label="Submit search">
              <FiArrowRight />
            </button>
          </form>
        )}
      </header>
    </>
  );
}
