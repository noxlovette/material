import { tv, type VariantProps } from 'tailwind-variants';

export type ButtonGroupVariants = VariantProps<typeof buttonGroup>;
export type ButtonGroupItemVariants = VariantProps<typeof buttonGroupItem>;

export const buttonGroup = tv({
  slots: {
    root: 'inline-flex overflow-hidden border border-md-sys-color-outline'
  },
  variants: {
    orientation: {
      horizontal: { root: 'flex-row' },
      vertical: { root: 'flex-col h-auto w-auto' }
    },
    shape: {
      round: { root: 'rounded-full' },
      square: { root: 'rounded-lg' }
    },
    size: {
      xs: { root: 'h-8' },
      sm: { root: 'h-10' },
      md: { root: 'h-14' },
      lg: { root: 'h-24' }
    }
  },
  compoundVariants: [
    {
      orientation: 'vertical',
      class: { root: 'h-auto w-auto rounded-2xl' }
    }
  ],
  defaultVariants: {
    orientation: 'horizontal',
    shape: 'round',
    size: 'sm'
  }
});

export const buttonGroupItem = tv({
  slots: {
    base: 'layer-container state-layer relative inline-flex min-w-12 flex-1 items-center justify-center gap-2 px-4 md-sys-typescale-label-large text-md-sys-color-on-surface outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-38 data-[state=on]:bg-md-sys-color-secondary-container data-[state=on]:text-md-sys-color-on-secondary-container',
    checkIcon: 'size-[18px] text-[18px]',
    icon: 'size-[18px] text-[18px]'
  },
  variants: {
    orientation: {
      horizontal: {
        base: '[&:not(:last-child)]:border-r [&:not(:last-child)]:border-md-sys-color-outline'
      },
      vertical: {
        base: '[&:not(:last-child)]:border-b [&:not(:last-child)]:border-md-sys-color-outline'
      }
    }
  },
  defaultVariants: { orientation: 'horizontal' }
});
