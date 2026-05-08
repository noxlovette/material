import type { HTMLAttributes } from 'svelte/elements';
import Icon from './Icon.svelte';
import type { LoadingIndicatorVariants } from './theme.js';
export type IconMD = typeof Icon;

export type IconVariant = 'outlined' | 'rounded' | 'sharp';

export type IconProps = HTMLAttributes<HTMLSpanElement> & {
	name: string;
	variant?: IconVariant;
	fill?: 0 | 1;
	wght?: number; // 100..700
	grad?: number; // -50..200
	opsz?: number; // 20..48
};

export type LoadingIndicatorProps = HTMLAttributes<SVGAElement> &
	LoadingIndicatorVariants & {
		size?: number;
		container?: boolean;
		center?: boolean;
	};

export type MaterialSymbolsProviderProps = {
	icons?: string[];
	extraIcons?: string[];
	display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
};
