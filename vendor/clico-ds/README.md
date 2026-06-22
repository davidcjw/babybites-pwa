# clico-ds

A standalone, buildable React + Storybook design system reverse-extracted from the visual language of **[tryclico.com](https://tryclico.com/)** — the Clico AI writing-assistant landing page.

It is a *faithful reconstruction* of Clico's design vocabulary (tokens + composable components), **not** a pixel clone or a scrape of the site's markup. The Storybook is the source of truth and the `/design-sync` feed.

## The look

A playful **neo-brutalist** SaaS aesthetic:

- Warm **cream paper** `#f6f3ec` with near-black ink `#0a0a0a`
- **2px hard borders** + **hard offset drop-shadows** (`4px 4px 0` ink) — the signature
- **Pill** buttons; lime-green primary CTA `#c1f04c`
- A bright **multi-accent collage** (coral / amber / green traffic-lights, mint, lilac, butter, peach)
- **Instrument Sans** (body) + **Instrument Serif** italic (display accents) + **JetBrains Mono** (labels)

| Source | Reconstruction (from clico-ds components) |
|---|---|
| ![source](docs/source-reference.png) | ![reconstruction](docs/homepage-reconstruction.png) |

## Install

```bash
npm install clico-ds
```

```tsx
import { Button, DisplayHeading, SerifAccent } from "clico-ds";
import "clico-ds/styles.css"; // compiled tokens + fonts + component CSS

export function Hero() {
  return (
    <>
      <DisplayHeading>
        AI <SerifAccent>works</SerifAccent> right inside Gmail
      </DisplayHeading>
      <Button variant="primary" icon="🧩">Add to Chrome</Button>
    </>
  );
}
```

Everything is tokens-first: each component references `--clico-*` custom properties, never raw values, so re-theming is a token edit.

## Tokens

Defined in [`src/styles/tokens.css`](src/styles/tokens.css) as `--clico-*` custom properties.

| Token | Value | Role |
|---|---|---|
| `--clico-paper` | `#f6f3ec` | page background (cream) |
| `--clico-surface` | `#ffffff` | card / panel surface |
| `--clico-ink` | `#0a0a0a` | text · borders · shadow |
| `--clico-muted` | `#5a5a5a` | secondary text |
| `--clico-faint` | `#999999` | tertiary / disabled |
| `--clico-hairline` | `rgba(10,10,10,.12)` | subtle rules |
| `--clico-link` | `#5b5bd6` | inline links |
| `--clico-lime` | `#c1f04c` | primary CTA |
| `--clico-coral` / `-amber` / `-green` | `#ff5f57` / `#ffbd2e` / `#28c840` | traffic-light dots / status |
| `--clico-mint` / `-lilac` / `-butter` / `-peach` | `#daf5f0` / `#c4a1ff` / `#fdfd96` / `#f8d6b3` | tinted surfaces |
| `--clico-font-sans` | Instrument Sans … | body / UI |
| `--clico-font-serif` | Instrument Serif … | display accents |
| `--clico-font-mono` | JetBrains Mono … | labels |
| `--clico-fs-display / -title / -lead / -body / -micro` | `82 / 32 / 20 / 15 / 12px` | type scale |
| `--clico-module` / `-gutter` | `16px` / `24px` | spacing rhythm |
| `--clico-border-width` | `2px` | border weight |
| `--clico-radius-sm / -radius / -radius-pill` | `6 / 10 / 999px` | corners |
| `--clico-shadow-sm` / `-shadow` | `2px 2px 0` / `4px 4px 0` ink | hard offset shadows |

## Components

The primitive is **Panel** — a bordered, rounded, hard-shadowed surface. Everything composes from it.

| Component | Kind | Notes |
|---|---|---|
| `Panel` | primitive | 10 tones, 3 shadow + 3 radius steps, polymorphic `as`, interactive lift |
| `Button` | composite | pill CTA; `primary` (lime) / `secondary` / `ghost`; sm·md·lg; presses into its shadow |
| `Badge` | composite | small pill label; tones + optional status dot + mono mode |
| `WindowDots` | primitive | macOS traffic-light trio (decorative motif) |
| `BrowserFrame` | composite | windowed "app" mockup = Panel + WindowDots title bar |
| `DisplayHeading` + `SerifAccent` | composite | the sans + serif-italic hero headline treatment |
| `FeatureCard` | composite | icon-chip + title + body + footer; the feature-grid unit |

## Scripts

| Script | Does |
|---|---|
| `npm run build` | `tsc --noEmit && vite build` → `dist/` (ESM `.js`, CJS `.cjs`, `clico-ds.css`, `index.d.ts`) |
| `npm run dev` | library build in watch mode |
| `npm run storybook` | Storybook dev server on :6006 |
| `npm run build-storybook` | static Storybook |
| `npm run design-cards` | regenerate the `/design-sync` HTML card bundle into `.design-sync/` |

## Fidelity & approximations

- **Faithful**: palette, the hard border + offset-shadow signature, pill CTAs, the serif-italic display mix, the browser-window motif, tinted feature cards, the type scale.
- **Reconstructed, not scraped**: Clico's live DOM has hundreds of marketing nodes; clico-ds models only the *vocabulary* as clean, reusable components.
- **Approximations**: product-screenshot imagery and decorative collage stickers/illustrations on the live site are out of scope — `BrowserFrame` provides the frame; consumers supply content. Icons in stories use emoji placeholders.
- All three typefaces are **free** on Google Fonts (no proprietary-font substitution needed).

## License

MIT
