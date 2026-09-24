<script lang="ts">
  import { Body } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import Code from '../Code.svelte';
  import GuidePage from '../GuidePage.svelte';
  import Section from '../Section.svelte';
  import SimpleTable from '../SimpleTable.svelte';

  const toc = [
    { id: 'dynamic', label: 'Dynamic color' },
    { id: 'settings', label: 'Theme settings' },
    { id: 'image', label: 'Color from an image' },
    { id: 'static', label: 'Static themes' },
    { id: 'roles', label: 'Using color roles' }
  ];
</script>

<GuidePage
  title="Theming"
  lede="Generate an M3 color scheme from one source color, in light or dark, at three contrast levels."
  {toc}
>
  <Section id="dynamic" title="Dynamic color">
    <Body>
      By default, <Code>App</Code> generates every color role from <Code>themeState</Code> with Material's
      color utilities, and writes them as CSS variables. Change the state and the whole app recolors:
    </Body>
    <CodeBlock
      code={`<script lang="ts">
  import { themeState } from '@noxlovette/material';
<\/script>

<button onclick={() => (themeState.sourceColor = '#006a60')}>Teal</button>
<button onclick={() => (themeState.scheme = 'dark')}>Dark</button>`}
    />
    <SimpleTable
      headers={['Field', 'Values', 'Default']}
      rows={[
        ['`sourceColor`', 'Any hex color', '`#6750A4`'],
        ['`scheme`', '`light`, `dark`, `system`', '`system`'],
        ['`contrast`', '`standard`, `medium`, `high`', '`standard`'],
        [
          '`variant`',
          '`tonal-spot`, `fidelity`, `content`, `vibrant`, `fruit-salad`, `rainbow`',
          '`tonal-spot`'
        ]
      ]}
    />
    <Body>
      The state is saved to <Code>localStorage</Code> and restored on load. Before first paint, an inline
      script applies the saved scheme, so a dark-mode user never sees a light flash.
    </Body>
  </Section>

  <Section id="settings" title="Theme settings">
    <Body>
      <Code>ThemeSwitcher</Code> is a ready-made FAB that opens <Code>ThemeSettings</Code>: source
      color, scheme, contrast and variant. Drop it inside <Code>App</Code>, or render
      <Code>ThemeSettings</Code> in your own settings page.
    </Body>
    <CodeBlock
      code={`<App>
  {@render children()}
  <ThemeSwitcher />
</App>`}
    />
  </Section>

  <Section id="image" title="Color from an image">
    <Body>
      <Code>extractColorFromImage(file)</Code> returns the image's dominant color, ready to use as the
      source color:
    </Body>
    <CodeBlock
      lang="typescript"
      code={`import { extractColorFromImage, themeState } from '@noxlovette/material';

const color = await extractColorFromImage(file);
if (color) themeState.sourceColor = color;`}
    />
  </Section>

  <Section id="static" title="Static themes">
    <Body>
      To ship fixed colors instead, pass <Code>dynamicTheme={'{false}'}</Code> to
      <Code>App</Code> and rely on the imported theme files. <Code>App</Code> still keeps the
      <Code>dark</Code> class in sync with the user's scheme, so the dark theme file applies.
    </Body>
  </Section>

  <Section id="roles" title="Using color roles">
    <Body>
      Color roles are Tailwind colors named after the M3 token:
      <Code>bg-md-sys-color-primary-container</Code>,
      <Code>text-md-sys-color-on-primary-container</Code>. Always pair a container with its
      <Code>on-*</Code> role; the pair keeps AA contrast in every scheme and contrast level.
    </Body>
  </Section>
</GuidePage>
