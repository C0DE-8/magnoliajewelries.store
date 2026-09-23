import { test, expect } from "@playwright/test";
async function chooseRing(page) {
  await page.goto("/product/eternal-gold-ring");
  await page.getByLabel("Ring size").selectOption("UK N");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("link", { name: "View your bag" }).click();
  await page.getByRole("link", { name: "Continue to checkout" }).click();
}
async function fillCustomer(page) {
  await page.getByLabel("Full name", { exact: true }).fill("Demo Customer");
  await page.getByLabel("Email address", { exact: true }).fill("demo@example.com");
  await page.getByLabel("Phone number", { exact: true }).fill("07000000000");
  await page.getByLabel("Street address", { exact: true }).fill("10 Example Street");
  await page.getByLabel("Town / city", { exact: true }).fill("London");
  await page.getByLabel("Postcode", { exact: true }).fill("SW1A 1AA");
  await page.getByRole("checkbox", { name: /I have reviewed/ }).check();
}
test("slider supports previous, next, dots, pause, and its collection link", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Next slide" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Meet your next");
  await expect(page.getByRole("button", { name: "Play slideshow" })).toBeVisible();
  await page.getByRole("button", { name: "Previous slide" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("For your everyday.");
  await page.getByRole("button", { name: "Go to slide 3" }).click();
  await page.getByRole("link", { name: "Explore the gift edit", exact: true }).click();
  await expect(page).toHaveURL(/collection=gifts/);
});
test("journal, gift budget, and FAQ content are connected", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Gifts £75 & under/ }).click();
  await expect(page.locator(".product-card")).toHaveCount(3);
  await page.goto("/journal");
  await page.getByRole("link", { name: /The art of a little more/ }).click();
  await expect(page.getByRole("heading", { name: "Leave a little breathing room." })).toBeVisible();
  await page.goto("/");
  await page.getByText("What will my invoice include?", { exact: true }).click();
  await expect(page.getByText(/Your selected pieces, sizes, quantities/)).toBeVisible();
});
test("checkout validates customer details before creating an invoice", async ({ page }) => {
  await chooseRing(page);
  await page.getByRole("button", { name: "Create my invoice" }).click();
  await expect(page).toHaveURL(/checkout/);
  expect(await page.getByLabel("Full name", { exact: true }).evaluate(input => input.validity.valueMissing)).toBe(true);
  await page.getByLabel("Full name", { exact: true }).fill(" ");
  await fillCustomer(page);
  await page.getByLabel("Full name", { exact: true }).fill(" ");
  await page.getByRole("button", { name: "Create my invoice" }).click();
  await expect(page.getByRole("alert")).toContainText("complete all required");
});
test("invoice snapshots totals and customer details, persists, exports, and prints", async ({ page }) => {
  await chooseRing(page);
  await fillCustomer(page);
  await page.getByRole("radio", { name: /Express delivery/ }).check();
  await page.getByRole("checkbox", { name: /Add gift wrapping/ }).check();
  await page.getByLabel(/Gift message/).fill("A little love, just for you.");
  await page.getByRole("radio", { name: /Mobile money/ }).check();
  await expect(page.locator(".grand-total")).toContainText("£111");
  await page.getByRole("button", { name: "Create my invoice" }).click();
  await expect(page).toHaveURL(/invoice\/MAG-\d{8}-[A-F0-9]{8}/);
  const invoiceUrl = page.url();
  await expect(page.locator(".invoice-status")).toHaveText("Awaiting contact · Unpaid");
  await expect(page.locator(".invoice-addresses")).toContainText("Demo Customer");
  await expect(page.locator(".invoice-table")).toContainText("UK N");
  await expect(page.locator(".grand-total")).toContainText("£111");
  await expect(page.locator(".preferred-payment")).toContainText("Mobile money");
  await expect(page.locator(".invoice-notes")).toContainText("A little love");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow");
  expect(await page.evaluate(() => Object.values(localStorage).join(" "))).not.toContain("demo@example.com");
  await page.reload();
  await expect(page.locator(".invoice-addresses")).toContainText("10 Example Street");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download details" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/^MAG-.*\.txt$/);
  await page.evaluate(() => { window.print = () => { window.__printRequested = true; }; });
  await page.getByRole("button", { name: "Print / save PDF" }).click();
  expect(await page.evaluate(() => window.__printRequested)).toBe(true);
  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".invoice-contact")).toBeHidden();
  await expect(page.locator(".invoice-paper")).toBeVisible();
  await page.emulateMedia({ media: "screen" });
  await page.getByRole("link", { name: "Back to bag", exact: true }).click();
  await page.getByRole("button", { name: "Increase Eternal Gold Ring quantity" }).click();
  await page.goto(invoiceUrl);
  await expect(page.locator(".grand-total")).toContainText("£111");
  await page.getByRole("button", { name: "Remove this invoice from this device" }).click();
  await page.getByRole("button", { name: "Remove invoice", exact: true }).click();
  await page.goto(invoiceUrl);
  await expect(page.getByRole("heading", { name: "This invoice isn’t here." })).toBeVisible();
});
test("empty checkout is safe and customer forms and invoices fit a phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/checkout");
  await expect(page.getByRole("heading", { name: "A little something first." })).toBeVisible();
  await chooseRing(page);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await fillCustomer(page);
  await page.getByRole("button", { name: "Create my invoice" }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await expect(page.locator(".invoice-table")).toBeVisible();
});
test("invoice remains usable when browser storage is unavailable", async ({ page }) => {
  await page.addInitScript(() => { Storage.prototype.setItem = () => { throw new Error("Storage disabled"); }; });
  await chooseRing(page);
  await fillCustomer(page);
  await page.getByRole("button", { name: "Create my invoice" }).click();
  await expect(page.locator(".invoice-paper")).toContainText("Demo Customer");
  await expect(page.getByText(/Browser storage is unavailable/)).toBeVisible();
});

