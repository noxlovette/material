import { tv, type VariantProps } from "tailwind-variants";

export type ToggleGroupVariants = VariantProps<typeof toggleGroup>;
export type ToggleGroupItemVariants = VariantProps<typeof toggleGroupItem>;

export const toggleGroup = tv({
  slots: {
    root: "inline-flex h-10 overflow-hidden rounded-full border border-md-sys-color-outline",
  },
  variants: {
    orientation: {
      horizontal: { root: "flex-row" },
      vertical: { root: "flex-col h-auto w-auto rounded-2xl" },
    },
  },
  defaultVariants: { orientation: "horizontal" },
});

export const toggleGroupItem = tv({
  slots: {
    base: "layer-container state-layer relative inline-flex min-w-12 flex-1 items-center justify-center gap-2 px-4 md-sys-typescale-label-large text-md-sys-color-on-surface outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-38 [&:not(:last-child)]:border-r [&:not(:last-child)]:border-md-sys-color-outline data-[state=on]:bg-md-sys-color-secondary-container data-[state=on]:text-md-sys-color-on-secondary-container",
    checkIcon: "size-[18px] text-[18px]",
    icon: "size-[18px] text-[18px]",
  },
});
