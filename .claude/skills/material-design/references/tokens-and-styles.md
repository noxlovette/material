# Tokens and styles inventory

Source of truth: `src/lib/styles/*.css`. Rule: **never hardcode a color, shadow, radius, or duration value in a component — every one of these already has a token or utility class.** If you think you need a new value, check these files first; you're almost certainly missing an existing one.

## Color roles (`src/lib/styles/theme/*.css`)

Defined per theme variant (`light.css`, `dark.css`, `light-hc.css`, `dark-hc.css`, `light-mc.css`, `dark-mc.css` — high-contrast and medium-contrast accessibility variants) as `--md-sys-color-*` custom properties, consumed via Tailwind utilities of the form `bg-md-sys-color-*` / `text-md-sys-color-*` / `outline-md-sys-color-*`.

- Core roles: `primary`, `secondary`, `tertiary`, `error`
- Each has a low-emphasis tonal pair: `{role}-container`
- Each (including containers) has a guaranteed-contrast text/icon pair: `on-{role}`, `on-{role}-container`
- Surface roles: `surface`, `surface-variant`, `surface-container` (`-lowest`, `-low`, `-high`, `-highest`), `on-surface`, `on-surface-variant`
- Structural: `outline`, `outline-variant`, `shadow`

Because `on-*` pairs are generated to meet contrast requirements, **any manual color override that doesn't go through an `on-*`/role pair is a contrast bug waiting to happen** — flag it in review.

## Component color composition (`src/lib/styles/component.css`)

Components don't reference `md-sys-color-*` directly for every state — they compose pre-built classes:

```
md-component-button-filled-{default,primary,secondary,tertiary,error}
md-component-button-tonal-{default,primary,secondary,tertiary,error}
md-component-button-outline-{default,primary,secondary,tertiary,error}
md-component-button-text-{default,primary,secondary,tertiary,error}
md-component-button-elevated-{default,primary,secondary,tertiary,error}
```

`filled` = `bg-md-sys-color-{role} text-md-sys-color-on-{role}`. `tonal` = the `-container`/`on-{role}-container` pair. `outlined` = `text-md-sys-color-{role} outline-md-sys-color-{role}` (default outline uses `on-surface-variant`/`outline-variant`). `text` = text color only, transparent background. `elevated` = `bg-md-sys-color-surface-container-low` + role text color + `shadow-elevation-1`. When adding a new component family with the same emphasis levels, follow this exact composition rather than reinventing it.

Other reusable utilities in this file:

- `.state-layer` — the `::before` overlay hook that `Layer.svelte` and hover/press states build on
- `md-sys-state-focus-indicator` — the `:focus-visible` outline (3px solid, `on-secondary` color, 2px offset) — apply to anything focusable that doesn't already get it via a shared base class
- `.md-component-button-base` — disabled-state handling (`on-surface` at reduced opacity) + cursor — reuse for any new interactive component base

## Typescale (`src/lib/styles/typescale.css`)

The full M3 type scale (https://m3.material.io/styles/typography/type-scale-tokens), in rem:

- `md-sys-typescale-{display,headline,title,body,label}-{large,medium,small}`: the 15 baseline styles. Each sets font family, weight, size, line height, and tracking. Don't set `text-*`/`leading-*`/`tracking-*`/`font-*` next to one; pick a different style instead.
- `md-sys-typescale-emphasized-<style>`: the 15 emphasized styles. They have the same metrics and a heavier weight (400 → 500, 500 → 700). Components use baseline by default. Swap in the emphasized style for selected or active states, unread items, primary-action buttons, badges and the extended FAB. Don't add `font-bold` to a baseline style.
- `md-sys-typescale-label-{large,medium}-prominent`: the `weight.prominent` (700) label tokens.
- Typefaces: display, headline and title-large use `--md-ref-typeface-brand`; everything else uses `--md-ref-typeface-plain`. Both default to `--font-sans`; M3's own default is Roboto.
- Line heights follow the language-height category of the element's `lang`: small (Latin, Cyrillic, Greek, Hebrew), medium (CJK, Arabic, Indic, Thai, Vietnamese…), large (Burmese, Telugu), extra-large (Urdu/Nastaliq). Force a category with `data-md-language-height="small|medium|large|extra-large"`.

## Spacing (`src/lib/styles/spacing.css`)

`md.sys.measurement.space<N>` (N/100 × the 8dp base) is registered in Tailwind's spacing namespace. Every spacing utility therefore takes it: `p-spacing-200` (16dp), `gap-spacing-50` (4dp), `mr-spacing-300` (24dp), `size-spacing-600` (48dp). The available numbers are 0, 25, 50, 75, 100, 125, 150, 175, 200, 250, 300, 400, 450, 500, 600, 700, 800 and 900. The number is M3's token number, not Tailwind's 4px multiplier.

## Elevation (`src/lib/styles/elevation.css`)

`shadow-elevation-{0..5}`, each a two-layer (spot + ambient) shadow scaled to the M3 elevation spec, using `color-mix` against the `shadow` color role so it adapts per theme automatically. Elevation communicates depth/priority — reach for a higher level when a surface should read as "above" its neighbors (menus, FABs, dialogs), not as a decorative effect.

## Shape (`src/lib/styles/rounding.css`)

`radius-{none,xs,sm,md,lg,xl,full}` = `0 / 4px / 8px / 12px / 16px / 28px / 9999px`, matching the M3 shape scale (extra-small through extra-large, plus full/pill). Buttons don't use these directly — they use CSS custom properties (`--btn-shape`, `--btn-shape-override`, `--btn-pressed-shape` set per `size`/`shape` variant in `theme.ts`) consumed by the `.md-btn-morph` utility, which also animates the radius on press (a deliberate M3 "morph" detail — don't remove it when adding button variants).

## Motion (`src/lib/styles/motion.css`)

M3 Expressive springs only, generated from `springTokens` in `src/lib/animation/spring.ts` (never hand-edited — a lefthook pre-commit job regenerates them). Each spring exposes `--md-sys-motion-timing-function-<name>` (a `linear()` curve), `--md-sys-motion-duration-<name>` (its settle time) and `--md-sys-motion-easing-<name>` (both combined):

- **Spatial** (things that move, resize, or morph — overshoot): `fast-spatial` (410ms), `spatial` (490ms), `slow-spatial` (660ms)
- **Effects** (color/opacity — no overshoot): `fast-effects-spring` (190ms), `effects-spring` (270ms), `slow-effects-spring` (370ms)

In Tailwind classes use the utilities instead: `md-sys-motion-{fast-spatial,spatial,slow-spatial,fast-effects,effects,slow-effects}` alongside a `transition-*` property utility. There are no standard/emphasized easing tokens.

Full decision guidance for motion lives in `references/motion-guide.md` — don't just guess a duration.
