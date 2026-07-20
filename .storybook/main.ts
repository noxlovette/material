import type { StorybookConfig } from '@storybook/svelte-vite';

const config: StorybookConfig = {
  stories: ['../src/lib/components/**/*.stories.svelte'],
  addons: ['@storybook/addon-svelte-csf', '@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/svelte-vite',
    options: {}
  },
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: {
        // Points at .storybook/vite.config.ts instead of the project root's vite.config.ts —
        // that config registers `sveltekit()`, and @storybook/svelte-vite hard-errors if it
        // detects SvelteKit's vite plugins (it expects @storybook/sveltekit in that case).
        viteConfigPath: '.storybook/vite.config.ts'
      }
    }
  }
};

export default config;
