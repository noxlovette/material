import type { DivAttrs } from '$lib/utils/types.js';
import type { Snippet } from 'svelte';
import type { HrVariants } from './theme.js';

/**
 * Props for the Divider component.
 * Dividers are thin lines that group content in lists and layouts.
 */
export interface HrProps extends HrVariants, DivAttrs {
  /**
   * Optional content to be rendered within the divider (horizontal only).
   * If provided, the divider will show the content centered between two lines.
   */
  children?: Snippet;
  /**
   * The orientation of the divider.
   * @default 'horizontal'
   */
  orientation?: HrVariants['orientation'];
  /**
   * The visual variant of the divider.
   * - 'full': Spans the full width/height of the container.
   * - 'inset': Has margins on the sides.
   * - 'wavy': Renders as a wavy line.
   * @default 'full'
   */
  variant?: HrVariants['variant'];
  /**
   * Whether the separator is decorative and should be hidden from assistive technologies.
   * @default true
   */
  decorative?: boolean;
}
