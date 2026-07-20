# Core

Base your docs and stylistic decisions on this https://m3.material.io/

**Package name**: `@noxlovette/material` (as in `package.json`) — use it everywhere.

# Commands

```bash
bun run dev              # showcase site: landing page + prose docs (SvelteKit, static adapter → GitHub Pages)
bun run storybook        # component workbench: live preview, Controls, a11y — the canonical way to view/QA components
bun run build-storybook  # storybook static build → storybook-static/
bun run build            # svelte-package → dist/ (what gets published to npm)
bun run check             # svelte-check + tsc
bun run test              # vitest run
bun run format             # prettier
```

# Architecture

```
src/lib/           # published library (@noxlovette/material)
  components/      # MD3 components grouped by category
    **/*.stories.svelte  # Storybook stories (Svelte-CSF), colocated with each component
  styles/          # CSS: elevation, motion, typescale, rounding; theme/ has light/dark/hc/mc variants
  animation/       # Material Design transitions (containerTransform, sharedAxis, enterExit, etc.)
  utils/           # Icon, Layer, Theme, ThemeScript, types, theme.svelte.ts
  actions/         # Svelte actions (clickOutside, keyboard, floating, positionFloating)
src/routes/        # showcase site only — not published. Landing page + prose docs, NOT a component
                    # gallery — that job belongs to Storybook. Links out to Storybook rather than
                    # re-implementing live previews.
  docs/            # component reference docs (layout + per-component pages)
                    # +layout.svelte's secondary sidebar uses SplitPane (anchor="sticky",
                    # resizable={false}); each page's content+TOC uses SupportingPane
                    # (anchor="parent"). See "Dogfooding rule" below — do not hand-roll
                    # this layout with raw flex/aside divs.
.storybook/        # isolated Storybook config — has its own vite.config.ts, NOT the root one
                    # (svelte-vite hard-errors if it detects SvelteKit's plugins)
dist/              # build output, do not edit
scripts/           # generate-components-index.ts — regenerates barrel index.ts files
```

In production, Storybook is built into `build/storybook/` alongside the SvelteKit static site and
served from the same GitHub Pages deployment (see `.github/workflows/gh-pages.yaml`) — one artifact,
two surfaces, so the "Storybook" nav link resolves correctly in both dev and prod.

# Key Patterns

- **Tailwind v4** via `@tailwindcss/vite` — no `tailwind.config.js`, use CSS-first config
- **Utility types**: prefer types from `utils/types.ts` (`AnchorButtonAttributes`, `SizeType`, `DivAttrs`, etc.)
- **Theme import**: consumers use `@noxlovette/material/styles` for base CSS and `@noxlovette/material/theme/light` etc.
- **New components**: export from the category `index.ts` and re-export in `src/lib/components/index.ts`
- **`tailwind-variants` (tv)**: every component's styles are defined with `tv()` from `tailwind-variants`, using named `slots` for multi-element components and `variants`/`compoundVariants` for state logic. Match this pattern for all new components — do not use plain `clsx` strings for component internals.

# Design & UX Skill

Before creating or modifying a component, choosing a variant/color role, adding motion, or reviewing UI for M3 compliance, consult the `material-design` skill (`.claude/skills/material-design/SKILL.md`). It encodes this repo's token vocabulary (color roles, typescale, elevation, shape, motion durations/easings), the `tv()` variant-selection rules, and an M3 accessibility checklist — use it instead of re-deriving M3 mappings from general knowledge.

`.claude/skills/material-design/` is the single source of truth. `bun run build` (via `scripts/copy-skill.ts`) copies it into the gitignored `claude-skill/` directory, which is published to npm alongside `dist/`. Consumers of `@noxlovette/material` run `npx @noxlovette/material material-claude-skill` (add `--force` to overwrite) to install it into their own project's `.claude/skills/material-design`. Never edit `claude-skill/` directly — it's regenerated on every build.

# Dogfooding Rule for Showcase/Docs Pages

Every page under `src/routes/` (landing page, `docs/**`) MUST be built from `@noxlovette/material`
components — `SinglePane`/`SplitPane`/`SupportingPane` for layout, `Card`/`Title`/`Body`/etc. for
content. Never hand-roll a layout pattern (raw `flex`/`aside`/`sticky` divs) that a library
component already covers — if you catch yourself reaching for one, that's a signal either an
existing pane component fits, or the pattern is missing from the library and belongs there instead
of one-off in a route file. The library is the product; routes exist to prove it works.

## SplitPane's three `anchor` modes

`SplitPane` (`src/lib/components/containers/panes/`) covers three distinct positioning strategies
for a left/right two-column layout — picking the right one matters once panes get nested:

- **`viewport`** (default) — left pane fixes to the true browser edge. For a full-page app layout
  where this is the outermost/only positioned element (e.g. the root `Rail`).
- **`parent`** — left pane is absolutely positioned within a `relative` ancestor. For
  embedded/contained demos (a bounded sandbox box) — does **not** stay pinned while the page
  scrolls.
- **`sticky`** — left/right sit in normal flex flow and the left pane sticks (`position: sticky`)
  as the page scrolls. Use this for a sidebar nested _inside other already-offset content_ — e.g.
  the docs secondary component-list nav, which lives inside the root layout's Rail-offset content
  column. `viewport` would fix it to the true left edge (underneath/behind the Rail); `parent`
  would lose the "stays visible while scrolling" behavior. Pair `anchor="sticky"` with
  `resizable={false}` for a static (non-draggable) sidebar — this hides the drag handle and skips
  width persistence to `localStorage`.

For a content-area + fixed-width side panel (e.g. a docs page's article + "On this page" TOC), use
`SupportingPane` with `anchor="parent"` instead — that's the canonical M3
[supporting-pane layout](https://m3.material.io/foundations/layout/canonical-layouts/supporting-pane),
not a resizable split.

# Adding a New Component

0. Consult the `material-design` skill for variant/color-role/motion choices before writing `theme.ts`
1. Create `src/lib/components/<category>/<ComponentName>.svelte` and a `types.ts`
2. Define styles in `theme.ts` using `tv()` with `slots`
3. Add the export to the category's `index.ts`
4. Run the codegen to regenerate barrel exports:
   ```bash
   bun scripts/generate-components-index.ts
   ```
5. Add `<ComponentName>.stories.svelte` next to the component (Svelte-CSF via `@storybook/addon-svelte-csf`'s `defineMeta`/`Story`) — this is the live preview, not a showcase route
6. Add a docs page under `src/routes/docs/<component>/+page.svelte` for prose/usage guidance (only if the component needs more explanation than Storybook's autodocs gives)

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
