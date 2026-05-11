import type { IconProps } from '$lib/utils/index.js';
import type {
  ToolbarButtonProps as BitsToolbarButtonProps,
  ToolbarGroupItemProps as BitsToolbarGroupItemProps,
  ToolbarGroupProps as BitsToolbarGroupProps,
  ToolbarRootProps
} from 'bits-ui';
import type { Snippet } from 'svelte';
import type { ToolbarButtonVariants, ToolbarGroupItemVariants, ToolbarVariants } from './theme.js';

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
