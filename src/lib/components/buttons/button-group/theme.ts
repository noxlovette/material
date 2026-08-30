import { tv, type VariantProps } from 'tailwind-variants';

export type ButtonGroupVariants = VariantProps<typeof buttonGroup>;

export const buttonGroup = tv({
  slots: {
    root: 'md-btn-group-standard'
  },
  variants: {
    orientation: {
      horizontal: { root: 'flex-row' },
      vertical: { root: 'flex-col' }
    },
    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {}
    }
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'sm'
  }
});
