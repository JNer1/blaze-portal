# BlAzE Portal

Internal research administration tool for a DOST-funded university research project. Project specifications, decisions, and backlog live in [`docs/`](docs/README.md).

Status: development foundation only (unit U02). No features, sign-in, database, or Google integration yet. Nothing is deployed.

## Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS, shadcn/ui (`src/client`)
- **Backend:** Hono on Cloudflare Workers (`src/worker`), serving the frontend from the same origin
- **Shared:** Zod schemas used by both sides (`src/shared`)
- **Tests:** Vitest (`src/**/*.test.ts`) and Playwright (`e2e/`)
- **Package manager:** pnpm (version pinned in `package.json`)

## Setup

Requires Node 22 or newer and pnpm (`corepack enable` installs the pinned version).

```sh
pnpm install
pnpm exec playwright install chromium   # once, for end-to-end tests
cp .dev.vars.example .dev.vars          # optional; no variables are needed yet
```

pnpm only runs install scripts for packages listed under `allowBuilds` in `pnpm-workspace.yaml` (currently `esbuild` and `workerd`, which Vite and the local Workers runtime need). Review any new entry before approving it.

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Runs frontend and Worker together locally at http://localhost:5173 |
| `pnpm test` | Unit and API tests (Vitest) |
| `pnpm test:e2e` | Browser smoke tests (Playwright; starts its own dev server) |
| `pnpm typecheck` | TypeScript checks for client, worker, and config files |
| `pnpm lint` | ESLint |
| `pnpm build` | Production build into `dist/` (does not deploy) |
| `pnpm cf-typegen` | Regenerates Worker types after editing `wrangler.jsonc` |

## Continuous integration

GitHub Actions (`.github/workflows/ci.yml`) runs lint, typecheck, unit tests, build, and the Playwright tests on every push and pull request, using the Node version in `.nvmrc`. It never deploys. Dependabot (`.github/dependabot.yml`) opens monthly dependency and action update PRs; TypeScript and Vitest major versions are skipped because they are pinned on purpose (see [architecture](docs/02-architecture.md)).

## Local configuration and secrets

`wrangler.jsonc` configures the Worker. Wrangler is Cloudflare's tool; here it only runs the Workers runtime locally through the Cloudflare Vite plugin. Deployment requires a Cloudflare login and explicit approval (see decision D11).

Secrets go in `.dev.vars`, which is gitignored. Never commit real credentials, and use synthetic data only in tests and local development.
