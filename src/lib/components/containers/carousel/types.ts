import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

/**
 * - `multiBrowse`: at least one large, one medium and one small item; items resize as they scroll.
 * - `hero`: one large item and one small item.
 * - `centeredHero`: one large item centred between two small ones.
 * - `uncontained`: fixed-width items that scroll off the trailing edge. With per-item widths
 *   (`itemWidth` as a function) this is the uncontained multi-aspect-ratio layout.
 * - `fullScreen`: one edge-to-edge item at a time, scrolling vertically.
 */
export type CarouselLayout = 'multiBrowse' | 'hero' | 'centeredHero' | 'uncontained' | 'fullScreen';

/** What the `item` snippet receives besides the item itself. */
export type CarouselItemState = {
  index: number;
  /**
   * How large the item currently is, from 0 (small) to 1 (large). Fade labels and other
   * secondary content with it: they belong on large items only.
   */
  progress: number;
};

export type CarouselProps<T> = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** The items to show. */
  items: T[];
  /** Renders one item's content. It fills the item; use `object-cover` media. */
  item: Snippet<[T, CarouselItemState]>;
  /** Accessible name of the carousel, e.g. "Featured albums". */
  label: string;
  /** @default 'multiBrowse' */
  layout?: CarouselLayout;
  /**
   * Item width in px. Multi-browse: the preferred large width, which the carousel adjusts to fit
   * whole items. Uncontained: every item's width, or one per item for mixed aspect ratios.
   * Ignored by the hero and full-screen layouts.
   * @default 186 (multi-browse), 240 (uncontained)
   */
  itemWidth?: number | ((item: T, index: number) => number);
  /**
   * Whether scrolling comes to rest on an item. Defaults to on for every layout except
   * uncontained, which scrolls freely.
   */
  snap?: boolean;
  /** Draws the 1dp outline around items. */
  outlined?: boolean;
  /** Makes each item a button. A tapped item typically opens its detail (container transform). */
  onitemclick?: (item: T, index: number) => void;
  /** Makes each item a link. */
  itemHref?: (item: T, index: number) => string;
  /** Accessible name of each item; defaults to "n of total". */
  itemLabel?: (item: T, index: number) => string;
  /** Disables an item: 38% opacity, not interactive. */
  itemDisabled?: (item: T, index: number) => boolean;
};
