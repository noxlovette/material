import { tv } from "tailwind-variants";

export const badge = tv({
  base: "bg-md-sys-color-error text-md-sys-color-on-error  absolute rounded-full md-sys-typescale-label-small inline-flex items-center justify-center",
  variants: {
    size: {
      sm: "size-1.5 top-0 right-3",
      lg: "h-3 min-w-3 p-1 -top-1 right-1",
    },
  },
});
