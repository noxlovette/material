import { tv, type VariantProps } from 'tailwind-variants';

export type PaneVariants = VariantProps<typeof pane>;
export type PaneGridVariants = VariantProps<typeof paneGrid>;

export type Breakpoint = 'small' | 'medium' | 'large' | 'extraLarge';
export type SpaceSize = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type Direction = 'row' | 'column';

/** A value that can either apply uniformly or be overridden per M3-ish viewport tier. */
export type Responsive<T> = T | Partial<Record<Breakpoint, T>>;

// Static class lookups, keyed by breakpoint then value — every string below is a
// literal Tailwind candidate, so the JIT scanner picks it up even though it's only
// ever read through object indexing at runtime (see PaneGrid.svelte's resolveResponsive).
const gapClasses: Record<Breakpoint, Record<SpaceSize, string>> = {
  small: { none: 'gap-0', sm: 'gap-2', md: 'gap-3', lg: 'gap-4', xl: 'gap-6' },
  medium: { none: 'md:gap-0', sm: 'md:gap-2', md: 'md:gap-3', lg: 'md:gap-4', xl: 'md:gap-6' },
  large: { none: 'lg:gap-0', sm: 'lg:gap-2', md: 'lg:gap-3', lg: 'lg:gap-4', xl: 'lg:gap-6' },
  extraLarge: { none: 'xl:gap-0', sm: 'xl:gap-2', md: 'xl:gap-3', lg: 'xl:gap-4', xl: 'xl:gap-6' }
};

const paddingClasses: Record<Breakpoint, Record<SpaceSize, string>> = {
  small: { none: 'p-0', sm: 'p-3', md: 'p-4', lg: 'p-6', xl: 'p-8' },
  medium: { none: 'md:p-0', sm: 'md:p-3', md: 'md:p-4', lg: 'md:p-6', xl: 'md:p-8' },
  large: { none: 'lg:p-0', sm: 'lg:p-3', md: 'lg:p-4', lg: 'lg:p-6', xl: 'lg:p-8' },
  extraLarge: { none: 'xl:p-0', sm: 'xl:p-3', md: 'xl:p-4', lg: 'xl:p-6', xl: 'xl:p-8' }
};

const marginClasses: Record<Breakpoint, Record<SpaceSize, string>> = {
  small: { none: 'm-0', sm: 'm-3', md: 'm-4', lg: 'm-6', xl: 'm-8' },
  medium: { none: 'md:m-0', sm: 'md:m-3', md: 'md:m-4', lg: 'md:m-6', xl: 'md:m-8' },
  large: { none: 'lg:m-0', sm: 'lg:m-3', md: 'lg:m-4', lg: 'lg:m-6', xl: 'lg:m-8' },
  extraLarge: { none: 'xl:m-0', sm: 'xl:m-3', md: 'xl:m-4', lg: 'xl:m-6', xl: 'xl:m-8' }
};

const directionClasses: Record<Breakpoint, Record<Direction, string>> = {
  small: { row: 'flex-row', column: 'flex-col' },
  medium: { row: 'md:flex-row', column: 'md:flex-col' },
  large: { row: 'lg:flex-row', column: 'lg:flex-col' },
  extraLarge: { row: 'xl:flex-row', column: 'xl:flex-col' }
};

const visibleFromClasses: Record<Breakpoint, string> = {
  small: '',
  medium: 'hidden md:flex',
  large: 'hidden lg:flex',
  extraLarge: 'hidden xl:flex'
};

const hiddenFromClasses: Record<Breakpoint, string> = {
  small: 'hidden',
  medium: 'md:hidden',
  large: 'lg:hidden',
  extraLarge: 'xl:hidden'
};

export const responsiveTables = {
  gap: gapClasses,
  padding: paddingClasses,
  margin: marginClasses,
  direction: directionClasses,
  visibleFrom: visibleFromClasses,
  hiddenFrom: hiddenFromClasses
};

/** Resolves a `Responsive<T>` prop into a space-separated class string using the given lookup table. */
export function resolveResponsive<T extends string>(
  value: Responsive<T> | undefined,
  table: Record<Breakpoint, Record<T, string>>
): string {
  if (value === undefined) return '';
  if (typeof value === 'object') {
    return Object.entries(value)
      .map(([bp, v]) => table[bp as Breakpoint][v as T])
      .join(' ');
  }
  return table.small[value];
}

export const pane = tv({
  slots: {
    base: 'relative flex min-w-0 flex-col box-border overflow-clip items-center',
    content: 'flex flex-1 flex-col w-full max-w-7xl mx-auto',
    handle:
      'group absolute top-0 bottom-0 right-0 z-30 w-3 translate-x-1.5 cursor-col-resize touch-none bg-transparent hover:bg-md-sys-color-outline/20',
    handleGrip:
      'absolute left-1/2 top-1/2 flex h-12 w-1 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full bg-md-sys-color-secondary group-hover:w-0.5'
  },
  variants: {
    background: {
      true: { base: 'bg-md-sys-color-surface' },
      false: ''
    },
    centered: {
      narrow: { content: 'max-w-2xl' },
      medium: { content: 'max-w-5xl' },
      none: ''
    },
    full: {
      true: { base: 'min-h-dvh' },
      false: ''
    },
    rounded: {
      true: { base: 'md:rounded-t-lg md:rounded-b-lg' },
      false: { base: '' }
    },
    padding: {
      none: { content: 'p-0' },
      sm: { content: 'p-3 md:p-4' },
      md: { content: 'p-4 md:p-6 lg:p-8' },
      lg: { content: 'p-6 md:p-8 lg:p-12' }
    },
    gap: {
      none: { content: 'gap-0' },
      sm: { content: 'gap-2' },
      md: { content: 'gap-3' },
      lg: { content: 'gap-4' },
      xl: { content: 'gap-6' }
    },
    flexible: {
      true: { base: 'min-w-0 grow basis-0' },
      false: { base: 'shrink-0' }
    },
    sticky: {
      true: {
        base: 'sticky top-[var(--pane-sticky-top,0px)] self-start max-h-dvh overflow-y-auto scrollbar-none'
      },
      false: ''
    },
    dragging: {
      true: { handleGrip: 'w-0.5' },
      false: ''
    }
  },
  defaultVariants: {
    rounded: true,
    flexible: true
  }
});

export const paneGrid = tv({
  slots: {
    base: 'flex box-border'
  },
  variants: {
    full: {
      true: { base: 'min-h-dvh' },
      false: ''
    },
    rounded: {
      true: { base: 'md:rounded-t-lg' },
      false: ''
    },
    wrap: {
      true: { base: 'flex-wrap' },
      false: { base: 'flex-nowrap' }
    }
  },
  defaultVariants: {
    wrap: false
  }
});
