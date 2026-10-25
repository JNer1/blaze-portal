import { describe, expect, it } from "vitest";
import { syntheticSalaryRequest } from "../shared/test-fixtures";
import { app } from "./index";

function check(body: unknown) {
  return app.request("/api/salary-requests/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/salary-requests/check", () => {
  it("returns per-staff totals and no grand total", async () => {
    const res = await check(syntheticSalaryRequest());

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      ok: true,
      staff: [
        { months: 10, totalCentavos: 25_000_000 },
        { months: 7, totalCentavos: 12_833_331 },
      ],
    });
  });

  it("rejects the same invalid input the form rejects", async () => {
    const input = syntheticSalaryRequest();
    input.staff[1]!.coverageEnd = "2025-12";
    input.staff[1]!.tin = "123";

    const res = await check(input);

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      ok: false,
      errors: [
        { path: "staff.1.tin", message: "Enter a 9- or 12-digit TIN." },
        { path: "staff.1.coverageEnd", message: "End month cannot be before the start month." },
      ],
    });
  });

  it("rejects amounts sent as decimal pesos instead of centavos", async () => {
    const input = syntheticSalaryRequest();
    input.staff[0]!.monthlyCentavos = 25000.5;

    const res = await check(input);

    expect(res.status).toBe(400);
  });

  it("rejects malformed JSON", async () => {
    const res = await check("{not json");

    expect(res.status).toBe(400);
  });
});
