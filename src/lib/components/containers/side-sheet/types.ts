import type { Snippet } from 'svelte';

/**
 * Props for the SideSheet component.
 */
export interface SideSheetProps {
  /**
   * The title displayed at the top of the side sheet.
   */
  headline: string;
  /**
   * The content of the side sheet.
   */
  children: Snippet;
  /**
   * Whether the sheet is shown. Bind it (`bind:open`) so the sheet can play its exit animation
   * before unmounting.
   * @default true
   */
  open?: boolean;
  /**
   * Called when the user dismisses the sheet (close button, Esc, backdrop click).
   */
  close?: () => void;
}
