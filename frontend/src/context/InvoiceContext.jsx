import { createContext, useState } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const InvoiceContext = createContext(null);
function readInvoices() {
  try {
    const saved = JSON.parse(sessionStorage.getItem("magnolia-invoices"));
    return Array.isArray(saved)
      ? saved.filter(
          (invoice) =>
            invoice &&
            typeof invoice.id === "string" &&
            invoice.customer &&
            typeof invoice.customer.name === "string" &&
            Array.isArray(invoice.items) &&
            invoice.items.length &&
            invoice.items.every(
              (item) =>
                typeof item.name === "string" &&
                Number.isFinite(item.price) &&
                item.price >= 0 &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0,
            ) &&
            Number.isFinite(invoice.totals?.total) &&
            invoice.totals.total >= 0 &&
            !Number.isNaN(Date.parse(invoice.createdAt)),
        )
      : [];
  } catch {
    return [];
  }
}
export function InvoiceProvider({ children }) {
  const [invoices, setInvoices] = useState(readInvoices);
  const [storageAvailable, setStorageAvailable] = useState(true);
  function saveInvoice(invoice) {
    const next = [invoice, ...invoices].slice(0, 10);
    setInvoices(next);
    try {
      sessionStorage.setItem("magnolia-invoices", JSON.stringify(next));
    } catch {
      setStorageAvailable(false);
    }
  }
  function removeInvoice(id) {
    const next = invoices.filter((invoice) => invoice.id !== id);
    setInvoices(next);
    try {
      sessionStorage.setItem("magnolia-invoices", JSON.stringify(next));
    } catch {
      setStorageAvailable(false);
    }
  }
  return (
    <InvoiceContext.Provider
      value={{ invoices, saveInvoice, removeInvoice, storageAvailable }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
