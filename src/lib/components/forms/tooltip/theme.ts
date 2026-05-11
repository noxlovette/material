import { tv, type VariantProps } from 'tailwind-variants';

export type TooltipVariants = VariantProps<typeof tooltip>;

export const tooltip = tv({
  slots: {
    base: 'min-w-60 py-3 px-4  shadow-elevation-2 rounded-md relative z-[100] pointer-events-auto',
    subhead: '',
    supportingText: '',
    trigger: 'relative inline-flex'
  },
  variants: {
    variant: {
      rich: {
        base: 'flex flex-col gap-3'
      },
      snack: {
        base: 'inlie-flex min-w-0 max-w-50 bg-md-sys-color-inverse-surface text-md-sys-color-inverse-on-surface md-sys-typescale-body-small px-3 py-2 shadow-elevation-3 before:rounded-md',
        supportingText: 'text-md-sys-color-inverse-on-surface md-sys-typescale-body-small',
        textContainer: ''
      }
    },
    style: {
      container: {
        base: 'bg-md-sys-color-surface-container',
        textContainer: 'text-md-sys-on-surface-variant'
      },
      primary: {
        base: 'bg-md-sys-color-primary-container',
        textContainer: 'text-md-sys-on-primary-container'
      },
      secondary: {
        base: 'bg-md-sys-color-secondary-container',
        textContainer: 'text-md-sys-on-secondary-container'
      },
      tertiary: {
        base: 'bg-md-sys-color-tertiary-container',
        textContainer: 'text-md-sys-on-tertiary-container'
      }
    }
  },
  compoundVariants: [
    {
      variant: 'snack',
      class: {
        base: 'bg-md-sys-color-inverse-surface text-md-sys-color-inverse-on-surface',
        textContainer: '',
        supportingText: 'text-md-sys-color-inverse-on-surface'
      }
    }
  ],
  defaultVariants: {
    variant: 'rich'
  }
});
