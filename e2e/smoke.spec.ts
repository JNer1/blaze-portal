import { expect, test } from "@playwright/test";

test("home page loads and reaches the API", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "BlAzE Portal" })).toBeVisible();
  await expect(page.getByTestId("api-status")).toHaveText("API is running");
});

test("unknown pages fall back to the app, unknown API routes return 404", async ({ page, request }) => {
  await page.goto("/some/client/route");
  await expect(page.getByRole("heading", { name: "BlAzE Portal" })).toBeVisible();

  const res = await request.get("/api/does-not-exist");
  expect(res.status()).toBe(404);
});
