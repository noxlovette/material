import { tv, type VariantProps } from 'tailwind-variants';

export type PaneVariants = VariantProps<typeof pane>;
export type PaneGridVariants = VariantProps<typeof paneGrid>;
export type PaneHandleVariants = VariantProps<typeof paneHandle>;
export type DraggablePaneVariants = VariantProps<typeof draggablePane>;

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
    content: 'flex flex-1 flex-col w-full h-full'
  },
  variants: {
    background: {
      true: { base: 'bg-md-sys-color-surface' },
      false: ''
    },
    full: {
      // --appbar-height is set on the document root by a mounted AppBar (see
      // AppBar.svelte); the var falls back to 0px so this equals plain
      // min-h-dvh when no AppBar is present.
      true: { base: 'min-h-[calc(100dvh-var(--appbar-height,0px))]' },
      false: ''
    },
    rounded: {
      true: { base: 'md:rounded-t-md' },
      false: { base: '' }
    },
    padding: {
      none: { content: 'p-0' },
      sm: { content: 'px-3 md:px-4 py-2 md:py-3' },
      md: { content: 'px-4 md:px-6 lg:px-8 py-3 md:py-4 lg: py-6' },
      lg: { content: 'px-6 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8' }
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
    }
  },
  defaultVariants: {
    rounded: true,
    flexible: true
  }
});

/**
 * A standalone drag divider, placed directly inside a `PaneGrid` between two
 * `Pane`s. Sits in the grid's own gap as a real flex sibling — not clipped by
 * a Pane's `overflow-clip` the way a self-owned handle was — and drags the
 * width of whichever `Pane` shares its `persistKey` via the shared
 * `resizeStore`.
 */
export const paneHandle = tv({
  slots: {
    base: 'group relative flex shrink-0 w-3 self-stretch cursor-col-resize touch-none items-center justify-center rounded-full bg-transparent hover:bg-md-sys-color-outline/20',
    grip: 'rounded-full transition-[background-color,height,width] duration-150'
  },
  variants: {
    dragging: {
      true: { base: 'bg-md-sys-color-outline/20' },
      false: ''
    },
    snapped: {
      true: { grip: 'h-10 w-1.5 bg-md-sys-color-tertiary' },
      false: {
        grip: 'h-8 w-1 bg-md-sys-color-on-surface-variant/40 group-hover:bg-md-sys-color-primary'
      }
    }
  },
  compoundVariants: [{ dragging: true, snapped: false, class: { grip: 'w-0.5' } }]
});

/**
 * A floating panel positioned by `x`/`y` instead of participating in flex
 * layout — dragged into place by its header rather than resized in place
 * like `PaneHandle`/`Pane`.
 */
export const draggablePane = tv({
  slots: {
    base: 'fixed z-[100] flex min-w-72 flex-col rounded-2xl bg-md-sys-color-surface-container-high shadow-elevation-3',
    headerBar:
      'relative flex shrink-0 items-center gap-2 rounded-t-2xl px-3 py-2 touch-none select-none md-sys-state-focus-indicator',
    grip: 'shrink-0 text-md-sys-color-on-surface-variant',
    headline: 'flex-1 truncate md-sys-typescale-title-small text-md-sys-color-on-surface',
    actions: 'flex shrink-0 items-center',
    content: 'flex flex-1 flex-col overflow-auto p-4 pt-2'
  },
  variants: {
    dragging: {
      true: { base: 'shadow-elevation-4 cursor-grabbing', headerBar: 'cursor-grabbing' },
      false: { headerBar: 'cursor-grab' }
    },
    disableDrag: {
      true: { headerBar: 'cursor-default' },
      false: ''
    }
  },
  defaultVariants: {
    dragging: false,
    disableDrag: false
  }
});

export const paneGrid = tv({
  slots: {
    base: 'flex box-border'
  },
  variants: {
    full: {
      // See pane's `full` variant above — same --appbar-height fallback.
      true: { base: 'min-h-[calc(100dvh-var(--appbar-height,0px))]' },
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
