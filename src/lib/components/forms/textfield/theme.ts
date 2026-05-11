import { tv, type VariantProps } from "tailwind-variants";

export type TextFieldVariants = VariantProps<typeof textfield>;

export const textfield = tv({
  slots: {
    base: `
      group w-full h-14 px-0 bg-md-sys-color-surface-container-highest
      rounded-t-xs state-layer before:rounded-xs hover:before:bg-md-sys-color-on-surface/8 relative flex items-center
      after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-md-sys-color-on-surface-variant
      after:transition-[height,background-color] after:duration-200
      hover:after:bg-md-sys-color-on-surface
      focus-within:after:bg-md-sys-color-primary
      focus-within:after:h-[2px]
      disabled:bg-md-sys-color-on-surface/4
      disabled:after:bg-md-sys-color-on-surface/12
    `,

    inputWrapper: `
      relative flex-1 px-4
    `,

    input: `
      peer w-full pt-4 bg-transparent outline-none
      md-sys-typescale-body-large text-md-sys-color-on-surface
      disabled:text-md-sys-color-on-surface/38
    `,

    label: `
      absolute left-4 top-1/2 -translate-y-1/2
      md-sys-typescale-body-large
      text-md-sys-color-on-surface-variant
      pointer-events-none
      transition-[top,font-size,line-height,color,transform] duration-200 ease-in-out

      peer-focus:text-md-sys-color-primary

      peer-focus:top-1.5 peer-focus:md-sys-typescale-body-small peer-focus:-translate-y-1

      peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:md-sys-typescale-body-small peer-not-placeholder-shown:-translate-y-1
    `,

    requiredAsterisk: `
      ml-0.5
      text-md-sys-color-error
      group-focus-within:text-md-sys-color-primary
      transition-colors duration-200
    `,

    leadingIcon: `
      text-md-sys-color-on-surface-variant size-6
      group-focus-within:text-md-sys-color-primary
      ml-3 text-[24px]
    `,

    trailingIcon: `
      mr-3 text-md-sys-color-on-surface-variant size-6
      group-focus-within:text-md-sys-color-primary
      z-20 text-[24px]
    `,

    supportingText: `
      px-4 pt-1 flex justify-between
      md-sys-typescale-body-small
      text-md-sys-color-on-surface-variant
    `,
  },

  variants: {
    error: {
      true: {
        base: "after:bg-md-sys-color-error focus-within:after:bg-md-sys-color-error",
        label: "text-md-sys-color-error",
        supportingText: "text-md-sys-color-error",
        leadingIcon: "text-md-sys-color-error",
        trailingIcon: "text-md-sys-color-error",
      },
    },
    disabled: {
      true: {
        base: "cursor-not-allowed opacity-60",
      },
    },
  },
});
