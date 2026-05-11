import { tv, type VariantProps } from "tailwind-variants";

export type DisplayVariants = VariantProps<typeof display>;

export const display = tv({
  base: "",
  variants: {
    emphasized: {
      true: "font-medium",
    },
    size: {
      small: "md-sys-typescale-display-small",
      medium: "md-sys-typescale-display-medium",
      large: "md-sys-typescale-display-large",
    },
  },
});
