import { tv, type VariantProps } from 'tailwind-variants';

export type BodyVariants = VariantProps<typeof body>;

export const body = tv({
  base: '',
  variants: {
    emphasized: {
      true: 'font-medium'
    },
    size: {
      small: 'md-sys-typescale-body-small',
      medium: 'md-sys-typescale-body-medium',
      large: 'md-sys-typescale-body-large'
    }
  }
});
