import { tv, type VariantProps } from 'tailwind-variants';

export type HrVariants = VariantProps<typeof hr>;

export const hr = tv({
  base: 'bg-md-sys-color-outline-variant',
  variants: {
    orientation: {
      horizontal: 'h-[1px] mt-spacing-50 mb-spacing-100 w-full',
      vertical: 'w-[1px] self-stretch min-h-[1em]'
    },
    variant: {
      inset: 'mr-spacing-100 ml-spacing-200',
      full: '',
      wavy: ''
    }
  }
});
