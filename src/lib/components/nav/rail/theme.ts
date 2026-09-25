import { tv, type VariantProps } from '$lib/utils/tv.js';

export type RailVariants = VariantProps<typeof rail>;
export type RailItemVariants = VariantProps<typeof railElement>;

/*
  M3 Expressive navigation rail (https://m3.material.io/components/navigation-rail/specs):
  - Collapsed: 96dp wide, `surface`, no elevation or shape. Destinations sit 4dp apart.
  - Expanded: hugs its widest destination between 220 and 360dp, destinations touching. Standard
    (lg+, pushes content) keeps the collapsed container; modal (md, over a scrim) is
    `surface-container`, elevation 3, 16dp trailing corners.
  - 44dp above the first element; at least 40dp between the menu/FAB header and the destinations.
  - Header elements sit in a 56dp column 20dp from the leading edge, the same column as the
    destinations' active indicators, so nothing shifts sideways when the rail expands.
  Expanding is one spatial spring on a progress value, 0 collapsed to 1 expanded, which
  Rail.svelte writes to `--rail-p` (after Compose's WideNavigationRail). The width, the gap
  between destinations, the modal corners and each destination's geometry all follow it, so
  nothing here transitions spatially on its own.
*/
export const rail = tv({
  slots: {
    // Modal corners grow with the progress (0 → 16dp); the standard rail stays square.
    base: 'rounded-r-[calc(var(--radius-lg)_*_var(--rail-p,0))] lg:rounded-r-none hidden md:flex flex-col z-layer-rail overflow-hidden pt-(--md-comp-nav-rail-collapsed-top-space) pb-spacing-250 bg-md-sys-color-surface transition-[background-color,box-shadow] md-sys-motion-effects',
    header: 'flex flex-col gap-spacing-300 px-spacing-250',
    menu: 'flex w-spacing-700 justify-center',
    nav: 'flex min-h-spacing-0 w-full flex-1 flex-col',
    // 4dp between destinations collapsed, 0 expanded, following the progress.
    items:
      'flex w-full flex-col overflow-x-hidden overflow-y-auto [scrollbar-width:none] gap-[calc(var(--spacing-spacing-50)_*_(1_-_var(--rail-p,0)))]',
    ghost:
      'hidden md:block shrink-0 w-(--md-comp-nav-rail-collapsed-container-width) lg:w-(--rail-width)',
    scrim:
      'hidden md:block lg:hidden inset-spacing-0 z-layer-rail bg-md-sys-color-scrim/32 transition-opacity md-sys-motion-effects'
  },
  variants: {
    anchor: {
      viewport: {
        base: 'fixed top-[var(--rail-top,0px)] bottom-spacing-0 left-spacing-0',
        scrim: 'fixed'
      },
      parent: {
        base: 'absolute top-[var(--rail-top,0px)] bottom-spacing-0 left-spacing-0',
        scrim: 'absolute'
      }
    },
    expanded: {
      true: {
        base: 'w-max min-w-(--md-comp-nav-rail-expanded-container-width-minimum) max-w-(--md-comp-nav-rail-expanded-container-width-maximum) pt-(--md-comp-nav-rail-expanded-top-space) bg-md-sys-color-surface-container shadow-elevation-3 lg:bg-md-sys-color-surface lg:shadow-elevation-0',
        header: 'items-start',
        scrim: 'opacity-100'
      },
      false: {
        base: 'w-(--md-comp-nav-rail-collapsed-container-width)',
        header: 'items-center',
        scrim: 'pointer-events-none opacity-0'
      }
    },
    /* Header space: only when there is a header to keep the destinations away from. */
    header: {
      true: { nav: 'mt-spacing-500' },
      false: {}
    },
    rounded: {
      true: {
        base: 'rounded-xl'
      },
      false: {}
    }
  },
  defaultVariants: {
    anchor: 'viewport',
    header: false
  }
});

/*
  One destination. The link spans the rail's full width (M3: the target area always does); the
  active indicator inside it hugs its contents. Collapsed, the indicator is 56×32 around the icon
  with the label 4dp below; expanded, it's a 56dp pill around icon and label, 16dp padding, 8dp
  between them. State layers are `on-secondary-container` at 8% hover and 10% focus/press, drawn
  on the indicator but triggered anywhere on the link.

  Geometry isn't here: it interpolates on the rail's expand progress, in RailItem.svelte's
  <style>. `layout` is which side of the halfway point that progress is on, and decides only
  what may switch while the label is invisible: its typescale and colour.
*/
export const railElement = tv({
  slots: {
    base: 'group rail-item relative flex w-full px-spacing-250 outline-none',
    // As wide as the expanded pill, so an expanded rail (w-max) hugs its widest destination.
    sizer: 'relative h-full shrink-0 pl-spacing-600 pr-spacing-200',
    measure: 'invisible md-sys-typescale-label-large whitespace-nowrap',
    indicator:
      'rail-indicator absolute left-spacing-0 rounded-full state-layer before:rounded-full transition-colors md-sys-motion-fast-effects',
    icon: 'rail-icon absolute left-spacing-200 inline-flex',
    label: 'rail-label absolute whitespace-nowrap transition-colors md-sys-motion-fast-effects'
  },
  variants: {
    active: {
      true: {
        indicator: 'bg-md-sys-color-secondary-container',
        icon: 'text-md-sys-color-on-secondary-container'
      },
      false: {
        icon: 'text-md-sys-color-on-surface-variant',
        label: 'text-md-sys-color-on-surface-variant'
      }
    },
    layout: {
      top: { label: 'md-sys-typescale-label-medium' },
      start: { label: 'md-sys-typescale-label-large' }
    },
    disabled: {
      true: {
        base: 'cursor-not-allowed opacity-38'
      },
      false: {
        // State layer and focus ring on the indicator, triggered by the full-width link.
        indicator:
          'group-hover:before:bg-md-sys-color-on-secondary-container/8 group-focus-visible:before:bg-md-sys-color-on-secondary-container/10 group-active:before:bg-md-sys-color-on-secondary-container/10 group-focus-visible:outline-3 group-focus-visible:outline-offset-2 group-focus-visible:outline-md-sys-color-secondary'
      }
    }
  },
  compoundVariants: [
    { active: true, layout: 'top', class: { label: 'text-md-sys-color-secondary' } },
    { active: true, layout: 'start', class: { label: 'text-md-sys-color-on-secondary-container' } }
  ],
  defaultVariants: {
    layout: 'top',
    disabled: false
  }
});
