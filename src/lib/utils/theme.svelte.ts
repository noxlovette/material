import {
	argbFromHex,
	hexFromArgb,
	Hct,
	SchemeTonalSpot,
	MaterialDynamicColors,
	SchemeFidelity,
	SchemeContent,
	SchemeVibrant,
	QuantizerCelebi,
	Score,
	SchemeFruitSalad,
	SchemeRainbow
} from '@ktibow/material-color-utilities-nightly';

// Configuration Types
export type ColorScheme = 'light' | 'dark' | 'system';
export type ContrastMode = 'standard' | 'medium' | 'high';
export type ThemeVariant =
	| 'tonal-spot'
	| 'fidelity'
	| 'content'
	| 'vibrant'
	| 'fruit-salad'
	| 'rainbow';

export interface ThemeConfig {
	sourceColor: string;
	scheme: ColorScheme;
	contrast: ContrastMode;
	variant: ThemeVariant;
}

// Default Configuration
const DEFAULT_CONFIG: ThemeConfig = {
	sourceColor: '#6750A4', // Default M3 purple
	scheme: 'system',
	contrast: 'standard',
	variant: 'tonal-spot'
};

const SCHEME_VARIANTS: Record<ThemeVariant, any> = {
	'tonal-spot': SchemeTonalSpot,
	fidelity: SchemeFidelity,
	content: SchemeContent,
	vibrant: SchemeVibrant,
	'fruit-salad': SchemeFruitSalad,
	rainbow: SchemeRainbow
};

// Svelte 5 State
export const themeState = $state<ThemeConfig>({ ...DEFAULT_CONFIG });

// State Initialization & Hydration
export function initTheme() {
	if (typeof window === 'undefined') return;

	const stored = localStorage.getItem('ogonek-m3-theme-config');
	if (stored) {
		try {
			const parsed = JSON.parse(stored);
			themeState.sourceColor = parsed.sourceColor ?? DEFAULT_CONFIG.sourceColor;
			themeState.scheme = parsed.scheme ?? DEFAULT_CONFIG.scheme;
			themeState.contrast = parsed.contrast ?? DEFAULT_CONFIG.contrast;
			themeState.variant = parsed.variant ?? DEFAULT_CONFIG.variant;
		} catch (e) {
			console.error('Failed to parse stored theme config', e);
		}
	}

	$effect.root(() => {
		$effect(() => {
			// Save to localStorage when state changes
			localStorage.setItem(
				'ogonek-m3-theme-config',
				JSON.stringify({
					sourceColor: themeState.sourceColor,
					scheme: themeState.scheme,
					contrast: themeState.contrast,
					variant: themeState.variant
				})
			);

			applyTheme(themeState);
		});
	});

	// Listen for system theme changes if scheme is 'system'
	const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
	mediaQuery.addEventListener('change', () => {
		if (themeState.scheme === 'system') {
			applyTheme(themeState);
		}
	});
}

function getContrastLevel(contrast: ContrastMode): number {
	switch (contrast) {
		case 'medium':
			return 0.5;
		case 'high':
			return 1.0;
		case 'standard':
		default:
			return 0.0;
	}
}

function isDarkScheme(scheme: ColorScheme): boolean {
	if (scheme === 'system') {
		return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	}
	return scheme === 'dark';
}

function applyTheme(config: ThemeConfig) {
	if (typeof document === 'undefined') return;

	const hct = Hct.fromInt(argbFromHex(config.sourceColor));
	const isDark = isDarkScheme(config.scheme);
	const contrastLevel = getContrastLevel(config.contrast);
	const SchemeClass = SCHEME_VARIANTS[config.variant] || SchemeTonalSpot;

	const dynamicScheme = new SchemeClass(hct, isDark, contrastLevel);

	// Inject CSS variables
	const styleId = 'ogonek-m3-dynamic-theme';
	let styleEl = document.getElementById(styleId) as HTMLStyleElement;
	if (!styleEl) {
		styleEl = document.createElement('style');
		styleEl.id = styleId;
		document.head.appendChild(styleEl);
	}

	// MaterialDynamicColors has static methods for each color.
	// We will extract a predefined list of required colors based on the current CSS
	const colors = {
		primary: MaterialDynamicColors.primary,
		'surface-tint': MaterialDynamicColors.surfaceTint,
		'on-primary': MaterialDynamicColors.onPrimary,
		'primary-container': MaterialDynamicColors.primaryContainer,
		'on-primary-container': MaterialDynamicColors.onPrimaryContainer,
		secondary: MaterialDynamicColors.secondary,
		'on-secondary': MaterialDynamicColors.onSecondary,
		'secondary-container': MaterialDynamicColors.secondaryContainer,
		'on-secondary-container': MaterialDynamicColors.onSecondaryContainer,
		tertiary: MaterialDynamicColors.tertiary,
		'on-tertiary': MaterialDynamicColors.onTertiary,
		'tertiary-container': MaterialDynamicColors.tertiaryContainer,
		'on-tertiary-container': MaterialDynamicColors.onTertiaryContainer,
		error: MaterialDynamicColors.error,
		'on-error': MaterialDynamicColors.onError,
		'error-container': MaterialDynamicColors.errorContainer,
		'on-error-container': MaterialDynamicColors.onErrorContainer,
		background: MaterialDynamicColors.background,
		'on-background': MaterialDynamicColors.onBackground,
		surface: MaterialDynamicColors.surface,
		'on-surface': MaterialDynamicColors.onSurface,
		'surface-variant': MaterialDynamicColors.surfaceVariant,
		'on-surface-variant': MaterialDynamicColors.onSurfaceVariant,
		outline: MaterialDynamicColors.outline,
		'outline-variant': MaterialDynamicColors.outlineVariant,
		shadow: MaterialDynamicColors.shadow,
		scrim: MaterialDynamicColors.scrim,
		'inverse-surface': MaterialDynamicColors.inverseSurface,
		'inverse-on-surface': MaterialDynamicColors.inverseOnSurface,
		'inverse-primary': MaterialDynamicColors.inversePrimary,
		'primary-fixed': MaterialDynamicColors.primaryFixed,
		'primary-fixed-dim': MaterialDynamicColors.primaryFixedDim,
		'on-primary-fixed': MaterialDynamicColors.onPrimaryFixed,
		'on-primary-fixed-variant': MaterialDynamicColors.onPrimaryFixedVariant,
		'secondary-fixed': MaterialDynamicColors.secondaryFixed,
		'secondary-fixed-dim': MaterialDynamicColors.secondaryFixedDim,
		'on-secondary-fixed': MaterialDynamicColors.onSecondaryFixed,
		'on-secondary-fixed-variant': MaterialDynamicColors.onSecondaryFixedVariant,
		'tertiary-fixed': MaterialDynamicColors.tertiaryFixed,
		'tertiary-fixed-dim': MaterialDynamicColors.tertiaryFixedDim,
		'on-tertiary-fixed': MaterialDynamicColors.onTertiaryFixed,
		'on-tertiary-fixed-variant': MaterialDynamicColors.onTertiaryFixedVariant,
		'surface-dim': MaterialDynamicColors.surfaceDim,
		'surface-bright': MaterialDynamicColors.surfaceBright,
		'surface-container-lowest': MaterialDynamicColors.surfaceContainerLowest,
		'surface-container-low': MaterialDynamicColors.surfaceContainerLow,
		'surface-container': MaterialDynamicColors.surfaceContainer,
		'surface-container-high': MaterialDynamicColors.surfaceContainerHigh,
		'surface-container-highest': MaterialDynamicColors.surfaceContainerHighest
	};

	let css = `:root { /* Dynamic Material Design 3 Theme */\n`;
	for (const [key, dynamicColor] of Object.entries(colors)) {
		const argb = dynamicColor.getArgb(dynamicScheme);
		const r = (argb >> 16) & 255;
		const g = (argb >> 8) & 255;
		const b = argb & 255;
		// Output format required by Tailwind CSS vars or native usages `rgb(r g b)`
		css += `  --color-md-sys-color-${key}: rgb(${r} ${g} ${b});\n`;
	}
	css += `}\n`;

	// Apply contrast data-theme to support existing static fallbacks if needed
	// or just let CSS override taking precedence.
	if (isDark) {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}

	styleEl.innerHTML = css;
}

// Image Extraction Utility
export async function extractColorFromImage(imageFile: File): Promise<string | null> {
	return new Promise((resolve) => {
		const img = new Image();
		const url = URL.createObjectURL(imageFile);

		img.onload = () => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			if (!ctx) {
				resolve(null);
				return;
			}

			// Downscale image for faster processing
			const MAX_DIMENSION = 128;
			let width = img.width;
			let height = img.height;
			if (width > height) {
				if (width > MAX_DIMENSION) {
					height = height * (MAX_DIMENSION / width);
					width = MAX_DIMENSION;
				}
			} else {
				if (height > MAX_DIMENSION) {
					width = width * (MAX_DIMENSION / height);
					height = MAX_DIMENSION;
				}
			}

			canvas.width = width;
			canvas.height = height;
			ctx.drawImage(img, 0, 0, width, height);

			const imageData = ctx.getImageData(0, 0, width, height);
			const pixels = imageData.data;
			const pixelsArray = [];

			for (let i = 0; i < pixels.length; i += 4) {
				const r = pixels[i];
				const g = pixels[i + 1];
				const b = pixels[i + 2];
				const a = pixels[i + 3];
				if (a < 255) continue; // Ignore transparent pixels
				const argb = (a << 24) | (r << 16) | (g << 8) | b;
				pixelsArray.push(argb);
			}

			// Extract dominant colors
			const result = QuantizerCelebi.quantize(pixelsArray, 128);
			const ranked = Score.score(result);

			if (ranked.length > 0) {
				resolve(hexFromArgb(ranked[0]));
			} else {
				resolve(null);
			}

			URL.revokeObjectURL(url);
		};
		img.onerror = () => resolve(null);
		img.src = url;
	});
}
