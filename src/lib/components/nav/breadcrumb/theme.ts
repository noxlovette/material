import { tv, type VariantProps } from 'tailwind-variants';

export type BreadcrumbVariants = VariantProps<typeof breadcrumb>;

export const breadcrumb = tv({
  slots: {
    base: 'flex',
    list: 'flex flex-wrap items-center gap-1',
    item: 'flex items-center gap-1',
    link: 'md-sys-typescale-label-large text-md-sys-color-on-surface-variant md-sys-state-focus-indicator relative inline-flex min-h-12 items-center rounded-full px-3 transition-colors',
    text: 'md-sys-typescale-label-large text-md-sys-color-on-surface-variant px-1 py-0.5',
    current: 'md-sys-typescale-label-large font-bold px-1 py-0.5',
    separator: 'text-md-sys-color-on-surface-variant inline-flex shrink-0'
  },
  variants: {
    color: {
      primary: {
        current: 'text-md-sys-color-primary',
        link: 'hover:text-md-sys-color-primary'
      },
      secondary: {
        current: 'text-md-sys-color-secondary',
        link: 'hover:text-md-sys-color-secondary'
      },
      tertiary: {
        current: 'text-md-sys-color-tertiary',
        link: 'hover:text-md-sys-color-tertiary'
      },
      surface: {
        current: 'text-md-sys-color-on-surface',
        link: 'hover:text-md-sys-color-on-surface'
      }
    }
  },
  defaultVariants: {
    color: 'primary'
  }
});
