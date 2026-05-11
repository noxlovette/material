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
  import { ModeWatcher } from 'mode-watcher';

  let {
    children,
    class: className,
    iconProviderProps = {},
    themeConfig,
    isDark,
    ...restProps
  }: AppProps = $props();

  const baseCls = $derived(app({ class: [className, isDark ? 'dark' : ''] }));
</script>

<Theme config={themeConfig} {isDark} />
<MaterialSymbolsProvider {...iconProviderProps} />
<ModeWatcher />
<Tooltip.Provider>
  <div class={baseCls} {...restProps}>
    {@render children()}
  </div>
</Tooltip.Provider>
