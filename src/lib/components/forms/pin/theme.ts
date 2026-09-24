import { tv, type VariantProps } from '$lib/utils/tv.js';

export type PinInputVariants = VariantProps<typeof pinInput>;

export const pinInput = tv({
  slots: {
    root: 'flex flex-col gap-spacing-100',
    label: 'md-sys-typescale-label-large text-md-sys-color-on-surface-variant',
    container: 'flex items-center gap-spacing-100',
    cell: `
      relative flex h-spacing-700 w-spacing-600 items-center justify-center
      bg-md-sys-color-surface-container-highest rounded-t-xs
      md-sys-typescale-headline-small text-md-sys-color-on-surface
      transition-colors md-sys-motion-fast-effects
      after:absolute after:bottom-spacing-0 after:left-spacing-0 after:right-spacing-0 after:h-px after:bg-md-sys-color-on-surface-variant
      after:transition-[height,background-color] after:md-sys-motion-fast-spatial
      data-[focus]:after:bg-md-sys-color-primary data-[focus]:after:h-[2px]
      data-[placeholder]:text-md-sys-color-on-surface-variant/38
    `,
    supportingText: 'md-sys-typescale-body-small text-md-sys-color-on-surface-variant'
  },
  variants: {
    error: {
      true: {
        cell: 'after:bg-md-sys-color-error data-[focus]:after:bg-md-sys-color-error',
        label: 'text-md-sys-color-error',
        supportingText: 'text-md-sys-color-error'
      }
    },
    disabled: {
      true: {
        cell: 'bg-md-sys-color-on-surface/4 after:bg-md-sys-color-on-surface/12 opacity-60 cursor-not-allowed'
      }
    }
  }
});
