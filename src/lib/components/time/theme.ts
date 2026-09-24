import { tv, type VariantProps } from '$lib/utils/tv.js';

export type TimepickerVariants = VariantProps<typeof timepicker>;

export const timepicker = tv({
  slots: {
    base: 'bg-md-sys-color-surface-container-high shadow-elevation-3 rounded-xl max-w-fit p-spacing-300 group relative',
    clockDiv: 'flex gap-spacing-100 mb-spacing-300 mt-spacing-250',
    buttonDiv: 'items-center flex justify-between -mb-spacing-200 -mx-spacing-250',
    headline: 'text-md-sys-color-on-surface-variant md-sys-typescale-label-medium',
    inputWrapper: 'space-y-spacing-100',
    fieldSeparator: 'text-md-sys-color-on-surface md-sys-typescale-display-large ',
    timeInput:
      'bg-md-sys-color-surface-container-highest rounded-sm outline outline-md-sys-color-outline w-24 h-spacing-900 md-sys-typescale-display-medium text-md-sys-color-on-surface hover:text-md-sys-color-on-surface state-layer before:bg-md-sys-color-on-surface/8 md-sys-state-focus-indicator inline-flex items-center justify-center cursor-text focus:text-md-sys-color-on-primary-container focus:outline-md-sys-color-primary focus:bg-md-sys-color-primary-container relative',
    timeInputSupportingText: 'text-md-sys-color-on-surface-variant md-sys-typescale-body-small'
  }
});
