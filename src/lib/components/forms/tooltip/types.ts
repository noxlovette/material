import type { TooltipContentProps, TooltipRootProps, TooltipTriggerProps } from 'bits-ui';
import type { Snippet } from 'svelte';
import type { TooltipVariants } from './theme.js';

export type TooltipProps = TooltipVariants &
  TooltipRootProps & {
    /** Larger, emphasized text displayed at the top of the tooltip (Rich tooltips only) */
    subhead?: string | null;
    /** Content for rich tooltips */
    children?: Snippet;
    /** Secondary text providing additional context */
    supportingText?: string | null;
    /** The element that triggers the tooltip on hover or focus */
    trigger?: Snippet<[Record<string, unknown>]>;
    /** CSS class applied to the trigger element */
    triggerClass?: string;
    /** Additional props passed to the underlying Tooltip.Trigger component */
    triggerProps?: TooltipTriggerProps;
    /** Additional props passed to the underlying Tooltip.Content component */
    contentProps?: Omit<TooltipContentProps, 'forceMount'>;
    /** Time in milliseconds to wait before showing the tooltip */
    delayDuration?: number;
    /** Whether the tooltip is currently visible */
    isOpen?: boolean;
    /** Tooltip style variant: 'snack' for simple tooltips, 'rich' for more complex content */
    variant?: 'rich' | 'snack';
    /** Whether to show an arrow pointing to the trigger */
    showArrow?: boolean;
    /** Custom CSS class for the tooltip content */
    class?: string;
  };
