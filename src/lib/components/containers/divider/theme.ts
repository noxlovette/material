import { tv, type VariantProps } from 'tailwind-variants';

export type HrVariants = VariantProps<typeof hr>;

export const hr = tv({
  base: 'bg-md-sys-color-outline-variant',
  variants: {
    orientation: {
      horizontal: 'h-[1px] mt-1 mb-2 w-full',
      vertical: 'w-[1px] self-stretch min-h-[1em]'
    },
    variant: {
      inset: 'mr-2 ml-4',
      full: '',
      wavy: ''
    }
  }
});
