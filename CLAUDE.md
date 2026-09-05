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
                    # +layout.svelte's secondary sidebar is a PaneGrid with a sticky nav
                    # Pane; each page's content+TOC is a PaneGrid with a sticky TOC Pane.
                    # See "Dogfooding rule" below — do not hand-roll this layout with raw
                    # flex/aside divs.
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

# Known Pitfalls: Tokens, Icons, tv() Slots

Found while auditing typescale usage across every component (see git history for the fixes). None of these error or warn — `bun run check` stays green through all of them — so they only surface on visual review.

- **`md-sys-typescale-*` and `md-sys-color-*` are different kinds of classes.** The typescale ones (`md-sys-typescale-display-large`, etc., defined in `src/lib/styles/typescale.css`) are bare `@utility` classes that already bundle `text-*`/`leading-*`/`tracking-*` — apply them directly (`class="md-sys-typescale-body-medium"`). Prefixing one with `text-` (`text-md-sys-typescale-body-medium`) is not a real Tailwind utility and silently generates zero CSS. The color ones (`md-sys-color-on-surface`, etc.) are plain color tokens and DO need a prefix — `text-md-sys-color-on-surface`, `bg-md-sys-color-...`, `border-md-sys-color-...`, `outline-md-sys-color-...`.
- **A typo'd token class — a missing `md-`, `-sys-`, or `-color-` segment (`bg-sys-color-surface-variant`, `text-md-sys-on-primary-container`, `hover:text-sys-color-on-surface`) — compiles clean and generates zero CSS.** The element just silently falls back to inherited/browser-default styling. When auditing token usage, diff the suspicious class string against a sibling file already known to render correctly rather than trusting the name alone.
- **New Material Symbols icon name → add it to `.storybook/StorybookProviders.svelte`'s `extraIcons` list**, or that icon renders as literal ligature text (e.g. `calendar_today`) instead of a glyph in Storybook. The file has a maintained grep recipe in a comment above the list to regenerate it from every `name="..."`/`iconProps={{ name: ... }}` in the codebase — re-run it whenever a story or component introduces a new icon name, and sanity-check the output (the naive grep also picks up unrelated quoted strings like `aria-hidden="true"` — drop obvious junk before pasting it in).
- **A `tv()` slot can be fully defined in `theme.ts` and never actually render anything.** Declaring a slot only inside `variants`/`compoundVariants` classes (not in the base `slots: {}` map) still typechecks fine — but the real trap is a slot that's correctly computed and then never applied to any element in the `.svelte` file. `forms/tooltip/theme.ts`'s `textContainer` slot (per-`style` on-color classes for rich tooltips) existed with nothing in `Tooltip.svelte` ever rendering it, so primary/secondary/tertiary tooltips had no guaranteed-contrast text color. When adding or touching a slot, grep the component file to confirm it's destructured _and_ applied to a class list, not just declared in the theme.
- **`hidden md:X` needs an explicit display override at the breakpoint, not just a position/layout one.** `hidden` sets `display:none`; `md:absolute` only changes `position`, so the element stays `display:none` at any width unless something like `md:inline-flex`/`md:block` is added alongside it (see `typography/kbd/theme.ts`'s `position.absolute` variant).
- **`scripts/generate-components-index.ts` currently also exports `.stories.svelte` files** from every folder's barrel `index.ts` (e.g. `export { default as BadgeStories } from './Badge.stories.svelte'`). Re-running it regenerates every barrel with this bug, which would leak dev-only Storybook code into the published npm package. Until the script itself is fixed, don't blindly commit its output — diff it first and hand-patch just the barrel(s) you actually needed to change.

# Known Pitfall: Story Auto-Wrap Double-Instantiation

`@storybook/addon-svelte-csf`'s `<Story>` (v5 CSF factory API, what `defineMeta` gives you)
auto-wraps bare children in another instance of `defineMeta`'s `component` — literally
`<renderer.storyContext.component {...args}>{children}</renderer.storyContext.component>`
(see `Story.svelte` in the addon, the `isSnippet(children)` branch). So writing

```svelte
const { Story } = defineMeta({ component: Toolbar });
...
<Story name="Playground">
  <Toolbar>...</Toolbar>
</Story>
```

silently renders **two nested `Toolbar` instances** — your literal `<Toolbar>` gets wrapped
inside a second, invisible auto-instantiated one. `bun run check` stays green and it often
looks fine visually (harmless for stateless/presentational components), but for anything with
its own root element, ARIA role, or layout logic (a toolbar, a menu, a popover) it's a real bug
— doubled roles, doubled event handlers, or layout that only makes sense once, not nested in
itself. Caught this in `toolbar/Toolbar.svelte` where it manifested as a mysterious extra pill
wrapper around the `Playground`/`Vertical` stories.

Every `<Story>` whose body is bare markup (not wrapped in `{#snippet template(args)}`) needs
`asChild` on the `<Story>` tag to opt out of the auto-wrap and render that markup as-is — this
is already the convention throughout the rest of the library (grep `asChild` in any
`*.stories.svelte` for examples). Stories that _do_ use `{#snippet template(args)}` are safe
without `asChild` — the `template` snippet is checked first and skips the auto-wrap entirely.
When adding a new story, use one of these two patterns; never leave bare `<Component>` markup
under `<Story>` with neither.

# Design & UX Skill

Before creating or modifying a component, choosing a variant/color role, adding motion, or reviewing UI for M3 compliance, consult the `material-design` skill (`.claude/skills/material-design/SKILL.md`). It encodes this repo's token vocabulary (color roles, typescale, elevation, shape, motion durations/easings), the `tv()` variant-selection rules, and an M3 accessibility checklist — use it instead of re-deriving M3 mappings from general knowledge.

`.claude/skills/material-design/` is the single source of truth. `bun run build` (via `scripts/copy-skill.ts`) copies it into the gitignored `claude-skill/` directory, which is published to npm alongside `dist/`. Consumers of `@noxlovette/material` run `npx @noxlovette/material material-claude-skill` (add `--force` to overwrite) to install it into their own project's `.claude/skills/material-design`. Never edit `claude-skill/` directly — it's regenerated on every build.

# Dogfooding Rule for Showcase/Docs Pages

Every page under `src/routes/` (landing page, `docs/**`) MUST be built from `@noxlovette/material`
components — `Pane`/`PaneGrid` for layout, `Card`/`Title`/`Body`/etc. for content. Never hand-roll
a layout pattern (raw `flex`/`aside`/`sticky` divs) that the library already covers — if you catch
yourself reaching for one, that's a signal either a `Pane`/`PaneGrid` composition fits, or the
pattern is missing from the library and belongs there instead of one-off in a route file. The
library is the product; routes exist to prove it works.

## Pane + PaneGrid

`Pane` (`src/lib/components/containers/pane/`) is a single content region; `PaneGrid` lays out
however many `Pane`s you give it (`direction`/`gap`/`margin`/`padding`, each independently
responsive across `small`/`medium`/`large`/`extraLarge`, Tailwind's `md`/`lg`/`xl` breakpoints).
There is no separate "anchor mode" concept — a `Pane`'s own props cover what three previous
hardcoded components (`SinglePane`/`SplitPane`/`SupportingPane`, now removed) used to split across
different components and an `anchor` prop:

- **`width` + `resizable`** — a fixed-width pane with a user-draggable trailing edge. Add
  `persistKey` to persist the dragged width to `localStorage`.
- **`sticky`** — sticks to the top of its scroll container (native `position: sticky`) instead of
  scrolling with the page. Works inside any scrolling ancestor — the true page scroll, or a bounded
  box — so it replaces both of the old `anchor="viewport"` (fixed to the true browser edge, which
  broke once nested under an offset ancestor) and `anchor="sticky"` modes with one prop. Use this
  for a sidebar nested _inside other already-offset content_ — e.g. the docs secondary
  component-list nav, which lives inside the root layout's Rail-offset content column.
- **`visibleFrom` / `hiddenFrom`** — hide a pane below/from a given breakpoint, e.g. for
  list-detail layouts where only one pane shows on small viewports.

For a content-area + fixed-width side panel (e.g. a docs page's article + "On this page" TOC), use
a `PaneGrid` with `direction={{ small: 'column', large: 'row' }}` and give the side panel `width` +
`sticky` — that's the canonical M3
[supporting-pane layout](https://m3.material.io/foundations/layout/canonical-layouts/supporting-pane).
See `/docs/pane` for the full prop reference.

# Adding a New Component

0. Consult the `material-design` skill for variant/color-role/motion choices before writing `theme.ts`
1. Create `src/lib/components/<category>/<ComponentName>.svelte` and a `types.ts`
2. Define styles in `theme.ts` using `tv()` with `slots`
3. Add the export to the category's `index.ts`
4. Run the codegen to regenerate barrel exports:
   ```bash
   bun scripts/generate-components-index.ts
   ```
   **Diff the output before committing** — see "Known Pitfalls" above, the script currently also exports `.stories.svelte` files from every barrel, not just the one you touched.
5. Add `<ComponentName>.stories.svelte` next to the component (Svelte-CSF via `@storybook/addon-svelte-csf`'s `defineMeta`/`Story`) — this is the live preview, not a showcase route. New icon names used in the story need to go in `.storybook/StorybookProviders.svelte`'s `extraIcons` too (see "Known Pitfalls").
6. Add a docs page under `src/routes/docs/<component>/+page.svelte` for prose/usage guidance (only if the component needs more explanation than Storybook's autodocs gives)

# Verifying a Component Change in the Browser

`bun run check` only catches type errors — it won't catch a handle rendering off-screen, a
clipped overlay, or a variant class that never actually gets applied (see "Known Pitfalls"
above). After changing anything with a visual or interactive surface, actually look at it in
Storybook before calling the change done:

1. Start Storybook in the background: `(bun run storybook > /tmp/storybook.log 2>&1 &)`, then
   poll `/tmp/storybook.log` for `Storybook ready!` (or the `Local:` URL) before opening it —
   the first boot takes a few seconds.
2. Open the story directly at `http://localhost:6006/iframe.html?id=<story-id>&viewMode=story`
   (kebab-case `<title>--<name>`, e.g. `containers-pane-grid--resizable-split`) rather than the
   `?path=/story/...` manager URL — it skips the manager chrome/sidebar so a screenshot shows
   only the story itself.
3. Screenshot, and `zoom` into the specific region you changed — don't trust a full-page
   screenshot alone to catch a few-pixel clipping or alignment issue.
4. For anything gesture-driven (drag, hover, snap points, transitions) a single screenshot can't
   catch the mid-gesture state. Use `javascript_tool` to either (a) read
   `getBoundingClientRect()`/`getComputedStyle()` on the element to confirm computed values
   ground-truth rather than eyeballing pixels, or (b) dispatch synthetic `PointerEvent`s
   (`pointerdown`/`pointermove` without a matching `pointerup`) to freeze the interaction in a
   specific state, then screenshot or inspect it.
5. When done, close the tab and stop the dev server (`pkill -f "storybook dev"`) — don't leave
   it running across turns.

This is also the fastest way to catch a demo/story bug that isn't the component's fault — e.g. a
story wrapping `<PaneGrid full>` in a fixed-height `overflow-hidden` box, which clips anything
that stretches to `min-h-dvh` inside it.

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
