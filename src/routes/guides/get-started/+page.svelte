<script lang="ts">
  import { Body } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import { storybookHref } from '../../storybook.js';
  import Code from '../Code.svelte';
  import GuidePage from '../GuidePage.svelte';
  import Section from '../Section.svelte';
  import { guideHref } from '../nav.js';

  const toc = [
    { id: 'install', label: 'Install' },
    { id: 'css', label: 'Import the CSS' },
    { id: 'app', label: 'Wrap your app' },
    { id: 'icons', label: 'Icons' },
    { id: 'use', label: 'Use components' }
  ];
</script>

<GuidePage
  title="Get started"
  lede="Material Design 3 components for Svelte 5 and Tailwind CSS 4, built on Bits UI."
  {toc}
>
  <Section id="install" title="Install">
    <CodeBlock lang="bash" code="npm i @noxlovette/material" />
    <Body>
      The package expects <Code>svelte</Code> 5, <Code>@sveltejs/kit</Code> 2 and
      <Code>tailwindcss</Code> 4 in your project, plus the peer dependencies
      <Code>@tailwindcss/typography</Code>, <Code>tailwind-scrollbar</Code> and
      <Code>@internationalized/date</Code>.
    </Body>
  </Section>

  <Section id="css" title="Import the CSS">
    <Body>
      In your Tailwind entry stylesheet, import Tailwind, then the library's styles, then the
      themes. The order matters: the library's tokens build on Tailwind's, and the themes override
      the tokens. The <Code>dark</Code> variant has to follow Tailwind's import.
    </Body>
    <CodeBlock
      lang="css"
      code={`@import 'tailwindcss';
@import '@noxlovette/material/styles';
@import '@noxlovette/material/theme/light';
@import '@noxlovette/material/theme/dark';

@custom-variant dark (&:is(.dark *));`}
    />
    <Body>
      The styles add M3's spacing tokens next to Tailwind's numeric scale:
      <Code>p-spacing-200</Code> is M3's 16dp, the same as <Code>p-4</Code>. See
      <a href={guideHref('tokens')} class="text-md-sys-color-primary">Tokens</a>.
    </Body>
  </Section>

  <Section id="app" title="Wrap your app">
    <Body>
      <Code>App</Code> goes around everything in your root layout. It sets the surface background, the
      tooltip provider and icon loading, and it runs the theme: dynamic color, and the
      <Code>dark</Code> class on <Code>&lt;html&gt;</Code>, set before first paint so there's no
      flash of the wrong scheme.
    </Body>
    <CodeBlock
      code={`<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { App } from '@noxlovette/material';
  import '../app.css';

  const { children } = $props();
<\/script>

<App>
  {@render children()}
</App>`}
    />
    <Body>
      Keep <Code>lang</Code> on your <Code>&lt;html&gt;</Code> (SvelteKit's template sets
      <Code>lang="en"</Code>). The type scale reads it to pick line heights for the script.
    </Body>
  </Section>

  <Section id="icons" title="Icons">
    <Body>
      Icons are Material Symbols. <Code>App</Code> loads the font with the icons the components use. Pass
      any other icon names your app uses, or they render as plain text:
    </Body>
    <CodeBlock code={`<App iconProviderProps={{ extraIcons: ['search', 'add', 'settings'] }}>`} />
  </Section>

  <Section id="use" title="Use components">
    <CodeBlock
      code={`<script lang="ts">
  import { Button, Card, Title } from '@noxlovette/material';
<\/script>

<Card padding="md">
  <Title>Hello world</Title>
  <Button>Click me</Button>
</Card>`}
    />
    <Body>
      Every component, with its props and live examples, is in
      <a href={storybookHref()} class="text-md-sys-color-primary">Storybook</a>.
    </Body>
  </Section>
</GuidePage>
