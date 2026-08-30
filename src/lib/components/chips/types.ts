import type { AnchorButtonAttributes, IconProps } from '$lib/utils/index.js';
import type { Snippet } from 'svelte';
import type { ChipVariants } from './theme.js';

export type ChipProps = ChipVariants &
  AnchorButtonAttributes & {
    /**
     * The semantic type of chip.
     * - 'assist': Represents a smart or automated action.
     * - 'filter': Toggles filtering of content; supports a selected state with a leading checkmark.
     * - 'input': Represents a discrete piece of information entered by the user; supports removal.
     * - 'suggestion': Presents a dynamically generated suggestion.
     */
    variant?: ChipVariants['variant'];
    /**
     * Whether the chip's container is elevated (shadow) instead of flat/outlined.
     * Not applicable to 'input' chips, which are always flat.
     */
    elevated?: ChipVariants['elevated'];
    /**
     * Whether the chip is selected. Bindable.
     * Meaningful for 'filter' chips (drives the toggle + checkmark) and 'input' chips (highlight only).
     */
    selected?: boolean;
    /** Callback fired when a 'filter' chip's selected state changes via interaction. */
    onPressedChange?: (selected: boolean) => void;
    /** Whether the chip is disabled. */
    disabled?: boolean;
    /** Configuration for the leading icon. */
    iconProps?: IconProps;
    /**
     * Custom leading content (e.g. an avatar image) rendered instead of `iconProps`.
     * Typically used by 'input' chips to represent a contact or entity.
     */
    avatar?: Snippet;
    /**
     * Called when the trailing remove icon is activated.
     * Providing this renders the trailing remove affordance on 'input' chips.
     */
    onRemove?: () => void;
    /** The label content of the chip. */
    children: Snippet;
    /** The `formaction` attribute for the chip when used in a form. */
    formaction?: string;
  };
