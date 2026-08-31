<!--
@component
The core App wrapper that gives default backgrounds and sets up tooltips and icons.
By default it also manages the Material 3 Dynamic Theme; pass `dynamicTheme={false}`
to opt out and rely on static theme CSS instead. Either way, App always keeps the
`dark` class on `<html>` in sync with the user's/system's color scheme, so static
theme CSS still responds to dark mode.
-->
<script lang="ts">
  import { MaterialSymbolsProvider, Theme } from '$lib/utils/index.js';
  import { Tooltip } from 'bits-ui';
  import { app } from './theme';
  import type { AppProps } from './types';
  import ThemeScript from '$lib/utils/ThemeScript.svelte';

  let {
    children,
    class: className,
    iconProviderProps = {},
    dynamicTheme = true,
    ...restProps
  }: AppProps = $props();

  const baseCls = $derived(app({ class: className }));
</script>

<ThemeScript />
<Theme generateCSS={dynamicTheme} />
<MaterialSymbolsProvider {...iconProviderProps} />
<Tooltip.Provider>
  <div class={baseCls} {...restProps}>
    {@render children()}
  </div>
</Tooltip.Provider>
