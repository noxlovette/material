import type { Snippet } from 'svelte';
import type { ButtonGroupVariants } from './theme.js';

export type ButtonGroupProps = ButtonGroupVariants & {
  /** Layout direction of the buttons. */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Drives the gap between buttons and the press-squeeze amount applied to a
   * pressed button's immediate neighbors. Match the size of the buttons inside.
   */
  size?: ButtonGroupVariants['size'];
  /** The buttons in the group — `Button`, `ButtonIcon`, or `Toggle` components, mixed freely. */
  children: Snippet;
  class?: string;
};
