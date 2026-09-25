# Core

Base your docs and stylistic decisions on this https://m3.material.io/

**Package name**: `@noxlovette/material` (as in `package.json`) — use it everywhere.

# Commands

```bash
bun run dev              # showcase site: landing page + guides (SvelteKit, static adapter → GitHub Pages)
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
src/routes/        # showcase site only — not published. Landing page + cross-cutting guides.
                    # NOT a component reference: that is Storybook (autodocs + <Component>.mdx).
                    # No per-component route pages.
  guides/          # Get started, Theming, Tokens, Responsive props, Layout, Icons (playground), Motion, Claude skill.
                    # nav.ts lists them; +layout.svelte is a PaneGrid with a sticky List nav Pane;
                    # GuidePage.svelte is content + a sticky "On this page" Pane. See "Dogfooding
                    # rule" below — do not hand-roll this layout with raw flex/aside divs.
.storybook/        # isolated Storybook config — has its own vite.config.ts, NOT the root one
                    # (svelte-vite hard-errors if it detects SvelteKit's plugins)
dist/              # build output, do not edit
scripts/           # generate-components-index.ts — regenerates barrel index.ts files
bin/               # material-claude-skill.js — the npx installer for the published Claude skill
```

In production, Storybook is built into `build/storybook/` alongside the SvelteKit static site and
served from the same GitHub Pages deployment (see `.github/workflows/gh-pages.yaml`) — one artifact,
two surfaces, so the "Storybook" nav link resolves correctly in both dev and prod.

# Key Patterns

- **Tailwind v4** via `@tailwindcss/vite` — no `tailwind.config.js`, use CSS-first config
- **Utility types**: prefer types from `utils/types.ts` (`AnchorButtonAttributes`, `SizeType`, `DivAttrs`, etc.)
- **Theme import**: consumers use `@noxlovette/material/styles` for base CSS and `@noxlovette/material/theme/light` etc.
- **New components**: export from the category `index.ts` and re-export in `src/lib/components/index.ts`
- **Spacing: M3 tokens only in library code.** `src/lib/styles/spacing.css` registers `md.sys.measurement.space<N>` as `*-spacing-<N>` (`p-spacing-200` = 16dp, `gap-spacing-50` = 4dp; N is M3's number, not Tailwind's multiplier). Library components, stories, MDX and guides use these, never Tailwind's numeric scale (`p-4`), which stays available only for consumers. Off-grid component dimensions are pending named component tokens (issue #30); don't add new numeric or arbitrary sizes, and don't "snap" existing spec dimensions to the nearest spacing token.
- **Type scale** (`src/lib/styles/typescale.css`) is generated from the M3 token DB: 15 baseline + 15 emphasized styles (`md-sys-typescale-emphasized-*`), rem units, line heights per language height (`lang`). Selected/active/unread states use the emphasized style, never `font-bold` on a baseline one.
- **`tailwind-variants` (tv)**: every component's styles are defined with `tv()` from `tailwind-variants`, using named `slots` for multi-element components and `variants`/`compoundVariants` for state logic. Match this pattern for all new components — do not use plain `clsx` strings for component internals.
  Import `tv` from `$lib/utils/tv.js`, not `tailwind-variants`: the local instance teaches tailwind-merge the library's custom class groups (`z-layer-*`), so a consumer's `class="z-40"` replaces a layer instead of both classes shipping.
- **Stacking: named layers only.** `src/lib/styles/layers.css` defines `z-layer-{bar,rail,sheet,fab,pane,modal,snackbar,popup}` (lowest first) with the order and rationale in its header comment. Any fixed, sticky or portaled surface takes one of these, never a raw `z-40`/`z-[100]`. A bits-ui floating content element needs its layer on the element receiving `props`: bits copies that element's computed z-index onto its wrapper, and without one the popup renders under the Rail. Plain `z-10`/`z-20` is fine only for stacking within one component. Adding a layer means updating both `layers.css` and `LAYERS` in `utils/tv.ts`.

# Responsive Props (IMPORTANT)

Any prop whose right value depends on the window size takes `Responsive<T>`
(`src/lib/components/containers/pane/theme.ts`): one value, or one per M3 window tier:
`{ small, medium, large, extraLarge }`, which map to base/`md:`/`lg:`/`xl:`. `PaneGrid`'s
`direction`/`gap`/`padding`/`margin` and `AppBar`'s `size` use it.

- **Defaults are responsive.** When a component supports `Responsive<T>`, its default follows M3's
  window-size-class guidance, not a single value. For example, the search view layout defaults to
  `{ small: 'fullScreen', medium: 'docked' }`. `PaneGrid`'s `direction` defaults to
  `{ small: 'column', large: 'row' }` (canonical layouts: one pane until the expanded class), so
  a split that must stay side by side at every width passes `direction="row"` explicitly. A static default is acceptable only where M3 gives
  no per-window guidance, and then the prop's JSDoc says so.
- **Resolve responsive values in CSS, never JS.** Write every class as a literal in a per-breakpoint
  lookup table (see `responsiveTables`/`resolveResponsive`, `appbarSize`) so Tailwind's scanner
  sees it and SSR renders the right variant with no `matchMedia` and no flash. If a variant
  changes structure, use one markup and move elements with grid/flex classes per breakpoint
  (`AppBar` puts its title in a grid cell or a full-width row), not `{#if}` branches.
- **Each tier restates every property it changes.** `md:` classes only override what they name.
  So if the small tier sets `pt-0 line-clamp-1`, the medium tier must set its own `md:pt-*`
  and `md:line-clamp-*`. Otherwise small's values leak upward.
- **Missing tiers inherit upward.** A value given at a lower tier carries to the larger tiers
  until another tier overrides it, as with Tailwind prefixes.

# Known Pitfalls: Tokens, Icons, tv() Slots

Found while auditing typescale usage across every component (see git history for the fixes). None of these error or warn — `bun run check` stays green through all of them — so they only surface on visual review.

- **`md-sys-typescale-*` and `md-sys-color-*` are different kinds of classes.** The typescale ones (`md-sys-typescale-display-large`, etc., defined in `src/lib/styles/typescale.css`) are bare `@utility` classes that already bundle `text-*`/`leading-*`/`tracking-*` — apply them directly (`class="md-sys-typescale-body-medium"`). Prefixing one with `text-` (`text-md-sys-typescale-body-medium`) is not a real Tailwind utility and silently generates zero CSS. The color ones (`md-sys-color-on-surface`, etc.) are plain color tokens and DO need a prefix — `text-md-sys-color-on-surface`, `bg-md-sys-color-...`, `border-md-sys-color-...`, `outline-md-sys-color-...`.
- **A typo'd token class — a missing `md-`, `-sys-`, or `-color-` segment (`bg-sys-color-surface-variant`, `text-md-sys-on-primary-container`, `hover:text-sys-color-on-surface`) — compiles clean and generates zero CSS.** The element just silently falls back to inherited/browser-default styling. When auditing token usage, diff the suspicious class string against a sibling file already known to render correctly rather than trusting the name alone.
- **New Material Symbols icon name → add it to `.storybook/StorybookProviders.svelte`'s `extraIcons` list**, or that icon renders as literal ligature text (e.g. `calendar_today`) instead of a glyph in Storybook. The file has a maintained grep recipe in a comment above the list to regenerate it from every `name="..."`/`iconProps={{ name: ... }}` in the codebase — re-run it whenever a story or component introduces a new icon name, and sanity-check the output (the naive grep also picks up unrelated quoted strings like `aria-hidden="true"` — drop obvious junk before pasting it in).
- **Icon names are typed.** `IconProps['name']` is `MaterialSymbolName`, a generated union of every ligature the Material Symbols font renders (deprecated aliases like `smartphone` included), so a typo is a type error. A `string` array of names needs `as const` or `satisfies MaterialSymbolName[]`. `bun scripts/generate-icon-catalog.ts` regenerates both `utils/icon/icon-names.ts` (from the font's `.codepoints` file) and the Icons guide's playground list `src/routes/guides/icons/catalog.json` (from Google's metadata, canonical names only). Never edit either by hand.
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

# Dogfooding Rule for Showcase/Guide Pages

Every page under `src/routes/` (landing page, `guides/**`) MUST be built from `@noxlovette/material`
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
  for a sidebar nested _inside other already-offset content_ — e.g. the guides nav, which lives inside the root layout's Rail-offset content column.
- **`visibleFrom` / `hiddenFrom`** — hide a pane below/from a given breakpoint, e.g. for
  list-detail layouts where only one pane shows on small viewports.

For a content-area + fixed-width side panel (e.g. a guide's article + "On this page" TOC), use
a `PaneGrid` with `direction={{ small: 'column', large: 'row' }}` and give the side panel `width` +
`sticky` — that's the canonical M3
[supporting-pane layout](https://m3.material.io/foundations/layout/canonical-layouts/supporting-pane).
See the Layout guide (`/guides/layout`) and Storybook → Containers/Pane Grid for the full reference.

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
6. Document it in Storybook, never in `src/routes/` (no per-component route pages). Write the prop docs as JSDoc in `types.ts` — that is the
   props table. Then either:
   - add `tags: ['autodocs']` to `defineMeta` when the props table says everything, or
   - add `<ComponentName>.mdx` next to the stories when there are rules the table can't carry
     (when to use which variant, content rules, accessibility, spec deviations). Attach it with
     `<Meta of={Stories} />` and include `<Controls />`/`<ArgTypes />` so the props table stays.
     **Don't also tag that CSF file `autodocs`**: Storybook refuses to index a component with
     both ("You created a component docs page … but also tagged the CSF file with 'autodocs'").
     Examples: `ListItem.mdx`, `Carousel.mdx`, `BottomSheet.mdx`, `SideSheet.mdx`.
     A story whose open state covers the page (a fixed-position sheet, say) needs
     `parameters={{ docs: { story: { inline: false, height: '…' } } }}` so the docs page renders it
     in its own iframe.

# Storybook Docs Notes

- `.storybook/preview.ts` has a **Scheme** toolbar (light/dark). It toggles the `dark` class on `<html>` for stories and docs (the docs container follows it through the channel), and `preview.css` paints canvases with `surface`. Don't hard-code light backgrounds in stories.
- MDX is compiled with `remark-gfm` (`.storybook/main.ts`), so Markdown tables render.
- `defineMeta` must live in `<script module>`; in the instance script the CSF file silently fails to index and any MDX `of={}` pointing at it breaks the build.
- The five typography components share one unattached `typography/Typography.mdx` (`<Meta title=…>`), so their CSF files keep `autodocs`.

# Verifying a Component Change in the Browser

**Do not use Claude in Chrome (the `mcp__claude-in-chrome__*` tools) in this package unless the
user explicitly asks for it in that conversation.** Visual and interaction checks are the
human's job here. An agent's own green `bun run check` / `bun run test` is not the same as
"verified", so say plainly what still needs a look.

`bun run check` only catches type errors — it won't catch a handle rendering off-screen, a
clipped overlay, or a variant class that never actually gets applied (see "Known Pitfalls"
above). After changing anything with a visual or interactive surface:

1. Cover what can be tested without a browser: `tv()` output, logic, and DOM structure in jsdom
   (`// @vitest-environment jsdom`, see `chips/Chip.svelte.test.ts`; stub `window.matchMedia`,
   which jsdom lacks and `Layer` calls).
2. Hand the rest to the user as a short checklist: the story to open, as a direct
   `http://localhost:6006/iframe.html?id=<story-id>&viewMode=story` link (kebab-case
   `<title>--<name>`, e.g. `containers-pane-grid--resizable-split`), and exactly what to look
   at or do (which state, which gesture, what the spec value is). Offer to start Storybook for
   them: `(bun run storybook > /tmp/storybook.log 2>&1 &)`, then wait for `Local:` in the log.
3. Stop any server you started when done (`pkill -f "storybook dev"`).

Typical demo bugs worth pointing the user at: a story wrapping `<PaneGrid full>` in a
fixed-height `overflow-hidden` box, which clips anything that stretches to `min-h-dvh` inside it.

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

- **M3 Expressive springs only** (`springTokens` in `spring.ts`). No hand-picked `ms` durations or `ease-*` curves anywhere — JS or CSS.
- **No Svelte transitions** (`in:`/`out:`/`transition:`/`animate:`). Mount/unmount → `presence`/`Presence` attachments on Motion's `animate()`; navigation → `containerTransform`/`sharedAxis`/`lateral`/`fadeThrough` on Motion's `animateView()`. Colour and opacity for hover/press/selected state stay CSS transitions using the `md-sys-motion-*` effects utilities from `motion.css`, but anything spatial (shape, corners, size, position, rotation) runs on Motion springs, never a CSS transition: a CSS transition reverses mid-flight on a shortened, near-linear curve and loses its spring on a quick tap. Button shapes use `components/buttons/shapeMorph.ts`.
- **bits-ui content**: drop `forceMount` and the `{#if open}` wrapper, attach `presence(() => open, enterExit.x)` to the element receiving `props` — bits-ui's presence layer waits for its WAAPI exit animation before unmounting.
- **Choosing and applying a transition** follows M3's [Applying transitions](https://m3.material.io/styles/motion/transitions/applying-transitions), summarized in `motion-guide.md` → "Applying transitions". Pick the pattern from how the two states relate, and never use lateral or enter/exit for hierarchical navigation, or lateral for navbar/rail destinations. Fade out fully before fading in. Sheets slide without fading. Don't use bouncy springs on navigation transitions. Use skeletons, not layout shift. Under reduced motion, transitions become fades, not jump cuts.
- **Which components must use which of the six M3 transition patterns** (enter/exit, lateral, container transform, forward/backward, top level, skeleton): the ownership table in `motion-guide.md` → "Which components must use which pattern". Keep it in sync when a component gains or loses one.
- Full rules: `.claude/skills/material-design/references/motion-guide.md`. Live demos: Storybook → Motion/Transition patterns.

---

Cypress skills have been installed with GitHub CLI
