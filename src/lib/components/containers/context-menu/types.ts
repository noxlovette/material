import type { IconProps } from '$lib/utils/index.js';
import type { Snippet } from 'svelte';

/**
 * Represents an item in the context menu.
 */
export type ContextMenuDataItem = {
  /** The display label of the item. */
  label?: string;
  /** The unique value of the item. */
  value?: string;
  /** Optional supporting text shown below the label. */
  helper?: string;
  /** Whether the item is disabled. */
  disabled?: boolean;
  /** Optional icon props for the item. */
  iconProps?: IconProps;
  /** Whether the item is a separator. */
  separator?: boolean;
  /** Whether the item is selected. */
  selected?: boolean;
  /** Tint the item (and its icon) with the error color, for destructive actions. */
  color?: 'error';
  /** Callback function when the item is selected. */
  onselect?: (value: string) => void;
  /** Optional sub-items for nested menus. */
  items?: ContextMenuDataItem[];
};

/**
 * Props for the ContextMenu component.
 */
export type ContextMenuProps = {
  /** Array of menu items to display. */
  items: ContextMenuDataItem[];
  /** The value of the currently selected item. */
  selected?: string;
  /**
   * The element(s) that will trigger the context menu on right-click,
   * rendered inside a plain wrapping `<div>`. Ignored when `trigger` is given.
   */
  children?: Snippet;
  /**
   * Escape hatch for when the wrapping `<div>` from `children` isn't valid in
   * context (e.g. a table row, which can't have a `<div>` as its parent's
   * direct child). Receives the trigger props to spread onto your own
   * element instead.
   */
  trigger?: Snippet<[Record<string, unknown>]>;
  /** Callback function when an item is selected. */
  onselect?: (value: string) => void;
  /**
   * Prefix for data-cy attributes on menu items.
   * @default 'context-menu-item'
   */
  itemDataCyPrefix?: string;
  /** Whether the context menu is disabled. */
  disabled?: boolean;
};
