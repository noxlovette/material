import type { IconProps } from '$lib/utils/index.js';
import type { HTMLAttributes } from 'svelte/elements';
import type { SliderVariants } from './theme.js';

/**
 * Props for the Slider component.
 */
export type SliderProps = SliderVariants &
	Omit<HTMLAttributes<HTMLSpanElement>, 'size' | 'value'> & {
		/**
		 * The current value of the slider.
		 */
		value: number;

		/**
		 * The minimum value of the slider.
		 */
		min?: number;

		/**
		 * The maximum value of the slider.
		 */
		max?: number;

		/**
		 * The step increment for the slider.
		 */
		step?: number | 'any';

		/**
		 * Whether the slider is disabled.
		 */
		disabled?: boolean;

		/**
		 * Whether to show the current value indicator.
		 */
		showValue?: boolean;

		/**
		 * Props for the leading icon.
		 */
		leadingIconProps?: IconProps;

		/**
		 * Props for the trailing icon.
		 */
		trailingIconProps?: IconProps;

		/**
		 * Whether to show tick marks (stops) for discrete sliders.
		 */
		stops?: boolean;

		/**
		 * Whether to show stops at the ends of the track.
		 */
		endStops?: boolean;

		/**
		 * Function to format the value displayed in the indicator.
		 */
		format?: (value: number) => string;

		/**
		 * Orientation of the slider.
		 */
		vertical?: boolean;
	};
