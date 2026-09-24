import { tv, type VariantProps } from 'tailwind-variants';

export type ToolbarVariants = VariantProps<typeof toolbar>;
export type ToolbarButtonVariants = VariantProps<typeof toolbarButton>;
export type ToolbarGroupItemVariants = VariantProps<typeof toolbarGroupItem>;

export const toolbar = tv({
  slots: {
    // Layout/position only — no paint. Holds one implicit `segment` by default, or,
    // with `sections`, whatever ToolbarSection/ToolbarSpacer children the consumer supplies.
    root: 'flex items-center gap-spacing-100',
    // The pill/bar surface itself — bg, shape, elevation, chrome padding. Toolbar renders
    // exactly one of these around `children` by default; ToolbarSection renders one per
    // cluster when `sections` splits the toolbar into independently painted groups.
    segment: 'inline-flex items-center gap-spacing-50 p-spacing-100 justify-between',
    group: 'inline-flex items-center gap-spacing-50',
    divider: 'shrink-0 bg-md-sys-color-outline-variant',
    // A marker gap between ToolbarSections under `sections` — same size as `root`'s own
    // `gap-spacing-100`, it does not grow, so it doesn't push sections apart to opposite edges.
    spacer: '',
    fabSlot: 'ml-auto flex items-center ps-spacing-100',
    ghost: 'h-spacing-800 w-full shrink-0 pointer-events-none'
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'flex-row',
        segment: 'flex-row h-13',
        group: 'flex-row',
        divider: 'mx-spacing-50 h-spacing-300 w-px'
      },
      vertical: {
        root: 'flex-col h-max',
        segment: 'flex-col w-spacing-700',
        group: 'flex-col',
        divider: 'my-spacing-50 h-px w-spacing-300'
      }
    },
    variant: {
      floating: { root: 'inline-flex', segment: 'rounded-full shadow-elevation-1' },
      docked: { root: 'fixed left-spacing-0 z-10 w-full', segment: 'w-full rounded-none' }
    },
    color: {
      standard: { segment: 'bg-md-sys-color-surface-container' },
      vibrant: { segment: 'bg-md-sys-color-secondary-container' }
    }
  },
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'floating',
    color: 'standard'
  }
});

export const toolbarButton = tv({
  slots: {
    base: 'layer-container state-layer before:rounded-full relative inline-flex size-spacing-500 items-center justify-center rounded-full outline-none transition-colors md-sys-motion-fast-effects disabled:cursor-not-allowed disabled:opacity-38',
    icon: 'size-spacing-250 text-[20px]'
  },
  variants: {
    color: {
      standard: { base: 'text-md-sys-color-on-surface-variant' },
      vibrant: { base: 'text-md-sys-color-on-secondary-container' }
    }
  },
  defaultVariants: { color: 'standard' }
});

export const toolbarGroupItem = tv({
  slots: {
    base: 'layer-container state-layer before:rounded-full relative inline-flex size-spacing-500 items-center justify-center rounded-full outline-none transition-colors md-sys-motion-fast-effects disabled:cursor-not-allowed disabled:opacity-38',
    icon: 'size-spacing-250 text-[20px]'
  },
  variants: {
    color: {
      standard: {
        base: 'text-md-sys-color-on-surface-variant data-[state=on]:bg-md-sys-color-secondary-container data-[state=on]:text-md-sys-color-on-secondary-container'
      },
      vibrant: {
        // inverted: selected uses on-secondary-container as bg so it pops against the secondary-container toolbar
        base: 'text-md-sys-color-on-secondary-container data-[state=on]:bg-md-sys-color-on-secondary-container data-[state=on]:text-md-sys-color-secondary-container'
      }
    }
  },
  defaultVariants: { color: 'standard' }
});
