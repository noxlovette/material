import { tv, type VariantProps } from "tailwind-variants";

export type StackVariants = VariantProps<typeof stack>;

export const stack = tv({
  base: "flex relative",
  variants: {
    type: {
      vstack: "flex-row",
      hstack: "flex-col",
      vFlip: "md:flex-row flex-col",
      hFlip: "md:flex-col flex-row",
      zstaack: "flex",
    },
    size: {
      full: "size-full",
      w: "w-full",
      h: "h-full",
    },
    gap: {
      md: "gap-3",
      sm: "gap-px",
      lg: "gap-6",
      none: "gap-0",
    },
  },
});
