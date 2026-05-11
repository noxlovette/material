import type { ScrollAreaRootProps } from "bits-ui";
import type { Snippet } from "svelte";

export interface ScrollAreaProps extends ScrollAreaRootProps {
  /**
   * The content to be scrolled.
   */
  children?: Snippet;

  /**
   * Additional classes for the root element.
   */
  class?: string;

  /**
   * Orientation of the scroll area.
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal" | "both";

  /**
   * Scrollbar visibility behavior.
   * - "auto": visible when content overflows.
   * - "always": always visible.
   * - "scroll": visible when scrolling.
   * - "hover": visible when hovering.
   * @default "hover"
   */
  scrollbarVisibility?: "auto" | "always" | "scroll" | "hover";
}
