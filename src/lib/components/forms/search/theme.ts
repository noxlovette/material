import { tv, type VariantProps } from "tailwind-variants";

export type SearchVariants = VariantProps<typeof search>;

export const search = tv({
  slots: {
    base: "group grow cursor-text focus-inside:ring-3 focus-inside:ring-inset-2 focus-inside:ring-md-sys-color-secondary relative bg-md-sys-color-surface-container-high  rounded-full h-14 state-layer before:rounded-full hover:before:bg-md-sys-color-on-surface/8 items-center flex w-full max-w-[720px] px-4",
    leadingIcon: "text-md-sys-color-on-surface text-[24px] size-6 mr-4",
    trailingIcon:
      "text-md-sys-color-on-surface-variant text-[24px] size-6 ml-4",
    input:
      " placeholder:text-md-sys-color-on-surface-variant placeholder:md-sys-typescale-body-large z-50 md-sys-typescale-body-large text-md-sys-color-on-surface outline-none w-full",
  },
  variants: {
    shadow: {
      true: "shadow-elevation-3",
      false: "",
    },
  },
});
