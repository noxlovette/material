import type { IconProps } from '$lib/utils/index.js';
import type { Snippet } from 'svelte';
import type { ButtonMDVariants } from '../theme.js';

export type SplitButtonProps = {
  /** Label/content for the leading action button. */
  children: Snippet;
  /** `MenuItem` (or similar) rows rendered inside the trailing dropdown panel. */
  menuChildren: Snippet;
  /** Called when the leading button itself is pressed (the primary action). */
  onclick?: (e: MouseEvent) => void;
  /** Optional leading icon for the primary action button. */
  iconProps?: IconProps;
  /** The visual style shared by both segments. */
  variant?: ButtonMDVariants['variant'];
  /** The color scheme shared by both segments. */
  color?: ButtonMDVariants['color'];
  /** The size shared by both segments. Drives height, padding, and typescale. */
  size?: ButtonMDVariants['size'];
  /** Disables both the primary action and the menu trigger. */
  disabled?: boolean;
  /** Controlled open state of the trailing dropdown. @bindable */
  open?: boolean;
  /** Alignment of the dropdown panel relative to the trailing trigger. @default 'end' */
  align?: 'start' | 'center' | 'end';
  /**
   * Accessible label for the trailing menu trigger (it has no visible text,
   * only a chevron), and the tooltip shown on hover.
   * @default 'More options'
   */
  menuLabel?: string;
  /** Additional CSS classes applied to the outer wrapper. */
  class?: string;
};
