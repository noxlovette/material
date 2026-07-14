# Pre-delivery checklist

Run through this before calling a component/UI change done.

## Contrast

- Text/icon color on a colored surface should always be the matching `on-*` token (`on-primary` on `primary`, `on-primary-container` on `primary-container`, etc.), never a manually chosen color — the `on-*` tokens are generated to meet contrast requirements per theme (including the `-hc`/`-mc` high/medium-contrast variants). A manual override bypasses that guarantee.
- If a design calls for a color combination with no existing `on-*` pair, that's a sign it doesn't map to an M3 role cleanly — reconsider the role choice before improvising a color.

## Touch targets

- Interactive elements should hit the M3 minimum 48dp target. The existing `size` scales already encode this (e.g. button `sm`/`md` = `h-10`/`h-14`); when adding a new interactive size below that, either pad the hit area (see `.text-link`'s `min-height: 44px` + padding trick) or confirm it's genuinely dense-UI/desktop-only and document why.

## Focus

- Anything focusable needs a visible focus state — use `md-sys-state-focus-indicator`, don't rely on the browser default or remove `outline` without replacing it.
- Verify keyboard operability, not just click handlers — Bits UI primitives (dialogs, menus, selects) handle this by default; if you're building something interactive from scratch, check it against Bits UI's docs (https://bits-ui.com/llms.txt) for the expected keyboard model first.

## Motion

- `prefers-reduced-motion`: decorative-only motion should be gated (see `references/motion-guide.md`); motion that carries meaning (e.g. confirming a drag-drop) can stay.
- Don't introduce a new hand-tuned duration/easing when an existing token fits — inconsistent timing across components is one of the more noticeable ways an M3 implementation starts to feel "off."

## Consistency

- No hardcoded hex/rgb colors, px shadows, px border-radius, or ms durations in new component code — every one of those should trace back to a token or utility from `references/tokens-and-styles.md`.
- New multi-element components use `tv()` with `slots`, not string concatenation or `clsx` with inline conditionals.
- Icons via `Icon.svelte`, dividers via `Divider.svelte`, state layers via `Layer.svelte` — grep for a raw `material-symbols-` class, a hand-rolled `<hr>`/border-based divider, or manual hover/press opacity as signs one of these was skipped.
