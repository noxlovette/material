import { tv, type VariantProps } from 'tailwind-variants';

export type SnackBarVariants = VariantProps<typeof snackbar>;

export const snackbar = tv({
  slots: {
    base: 'rounded-xs relative min-h-12 md:max-h-17 flex z-[100] items-center bg-md-sys-color-inverse-surface shadow-elevation-3 pr-2 pl-4 justify-between h-max py-3',
    label: 'text-md-sys-color-inverse-primary md-sys-typescale-label-large px-3 cursor-pointer ',
    actionWrapper: 'flex items-center z-40',
    supportingText:
      'text-md-sys-color-inverse-on-surface md-sys-typescale-body-medium max-w-[60ch] ',
    icon: 'size-6 text-[24px] text-md-sys-color-inverse-on-surface mr-1 ml-3'
  },
  variants: {
    fixed: {
      true: 'fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2',
      false: ''
    }
  }
});
