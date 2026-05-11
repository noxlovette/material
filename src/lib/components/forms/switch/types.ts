import type { IconProps } from "$lib/utils/index.js";
import type { SwitchRootProps } from "bits-ui";
import type { SwitchVariants } from "./theme.js";

/**
 * Props for the Switch component.
 */
export type SwitchProps = SwitchVariants &
  Omit<SwitchRootProps, "checked" | "disabled"> & {
    /**
     * Whether the switch is checked.
     * @bindable
     */
    checked?: boolean;

    /**
     * Whether the switch is disabled.
     */
    disabled?: boolean;

    /**
     * Props for the icon displayed when the switch is checked.
     */
    checkedIconProps?: IconProps;

    /**
     * Props for the icon displayed when the switch is unchecked.
     */
    uncheckedIconProps?: IconProps;
  };
