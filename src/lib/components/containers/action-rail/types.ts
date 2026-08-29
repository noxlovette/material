import type { DivAttrs } from '$lib/utils/index.js';
import type { Snippet } from 'svelte';
import type { ActionRailVariants } from './theme.js';

/**
 * Props for the ActionRail component.
 */
export type ActionRailProps = ActionRailVariants &
  DivAttrs & {
    /** Rail content — typically a vertical `Toolbar`. */
    children: Snippet;
    /**
     * Top offset in px, e.g. the height of a top app bar.
     * @default 0
     */
    top?: number;
    /**
     * Bottom offset in px (`viewport`/`parent` anchor only).
     * @default 0
     */
    bottom?: number;
  };
