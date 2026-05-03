import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import * as shapes from '../../animation/shapes.js';

export type ShapeName = keyof typeof shapes;

export interface PillProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * The variant of the pill.
	 * @default 'primary'
	 */
	variant?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'container';

	/**
	 * Whether to use a random shape.
	 * @default false
	 */
	random?: boolean;

	/**
	 * The specific shape to use. Ignored if random is true.
	 * @default 'pathPill'
	 */
	shape?: ShapeName;

	/**
	 * The content of the pill.
	 */
	children?: Snippet;
}
