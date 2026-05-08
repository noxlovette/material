<!--
@component
The core App wrapper that gives default backgrounds and sets up tooltips and icons.
Also providers auto-detect for dark mode
-->
<script lang="ts">
	import { MaterialSymbolsProvider, initTheme } from '$lib/utils/index.js';
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
		...restProps
	}: AppProps = $props();

	const baseCls = $derived(app({ class: className }));

	// Initialize the Material 3 Dynamic Theme
	$effect(() => {
		initTheme({ cookieDomain, cookieName });
	});
</script>

<svelte:head>
	{#if ssrThemeCSS}
		<style id="ogonek-m3-dynamic-theme">
			{@html ssrThemeCSS}
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
