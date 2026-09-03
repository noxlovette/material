<script lang="ts">
  import { MediaQuery } from 'svelte/reactivity';
  import { generateThemeCSS, themeState, STORAGE_KEY } from './theme.svelte.js';

  /**
   * Whether to generate and inject the M3 dynamic-color CSS custom properties
   * derived from `themeState.sourceColor`. When `false`, this component still
   * restores/persists `themeState.scheme` and keeps the `dark` class on
   * `<html>` in sync with it (including system-preference changes) — it just
   * skips generating dynamic-color CSS, for consumers supplying their own
   * static `@noxlovette/material/theme/*` CSS.
   */
  let { generateCSS = true }: { generateCSS?: boolean } = $props();

  // Restore from localStorage on mount
  $effect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      if (parsed.sourceColor) themeState.sourceColor = parsed.sourceColor;
      if (parsed.scheme) themeState.scheme = parsed.scheme;
      if (parsed.contrast) themeState.contrast = parsed.contrast;
      if (parsed.variant) themeState.variant = parsed.variant;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  });

  // Track dark mode, including system preference changes
  const systemDark = new MediaQuery('(prefers-color-scheme: dark)');
  const finalIsDark = $derived(
    themeState.scheme === 'system' ? systemDark.current : themeState.scheme === 'dark'
  );

  const themeStyles = $derived(generateCSS ? generateThemeCSS(themeState, finalIsDark) : '');

  // Persist to localStorage on any change
  $effect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        sourceColor: themeState.sourceColor,
        scheme: themeState.scheme,
        contrast: themeState.contrast,
        variant: themeState.variant
      })
    );
  });

  // Sync dark class on <html>
  $effect(() => {
    if (finalIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });
</script>

<svelte:head>
  {#if generateCSS}
    {@html `<` + `style id="ogonek-m3-dynamic-theme">` + themeStyles + `</` + `style>`}
  {/if}
</svelte:head>
