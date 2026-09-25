import { tv, type VariantProps } from '$lib/utils/tv.js';
import type { Breakpoint, Responsive } from '../../containers/pane/theme.js';
import type { SearchLayout } from './types.js';

export type SearchVariants = VariantProps<typeof search>;

/**
 * M3 Expressive contained search bar (https://m3.material.io/components/search/specs):
 * 56dp, circular, surface-container-high, flat. 48dp leading/trailing targets at a 4dp inset,
 * 4dp between the leading element and the label, 0 between trailing actions; 16dp at an edge
 * with no action. Circular as `rounded-xl` (28dp, half the height), not `rounded-full`: the
 * search view's container transform interpolates the corner radius, and an infinite one balloons
 * the bar into a circle mid-morph. The focus ring is dropped while a view transition runs: it's
 * outside the bar's box, and a snapshot of it would trail the morph as a stray arc. Hover 8% / pressed 10% on-surface; focus 3dp secondary outline, 2dp offset.
 */
export const search = tv({
  slots: {
    base: 'state-layer relative flex h-spacing-700 w-full max-w-[720px] cursor-text items-center rounded-xl bg-md-sys-color-surface-container-high ps-spacing-50 pe-spacing-50 before:rounded-xl hover:before:bg-md-sys-color-on-surface/8 active:before:bg-md-sys-color-on-surface/10 has-[input:focus-visible]:outline-3 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-md-sys-color-secondary [:root:active-view-transition_&]:outline-0',
    leading: 'text-md-sys-color-on-surface relative flex shrink-0 items-center',
    leadingIcon: 'text-md-sys-color-on-surface grid size-spacing-600 shrink-0 place-items-center',
    input:
      'md-sys-typescale-body-large text-md-sys-color-on-surface placeholder:text-md-sys-color-on-surface-variant relative ms-spacing-50 me-spacing-50 w-full min-w-spacing-0 bg-transparent outline-none [&::-webkit-search-cancel-button]:hidden',
    trailing: 'text-md-sys-color-on-surface-variant relative flex shrink-0 items-center'
  },
  variants: {
    hasLeading: { true: '', false: { input: 'ms-spacing-150' } },
    hasTrailing: { true: '', false: { input: 'me-spacing-150' } }
  }
});

export type SearchViewVariants = VariantProps<typeof searchView>;

/**
 * M3 Expressive search view, contained style (https://m3.material.io/components/search/specs).
 * In both layouts the bar is a 56dp circular surface-container-high field with a back button,
 * 12dp from the view's edges (`search-view.contained.leading/trailing-margin`). The layout table
 * below places the view and colours its container.
 */
export const searchView = tv({
  slots: {
    base: 'fixed z-layer-modal flex flex-col outline-none',
    bar: 'flex h-spacing-700 w-full shrink-0 items-center rounded-xl bg-md-sys-color-surface-container-high ps-spacing-50 pe-spacing-50',
    leading: 'text-md-sys-color-on-surface flex shrink-0 items-center',
    input:
      'md-sys-typescale-body-large text-md-sys-color-on-surface placeholder:text-md-sys-color-on-surface-variant ms-spacing-50 me-spacing-50 w-full min-w-spacing-0 bg-transparent outline-none [&::-webkit-search-cancel-button]:hidden',
    trailing: 'text-md-sys-color-on-surface-variant flex shrink-0 items-center',
    // Options sit on the view's container colour, not the list's own surface. The one the arrow
    // keys are on gets the M3 focus indicator, drawn inside the item.
    results:
      'min-h-spacing-0 overflow-y-auto overscroll-contain [&_[role=option]:not([aria-disabled=true])]:bg-transparent [&_[data-highlighted]]:outline-3 [&_[data-highlighted]]:-outline-offset-3 [&_[data-highlighted]]:outline-md-sys-color-secondary'
  },
  variants: {
    hasTrailing: { true: '', false: { input: 'me-spacing-150' } }
  }
});

type ViewSlot = 'base' | 'results';

/*
  Every class is a literal so the Tailwind scanner sees it; `searchViewLayout` picks one row per
  tier. Each row restates every property a tier changes, so a smaller tier never leaks upward.

  Full-screen: the whole window, surface-container-low, 0 radius; the bar sits 12dp in from the
  sides and 8dp from the top, so it lines up with a 64dp app bar. The results run edge to edge.
  Docked: the bar widened over the search bar (JS measures it into --sv-*), results 2dp below in
  a 12dp-radius surface-container-high container. The transparent wrapper takes their corners
  (28dp top, 12dp bottom) only so the container transform morphs into the right shape. 360–720dp wide, 240dp to ⅔ of the window tall.
*/
const layoutClasses: Record<Breakpoint, Record<SearchLayout, Record<ViewSlot, string>>> = {
  small: {
    fullScreen: {
      base: 'top-spacing-0 left-spacing-0 w-full min-w-spacing-0 max-w-none h-dvh min-h-spacing-0 max-h-none gap-spacing-100 px-spacing-150 pt-spacing-100 rounded-none bg-md-sys-color-surface-container-low',
      results: 'flex-1 -mx-spacing-150 rounded-none bg-transparent'
    },
    docked: {
      base: 'top-(--sv-top) left-(--sv-left) w-(--sv-width) min-w-(--md-comp-search-view-contained-docked-container-width-minimum) max-w-(--md-comp-search-view-contained-docked-container-width-maximum) h-auto min-h-(--md-comp-search-view-contained-docked-container-height-minimum) max-h-(--sv-max-height) gap-spacing-25 px-spacing-0 pt-spacing-0 rounded-t-xl rounded-b-md bg-transparent',
      results: 'flex-1 mx-spacing-0 rounded-md bg-md-sys-color-surface-container-high'
    }
  },
  medium: {
    fullScreen: {
      base: 'md:top-spacing-0 md:left-spacing-0 md:w-full md:min-w-spacing-0 md:max-w-none md:h-dvh md:min-h-spacing-0 md:max-h-none md:gap-spacing-100 md:px-spacing-150 md:pt-spacing-100 md:rounded-none md:bg-md-sys-color-surface-container-low',
      results: 'md:flex-1 md:-mx-spacing-150 md:rounded-none md:bg-transparent'
    },
    docked: {
      base: 'md:top-(--sv-top) md:left-(--sv-left) md:w-(--sv-width) md:min-w-(--md-comp-search-view-contained-docked-container-width-minimum) md:max-w-(--md-comp-search-view-contained-docked-container-width-maximum) md:h-auto md:min-h-(--md-comp-search-view-contained-docked-container-height-minimum) md:max-h-(--sv-max-height) md:gap-spacing-25 md:px-spacing-0 md:pt-spacing-0 md:rounded-t-xl md:rounded-b-md md:bg-transparent',
      results: 'md:flex-1 md:mx-spacing-0 md:rounded-md md:bg-md-sys-color-surface-container-high'
    }
  },
  large: {
    fullScreen: {
      base: 'lg:top-spacing-0 lg:left-spacing-0 lg:w-full lg:min-w-spacing-0 lg:max-w-none lg:h-dvh lg:min-h-spacing-0 lg:max-h-none lg:gap-spacing-100 lg:px-spacing-150 lg:pt-spacing-100 lg:rounded-none lg:bg-md-sys-color-surface-container-low',
      results: 'lg:flex-1 lg:-mx-spacing-150 lg:rounded-none lg:bg-transparent'
    },
    docked: {
      base: 'lg:top-(--sv-top) lg:left-(--sv-left) lg:w-(--sv-width) lg:min-w-(--md-comp-search-view-contained-docked-container-width-minimum) lg:max-w-(--md-comp-search-view-contained-docked-container-width-maximum) lg:h-auto lg:min-h-(--md-comp-search-view-contained-docked-container-height-minimum) lg:max-h-(--sv-max-height) lg:gap-spacing-25 lg:px-spacing-0 lg:pt-spacing-0 lg:rounded-t-xl lg:rounded-b-md lg:bg-transparent',
      results: 'lg:flex-1 lg:mx-spacing-0 lg:rounded-md lg:bg-md-sys-color-surface-container-high'
    }
  },
  extraLarge: {
    fullScreen: {
      base: 'xl:top-spacing-0 xl:left-spacing-0 xl:w-full xl:min-w-spacing-0 xl:max-w-none xl:h-dvh xl:min-h-spacing-0 xl:max-h-none xl:gap-spacing-100 xl:px-spacing-150 xl:pt-spacing-100 xl:rounded-none xl:bg-md-sys-color-surface-container-low',
      results: 'xl:flex-1 xl:-mx-spacing-150 xl:rounded-none xl:bg-transparent'
    },
    docked: {
      base: 'xl:top-(--sv-top) xl:left-(--sv-left) xl:w-(--sv-width) xl:min-w-(--md-comp-search-view-contained-docked-container-width-minimum) xl:max-w-(--md-comp-search-view-contained-docked-container-width-maximum) xl:h-auto xl:min-h-(--md-comp-search-view-contained-docked-container-height-minimum) xl:max-h-(--sv-max-height) xl:gap-spacing-25 xl:px-spacing-0 xl:pt-spacing-0 xl:rounded-t-xl xl:rounded-b-md xl:bg-transparent',
      results: 'xl:flex-1 xl:mx-spacing-0 xl:rounded-md xl:bg-md-sys-color-surface-container-high'
    }
  }
};

/** M3's layout guidance: full-screen on compact windows, docked from medium up. */
export const defaultSearchLayout = { small: 'fullScreen', medium: 'docked' } as const;

/**
 * Resolves a responsive search view layout into classes for the view's slots. Tiers left out
 * inherit from the one below; below the first given tier the view is full-screen.
 */
export function searchViewLayout(layout: Responsive<SearchLayout>): Record<ViewSlot, string> {
  const tiers =
    typeof layout === 'string' ? { small: layout } : { small: 'fullScreen' as const, ...layout };
  const pick = (slot: ViewSlot) =>
    Object.entries(tiers)
      .map(([bp, value]) => layoutClasses[bp as Breakpoint][value as SearchLayout][slot])
      .join(' ');
  return { base: pick('base'), results: pick('results') };
}
