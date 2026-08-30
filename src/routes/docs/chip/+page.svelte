<script lang="ts">
  import { Body, Title, Headline, Card, Divider, Icon, Pane, PaneGrid } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const chipProps: PropRow[] = [
    {
      prop: 'children',
      type: 'Snippet',
      default: '—',
      required: true,
      desc: "The chip's label content."
    },
    {
      prop: 'variant',
      type: `'assist' | 'filter' | 'input' | 'suggestion'`,
      default: `'assist'`,
      desc: 'The semantic chip type. Assist and suggestion render as a button (momentary action); filter renders as a toggle with a selected state; input renders as a container with an optional trailing remove control.'
    },
    {
      prop: 'elevated',
      type: 'boolean',
      default: 'false',
      desc: "Renders a shadowed container instead of the flat/outlined default. Ignored for variant 'input', which is always flat."
    },
    {
      prop: 'selected',
      type: 'boolean',
      default: 'false',
      desc: "Whether the chip is selected. Bindable. Drives the toggle + leading checkmark on 'filter' chips, and the tonal highlight on 'input' chips."
    },
    {
      prop: 'onPressedChange',
      type: '(selected: boolean) => void',
      default: '—',
      desc: "Called when a 'filter' chip's selected state changes via interaction."
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      desc: 'Whether the chip is disabled.'
    },
    {
      prop: 'iconProps',
      type: 'IconProps',
      default: '—',
      desc: "Optional leading icon. On a selected 'filter' chip it is replaced by a checkmark."
    },
    {
      prop: 'avatar',
      type: 'Snippet',
      default: '—',
      desc: "Custom leading content rendered instead of iconProps — typically an avatar image on an 'input' chip."
    },
    {
      prop: 'onRemove',
      type: '() => void',
      default: '—',
      desc: "Renders a trailing remove button on an 'input' chip and calls this when it's activated."
    },
    {
      prop: 'href',
      type: 'string',
      default: '—',
      desc: "Renders the chip as an <a> instead of a <button>. Not applicable to 'filter' (a toggle) or 'input' (a container)."
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'import', label: 'Import' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'chip-props', label: 'Chip Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>Chip — Svelte Material Docs</title>
</svelte:head>

<PaneGrid direction={{ small: 'column', large: 'row' }} gap="lg" full>
  <Pane rounded={false}>
    <header class="mb-10 flex flex-col gap-3">
      <div class="flex items-center gap-3">
        <nav class="text-md-sys-color-on-surface-variant text-sm" aria-label="Breadcrumb">
          <ol class="flex items-center gap-1">
            <li><a href="/docs" class="hover:text-md-sys-color-primary no-underline">Docs</a></li>
            <li class="mx-1 opacity-40">/</li>
            <li>
              <a href="/docs" class="hover:text-md-sys-color-primary no-underline">Clickables</a>
            </li>
            <li class="mx-1 opacity-40">/</li>
            <li class="text-md-sys-color-on-surface font-medium">Chip</li>
          </ol>
        </nav>
        <span
          class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
          >Stable</span
        >
      </div>

      <Headline>Chip</Headline>
      <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
        Chips help people enter information, make selections, filter content, or trigger actions. A
        single <code class="doc-code">Chip</code> component covers all four M3 chip types via the
        <code class="doc-code">variant</code> prop — the interactive element it renders (button, toggle,
        or plain container) changes to match the semantics of that type.
      </Body>

      <div class="flex flex-wrap gap-2 pt-1">
        <a
          href="https://m3.material.io/components/chips/overview"
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

    <section id="overview" class="mb-12 flex scroll-mt-6 flex-col gap-4">
      <Title>Overview</Title>
      <Body>
        <code class="doc-code">variant</code> picks both the look and the interaction model:
      </Body>
      <ul class="text-md-sys-color-on-surface-variant flex flex-col gap-2 pl-5 text-sm">
        <li class="list-disc">
          <span class="text-md-sys-color-on-surface font-medium">assist</span> — a smart or
          automated action, such as adding an event to a calendar. Renders a
          <code class="doc-code">&lt;button&gt;</code> (or <code class="doc-code">&lt;a&gt;</code>
          with
          <code class="doc-code">href</code>). Its leading icon is tinted
          <code class="doc-code">primary</code>.
        </li>
        <li class="list-disc">
          <span class="text-md-sys-color-on-surface font-medium">filter</span> — uses tags or
          descriptive words to filter content. Renders a toggle: clicking it flips
          <code class="doc-code">selected</code>, and a leading checkmark replaces
          <code class="doc-code">iconProps</code> while selected.
        </li>
        <li class="list-disc">
          <span class="text-md-sys-color-on-surface font-medium">input</span> — a discrete piece of
          information entered by the user (a contact, a filter value). Renders a plain container so
          its optional trailing remove button is never nested inside another interactive element;
          pass
          <code class="doc-code">onRemove</code> to show it.
        </li>
        <li class="list-disc">
          <span class="text-md-sys-color-on-surface font-medium">suggestion</span> — a dynamically
          generated suggestion that narrows intent. Behaves like
          <span class="font-medium">assist</span>, without the tinted icon.
        </li>
      </ul>
      <Body>
        Every variant accepts <code class="doc-code">elevated</code> for a shadowed container
        instead of the flat/outlined default — except <code class="doc-code">input</code>, which per
        spec is always flat. A related, purely presentational component,
        <a href="/docs/pill" class="text-md-sys-color-primary">Pill</a>, exists for static labels
        (status words, counts) that need no interaction at all.
      </Body>
    </section>

    <section id="import" class="mb-12 flex scroll-mt-6 flex-col gap-4">
      <Title>Import</Title>
      <CodeBlock lang="typescript" code={`import { Chip } from '@noxlovette/material';`} />
    </section>

    <section id="demo" class="mb-12 flex scroll-mt-6 flex-col gap-4">
      <Title>Live Demo</Title>
      <Body class="text-md-sys-color-on-surface-variant">
        See it live, with Controls, in Storybook rather than a hand-rolled preview here.
      </Body>

      <a
        href={storybookStoryUrl('chips-chip--playground')}
        target="_blank"
        rel="noopener noreferrer"
        class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90 sm:max-w-sm"
      >
        <Icon name="widgets" />
        <div>
          <p class="md-sys-typescale-title-small">Playground</p>
          <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
            >Control over variant, elevation, selection, and disabled state.</Body
          >
        </div>
      </a>
    </section>

    <section id="basic-usage" class="mb-12 flex scroll-mt-6 flex-col gap-4">
      <Title>Basic Usage</Title>

      <p class="md-sys-typescale-title-small">Assist</p>
      <Body class="text-md-sys-color-on-surface-variant"
        >A momentary action, triggered like a button:</Body
      >
      <CodeBlock
        code={`<script lang="ts">
  import { Chip } from '@noxlovette/material';
<\/script>

<Chip variant="assist" iconProps={{ name: 'calendar_today' }} onclick={addToCalendar}>
  Add to calendar
</Chip>`}
      />

      <p class="md-sys-typescale-title-small mt-4">Filter</p>
      <Body class="text-md-sys-color-on-surface-variant"
        >Bind <code class="doc-code">selected</code> to read and set whether the filter is applied:</Body
      >
      <CodeBlock
        code={`<script lang="ts">
  import { Chip } from '@noxlovette/material';

  let wifiOnly = $state(false);
<\/script>

<Chip variant="filter" bind:selected={wifiOnly}>Wifi</Chip>`}
      />

      <p class="md-sys-typescale-title-small mt-4">Input</p>
      <Body class="text-md-sys-color-on-surface-variant"
        >Render one per entry, and remove it from your own array in <code class="doc-code"
          >onRemove</code
        >:</Body
      >
      <CodeBlock
        code={`<script lang="ts">
  import { Chip } from '@noxlovette/material';

  let recipients = $state(['Ada Lovelace', 'Alan Turing']);
<\/script>

{#each recipients as name}
  <Chip
    variant="input"
    iconProps={{ name: 'person' }}
    onRemove={() => (recipients = recipients.filter((r) => r !== name))}
  >
    {name}
  </Chip>
{/each}`}
      />

      <p class="md-sys-typescale-title-small mt-4">Suggestion</p>
      <Body class="text-md-sys-color-on-surface-variant"
        >A dynamically generated option the user can accept:</Body
      >
      <CodeBlock
        code={`<Chip variant="suggestion" onclick={() => applySuggestion('Tacos')}>Tacos</Chip>`}
      />
    </section>

    <section id="chip-props" class="mb-12 flex scroll-mt-6 flex-col gap-4">
      <Title>Chip Props</Title>
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
            {#each chipProps as row}
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

    <section id="accessibility" class="mb-12 flex scroll-mt-6 flex-col gap-4">
      <Title>Accessibility</Title>
      <div class="flex flex-col gap-3">
        {#each [{ icon: 'keyboard', title: 'Correct roles per variant', desc: 'Assist and suggestion chips are a real <button> (or <a>). Filter chips are a toggle with aria-pressed reflecting selected. An input chip\'s remove control is its own independently focusable <button aria-label="Remove">, never nested inside another interactive element.' }, { icon: 'contrast', title: 'Color contrast', desc: 'Flat and elevated chips pair on-surface-variant text with their container; selected chips pair on-secondary-container with secondary-container — both meet AA contrast by construction.' }, { icon: 'block', title: 'Disabled semantics', desc: "Assist, filter, and suggestion chips use the native disabled attribute. An input chip's container is a <div>, so disabling it sets aria-disabled and dims it via explicit styling — its trailing remove button still gets a real disabled attribute." }, { icon: 'waves', title: 'Reduced motion', desc: 'The hover/press state layer and ripple respect prefers-reduced-motion, same as every other interactive component in this library.' }] as item}
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
        href="/docs/toggle"
        class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
      >
        <Icon name="arrow_back" size="sm" />
        Previous: Toggle
      </a>
      <a
        href="/docs/pill"
        class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
      >
        Next: Pill
        <Icon name="arrow_forward" size="sm" />
      </a>
    </footer></Pane
  >

  <Pane width={280} sticky>
    <TableOfContents sections={toc} />
  </Pane>
</PaneGrid>

<style>
  :global(.doc-code) {
    background-color: var(--md-sys-color-surface-container);
    border-radius: 4px;
    padding: 1px 6px;
    font-family: monospace;
    font-size: 0.875em;
  }
</style>
