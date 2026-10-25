import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Kept separate from vite.config.ts so unit tests don't start the Cloudflare
// dev runtime. Worker routes are tested through Hono's in-memory app.request().
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
