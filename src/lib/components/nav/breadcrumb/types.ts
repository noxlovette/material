import type { HTMLAttributes } from 'svelte/elements';
import type { BreadcrumbVariants } from './theme.js';

export type BreadcrumbItem = {
  /** Text shown for this crumb. */
  label: string;
  /** Destination URL. Omit for a non-navigable crumb (e.g. the current page — the last item is always rendered as static text regardless of href). */
  href?: string;
};

export type BreadcrumbProps = HTMLAttributes<HTMLElementTagNameMap['nav']> & {
  /** Ordered from root to current page. */
  items: BreadcrumbItem[];
  /** Text color of the current (last) crumb, and the hover color of the links before it. Defaults to 'primary'. */
  color?: BreadcrumbVariants['color'];
};
