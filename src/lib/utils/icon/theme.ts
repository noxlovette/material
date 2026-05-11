import { tv, type VariantProps } from "tailwind-variants";

export type LoadingIndicatorVariants = VariantProps<typeof loadingIndicator>;

export const loadingIndicator = tv({
  base: "rounded-full",
  variants: {
    center: {
      true: "mx-auto",
      false: "",
    },
    container: {
      true: "text-md-sys-color-on-primary-container bg-md-sys-color-primary-container",
      false: "text-md-sys-color-primary",
    },
  },
});
