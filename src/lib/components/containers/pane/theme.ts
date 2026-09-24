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
  small: {
    none: 'gap-spacing-0',
    sm: 'gap-spacing-100',
    md: 'gap-spacing-150',
    lg: 'gap-spacing-200',
    xl: 'gap-spacing-300'
  },
  medium: {
    none: 'md:gap-spacing-0',
    sm: 'md:gap-spacing-100',
    md: 'md:gap-spacing-150',
    lg: 'md:gap-spacing-200',
    xl: 'md:gap-spacing-300'
  },
  large: {
    none: 'lg:gap-spacing-0',
    sm: 'lg:gap-spacing-100',
    md: 'lg:gap-spacing-150',
    lg: 'lg:gap-spacing-200',
    xl: 'lg:gap-spacing-300'
  },
  extraLarge: {
    none: 'xl:gap-spacing-0',
    sm: 'xl:gap-spacing-100',
    md: 'xl:gap-spacing-150',
    lg: 'xl:gap-spacing-200',
    xl: 'xl:gap-spacing-300'
  }
};

const paddingClasses: Record<Breakpoint, Record<SpaceSize, string>> = {
  small: {
    none: 'p-spacing-0',
    sm: 'p-spacing-150',
    md: 'p-spacing-200',
    lg: 'p-spacing-300',
    xl: 'p-spacing-400'
  },
  medium: {
    none: 'md:p-spacing-0',
    sm: 'md:p-spacing-150',
    md: 'md:p-spacing-200',
    lg: 'md:p-spacing-300',
    xl: 'md:p-spacing-400'
  },
  large: {
    none: 'lg:p-spacing-0',
    sm: 'lg:p-spacing-150',
    md: 'lg:p-spacing-200',
    lg: 'lg:p-spacing-300',
    xl: 'lg:p-spacing-400'
  },
  extraLarge: {
    none: 'xl:p-spacing-0',
    sm: 'xl:p-spacing-150',
    md: 'xl:p-spacing-200',
    lg: 'xl:p-spacing-300',
    xl: 'xl:p-spacing-400'
  }
};

const marginClasses: Record<Breakpoint, Record<SpaceSize, string>> = {
  small: {
    none: 'm-spacing-0',
    sm: 'm-spacing-150',
    md: 'm-spacing-200',
    lg: 'm-spacing-300',
    xl: 'm-spacing-400'
  },
  medium: {
    none: 'md:m-spacing-0',
    sm: 'md:m-spacing-150',
    md: 'md:m-spacing-200',
    lg: 'md:m-spacing-300',
    xl: 'md:m-spacing-400'
  },
  large: {
    none: 'lg:m-spacing-0',
    sm: 'lg:m-spacing-150',
    md: 'lg:m-spacing-200',
    lg: 'lg:m-spacing-300',
    xl: 'lg:m-spacing-400'
  },
  extraLarge: {
    none: 'xl:m-spacing-0',
    sm: 'xl:m-spacing-150',
    md: 'xl:m-spacing-200',
    lg: 'xl:m-spacing-300',
    xl: 'xl:m-spacing-400'
  }
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
    base: 'relative flex min-w-spacing-0 flex-col box-border overflow-clip items-center',
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
      none: { content: 'p-spacing-0' },
      sm: { content: 'px-spacing-150 md:px-spacing-200 py-spacing-100 md:py-spacing-150' },
      md: {
        content:
          'px-spacing-200 md:px-spacing-300 lg:px-spacing-400 py-spacing-150 md:py-spacing-200 lg:py-spacing-300'
      },
      lg: {
        content:
          'px-spacing-300 md:px-spacing-400 lg:px-spacing-600 py-spacing-200 md:py-spacing-300 lg:py-spacing-400'
      }
    },
    gap: {
      none: { content: 'gap-spacing-0' },
      sm: { content: 'gap-spacing-100' },
      md: { content: 'gap-spacing-150' },
      lg: { content: 'gap-spacing-200' },
      xl: { content: 'gap-spacing-300' }
    },
    flexible: {
      true: { base: 'min-w-spacing-0 grow basis-spacing-0' },
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
    base: 'group relative flex shrink-0 w-spacing-150 self-stretch cursor-col-resize touch-none items-center justify-center rounded-full bg-transparent outline-none hover:bg-md-sys-color-outline/20 focus-visible:outline-2 focus-visible:outline-md-sys-color-secondary',
    // Size is sprung inline by PaneHandle.svelte; only color transitions here.
    grip: 'rounded-full transition-colors md-sys-motion-effects'
  },
  variants: {
    dragging: {
      true: { base: 'bg-md-sys-color-outline/20' },
      false: ''
    },
    snapped: {
      true: { grip: 'bg-md-sys-color-tertiary' },
      false: {
        grip: 'bg-md-sys-color-on-surface-variant/40 group-hover:bg-md-sys-color-primary'
      }
    }
  }
});

/**
 * A floating panel positioned by `x`/`y` instead of participating in flex
 * layout — dragged into place by its header rather than resized in place
 * like `PaneHandle`/`Pane`.
 */
/** The eight `PaneHandle`-style directions a `DraggablePane` can be resized from. */
export type ResizeEdge = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

/** Corner a collapsed `DraggablePane` docks its mini pill to. */
export type MinimizedCorner = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

export const draggablePane = tv({
  slots: {
    base: 'fixed z-[100] flex min-w-72 flex-col rounded-md bg-md-sys-color-surface-container-highest shadow-elevation-3 transition-shadow md-sys-motion-effects',
    headerBar:
      'relative flex shrink-0 items-center gap-spacing-100 rounded-t-2xl px-spacing-150 py-spacing-100 touch-none select-none md-sys-state-focus-indicator',
    grip: 'shrink-0 text-md-sys-color-on-surface-variant',
    headline: 'flex-1 truncate md-sys-typescale-title-small text-md-sys-color-on-surface',
    actions: 'flex shrink-0 items-center gap-spacing-50',
    content:
      'flex flex-1 flex-col min-h-spacing-0 min-w-spacing-0 overflow-auto p-spacing-200 pt-spacing-100',
    resizeHandle: 'absolute touch-none',
    miniBase:
      'fixed z-[100] flex cursor-pointer items-center gap-spacing-100 rounded-full bg-md-sys-color-surface-container-high px-spacing-200 py-spacing-100 shadow-elevation-2 md-sys-state-focus-indicator hover:shadow-elevation-3',
    miniIcon: 'shrink-0 text-md-sys-color-on-surface-variant',
    miniLabel: 'md-sys-typescale-label-large max-w-48 truncate text-md-sys-color-on-surface'
  },
  variants: {
    dragging: {
      true: { base: 'shadow-elevation-4 cursor-grabbing', headerBar: 'cursor-grabbing' },
      false: { headerBar: 'cursor-grab' }
    },
    disableDrag: {
      true: { headerBar: 'cursor-default' },
      false: ''
    },
    edge: {
      n: {
        resizeHandle:
          'top-spacing-0 inset-x-spacing-150 h-spacing-75 -translate-y-1/2 cursor-ns-resize'
      },
      s: {
        resizeHandle:
          'bottom-spacing-0 inset-x-spacing-150 h-spacing-75 translate-y-1/2 cursor-ns-resize'
      },
      e: {
        resizeHandle:
          'right-spacing-0 inset-y-spacing-150 w-spacing-75 translate-x-1/2 cursor-ew-resize'
      },
      w: {
        resizeHandle:
          'left-spacing-0 inset-y-spacing-150 w-spacing-75 -translate-x-1/2 cursor-ew-resize'
      },
      ne: {
        resizeHandle:
          'top-spacing-0 right-spacing-0 size-spacing-150 -translate-y-1/2 translate-x-1/2 cursor-nesw-resize'
      },
      nw: {
        resizeHandle:
          'top-spacing-0 left-spacing-0 size-spacing-150 -translate-y-1/2 -translate-x-1/2 cursor-nwse-resize'
      },
      se: {
        resizeHandle:
          'bottom-spacing-0 right-spacing-0 size-spacing-150 translate-y-1/2 translate-x-1/2 cursor-nwse-resize'
      },
      sw: {
        resizeHandle:
          'bottom-spacing-0 left-spacing-0 size-spacing-150 translate-y-1/2 -translate-x-1/2 cursor-nesw-resize'
      }
    },
    corner: {
      'bottom-left': { miniBase: 'bottom-spacing-200 left-spacing-200' },
      'bottom-right': { miniBase: 'bottom-spacing-200 right-spacing-200' },
      'top-left': { miniBase: 'top-spacing-200 left-spacing-200' },
      'top-right': { miniBase: 'top-spacing-200 right-spacing-200' }
    }
  },
  defaultVariants: {
    dragging: false,
    disableDrag: false,
    corner: 'bottom-left'
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
