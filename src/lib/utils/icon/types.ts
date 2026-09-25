import type { HTMLAttributes } from 'svelte/elements';
import Icon from './Icon.svelte';
import type { MaterialSymbolName } from './icon-names.js';
import type { LoadingIndicatorVariants } from './theme.js';
export type { MaterialSymbolName };
export type IconMD = typeof Icon;

export type IconVariant = 'outlined' | 'rounded' | 'sharp';

/** `inline` follows the surrounding text size; the rest are 16, 20, 24, 40 and 48dp. */
export type IconSize = 'inline' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type IconProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** Material Symbols name, e.g. `favorite`. A typo is a type error. Browse them in the Icons guide. */
  name: MaterialSymbolName;
  /**
   * Rendered size. Also picks the optical size (20, 24, 40, 48) unless `opsz` is set.
   * @default 'md'
   */
  size?: IconSize;
  /**
   * Outlined suits dense UIs and light type; rounded pairs with round shapes and heavier type;
   * sharp with rectangular, 0dp-corner designs. Use one style per product.
   * @default 'rounded'
   */
  variant?: IconVariant;
  /**
   * 0 (outlined) to 1 (filled). Use it for state, e.g. 1 on a selected navigation item; changes
   * animate.
   * @default 0
   */
  fill?: number;
  /**
   * Stroke weight, 100 to 700. Match the weight of adjacent text, keep it consistent across a
   * screen, and don't go below 200 at 24dp.
   * @default 400
   */
  wght?: number;
  /**
   * Fine thickness adjustment, -50 to 200. `'auto'` is 0 on light schemes and -25 on dark ones,
   * which offsets the glow of light-on-dark icons. Use a positive grade for emphasis, or match a
   * text font's grade.
   * @default 'auto'
   */
  grad?: number | 'auto';
  /** Optical size, 20 to 48. Defaults to the one matching `size`. */
  opsz?: number;
};
export type LoadingIndicatorProps = HTMLAttributes<SVGAElement> &
  LoadingIndicatorVariants & {
    size?: number;
    container?: boolean;
    center?: boolean;
  };

export type MaterialSymbolsProviderProps = {
  icons?: MaterialSymbolName[];
  /** Icon names to load on top of `baseIcons`. Ignored when `subset` is false. */
  extraIcons?: MaterialSymbolName[];
  /**
   * Load only the named icons (small, fast) or the whole set of several MB per family, which a
   * page choosing icons at runtime, like an icon picker, needs.
   * @default true
   */
  subset?: boolean;
  /**
   * Which styles to load. Loading only the one your product uses saves a request per style.
   * @default ['rounded', 'outlined', 'sharp']
   */
  families?: IconVariant[];
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
};
