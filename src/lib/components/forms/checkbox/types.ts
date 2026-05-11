import type { CheckboxRootProps } from "bits-ui";
import type { CheckboxM3Variants } from "./theme.js";

export type CheckboxProps = CheckboxM3Variants &
  Omit<CheckboxRootProps, "children" | "checked" | "indeterminate"> & {
    /**
     * The text label for the checkbox.
     */
    label?: string;
    /**
     * Supporting text displayed below the label.
     */
    supportingText?: string;
    /**
     * Whether the checkbox is in an indeterminate state.
     * @bindable
     */
    indeterminate?: boolean;
    /**
     * The value associated with the checkbox.
     */
    value?: string;
    /**
     * Whether the checkbox is checked.
     * @bindable
     */
    checked?: boolean;
    /**
     * Whether the checkbox is disabled.
     */
    disabled?: boolean;
    /**
     * Whether the checkbox is in an error state.
     */
    error?: boolean;
    /**
     * Vertical alignment of the checkbox relative to its label.
     * @default 'start'
     */
    align?: "start" | "center";
  };
