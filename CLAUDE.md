# Core

Base your docs and stylistic decisions on this https://m3.material.io/

**Package name**: `@noxlovette/material` (as in `package.json`). The showcase's `/src/routes/+page.svelte` shows an older name — ignore it; use `@noxlovette/material` everywhere.

# Commands

```bash
bun run dev        # showcase site (SvelteKit, static adapter → GitHub Pages)
bun run build      # svelte-package → dist/ (what gets published to npm)
bun run check      # svelte-check + tsc
bun run test       # vitest run
bun run format     # prettier
```

# Architecture

```
src/lib/           # published library (@noxlovette/material)
  components/      # MD3 components grouped by category
  styles/          # CSS: elevation, motion, typescale, rounding; theme/ has light/dark/hc/mc variants
  animation/       # Material Design transitions (containerTransform, sharedAxis, enterExit, etc.)
  utils/           # Icon, Layer, Theme, ThemeScript, types, theme.svelte.ts
  actions/         # Svelte actions (clickOutside, keyboard, floating, positionFloating)
src/routes/        # showcase site only — not published
  docs/            # component reference docs (layout + per-component pages)
dist/              # build output, do not edit
scripts/           # generate-components-index.ts — regenerates barrel index.ts files
```

# Key Patterns

- **Tailwind v4** via `@tailwindcss/vite` — no `tailwind.config.js`, use CSS-first config
- **Utility types**: prefer types from `utils/types.ts` (`AnchorButtonAttributes`, `SizeType`, `DivAttrs`, etc.)
- **Theme import**: consumers use `@noxlovette/material/styles` for base CSS and `@noxlovette/material/theme/light` etc.
- **New components**: export from the category `index.ts` and re-export in `src/lib/components/index.ts`
- **`tailwind-variants` (tv)**: every component's styles are defined with `tv()` from `tailwind-variants`, using named `slots` for multi-element components and `variants`/`compoundVariants` for state logic. Match this pattern for all new components — do not use plain `clsx` strings for component internals.

# Adding a New Component

1. Create `src/lib/components/<category>/<ComponentName>.svelte` and a `types.ts`
2. Define styles in `theme.ts` using `tv()` with `slots`
3. Add the export to the category's `index.ts`
4. Run the codegen to regenerate barrel exports:
   ```bash
   bun scripts/generate-components-index.ts
   ```
5. Add a showcase route under `src/routes/` and link it from `+layout.svelte`
6. Add a docs page under `src/routes/docs/<component>/+page.svelte`

# Key Utils (`src/lib/utils/`)

- **`Icon.svelte`** — renders Material Symbols icons; accepts `name`, `fill`, `wght`, `size`
- **`Layer.svelte`** — renders the M3 state-layer overlay (hover/pressed ripple container); wrap interactive elements with it
- **`Theme.svelte`** / **`ThemeScript.svelte`** — dynamic theming via `@ktibow/material-color-utilities-nightly`; `ThemeScript` goes in `<svelte:head>` to prevent FOUC
- **`theme.svelte.ts`** — exports `ThemeConfig`, `DEFAULT_CONFIG`, `STORAGE_KEY`, `ColorScheme`, `ContrastMode`, `ThemeVariant`, and `isDarkScheme()`
- **`MaterialSymbolsProvider`** — lazily loads icon font variants; used inside `App.svelte`

# CSS Import Order (load-bearing)

In `app.css` (or equivalent consumer entry), order matters:

```css
@import 'tailwindcss';
@import '@noxlovette/material/styles'; /* lib/index.css */
@import '@noxlovette/material/theme/light';
@import '@noxlovette/material/theme/dark';

@custom-variant dark (&:is(.dark *)); /* must come after tailwindcss import */
```

Changing this order breaks theming or dark-mode detection.

# Bits UI

Everything you need to know on the headless component library powering the components themselves: https://bits-ui.com/llms.txt
Instead of their Separator, use our Divider.svelte, which already implements Separator

# Animations and transitions

Use Material Design transitions and animations
Implementations live in `src/lib/animation/` — use existing transition functions before writing new ones

---

Cypress skills have been installed with GitHub CLI
