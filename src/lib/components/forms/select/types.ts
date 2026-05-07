import type { Snippet } from 'svelte';
import type { Select, WithoutChildren } from 'bits-ui';
import type { SelectVariants } from './theme.js';
import type { IconProps } from '$lib/utils/index.js';

/**
 * Represents an option or group in the Select component.
 *
 */
export type SelectOption =
	| ({
			type?: 'item';
	  } & Select.ItemProps)
	| {
			type: 'group';
			/**
			 * If present, the group item will be heading
			 */
			heading?: string;
			items: SelectOption[];
	  };

/**
 * Props for the Select component.
 */
export type SelectProps = SelectVariants &
	WithoutChildren<Select.RootProps> & {
		/**
		 * Whether the select is open
		 */
		open?: boolean;

		/**
		 * Array of options to display in the select.
		 */
		options?: SelectOption[];

		/**
		 * The placeholder text displayed when no option is selected.
		 */
		placeholder?: string;

		/**
		 * Supporting text shown below the select.
		 */
		supportingText?: Snippet;

		/**
		 * Additional props for the trigger element.
		 */
		triggerProps?: Select.TriggerProps;

		/**
		 * Additional props for the content element.
		 */
		contentProps?: Select.ContentProps;

		/**
		 * Whether the select is in an error state.
		 */
		error?: boolean;

		/**
		 * Props for the leading icon.
		 */
		leadingIconProps?: IconProps;
	};
