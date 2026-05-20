import { tv } from 'tailwind-variants';

export const label = tv({
  base: '',
  variants: {
    emphasized: {
      true: 'font-semibold'
    },
    size: {
      small: 'md-sys-typescale-label-small',
      medium: 'md-sys-typescale-label-medium',
      large: 'md-sys-typescale-label-large'
    }
  }
});
