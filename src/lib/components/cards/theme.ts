import { tv } from '$lib/utils/tv.js';

export const card = tv({
  slots: {
    base: 'relative flex flex-col rounded-lg disabled:opacity-[0.38] disabled:bg-md-sys-color-surface-variant state-layer before:rounded-lg transition-shadow md-sys-motion-effects',
    icon: 'size-spacing-300 text-[24px] text-md-sys-color-primary'
  },
  variants: {
    type: {
      elevated: 'shadow-elevation-1 bg-md-sys-color-surface-container-low',
      filled: 'bg-md-sys-color-surface-container-high',
      outlined: 'bg-md-sys-color-surface outline-1 outline-md-sys-color-outline-variant'
    },
    padding: {
      none: { base: 'p-spacing-0' },
      sm: { base: 'p-spacing-150' },
      md: { base: 'p-spacing-200' },
      lg: { base: 'p-spacing-300' }
    },
    hoverable: {
      true: ''
    },
    selected: {
      true: 'outline-3 outline-md-sys-color-primary',
      false: 'focus:outline-3 focus:outline-md-sys-color-secondary'
    }
  },
  compoundVariants: [
    {
      type: 'elevated',
      hoverable: true,
      class: 'hover:shadow-elevation-2'
    },
    {
      type: 'filled',
      hoverable: true,
      class: 'hover:shadow-elevation-1'
    },
    {
      type: 'outlined',
      hoverable: true,
      class: 'hover:shadow-elevation-1'
    }
  ]
});
