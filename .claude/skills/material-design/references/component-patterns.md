# Component patterns

## The `tv()` shape

Every component's styles live in the category's `theme.ts`, built with `tv()` from `tailwind-variants`:

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

- **State layer / ripple** — wrap the interactive element with `Layer.svelte` (`src/lib/utils/Layer.svelte`) rather than writing hover/press opacity by hand. It listens for `.m3-layer` on its parent, already respects `prefers-reduced-motion` for the ripple, and its tint intensity (hover 0.08 / pressed·focus 0.12) matches the M3 state-layer spec — don't retune those numbers per component.
- **Icons** — always `Icon.svelte` (`name`, `fill`, `wght`, `size` props), never a raw `<span class="material-symbols-...">` or an inline SVG for a Material Symbol.
- **Dividers** — `Divider.svelte`, not Bits UI's `Separator` (per project CLAUDE.md — it already implements the same primitive).
- **Focus ring** — the `md-sys-state-focus-indicator` utility, not a custom `:focus` style.
- **Disabled state** — `.md-component-button-base`'s disabled handling (via `disabled:`/`aria-disabled`/`data-disabled` selectors in `component.css`), not a manually-toggled opacity class.

## Before exporting a new component

Follow CLAUDE.md's "Adding a New Component" steps as the mechanical checklist (create `.svelte` + `types.ts`, define `theme.ts` with `tv()`, export from the category `index.ts`, run `bun scripts/generate-components-index.ts`, add a showcase route and a docs page) — this skill governs the _design_ decisions (which variant/color/motion) that should be made before or while writing that `theme.ts`, not the export mechanics themselves.
