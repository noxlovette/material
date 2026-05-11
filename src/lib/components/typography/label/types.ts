import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { VariantProps } from "tailwind-variants";
import type { label } from "./theme.js";

export type LabelVariants = VariantProps<typeof label>;

/**
 * Props for the Label typography component.
 */
export type LabelProps = LabelVariants &
  HTMLAttributes<HTMLElement> & {
    /**
     * Label text content.
     */
    children: Snippet;
    /**
     * Whether to use the emphasized weight for the label text.
     */
    emphasized?: boolean;
    /**
     * The size of the label text.
     * @default 'medium'
     */
    size?: "small" | "medium" | "large";
  };
