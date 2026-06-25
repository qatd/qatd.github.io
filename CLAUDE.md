# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev       # Start dev server
pnpm build     # Type-check + build (tsc -b && vite build --base=./)
pnpm lint      # ESLint
pnpm preview   # Preview production build locally
```

> Deployment is automatic: pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`), which builds and publishes to GitHub Pages.

> No test runner is configured in this project.

## Architecture

**Stack:** React 18 + TypeScript (strict) + Vite, deployed to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`).

**Routing:** `HashRouter` (required for GitHub Pages static hosting) with routes defined in `appText.json` under the `pages` key.

**Content:** All content lives in `/public/assets/jsons/`:
- `posts.json` — portfolio items (presentations & projects), with images, videos, links, tags
- `tags.json` — skill/tech tags with categories, bilingual
- `appText.json` — all UI strings, page routes, contact info, social links — bilingual (en/fr)

Adding or editing portfolio content means editing these JSON files; no rebuild of TypeScript is needed.

**Data flow:**
1. `LanguageContextProvider` detects browser language (en/fr) and exposes current language
2. `PostContextProvider` and `TagContextProvider` fetch the JSON files and filter by language
3. Pages consume data via custom hooks: `useLanguage()`, `usePost()`, `useTags()`

**Styling:** Styled Components (primary, new code) + SCSS (legacy, still in use). Global styles are in `src/style/globalRules.ts`. Breakpoint constants live in `src/utils/responsiveUtils.ts` and are used with `react-responsive` hooks for responsive variants.

**Animations:** Centralized Framer Motion variants in `src/style/animations/animations.ts`. Use `AnimatePresence` + named variants for page transitions and component entrance animations.

**Post types:** A post can be either a `"presentation"` or `"project"` — these use different layout components (`PostPresentationLayout` vs `PostProjectLayout`).

**Error/Loading:** `ReactErrorBoundary` + `Suspense` wrap the app at the top level, with `FallbackError` and `FallbackLoading` components.
