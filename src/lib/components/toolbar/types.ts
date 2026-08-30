import type { DivAttrs, IconProps } from '$lib/utils/index.js';
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
    /**
     * Splits the toolbar into independently painted surfaces instead of one continuous
     * pill/bar — compose `children` from `ToolbarSection` + `ToolbarSpacer` when true.
     */
    sections?: boolean;
    class?: string;
  };

export type ToolbarSectionProps = DivAttrs & {
  children?: Snippet;
};

export type ToolbarButtonProps = Omit<BitsToolbarButtonProps, 'children' | 'child'> & {
  iconProps: IconProps;
  /**
   * Content to display in a tooltip when hovering over the button.
   * If omitted, no tooltip is shown.
   */
  tooltipContent?: string;
  /** CSS class added to the tooltip trigger wrapper. */
  triggerClass?: string;
  class?: string;
};

export type ToolbarGroupProps = Omit<BitsToolbarGroupProps, 'children' | 'child'> & {
  children?: Snippet;
  class?: string;
};

export type ToolbarSpacerProps = DivAttrs;

export type ToolbarGroupItemProps = Omit<BitsToolbarGroupItemProps, 'children' | 'child'> & {
  iconProps: IconProps;
  /**
   * Content to display in a tooltip when hovering over the button.
   * If omitted, no tooltip is shown.
   */
  tooltipContent?: string;
  /** CSS class added to the tooltip trigger wrapper. */
  triggerClass?: string;
  class?: string;
};
