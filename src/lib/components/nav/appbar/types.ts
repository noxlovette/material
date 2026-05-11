import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { AppbarVariants } from "./theme.js";

/**
 * Props for the AppBar component.
 */
export type AppBarProps = AppbarVariants &
  HTMLAttributes<HTMLElementTagNameMap["nav"]> & {
    /** The content to be rendered inside the app bar. */
    children?: Snippet;
    /** The main title of the app bar. */
    title: string;
    /** An optional subtitle displayed below the title. */
    subtitle?: string;
    /** A snippet to be rendered on the left side (e.g., navigation icon). */
    leading?: Snippet;
    /** A snippet to be rendered on the right side (e.g., action icons). */
    trailing?: Snippet;
    /** Whether to show a back button in the leading section. */
    showBack?: boolean;
  };
