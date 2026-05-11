import type { IconProps } from "$lib/utils/index.js";
import type { Snippet } from "svelte";
import type { HTMLInputAttributes } from "svelte/elements";
import type { SearchVariants } from "./theme.js";

/**
 * Props for the Search component.
 */
export interface SearchProps
  extends SearchVariants, Omit<HTMLInputAttributes, "size"> {
  /**
   * The content of the search bar, typically used for custom layouts.
   */
  children?: Snippet;

  /**
   * The current value of the search input.
   */
  value?: string | null;

  /**
   * Reference to the HTML input element.
   */
  elementRef?: HTMLInputElement;

  /**
   * Callback function when the trailing icon is clicked.
   * Default behavior clears the search value.
   */
  trailingClick?: () => void;

  /**
   * Props for the leading icon (typically a search icon).
   */
  leadingIconProps?: IconProps;

  /**
   * Props for the trailing icon (typically a clear/close icon).
   */
  trailingIconProps?: IconProps;
}
