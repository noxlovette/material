import type { PinInput as PinInputPrimitive } from "bits-ui";
import type { PinInputVariants } from "./theme.js";

export type PinInputProps = Omit<PinInputPrimitive.RootProps, "maxlength"> &
  PinInputVariants & {
    /**
     * The number of cells in the PIN input.
     * @default 4
     */
    count?: number;

    /**
     * The number of cells in the PIN input (alias for count, to match Bits UI).
     */
    maxlength?: number;

    /**
     * The label for the PIN input.
     */
    label?: string;

    /**
     * The supporting text (helper text) displayed below the PIN input.
     */
    supportingText?: string;

    /**
     * Whether the PIN input is in an error state.
     */
    error?: boolean;

    /**
     * Whether the PIN input is disabled.
     */
    disabled?: boolean;
  };
