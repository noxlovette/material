import { tv, type VariantProps } from '$lib/utils/tv.js';
import type { Breakpoint } from '../../containers/pane/theme.js';

export type AppbarVariants = VariantProps<typeof appbar>;
export type AppBarSize = 'small' | 'medium' | 'large';

/*
  M3 Expressive app bar (https://m3.material.io/components/app-bars/specs), laid out on one
  3-column grid (leading · text · trailing) so the size can change per breakpoint in CSS alone:
  - small: 64dp, one row, title between the buttons.
  - medium/large flexible: an actions row (8dp top, 48dp) above a headline block spanning all
    columns (16dp inset, 12dp bottom) that wraps and grows; min height 112/120dp, or 136/152dp
    with a subtitle.
  4dp container padding and 0 gap between 48dp icon buttons throughout. Every class below is a
  literal so the Tailwind scanner sees it; `appbarSize` picks them per breakpoint.
*/
const sizeClasses: Record<Breakpoint, Record<AppBarSize, Record<SizeSlot, string>>> = {
  small: {
    small: {
      row: 'grid-rows-[4rem] pt-spacing-0 min-h-spacing-800',
      rowSubtitle: '',
      textContainer:
        'col-start-2 col-span-1 row-start-1 self-center ps-(--lead) pe-(--trail) pt-spacing-0 pb-spacing-0',
      title: 'md-sys-typescale-title-large line-clamp-1',
      subtitle: 'md-sys-typescale-label-medium line-clamp-1'
    },
    medium: {
      row: 'grid-rows-[3rem_1fr] pt-spacing-100 min-h-28',
      rowSubtitle: 'min-h-34',
      textContainer:
        'col-start-1 col-span-3 row-start-2 self-end ps-spacing-200 pe-spacing-200 pt-spacing-50 pb-spacing-150',
      title: 'md-sys-typescale-headline-medium line-clamp-none',
      subtitle: 'md-sys-typescale-title-small line-clamp-none'
    },
    large: {
      row: 'grid-rows-[3rem_1fr] pt-spacing-100 min-h-30',
      rowSubtitle: 'min-h-38',
      textContainer:
        'col-start-1 col-span-3 row-start-2 self-end ps-spacing-200 pe-spacing-200 pt-spacing-50 pb-spacing-150',
      title: 'md-sys-typescale-display-small line-clamp-none',
      subtitle: 'md-sys-typescale-title-medium line-clamp-none'
    }
  },
  medium: {
    small: {
      row: 'md:grid-rows-[4rem] md:pt-spacing-0 md:min-h-spacing-800',
      rowSubtitle: '',
      textContainer:
        'md:col-start-2 md:col-span-1 md:row-start-1 md:self-center md:ps-(--lead) md:pe-(--trail) md:pt-spacing-0 md:pb-spacing-0',
      title: 'md:md-sys-typescale-title-large md:line-clamp-1',
      subtitle: 'md:md-sys-typescale-label-medium md:line-clamp-1'
    },
    medium: {
      row: 'md:grid-rows-[3rem_1fr] md:pt-spacing-100 md:min-h-28',
      rowSubtitle: 'md:min-h-34',
      textContainer:
        'md:col-start-1 md:col-span-3 md:row-start-2 md:self-end md:ps-spacing-200 md:pe-spacing-200 md:pt-spacing-50 md:pb-spacing-150',
      title: 'md:md-sys-typescale-headline-medium md:line-clamp-none',
      subtitle: 'md:md-sys-typescale-title-small md:line-clamp-none'
    },
    large: {
      row: 'md:grid-rows-[3rem_1fr] md:pt-spacing-100 md:min-h-30',
      rowSubtitle: 'md:min-h-38',
      textContainer:
        'md:col-start-1 md:col-span-3 md:row-start-2 md:self-end md:ps-spacing-200 md:pe-spacing-200 md:pt-spacing-50 md:pb-spacing-150',
      title: 'md:md-sys-typescale-display-small md:line-clamp-none',
      subtitle: 'md:md-sys-typescale-title-medium md:line-clamp-none'
    }
  },
  large: {
    small: {
      row: 'lg:grid-rows-[4rem] lg:pt-spacing-0 lg:min-h-spacing-800',
      rowSubtitle: '',
      textContainer:
        'lg:col-start-2 lg:col-span-1 lg:row-start-1 lg:self-center lg:ps-(--lead) lg:pe-(--trail) lg:pt-spacing-0 lg:pb-spacing-0',
      title: 'lg:md-sys-typescale-title-large lg:line-clamp-1',
      subtitle: 'lg:md-sys-typescale-label-medium lg:line-clamp-1'
    },
    medium: {
      row: 'lg:grid-rows-[3rem_1fr] lg:pt-spacing-100 lg:min-h-28',
      rowSubtitle: 'lg:min-h-34',
      textContainer:
        'lg:col-start-1 lg:col-span-3 lg:row-start-2 lg:self-end lg:ps-spacing-200 lg:pe-spacing-200 lg:pt-spacing-50 lg:pb-spacing-150',
      title: 'lg:md-sys-typescale-headline-medium lg:line-clamp-none',
      subtitle: 'lg:md-sys-typescale-title-small lg:line-clamp-none'
    },
    large: {
      row: 'lg:grid-rows-[3rem_1fr] lg:pt-spacing-100 lg:min-h-30',
      rowSubtitle: 'lg:min-h-38',
      textContainer:
        'lg:col-start-1 lg:col-span-3 lg:row-start-2 lg:self-end lg:ps-spacing-200 lg:pe-spacing-200 lg:pt-spacing-50 lg:pb-spacing-150',
      title: 'lg:md-sys-typescale-display-small lg:line-clamp-none',
      subtitle: 'lg:md-sys-typescale-title-medium lg:line-clamp-none'
    }
  },
  extraLarge: {
    small: {
      row: 'xl:grid-rows-[4rem] xl:pt-spacing-0 xl:min-h-spacing-800',
      rowSubtitle: '',
      textContainer:
        'xl:col-start-2 xl:col-span-1 xl:row-start-1 xl:self-center xl:ps-(--lead) xl:pe-(--trail) xl:pt-spacing-0 xl:pb-spacing-0',
      title: 'xl:md-sys-typescale-title-large xl:line-clamp-1',
      subtitle: 'xl:md-sys-typescale-label-medium xl:line-clamp-1'
    },
    medium: {
      row: 'xl:grid-rows-[3rem_1fr] xl:pt-spacing-100 xl:min-h-28',
      rowSubtitle: 'xl:min-h-34',
      textContainer:
        'xl:col-start-1 xl:col-span-3 xl:row-start-2 xl:self-end xl:ps-spacing-200 xl:pe-spacing-200 xl:pt-spacing-50 xl:pb-spacing-150',
      title: 'xl:md-sys-typescale-headline-medium xl:line-clamp-none',
      subtitle: 'xl:md-sys-typescale-title-small xl:line-clamp-none'
    },
    large: {
      row: 'xl:grid-rows-[3rem_1fr] xl:pt-spacing-100 xl:min-h-30',
      rowSubtitle: 'xl:min-h-38',
      textContainer:
        'xl:col-start-1 xl:col-span-3 xl:row-start-2 xl:self-end xl:ps-spacing-200 xl:pe-spacing-200 xl:pt-spacing-50 xl:pb-spacing-150',
      title: 'xl:md-sys-typescale-display-small xl:line-clamp-none',
      subtitle: 'xl:md-sys-typescale-title-medium xl:line-clamp-none'
    }
  }
};

type SizeSlot = 'row' | 'rowSubtitle' | 'textContainer' | 'title' | 'subtitle';

/**
 * Resolves `size` (one value, or one per breakpoint like `PaneGrid`'s props) into per-slot
 * classes. Sizes cascade upward from the smallest breakpoint given, like Tailwind prefixes.
 */
export function appbarSize(
  size: AppBarSize | Partial<Record<Breakpoint, AppBarSize>>,
  hasSubtitle: boolean
): Record<'row' | 'textContainer' | 'title' | 'subtitle', string> {
  const tiers = typeof size === 'string' ? { small: size } : { small: 'small' as const, ...size };
  const pick = (slot: SizeSlot) =>
    Object.entries(tiers)
      .map(([bp, s]) => sizeClasses[bp as Breakpoint][s][slot])
      .join(' ');
  return {
    row: `${pick('row')} ${hasSubtitle ? pick('rowSubtitle') : ''}`,
    textContainer: pick('textContainer'),
    title: pick('title'),
    subtitle: pick('subtitle')
  };
}

export const appbar = tv({
  slots: {
    // Starts beside a viewport-anchored Rail (styles/components.css), which runs full height.
    base: 'md-vt-persist fixed top-spacing-0 left-(--md-rail-inset) right-spacing-0 flex flex-col z-layer-bar transition-colors md-sys-motion-effects',
    row: 'grid w-full items-center px-spacing-50',
    childrenRow: 'w-full px-spacing-100 pb-spacing-100',
    ghost: 'w-full shrink-0 pointer-events-none',
    textContainer:
      'flex min-w-spacing-0 flex-col gap-spacing-25 [--lead:0.25rem] [--trail:0.25rem]',
    title: 'text-md-sys-color-on-surface',
    subtitle: 'text-md-sys-color-on-surface-variant',
    leading:
      'text-md-sys-color-on-surface col-start-1 row-start-1 flex shrink-0 items-center justify-self-start',
    trailing:
      'text-md-sys-color-on-surface-variant col-start-3 row-start-1 flex shrink-0 items-center justify-self-end',
    search:
      'state-layer relative flex h-spacing-700 w-full min-w-spacing-0 cursor-text items-center rounded-xl ps-spacing-200 pe-spacing-200 transition-colors md-sys-motion-effects before:rounded-xl hover:before:bg-md-sys-color-on-surface/8 focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-md-sys-color-secondary [:root:active-view-transition_&]:outline-0',
    searchInput:
      'md-sys-typescale-body-large text-md-sys-color-on-surface placeholder:text-md-sys-color-on-surface-variant w-full min-w-spacing-0 bg-transparent text-start outline-none placeholder-shown:text-center [&::-webkit-search-cancel-button]:hidden',
    searchTrailing: 'text-md-sys-color-on-surface-variant flex shrink-0 items-center'
  },
  variants: {
    align: {
      start: { row: 'grid-cols-[auto_1fr_auto]', textContainer: 'items-start text-start' },
      // 1fr side columns centre a small bar's title on the bar, not between uneven button groups.
      center: { row: 'grid-cols-[1fr_auto_1fr]', textContainer: 'items-center text-center' }
    },
    /*
      From medium up, a Pane rounds its top corners (md:rounded-t-*) and sits as a surface card
      on the App's surface-container, beside a surface-container Rail. The bar is part of that
      chrome there, so it stays surface-container whether scrolled or not: a surface bar
      would read as a strip glued over the card, with the App's colour showing through the
      pane's corners beneath it. Below medium the pane is flat and full-bleed, so the bar keeps
      M3's surface → surface-container on-scroll change.
    */
    scrolled: {
      true: {
        base: 'bg-md-sys-color-surface-container',
        search: 'bg-md-sys-color-surface-container-highest'
      },
      false: {
        base: 'bg-md-sys-color-surface md:bg-md-sys-color-surface-container',
        search: 'bg-md-sys-color-surface-container md:bg-md-sys-color-surface-container-highest'
      }
    },
    // Search app bar: the search container fills the text column, 8dp from the buttons.
    searchContainer: {
      true: {
        row: 'grid-cols-[auto_1fr_auto]',
        textContainer: '[--lead:0.5rem] [--trail:0.5rem]'
      },
      false: ''
    },
    hasSearchTrailing: { true: { search: 'pe-spacing-50' }, false: '' },
    noTrailing: { true: '', false: '' },
    noLeading: { true: '', false: '' }
  },
  compoundVariants: [
    // A title with no button beside it sits at the 16dp inset.
    { align: 'start', noLeading: true, class: { textContainer: '[--lead:1rem]' } },
    { align: 'start', noTrailing: true, class: { textContainer: '[--trail:1rem]' } },
    { searchContainer: true, noLeading: true, class: { textContainer: '[--lead:0.75rem]' } },
    { searchContainer: true, noTrailing: true, class: { textContainer: '[--trail:0.75rem]' } }
  ],
  defaultVariants: {
    align: 'start',
    scrolled: false,
    searchContainer: false
  }
});
