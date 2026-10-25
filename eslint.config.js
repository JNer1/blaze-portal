import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", ".wrangler", "playwright-report", "test-results", "src/worker/worker-configuration.d.ts"] },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["src/client/**/*.{ts,tsx}"],
    extends: [reactHooks.configs.flat.recommended],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["*.config.{js,ts}", "e2e/**/*.ts"],
    languageOptions: { globals: globals.node },
  },
);
