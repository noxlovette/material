import type { IconProps } from '$lib/utils/index.js';
import type {
  ToolbarButtonProps as BitsToolbarButtonProps,
  ToolbarGroupItemProps as BitsToolbarGroupItemProps,
  ToolbarGroupProps as BitsToolbarGroupProps,
  ToolbarRootProps
} from 'bits-ui';
import type { Snippet } from 'svelte';
import type { ToolbarVariants } from './theme.js';

export type ToolbarColor = 'standard' | 'vibrant';

export type ToolbarProps = ToolbarVariants &
  Omit<ToolbarRootProps, 'children' | 'child'> & {
    children?: Snippet;
    fab?: Snippet;
    ghost?: boolean;
    class?: string;
  };

export type ToolbarButtonProps = Omit<BitsToolbarButtonProps, 'children' | 'child'> & {
  iconProps: IconProps;
  class?: string;
};

export type ToolbarGroupProps = Omit<BitsToolbarGroupProps, 'children' | 'child'> & {
  children?: Snippet;
  class?: string;
};

export type ToolbarGroupItemProps = Omit<BitsToolbarGroupItemProps, 'children' | 'child'> & {
  iconProps: IconProps;
  class?: string;
};
