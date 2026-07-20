import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// Storybook needs a Vite config that has the Svelte compiler plugin (so .svelte files parse
// at all) but NOT the `sveltekit()` plugin from the project's root vite.config.ts —
// @storybook/svelte-vite hard-errors if it detects SvelteKit's vite plugins, since it expects
// @storybook/sveltekit to be used instead in that case. `sveltekit()` bundles `svelte()`
// together, so we can't reuse the root config as-is and must register the plugin ourselves.
// It also normally provides the `$lib` alias, so that's added back here manually.
export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  resolve: {
    alias: {
      $lib: fileURLToPath(new URL('../src/lib', import.meta.url))
    }
  }
});
