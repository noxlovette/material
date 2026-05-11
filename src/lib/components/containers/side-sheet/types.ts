import type { Snippet } from "svelte";

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
   * Callback function to close the side sheet.
   */
  close: () => void;
}
