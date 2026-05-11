import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { KbdVariants } from "./theme.js";

/**
 * Props for the Kbd typography component.
 */
export type KbdProps = HTMLAttributes<HTMLElement> &
  KbdVariants & {
    /**
     * Keyboard hint content.
     */
    children: Snippet;
    /**
     * The position of the kbd element.
     * @default 'absolute'
     */
    position?: "absolute" | "relative" | "static";
  };
