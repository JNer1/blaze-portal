import { describe, expect, it } from "vitest";
import { healthResponseSchema } from "../shared/health";
import { app } from "./index";

describe("API", () => {
  it("reports health", async () => {
    const res = await app.request("/api/health");

    expect(res.status).toBe(200);
    expect(healthResponseSchema.parse(await res.json())).toEqual({
      status: "ok",
      service: "blaze-portal",
    });
  });

  it("returns JSON 404 for unknown API routes", async () => {
    const res = await app.request("/api/does-not-exist");

    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "Not found" });
  });
});
