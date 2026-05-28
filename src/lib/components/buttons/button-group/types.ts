import type { IconProps } from '$lib/utils/index.js';
import type { Snippet } from 'svelte';
import type { ButtonGroupItemVariants, ButtonGroupVariants } from './theme.js';

export type ButtonGroupProps = ButtonGroupVariants & {
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
  children?: Snippet;
  class?: string;
};

export type ButtonGroupItemProps = ButtonGroupItemVariants & {
  /** The value this item represents. */
  value: string;
  /** Text label displayed inside the button. */
  label?: string;
  /** Optional leading icon. Replaced by a check mark when selected. */
  iconProps?: IconProps;
  disabled?: boolean;
  class?: string;
};
