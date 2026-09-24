import { tv, type VariantProps } from 'tailwind-variants';

export type TextFieldVariants = VariantProps<typeof textfield>;

export const textfield = tv({
  slots: {
    base: `
      group relative w-full h-spacing-700 flex items-center
    `,

    /* Stretches to the full field height so the label floats relative to the field's top edge,
       not the input's. */
    inputWrapper: `
      relative flex-1 self-stretch flex items-center px-spacing-200
    `,

    input: `
      peer w-full bg-transparent outline-none
      md-sys-typescale-body-large text-md-sys-color-on-surface
      disabled:text-md-sys-color-on-surface/38
    `,

    label: `
      absolute left-spacing-200 top-1/2 -translate-y-1/2
      md-sys-typescale-body-large
      text-md-sys-color-on-surface-variant
      pointer-events-none
      transition-[top,left,font-size,line-height,color,transform] md-sys-motion-fast-spatial

      peer-focus:text-md-sys-color-primary
    `,

    requiredAsterisk: `
      ml-spacing-25
      text-md-sys-color-error
      group-focus-within:text-md-sys-color-primary
      transition-colors md-sys-motion-effects
    `,

    leadingIcon: `
      text-md-sys-color-on-surface-variant size-spacing-300
      group-focus-within:text-md-sys-color-primary
      ml-spacing-150 text-[24px]
    `,

    trailingIcon: `
      mr-spacing-150 text-md-sys-color-on-surface-variant size-spacing-300
      group-focus-within:text-md-sys-color-primary
      z-20 text-[24px]
    `,

    supportingText: `
      px-spacing-200 pt-spacing-50 flex justify-between
      md-sys-typescale-body-small
      text-md-sys-color-on-surface-variant
    `,

    fieldset: `
      absolute -top-spacing-100 left-spacing-0 right-spacing-0 bottom-spacing-0 m-spacing-0 px-spacing-150
      pointer-events-none rounded-xs border border-md-sys-color-outline
      transition-colors md-sys-motion-fast-effects

      group-hover:border-md-sys-color-on-surface
      group-focus-within:border-2 group-focus-within:border-md-sys-color-primary
    `,

    legend: `
      invisible float-none block h-auto max-w-[0.01px] overflow-hidden
      whitespace-nowrap md-sys-typescale-body-small
      transition-[max-width] md-sys-motion-fast-spatial

      group-focus-within:max-w-full
      group-has-[input:not(:placeholder-shown)]:max-w-full
    `,

    legendLabel: `
      px-spacing-50
    `
  },

  variants: {
    variant: {
      filled: {
        base: `
          px-spacing-0 bg-md-sys-color-surface-container-highest
          rounded-t-xs state-layer before:rounded-xs hover:before:bg-md-sys-color-on-surface/8
          after:absolute after:bottom-spacing-0 after:left-spacing-0 after:right-spacing-0 after:h-px after:bg-md-sys-color-on-surface-variant
          after:transition-[height,background-color] after:md-sys-motion-fast-spatial
          hover:after:bg-md-sys-color-on-surface
          focus-within:after:bg-md-sys-color-primary
          focus-within:after:h-[2px]
          disabled:bg-md-sys-color-on-surface/4
          disabled:after:bg-md-sys-color-on-surface/12
        `,
        /* Room for the label floated inside the container. Outlined labels float into the border
           notch instead, so their input stays vertically centered. */
        input: 'pt-spacing-200',
        label: `
          peer-focus:top-spacing-100 peer-focus:md-sys-typescale-body-small peer-focus:translate-y-spacing-0
          peer-not-placeholder-shown:top-spacing-100 peer-not-placeholder-shown:md-sys-typescale-body-small peer-not-placeholder-shown:translate-y-spacing-0
        `
      },
      outlined: {
        label: `
          peer-focus:top-spacing-0 peer-focus:md-sys-typescale-body-small peer-focus:-translate-y-1/2
          peer-not-placeholder-shown:top-spacing-0 peer-not-placeholder-shown:md-sys-typescale-body-small peer-not-placeholder-shown:-translate-y-1/2
        `
      }
    },

    error: {
      true: {
        base: 'after:bg-md-sys-color-error focus-within:after:bg-md-sys-color-error',
        label: 'text-md-sys-color-error',
        supportingText: 'text-md-sys-color-error',
        leadingIcon: 'text-md-sys-color-error',
        trailingIcon: 'text-md-sys-color-error',
        fieldset: `
          border-md-sys-color-error
          group-hover:border-md-sys-color-error
          group-focus-within:border-md-sys-color-error
        `
      }
    },
    leadingIcon: {
      true: {}
    },
    disabled: {
      true: {
        base: 'cursor-not-allowed opacity-60',
        fieldset: 'border-md-sys-color-on-surface/12 group-hover:border-md-sys-color-on-surface/12'
      }
    }
  },

  compoundVariants: [
    {
      /* M3: an outlined label floats back to the field's start edge, over the leading icon, into
         the notch. The wrapper starts after the icon (ml-spacing-150 + size-spacing-300 = 36px), so -20px puts the
         label at 16px from the field's edge. */
      variant: 'outlined',
      leadingIcon: true,
      class: {
        label: 'peer-focus:-left-spacing-250 peer-not-placeholder-shown:-left-spacing-250'
      }
    }
  ],

  defaultVariants: {
    variant: 'outlined'
  }
});
