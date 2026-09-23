import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  ssr: {
    noExternal: ['mode-watcher', 'runed', 'svelte-toolbelt']
  },
  // Tell Vitest to use the `browser` entry points (e.g. `svelte/events`, `mount`) even
  // though it runs in Node — DOM tests opt into jsdom per file.
  resolve: process.env.VITEST ? { conditions: ['browser'] } : undefined
});
