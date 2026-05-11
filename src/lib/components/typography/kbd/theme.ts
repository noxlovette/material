import { tv, type VariantProps } from "tailwind-variants";

export type KbdVariants = VariantProps<typeof kbd>;

export const kbd = tv({
  base: "text-xs font-semibold text-text-tertiary",
  variants: {
    position: {
      absolute:
        "right-1.5 bottom-1.5 hidden md:absolute md:right-2 md:bottom-2",
      relative: "",
    },
  },
});
