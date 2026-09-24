import { tv } from 'tailwind-variants';

export const label = tv({
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
    { size: 'small', emphasized: false, class: 'md-sys-typescale-label-small' },
    { size: 'small', emphasized: true, class: 'md-sys-typescale-emphasized-label-small' },
    { size: 'medium', emphasized: false, class: 'md-sys-typescale-label-medium' },
    { size: 'medium', emphasized: true, class: 'md-sys-typescale-emphasized-label-medium' },
    { size: 'large', emphasized: false, class: 'md-sys-typescale-label-large' },
    { size: 'large', emphasized: true, class: 'md-sys-typescale-emphasized-label-large' }
  ],
  defaultVariants: {
    emphasized: false,
    size: 'medium'
  }
});
