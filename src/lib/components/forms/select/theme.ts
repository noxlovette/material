import { tv, type VariantProps } from 'tailwind-variants';

export type SelectVariants = VariantProps<typeof select>;

export const select = tv({
  slots: {
    root: 'relative w-full',
    base: `
      group w-full h-14 px-0 relative flex items-center
    `,
    trigger: `
      group peer w-full h-full flex items-center justify-between bg-transparent outline-none
      cursor-pointer
    `,
    inputWrapper: `
      relative flex-1 h-full px-4 flex items-center
    `,
    value: `
      w-full bg-transparent outline-none
      md-sys-typescale-body-large text-md-sys-color-on-surface
      disabled:text-md-sys-color-on-surface/38
      disabled:cursor-not-allowed
      truncate text-left
    `,
    leadingIcon: `
      text-md-sys-color-on-surface-variant size-6
      group-has-[[data-state=open]]:text-md-sys-color-primary
      group-data-[invalid]:text-md-sys-color-error ml-3 text-[24px]
    `,
    dropdownIcon: `
      mr-3 text-md-sys-color-on-surface-variant size-6
      group-data-[state=open]:text-md-sys-color-primary
      group-data-[invalid]:text-md-sys-color-error z-20 text-[24px]
      transition-transform duration-200
      group-data-[state=open]:rotate-180
    `,
    content: `
      z-[100] min-w-[var(--bits-select-trigger-width)] max-h-96 overflow-y-auto
      rounded-xl bg-md-sys-color-surface-container-high
      shadow-elevation-3 py-2 outline-none
    `,
    item: `
      relative flex w-full cursor-pointer select-none
      px-4 py-3 outline-none
      md-sys-typescale-body-large text-md-sys-color-on-surface
      hover:bg-md-sys-color-on-surface/8
      focus:bg-md-sys-color-on-surface/8
      data-[selected]:bg-md-sys-color-secondary-container
      data-[selected]:text-md-sys-color-on-secondary-container
      data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50
      transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl
    `,
    groupLabel: `
      px-4 py-2 md-sys-typescale-label-medium
      text-md-sys-color-primary
    `,
    separator: `
      -mx-1 my-1 h-px bg-md-sys-color-outline-variant
    `,
    supportingText: `
      px-4 pt-1 flex justify-between
      md-sys-typescale-body-small
      text-md-sys-color-on-surface-variant
      group-data-[invalid]:text-md-sys-color-error
    `
  },
  variants: {
    variant: {
      filled: {
        base: `
          bg-md-sys-color-surface-container-highest
          rounded-t-xs state-layer before:rounded-xs hover:before:bg-md-sys-color-on-surface/8
          after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-md-sys-color-on-surface-variant
          after:transition-[height,background-color] after:duration-200
          hover:after:bg-md-sys-color-on-surface
          has-[[data-state=open]]:after:bg-md-sys-color-primary
          has-[[data-state=open]]:after:h-[2px]
          disabled:bg-md-sys-color-on-surface/4
          disabled:after:bg-md-sys-color-on-surface/12
        `
      },
      outlined: {
        base: `
          rounded-xs border border-md-sys-color-outline
          transition-colors duration-150
          hover:border-md-sys-color-on-surface
          has-[[data-state=open]]:border-2 has-[[data-state=open]]:border-md-sys-color-primary
        `
      }
    },

    error: {
      true: {
        base: 'after:bg-md-sys-color-error has-[[data-state=open]]:after:bg-md-sys-color-error',
        supportingText: 'text-md-sys-color-error',
        leadingIcon: 'text-md-sys-color-error',
        trailingIcon: 'text-md-sys-color-error'
      }
    },
    disabled: {
      true: {
        root: 'cursor-not-allowed opacity-60'
      }
    }
  },

  compoundVariants: [
    {
      variant: 'outlined',
      error: true,
      class: {
        base: 'border-md-sys-color-error hover:border-md-sys-color-error has-[[data-state=open]]:border-md-sys-color-error'
      }
    },
    {
      variant: 'outlined',
      disabled: true,
      class: {
        base: 'border-md-sys-color-on-surface/12 hover:border-md-sys-color-on-surface/12'
      }
    }
  ],

  defaultVariants: {
    variant: 'outlined'
  }
});
