import { Hono } from "hono";
import type { HealthResponse } from "../shared/health";
import {
  calculateStaffTotal,
  salaryRequestSchema,
  toFieldErrors,
  type SalaryCheckResponse,
} from "../shared/salary-request";

export const app = new Hono<{ Bindings: Env }>().basePath("/api");

app.get("/health", (c) =>
  c.json({ status: "ok", service: "blaze-portal" } satisfies HealthResponse),
);

// Validates a salary request and returns per-staff totals. Stores nothing.
app.post("/salary-requests/check", async (c) => {
  const body: unknown = await c.req.json().catch(() => undefined);
  const result = salaryRequestSchema.safeParse(body);
  if (!result.success) {
    return c.json({ ok: false, errors: toFieldErrors(result.error) } satisfies SalaryCheckResponse, 400);
  }
  return c.json({
    ok: true,
    staff: result.data.staff.map(calculateStaffTotal),
  } satisfies SalaryCheckResponse);
});

app.notFound((c) => c.json({ error: "Not found" }, 404));

export default app;
