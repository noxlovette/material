import { tv, type VariantProps } from 'tailwind-variants';

export type HeadlineVariants = VariantProps<typeof headline>;

export const headline = tv({
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
    { size: 'small', emphasized: false, class: 'md-sys-typescale-headline-small' },
    { size: 'small', emphasized: true, class: 'md-sys-typescale-emphasized-headline-small' },
    { size: 'medium', emphasized: false, class: 'md-sys-typescale-headline-medium' },
    { size: 'medium', emphasized: true, class: 'md-sys-typescale-emphasized-headline-medium' },
    { size: 'large', emphasized: false, class: 'md-sys-typescale-headline-large' },
    { size: 'large', emphasized: true, class: 'md-sys-typescale-emphasized-headline-large' }
  ],
  defaultVariants: {
    emphasized: false,
    size: 'medium'
  }
});
