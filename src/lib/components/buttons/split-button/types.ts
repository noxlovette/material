import type { IconProps } from '$lib/utils/index.js';
import type { Snippet } from 'svelte';
import type { ButtonSize } from '../theme.js';

export type SplitButtonProps = {
  /** The leading button's label. It can have a label, an icon, or both. */
  children?: Snippet;
  /** The menu: `MenuItem`s (and dividers or headings), as in `Menu`. */
  menuChildren: Snippet;
  /** The leading button's action. */
  onclick?: (e: MouseEvent) => void;
  /** The leading button's icon. */
  iconProps?: IconProps;
  /**
   * Colour style of both buttons. Same colours as `Button`; opening the menu doesn't change them.
   * There is no text split button.
   * @default 'filled'
   */
  variant?: 'elevated' | 'filled' | 'tonal' | 'outlined';
  /**
   * Height 32, 40, 56, 96 or 136dp.
   * @default 'sm'
   */
  size?: ButtonSize;
  /** Disables both buttons. */
  disabled?: boolean;
  /** Whether the menu is open. Bindable. */
  open?: boolean;
  /** Menu alignment against the trailing button. @default 'end' */
  align?: 'start' | 'center' | 'end';
  /**
   * Accessible name of the trailing button, which shows only an icon.
   * @default 'More options'
   */
  menuLabel?: string;
  /** Accessible name of the leading button when it shows only an icon. */
  'aria-label'?: string;
  /** Classes for the wrapper. */
  class?: string;
};
