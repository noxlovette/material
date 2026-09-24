import { tv, type VariantProps } from '$lib/utils/tv.js';

export type KbdVariants = VariantProps<typeof kbd>;

export const kbd = tv({
  base: 'md-sys-typescale-emphasized-label-small text-md-sys-color-on-surface-variant',
  variants: {
    position: {
      absolute:
        'right-spacing-75 bottom-spacing-75 hidden md:absolute md:right-spacing-100 md:bottom-spacing-100 md:inline-flex',
      relative: ''
    }
  }
});
