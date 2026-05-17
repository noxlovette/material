<!--
@component
Injects the theme initialisation script into <head> before first paint,
preventing a flash of unstyled/wrong-scheme content.

Add this to your root +layout.svelte (or any layout that wraps the whole app):
@example
<ThemeScript />
<App>...</App>
-->
<script lang="ts">
  import { THEME_INIT_SCRIPT } from './theme.svelte.js';
</script>

<svelte:head>
  {@html `<script>${THEME_INIT_SCRIPT}</script>`}
</svelte:head>
