import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { BodyVariants } from "./theme.js";

/**
 * Props for the Body typography component.
 */
export interface BodyProps
  extends BodyVariants, HTMLAttributes<HTMLParagraphElement> {
  /**
   * Body text content.
   */
  children: Snippet;
  /**
   * Whether to use the emphasized weight for the body text.
   */
  emphasized?: boolean;
  /**
   * The size of the body text.
   * @default 'medium'
   */
  size?: "small" | "medium" | "large";
}
