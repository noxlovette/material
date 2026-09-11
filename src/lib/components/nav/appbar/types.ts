import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { AppbarVariants } from './theme.js';

/**
 * Props for the AppBar component.
 */
export type AppBarProps = AppbarVariants &
  HTMLAttributes<HTMLElementTagNameMap['nav']> & {
    /** Extra content rendered in a full-width row below the title, e.g. a Breadcrumb trail. */
    children?: Snippet;
    /** The main title of the app bar. */
    title: string;
    /** An optional subtitle displayed below the title. */
    subtitle?: string;
    /** Additional props for the title `<h1>` element (e.g. `data-cy`). */
    titleProps?: HTMLAttributes<HTMLHeadingElement>;
    /** Additional props for the subtitle `<p>` element (e.g. `data-cy`). */
    subtitleProps?: HTMLAttributes<HTMLParagraphElement>;
    /** A snippet to be rendered on the left side (e.g., navigation icon). */
    leading?: Snippet;
    /** A snippet to be rendered on the right side (e.g., action icons). */
    trailing?: Snippet;
    /** Whether to show a back button in the leading section. */
    showBack?: boolean;
    /** Renders an invisible same-height spacer after the fixed bar so page content isn't obscured. */
    ghost?: boolean;
    /** Additional classes passed onto the row element */
    rowClass?: string;
  };
