import { tv, type VariantProps } from "tailwind-variants";

export type LinkPreviewVariants = VariantProps<typeof linkPreview>;

export const linkPreview = tv({
  slots: {
    base: "relative z-[100] min-w-48 max-w-sm rounded-2xl bg-md-sys-color-surface-container-high p-4 shadow-elevation-3 ring-1 ring-md-sys-color-outline/20 overflow-hidden",
    content: "flex flex-col gap-2",
  },
});
