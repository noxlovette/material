<!--
@component
The core App wrapper that gives default backgrounds and sets up tooltips and icons.
Also providers auto-detect for dark mode
-->
<script lang="ts">
	import { MaterialSymbolsProvider, initTheme, generateThemeCSS } from '$lib/utils/index.js';
	import { Tooltip } from 'bits-ui';
	import { app } from './theme.ts';
	import type { AppProps } from './types.ts';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';

	const {
		children,
		class: className,
		iconProviderProps = {},
		cookieDomain,
		cookieName,
		ssrThemeCSS,
		themeConfig,
		isDark,
		...restProps
	}: AppProps = $props();

	const baseCls = $derived(app({ class: [className, isDark ? 'dark' : ''] }));

	// Generate CSS if themeConfig is provided (useful for server-side)
	const dynamicCSS = $derived(ssrThemeCSS || (themeConfig ? generateThemeCSS(themeConfig) : ''));

	// Initialize the Material 3 Dynamic Theme on the client
	onMount(() => {
		initTheme({ cookieDomain, cookieName });
	});
</script>

<svelte:head>
	{#if dynamicCSS}
		<style id="ogonek-m3-dynamic-theme">
			{@html dynamicCSS}
		</style>
	{/if}
</svelte:head>

<MaterialSymbolsProvider {...iconProviderProps} />
<ModeWatcher />
<Tooltip.Provider>
	<div class={baseCls} {...restProps}>
		{@render children()}
	</div>
</Tooltip.Provider>
