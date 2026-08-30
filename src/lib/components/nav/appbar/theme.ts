import { tv, type VariantProps } from 'tailwind-variants';

export type AppbarVariants = VariantProps<typeof appbar>;

export const appbar = tv({
  slots: {
    base: 'fixed top-0 left-0 w-full flex flex-col z-30',
    row: 'h-16 py-1 flex w-full items-center justify-between',
    childrenRow: 'w-full px-2 pb-2',
    ghost: 'w-full shrink-0 pointer-events-none',
    textContainer: 'flex flex-col items-start gap-0.5 grow',
    title: 'text-md-sys-color-on-surface md-sys-typescale-title-large line-clamp-1   capitalize ',
    subtitle: 'text-md-sys-color-on-surface-variant md-sys-typescale-label-medium',
    leading: 'text-md-sys-color-on-surface ml-0.5',
    trailing: 'text-md-sys-color-on-surface-variant mr-4 md:mr-6 lg:mr-8'
  },
  variants: {
    scrolled: {
      true: { base: 'shadow-elevation-1 bg-md-sys-color-surface-container' },
      false: {
        base: 'shadow-elevation-0 bg-md-sys-color-surface md:bg-md-sys-color-surface-container'
      }
    },
    searchContainer: {
      true: '',
      false: ''
    },
    noTrailing: {
      true: {
        textContainer: 'pr-4 md:pr-6 lg:pr-8'
      },
      false: ''
    },
    noLeading: {
      true: {
        textContainer: 'pl-4 md:pl-6 lg:pl-8'
      },
      false: ''
    }
  }
});
