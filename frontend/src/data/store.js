// Public business information only. Never put payment secrets in frontend code.
export const store = {
  name: "Magnolia Jewelries",
  currency: "GBP",
  locale: "en-GB",
  country: "United Kingdom",
  supportEmail: "",
  whatsapp: "", // International digits only, for example country code + number.
  businessAddress: "",
  delivery: { standard: 5, freeAbove: 100, express: 12 },
  giftWrap: 4,
};
export const paymentMethods = [
  {
    id: "bank-transfer",
    name: "Bank transfer",
    description: "Request the bank details directly from Magnolia.",
  },
  {
    id: "mobile-money",
    name: "Mobile money",
    description: "Ask Magnolia about supported mobile-money services.",
  },
  {
    id: "payment-link",
    name: "External payment link",
    description: "Ask for a payment link from Magnolia, if available.",
  },
  {
    id: "discuss",
    name: "Help me choose",
    description: "Discuss the available options with our team.",
  },
];
export const contactReady = Boolean(store.supportEmail || store.whatsapp);
export const formatMoney = (value, currency = store.currency) =>
  new Intl.NumberFormat(store.locale, {
    style: "currency",
    currency,
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);

export function totalsFor(
  items,
  deliveryMethod = "standard",
  giftWrap = false,
) {
  const subtotal =
    Math.round(
      items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100,
    ) / 100;
  const delivery = items.length
    ? deliveryMethod === "express"
      ? store.delivery.express
      : subtotal >= store.delivery.freeAbove
        ? 0
        : store.delivery.standard
    : 0;
  const wrapping = items.length && giftWrap ? store.giftWrap : 0;
  return {
    subtotal,
    delivery,
    wrapping,
    total: Math.round((subtotal + delivery + wrapping) * 100) / 100,
  };
}
