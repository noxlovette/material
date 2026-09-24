import { tv, type VariantProps } from 'tailwind-variants';

export type DisplayVariants = VariantProps<typeof display>;

export const display = tv({
  base: '',
  variants: {
    // `emphasized` swaps in the M3 emphasized style of the same size (heavier weight, same
    // metrics). The class is picked in compoundVariants so only one typescale class is ever set.
    emphasized: {
      true: '',
      false: ''
    },
    size: {
      small: '',
      medium: '',
      large: ''
    }
  },
  compoundVariants: [
    { size: 'small', emphasized: false, class: 'md-sys-typescale-display-small' },
    { size: 'small', emphasized: true, class: 'md-sys-typescale-emphasized-display-small' },
    { size: 'medium', emphasized: false, class: 'md-sys-typescale-display-medium' },
    { size: 'medium', emphasized: true, class: 'md-sys-typescale-emphasized-display-medium' },
    { size: 'large', emphasized: false, class: 'md-sys-typescale-display-large' },
    { size: 'large', emphasized: true, class: 'md-sys-typescale-emphasized-display-large' }
  ],
  defaultVariants: {
    emphasized: false,
    size: 'medium'
  }
});
