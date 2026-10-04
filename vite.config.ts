import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      preprocess: vitePreprocess(),
      adapter: adapter({ fallback: '404.html' }),
      paths: { base: process.env.BASE_PATH || '' },
      prerender: { handleHttpError: 'warn', handleMissingId: 'warn' }
    })
  ],
  ssr: { noExternal: ['mode-watcher', 'runed', 'svelte-toolbelt'] },
  // Tell Vitest to use the `browser` entry points (e.g. `svelte/events`, `mount`) even
  // though it runs in Node — DOM tests opt into jsdom per file.
  resolve: process.env.VITEST ? { conditions: ['browser'] } : undefined
});
