import type { MaterialSymbolsProviderProps } from '$lib/utils/index.js';
import type { DivAttrs } from '$lib/utils/types.js';
import type { Snippet } from 'svelte';

export type AppProps = DivAttrs & {
  /** Content for the core app */
  children: Snippet;
  /** Additional classes */
  class?: string;
  /** Props to pass to the material symbols provider */
  iconProviderProps?: Partial<MaterialSymbolsProviderProps>;
  /**
   * Whether App generates and injects M3 dynamic-color CSS (source-color
   * extraction into per-scheme custom properties). Set to `false` if you
   * supply your own static `@noxlovette/material/theme/*` CSS instead.
   *
   * Either way, App always mounts `<ThemeScript>`/`<Theme>` to keep the
   * `dark` class on `<html>` in sync with `themeState.scheme` (including
   * system `prefers-color-scheme` changes) — turning this off does not
   * disable dark-mode tracking, since static theme CSS depends on the same
   * `dark` class to apply.
   * @default true
   */
  dynamicTheme?: boolean;
};
