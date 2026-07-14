# Motion guide

Source: `src/lib/animation/` (barrel-exported via `src/lib/animation/index.ts`) + duration/easing tokens in `src/lib/styles/motion.css`. M3 motion principle to apply: motion should be **spatial** (things visibly move/resize/morph) when the UI's structure is changing, and **standard/non-spatial** (opacity/color only) when it's a simple state change — spatial motion on a small state change reads as sluggish; standard easing on a big layout change reads as a jump-cut.

## Picking a primitive

| Situation                                                                                                | Primitive              | Notes                                                                                                                                                                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A surface expands into another (card → dialog, thumbnail → detail view, FAB → sheet)                     | `containerTransform`   | Crossfades + morphs bounds/radius/color between the two elements sharing a `key`. Needs two DOM nodes in a Svelte `{#key}`/list-transition context, not a single toggled element.                                                                                                      |
| Stepped/sequential navigation (wizard steps, tabs, paginated content)                                    | `sharedAxisTransition` | Pick `direction: 'X'` for horizontal steps, `'Y'` for vertical, `'Z'` for depth (e.g. modal-like overlays that don't share geometry). Set `rightSeam`/`leaving` per the doc-comment in `sharedAxisTransition.ts` — getting the boolean backwards makes both directions look identical. |
| Simple show/hide with no structural relationship between what's leaving and entering                     | `enterExit`            | `mode` options: `fade` (default), `scale`, `slide-up`, `dialog`, `dialog-m3`. Use `dialog-m3` for actual M3 dialogs/sheets (scale-only, no vertical translate) — `dialog`/`slide-up` are for non-M3-spec popovers/toasts.                                                              |
| A list item needs a CSS hook while it's animating out (e.g. to suppress hover/press styles during outro) | `outroClass`           | Svelte action; adds/removes a `leaving` class on `outrostart`/`outroend`.                                                                                                                                                                                                              |

All three transition functions default their `easing` to `easeEmphasized` (from `easing.ts`) already — only override `easing`/`duration` when the default doesn't fit, and when you do, pull from the named exports (`easeEmphasized`, `easeEmphasizedAccel`, `easeEmphasizedDecel`, `easeStandard`, `easeStandardAccel`, `easeStandardDecel`), not a raw `cubic-bezier(...)`.

## Picking a duration when hand-rolling CSS transitions

For anything not going through the animation module (e.g. a plain CSS `transition` on `theme.ts`-driven classes), use the `--md-sys-motion-easing*` custom properties from `motion.css` directly, chosen by what's animating:

- **Standard** (`easing` 200ms / `easing-fast` 150ms / `easing-slow` 300ms) — color, opacity, elevation, focus ring: small/local, non-spatial changes. `.state-layer` and `.text-link` already use these.
- **Expressive/spatial** (`easing-fast-spatial` 350ms / `easing-spatial` 500ms / `easing-slow-spatial` 650ms) — anything that changes position, size, or shape. Bigger/farther-traveling elements get the slower tier; small in-place morphs (like the button's press-radius morph in `.md-btn-morph`) use a fast, hand-tuned duration instead of these tiers because they're driven by direct user press feedback, not a triggered transition.

## Reduced motion

`Layer.svelte`'s ripple already checks `prefers-reduced-motion` and no-ops. The `containerTransform`/`sharedAxisTransition`/`enterExit` functions do **not** self-guard — if you use them for a transition that isn't purely decorative (i.e. skipping it would leave the UI in a confusing state), that's fine as-is, but for a purely decorative flourish, gate it on `prefers-reduced-motion` at the call site rather than assuming the animation module handles it for you.
