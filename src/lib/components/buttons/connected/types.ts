import type { IconProps } from '$lib/utils/index.js';
import type { Snippet } from 'svelte';
import type { ButtonSize } from '../theme.js';
import type { ConnectedButtonGroupVariants } from './theme.js';

export type ConnectedButtonGroupVariant = 'elevated' | 'filled' | 'tonal' | 'outlined';

export type ConnectedButtonGroupCtx = {
  size: ButtonSize;
  shape: 'round' | 'square';
  variant: ConnectedButtonGroupVariant;
  type: 'single' | 'multiple';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};

export type ConnectedButtonGroupProps = ConnectedButtonGroupVariants & {
  /** One selected item at a time, or several. */
  type: 'single' | 'multiple';
  /** The selected value (`single`) or values (`multiple`). Bindable. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  /** Called when the selection changes. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValueChange?: (value: any) => void;
  /** Disables every item. */
  disabled?: boolean;
  /** Whether arrow keys wrap from the last item to the first. @default true */
  loop?: boolean;
  /** @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Toggle button colour style of the items: unselected and selected colours as for `Toggle`.
   * @default 'filled'
   */
  variant?: ConnectedButtonGroupVariant;
  /**
   * Outer corners: fully round, or square (the inner corner size). Inner corners are the same
   * for both.
   * @default 'round'
   */
  shape?: ConnectedButtonGroupCtx['shape'];
  /**
   * Height, padding and type of the items, as for `Button`: 32, 40, 56, 96 or 136dp.
   * @default 'sm'
   */
  size?: ButtonSize;
  /** `ConnectedButtonGroupItem`s. */
  children?: Snippet;
  /** Accessible name of the group. */
  'aria-label'?: string;
  class?: string;
};

export type ConnectedButtonGroupItemProps = {
  /** The value this item selects. */
  value: string;
  /** The label. */
  label?: string;
  /** A leading icon. It fills while the item is selected. */
  iconProps?: IconProps;
  /** Accessible name, for an item with only an icon. */
  'aria-label'?: string;
  /** Disables the item. */
  disabled?: boolean;
  class?: string;
};
