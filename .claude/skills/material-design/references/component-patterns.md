# Component patterns

## The `tv()` shape

Every component's styles live in the category's `theme.ts`, built with `tv()`. Import it from `$lib/utils/tv.js`, not `tailwind-variants`: that instance teaches tailwind-merge the library's own class groups, so a caller's `z-40` replaces a `z-layer-*` and `size-[18px]`/`p-4` replaces `size-spacing-250`/`p-spacing-200` instead of both shipping. For a class list built outside `tv()`, use the `twMerge` exported from the same file.

- `slots` — one key per rendered element (`base`, `icon`, `label`, ...) so multi-element components can vary each part independently
- `variants` — one axis per meaningful design decision (`variant`, `color`, `size`, `shape`, `selected`, ...); each value maps to either a class string (single-slot components) or an object keyed by slot (multi-slot components)
- `compoundVariants` — combinations that need a class not expressible as a union of independent axes (almost everything about color composition lives here, since `variant` × `color` isn't a clean cross-product of independent classes)

Worked example: `src/lib/components/buttons/theme.ts`. The `button` export has slots `base`/`icon`; variants `variant` (elevated/filled/tonal/outlined/text/bare), `color` (default/primary/secondary/tertiary/error), `usage` (selection/default), `size` (xs/sm/md/lg/xl), `shape` (round/square), `selected` (true/false); and ~25 `compoundVariants` entries, one per `variant`×`color` pair, each pointing at the pre-built `md-component-button-*` class from `component.css`. Match this structure exactly for new component families — don't hand-roll `clsx` strings or inline conditional classes.

When adding a `size` axis, follow the existing scale's _shape_, not just its numbers: each size variant sets height, gap, padding, typescale, and (for shape-driving components) the shape CSS vars together, in one slot-scoped string — not spread across multiple variant axes that a consumer could combine incorrectly.

## Variant selection tree

Ask, in order:

1. **Is this the single highest-priority action on the screen/section?** → `filled`, `color: primary` (or `error` if destructive).
2. **Is it a secondary but still prominent action, or a persistent selected/toggled state?** → `tonal`.
3. **Does it need a visible boundary but shouldn't compete visually with a filled sibling?** → `outlined`.
4. **Is it a low-emphasis, often-repeated action** (list rows, inline links, dialog dismiss)? → `text`.
5. **Does it need to visually float above a surface that's already tonal/colored** (a FAB over a colored app bar, a card menu trigger)? → `elevated`.

Only fall back to `bare` (no color/background at all) when the component supplies its own coloring downstream (e.g. an icon button whose color comes from a parent's `selected` state).

## Reuse before you build

- **State layer / ripple** — wrap the interactive element with `Layer.svelte` (`src/lib/utils/Layer.svelte`) rather than writing hover/press opacity by hand. It listens for `.m3-layer` on its parent, already respects `prefers-reduced-motion` for the ripple, and its tint (hover 0.08, focus and pressed 0.10) matches the M3 state-layer tokens — don't retune those numbers per component.
- **Icons** — always `Icon.svelte`, never a raw `<span class="material-symbols-...">` or an inline SVG for a Material Symbol.
  - `name` is typed (`MaterialSymbolName`), so a typo is a type error. A `string[]` of names needs `as const` or `satisfies MaterialSymbolName[]`.
  - Show state with `fill` (0 → 1 on the selected item; it animates), not a weight change.
  - `size="inline"` for a symbol set in running text. `grad` defaults to `'auto'` (-25 on dark schemes).
  - When a control's icon swaps between two states (menu ↔ menu_open, add ↔ close, play ↔ pause), pass `transition: 'rotate'` (a toggle) or `'fade'`. Otherwise the glyph jumps. See motion-guide.md → "Icon swaps".
- **Dragging** — the `drag()` attachment (`$lib/attachments`), never hand-rolled pointer events. It handles pointer capture (and recapture when the node moves in the DOM), a start `threshold`, a touch long-press `touchDelay` so swipes still scroll, the release velocity, and swallowing the click after a drag. Pair it with `resist()` for rubber-banding at the bounds and a Motion spring on release that takes the velocity. `DraggablePane` and `ChipGroup` are built on it.
- **Sets of chips** — `ChipGroup` (8dp gaps, wrapping; `reorderable` adds drag and Alt+Arrow reordering with the M3 dragged state), not a flex row of `Chip`s. An input chip is two buttons (its action, and a remove button with a `removeLabel`) and removes on Backspace/Delete; a filter chip takes `trailingIconProps` (e.g. a dropdown arrow).
- **Lists** — `List`'s `variant` depends on what's behind it. `standard` items are `surface` and assume a `surface` backdrop (a `surface` pane). On the `surface-container` window (a sidebar nav on a backgroundless pane), use `segmented`: its segments take the window's tone, so only the selected pill and hover tint show. A standard list there renders as notched white slabs. The selected fill is its own element (`selection` slot), not the item's background, so it can travel between items; keep it that way when restyling selection.
- **Dividers** — `Divider.svelte`, not Bits UI's `Separator` (per project CLAUDE.md — it already implements the same primitive).
- **Focus ring** — the `md-sys-state-focus-indicator` utility, not a custom `:focus` style.
- **Disabled state** — `.md-component-button-base`'s disabled handling (via `disabled:`/`aria-disabled`/`data-disabled` selectors in `component.css`), not a manually-toggled opacity class.

## Laying out a showcase or docs page (`src/routes/**`)

Routes are not a blank canvas either — every page-level layout shape is built from the two
`containers/pane` primitives, `Pane` and `PaneGrid`. Reach for these instead of a hand-rolled
`flex`/`aside`/`sticky` div, and if a shape genuinely doesn't fit, that's a sign the pattern belongs
in the library, not in a one-off route file:

| Shape you need                                                  | Component                                                                            | Notes                                                                                                                                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Centered/full-width single column                               | `Pane` (standalone, no `PaneGrid`)                                                   | `centered` variant for max-width, `padding`/`gap` for spacing                                                                                                             |
| User-resizable two-column split                                 | `PaneGrid` + `Pane width={...} resizable`                                            | The resizable `Pane` owns its own drag handle and width state; add `persistKey` for `localStorage` persistence                                                            |
| Static sidebar that stays visible while its sibling scrolls     | `PaneGrid` + `Pane width={...} sticky`                                               | Native `position: sticky` — works inside any scrolling ancestor (the true page scroll or a bounded box), so this one prop covers what used to be two anchor modes         |
| Main content + fixed-width side panel (TOC, filters, details)   | `PaneGrid direction={{ small: 'column', large: 'row' }}` + a `width`+`sticky` `Pane` | Stacks on small viewports, moves to a row from `large` up — the M3 [supporting-pane](https://m3.material.io/foundations/layout/canonical-layouts/supporting-pane) pattern |
| List-detail, or any pane that should only show at certain sizes | `Pane visibleFrom="medium"` / `hiddenFrom="medium"`                                  | Toggles CSS display only, per Tailwind-aligned breakpoint (`small`/`medium`/`large`/`extraLarge` → unprefixed/`md:`/`lg:`/`xl:`)                                          |
| Floating panel the user repositions (inspector, tool palette)   | `DraggablePane`                                                                      | Not a `PaneGrid` child — `position: fixed`, dragged by its header via `x`/`y` (bindable); `bounds`/`boundsPadding` clamp the drag, `persistKey` persists position         |

See `/docs/pane` in the showcase site for the full prop reference and worked examples.

### Surfaces: window vs panes

`App` paints the window `surface-container`; content lives in `surface` panes (`Pane`'s default `background`, rounded top corners). Navigation belongs to the window, not a pane: the `Rail` (on `surface-container`, the spec's optional role), a `Navbar`, a guides-style nav list on a `background={false}` pane. So keep the content `Pane` at its default background, and don't separate a nav column from the content with a border: the colour change does it.

### Page ends and overscroll

- **End space:** a `full` Pane (the default, a page that scrolls with the window) ends its content 72dp above its bottom edge, whatever its `padding` preset (not with `padding="none"`). That's a 56dp FAB plus its 16dp margin, so the last line scrolls clear of a FAB and doesn't finish flush against the window. Don't add bottom padding by hand on top of it.
- **Overscroll:** a page with an `App` doesn't bounce or pull-to-refresh (`overscroll-behavior: none` on `:root:has(.md-app)`, base layer), and its canvas is `surface-container`. An app that wants pull-to-refresh sets `html { overscroll-behavior: auto }`.
- **Pane basis follows the grid:** inside a `PaneGrid`, a Pane's `flex-basis` is its width in a row and `auto` in a column (each direction tier restates it), so stacked panes take their content height. Don't set `basis-*` on a Pane yourself.

### Clearing the rail

A viewport-anchored `Rail` publishes `--md-rail-inset` on `<html>`: 0 below `md`, the collapsed 96dp on medium windows (the expanded rail is modal there and overlays), and its live width from `lg` (it pushes content, in step with its spring). `App`'s shell pads by it and `AppBar` starts at it. Never add `md:ml-24` or similar to a page, a `PaneGrid` or an app bar. A custom shell uses `ps-(--md-rail-inset)`; another fixed surface spanning the window uses `left-(--md-rail-inset)`. A rail with `anchor="parent"` renders a spacer beside itself instead, so it and its content go in a flex row.

## Before exporting a new component

Follow CLAUDE.md's "Adding a New Component" steps as the mechanical checklist (create `.svelte` + `types.ts`, define `theme.ts` with `tv()`, export from the category `index.ts`, run `bun scripts/generate-components-index.ts`, add a showcase route and a docs page) — this skill governs the _design_ decisions (which variant/color/motion) that should be made before or while writing that `theme.ts`, not the export mechanics themselves.
