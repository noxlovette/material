<!--
@component
The core App wrapper that gives default backgrounds and sets up tooltips and icons.
Also providers auto-detect for dark mode
-->
<script lang="ts">
	import { MaterialSymbolsProvider } from '$lib/utils/index.js';
	import { Tooltip } from 'bits-ui';
	import { app } from './theme.ts';
	import type { AppProps } from './types.ts';
	import { ModeWatcher } from 'mode-watcher';

	const { children, class: className, iconProviderProps = {}, ...restProps }: AppProps = $props();

	const baseCls = $derived(app({ class: className }));
</script>

<MaterialSymbolsProvider {...iconProviderProps} />
<ModeWatcher />
<Tooltip.Provider>
	<div class={baseCls} {...restProps}>
		{@render children()}
	</div>
</Tooltip.Provider>
