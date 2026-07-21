<script lang="ts">
  import { base } from '$app/paths';
  import { Display, SinglePane, Headline, Body, Card, Title, Icon, Divider } from '$lib/index.js';
  import CodeBlock from './CodeBlock.svelte';

  const storybookHref = import.meta.env.DEV ? 'http://localhost:6006' : `${base}/storybook/`;

  const cta = [
    {
      title: 'Browse components',
      description: 'Every component, every variant, live and interactive — powered by Storybook.',
      href: storybookHref,
      icon: 'widgets',
      external: true
    },
    {
      title: 'Read the docs',
      description: 'Props, usage guidance, and rationale behind each component.',
      href: `${base}/docs`,
      icon: 'book',
      external: false
    }
  ];
</script>

<svelte:head>
  <title>Overview | Ogonëk M3</title>
</svelte:head>

<SinglePane>
  <div class="flex flex-col gap-4">
    <Display>Ogonëk M3</Display>
    <Headline>Component Library Overview</Headline>
    <Body class="max-w-2xl">
      Welcome to the Ogonëk M3 component library. This library is built following Material Design 3
      guidelines and uses Bits UI for headless components.
    </Body>
  </div>

  <Divider />

  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    {#each cta as item}
      <a
        href={item.href}
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noopener noreferrer' : undefined}
        class="no-underline"
      >
        <Card class="hover:bg-md-sys-color-surface-container-high h-full p-6 transition-all">
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <Icon name={item.icon} class="text-md-sys-color-primary" />
              <Title>{item.title}</Title>
            </div>
            <Body>{item.description}</Body>
          </div>
        </Card>
      </a>
    {/each}
  </div>

  <Divider />

  <div class="flex flex-col gap-8">
    <Headline>Get Started</Headline>

    <div class="flex flex-col gap-3">
      <Title>1. Install</Title>
      <CodeBlock code="npm i @noxlovette/material" lang="bash" />
    </div>

    <div class="flex flex-col gap-3">
      <Title>2. Import styles</Title>
      <Body>Add to your root CSS file or layout stylesheet:</Body>
      <CodeBlock code="@import '@noxlovette/material/styles';" lang="css" />
    </div>

    <div class="flex flex-col gap-3">
      <Title>3. Wrap your app</Title>
      <Body
        >The App component sets up theming, dark-mode detection, and icon loading. Pass any extra
        icons your app uses via iconProviderProps.</Body
      >
      <CodeBlock
        code={`<script lang="ts">
  import { App } from '@noxlovette/material';
<\/script>

<App iconProviderProps={{ extraIcons: ['search', 'add'] }}>
  <!-- your content -->
</App>`}
      />
    </div>

    <div class="flex flex-col gap-3">
      <Title>4. Use components</Title>
      <CodeBlock
        code={`<script lang="ts">
  import { Button, Card, Title } from '@noxlovette/material';
<\/script>

<Card class="p-4">
  <Title>Hello world</Title>
  <Button>Click me</Button>
</Card>`}
      />
    </div>

    <div class="flex flex-col gap-3">
      <Title>5. Setup Dynamic Theming (Optional)</Title>
      <Body>
        You can generate Material Design 3 themes dynamically in the browser using a source color or
        an image, and easily toggle light/dark modes and contrast levels.
      </Body>

      <Title size="small">Recommended: Server-Side Rendering (SSR)</Title>
      <Body>
        To prevent the "Flash of Unstyled Content" (FOUC), it is recommended to read the theme
        configuration on the server and pass it to the
        <code class="bg-md-sys-color-surface-container-high rounded px-1.5 py-0.5 text-sm">App</code
        >
        component.
      </Body>
      <CodeBlock
        code={`// src/routes/+layout.server.ts
		import { DEFAULT_CONFIG } from '@noxlovette/material';

		export const load = ({ cookies }) => {
		const themeCookie = cookies.get('ogonek-m3-theme-config');
		let themeConfig = DEFAULT_CONFIG;

		if (themeCookie) {
		try {
		themeConfig = JSON.parse(decodeURIComponent(themeCookie));
		} catch (e) {}
		}

		return { themeConfig };
		};`}
        lang="typescript"
      />
      <CodeBlock
        code={`<script lang="ts">
			import { App, ThemeSwitcher, isDarkScheme } from '@noxlovette/material';
			const { data, children } = $props();

			const isDark = $derived(isDarkScheme(data.themeConfig.scheme));
			<\/script>

			<App themeConfig={data.themeConfig} {isDark}>
			{@render children()}
			<ThemeSwitcher />
			</App>`}
      />
    </div>
  </div>
</SinglePane>
