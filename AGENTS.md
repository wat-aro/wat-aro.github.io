# Repository Guidelines

## Project Structure & Module Organization
This repository is a statically exported Next.js site.

- `pages/`: route entry points (for example `pages/posts/[slug].tsx`, `pages/tags/[tag].tsx`).
- `components/`: reusable UI components, usually organized as `components/<PascalCase>/index.tsx`.
- `lib/`: content loading, markdown/rehype processing, path helpers, and OG image generation helpers.
- `contents/`: markdown sources (`contents/posts/`, `contents/slides/`, `contents/about.md`).
- `public/`: static assets, including pre-generated OG images under `public/og-images/`.
- `scripts/`: TypeScript scripts for generating OG images.
- `stories/`: Storybook stories and demo assets.

## Build, Test, and Development Commands
- `yarn`: install dependencies.
- `yarn dev`: start local dev server on port `3000`.
- `yarn lint`: run Next.js ESLint checks (`next/core-web-vitals`).
- `yarn build`: build production bundle.
- `yarn export`: generate OG images, build, then export static files to `out/`.
- `yarn storybook`: run Storybook on port `6006`.
- `yarn build-storybook`: build static Storybook output.
- Docker setup (optional): `docker-compose build` then `docker-compose run --rm app yarn`.

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

- Required checks before opening a PR: `yarn lint` and `yarn build`.
- For UI updates, verify in Storybook (`yarn storybook`) and test changed pages locally (`yarn dev`).
- For OG image script changes, run `yarn generate-ogimage <start> <end>` on a small range first.

## Commit & Pull Request Guidelines
- Follow the existing commit style: short, imperative subjects (for example `Add tag`, `Fix ogimage`, `Refactor`).
- Keep one logical change per commit.
- PRs should include:
  - what changed and why,
  - affected routes/content paths,
  - screenshots for visible UI changes,
  - confirmation that `yarn lint` and `yarn build` passed.

## Deployment Notes
Pushes to `main` trigger GitHub Actions (`.github/workflows/gh-pages.yml`) to run `yarn export` and deploy `out/` to GitHub Pages.
