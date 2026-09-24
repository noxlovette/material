import type { HTMLAttributes } from 'svelte/elements';
import type { TimepickerVariants } from './theme.js';

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
     * @default 'Enter time'
     */
    label?: string;
    /** Supporting text under the hour input. @default 'Hour' */
    hourLabel?: string;
    /** Supporting text under the minute input. @default 'Minute' */
    minuteLabel?: string;
    /** Label of the dismiss button. @default 'Cancel' */
    cancelText?: string;
    /** Label of the confirm button. @default 'OK' */
    confirmText?: string;
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

/** The TimepickerInput strings a TimeField forwards to its picker overlay. */
export type TimepickerLabels = Partial<
  Pick<TimepickerProps, 'label' | 'hourLabel' | 'minuteLabel' | 'cancelText' | 'confirmText'>
>;
