import type { MaterialSymbolsProviderProps } from '$lib/utils/index.js';
import type { ThemeConfig } from '$lib/utils/theme.svelte.js';
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
   * Optional CSS generated on the server to prevent FOUC.
   */
  ssrThemeCSS?: string;
  /**
   * Optional theme configuration passed from the server.
   * If provided, the App component will generate the theme CSS automatically.
   */
  themeConfig?: ThemeConfig;
  /**
   * Optional dark mode state passed from the server to prevent flashing.
   */
  isDark?: boolean;
};
