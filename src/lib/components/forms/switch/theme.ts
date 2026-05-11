import { tv, type VariantProps } from "tailwind-variants";

// M3 Switch:
// Track  — 52×32dp, 2dp border
// Thumb  — 16dp unchecked / 24dp checked (scale 1.5×)
// Hover  — 40dp state layer ring around thumb
export const toggle = tv({
  slots: {
    root: "group relative inline-flex h-8 w-[3.25rem] shrink-0 [print-color-adjust:exact]",

    // The input IS the track — styled as the pill background
    input: [
      "absolute inset-0 m-0 h-full w-full appearance-none rounded-full",
      "border-2 border-md-sys-color-outline bg-md-sys-color-surface-container-highest",
      "group-data-[state=checked]:border-md-sys-color-primary group-data-[state=checked]:bg-md-sys-color-primary",
      "group-data-[disabled]:cursor-not-allowed",
      "group-data-[disabled]:border-md-sys-color-on-surface/12 group-data-[disabled]:bg-md-sys-color-surface-container-highest",
      "group-data-[state=checked]:group-data-[disabled]:border-transparent group-data-[state=checked]:group-data-[disabled]:bg-md-sys-color-on-surface/12",
      "transition-colors duration-200",
    ].join(" "),

    // Thumb — absolute over track
    handle: [
      "pointer-events-none absolute left-2 top-1/2 flex h-4 w-4 -translate-y-1/2",
      "items-center justify-center rounded-full relative",
      "bg-md-sys-color-outline",
      "transition-[left,transform,background-color] duration-200 ease-in-out",
      // checked: move right + scale up + on-primary color
      "group-data-[state=checked]:left-[1.75rem] group-data-[state=checked]:scale-[1.5] group-data-[state=checked]:bg-md-sys-color-on-primary",
      // disabled
      "group-data-[disabled]:bg-md-sys-color-on-surface/38",
      "group-data-[state=checked]:group-data-[disabled]:bg-md-sys-color-surface",
      // hover (unchecked)
      "group-hover:bg-md-sys-color-on-surface-variant",
      // hover (checked) — overrides the hover above
      "group-data-[state=checked]:group-hover:bg-md-sys-color-primary-container",
      // press
      "group-active:scale-[1.75] group-data-[state=checked]:group-active:scale-[1.75]",
    ].join(" "),

    // State layer ring around thumb
    hover: [
      "pointer-events-none absolute left-4 top-1/2 h-12 w-12",
      "-translate-x-1/2 -translate-y-1/2 rounded-full",
      "transition-[left,background-color] duration-200",
      "group-data-[state=checked]:left-9",
      "group-data-[disabled]:hidden",
      "group-hover:bg-md-sys-color-on-surface/8",
      "group-data-[state=checked]:group-hover:bg-md-sys-color-primary/8",
    ].join(" "),

    // Icon inside thumb - shared base
    icon: [
      "absolute inset-0 m-auto pointer-events-none flex h-4 w-4 items-center justify-center text-[16px]",
      "opacity-0 transition-opacity duration-150 shrink-0",
    ].join(" "),

    // Specific icon states - using group state
    iconChecked: "group-data-[state=checked]:opacity-100",
    iconUnchecked: "group-data-[state=unchecked]:opacity-100",
  },
  variants: {
    icons: {
      checked: {
        // in single checked icon mode, it's already handled by iconChecked
      },
      both: {
        // unchecked thumb also grows to 24dp when 'both' icons mode
        handle: "group-data-[state=unchecked]:scale-[1.5]",
      },
      none: {},
    },
  },
  defaultVariants: {
    icons: "checked",
  },
});

export type SwitchVariants = VariantProps<typeof toggle>;
