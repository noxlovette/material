import { tv, type VariantProps } from "tailwind-variants";

export type TimepickerVariants = VariantProps<typeof timepicker>;

export const timepicker = tv({
  slots: {
    base: "bg-md-sys-color-surface-container-high shadow-elevation-3 rounded-xl max-w-fit p-6 group relative",
    clockDiv: "flex gap-2 mb-6 mt-5",
    buttonDiv: "items-center flex justify-between -mb-4 -mx-5",
    headline:
      "text-md-sys-color-on-surface-variant md-sys-typescale-label-medium",
    inputWrapper: "space-y-2",
    fieldSeparator:
      "text-md-sys-color-on-surface md-sys-typescale-display-large ",
    timeInput:
      "bg-md-sys-color-surface-container-highest rounded-sm outline outline-md-sys-color-outline w-24 h-18 md-sys-typescale-display-medium text-md-sys-color-on-surface hover:text-sys-color-on-surface state-layer before:bg-md-sys-color-on-surface/8 md-sys-state-focus-indicator inline-flex items-center justify-center cursor-text focus:text-md-sys-color-on-primary-container focus:outline-md-sys-color-primary focus:bg-md-sys-color-primary-container relative",
    timeInputSupportingText:
      "text-md-color-on-surface-variant md-sys-typescale-body-small",
  },
});
