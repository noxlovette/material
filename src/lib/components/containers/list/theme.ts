import { tv } from "tailwind-variants";

export const listiem = tv({
  slots: {
    base: "bg-md-sys-color-surface text-sys-color-on-surface-variant state-layer disabled:before:bg-md-sys-color-on-surface/10 md-sys-state-focus-indicator px-4 py-2 gap-4 items-center relative flex rounded-lg before:rounded-lg w-full",
    leading: "inline-flex items-start",
    body: "min-w-0",
    overline: "md-sys-typescale-label-small line-clamp-1",
    headline:
      "text-md-sys-color-on-surface md-sys-typescale-body-large line-clamp-1",
    supporting: "md-sys-typescale-label-small line-clamp-2",
    trailing: "size-6 text-[24px] inline-flex items-start ml-auto",
  },
  variants: {
    lines: {
      1: "h-14",
      2: "h-18",
      3: "h-22",
    },
    selected: {
      true: {
        base: "text-md-sys-color-on-secondary-container bg-md-sys-color-secondary-container",
        headline: "text-md-sys-color-on-secondary-container",
        trailing: "text-md-sys-color-primary",
      },
      false: "",
    },
  },
});
