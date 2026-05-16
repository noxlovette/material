# Core

Base your docs and stylistic decisions on this https://m3.material.io/

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
  utils/           # shared types (SizeType, AnchorButtonAttributes, etc.) and helpers
  actions/         # Svelte actions (clickOutside, keyboard, floating, positionFloating)
src/routes/        # showcase site only — not published
dist/              # build output, do not edit
```

# Key Patterns

- **Tailwind v4** via `@tailwindcss/vite` — no `tailwind.config.js`, use CSS-first config
- **Utility types**: prefer types from `utils/types.ts` (`AnchorButtonAttributes`, `SizeType`, `DivAttrs`, etc.)
- **Theme import**: consumers use `@noxlovette/material/styles` for base CSS and `@noxlovette/material/theme/light` etc.
- **New components**: export from the category `index.ts` and re-export in `src/lib/components/index.ts`

# Bits UI

Everything you need to know on the headless component library powering the components themselves: https://bits-ui.com/llms.txt
Instead of their Separator, use our Divider.svelte, which already implements Separator

# Animations and transitions

Use Material Design transitions and animations
Implementations live in `src/lib/animation/` — use existing transition functions before writing new ones

---

Cypress skills have been installed with GitHub CLI
