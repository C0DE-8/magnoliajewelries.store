import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiFileText,
  FiMessageCircle,
  FiGift,
} from "react-icons/fi";
import { ShopContext } from "../../context/ShopContext";
import { InvoiceContext } from "../../context/InvoiceContext";
import { products } from "../../data/products";
import {
  store,
  formatMoney,
  totalsFor,
  paymentMethods,
} from "../../data/store";
import SEO from "../../components/SEO";

export default function Checkout() {
  const { bag } = useContext(ShopContext);
  const { saveInvoice } = useContext(InvoiceContext);
  const navigate = useNavigate();
  const submitting = useRef(false);
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [giftWrap, setGiftWrap] = useState(false);
  const [error, setError] = useState("");
  const items = bag.flatMap((item) => {
    const product = products.find((product) => product.id === item.id);
    return product &&
      product.sizes.includes(item.size) &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
      ? [
          {
            id: product.id,
            name: product.name,
            slug: product.slug,
            image: product.image,
            material: product.material,
            size: item.size,
            quantity: item.quantity,
            price: product.price,
          },
        ]
      : [];
  });
  const totals = totalsFor(items, deliveryMethod, giftWrap);
  function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const data = new FormData(event.currentTarget);
    const value = (key) => String(data.get(key) || "").trim();
    if (
      ["name", "email", "phone", "address", "city", "postcode"].some(
        (key) => !value(key),
      )
    ) {
      setError("Please complete all required contact and delivery details.");
      return;
    }
    submitting.current = true;
    const now = new Date();
    const id =
      "MAG-" +
      now.toISOString().slice(0, 10).replaceAll("-", "") +
      "-" +
      crypto.randomUUID().slice(0, 8).toUpperCase();
    const invoice = {
      id,
      createdAt: now.toISOString(),
      currency: store.currency,
      customer: {
        name: value("name"),
        email: value("email"),
        phone: value("phone"),
        address: value("address"),
        apartment: value("apartment"),
        city: value("city"),
        postcode: value("postcode"),
        country: store.country,
      },
      items,
      totals,
      deliveryMethod,
      giftWrap,
      giftMessage: value("giftMessage"),
      note: value("note"),
      paymentMethod:
        paymentMethods.find((method) => method.id === value("paymentMethod"))
          ?.id || "discuss",
      status: "Awaiting contact",
    };
    saveInvoice(invoice);
    navigate("/invoice/" + id);
  }
  if (!items.length)
    return (
      <>
        <SEO title="Checkout" noIndex />
        <div className="empty-state not-found">
          <FiGift />
          <h1>A little something first.</h1>
          <p>Add a piece to your bag before creating an invoice.</p>
          <Link to="/shop" className="button">
            Explore the collection
          </Link>
        </div>
      </>
    );
  return (
    <>
      <SEO title="Checkout & invoice" noIndex />
      <div className="checkout-intro container">
        <Link to="/bag" className="text-link">
          <FiArrowLeft /> Back to your bag
        </Link>
        <span className="eyebrow">THE NEXT CHAPTER</span>
        <h1>Make it yours.</h1>
        <p>Your details. Your little treasures. Everything in one place.</p>
        <ol className="checkout-progress">
          <li>01 · Your bag</li>
          <li className="current">02 · Your details</li>
          <li>03 · Invoice & contact</li>
        </ol>
      </div>
      <form className="checkout-layout container" onSubmit={submit}>
        <div className="checkout-fields">
          <div className="contact-checkout-note">
            <FiMessageCircle />
            <div>
              <strong>No payment is taken on this website.</strong>
              <p>
                Create your invoice, then contact Magnolia to confirm
                availability and arrange payment. Selecting a method does not
                make a payment.
              </p>
            </div>
          </div>
          <fieldset>
            <legend>
              <span>01</span> A little about you
            </legend>
            <p>
              We’ll include these details on your invoice so you can share it
              with Magnolia.
            </p>
            <div className="form-grid">
              <label className="full-width">
                Full name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                />
              </label>
              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={150}
                />
              </label>
              <label>
                Phone number
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  maxLength={30}
                />
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <span>02</span> Where your story goes
            </legend>
            <div className="form-grid">
              <label className="full-width">
                Street address
                <input
                  name="address"
                  autoComplete="address-line1"
                  required
                  maxLength={180}
                />
              </label>
              <label className="full-width">
                Apartment, suite, etc. <small>(optional)</small>
                <input
                  name="apartment"
                  autoComplete="address-line2"
                  maxLength={100}
                />
              </label>
              <label>
                Town / city
                <input
                  name="city"
                  autoComplete="address-level2"
                  required
                  maxLength={80}
                />
              </label>
              <label>
                Postcode
                <input
                  name="postcode"
                  autoComplete="postal-code"
                  required
                  maxLength={16}
                />
              </label>
              <label className="full-width">
                Country
                <select
                  name="country"
                  autoComplete="country-name"
                  defaultValue={store.country}
                >
                  <option>{store.country}</option>
                </select>
              </label>
            </div>
            <p className="field-note">
              Delivery dates and availability are confirmed by Magnolia before
              payment.
            </p>
            <div className="delivery-options">
              <label
                className={
                  "choice-card " +
                  (deliveryMethod === "standard" ? "selected" : "")
                }
              >
                <input
                  type="radio"
                  name="delivery"
                  value="standard"
                  checked={deliveryMethod === "standard"}
                  onChange={() => setDeliveryMethod("standard")}
                />
                <span>
                  <strong>Standard delivery</strong>
                  <small>
                    Complimentary on item subtotals of{" "}
                    {formatMoney(store.delivery.freeAbove)}+
                  </small>
                </span>
                <b>
                  {totals.subtotal >= store.delivery.freeAbove
                    ? "Free"
                    : formatMoney(store.delivery.standard)}
                </b>
              </label>
              <label
                className={
                  "choice-card " +
                  (deliveryMethod === "express" ? "selected" : "")
                }
              >
                <input
                  type="radio"
                  name="delivery"
                  value="express"
                  checked={deliveryMethod === "express"}
                  onChange={() => setDeliveryMethod("express")}
                />
                <span>
                  <strong>Express delivery</strong>
                  <small>
                    Request a faster option; timing confirmed by Magnolia
                  </small>
                </span>
                <b>{formatMoney(store.delivery.express)}</b>
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <span>03</span> A personal touch
            </legend>
            <label className="choice-card">
              <input
                type="checkbox"
                checked={giftWrap}
                onChange={(event) => setGiftWrap(event.target.checked)}
              />
              <span>
                <strong>Add gift wrapping</strong>
                <small>A little extra care for someone special</small>
              </span>
              <b>{formatMoney(store.giftWrap)}</b>
            </label>
            <label className="textarea-label">
              Gift message <small>(optional, 240 characters)</small>
              <textarea
                name="giftMessage"
                maxLength={240}
                rows={3}
                placeholder="A little note from the heart…"
              />
            </label>
            <label className="textarea-label">
              Order note <small>(optional)</small>
              <textarea
                name="note"
                maxLength={500}
                rows={3}
                placeholder="Anything you’d like to discuss with Magnolia?"
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>
              <span>04</span> How would you like to pay?
            </legend>
            <p>
              Choose your preferred method to discuss with Magnolia.
              Availability is confirmed when you contact us; all payments happen
              outside this website.
            </p>
            <div className="payment-choices">
              {paymentMethods.map((method, index) => (
                <label className="choice-card" key={method.id}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    defaultChecked={index === 0}
                  />
                  <span>
                    <strong>{method.name}</strong>
                    <small>{method.description}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="checkout-consent">
            <input type="checkbox" required />
            <span>
              I have reviewed my details and understand that I need to contact
              Magnolia to confirm this request and arrange payment.{" "}
              <Link to="/information/terms">Terms</Link> &{" "}
              <Link to="/information/privacy">privacy</Link>.
            </span>
          </label>
          <p className="field-note">
            Your invoice stays in this browser tab session. Nothing is sent to
            Magnolia until you contact us. Save a copy before closing the tab.
          </p>
          {error && (
            <p role="alert" className="form-error">
              {error}
            </p>
          )}
          <button className="button invoice-submit" type="submit">
            Create my invoice <FiArrowRight />
          </button>
        </div>
        <aside className="checkout-summary">
          <span className="eyebrow">YOUR LITTLE TREASURES</span>
          <h2>A lovely choice.</h2>
          <div className="checkout-items">
            {items.map((item) => (
              <div className="checkout-item" key={item.id + item.size}>
                <img src={"/images/" + item.image + ".jpg"} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    {item.size} · Qty {item.quantity}
                  </p>
                  <span>{formatMoney(item.price)} each</span>
                </div>
                <b>{formatMoney(item.price * item.quantity)}</b>
              </div>
            ))}
          </div>
          <dl className="totals-list">
            <div>
              <dt>Items subtotal</dt>
              <dd>{formatMoney(totals.subtotal)}</dd>
            </div>
            <div>
              <dt>
                {deliveryMethod === "express" ? "Express" : "Standard"} delivery
              </dt>
              <dd>{totals.delivery ? formatMoney(totals.delivery) : "Free"}</dd>
            </div>
            <div>
              <dt>Gift wrapping</dt>
              <dd>{formatMoney(totals.wrapping)}</dd>
            </div>
            <div className="grand-total">
              <dt>Total to discuss</dt>
              <dd>{formatMoney(totals.total)}</dd>
            </div>
          </dl>
          <p className="field-note">
            All amounts in {store.currency}. Preview prices; final pricing is
            confirmed by Magnolia. This is not a tax invoice.
          </p>
          <div className="invoice-promise">
            <FiFileText />
            <p>
              Next: a printable invoice with your selections, customer details,
              payment preference, and contact options.
            </p>
          </div>
        </aside>
      </form>
    </>
  );
}
