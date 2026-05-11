import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { SnackBarVariants } from './theme.js';

/**
 * Configuration for a simple snackbar toast.
 */
export interface Toast {
  /** The message to display. */
  message?: string;
  /** Whether to show a close button. */
  showClose?: boolean;
  /** The label for the action button. */
  label?: string;
  /** Whether the snackbar should remain until manually dismissed. */
  static?: boolean;
}

/**
 * Props for the Snackbar component.
 */
export type SnackBarProps = SnackBarVariants &
  HTMLAttributes<HTMLDivElement> & {
    /** The message or snippet to display in the snackbar. */
    message?: string | Snippet;
    /** Whether the snackbar should have a fixed position. */
    fixed?: boolean;
    /** Callback for the action button. */
    callback?: () => void;
    /** The label for the action button. */
    label?: string;
    /** Whether to show a close button. */
    showClose?: boolean;
    /** Whether the snackbar should remain until manually dismissed. */
    static?: boolean;
  };
