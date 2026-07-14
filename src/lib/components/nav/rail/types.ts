import type { IconProps } from '$lib/utils/index.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { RailItemVariants, RailVariants } from './theme.js';

/**
 * Props for the RailItem component.
 */
export interface RailItemProps extends RailItemVariants, HTMLAttributes<HTMLAnchorElement> {
  /** Props passed to the Icon component. */
  iconProps: IconProps;
  /** An optional numeric badge to display on the icon. Use -1 for a small dot. */
  badge?: number;
  /** Whether the link is external. */
  external?: boolean;
  /** The URL this item points to. */
  href: string;
  /** Whether the item is manually forced into a selected state. */
  selected?: boolean;
  /** The text label for the item. */
  label: string;
  /** Whether the rail is collapsed, affecting label visibility. */
  collapsed?: boolean;
  /** Whether the item is disabled. */
  disabled?: boolean;
}

/**
 * Props for the Rail component.
 */
export type RailProps = RailVariants &
  HTMLAttributes<HTMLDivElement> & {
    /** The navigation items. */
    children: Snippet;
    /** @deprecated */
    showHelp?: boolean;
    /** Whether the rail can be expanded. */
    expandable?: boolean;
    /** An optional Floating Action Button snippet. */
    fab?: Snippet;
    /** An optional snippet rendered at the bottom of the rail (e.g. avatar/settings). */
    railFooter?: Snippet;
    /** Whether the rail is currently collapsed. */
    collapsed?: boolean;
    /** Where the rail should be anchored. */
    anchor?: RailVariants['anchor'];
    /** Top offset in px for viewport/parent anchor (e.g. height of a top bar). Default 0. */
    railTop?: number;
    /** Render a bottom navbar on mobile (< md). Default false — opt in, since consumers may render their own mobile nav. */
    withNavbar?: boolean;
    /** Show the fab slot above the mobile navbar. Default true. */
    showMobileFab?: boolean;
    /** Show the railFooter slot inside the mobile navbar. Default false. */
    showMobileFooter?: boolean;
  };
