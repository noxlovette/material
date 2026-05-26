import type { IconProps } from '$lib/utils/index.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { VariantProps } from 'tailwind-variants';
import type { navbar, navitem } from './theme.js';

export type NavItemVariants = VariantProps<typeof navitem>;

export type NavBarVariants = VariantProps<typeof navbar>;

/**
 * Props for the NavbarItem component.
 */
export type NavItemProps = NavItemVariants &
  HTMLAttributes<HTMLAnchorElement> & {
    /** The text label for the item. */
    label: string;
    /** An optional numeric badge to display on the icon. Use -1 for a small dot. */
    badge?: number;
    /** The URL this item points to. */
    href: string;
    /** Props passed to the Icon component. */
    iconProps: IconProps;
  };

/**
 * Props for the Navbar component.
 */
export type NavBarProps = NavBarVariants &
  HTMLAttributes<HTMLDivElement> & {
    /** The navigation items. */
    children: Snippet;
    /** An optional Floating Action Button snippet. */
    fab?: Snippet;
    /** Renders an invisible same-height spacer after the fixed bar so page content isn't obscured. */
    ghost?: boolean;
  };
