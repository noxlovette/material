import { tv } from '$lib/utils/tv.js';

export const avatar = tv({
  slots: {
    root: 'relative flex aspect-square shrink-0 items-center justify-center overflow-hidden rounded-full',
    image: 'h-full w-full object-cover',
    fallback:
      'flex h-full w-full items-center justify-center rounded-full bg-md-sys-color-surface-container-highest',
    button:
      'relative rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-md-sys-color-primary'
  },
  variants: {
    size: {
      xxs: {
        root: 'size-spacing-250'
      },
      xs: {
        root: 'size-spacing-400'
      },
      sm: {
        root: 'size-spacing-600'
      },
      md: {
        root: 'size-spacing-900'
      },
      lg: {
        root: 'size-24'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
