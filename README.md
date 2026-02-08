# Site

https://wat-aro.dev

Statically exported blog built with Next.js.

## Requirements

- Node.js 22
- pnpm 10 (`packageManager` is fixed in `package.json`)

## Setup

```sh
pnpm install
pnpm exec playwright install chromium
```

## Local Development

```sh
pnpm dev
```

Default URL: `http://localhost:3000`

## Common Commands

```sh
pnpm lint                   # ESLint
pnpm exec tsc --noEmit      # Type check
pnpm build                  # Production build
pnpm export                 # Generate OG images + build (static export)
pnpm storybook              # Storybook dev server
pnpm build-storybook        # Build Storybook
```

## OG Image Generation

```sh
pnpm generate-ogimages          # Generate only missing/targeted images
pnpm generate-ogimage 0 10      # Generate by range
pnpm generate-all-ogimages      # Force-generate all post OG images
```

Notes:
- CI passes `FORCE_OG_IMAGE_SLUGS` and `FORCE_REGENERATE_OG_IMAGES` to regenerate only required images.
- If Playwright browser binaries are missing, run `pnpm exec playwright install chromium`.

## Deployment

- Push to `main` triggers GitHub Pages deployment via `.github/workflows/gh-pages.yml`.
- Weekly production dependency audit runs via `.github/workflows/security.yml` (`pnpm audit --prod`).
