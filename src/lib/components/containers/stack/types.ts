import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { StackVariants } from "./theme.js";

/**
 * Props for the Stack components (HStack and VStack).
 */
export type StackProps = StackVariants &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * The content to be stacked.
     */
    children: Snippet;
  };
