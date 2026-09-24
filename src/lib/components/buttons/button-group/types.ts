import type { Snippet } from 'svelte';
import type { ButtonSize } from '../theme.js';

export type ButtonGroupProps = {
  /** @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The size of the buttons inside. Sets the space between them: 18, 12, 8, 8 and 8dp for XS to
   * XL, so each keeps a 48dp target.
   * @default 'sm'
   */
  size?: ButtonSize;
  /**
   * `Button`s, `Toggle`s and `ButtonIcon`s, mixed freely. Avoid `text` buttons and `standard`
   * icon buttons, which have no container to change shape.
   */
  children: Snippet;
  /** Accessible name, when the group needs one (it gets `role="group"`). */
  'aria-label'?: string;
  class?: string;
};
