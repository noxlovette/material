---
background: false
description: Grounds UI/UX decisions in Material Design 3 (m3.material.io) and this repo's actual token/component system when creating or editing components in src/lib/components/, choosing a color role/variant/emphasis level, adding a transition or animation, laying out a showcase or docs page, or reviewing existing UI for M3 compliance. Does NOT apply to pure logic/state changes with no visual surface. For Cypress test authoring use cypress-author/cypress-explain/cypress-docs instead.
model: inherit
name: material-design
---

# Material Design 3 for @noxlovette/material

## Purpose

This repo is a single, already-opinionated M3 component library, not a blank canvas. Every visual decision (color, type, elevation, shape, motion) already has a token or utility class for it. The job here is never "invent a look" — it's "find the right existing primitive and apply it correctly." This skill encodes that mapping so you don't re-derive M3 from general knowledge or, worse, hardcode a hex/px/ms value that already has a token.

## When to use

- Creating or editing a component under `src/lib/components/`
- Deciding which variant (filled/tonal/outlined/text/elevated) or color role (primary/secondary/tertiary/error) fits a given action or emphasis level
- Adding a transition, page transition, or list/expand animation
- Building a showcase route or docs page for a component
- Reviewing UI for M3 correctness (contrast, touch targets, focus, motion)

**Skip this skill** for changes with no visual surface (pure logic, data layer, config), and for Cypress test work (use the `cypress-*` skills instead).

## Reasoning flow

1. **Map the ask to a category.** This repo groups components by M3 concept, not by page: `buttons/`, `forms/` (textfield, select, checkbox, switch, slider, radio-group, search, command, pin, tooltip), `containers/` (dialogue, side-sheet, bottom-sheet, popover, menu, list, panes, stack, scroll-area), `nav/` (appbar, navbar, rail, tabs), `cards/`, `badge/`, `pill/`, `snackbar/`, `progress/`, `table/`, `date/`, `time/`, `typography/`. Check the target category's existing `theme.ts` before writing a new one — the pattern you need probably already exists one file over.

2. **Pick emphasis → variant + color role.** See the decision table below and `references/component-patterns.md` for the full reasoning and a worked example (`buttons/theme.ts`).

3. **Only use existing tokens.** Never hardcode a color, shadow, radius, or duration — every one of those has a utility class already. Full inventory in `references/tokens-and-styles.md`.

4. **Pick a motion primitive** from `src/lib/animation/` and a duration/easing pair from `motion.css`. Decision rules in `references/motion-guide.md`.

5. **Run the pre-delivery checklist** in `references/accessibility-checklist.md` before calling the work done.

## Color-role decision table

| Emphasis                                                    | Variant    | Color role                             | Example use                                   |
| ----------------------------------------------------------- | ---------- | -------------------------------------- | --------------------------------------------- |
| Highest — one primary action per screen                     | `filled`   | `primary` (or `error` for destructive) | "Save", "Submit", "Delete account"            |
| High but not _the_ action                                   | `filled`   | `secondary` / `tertiary`               | secondary CTA next to a filled-primary        |
| Medium, wants to look "chosen"/selected                     | `tonal`    | matches the concept's color            | selected chip, toggle-on state, secondary FAB |
| Medium, needs a visible boundary but low fill               | `outlined` | `primary`/matches concept              | "Cancel" next to a filled "Confirm"           |
| Low, inline/repeated actions                                | `text`     | `primary` (default)                    | list-item trailing action, dialog "Cancel"    |
| Needs to visually separate from a colored surface behind it | `elevated` | matches concept                        | FAB or card floating over a tonal surface     |

`color: default` in this codebase's `tv()` variants resolves to the same classes as `primary` — pass `primary` explicitly when in doubt.

## Quick reference

- Color tokens: `md-sys-color-{primary,secondary,tertiary,error}`, each with a `-container` tonal pair and `on-*` text/icon pair (guarantees AA contrast by construction).
- Type: `md-sys-typescale-{display,headline,title,body,label}-{large,medium,small}`.
- Elevation: `shadow-elevation-{0..5}`.
- Shape: `radius-{none,xs,sm,md,lg,xl,full}` (buttons instead drive shape via the `--btn-shape`/`--btn-pressed-shape` CSS vars in `.md-btn-morph`).
- Motion durations/easings: `--md-sys-motion-duration{,-fast,-slow}` (standard, non-spatial) and `-fast-spatial/-spatial/-slow-spatial` (expressive, for things that move/resize), plus the M3 emphasized easing curve.
- Shared primitives: wrap interactive surfaces with `Layer.svelte` (state layer + ripple, already skips itself under `prefers-reduced-motion`), render icons with `Icon.svelte`, use `Divider.svelte` instead of Bits UI's `Separator`.

## References

- [`references/tokens-and-styles.md`](references/tokens-and-styles.md) — full token/utility inventory
- [`references/component-patterns.md`](references/component-patterns.md) — `tv()` slots/variants/compoundVariants pattern + variant decision tree
- [`references/motion-guide.md`](references/motion-guide.md) — which animation primitive and timing pair to reach for
- [`references/accessibility-checklist.md`](references/accessibility-checklist.md) — pre-delivery checklist
