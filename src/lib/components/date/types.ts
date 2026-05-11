import type { DateValue } from "@internationalized/date";
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

/**
 * Common props for Date components.
 *
 * Note: We use DateValue from @internationalized/date.
 * To create a DateValue from a string, use:
 * ```ts
 * import { parseDate } from '@internationalized/date';
 * const date = parseDate('2023-10-27');
 * ```
 */
export interface BaseDateProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  /**
   * Whether the field is required.
   * @default false
   */
  required?: boolean;
  /**
   * Whether the field is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the field is in an error state.
   * @default false
   */
  error?: boolean;
  /**
   * Supporting text shown below the field.
   */
  supportingText?: Snippet;
}

export interface DateFieldProps extends BaseDateProps {
  /**
   * The current value of the date field.
   */
  value?: DateValue;
  /**
   * The name for the hidden input submitted with the form.
   * If not provided, no hidden input is rendered.
   */
  name?: string;
}

export interface DateRange {
  start: DateValue | undefined;
  end: DateValue | undefined;
}

export interface DateRangeFieldProps extends BaseDateProps {
  /**
   * Label for the start date input.
   */
  startLabel?: string;
  /**
   * Label for the end date input.
   */
  endLabel?: string;
  /** The selected date range with optional start and end values. */
  value?: DateRange;
  /** Name prefix for hidden inputs submitted with the form. */
  name?: string;
}
