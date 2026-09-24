import { tv, type VariantProps } from '$lib/utils/tv.js';

export const radioGroup = tv({
  slots: {
    root: 'flex',
    item: 'inline-flex min-h-spacing-500 cursor-pointer select-none items-center gap-spacing-150 text-md-sys-color-on-surface',
    indicator: 'relative inline-flex  size-[20px] shrink-0',
    control:
      'relative layer-container absolute -inset-[10px] rounded-full text-md-sys-color-on-surface-variant state-layer before:rounded-full',
    outerRing:
      'absolute inset-spacing-0 rounded-full border-2 border-md-sys-color-outline transition-colors md-sys-motion-fast-effects',
    innerDot:
      'absolute inset-spacing-0 m-auto size-spacing-125 scale-0 rounded-full bg-md-sys-color-on-primary-container transition-transform md-sys-motion-fast-spatial',
    label: 'md-sys-typescale-body-large text-md-sys-color-on-surface',
    supporting: 'md-sys-typescale-body-medium text-md-sys-color-on-surface-variant'
  },
  variants: {
    orientation: {
      vertical: { root: 'flex-col gap-spacing-50' },
      horizontal: { root: 'flex-row flex-wrap gap-spacing-300' }
    },
    checked: {
      true: {
        control: 'text-md-sys-color-primary',
        innerDot: 'scale-100',
        outerRing: 'border-md-sys-color-primary'
      },
      false: {}
    },
    disabled: {
      true: {
        item: 'cursor-not-allowed',
        control: 'text-md-sys-color-on-surface/38 before:hidden',
        outerRing: 'border-md-sys-color-on-surface/38',
        innerDot: 'bg-md-sys-color-on-surface/38',
        label: 'text-md-sys-color-on-surface/38',
        supporting: 'text-md-sys-color-on-surface/38'
      }
    },
    error: {
      true: {
        control: 'text-md-sys-color-error',
        label: 'text-md-sys-color-error',
        supporting: 'text-md-sys-color-error'
      }
    }
  },
  defaultVariants: {
    orientation: 'vertical',
    checked: false
  }
});

export type RadioGroupVariants = VariantProps<typeof radioGroup>;
