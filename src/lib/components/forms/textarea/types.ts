import type { IconProps } from '#lib/utils/index.js';
import type { Snippet } from 'svelte';
import type { HTMLTextareaAttributes } from 'svelte/elements';
import type { TextareaVariants } from './theme.js';

/**
 * Props for the Textarea component.
 */
export type TextareaProps = TextareaVariants &
  Omit<HTMLTextareaAttributes, 'children' | 'value' | 'rows'> & {
    /**
     * The current value of the textarea.
     */
    value?: string | null;

    /**
     * The label text for the textarea.
     */
    label: string;

    /**
     * The ID for the textarea element. Auto-generated but can be replaced.
     */
    id?: string;

    /**
     * The placeholder text. Not used in M3: the label takes its place.
     */
    placeholder?: '';

    /**
     * Minimum height, in lines. The field grows with its content from here. Defaults to 3.
     */
    rows?: number;

    /**
     * Maximum height, in lines, before the content scrolls. Omit to grow without limit; set it
     * to `rows` for a fixed-height field.
     */
    maxRows?: number;

    /**
     * Snippet for supporting text (helper or error text) displayed below the field.
     */
    supportingText?: Snippet;

    /**
     * Props for the leading icon, aligned with the first line.
     */
    leadingIconProps?: IconProps;

    /**
     * Props for the trailing icon button, aligned with the first line.
     */
    trailingIconProps?: IconProps;

    /**
     * Shows a character counter below the field. Going over it shows the error state; it does
     * not stop typing (pass `maxlength` for a hard limit).
     */
    characterLimit?: number;

    /**
     * Callback function when the trailing icon is clicked.
     */
    trailingOnClick?: () => void;

    /**
     * Optional snippet for trailing icon override.
     */
    trailingIcon?: Snippet;
  };
