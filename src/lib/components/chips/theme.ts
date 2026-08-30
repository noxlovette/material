import { tv, type VariantProps } from 'tailwind-variants';

export type ChipVariants = VariantProps<typeof chip>;

export const chip = tv({
  slots: {
    base: 'md-component-button-base group inline-flex h-8 max-w-max items-center justify-center gap-2 rounded-sm before:rounded-sm px-4 md-sys-typescale-label-large font-medium',
    icon: 'shrink-0',
    label: '',
    trailing:
      'relative -mr-2 ml-1 inline-flex size-[18px] shrink-0 items-center justify-center rounded-full',
    checkIcon: 'size-4 shrink-0'
  },
  variants: {
    variant: {
      assist: '',
      filter: '',
      input: '',
      suggestion: ''
    },
    elevated: {
      true: '',
      false: ''
    },
    selected: {
      true: '',
      false: ''
    },
    disabled: {
      true: '',
      false: ''
    }
  },
  compoundVariants: [
    {
      elevated: false,
      selected: false,
      class: {
        base: 'bg-md-sys-color-surface text-md-sys-color-on-surface-variant outline outline-md-sys-color-outline-variant'
      }
    },
    {
      elevated: true,
      selected: false,
      class: {
        base: 'bg-md-sys-color-surface-container-low text-md-sys-color-on-surface-variant shadow-elevation-1 hover:shadow-elevation-2'
      }
    },
    {
      selected: true,
      class: {
        base: 'bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container'
      }
    },
    {
      variant: 'assist',
      selected: false,
      class: { icon: 'text-md-sys-color-primary' }
    },
    {
      disabled: true,
      class: {
        base: 'cursor-not-allowed bg-md-sys-color-on-surface/10 text-md-sys-color-on-surface/38 outline-md-sys-color-on-surface/12 hover:shadow-elevation-1',
        icon: 'text-md-sys-color-on-surface/38',
        trailing: 'text-md-sys-color-on-surface/38 pointer-events-none',
        checkIcon: 'text-md-sys-color-on-surface/38'
      }
    }
  ],
  defaultVariants: {
    variant: 'assist',
    elevated: false,
    selected: false,
    disabled: false
  }
});
