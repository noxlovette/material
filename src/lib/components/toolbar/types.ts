import type { Snippet } from 'svelte';
import type {
	ToolbarRootProps,
	ToolbarButtonProps as BitsToolbarButtonProps,
	ToolbarGroupProps as BitsToolbarGroupProps,
	ToolbarGroupItemProps as BitsToolbarGroupItemProps
} from 'bits-ui';
import type { IconProps } from '$lib/utils/index.js';
import type { ToolbarVariants, ToolbarButtonVariants, ToolbarGroupItemVariants } from './theme.js';

export type ToolbarProps = ToolbarVariants &
	Omit<ToolbarRootProps, 'children' | 'child'> & {
		children?: Snippet;
		class?: string;
	};

export type ToolbarButtonProps = ToolbarButtonVariants &
	Omit<BitsToolbarButtonProps, 'children' | 'child'> & {
		iconProps: IconProps;
		class?: string;
	};

export type ToolbarGroupProps = Omit<BitsToolbarGroupProps, 'children' | 'child'> & {
	children?: Snippet;
	class?: string;
};

export type ToolbarGroupItemProps = ToolbarGroupItemVariants &
	Omit<BitsToolbarGroupItemProps, 'children' | 'child'> & {
		iconProps: IconProps;
		class?: string;
	};
