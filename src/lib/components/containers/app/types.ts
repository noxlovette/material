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
};
