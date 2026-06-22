<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — BabyBites PWA conventions

Mobile-first PWA (Next.js 16 App Router · React 19 · TypeScript) that randomizes
age-appropriate baby & toddler recipes. The PWA rebuild of the Expo app at
`../baby-bites`.

## Next.js 16 notes
- `params` is a **Promise** in server pages — `const { id } = await params`.
- `themeColor`/`viewport` live in a separate `export const viewport` (not in `metadata`).

## Architecture
- **Design = clico-ds, imported (not re-implemented).** clico-ds is **vendored**
  at `vendor/clico-ds` (built `dist/`) and referenced via `file:vendor/clico-ds`
  so the repo deploys standalone. To update it: rebuild clico-ds in
  `~/code/design-systems/clico-ds`, then re-copy its `dist/` here. It's in
  `transpilePackages` in `next.config.ts`.
- **All colors/fonts/radii come from `--clico-*` tokens** (loaded via
  `import "clico-ds/styles.css"` in `app/layout.tsx`). Never hardcode hex/px in
  `globals.css` — reference tokens. Compose clico `Panel`/`Button`/`Badge`
  before writing bespoke CSS.
- **Data is bundled & static** in `lib/recipes.ts` (`RECIPES` + `STAGES`).
  Age filtering is **band-based**: `recipesForAge(age)` returns recipes where
  `minMonths <= age <= maxMonths`, so first-food purées drop off for older
  babies. Keep `maxMonths` honest (99 = open-ended).
- **Age selection** is a shared, persisted store via `useSyncExternalStore`
  (`lib/useAgeStage.ts`) — do NOT setState-in-effect (lint rule forbids it).
- **Interactive pages are client components**; `recipe/[id]` is a server
  component (`generateStaticParams` → static pages) wrapping the client
  `RecipeDetail`.

## PWA
- Manifest: `app/manifest.ts` → `/manifest.webmanifest`. Icons in `public/`
  (192/512/512-maskable/apple-touch). Service worker: `public/sw.js`
  (stale-while-revalidate, same-origin only), registered in production by
  `components/ServiceWorkerRegister.tsx`.

## Verify (loop until all pass)
```bash
npm run lint
npm run build     # all routes incl. /recipe/* prerender; no module-not-found
```
Then smoke-test: randomize, change age chip (12m shows no purées), open a
recipe, tap the source link, Browse, reload offline.
