import { tv, type VariantProps } from '$lib/utils/tv.js';

export type SelectVariants = VariantProps<typeof select>;

export const select = tv({
  slots: {
    root: 'relative w-full',
    base: `
      group w-full h-spacing-700 px-spacing-0 relative flex items-center
    `,
    trigger: `
      group peer w-full h-full flex items-center justify-between bg-transparent outline-none
      cursor-pointer
    `,
    inputWrapper: `
      relative flex-1 h-full px-spacing-200 flex items-center
    `,
    value: `
      w-full bg-transparent outline-none
      md-sys-typescale-body-large text-md-sys-color-on-surface
      disabled:text-md-sys-color-on-surface/38
      disabled:cursor-not-allowed
      truncate text-left
    `,
    leadingIcon: `
      text-md-sys-color-on-surface-variant size-spacing-300
      group-has-[[data-state=open]]:text-md-sys-color-primary
      group-data-[invalid]:text-md-sys-color-error ml-spacing-150 text-[24px]
    `,
    dropdownIcon: `
      mr-spacing-150 text-md-sys-color-on-surface-variant size-spacing-300
      group-data-[state=open]:text-md-sys-color-primary
      group-data-[invalid]:text-md-sys-color-error z-20 text-[24px]
      transition-transform md-sys-motion-fast-spatial
      group-data-[state=open]:rotate-180
    `,
    content: `
      z-layer-popup min-w-[var(--bits-select-anchor-width)] max-h-96 overflow-y-auto
      rounded-lg gap-spacing-50 bg-md-sys-color-surface-container-high
      shadow-elevation-3 ring-md-sys-color-outline/10 px-spacing-100 py-spacing-50 outline-none
    `,
    item: `
      rounded-sm relative flex w-full cursor-pointer select-none items-center
      px-spacing-150 py-spacing-100 outline-none
      md-sys-typescale-body-large text-md-sys-color-on-surface
      hover:bg-md-sys-color-on-surface/8
      data-[highlighted]:bg-md-sys-color-on-surface/8
      data-[selected]:bg-md-sys-color-secondary-container
      data-[selected]:text-md-sys-color-on-secondary-container
      data-[disabled]:cursor-not-allowed data-[disabled]:opacity-38
      transition-colors md-sys-motion-fast-effects
    `,
    groupLabel: `
      px-spacing-150 pt-spacing-100 pb-spacing-50 md-sys-typescale-label-medium
      text-md-sys-color-primary
    `,
    separator: `
      my-spacing-50 h-px bg-md-sys-color-outline-variant
    `,
    supportingText: `
      px-spacing-200 pt-spacing-50 flex justify-between
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
          after:absolute after:bottom-spacing-0 after:left-spacing-0 after:right-spacing-0 after:h-px after:bg-md-sys-color-on-surface-variant
          after:transition-[height,background-color] after:md-sys-motion-fast-spatial
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
          transition-colors md-sys-motion-fast-effects
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
