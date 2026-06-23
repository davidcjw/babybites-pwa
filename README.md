# BabyBites 🥄 (PWA)

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Next.js 16](https://img.shields.io/badge/Next.js-16-000000.svg?logo=next.js)
![React 19](https://img.shields.io/badge/React-19-61dafb.svg?logo=react)
![PWA](https://img.shields.io/badge/PWA-installable%20%C2%B7%20offline-5a0fc8.svg)
![Deployed on Vercel](https://img.shields.io/badge/Vercel-deployed-000000.svg?logo=vercel)

A mobile-first **Progressive Web App** that randomizes what to cook for your baby and grows with her — from first purées at 6 months to confident-toddler meals at 18 months+. Installable to your iPhone/Android home screen, works offline, **free to host** on Vercel.

> The PWA rebuild of the original Expo app (`../baby-bites`) — no Apple Developer account, no App Store, just a normal web deploy.

🔗 **Live:** https://babybites.davidcjw.com

<p align="center">
  <img src="docs/demo.gif" alt="BabyBites PWA demo — randomize a recipe, filter by age, open a recipe" width="320">
</p>

## Features

- **🎲 Surprise me** — one tap picks a random age-appropriate recipe.
- **Age-band filter** — `6m · 8m · 10m · 12m · 18m+` chips (defaults to **8 months**, persisted across visits). Filtering is **band-based**: each recipe has a `[minMonths, maxMonths]` window, so smooth first-food purées drop off for older babies — a 12-month-old is *not* offered 6-month purées. Badges show the band (e.g. `6–10m` / `8m+`).
- **Full recipes** — ingredients, step-by-step *how to cook*, texture, prep time, servings, tags. Each recipe is a **static, shareable URL** (`/recipe/<id>`).
- **🇸🇬 Singapore recipes** — local staples (iron rice cereal, brown-rice congee, fish & spinach porridge, silken tofu with pumpkin, minced-chicken congee, silky steamed egg, papaya-banana scrape) reflecting **HPB HealthHub** + **SingHealth HealthXchange** weaning guidance, each linked to the real SG source.
- **Source links**, **installable** (manifest + icons), and **offline** (service worker caches the app shell + recipes after first visit).

## Design

Built directly on the **clico-ds** design system (cream paper, 2px hard borders + hard offset shadows, pill buttons, lime CTA, Instrument Sans/Serif + JetBrains Mono). Unlike the Expo app (which had to re-implement the tokens), this PWA **imports the real clico-ds React components** — `Panel`, `Button`, `Badge`, `DisplayHeading`/`SerifAccent`. clico-ds is **vendored** under [`vendor/clico-ds`](vendor/clico-ds) (its built `dist/`) so the repo is self-contained and deploys standalone.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · vanilla CSS on clico tokens · no database (recipes bundled in [`lib/recipes.ts`](lib/recipes.ts)).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm run start   # production build
npm run lint                     # eslint
```

## Deploy (free)

Push to GitHub and import into **Vercel** (zero config — it autodetects Next.js), or:

```bash
npx vercel        # preview
npx vercel --prod # production
```

After it's live, open the URL on your iPhone in Safari → **Share → Add to Home Screen** to install it like a native app.

## Structure

```
app/
  layout.tsx            # clico styles + PWA metadata/manifest + SW registration + Chrome
  page.tsx              # home randomizer (client)
  browse/page.tsx       # age-filtered recipe list (client)
  recipe/[id]/page.tsx  # static per-recipe page (generateStaticParams)
  manifest.ts           # web app manifest (/manifest.webmanifest)
  icon.svg              # favicon (spoon on a lime tile)
  globals.css           # app styles on --clico-* tokens
components/
  Chrome.tsx            # header + bottom tab nav
  AgeFilter.tsx · RecipeCard.tsx · RecipeDetail.tsx
  ServiceWorkerRegister.tsx
lib/
  recipes.ts            # curated library + STAGES + band filter
  types.ts · useAgeStage.ts  # persisted shared age selection (useSyncExternalStore)
public/
  sw.js                 # offline service worker (stale-while-revalidate)
  icon-192/512(.maskable).png · apple-touch-icon.png
vendor/clico-ds/        # vendored clico-ds dist (self-contained, MIT)
```

## Safety

Recipe method steps are original wording; ingredient lists are factual. Always follow your paediatrician's guidance on introducing allergens and on choking-hazard textures, cook eggs/fish/meat thoroughly, and serve food just warm. The disclaimer repeats on every recipe.

## Contributing

Contributions are welcome — especially new recipes and additional regional weaning sources. Please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: describe change'`)
4. Push and open a pull request

Before submitting a PR, make sure it lints and builds:

```bash
npm run lint
npm run build
```

When adding recipes, follow the [Safety](#safety) rules and keep the `Recipe` shape in [`lib/types.ts`](lib/types.ts): original-wording method steps, factual ingredients, and a source link per recipe.

## Code of Conduct

This project follows the [Contributor Covenant v2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).
By participating you agree to uphold a welcoming, harassment-free environment.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
