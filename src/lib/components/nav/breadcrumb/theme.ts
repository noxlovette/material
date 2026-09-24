import { tv, type VariantProps } from 'tailwind-variants';

export type BreadcrumbVariants = VariantProps<typeof breadcrumb>;

export const breadcrumb = tv({
  slots: {
    base: 'flex',
    list: 'flex flex-wrap items-center gap-spacing-50',
    item: 'flex items-center gap-spacing-50',
    link: 'md-sys-typescale-label-large text-md-sys-color-on-surface-variant md-sys-state-focus-indicator relative inline-flex min-h-spacing-600 items-center rounded-full px-spacing-150 transition-colors md-sys-motion-fast-effects',
    text: 'md-sys-typescale-label-large text-md-sys-color-on-surface-variant px-spacing-50 py-spacing-25',
    current: 'md-sys-typescale-emphasized-label-large px-spacing-50 py-spacing-25',
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
