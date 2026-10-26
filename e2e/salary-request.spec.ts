import { expect, test, type Locator, type Page } from "@playwright/test";

// Synthetic data only.
async function fillStaff(
  staff: Locator,
  row: { name: string; designation: string; tin: string; monthly: string; start: string; end: string },
) {
  await staff.getByLabel("Name").fill(row.name);
  await staff.getByLabel("Designation").fill(row.designation);
  await staff.getByLabel("TIN").fill(row.tin);
  await staff.getByLabel("Monthly salary (PHP)").fill(row.monthly);
  await staff.getByLabel("Coverage start").fill(row.start);
  await staff.getByLabel("Coverage end").fill(row.end);
}

async function fillValidRequest(page: Page) {
  await page.getByLabel("Project title").fill("Sample Research Project (synthetic)");
  await page.getByLabel("Funding/charge reference").fill("Sample Fund Code 0000");

  await fillStaff(page.getByTestId("staff-row").nth(0), {
    name: "Alex Sample",
    designation: "Project Assistant I",
    tin: "000-111-222",
    monthly: "25,000",
    start: "2025-05",
    end: "2026-02",
  });
  await page.getByRole("button", { name: "Add staff member" }).click();
  await fillStaff(page.getByTestId("staff-row").nth(1), {
    name: "Bea Example",
    designation: "Science Research Specialist I",
    tin: "000333444000",
    monthly: "18,333.33",
    start: "2026-01",
    end: "2026-07",
  });
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("calculates per-staff totals and shows them in the preview without a grand total", async ({ page }) => {
  await fillValidRequest(page);

  await expect(page.getByRole("region", { name: "Alex Sample" }).getByTestId("row-total")).toHaveText(
    "10 months × monthly salary = ₱250,000.00",
  );
  await expect(page.getByRole("region", { name: "Bea Example" }).getByTestId("row-total")).toHaveText(
    "7 months × monthly salary = ₱128,333.31",
  );

  const preview = page.getByRole("article", { name: "Letter preview" });
  const rows = preview.getByRole("row");
  await expect(rows).toHaveCount(3); // header + two staff, no total row
  await expect(rows.nth(1)).toContainText("000-111-222");
  await expect(rows.nth(1)).toContainText("May 2025 – February 2026 (10 months)");
  await expect(rows.nth(1)).toContainText("₱250,000.00");
  await expect(rows.nth(2)).toContainText("000-333-444-000");
  await expect(rows.nth(2)).toContainText("₱18,333.33");
  await expect(rows.nth(2)).toContainText("₱128,333.31");
  await expect(preview).not.toContainText(/grand total/i);
  await expect(preview).not.toContainText("₱378,333.31");

  await page.getByRole("button", { name: "Check request" }).click();
  await expect(page.getByText("Server check passed. Totals match.")).toBeVisible();
});

test("shows DRAFT without an LE and the exact LE once entered", async ({ page }) => {
  const header = page.getByRole("article", { name: "Letter preview" }).getByTestId("le-header");
  await expect(header).toHaveText("DRAFT – NO LE");

  await page.getByLabel("LE number").fill("TEST-LE 2026/0001-a");
  await expect(header).toHaveText("LE No. TEST-LE 2026/0001-a");
});

test("missing or unreviewed checklist items never block the preview or the check", async ({ page }) => {
  await fillValidRequest(page);
  await page
    .getByRole("region", { name: "Bea Example" })
    .getByLabel(/^Approved Daily Time Record/)
    .selectOption("missing");

  const summary = page.getByRole("region", { name: "Checklist summary" });
  await expect(summary).toContainText("Marked available by staff: 0 · Missing: 1 · Not reviewed: 7 · Not applicable: 0");
  await expect(summary).toContainText("Bea Example — missing: Approved Daily Time Record");
  await expect(summary).not.toContainText(/complete|compliant|verified complete/i);

  await page.getByRole("button", { name: "Check request" }).click();
  await expect(page.getByText("Server check passed. Totals match.")).toBeVisible();
  await expect(page.getByRole("article", { name: "Letter preview" })).toContainText("Bea Example");
});

test("the letter has no enclosure paragraph", async ({ page }) => {
  await fillValidRequest(page);

  await expect(page.getByRole("article", { name: "Letter preview" })).not.toContainText(/enclos/i);
  await expect(page.getByText(/enclosure/i)).toHaveCount(0);
});

test("shows field errors and the server rejects the same input", async ({ page }) => {
  await fillValidRequest(page);
  const bea = page.getByRole("region", { name: "Bea Example" });
  await bea.getByLabel("Coverage end").fill("2025-12");
  await bea.getByLabel("TIN").fill("123");
  await bea.getByLabel("Monthly salary (PHP)").fill("18,333.333");

  await expect(bea.getByText("End month cannot be before the start month.")).toBeVisible();
  await expect(bea.getByText("Enter a 9- or 12-digit TIN.")).toBeVisible();
  await expect(bea.getByText("Use at most two decimal places.")).toBeVisible();

  await page.getByRole("button", { name: "Check request" }).click();
  const alert = page.getByRole("alert");
  await expect(alert).toContainText("End month cannot be before the start month.");
  await expect(alert).toContainText("Enter a 9- or 12-digit TIN.");
});

test("a blank form reports required fields after Check request", async ({ page }) => {
  await page.getByRole("button", { name: "Check request" }).click();

  await expect(page.getByText("Enter the project title.").first()).toBeVisible();
  await expect(page.getByText("Enter the staff member's name.").first()).toBeVisible();
});
