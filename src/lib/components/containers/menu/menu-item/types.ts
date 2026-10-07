import type { Snippet } from 'svelte';

import type { IconProps } from '#lib/utils/icon/types.js';

/**
 * Props for the MenuItem component.
 */
export interface MenuItemProps {
  /**
   * Props for the leading icon.
   */
  iconProps?: IconProps;
  /**
   * Whether the menu item is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Shows the full label and helper text with wrapping instead of hard clipping.
   * Allows the row to grow beyond its minimum height.
   * @default false
   */
  disableClipping?: boolean;
  /**
   * Callback function for the click event.
   */
  onclick?: () => void;
  /**
   * Callback function for the bits-ui onSelect event.
   */
  onSelect?: (event: Event) => void;
  /**
   * Whether the item is selected.
   */
  selected?: boolean;
  /**
   * Optional supporting text.
   */
  helper?: string;
  /**
   * The content of the menu item, typically a label.
   */
  children: Snippet;
  /**
   * Whether this item is in fact a gap
   */
  isGap?: boolean;
}
