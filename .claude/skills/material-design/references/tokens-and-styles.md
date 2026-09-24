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

`md-sys-typescale-{display,headline,title,body,label}-{large,medium,small}`, plus a one-off `md-sys-typescale-fab-label`. Each bakes in the correct font size, line height, tracking, and (for title/label) weight — don't set `text-*`/`leading-*`/`tracking-*` manually when one of these fits.

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
