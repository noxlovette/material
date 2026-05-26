import { tv, type VariantProps } from 'tailwind-variants';

export type AppbarVariants = VariantProps<typeof appbar>;

export const appbar = tv({
  slots: {
    base: 'h-16 py-1 fixed top-0 left-0 w-full md:hidden flex z-40 items-center justify-between',
    ghost: 'h-16 w-full shrink-0 md:hidden pointer-events-none',
    textContainer: 'flex flex-col items-start gap-0.5 grow',
    title: 'text-md-sys-color-on-surface md-sys-typescale-title-large line-clamp-1   capitalize ',
    subtitle: 'text-md-sys-color-on-surface-variant md-sys-typescale-label-medium',
    leading: 'text-md-sys-color-on-surface ml-0.5',
    trailing: 'text-md-sys-color-on-surface-variant mr-4'
  },
  variants: {
    scrolled: {
      true: { base: 'shadow-elevation-2 bg-md-sys-color-surface-container' },
      false: { base: 'shadow-elevation-0 bg-md-sys-color-surface' }
    },
    searchContainer: {
      true: '',
      false: ''
    },
    noTrailing: {
      true: {
        textContainer: 'pr-2'
      },
      false: ''
    },
    noLeading: {
      true: {
        textContainer: 'pl-6'
      },
      false: ''
    }
  }
});
