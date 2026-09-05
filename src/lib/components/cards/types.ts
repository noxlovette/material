import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes, HTMLAttributes } from 'svelte/elements';
import type { VariantProps } from 'tailwind-variants';
import type { card } from './theme.js';

export type CardVariants = VariantProps<typeof card>;

/**
 * Props for the Card component.
 * Supports both div (default) and anchor (when href is provided) elements.
 */
export type CardProps = CardVariants &
  HTMLAttributes<HTMLDivElement> &
  HTMLAnchorAttributes & {
    /** The content to be rendered inside the card. */
    children: Snippet;
    /**
     * An optional URL that the card should link to.
     * If provided, the card will be rendered as an `<a>` element.
     */
    href?: string;
    /**
     * The visual style of the card.
     * - 'elevated': Cards with a shadow, used for separating content from the background.
     * - 'filled': Cards with a solid background color, providing subtle separation.
     * - 'outlined': Cards with a visual boundary, providing the least amount of separation.
     * @default 'filled'
     */
    type?: CardVariants['type'];
    /**
     * Internal padding of the card.
     * @default 'md'
     */
    padding?: CardVariants['padding'];
    /**
     * Whether the card should show a state layer on hover.
     * Defaults to true if `href`, `onselect`, or `ondelete` is provided.
     */
    hoverable?: boolean;
    /**
     * Whether the card is in a selected state. Purely visual — shows a
     * `primary`-colored outline unconditionally, distinct from the `secondary`
     * outline shown on plain keyboard focus, so the two states stay visually
     * distinguishable. Selection state itself is owned by the consumer, not
     * the card, e.g. `selected={selectedId === item.id}`.
     * @default false
     */
    selected?: boolean;
    /**
     * Called when the card's surface is clicked, or when Enter/Space is pressed
     * while the card itself (not a nested control) has focus. Providing this
     * makes the card keyboard-focusable (`tabindex`, and — for non-link cards —
     * `role="button"` + `aria-pressed`). Typically closes over the represented
     * item's id: `onselect={() => (selectedId = item.id)}`.
     *
     * Nested interactive elements (buttons, form controls) should call
     * `event.stopPropagation()` in their own handlers if they shouldn't also
     * trigger selection — the whole card surface is clickable.
     */
    onselect?: () => void;
    /**
     * Called when Delete/Backspace is pressed while the card itself (not a
     * nested form control) has focus. Typically deletes the represented item:
     * `ondelete={() => remove(item.id)}`.
     */
    ondelete?: () => void;
    /**
     * Called when focus moves from somewhere inside the card to somewhere
     * outside it entirely. Unlike the native `blur`/`focusout` (which fire
     * on every focus change between the card's own inner elements, e.g.
     * tabbing between two fields in the same card), this only fires once
     * focus actually leaves the card's subtree — checked via
     * `event.relatedTarget` containment. Useful for autosaving inline-edited
     * content once the user is done with this card:
     * `onleave={() => save(item)}`.
     */
    onleave?: () => void;
  };
