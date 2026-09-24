import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { BodyVariants } from './theme.js';

/**
 * Props for the Body typography component.
 */
export interface BodyProps extends BodyVariants, HTMLAttributes<HTMLParagraphElement> {
  /**
   * Body text content.
   */
  children: Snippet;
  /**
   * Use the M3 emphasized style (`md-sys-typescale-emphasized-body-*`): same size, heavier weight.
   * Use it for selected, active, or unread states, or for editorial emphasis.
   */
  emphasized?: boolean;
  /**
   * The size of the body text.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
}
