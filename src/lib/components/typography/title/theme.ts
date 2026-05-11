import { tv, type VariantProps } from "tailwind-variants";

export type TitleVariants = VariantProps<typeof title>;

export const title = tv({
  base: "",
  variants: {
    emphasized: {
      true: "font-semibold",
    },
    size: {
      small: "md-sys-typescale-title-small",
      medium: "md-sys-typescale-title-medium",
      large: "md-sys-typescale-title-large",
    },
  },
});
