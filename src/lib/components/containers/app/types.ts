import type { MaterialSymbolsProviderProps } from '$lib/utils/index.js';
import type { DivAttrs } from '$lib/utils/types.js';
import type { Snippet } from 'svelte';
import type { ThemeConfig } from '$lib/utils/theme.svelte.js';

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
