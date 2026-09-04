import { Avatar as DicebearAvatar } from '@dicebear/core';
import type { DicebearStyleName } from './dicebearStyles.js';
import { loadDicebearStyle } from './dicebearStyles.js';

export type DicebearFlip = 'none' | 'horizontal' | 'vertical' | 'both';
export type DicebearColorFill = 'solid' | 'linear' | 'radial';
export type DicebearColorOrder = 'random' | 'fixed';

/** The raw options bag passed to DiceBear's `Avatar` constructor. */
export type DicebearAvatarOptions = Record<string, unknown>;

/**
 * Fluent builder around DiceBear's `Style` + `Avatar` SDK classes
 * (https://www.dicebear.com/customize/options/). The style definition is only
 * lazily imported once a terminal method (`build`/`toDataUri`/`toSvg`) is called.
 *
 * Covers the generic options every style accepts (seed, transform, background,
 * typography) as named methods; use `.option()`/`.options()` for options specific
 * to the chosen style's own components (e.g. `hairColor`, `eyesVariant`), which
 * can't be named generically — see the selected style's `OptionsDescriptor`.
 *
 * @example
 * ```ts
 * const uri = await new DicebearAvatarBuilder('lorelei')
 *   .seed('alice')
 *   .size(96)
 *   .background(['b6e3f4', 'c0aede'])
 *   .option('hairColor', ['2c1b18'])
 *   .toDataUri();
 * ```
 */
export class DicebearAvatarBuilder {
  #styleName: DicebearStyleName;
  #options: DicebearAvatarOptions = {};

  constructor(styleName: DicebearStyleName) {
    this.#styleName = styleName;
  }

  seed(seed: string): this {
    this.#options.seed = seed;
    return this;
  }

  size(px: number): this {
    this.#options.size = px;
    return this;
  }

  idRandomization(enabled = true): this {
    this.#options.idRandomization = enabled;
    return this;
  }

  title(text: string): this {
    this.#options.title = text;
    return this;
  }

  font(family: string | string[], weight?: number): this {
    this.#options.fontFamily = Array.isArray(family) ? family : [family];
    if (weight !== undefined) this.#options.fontWeight = weight;
    return this;
  }

  flip(value: DicebearFlip): this {
    this.#options.flip = value;
    return this;
  }

  rotate(degrees: number): this {
    this.#options.rotate = degrees;
    return this;
  }

  scale(factor: number): this {
    this.#options.scale = factor;
    return this;
  }

  borderRadius(radius: number): this {
    this.#options.borderRadius = radius;
    return this;
  }

  translate(x: number, y: number): this {
    this.#options.translateX = x;
    this.#options.translateY = y;
    return this;
  }

  background(
    colors: string[],
    fill: DicebearColorFill = 'solid',
    order: DicebearColorOrder = 'random'
  ): this {
    this.#options.backgroundColor = colors;
    this.#options.backgroundColorFill = fill;
    this.#options.backgroundColorOrder = order;
    return this;
  }

  backgroundGradient(stops: number, angle: number): this {
    this.#options.backgroundColorFillStops = stops;
    this.#options.backgroundColorAngle = angle;
    return this;
  }

  /**
   * Filters which variant a style picks by tag — currently DiceBear's only tag is
   * `'animation'`, which opts a supporting style (e.g. `gaze`, `shapes`, `blobs`) into its
   * animated variants; prefix with `!` (e.g. `'!animation'`) to force the static variant
   * instead. A no-op for styles that don't define the tag.
   * @see https://www.dicebear.com/guides/filter-variants-with-tags
   */
  tags(tags: string[]): this {
    this.#options.tags = tags;
    return this;
  }

  /** Escape hatch for an option specific to the chosen style (e.g. `hairColor`, `eyesVariant`). */
  option(key: string, value: unknown): this {
    this.#options[key] = value;
    return this;
  }

  /** Merges an arbitrary options object in, e.g. one collected from user input. */
  options(values: DicebearAvatarOptions): this {
    Object.assign(this.#options, values);
    return this;
  }

  /** Resolves the style definition and constructs the underlying `Avatar` instance. */
  async build(): Promise<DicebearAvatar> {
    const style = await loadDicebearStyle(this.#styleName);
    return new DicebearAvatar(style, this.#options as never);
  }

  async toDataUri(): Promise<string> {
    return (await this.build()).toDataUri();
  }

  async toSvg(): Promise<string> {
    return (await this.build()).toString();
  }
}
