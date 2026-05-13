import { tv, type VariantProps } from 'tailwind-variants';

export type PillVariants = VariantProps<typeof pill>;

export const pill = tv({
  base: 'relative inline-flex items-center justify-center px-4 py-1.5 md-sys-typescale-label-large select-none rounded-full',
  variants: {
    variant: {
      primary: 'md-component-button-filled-primary',
      secondary: 'md-component-button-filled-secondary',
      tertiary: 'md-component-button-filled-tertiary',
      error: 'md-component-button-filled-error',
      container: 'bg-md-sys-color-surface-container text-md-sys-color-on-surface',
      yellow: 'bg-yellow-400 text-yellow-950 dark:bg-yellow-300 dark:text-yellow-950',
      green: 'bg-green-600 text-white dark:bg-green-500 dark:text-green-950'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
});
