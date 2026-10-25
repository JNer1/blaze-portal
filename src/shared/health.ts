import { z } from "zod";

// Shared by the Worker (response) and the browser (parsing), so both sides
// agree on the shape of /api/health.
export const healthResponseSchema = z.object({
  status: z.literal("ok"),
  service: z.literal("blaze-portal"),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;
