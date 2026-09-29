/**
 * Accessible-name attributes shared by every progress indicator, forwarded to the element with
 * `role="progressbar"`. Give each indicator a name when more than one is on screen, or when the
 * visible label is not already associated with it.
 */
export type ProgressA11yProps = {
  id?: string;
  /** Accessible name, e.g. `"Reading comprehension"`. */
  'aria-label'?: string;
  /** Id of the element whose text names the indicator. */
  'aria-labelledby'?: string;
  /** Id of the element that describes the indicator. */
  'aria-describedby'?: string;
  /** Human-readable value, e.g. `"3 of 5 lessons"`. Defaults to the percentage. */
  'aria-valuetext'?: string;
};
