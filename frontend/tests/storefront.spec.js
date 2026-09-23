import { test, expect } from "@playwright/test";

test("homepage loads all jewelry photography and navigation", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.getByRole("button", { name: "Pause slideshow" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "For your everyday.",
  );
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator("img")
        .evaluateAll((images) =>
          images.every((img) => img.complete && img.naturalWidth > 0),
        ),
    )
    .toBe(true);
  await page.getByRole("link", { name: "Find your forever piece" }).click();
  await expect(page.locator(".product-card")).toHaveCount(12);
  expect(errors).toEqual([]);
});

test("filtering, searching, and sorting work", async ({ page }) => {
  await page.goto("/shop");
  await page.getByRole("button", { name: "Rings", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(3);
  await page.getByLabel("Sort products").selectOption("price-low");
  await expect(page.locator(".product-card").first()).toContainText(
    "Flora Stacking Ring",
  );
  await page.getByRole("button", { name: "Search jewelry" }).click();
  await page.getByRole("textbox", { name: "Search products" }).fill("solstice");
  await page.getByRole("button", { name: "Submit search" }).click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.goto("/shop?q=does-not-exist");
  await expect(page.getByText("No pieces found just yet.")).toBeVisible();
  await page.getByRole("button", { name: "Explore all jewelry" }).click();
  await expect(page.locator(".product-card")).toHaveCount(12);
});

test("wishlist persists and can remove pieces", async ({ page }) => {
  await page.goto("/shop");
  await page
    .getByRole("button", { name: "Save Solstice Gold Hoops to wishlist" })
    .click();
  await page.getByRole("link", { name: "Wishlist, 1 saved pieces" }).click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.reload();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Remove Solstice Gold Hoops from wishlist" })
    .click();
  await expect(page.getByText("A little room for love.")).toBeVisible();
});

test("bag keeps sizes, quantities, totals, and demo checkout", async ({
  page,
}) => {
  await page.goto("/product/eternal-gold-ring");
  await page.getByLabel("Ring size").selectOption("UK N");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("link", { name: "View your bag" }).click();
  await expect(page.locator(".bag-item")).toContainText("UK N");
  await expect(page.locator(".order-total")).toContainText("£100");
  await page
    .getByRole("button", { name: "Increase Eternal Gold Ring quantity" })
    .click();
  await expect(page.locator(".order-total")).toContainText("£190");
  await page.reload();
  await expect(page.locator(".quantity span")).toHaveText("2");
  await page.getByRole("link", { name: "Continue to checkout" }).click();
  await expect(
    page.getByRole("heading", { name: "Make it yours." }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Back to your bag" }).click();
  await page.getByRole("button", { name: "Remove Eternal Gold Ring" }).click();
  await expect(
    page.getByText("Your bag is waiting for a little sparkle."),
  ).toBeVisible();
});

test("mobile menu works with no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Our story" })
    .click();
  await expect(page).toHaveURL(/about/);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  for (const route of [
    "/",
    "/shop",
    "/product/solstice-gold-hoops",
    "/bag",
    "/wishlist",
  ]) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});

test("product metadata exists before JavaScript and unknown routes have a fallback", async ({
  request,
  page,
}) => {
  const response = await request.get("/product/solstice-gold-hoops/");
  const html = await response.text();
  expect(html).toContain(
    "<title>Solstice Gold Hoops | Magnolia Jewelries</title>",
  );
  expect(html).toContain(
    'content="https://magnoliajewelries.store/images/earrings.jpg"',
  );
  expect(html).toContain("Your everyday golden hour.");
  await page.goto("/a-missing-page");
  await expect(
    page.getByRole("heading", { name: "This piece is missing." }),
  ).toBeVisible();
});

test("newsletter validates email and honestly shows preview feedback", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("Email address").fill("jewelry@example.com");
  await page.getByRole("button", { name: "Join the newsletter" }).click();
  await expect(page.getByRole("status")).toContainText(
    "This preview doesn’t send emails",
  );
});
