import { tv, type VariantProps } from 'tailwind-variants';

export type BodyVariants = VariantProps<typeof body>;

export const body = tv({
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
    { size: 'small', emphasized: false, class: 'md-sys-typescale-body-small' },
    { size: 'small', emphasized: true, class: 'md-sys-typescale-emphasized-body-small' },
    { size: 'medium', emphasized: false, class: 'md-sys-typescale-body-medium' },
    { size: 'medium', emphasized: true, class: 'md-sys-typescale-emphasized-body-medium' },
    { size: 'large', emphasized: false, class: 'md-sys-typescale-body-large' },
    { size: 'large', emphasized: true, class: 'md-sys-typescale-emphasized-body-large' }
  ],
  defaultVariants: {
    emphasized: false,
    size: 'medium'
  }
});
