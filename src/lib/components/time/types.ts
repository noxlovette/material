import type { HTMLAttributes } from "svelte/elements";
import type { TimepickerVariants } from "./theme.js";

/**
 * Props for the TimepickerInput component.
 * Follows Material 3 time picker specifications.
 *
 * @see https://m3.material.io/components/time-pickers/specs
 */
export type TimepickerProps = TimepickerVariants &
  HTMLAttributes<HTMLInputElement> & {
    /**
     * The label displayed at the top of the timepicker.
     * @default 'Введите время'
     */
    label?: string;
    /**
     * The current time value in HH:MM format.
     * @default '09:41'
     */
    time: string;
    /**
     * The name attribute for the hidden input field, used for form submission.
     * @default 'startTime'
     */
    name?: string;
    /**
     * Callback function to close the timepicker overlay.
     */
    close: () => void;
    /**
     * Callback function to update the selected time.
     * @param time The selected time string in HH:MM format.
     */
    setTime: (time: string) => void;
  };
