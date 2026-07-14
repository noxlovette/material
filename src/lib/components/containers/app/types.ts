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
   * Whether App manages the M3 dynamic theme (source-color extraction, dark-mode
   * sync, and the injected `<ThemeScript>`/`<Theme>` head elements).
   * Set to `false` if you supply your own static `@noxlovette/material/theme/*` CSS
   * and want to opt out of the runtime dynamic-theming machinery entirely.
   * @default true
   */
  dynamicTheme?: boolean;
};
