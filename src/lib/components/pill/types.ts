import type { Snippet } from 'svelte';
import type { PillVariants } from './theme.js';
import type { HTMLAttributes } from 'svelte/elements';

export interface PillProps extends PillVariants, HTMLAttributes<HTMLDivElement> {
	children?: Snippet;
}
