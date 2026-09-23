import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiPrinter,
  FiCopy,
  FiMail,
  FiMessageCircle,
  FiFileText,
  FiArrowLeft,
} from "react-icons/fi";
import { InvoiceContext } from "../../context/InvoiceContext";
import {
  store,
  formatMoney,
  paymentMethods,
  contactReady,
} from "../../data/store";
import SEO from "../../components/SEO";

export default function Invoice() {
  const { id } = useParams();
  const { invoices, removeInvoice, storageAvailable } =
    useContext(InvoiceContext);
  const invoice = invoices.find((item) => item.id === id);
  const [message, setMessage] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const navigate = useNavigate();
  if (!invoice)
    return (
      <>
        <SEO title="Invoice unavailable" noIndex />
        <div className="empty-state not-found">
          <FiFileText />
          <h1>This invoice isn’t here.</h1>
          <p>
            Invoices are available in the browser tab where they were created.
            <br />
            Check your saved copy or create a new invoice from your bag.
          </p>
          <Link to="/bag" className="button">
            Return to your bag
          </Link>
        </div>
      </>
    );
  const price = (amount) => formatMoney(amount, invoice.currency);
  const method =
    paymentMethods.find((item) => item.id === invoice.paymentMethod)?.name ||
    "Discuss with Magnolia";
  const customer = invoice.customer;
  const date = new Intl.DateTimeFormat(store.locale, {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(invoice.createdAt));
  const contactMessage = [
    "Hello Magnolia, I would like to confirm availability and arrange payment for invoice " +
      invoice.id +
      ".",
    "",
    "Name: " + customer.name,
    "Email: " + customer.email,
    "Phone: " + customer.phone,
    "",
    ...invoice.items.map(
      (item) =>
        item.name +
        " | " +
        item.size +
        " | Qty " +
        item.quantity +
        " | " +
        price(item.price * item.quantity),
    ),
    "",
    "Items: " + price(invoice.totals.subtotal),
    "Delivery (" +
      invoice.deliveryMethod +
      "): " +
      price(invoice.totals.delivery),
    "Gift wrapping: " + price(invoice.totals.wrapping),
    "Total: " + price(invoice.totals.total),
    "Preferred payment: " + method,
    "Deliver to: " +
      [
        customer.address,
        customer.apartment,
        customer.city,
        customer.postcode,
        customer.country,
      ]
        .filter(Boolean)
        .join(", "),
    ...(invoice.giftMessage ? ["Gift message: " + invoice.giftMessage] : []),
    ...(invoice.note ? ["Order note: " + invoice.note] : []),
    "",
    "Please confirm final pricing, delivery timing, and the payment details. No payment has been made on the website.",
  ].join("\n");
  async function copyRequest() {
    try {
      await navigator.clipboard.writeText(contactMessage);
      setMessage(
        "Request copied. Paste it into your conversation with Magnolia.",
      );
    } catch {
      setMessage("Copy the request from the text box below.");
    }
  }
  function downloadRequest() {
    const blob = new Blob(
      [
        "MAGNOLIA JEWELRIES — ORDER REQUEST INVOICE\n" +
          invoice.id +
          "\nCreated: " +
          date +
          "\nStatus: Awaiting contact / unpaid\n\n" +
          contactMessage,
      ],
      { type: "text/plain;charset=utf-8" },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = invoice.id + ".txt";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <>
      <SEO
        title="Your order request invoice"
        description="Review your Magnolia order request invoice."
        noIndex
      />
      <div className="container invoice-page">
        <div className="invoice-topbar no-print">
          <Link className="text-link" to="/bag">
            <FiArrowLeft /> Back to bag
          </Link>
          <div>
            <button className="button button-outline" onClick={downloadRequest}>
              <FiFileText /> Download details
            </button>
            <button className="button" onClick={() => window.print()}>
              <FiPrinter /> Print / save PDF
            </button>
          </div>
        </div>
        <div className="invoice-layout">
          <article className="invoice-paper">
            <header className="invoice-heading">
              <div>
                <span className="wordmark">
                  magnolia<span>J E W E L R I E S</span>
                </span>
                <p>Little treasures. Lasting stories.</p>
                {store.businessAddress && <p>{store.businessAddress}</p>}
              </div>
              <div>
                <span className="eyebrow">ORDER REQUEST</span>
                <h1>Invoice</h1>
                <span className="invoice-status">
                  Awaiting contact · Unpaid
                </span>
              </div>
            </header>
            <div className="invoice-reference">
              <div>
                <span>Invoice reference</span>
                <strong>{invoice.id}</strong>
              </div>
              <div>
                <span>Created</span>
                <strong>{date}</strong>
              </div>
            </div>
            <div className="invoice-addresses">
              <section>
                <h2>Prepared for</h2>
                <strong>{customer.name}</strong>
                <p>
                  {customer.email}
                  <br />
                  {customer.phone}
                </p>
              </section>
              <section>
                <h2>Deliver to</h2>
                <p>
                  {customer.address}
                  <br />
                  {customer.apartment && (
                    <>
                      {customer.apartment}
                      <br />
                    </>
                  )}
                  {customer.city}, {customer.postcode}
                  <br />
                  {customer.country}
                </p>
              </section>
            </div>
            <div className="invoice-table-wrap">
              <table className="invoice-table">
                <caption className="sr-only">
                  Items and prices on your invoice
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Your piece</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Each</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item) => (
                    <tr key={item.id + item.size}>
                      <td>
                        <strong>{item.name}</strong>
                        <span>
                          {item.material} · {item.size}
                        </span>
                      </td>
                      <td>{item.quantity}</td>
                      <td>{price(item.price)}</td>
                      <td>{price(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <dl className="totals-list invoice-totals">
              <div>
                <dt>Items subtotal</dt>
                <dd>{price(invoice.totals.subtotal)}</dd>
              </div>
              <div>
                <dt>
                  {invoice.deliveryMethod === "express"
                    ? "Express"
                    : "Standard"}{" "}
                  delivery
                </dt>
                <dd>{price(invoice.totals.delivery)}</dd>
              </div>
              <div>
                <dt>Gift wrapping</dt>
                <dd>{price(invoice.totals.wrapping)}</dd>
              </div>
              <div className="grand-total">
                <dt>Total ({invoice.currency})</dt>
                <dd>{price(invoice.totals.total)}</dd>
              </div>
              <div>
                <dt>Paid through website</dt>
                <dd>{price(0)}</dd>
              </div>
            </dl>
            <section className="invoice-payment">
              <h2>Payment & next steps</h2>
              <p>
                <strong>Preferred method:</strong> {method}
              </p>
              <p>
                Contact Magnolia with reference <strong>{invoice.id}</strong> to
                confirm availability, final pricing, and delivery. Magnolia will
                confirm which payment methods are available and provide payment
                instructions directly. No payment is processed on this website.
              </p>
              {store.supportEmail && <p>Email: {store.supportEmail}</p>}
              {store.whatsapp && <p>WhatsApp: +{store.whatsapp}</p>}
              {!contactReady && (
                <p>
                  Magnolia’s contact details have not been added yet. Save this
                  invoice and contact the seller through your existing
                  conversation. No payment is due from this preview.
                </p>
              )}
            </section>
            {(invoice.giftMessage || invoice.note) && (
              <section className="invoice-notes">
                <h2>Your personal details</h2>
                {invoice.giftMessage && (
                  <p>
                    <strong>Gift message:</strong> {invoice.giftMessage}
                  </p>
                )}
                {invoice.note && (
                  <p>
                    <strong>Order note:</strong> {invoice.note}
                  </p>
                )}
              </section>
            )}
            <footer className="invoice-footnote">
              This is a preview order request, not a tax invoice, payment
              receipt, or confirmed order. It has not been sent to Magnolia.
              Stock is not reserved. Thank you for choosing a little piece of
              us.
            </footer>
          </article>
          <aside className="invoice-contact no-print">
            <FiMessageCircle className="contact-symbol" />
            <span className="eyebrow">LET’S MAKE IT PERSONAL</span>
            <h2>
              Your next step:
              <br />
              <em>a little hello.</em>
            </h2>
            <p>
              Send your invoice details to Magnolia. We’ll discuss your
              preferred payment method and confirm the details before you pay.
            </p>
            <div className="preferred-payment">
              <span>YOUR PAYMENT PREFERENCE</span>
              <strong>{method}</strong>
              <small>To be confirmed with Magnolia</small>
            </div>
            {store.whatsapp && (
              <a
                className="button whatsapp-button"
                href={
                  "https://wa.me/" +
                  store.whatsapp.replace(/\D/g, "") +
                  "?text=" +
                  encodeURIComponent(contactMessage)
                }
                target="_blank"
                rel="noreferrer"
              >
                <FiMessageCircle /> Contact on WhatsApp
              </a>
            )}
            {store.supportEmail && (
              <a
                className="button"
                href={
                  "mailto:" +
                  store.supportEmail +
                  "?subject=" +
                  encodeURIComponent("Order request " + invoice.id) +
                  "&body=" +
                  encodeURIComponent(contactMessage)
                }
              >
                <FiMail /> Email Magnolia
              </a>
            )}
            {!contactReady && (
              <div className="contact-unavailable">
                <strong>Contact details coming soon.</strong>
                <p>
                  Copy your request to share in your existing conversation with
                  Magnolia, or save the invoice for later.
                </p>
              </div>
            )}
            <button className="button button-outline" onClick={copyRequest}>
              <FiCopy /> Copy order request
            </button>
            <p role="status" className="copy-status">
              {message}
            </p>
            <details className="request-details">
              <summary>View the message to send</summary>
              <label className="sr-only" htmlFor="request-message">
                Order request message
              </label>
              <textarea
                id="request-message"
                readOnly
                value={contactMessage}
                rows={12}
              />
            </details>
            <p className="field-note">
              {storageAvailable
                ? "Keep a copy: this invoice is stored only in this browser tab session. Closing the tab may remove it."
                : "Browser storage is unavailable. Print or download this invoice before leaving this page."}
            </p>
            {deleteConfirm ? (
              <div className="delete-invoice-confirm">
                <p>Remove this invoice’s personal details from this tab?</p>
                <button
                  onClick={() => {
                    removeInvoice(invoice.id);
                    navigate("/bag");
                  }}
                >
                  Remove invoice
                </button>
                <button onClick={() => setDeleteConfirm(false)}>
                  Keep invoice
                </button>
              </div>
            ) : (
              <button
                className="remove-invoice"
                onClick={() => setDeleteConfirm(true)}
              >
                Remove this invoice from this device
              </button>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
