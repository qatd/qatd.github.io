## Portfolio Website

Simple personal portfolio deployed at [quentina00.github.io](https://quentina00.github.io/)

**Stack:** React 18 · TypeScript · Vite · Styled Components · Framer Motion · React Query

## Content

All content is in `/public/assets/jsons/` — no TypeScript rebuild needed when editing it.

| File | Description |
|---|---|
| `posts.json` | Portfolio items (projects & presentations) |
| `tags.json` | Skill/tech tags with categories, bilingual |
| `appText.json` | UI strings, routes, contact info — bilingual (en/fr) |

## Architecture

- **Routing:** `HashRouter` (required for GitHub Pages)
- **State:** Context providers for language, posts, and tags, consumed via custom hooks
- **Animations:** Framer Motion
- **Responsive:** Breakpoint in `src/utils/responsiveUtils.ts` + `react-responsive`
- **Styling:** Styled Components