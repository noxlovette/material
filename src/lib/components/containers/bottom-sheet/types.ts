import type { Snippet } from 'svelte';

/** Why a modal bottom sheet dismissed itself. */
export type BottomSheetCloseReason = 'esc' | 'scrim' | 'drag' | 'handle';

/**
 * Props for the BottomSheet component.
 */
export interface BottomSheetProps {
  /**
   * The content to be rendered inside the bottom sheet, below the drag handle. It scrolls inside
   * the sheet once the sheet reaches its maximum height. Pad it yourself (M3 content usually sits
   * 16–24dp from the edges); lists and menu items can run edge to edge.
   */
  children: Snippet;
  /**
   * - `modal`: in front of the app above a scrim, blocking everything else until it's dismissed
   *   (drag it down, tap the scrim, press Esc, or activate the drag handle).
   * - `standard`: supplementary content that leaves the rest of the screen usable, such as an
   *   audio player. No scrim; it collapses to `peekHeight` instead of dismissing.
   * @default 'modal'
   */
  variant?: 'modal' | 'standard';
  /**
   * Whether the sheet is shown. Bind it (`bind:open`) so the sheet can play its exit animation
   * before unmounting.
   * @default true
   */
  open?: boolean;
  /**
   * Standard sheets only: whether the sheet is expanded to its full height, or collapsed to
   * `peekHeight`. Dragging the handle or activating it changes this; bind it to follow along.
   * @default true
   */
  expanded?: boolean;
  /**
   * Standard sheets only: how much of the sheet stays visible when collapsed, in px. Include the
   * 48dp drag handle area.
   * @default 112
   */
  peekHeight?: number;
  /**
   * The sheet's accessible name, e.g. "Share". Give one whenever the sheet has no visible
   * heading that you point to with `aria-labelledby`.
   */
  label?: string;
  /** Hides the drag handle. Only for sheets that can't be resized or dismissed by dragging. */
  hideHandle?: boolean;
  /**
   * Called when a modal sheet dismisses itself.
   * @param reason `esc`, a `scrim` click, a downward `drag`, or activating the drag `handle`.
   */
  close?: (reason: BottomSheetCloseReason) => void;
  class?: string;
  'aria-labelledby'?: string;
}
