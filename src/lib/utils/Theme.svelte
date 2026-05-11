<script lang="ts">
  import { generateThemeCSS, isDarkScheme, themeState, type ThemeConfig } from './theme.svelte.js';

  interface Props {
    /**
     * Initial configuration for the theme.
     * Useful for SSR when reading from cookies.
     */
    config?: Partial<ThemeConfig>;
    /**
     * Optional dark mode state passed from the server to prevent flashing.
     * If provided, it overrides the auto-detection.
     */
    isDark?: boolean;
    /**
     * Whether to persist changes to localStorage and cookies.
     * Defaults to true.
     */
    persist?: boolean;
  }

  let { config, isDark: isDarkProp, persist = true }: Props = $props();

  // Sync config to global state
  // We use an effect to keep it in sync if the prop changes,
  // but also run it during initialization for SSR.
  function syncConfig(c?: Partial<ThemeConfig>) {
    if (!c) return;
    if (c.sourceColor) themeState.sourceColor = c.sourceColor;
    if (c.scheme) themeState.scheme = c.scheme;
    if (c.contrast) themeState.contrast = c.contrast;
    if (c.variant) themeState.variant = c.variant;
  }

  // Run immediately for SSR
  syncConfig(config);

  // Keep in sync if prop updates on client
  $effect(() => {
    syncConfig(config);
  });

  // Calculate final dark mode state
  let finalIsDark = $state(isDarkProp !== undefined ? isDarkProp : isDarkScheme(themeState.scheme));

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

  // Persistence effect
  $effect(() => {
    if (!persist) return;

    const configStr = JSON.stringify({
      sourceColor: themeState.sourceColor,
      scheme: themeState.scheme,
      contrast: themeState.contrast,
      variant: themeState.variant
    });

    localStorage.setItem('ogonek-m3-theme-config', configStr);
  });

  // Dark mode class effect
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
