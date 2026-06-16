import type { ButtonAttrs, DivAttrs, NotButton } from '$lib/utils/index.js';
import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes, HTMLLabelAttributes } from 'svelte/elements';

export type ActionProps =
  | DivAttrs
  | ButtonAttrs
  | ({ label: true } & NotButton<HTMLLabelAttributes>)
  | ({ href: string | null } & NotButton<HTMLAnchorAttributes>);

/**
 * Props for the ListItem component.
 * Lists are continuous, vertical indexes of text or images.
 */
export type ListitemProps = {
  /**
   * Optional leading slot, typically used for an icon, avatar, or checkbox.
   */
  leading?: Snippet;
  /**
   * Whether the list item is in a selected state.
   */
  selected?: boolean;
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
   * Optional trailing slot, typically used for an icon, metadata, or switch.
   */
  trailing?: Snippet;
  /**
   * Badge to display in the trailing area.
   * - `true`: renders a small dot badge (notification indicator).
   * - `number`: renders a large badge with that count (capped at 99+).
   */
  badge?: number | boolean;
  /**
   * The number of text lines to reserve space for.
   * If not provided, it's calculated based on presence of overline and supporting text.
   */
  lines?: 1 | 2 | 3;
  /**
   * If true, the component will not wrap its content in an `<li>` element.
   * Useful for when the parent already provides the list item container.
   */
  asChild?: boolean;
} & ActionProps;
