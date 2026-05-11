import type { IconProps } from '$lib/utils/icon/types.js';
import type { Snippet } from 'svelte';

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
}
