# ClubKit

Web frontend for the ACM UTSA site, built as monorepo. The app
(`apps/web`) is a Next.js App Router project deployed to Cloudflare Workers via
OpenNext.

## Tech stack

- **Next.js 15** + **React 19**
- **TypeScript 5**
- **Tailwind CSS 3** with shadcn/ui (Radix primitives), `lucide-react` icons
- **nuqs** for URL search-param state
- \**pnpm** packege manager
- **Cloudflare Workers** deploy via **`@opennextjs/cloudflare`** + **Wrangler**
  (`apps/web/wrangler.toml`)

## Requirements

- Node.js `>= 20`
- pnpm `8.9.0` (declared in `packageManager`; run `corepack enable` to match it)

## Running locally

```bash
pnpm install
pnpm dev
```

`pnpm dev` starts the web app at
**http://localhost:3000**.

Other scripts (run from the repo root):

| Command | What it does |
| --- | --- |
| `pnpm build` | Production build of every workspace (`turbo build`) |
| `pnpm lint` | Lint every workspace |
| `pnpm format` | Prettier write across the repo |

## Deploying to Cloudflare

Run from `apps/web` (needs a Cloudflare account: `wrangler login` or
`CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`):

```bash
pnpm --filter web preview   # build + run the Worker locally
pnpm --filter web deploy    # build + deploy the Worker
```
