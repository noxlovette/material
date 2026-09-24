import { tv, type VariantProps } from '$lib/utils/tv.js';

export type TitleVariants = VariantProps<typeof title>;

export const title = tv({
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
    { size: 'small', emphasized: false, class: 'md-sys-typescale-title-small' },
    { size: 'small', emphasized: true, class: 'md-sys-typescale-emphasized-title-small' },
    { size: 'medium', emphasized: false, class: 'md-sys-typescale-title-medium' },
    { size: 'medium', emphasized: true, class: 'md-sys-typescale-emphasized-title-medium' },
    { size: 'large', emphasized: false, class: 'md-sys-typescale-title-large' },
    { size: 'large', emphasized: true, class: 'md-sys-typescale-emphasized-title-large' }
  ],
  defaultVariants: {
    emphasized: false,
    size: 'medium'
  }
});
