import { tv, type VariantProps } from 'tailwind-variants';

export type SnackBarVariants = VariantProps<typeof snackbar>;

export const snackbar = tv({
  slots: {
    base: 'rounded-xs relative min-h-spacing-600 md:max-h-17 flex z-[100] items-center bg-md-sys-color-inverse-surface shadow-elevation-3 pr-spacing-100 pl-spacing-200 justify-between h-max py-spacing-150',
    label:
      'text-md-sys-color-inverse-primary md-sys-typescale-label-large px-spacing-150 cursor-pointer ',
    actionWrapper: 'flex items-center z-40',
    supportingText:
      'text-md-sys-color-inverse-on-surface md-sys-typescale-body-medium max-w-[60ch] ',
    icon: 'size-spacing-300 text-[24px] text-md-sys-color-inverse-on-surface mr-spacing-50 ml-spacing-150'
  },
  variants: {
    fixed: {
      true: 'fixed bottom-20 md:bottom-spacing-300 left-1/2 -translate-x-1/2',
      false: ''
    }
  }
});
