import type { Preview } from '@storybook/svelte-vite';
import '../src/app.css';
import StorybookProviders from './StorybookProviders.svelte';

const preview: Preview = {
  decorators: [() => ({ Component: StorybookProviders })],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
