import { tv, type VariantProps } from 'tailwind-variants';

export type ToolbarVariants = VariantProps<typeof toolbar>;
export type ToolbarButtonVariants = VariantProps<typeof toolbarButton>;
export type ToolbarGroupItemVariants = VariantProps<typeof toolbarGroupItem>;

export const toolbar = tv({
  slots: {
    root: 'items-center gap-0.5 px-2',
    group: 'inline-flex items-center gap-0.5',
    divider: 'shrink-0 bg-md-sys-color-outline-variant',
    fabSlot: 'ml-auto flex items-center ps-2'
  },
  variants: {
    orientation: {
      horizontal: { root: 'flex-row', divider: 'mx-1 h-6 w-px' },
      vertical: { root: 'flex-col h-auto w-14 py-2 px-1', divider: 'my-1 h-px w-6' }
    },
    variant: {
      floating: { root: 'inline-flex rounded-2xl shadow-elevation-1 py-1' },
      docked: { root: 'flex w-full rounded-none py-3' }
    },
    color: {
      standard: { root: 'bg-md-sys-color-surface-container' },
      vibrant: { root: 'bg-md-sys-color-secondary-container' }
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
    base: 'layer-container state-layer before:rounded-full relative inline-flex size-10 items-center justify-center rounded-full outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-38',
    icon: 'size-5 text-[20px]'
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
    base: 'layer-container state-layer before:rounded-full relative inline-flex size-10 items-center justify-center rounded-full outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-38',
    icon: 'size-5 text-[20px]'
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
