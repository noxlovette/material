import { tv, type VariantProps } from '#lib/utils/tv.js';

export type TextareaVariants = VariantProps<typeof textarea>;

/**
 * M3 defines a multi-line text field but no separate textarea spec. This keeps the text field's
 * containers, label, notch and indicator, and changes only what a growing field has to:
 * the container has a 56dp minimum instead of a fixed height, and the label and icons line up
 * with the first line instead of the vertical center.
 */
export const textarea = tv({
  slots: {
    base: `
      group relative w-full min-h-spacing-700 flex items-start
    `,

    /* The wrapper holds the vertical padding, not the textarea, so text scrolled past `maxRows`
       is clipped at the textarea's edge instead of sliding under the floated label. */
    inputWrapper: `
      relative flex-1 self-stretch px-spacing-200 cursor-text
    `,

    input: `
      peer block w-full bg-transparent outline-none resize-none field-sizing-content
      md-sys-typescale-body-large text-md-sys-color-on-surface
      disabled:text-md-sys-color-on-surface/38 disabled:cursor-not-allowed
    `,

    label: `
      absolute left-spacing-200 top-spacing-200
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

    /* On the first line of text: 16dp from the top when outlined, 24dp when filled. */
    leadingIcon: `
      text-md-sys-color-on-surface-variant size-(--text-icon-24)
      group-focus-within:text-md-sys-color-primary
      ml-spacing-150 mt-spacing-200 text-icon-24
    `,

    /* Sized to the 24dp glyph like Textfield's, so it takes the same offset as the leading icon. */
    trailingIcon: `
      mr-spacing-150 mt-spacing-200 text-md-sys-color-on-surface-variant size-(--text-icon-24)
      group-focus-within:text-md-sys-color-primary
      z-20 text-icon-24
    `,

    supportingText: `
      px-spacing-200 pt-spacing-50 flex justify-between gap-spacing-200
      md-sys-typescale-body-small
      text-md-sys-color-on-surface-variant
    `,

    counter: `
      ms-auto shrink-0
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
      group-has-[textarea:not(:placeholder-shown)]:max-w-full
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
        `,
        /* 24dp above the first line leaves room for the label floated inside the container;
           24 + 24 + 8 = the 56dp single-line field. The resting label and the icons sit on that
           first line too, so the icons stay beside the text once the label floats to 8dp. */
        inputWrapper: 'pt-spacing-300 pb-spacing-100',
        leadingIcon: 'mt-spacing-300',
        trailingIcon: 'mt-spacing-300',
        label: `
          top-spacing-300
          peer-focus:top-spacing-100 peer-focus:md-sys-typescale-body-small
          peer-not-placeholder-shown:top-spacing-100 peer-not-placeholder-shown:md-sys-typescale-body-small
        `
      },
      outlined: {
        inputWrapper: 'py-spacing-200',
        label: `
          peer-focus:top-spacing-0 peer-focus:md-sys-typescale-body-small peer-focus:-translate-y-1/2
          peer-not-placeholder-shown:top-spacing-0 peer-not-placeholder-shown:md-sys-typescale-body-small peer-not-placeholder-shown:-translate-y-1/2
        `
      }
    },

    error: {
      true: {
        base: 'after:bg-md-sys-color-error focus-within:after:bg-md-sys-color-error',
        label: 'text-md-sys-color-error peer-focus:text-md-sys-color-error',
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
        inputWrapper: 'cursor-not-allowed',
        fieldset: 'border-md-sys-color-on-surface/12 group-hover:border-md-sys-color-on-surface/12'
      }
    }
  },

  compoundVariants: [
    {
      /* Same as Textfield: the outlined label floats back over the leading icon into the notch. */
      variant: 'outlined',
      leadingIcon: true,
      class: {
        label: 'peer-focus:-left-spacing-250 peer-not-placeholder-shown:-left-spacing-250'
      }
    },
    {
      variant: 'filled',
      disabled: true,
      class: {
        base: 'bg-md-sys-color-on-surface/4 after:bg-md-sys-color-on-surface/12'
      }
    }
  ],

  defaultVariants: {
    variant: 'outlined'
  }
});
