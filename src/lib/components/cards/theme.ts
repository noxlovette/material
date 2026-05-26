import { tv } from 'tailwind-variants';

export const card = tv({
  slots: {
    base: 'relative flex flex-col rounded-lg disabled:opacity-[0.38] disabled:bg-sys-color-surface-variant state-layer before:rounded-lg focus:outline-3 focus:outline-md-sys-color-secondary [transition:box-shadow_var(--md-sys-motion-duration,200ms)_var(--md-sys-motion-timing-function,cubic-bezier(0.34,0.8,0.34,1))]',
    icon: 'size-6 text-[24px] text-md-sys-color-primary'
  },
  variants: {
    type: {
      elevated: 'shadow-elevation-1 bg-md-sys-color-surface-container-low',
      filled: 'bg-md-sys-color-surface-container-high',
      outlined: 'bg-md-sys-color-surface outline-1 outline-md-sys-color-outline-variant'
    },
    padding: {
      none: { base: 'p-0' },
      sm: { base: 'p-3' },
      md: { base: 'p-4' },
      lg: { base: 'p-6' }
    },
    hoverable: {
      true: ''
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
