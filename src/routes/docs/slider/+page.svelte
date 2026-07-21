<script lang="ts">
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
  import { Body, Title, Headline, Card, Divider, Icon, SupportingPane } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const sliderProps: PropRow[] = [
    {
      prop: 'value',
      type: 'number',
      default: '—',
      required: true,
      desc: 'The current value. Bindable.'
    },
    {
      prop: 'min',
      type: 'number',
      default: '0',
      desc: 'The minimum value.'
    },
    {
      prop: 'max',
      type: 'number',
      default: '100',
      desc: 'The maximum value.'
    },
    {
      prop: 'step',
      type: "number | 'any'",
      default: "'any'",
      desc: 'Step increment. A number enables discrete dragging/stop rendering; "any" is continuous.'
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      desc: 'Disables the slider.'
    },
    {
      prop: 'showValue',
      type: 'boolean',
      default: 'true',
      desc: 'Shows the floating value bubble above the handle on hover/focus/drag.'
    },
    {
      prop: 'size',
      type: '"xs" | "s" | "m" | "l" | "xl"',
      default: '"xs"',
      desc: 'Controls track thickness, handle height, and whether leading/trailing icons render at a visible size.'
    },
    {
      prop: 'leadingIconProps',
      type: 'IconProps',
      default: '—',
      desc: 'Props for an icon anchored at the track start (only rendered at size m/l/xl).'
    },
    {
      prop: 'trailingIconProps',
      type: 'IconProps',
      default: '—',
      desc: 'Props for an icon anchored at the track end (only rendered at size m/l/xl).'
    },
    {
      prop: 'stops',
      type: 'boolean',
      default: 'false',
      desc: 'Shows tick marks at each discrete step (requires a numeric step).'
    },
    {
      prop: 'endStops',
      type: 'boolean',
      default: 'true',
      desc: 'Shows a tick mark at the track end regardless of stops.'
    },
    {
      prop: 'vertical',
      type: 'boolean',
      default: 'false',
      desc: 'Renders the slider in vertical orientation.'
    },
    {
      prop: 'format',
      type: '(value: number) => string',
      default: '(n) => n.toFixed(0)',
      desc: 'Formats the value shown in the floating value bubble.'
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'import', label: 'Import' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'slider-props', label: 'Slider Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>Slider — Ogonëk M3 Docs</title>
</svelte:head>

<SupportingPane anchor="viewport" position="right" collapsible={false} rounded={false} gap="none">
  {#snippet main()}
    <SinglePane>
      <header class="mb-10 flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <nav class="text-md-sys-color-on-surface-variant text-sm" aria-label="Breadcrumb">
            <ol class="flex items-center gap-1">
              <li><a href="/docs" class="hover:text-md-sys-color-primary no-underline">Docs</a></li>
              <li class="mx-1 opacity-40">/</li>
              <li>
                <a href="/docs" class="hover:text-md-sys-color-primary no-underline">Inputs</a>
              </li>
              <li class="mx-1 opacity-40">/</li>
              <li class="text-md-sys-color-on-surface font-medium">Slider</li>
            </ol>
          </nav>
          <span
            class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
            >Stable</span
          >
        </div>

        <Headline>Slider</Headline>
        <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
          Sliders let users make selections from a continuous or discrete range of values. Built on
          bits-ui's <code class="doc-code">Slider.Root</code> in single-thumb mode, with a floating value
          bubble and optional leading/trailing icons and tick stops.
        </Body>

        <div class="flex flex-wrap gap-2 pt-1">
          <a
            href="https://m3.material.io/components/sliders/overview"
            target="_blank"
            rel="noopener noreferrer"
            class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
          >
            M3 Spec
            <Icon name="open_in_new" size="xs" class="opacity-60" />
          </a>
        </div>
      </header>

      <Divider class="mb-12" />

      <section id="overview" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Overview</Title>
        <Body>
          The <code class="doc-code">Slider</code> component implements the
          <a
            href="https://m3.material.io/components/sliders/overview"
            target="_blank"
            rel="noopener noreferrer"
            class="text-md-sys-color-primary">Material Design 3 Slider</a
          >
          pattern, including the M3-specific gapped track (a visible break between the active fill and
          the handle).
        </Body>
        <Body>
          Set a numeric <code class="doc-code">step</code> and <code class="doc-code">stops</code>
          to render discrete tick marks; leave <code class="doc-code">step="any"</code> for continuous
          dragging.
        </Body>
      </section>

      <section id="import" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Import</Title>
        <CodeBlock lang="typescript" code={`import { Slider } from '@noxlovette/material';`} />
      </section>

      <section id="demo" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Live Demo</Title>
        <Body class="text-md-sys-color-on-surface-variant">
          See it live, with Controls, in Storybook rather than a hand-rolled preview here.
        </Body>

        <a
          href={storybookStoryUrl('forms-slider--playground')}
          target="_blank"
          rel="noopener noreferrer"
          class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90 sm:max-w-sm"
        >
          <Icon name="widgets" />
          <div>
            <p class="md-sys-typescale-title-small">Playground</p>
            <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
              >Open the Slider story with Controls for size, step, and stops.</Body
            >
          </div>
        </a>
      </section>

      <section id="basic-usage" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Basic Usage</Title>
        <Body>Bind <code class="doc-code">value</code> to read and set the position:</Body>

        <CodeBlock
          code={`<script lang="ts">
  import { Slider } from '@noxlovette/material';

  let volume = $state(40);
<\/script>

<Slider bind:value={volume} min={0} max={100} />`}
        />
      </section>

      <section id="slider-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Slider Props</Title>
        <div class="overflow-x-auto rounded-xl border border-black/5">
          <table class="w-full border-collapse text-sm">
            <thead>
              <tr class="bg-md-sys-color-surface-container-highest">
                <th class="border-md-sys-color-outline-variant border-b p-3 text-left font-semibold"
                  >Prop</th
                >
                <th class="border-md-sys-color-outline-variant border-b p-3 text-left font-semibold"
                  >Type</th
                >
                <th class="border-md-sys-color-outline-variant border-b p-3 text-left font-semibold"
                  >Default</th
                >
                <th class="border-md-sys-color-outline-variant border-b p-3 text-left font-semibold"
                  >Description</th
                >
              </tr>
            </thead>
            <tbody>
              {#each sliderProps as row}
                <tr
                  class="even:bg-md-sys-color-surface-container/30 border-md-sys-color-outline-variant/50 border-b last:border-b-0"
                >
                  <td class="p-3">
                    <div class="flex items-center gap-1.5">
                      <code class="text-md-sys-color-primary font-mono text-xs font-semibold"
                        >{row.prop}</code
                      >
                      {#if row.required}
                        <span
                          class="bg-md-sys-color-error-container text-md-sys-color-on-error-container rounded px-1 text-[10px] font-medium"
                          >required</span
                        >
                      {/if}
                    </div>
                  </td>
                  <td class="p-3"
                    ><code class="text-md-sys-color-on-surface-variant font-mono text-xs"
                      >{row.type}</code
                    ></td
                  >
                  <td class="p-3"
                    ><code class="text-md-sys-color-on-surface-variant font-mono text-xs"
                      >{row.default}</code
                    ></td
                  >
                  <td class="text-md-sys-color-on-surface-variant p-3 text-xs leading-relaxed"
                    >{row.desc}</td
                  >
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </section>

      <section id="accessibility" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Accessibility</Title>
        <div class="flex flex-col gap-3">
          {#each [{ icon: 'keyboard', title: 'Keyboard support', desc: 'Arrow keys nudge by one step, Home/End jump to min/max — all handled by bits-ui Slider.Root.' }, { icon: 'visibility', title: 'Focus ring', desc: 'The handle draws a visible outline on keyboard focus, distinct from hover/drag states.' }, { icon: 'chat_bubble', title: 'Value bubble', desc: 'showValue surfaces the numeric value visually on hover/focus/drag; format() lets you localize or add units.' }] as item}
            <Card class="flex items-start gap-4 p-4">
              <div
                class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              >
                <Icon name={item.icon} size="sm" />
              </div>
              <div>
                <p class="text-md-sys-color-on-surface mb-1 text-sm font-semibold">{item.title}</p>
                <Body class="text-md-sys-color-on-surface-variant">{item.desc}</Body>
              </div>
            </Card>
          {/each}
        </div>
      </section>

      <footer
        class="border-md-sys-color-outline-variant flex items-center justify-between border-t pt-8"
      >
        <a
          href="/docs/select"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          <Icon name="arrow_back" size="sm" />
          Previous: Select
        </a>
        <a
          href="/docs/search"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          Next: Search
          <Icon name="arrow_forward" size="sm" />
        </a>
      </footer></SinglePane
    >
  {/snippet}

  {#snippet supporting()}
    <TableOfContents sections={toc} />
  {/snippet}
</SupportingPane>

<style>
  :global(.doc-code) {
    background-color: var(--md-sys-color-surface-container);
    border-radius: 4px;
    padding: 1px 6px;
    font-family: monospace;
    font-size: 0.875em;
  }
</style>
