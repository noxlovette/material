import type { IconProps } from '$lib/utils/index.js';
import type { Snippet } from 'svelte';
import type { ConnectedButtonGroupVariants } from './theme.js';

export type ConnectedButtonGroupCtx = {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape: 'round' | 'square';
};

export type ConnectedButtonGroupProps = ConnectedButtonGroupVariants & {
  /** Whether only one item can be active at a time, or multiple. */
  type: 'single' | 'multiple';
  /** Currently selected value(s). @bindable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValueChange?: (value: any) => void;
  disabled?: boolean;
  loop?: boolean;
  orientation?: 'horizontal' | 'vertical';
  /** Outer corner shape of the group. A selected/pressed item collapses to its inner corner size regardless. */
  shape?: ConnectedButtonGroupCtx['shape'];
  /** Drives the group's height and inner corner size. Match the size of the buttons this replaces. */
  size?: ConnectedButtonGroupCtx['size'];
  children?: Snippet;
  class?: string;
};

export type ConnectedButtonGroupItemProps = {
  /** The value this item represents. */
  value: string;
  /** Text label displayed inside the item. */
  label?: string;
  /** Optional icon. Stays visible when selected — selection is shown via shape and color, not an icon swap. */
  iconProps?: IconProps;
  disabled?: boolean;
  class?: string;
};
