import type { IconProps } from '$lib/utils/index.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { NavBarProps } from '../navbar/types.js';
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
    /** Whether the rail is currently collapsed. */
    collapsed?: boolean;
    /** Where the rail should be anchored. */
    anchor?: RailVariants['anchor'];
    /** Top offset in px for viewport/parent anchor (e.g. height of a top bar). Default 0. */
    railTop?: number;
    /** Render a bottom navbar on mobile. */
    withNavbar?: boolean;
    /** Customise the navbar inside the rail */
    navbarProps?: Omit<NavBarProps, 'children'>;
    /**
     * Renders this Rail as a companion host for a `Toolbar` (`children`) instead of a
     * nav-destination rail. The Toolbar auto-adopts a responsive layout: a floating
     * vertical rail pinned right-center from lg up, collapsing to a fixed bottom bar
     * (like a mobile navbar) below lg. All other Rail props (`anchor`, `expandable`,
     * `fab`, `withNavbar`, etc.) are ignored in this mode.
     */
    companion?: boolean;
  };
