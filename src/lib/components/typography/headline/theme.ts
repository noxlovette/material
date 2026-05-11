import { tv, type VariantProps } from "tailwind-variants";

export type HeadlineVariants = VariantProps<typeof headline>;

export const headline = tv({
  base: "",
  variants: {
    emphasized: {
      true: "font-medium",
    },
    size: {
      small: "md-sys-typescale-headline-small",
      medium: "md-sys-typescale-headline-medium",
      large: "md-sys-typescale-headline-large",
    },
  },
});
