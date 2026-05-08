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
	 * If provided, the theme config will also be saved to a cookie with this domain.
	 * This allows the theme to persist across different subdomains.
	 */
	cookieDomain?: string;
	/**
	 * Cookie name to use for persistence.
	 * Defaults to 'ogonek-m3-theme-config'
	 */
	cookieName?: string;
	/**
	 * Optional CSS generated on the server to prevent FOUC.
	 * Use generateThemeCSS() on the server to create this.
	 */
	ssrThemeCSS?: string;
};
