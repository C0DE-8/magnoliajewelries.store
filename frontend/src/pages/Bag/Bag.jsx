import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiX,
  FiArrowRight,
} from "react-icons/fi";
import { ShopContext } from "../../context/ShopContext";
import { products, money } from "../../data/products";
import SEO from "../../components/SEO";
import { InvoiceContext } from "../../context/InvoiceContext";
import { totalsFor } from "../../data/store";
export default function Bag() {
  const { bag, updateQuantity } = useContext(ShopContext);
  const { invoices } = useContext(InvoiceContext);
  const items = bag
    .map((item) => ({
      ...item,
      product: products.find((p) => p.id === item.id),
    }))
    .filter((item) => item.product);
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const { delivery } = totalsFor(
    items.map((item) => ({ ...item, price: item.product.price })),
  );
  return (
    <>
      <SEO title="Your shopping bag" noIndex />
      <div className="page-intro">
        <span className="eyebrow">SOMETHING LOVELY IS WAITING</span>
        <h1>Your little treasures.</h1>
        <p>A few beautiful things to make your everyday.</p>
      </div>
      <section className="container shop-section">
        {!items.length ? (
          <div className="empty-state">
            <FiShoppingBag />
            <h2>Your bag is waiting for a little sparkle.</h2>
            <p>Let’s find something that feels like you.</p>
            <Link className="button" to="/shop">
              Discover the collection
            </Link>
          </div>
        ) : (
          <div className="bag-layout">
            <div>
              {items.map((item) => (
                <article className="bag-item" key={item.id + "-" + item.size}>
                  <Link to={"/product/" + item.product.slug}>
                    <img
                      src={"/images/" + item.product.image + ".jpg"}
                      alt={item.product.name}
                    />
                  </Link>
                  <div>
                    <Link to={"/product/" + item.product.slug}>
                      <h3>{item.product.name}</h3>
                    </Link>
                    <p>{item.product.material}</p>
                    <p>{item.size}</p>
                    <div className="quantity">
                      <button
                        aria-label={
                          "Decrease " + item.product.name + " quantity"
                        }
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity - 1)
                        }
                      >
                        <FiMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        aria-label={
                          "Increase " + item.product.name + " quantity"
                        }
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity + 1)
                        }
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                  <div className="bag-item-end">
                    <button
                      className="icon-button"
                      aria-label={"Remove " + item.product.name}
                      onClick={() => updateQuantity(item.id, item.size, 0)}
                    >
                      <FiX />
                    </button>
                    <span>{money(item.product.price * item.quantity)}</span>
                  </div>
                </article>
              ))}
            </div>
            <aside className="order-summary">
              <h2>The lovely details.</h2>
              <div>
                <span>Subtotal</span>
                <span>{money(total)}</span>
              </div>
              <div>
                <span>Delivery</span>
                <span>{delivery ? money(delivery) : "On us"}</span>
              </div>
              <p>
                {delivery
                  ? money(100 - total) + " away from complimentary delivery."
                  : "Your delivery is complimentary. A little gift from us."}
              </p>
              <div className="order-total">
                <span>Total</span>
                <span>{money(total + delivery)}</span>
              </div>
              <Link className="button" to="/checkout">
                Continue to checkout <FiArrowRight />
              </Link>
              <p className="field-note">
                Create an invoice, then contact Magnolia to arrange payment
                outside the website.
              </p>
              {invoices[0] && (
                <Link className="text-link" to={"/invoice/" + invoices[0].id}>
                  View your latest invoice
                </Link>
              )}
              <small>Beautifully wrapped, with love.</small>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
