import { tv, type VariantProps } from 'tailwind-variants';

export type ConnectedButtonGroupVariants = VariantProps<typeof connectedButtonGroup>;
export type ConnectedButtonGroupItemVariants = VariantProps<typeof connectedButtonGroupItem>;

export const connectedButtonGroup = tv({
  slots: {
    root: 'flex w-full items-stretch gap-0.5'
  },
  variants: {
    orientation: {
      horizontal: { root: 'flex-row' },
      vertical: { root: 'h-auto flex-col' }
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
});

export const connectedButtonGroupItem = tv({
  slots: {
    base: 'md-btn-connected layer-container state-layer relative inline-flex min-w-12 flex-1 items-center justify-center gap-2 bg-md-sys-color-surface-container-high px-4 md-sys-typescale-label-large text-md-sys-color-on-surface-variant outline-none disabled:cursor-not-allowed disabled:opacity-38 data-[state=on]:bg-md-sys-color-primary data-[state=on]:text-md-sys-color-on-primary',
    icon: 'size-[18px] text-[18px]'
  },
  variants: {
    size: {
      xs: { base: 'h-8 [--cbg-inner:0.25rem]' },
      sm: { base: 'h-10 [--cbg-inner:0.5rem]' },
      md: { base: 'h-14 [--cbg-inner:0.5rem]' },
      lg: { base: 'h-24 [--cbg-inner:1rem]' },
      xl: { base: 'h-34 [--cbg-inner:1.25rem]' }
    },
    shape: {
      round: { base: '[--cbg-outer:9999px]' },
      square: { base: '[--cbg-outer:var(--cbg-inner)]' }
    }
  },
  defaultVariants: {
    size: 'sm',
    shape: 'round'
  }
});
