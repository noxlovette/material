import { tv, type VariantProps } from 'tailwind-variants';

export const checkbox = tv({
  slots: {
    root: 'group inline-flex min-h-10 select-none items-start gap-3 text-md-sys-color-on-surface min-h-4.5 cursor-pointer',
    container: 'relative inline-flex size-[18px] shrink-0',
    control:
      'layer-container absolute -inset-[11px] rounded-full text-md-sys-color-on-surface-variant state-layer before:rounded-full group-focus-visible:outline group-focus-visible:outline-3 group-focus-visible:outline-offset-2 group-focus-visible:outline-md-sys-color-secondary transition-colors duration-[var(--md-sys-motion-duration-fast)] ease-[var(--md-sys-motion-timing-function)]',
    box: 'absolute inset-[11px] rounded-[4px] border-2 border-current bg-md-sys-color-surface transition-colors duration-[var(--md-sys-motion-duration-fast)] ease-[var(--md-sys-motion-timing-function)]',
    checkIcon:
      'pointer-events-none absolute inset-0 m-auto size-3.5 text-md-sys-color-on-primary opacity-0 scale-75',
    indeterminateIcon:
      'pointer-events-none absolute inset-0 m-auto block h-0.5 w-3 rounded-full bg-md-sys-color-on-primary opacity-0 scale-75',
    label: 'md-sys-typescale-body-large leading-5 text-md-sys-color-on-surface cursor-pointer'
  },
  variants: {
    state: {
      unchecked: {},
      checked: {
        control: 'text-md-sys-color-primary',
        box: 'bg-md-sys-color-primary',
        checkIcon: 'opacity-100 scale-100'
      },
      indeterminate: {
        control: 'text-md-sys-color-primary',
        box: 'bg-md-sys-color-primary',
        indeterminateIcon: 'opacity-100 scale-100'
      }
    },
    error: {
      true: {
        control: 'text-md-sys-color-error group-focus-visible:outline-md-sys-color-error',
        box: 'border-md-sys-color-error',
        label: 'text-md-sys-color-error',
        supporting: 'text-md-sys-color-error'
      }
    },
    align: {
      start: 'items-start',
      center: 'items-center'
    },
    disabled: {
      true: {
        root: 'cursor-not-allowed',
        control: 'text-md-sys-color-on-surface/38 before:hidden',
        box: 'border-md-sys-color-on-surface/38',
        checkIcon: 'text-md-sys-color-on-surface/38',
        indeterminateIcon: 'bg-md-sys-color-on-surface/38',
        label: 'text-md-sys-color-on-surface/38',
        supporting: 'text-md-sys-color-on-surface/38'
      }
    }
  },
  compoundVariants: [
    {
      state: 'checked',
      error: true,
      class: {
        box: 'bg-md-sys-color-error',
        checkIcon: 'text-md-sys-color-on-error'
      }
    },
    {
      state: 'indeterminate',
      error: true,
      class: {
        box: 'bg-md-sys-color-error',
        indeterminateIcon: 'bg-md-sys-color-on-error'
      }
    },
    {
      state: 'checked',
      disabled: true,
      class: {
        control: 'text-md-sys-color-on-surface/38',
        box: 'bg-md-sys-color-on-surface/38 border-transparent',
        checkIcon: 'text-md-sys-color-surface'
      }
    },
    {
      state: 'indeterminate',
      disabled: true,
      class: {
        control: 'text-md-sys-color-on-surface/38',
        box: 'bg-md-sys-color-on-surface/38 border-transparent',
        indeterminateIcon: 'bg-md-sys-color-surface'
      }
    }
  ],
  defaultVariants: {
    state: 'unchecked',
    align: 'start'
  }
});

export type CheckboxM3Variants = VariantProps<typeof checkbox>;
