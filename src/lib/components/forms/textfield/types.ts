import type { IconProps } from '$lib/utils/index.js';
import type { DateValue } from '@internationalized/date';
import type { Snippet } from 'svelte';
import type { HTMLInputAttributes } from 'svelte/elements';
import type { TextFieldVariants } from './theme.js';

/**
 * Props for the Textfield component.
 */
export type TextfieldProps = TextFieldVariants &
  Omit<HTMLInputAttributes, 'children' | 'value'> & {
    /**
     * The current value of the text field.
     */
    value?: string | number | null | DateValue;

    /**
     * The label text for the text field.
     */
    label: string;

    /**
     * The ID for the input element. Auto-generated but can be replaced
     */
    id?: string;

    /**
     * The placeholder text for the input element. Not used in M3
     */
    placeholder?: '';

    /**
     * Reference to the HTML input element.
     */
    elementRef?: HTMLInputElement;

    /**
     * Snippet for supporting text (helper text) displayed below the input.
     */
    supportingText?: Snippet;

    /**
     * Props for the leading icon.
     */
    leadingIconProps?: IconProps;

    /**
     * Props for the trailing icon.
     */
    trailingIconProps?: IconProps;

    /**
     * Maximum number of characters allowed in the text field.
     */
    characterLimit?: number;

    /**
     * Callback function when the trailing icon is clicked.
     */
    trailingOnClick?: () => void;

    /**
     * Snippet to override the default input element.
     */
    inputChild?: Snippet<[{ props: Record<string, any> }]>;

    /**
     * Optional snippet for trailing icon override
     */
    trailingIcon?: Snippet;
  };
