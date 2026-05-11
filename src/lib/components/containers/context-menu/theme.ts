import { tv, type VariantProps } from "tailwind-variants";

export type ContextMenuVariants = VariantProps<typeof contextMenu>;

export const contextMenu = tv({
  slots: {
    content:
      "z-[100] min-w-48 overflow-hidden rounded-xl bg-md-sys-color-surface-container-high py-2 ring-1 ring-md-sys-color-outline/10 shadow-elevation-3",
    item: "relative flex w-full cursor-pointer select-none items-center gap-3 px-3 py-2 text-left md-sys-typescale-body-large text-md-sys-color-on-surface outline-none data-[highlighted]:bg-md-sys-color-on-surface/8 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-38",
    subTrigger:
      "relative flex w-full cursor-pointer select-none items-center gap-3 px-3 py-2 text-left md-sys-typescale-body-large text-md-sys-color-on-surface outline-none data-[state=open]:bg-md-sys-color-on-surface/8 data-[highlighted]:bg-md-sys-color-on-surface/8 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-38",
    itemContent: "flex flex-1 flex-col gap-0.5",
    label: "md-sys-typescale-body-large text-md-sys-color-on-surface",
    helper: "md-sys-typescale-body-medium text-md-sys-color-on-surface-variant",
    icon: "size-6 text-[24px] text-md-sys-color-on-surface-variant",
    separator: "my-2 h-px bg-md-sys-color-outline-variant/30",
    rightSlot: "ml-auto text-md-sys-color-on-surface-variant",
  },
  variants: {
    selected: {
      true: {
        item: "bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container",
      },
    },
  },
});
