import type { SeparatorRootProps } from "bits-ui";
import type { Snippet } from "svelte";
import type { HrVariants } from "./theme.js";

/**
 * Props for the Divider component.
 * Dividers are thin lines that group content in lists and layouts.
 */
export interface HrProps
  extends HrVariants, Omit<SeparatorRootProps, "children" | "orientation"> {
  /**
   * Optional content to be rendered within the divider (horizontal only).
   * If provided, the divider will show the content centered between two lines.
   */
  children?: Snippet;
  /**
   * The orientation of the divider.
   * @default 'horizontal'
   */
  orientation?: HrVariants["orientation"];
  /**
   * The visual variant of the divider.
   * - 'full': Spans the full width/height of the container.
   * - 'inset': Has margins on the sides.
   * - 'wavy': Renders as a wavy line.
   * @default 'full'
   */
  variant?: HrVariants["variant"];
}
