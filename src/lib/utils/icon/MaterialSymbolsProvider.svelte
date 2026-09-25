<!--
@component
A helper that handles google icons. Should not be used directly.
Use the App.svelte component instead
-->
<script lang="ts">
  import { baseIcons } from './base-icons.js';
  import type { MaterialSymbolsProviderProps } from './types.js';

  const {
    extraIcons = [],
    display = 'swap',
    subset = true,
    families = ['rounded', 'outlined', 'sharp']
  }: MaterialSymbolsProviderProps = $props();

  const iconList = $derived.by(() => {
    const combined = [...baseIcons, ...extraIcons].filter(Boolean);
    return Array.from(new Set(combined)).sort();
  });

  const iconNamesParam = $derived.by(() => {
    if (!subset || !iconList.length) return '';
    return `&icon_names=${encodeURIComponent(iconList.join(','))}`;
  });

  const displayParam = $derived.by(() => {
    if (!display) return '';
    return `&display=${display}`;
  });

  const href = $derived.by(() => {
    const familyParams = families
      .map(
        (f) =>
          `family=Material+Symbols+${f[0].toUpperCase()}${f.slice(1)}:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`
      )
      .join('&');
    return `https://fonts.googleapis.com/css2?${familyParams}${iconNamesParam}${displayParam}`;
  });
</script>

<svelte:head>
  <link rel="stylesheet" {href} />
</svelte:head>
