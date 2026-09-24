import type { Snippet } from 'svelte';

/**
 * Props for the SideSheet component.
 */
export interface SideSheetProps {
  /** The title at the top of the sheet. It also names the sheet for assistive technology. */
  headline: string;
  /** The sheet's content. It scrolls inside the sheet, with 24dp padding. */
  children: Snippet;
  /**
   * Buttons pinned to the bottom of the sheet, e.g. Save and Cancel. Left-aligned, most
   * important first.
   */
  actions?: Snippet;
  /**
   * - `modal`: in front of the app above a scrim, blocking everything else until it's closed
   *   (close button, Esc, or a scrim tap). Use it on compact and medium windows, or when the
   *   content needs full attention.
   * - `standard`: part of the layout. Place it as the last child of a full-height row; the
   *   content beside it reflows as it opens and closes, and stays usable.
   * @default 'modal'
   */
  variant?: 'modal' | 'standard';
  /**
   * Whether the sheet is shown. Bind it (`bind:open`) so the sheet can close itself and play
   * its exit animation.
   * @default true
   */
  open?: boolean;
  /**
   * Sheet width in px. M3 sizes side sheets at 256dp and never wider than 400dp; wider values
   * are capped at 400.
   * @default 256
   */
  width?: number;
  /** Floats the sheet 16dp from the window edges with 16dp corners all round. */
  detached?: boolean;
  /**
   * Draws the optional dividers: along a docked standard sheet's inner edge, and above the
   * actions.
   * @default true
   */
  divider?: boolean;
  /**
   * Shows a back button before the headline, for sheets that navigate within themselves. Called
   * when it's activated.
   */
  onback?: () => void;
  /** Called when the user closes the sheet (close button, Esc, or a scrim tap). */
  close?: () => void;
  class?: string;
}
