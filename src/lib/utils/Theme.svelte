<script lang="ts">
  import { generateThemeCSS, isDarkScheme, themeState, DEFAULT_CONFIG } from './theme.svelte.js';

  const STORAGE_KEY = 'ogonek-m3-theme-config';

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
  let finalIsDark = $state(isDarkScheme(themeState.scheme));

  $effect(() => {
    if (themeState.scheme !== 'system') {
      finalIsDark = themeState.scheme === 'dark';
      return;
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      finalIsDark = e.matches;
    };

    finalIsDark = media.matches;
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  });

  const themeStyles = $derived(generateThemeCSS(themeState, finalIsDark));

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
  {@html `<` + `style id="ogonek-m3-dynamic-theme">` + themeStyles + `</` + `style>`}
</svelte:head>
