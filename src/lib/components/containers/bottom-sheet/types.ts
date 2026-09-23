import type { Snippet } from 'svelte';

/**
 * Props for the BottomSheet component.
 */
export interface BottomSheetProps {
  /**
   * The content to be rendered inside the bottom sheet.
   * Typically includes a list of actions or supplementary information.
   */
  children: Snippet;
  /**
   * Whether the sheet is shown. Bind it (`bind:open`) so the sheet can play its exit animation
   * before unmounting.
   * @default true
   */
  open?: boolean;
  /**
   * Called when the user dismisses the sheet.
   * @param reason The reason for closing ('esc' key, 'click' outside, or 'low' drag height).
   */
  close?: (reason: 'esc' | 'click' | 'low') => void;
}
