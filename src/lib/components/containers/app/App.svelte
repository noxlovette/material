<!--
@component
The core App wrapper that gives default backgrounds and sets up tooltips and icons.
It manages the Material 3 Dynamic Theme, dark mode, and icon providers.
-->
<script lang="ts">
  import { MaterialSymbolsProvider, Theme } from '$lib/utils/index.js';
  import { Tooltip } from 'bits-ui';
  import { app } from './theme';
  import type { AppProps } from './types';
  import ThemeScript from '$lib/utils/ThemeScript.svelte';

  let { children, class: className, iconProviderProps = {}, ...restProps }: AppProps = $props();

  const baseCls = $derived(app({ class: className }));
</script>

<ThemeScript />
<Theme />
<MaterialSymbolsProvider {...iconProviderProps} />
<Tooltip.Provider>
  <div class={baseCls} {...restProps}>
    {@render children()}
  </div>
</Tooltip.Provider>
