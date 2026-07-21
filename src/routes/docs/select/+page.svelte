<script lang="ts">
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
  import { Body, Title, Headline, Card, Divider, Icon, SupportingPane } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const selectProps: PropRow[] = [
    {
      prop: 'type',
      type: '"single" | "multiple"',
      default: '—',
      required: true,
      desc: "Selection mode, from bits-ui's Select.RootProps — 'single' binds value to a string, 'multiple' to a string[]."
    },
    {
      prop: 'value',
      type: 'string | string[] | undefined',
      default: '—',
      desc: 'The selected value(s), matching bits-ui Select.RootProps. Bindable.'
    },
    {
      prop: 'open',
      type: 'boolean',
      default: 'false',
      desc: 'Whether the option list is open. Bindable.'
    },
    {
      prop: 'options',
      type: 'SelectOption[]',
      default: '[]',
      desc: 'Flat or grouped list of options; drives the entire dropdown content (see below).'
    },
    {
      prop: 'placeholder',
      type: 'string',
      default: '—',
      required: true,
      desc: 'Text shown in the trigger when no value is selected.'
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      desc: 'Disables the select.'
    },
    {
      prop: 'error',
      type: 'boolean',
      default: 'false',
      desc: 'Renders the select in an error state.'
    },
    {
      prop: 'supportingText',
      type: 'Snippet',
      default: '—',
      desc: 'Helper text displayed below the select.'
    },
    {
      prop: 'leadingIconProps',
      type: 'IconProps',
      default: '—',
      desc: 'Props for an optional leading icon in the trigger.'
    },
    {
      prop: 'triggerProps',
      type: 'Select.TriggerProps',
      default: '—',
      desc: "Additional props forwarded to bits-ui's Select.Trigger."
    },
    {
      prop: 'contentProps',
      type: 'Select.ContentProps',
      default: '—',
      desc: "Additional props forwarded to bits-ui's Select.Content."
    },
    {
      prop: 'portalDisabled',
      type: 'boolean',
      default: 'false',
      desc: 'Disables the portal — useful when the select is nested inside a Dialog/Sheet that manages its own stacking.'
    }
  ];

  const optionProps: PropRow[] = [
    {
      prop: 'value',
      type: 'string',
      default: '—',
      required: true,
      desc: 'The option value.'
    },
    {
      prop: 'label',
      type: 'string',
      default: '—',
      desc: 'Display label; also used as the accessible name.'
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      desc: 'Disables this individual option.'
    },
    {
      prop: 'type',
      type: '"item" | "group"',
      default: '"item"',
      desc: "Set to 'group' with a heading and nested items to render a labelled group instead of a single option."
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'import', label: 'Import' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'select-props', label: 'Select Props' },
    { id: 'option-shape', label: 'Option Shape' },
    { id: 'primitives', label: 'Themed Primitives' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>Select — Ogonëk M3 Docs</title>
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
              <li class="text-md-sys-color-on-surface font-medium">Select</li>
            </ol>
          </nav>
          <span
            class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
            >Stable</span
          >
        </div>

        <Headline>Select</Headline>
        <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
          Select lets users choose one option from a list, styled to match the filled Text Field
          trigger. It's powered by bits-ui's <code class="doc-code">Select.Root</code> and is
          entirely driven by an <code class="doc-code">options</code> array — it does not accept option
          elements as children.
        </Body>

        <div class="flex flex-wrap gap-2 pt-1">
          <a
            href="https://m3.material.io/components/menus/overview"
            target="_blank"
            rel="noopener noreferrer"
            class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
          >
            M3 Spec (Menus)
            <Icon name="open_in_new" size="xs" class="opacity-60" />
          </a>
        </div>
      </header>

      <Divider class="mb-12" />

      <section id="overview" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Overview</Title>
        <Body>
          Material Design 3 doesn't have a standalone top-level page for "Select" — dropdown
          selection is specified as part of the
          <a
            href="https://m3.material.io/components/menus/overview"
            target="_blank"
            rel="noopener noreferrer"
            class="text-md-sys-color-primary">Menus</a
          >
          family. This component pairs a Text-Field-style trigger with a menu-style
          <code class="doc-code">Select.Content</code> popover.
        </Body>
        <Body>
          Pass a flat array of <code class="doc-code">{'{ value, label }'}</code> items to
          <code class="doc-code">options</code>, or nest them under
          <code class="doc-code">{'{ type: "group", heading, items }'}</code> entries for labelled sections.
        </Body>
      </section>

      <section id="import" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Import</Title>
        <CodeBlock lang="typescript" code={`import { Select } from '@noxlovette/material';`} />
      </section>

      <section id="demo" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Live Demo</Title>
        <Body class="text-md-sys-color-on-surface-variant">
          See it live, with Controls, in Storybook rather than a hand-rolled preview here.
        </Body>

        <a
          href={storybookStoryUrl('forms-select--playground')}
          target="_blank"
          rel="noopener noreferrer"
          class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90 sm:max-w-sm"
        >
          <Icon name="widgets" />
          <div>
            <p class="md-sys-typescale-title-small">Playground</p>
            <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
              >Open the Select story, plus Grouped Options and States variants.</Body
            >
          </div>
        </a>
      </section>

      <section id="basic-usage" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Basic Usage</Title>
        <Body>
          Bind <code class="doc-code">value</code> and pass an <code class="doc-code">options</code> array:
        </Body>

        <CodeBlock
          code={`<script lang="ts">
  import { Select } from '@noxlovette/material';
  import type { SelectOption } from '@noxlovette/material';

  let fruit = $state<string | undefined>();

  const options: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' }
  ];
<\/script>

<Select type="single" placeholder="Choose a fruit" {options} bind:value={fruit} />`}
        />
      </section>

      <section id="select-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Select Props</Title>
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
              {#each selectProps as row}
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

      <section id="option-shape" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Option Shape (SelectOption)</Title>
        <Body>
          Each entry in <code class="doc-code">options</code> is either an item or a group:
        </Body>
        <div class="overflow-x-auto rounded-xl border border-black/5">
          <table class="w-full border-collapse text-sm">
            <thead>
              <tr class="bg-md-sys-color-surface-container-highest">
                <th class="border-md-sys-color-outline-variant border-b p-3 text-left font-semibold"
                  >Field</th
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
              {#each optionProps as row}
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
        <Body class="text-md-sys-color-on-surface-variant text-sm">
          When <code class="doc-code">type: 'group'</code> is set, use
          <code class="doc-code">heading</code> (optional) and a nested
          <code class="doc-code">items: SelectOption[]</code> array instead of
          <code class="doc-code">value</code>/<code class="doc-code">label</code>.
        </Body>
      </section>

      <section id="primitives" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Themed Primitives</Title>
        <Body>
          <code class="doc-code">SelectItem</code>, <code class="doc-code">SelectGroup</code>,
          <code class="doc-code">SelectLabel</code>, and
          <code class="doc-code">SelectSeparator</code>
          are also exported. They carry the same MD3 styling as the internal rendering
          <code class="doc-code">Select</code> does from its <code class="doc-code">options</code>
          prop, but <code class="doc-code">Select</code> itself does not expose a slot to compose
          them as children — its <code class="doc-code">Select.Content</code> is built entirely from
          <code class="doc-code">options</code>. These primitives are meant for consumers who need a
          custom dropdown built directly against bits-ui's <code class="doc-code">Select.Root</code>
          instead of this component, and want matching visuals.
        </Body>
      </section>

      <section id="accessibility" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Accessibility</Title>
        <div class="flex flex-col gap-3">
          {#each [{ icon: 'keyboard', title: 'Keyboard navigation', desc: 'Arrow keys move through options, Enter/Space selects, Escape closes — all handled by bits-ui Select primitives.' }, { icon: 'check', title: 'Selected indicator', desc: 'The selected item shows a check icon in addition to a colored background, avoiding a color-only signal.' }, { icon: 'block', title: 'Disabled options', desc: 'Individual options can be disabled via SelectOption.disabled and are skipped during keyboard navigation.' }] as item}
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
          href="/docs/switch"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          <Icon name="arrow_back" size="sm" />
          Previous: Switch
        </a>
        <a
          href="/docs/slider"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          Next: Slider
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
