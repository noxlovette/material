import type { Snippet } from 'svelte';
import type { SelectItemProps, SelectRootProps } from 'bits-ui';
import type { SelectVariants } from './theme.js';
import type { IconProps } from '$lib/utils/index.js';

/**
 * Represents an option in the Select component.
 */
export type SelectOptionType = {
	/**
	 * The display name of the option.
	 */
	label?: string;

	/**
	 * The display name of the option (alias for label).
	 */
	name?: string;

	/**
	 * The internal value of the option.
	 */
	value: string;

	/**
	 * Whether the option is disabled.
	 */
	disabled?: boolean;
	[key: string]: unknown;
};

/**
 * Props for the Select component.
 */
export type SelectProps = SelectVariants & {
	/**
	 * The root props
	 */
	rootProps?: SelectRootProps;

	/**
	 * Whether the select is open
	 */
	open?: boolean;
	/**
	 * The value of the selected item(s).
	 */
	value?: string | string[];

	/**
	 * Array of options to display in the select.
	 */
	items?: SelectOptionType[];

	/**
	 * The floating label text.
	 */
	label?: string;

	/**
	 * The placeholder text displayed when no option is selected.
	 */
	placeholder?: string;

	/**
	 * Supporting text shown below the select.
	 */
	supportingText?: Snippet;

	/**
	 * Props for the leading icon.
	 */
	leadingIconProps?: IconProps;

	/**
	 * Additional CSS classes for the trigger element.
	 */
	triggerClass?: string;

	/**
	 * Additional CSS classes for the content element.
	 */
	contentClass?: string;

	/**
	 * Whether the select is in an error state.
	 */
	error?: boolean; onchange?: (value: string | string[]) => void;

	/**
	 * Name for the hidden input (for form submission).
	 */
	name?: string;
};
