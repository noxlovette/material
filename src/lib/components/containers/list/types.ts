import type { ButtonAttrs, DivAttrs, NotButton } from '$lib/utils/index.js';
import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLLabelAttributes } from 'svelte/elements';

export type ActionProps =
  | DivAttrs
  | ButtonAttrs
  | ({ label: true } & NotButton<HTMLLabelAttributes>)
  | ({ href: string | null } & NotButton<HTMLAnchorAttributes>);

/** Props for the `List` container. */
export type ListProps = HTMLAttributes<HTMLUListElement> & {
  /**
   * `standard`: items sit on the page. `segmented`: each item is its own segment, 2dp apart, with
   * 16dp outer corners. A visual choice only; it doesn't change behavior.
   * @default 'standard'
   */
  variant?: 'standard' | 'segmented';
  children?: Snippet;
};

/**
 * Props for the ListItem component.
 * Lists are continuous, vertical indexes of text or images.
 */
export type ListitemProps = {
  /**
   * The leading slot: must be narrower than the text and hold one element. Allowed content, per
   * the M3 list spec (size it with `listMedia`):
   * - **Icon**: 20dp (`<Icon size="sm">`).
   * - **Avatar**: 40dp circle (`listMedia({ kind: 'avatar' })`).
   * - **Image**: 56×56dp, 8dp corners (`listMedia({ kind: 'image' })`).
   * - **Video thumbnail**: 100×56dp or 114×64dp, 8dp corners (`kind: 'video' | 'videoLarge'`).
   * - **Selection control**: a checkbox, radio button or switch. Use `label` so the whole item
   *   toggles it, and don't add a second selection control in `trailing`.
   *
   * Decorative media gets `alt=""`; the headline is the item's accessible name.
   */
  leading?: Snippet;
  /**
   * Whether the item is selected: secondary-container fill and a 16dp shape. Exposed to
   * assistive tech as `aria-selected` (with `role="option"`), `aria-current="page"` (links) or
   * `aria-pressed` (buttons).
   */
  selected?: boolean;
  /** Disables the item: 38% content, no interaction. */
  disabled?: boolean;
  /**
   * Optional overline text displayed above the headline.
   */
  overline?: string | null;
  /**
   * The primary headline text of the list item.
   */
  headline?: string;
  /**
   * Supporting text content displayed below the headline.
   */
  supporting?: string | null;
  /**
   * The trailing slot: an icon (20dp, `<Icon size="sm">`), an icon button, or a selection control
   * (checkbox, radio, switch). Interactive content keeps a 48dp target.
   */
  trailing?: Snippet;
  /** Short trailing text, e.g. a count, time or shortcut ("100+", "⌘C"). */
  trailingText?: string;
  /**
   * Badge to display in the trailing area.
   * - `true`: renders a small dot badge (notification indicator).
   * - `number`: renders a large badge with that count (capped at 99+).
   */
  badge?: number | boolean;
  /**
   * The number of text lines to reserve space for (56, 72 or 88dp minimum height). At 3 lines,
   * content aligns to the top.
   * If not provided, it's calculated based on presence of overline and supporting text.
   */
  lines?: 1 | 2 | 3;
  /**
   * Nested items. Giving `children` makes this an expandable item: the item becomes a button
   * that toggles them, with a trailing expand indicator.
   */
  children?: Snippet;
  /** Whether the nested `children` are shown. Bindable. */
  expanded?: boolean;
  /**
   * If true, the component will not wrap its content in an `<li>` element.
   * Useful for when the parent already provides the list item container.
   */
  asChild?: boolean;
} & ActionProps;
