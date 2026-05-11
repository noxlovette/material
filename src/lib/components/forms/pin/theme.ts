import { tv, type VariantProps } from "tailwind-variants";

export type PinInputVariants = VariantProps<typeof pinInput>;

export const pinInput = tv({
  slots: {
    root: "flex flex-col gap-2",
    label: "md-sys-typescale-label-large text-md-sys-color-on-surface-variant",
    container: "flex items-center gap-2",
    cell: `
      relative flex h-14 w-12 items-center justify-center
      bg-md-sys-color-surface-container-highest rounded-t-xs
      md-sys-typescale-headline-small text-md-sys-color-on-surface
      transition-all duration-200
      after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-md-sys-color-on-surface-variant
      after:transition-[height,background-color] after:duration-200
      data-[focus]:after:bg-md-sys-color-primary data-[focus]:after:h-[2px]
      data-[placeholder]:text-md-sys-color-on-surface-variant/38
    `,
    supportingText:
      "md-sys-typescale-body-small text-md-sys-color-on-surface-variant",
  },
  variants: {
    error: {
      true: {
        cell: "after:bg-md-sys-color-error data-[focus]:after:bg-md-sys-color-error",
        label: "text-md-sys-color-error",
        supportingText: "text-md-sys-color-error",
      },
    },
    disabled: {
      true: {
        cell: "bg-md-sys-color-on-surface/4 after:bg-md-sys-color-on-surface/12 opacity-60 cursor-not-allowed",
      },
    },
  },
});
