import { tv, type VariantProps } from '$lib/utils/tv.js';

export type TabVariants = VariantProps<typeof tab>;
export type TabHolderVariants = VariantProps<typeof tabHolder>;

export const tabHolder = tv({
  slots: {
    base: 'relative flex w-full bg-md-sys-color-surface',
    bar: 'absolute bottom-spacing-0 h-[3px] rounded-t-full bg-md-sys-color-primary transition-transform md-sys-motion-fast-spatial'
  },
  variants: {
    rounded: {
      true: { base: 'rounded-t-md' },
      false: {}
    }
  }
});

export const tab = tv({
  slots: {
    base: [
      'relative flex w-full cursor-pointer flex-col items-center justify-center',
      'data-[state=active]:text-md-sys-color-primary',
      'data-[state=inactive]:text-md-sys-color-on-surface-variant'
    ].join(' '),
    label: 'md-sys-typescale-title-small',
    icon: 'size-spacing-300 text-[24px]'
  },
  variants: {
    variant: {
      primary: {
        base: 'h-spacing-800 gap-spacing-50 py-spacing-150'
      },
      secondary: {
        base: 'h-spacing-600 py-spacing-150',
        icon: 'hidden'
      }
    },
    disabled: {
      true: {
        base: 'cursor-not-allowed opacity-38'
      }
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
});
