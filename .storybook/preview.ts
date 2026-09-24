import { DocsContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks';
import type { Preview } from '@storybook/svelte-vite';
import { createElement, useEffect, useState, type PropsWithChildren } from 'react';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';
import { themes } from 'storybook/theming';
import '../src/app.css';
import './preview.css';
import StorybookProviders from './StorybookProviders.svelte';

type Scheme = 'light' | 'dark';

// Same switch the library's ThemeScript/Theme use: the `dark` class on <html>.
function applyScheme(scheme: Scheme) {
  document.documentElement.classList.toggle('dark', scheme === 'dark');
  document.documentElement.style.colorScheme = scheme;
}

// Docs pages are rendered by React, outside the story decorators, so their chrome (and the
// scheme class, for docs pages without inline stories) follows the toolbar through the channel.
function ThemedDocsContainer(props: PropsWithChildren<DocsContainerProps>) {
  const initial =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((props.context as any).store?.userGlobals?.get?.()?.scheme as Scheme | undefined) ?? 'light';
  const [scheme, setScheme] = useState<Scheme>(initial);

  useEffect(() => {
    const onGlobals = ({ globals }: { globals: { scheme?: Scheme } }) =>
      globals.scheme && setScheme(globals.scheme);
    props.context.channel.on(GLOBALS_UPDATED, onGlobals);
    return () => props.context.channel.off(GLOBALS_UPDATED, onGlobals);
  }, [props.context.channel]);

  useEffect(() => applyScheme(scheme), [scheme]);

  return createElement(
    DocsContainer,
    { ...props, theme: scheme === 'dark' ? themes.dark : themes.light },
    props.children
  );
}

const preview: Preview = {
  globalTypes: {
    scheme: {
      description: 'Color scheme',
      toolbar: {
        title: 'Scheme',
        icon: 'mirror',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' }
        ],
        dynamicTitle: true
      }
    }
  },
  initialGlobals: {
    scheme: 'light'
  },
  decorators: [
    (_, context) => {
      applyScheme((context.globals.scheme as Scheme) ?? 'light');
      return { Component: StorybookProviders };
    }
  ],
  parameters: {
    // The canvas paints the M3 surface for the active scheme (preview.css); Storybook's own
    // background tool would paint over it.
    backgrounds: { disable: true },
    docs: { container: ThemedDocsContainer },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
