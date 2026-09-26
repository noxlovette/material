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

/**
 * Converts a token's resolved value to a 6-digit hex. Dev serves the tokens as written in the
 * theme CSS, `rgb(r g b)` (or `rgb(r, g, b)`), but a production build's CSS minifier rewrites
 * them to hex (`#d1e5f3`, or the short `#fff`): pulling the numbers out of a hex string reads
 * its digit runs as channels and yields a near-black colour, so hex is handled on its own.
 */
function colorToHex(value: string): string | undefined {
  const hex = value.match(/^#([0-9a-f]{3,8})$/i)?.[1];
  if (hex) {
    if (hex.length === 3 || hex.length === 4) {
      return [...hex.slice(0, 3)]
        .map((c) => c + c)
        .join('')
        .toLowerCase();
    }
    // 6 digits, or 8 with alpha (dropped: DiceBear takes opaque backgrounds).
    return hex.length === 6 || hex.length === 8 ? hex.slice(0, 6).toLowerCase() : undefined;
  }

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
    return raw ? colorToHex(raw) : undefined;
  }).filter((hex): hex is string => Boolean(hex));

  return palette.length > 0 ? palette : FALLBACK_PALETTE;
}
