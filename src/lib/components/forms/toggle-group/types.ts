import type { Snippet } from 'svelte';
import type { ToggleGroupVariants, ToggleGroupItemVariants } from './theme.js';
import type { IconProps } from '$lib/utils/index.js';

export type ToggleGroupProps = ToggleGroupVariants & {
	/** Whether only one item can be active at a time, or multiple. */
	type: 'single' | 'multiple';
	/** Currently selected value(s). @bindable */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value?: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onValueChange?: (value: any) => void;
	disabled?: boolean;
	loop?: boolean;
	orientation?: 'horizontal' | 'vertical';
	children?: Snippet;
	class?: string;
};

export type ToggleGroupItemProps = ToggleGroupItemVariants & {
	/** The value this item represents. */
	value: string;
	/** Text label displayed in the item. */
	label?: string;
	/** Optional leading icon. When selected, a check replaces it. */
	iconProps?: IconProps;
	disabled?: boolean;
	class?: string;
};
