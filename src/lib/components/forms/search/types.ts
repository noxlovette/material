import type { IconProps } from '$lib/utils/index.js';
import type { Snippet } from 'svelte';
import type { HTMLInputAttributes } from 'svelte/elements';

/**
 * Props for the Search component.
 */
export interface SearchProps extends Omit<HTMLInputAttributes, 'size'> {
  /**
   * The current value of the search input.
   */
  value?: string | null;

  /**
   * Reference to the HTML input element.
   */
  elementRef?: HTMLInputElement;

  /**
   * A leading action, e.g. a menu or back icon button. Replaces the leading icon.
   */
  leading?: Snippet;

  /**
   * Trailing actions and/or an avatar, e.g. a mic icon button. Rendered after the clear button.
   */
  trailing?: Snippet;

  /**
   * Called by the clear button. Defaults to clearing the value and refocusing the input.
   */
  trailingClick?: () => void;

  /**
   * Props for the leading icon (a search icon by default); `null` removes it.
   */
  leadingIconProps?: IconProps | null;

  /**
   * Props for the clear button's icon, shown while there is a value; `null` removes the button.
   */
  trailingIconProps?: IconProps | null;

  /**
   * Accessible label for the clear button.
   */
  clearLabel?: string;
}
