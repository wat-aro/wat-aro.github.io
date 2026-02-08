# Repository Guidelines

## Project Structure & Module Organization
This repository is a statically exported Next.js site.

- `pages/`: route entry points (for example `pages/posts/[slug].tsx`, `pages/tags/[tag].tsx`).
- `components/`: reusable UI components, usually organized as `components/<PascalCase>/index.tsx`.
- `lib/`: content loading, markdown/rehype processing, path helpers, and OG image generation helpers.
- `contents/`: markdown sources (`contents/posts/`, `contents/slides/`, `contents/about.md`).
- `public/`: static assets. OG images are generated into `public/og-images/` during export.
- `scripts/`: TypeScript scripts for generating OG images.
- `stories/`: Storybook stories and demo assets.

## Build, Test, and Development Commands
- `pnpm install`: install dependencies.
- `pnpm dev`: start local dev server on port `3000`.
- `pnpm lint`: run ESLint with the flat config (`eslint.config.mjs`).
- `pnpm build`: build production bundle.
- `pnpm export`: generate OG images, build, then export static files to `out/`.
- `pnpm storybook`: run Storybook on port `6006`.
- `pnpm build-storybook`: build static Storybook output.
- `pnpm exec playwright install chromium`: install browser runtime required by OG image scripts.

## Coding Style & Naming Conventions
- Language: TypeScript with `strict: true` (`tsconfig.json`).
- Use 2-space indentation and keep existing semicolon/single-quote style in TS/TSX files.
- Prefer typed props and explicit domain types in `lib/`.
- Keep component and route naming consistent with existing patterns:
  - Components: `PascalCase` directories/files.
  - Dynamic routes: Next.js bracket syntax (for example `[slug].tsx`).
- Markdown filename is used as slug; rename files carefully.

## Testing Guidelines
There is no dedicated unit-test framework in this repo right now.

- Required checks before opening a PR: `pnpm lint` and `pnpm build`.
- For UI updates, verify in Storybook (`pnpm storybook`) and test changed pages locally (`pnpm dev`).
- For OG image script changes, run `pnpm generate-ogimage <start> <end>` on a small range first.

## Commit & Pull Request Guidelines
- Follow the existing commit style: short, imperative subjects (for example `Add tag`, `Fix ogimage`, `Refactor`).
- Keep one logical change per commit.
- PRs should include:
  - what changed and why,
  - affected routes/content paths,
  - screenshots for visible UI changes,
  - confirmation that `pnpm lint` and `pnpm build` passed.

## Deployment Notes
Pushes to `main` trigger GitHub Actions (`.github/workflows/gh-pages.yml`) to run `pnpm export` and deploy `out/` to GitHub Pages.
