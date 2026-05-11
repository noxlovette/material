import {
  argbFromHex,
  Hct,
  hexFromArgb,
  MaterialDynamicColors,
  QuantizerCelebi,
  SchemeContent,
  SchemeFidelity,
  SchemeFruitSalad,
  SchemeRainbow,
  SchemeTonalSpot,
  SchemeVibrant,
  Score,
} from "@ktibow/material-color-utilities-nightly";

// --- Types & Config ---

export type ColorScheme = "light" | "dark" | "system";
export type ContrastMode = "standard" | "medium" | "high";
export type ThemeVariant =
  | "tonal-spot"
  | "fidelity"
  | "content"
  | "vibrant"
  | "fruit-salad"
  | "rainbow";

export interface ThemeConfig {
  sourceColor: string;
  scheme: ColorScheme;
  contrast: ContrastMode;
  variant: ThemeVariant;
}

export const DEFAULT_CONFIG: ThemeConfig = {
  sourceColor: "#6750A4",
  scheme: "system",
  contrast: "standard",
  variant: "tonal-spot",
};

const SCHEME_VARIANTS: Record<ThemeVariant, any> = {
  "tonal-spot": SchemeTonalSpot,
  fidelity: SchemeFidelity,
  content: SchemeContent,
  vibrant: SchemeVibrant,
  "fruit-salad": SchemeFruitSalad,
  rainbow: SchemeRainbow,
};

// --- State ---

/**
 * Global reactive theme state.
 * Changes to this state will automatically update the theme if the <Theme /> component is mounted.
 */
export const themeState = $state<ThemeConfig>({ ...DEFAULT_CONFIG });

// --- Utilities ---

export function isDarkScheme(scheme: ColorScheme): boolean {
  if (typeof window === "undefined") return scheme === "dark";
  if (scheme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return scheme === "dark";
}

function getContrastLevel(contrast: ContrastMode): number {
  switch (contrast) {
    case "medium":
      return 0.5;
    case "high":
      return 1.0;
    default:
      return 0.0;
  }
}

/**
 * Generates the CSS variables for a given theme configuration.
 */
export function generateThemeCSS(
  config: ThemeConfig,
  isDark?: boolean,
): string {
  const hct = Hct.fromInt(argbFromHex(config.sourceColor));
  const dark = isDark ?? isDarkScheme(config.scheme);
  const contrastLevel = getContrastLevel(config.contrast);
  const SchemeClass = SCHEME_VARIANTS[config.variant] || SchemeTonalSpot;

  const dynamicScheme = new SchemeClass(hct, dark, contrastLevel);

  const colors = {
    primary: MaterialDynamicColors.primary,
    "surface-tint": MaterialDynamicColors.surfaceTint,
    "on-primary": MaterialDynamicColors.onPrimary,
    "primary-container": MaterialDynamicColors.primaryContainer,
    "on-primary-container": MaterialDynamicColors.onPrimaryContainer,
    secondary: MaterialDynamicColors.secondary,
    "on-secondary": MaterialDynamicColors.onSecondary,
    "secondary-container": MaterialDynamicColors.secondaryContainer,
    "on-secondary-container": MaterialDynamicColors.onSecondaryContainer,
    tertiary: MaterialDynamicColors.tertiary,
    "on-tertiary": MaterialDynamicColors.onTertiary,
    "tertiary-container": MaterialDynamicColors.tertiaryContainer,
    "on-tertiary-container": MaterialDynamicColors.onTertiaryContainer,
    error: MaterialDynamicColors.error,
    "on-error": MaterialDynamicColors.onError,
    "error-container": MaterialDynamicColors.errorContainer,
    "on-error-container": MaterialDynamicColors.onErrorContainer,
    background: MaterialDynamicColors.background,
    "on-background": MaterialDynamicColors.onBackground,
    surface: MaterialDynamicColors.surface,
    "on-surface": MaterialDynamicColors.onSurface,
    "surface-variant": MaterialDynamicColors.surfaceVariant,
    "on-surface-variant": MaterialDynamicColors.onSurfaceVariant,
    outline: MaterialDynamicColors.outline,
    "outline-variant": MaterialDynamicColors.outlineVariant,
    shadow: MaterialDynamicColors.shadow,
    scrim: MaterialDynamicColors.scrim,
    "inverse-surface": MaterialDynamicColors.inverseSurface,
    "inverse-on-surface": MaterialDynamicColors.inverseOnSurface,
    "inverse-primary": MaterialDynamicColors.inversePrimary,
    "primary-fixed": MaterialDynamicColors.primaryFixed,
    "primary-fixed-dim": MaterialDynamicColors.primaryFixedDim,
    "on-primary-fixed": MaterialDynamicColors.onPrimaryFixed,
    "on-primary-fixed-variant": MaterialDynamicColors.onPrimaryFixedVariant,
    "secondary-fixed": MaterialDynamicColors.secondaryFixed,
    "secondary-fixed-dim": MaterialDynamicColors.secondaryFixedDim,
    "on-secondary-fixed": MaterialDynamicColors.onSecondaryFixed,
    "on-secondary-fixed-variant": MaterialDynamicColors.onSecondaryFixedVariant,
    "tertiary-fixed": MaterialDynamicColors.tertiaryFixed,
    "tertiary-fixed-dim": MaterialDynamicColors.tertiaryFixedDim,
    "on-tertiary-fixed": MaterialDynamicColors.onTertiaryFixed,
    "on-tertiary-fixed-variant": MaterialDynamicColors.onTertiaryFixedVariant,
    "surface-dim": MaterialDynamicColors.surfaceDim,
    "surface-bright": MaterialDynamicColors.surfaceBright,
    "surface-container-lowest": MaterialDynamicColors.surfaceContainerLowest,
    "surface-container-low": MaterialDynamicColors.surfaceContainerLow,
    "surface-container": MaterialDynamicColors.surfaceContainer,
    "surface-container-high": MaterialDynamicColors.surfaceContainerHigh,
    "surface-container-highest": MaterialDynamicColors.surfaceContainerHighest,
  };

  let css = `:root { /* Dynamic M3 Theme */\n`;
  for (const [key, dynamicColor] of Object.entries(colors)) {
    const argb = dynamicColor.getArgb(dynamicScheme);
    const r = (argb >> 16) & 255;
    const g = (argb >> 8) & 255;
    const b = argb & 255;
    css += `  --color-md-sys-color-${key}: rgb(${r} ${g} ${b});\n`;
  }
  css += `}\n`;

  return css;
}

/**
 * Extracts the dominant color from an image file.
 */
export async function extractColorFromImage(
  imageFile: File,
): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(imageFile);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(null);
        return;
      }

      const MAX_DIMENSION = 128;
      let { width, height } = img;
      if (width > height) {
        if (width > MAX_DIMENSION) {
          height *= MAX_DIMENSION / width;
          width = MAX_DIMENSION;
        }
      } else if (height > MAX_DIMENSION) {
        width *= MAX_DIMENSION / height;
        height = MAX_DIMENSION;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const { data } = ctx.getImageData(0, 0, width, height);
      const pixelsArray = [];
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] < 255) continue;
        pixelsArray.push(
          (data[i + 3] << 24) |
            (data[i] << 16) |
            (data[i + 1] << 8) |
            data[i + 2],
        );
      }

      const result = QuantizerCelebi.quantize(pixelsArray, 128);
      const ranked = Score.score(result);
      resolve(ranked.length > 0 ? hexFromArgb(ranked[0]) : null);
      URL.revokeObjectURL(url);
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}
