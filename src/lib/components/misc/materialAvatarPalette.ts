/**
 * Container-tier M3 color roles (see `styles/theme/*.css`) used as a generated avatar's
 * background. Deliberately NOT a fixed hex list: every consuming app picks its own source
 * color (`ThemeConfig.sourceColor` in `theme.svelte.ts`), which the M3 dynamic color
 * algorithm expands into these tokens as real `--color-md-sys-color-*` custom properties on
 * `:root` — reading them live is what makes the avatar match that app's actual palette
 * instead of this library's own hardcoded pastel.
 */
const CONTAINER_TOKENS = [
  '--color-md-sys-color-primary-container',
  '--color-md-sys-color-secondary-container',
  '--color-md-sys-color-tertiary-container',
  '--color-md-sys-color-error-container',
  '--color-md-sys-color-surface-container-highest'
];

/** Used server-side, or if a token hasn't been painted yet (styles not loaded). */
const FALLBACK_PALETTE = ['e9ddff', 'e8def8', 'ffd9e3', 'ffdad6', 'e6e0e9'];

/** Converts the `rgb(r g b)` (or `rgb(r, g, b)`) format these tokens are always defined in to hex. */
function rgbStringToHex(value: string): string | undefined {
  const channels = value.match(/\d+(?:\.\d+)?/g);
  if (!channels || channels.length < 3) return undefined;
  return channels
    .slice(0, 3)
    .map((n) =>
      Math.round(Math.max(0, Math.min(255, parseFloat(n))))
        .toString(16)
        .padStart(2, '0')
    )
    .join('');
}

/**
 * Reads the current app's resolved container-tier color tokens as hex strings, for use as
 * DiceBear's `backgroundColor` option. Falls back to a neutral default outside the browser
 * (SSR) or before the theme stylesheet has painted.
 */
export function getMaterialAvatarPalette(): string[] {
  if (typeof window === 'undefined') return FALLBACK_PALETTE;

  const styles = getComputedStyle(document.documentElement);
  const palette = CONTAINER_TOKENS.map((token) => {
    const raw = styles.getPropertyValue(token).trim();
    return raw ? rgbStringToHex(raw) : undefined;
  }).filter((hex): hex is string => Boolean(hex));

  return palette.length > 0 ? palette : FALLBACK_PALETTE;
}
