<script lang="ts">
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
  import { Body, Title, Headline, Card, Divider, Icon, SupportingPane } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const fabProps: PropRow[] = [
    {
      prop: 'iconProps',
      type: 'IconProps',
      default: '—',
      required: true,
      desc: 'Configuration for the FAB icon.'
    },
    {
      prop: 'config',
      type: '"primary" | "secondary" | "tertiary"',
      default: '"primary"',
      desc: 'The color role of the FAB.'
    },
    {
      prop: 'size',
      type: '"small" | "regular" | "large"',
      default: '"regular"',
      desc: 'Overall size of the FAB.'
    },
    {
      prop: 'expanded',
      type: 'boolean',
      default: 'false',
      desc: 'Shows the extended FAB with a text label alongside the icon.'
    },
    {
      prop: 'label',
      type: 'string',
      default: '—',
      desc: 'Text label shown when expanded is true.'
    },
    {
      prop: 'withMenu',
      type: 'boolean',
      default: 'false',
      desc: 'Toggles a FABMenu of FABMenuItem children when the FAB is clicked, and swaps the icon for a close icon while open.'
    },
    {
      prop: 'children',
      type: 'Snippet',
      default: '—',
      desc: 'FABMenuItem elements, rendered when withMenu is true.'
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      desc: 'Disables the FAB.'
    },
    {
      prop: 'loading',
      type: 'boolean',
      default: 'false',
      desc: 'Shows a LoadingIndicator in place of the icon.'
    },
    {
      prop: 'href',
      type: 'string',
      default: '—',
      desc: 'Renders the FAB as an <a> instead of a <button>.'
    },
    {
      prop: 'formaction',
      type: 'string',
      default: '—',
      desc: 'The formaction attribute, for use as a form submit action.'
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'import', label: 'Import' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'fab-props', label: 'FAB Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>FAB — Ogonëk M3 Docs</title>
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
                <a href="/docs" class="hover:text-md-sys-color-primary no-underline">Clickables</a>
              </li>
              <li class="mx-1 opacity-40">/</li>
              <li class="text-md-sys-color-on-surface font-medium">FAB</li>
            </ol>
          </nav>
          <span
            class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
            >Stable</span
          >
        </div>

        <Headline>Floating Action Button</Headline>
        <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
          Floating action buttons (FABs) help people take the primary action on a screen. <code
            class="doc-code">FAB</code
          > comes in small, regular, and large sizes, an extended form with a label, and an optional expanding
          menu of related actions.
        </Body>

        <div class="flex flex-wrap gap-2 pt-1">
          <a
            href="https://m3.material.io/components/floating-action-button/overview"
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
          The <code class="doc-code">FAB</code> component implements the
          <a
            href="https://m3.material.io/components/floating-action-button/overview"
            target="_blank"
            rel="noopener noreferrer"
            class="text-md-sys-color-primary">Material Design 3 Floating Action Button</a
          > pattern.
        </Body>
        <Body>
          Set <code class="doc-code">withMenu</code> to turn the FAB into a trigger for a radial
          menu of <code class="doc-code">FABMenuItem</code> actions — clicking the FAB swaps its
          icon for a close icon and opens <code class="doc-code">FABMenu</code>, positioned above it
          and closed automatically on an outside click. Use this pattern instead of a single FAB
          when there are 2–5 related primary actions to choose from.
        </Body>
      </section>

      <section id="import" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Import</Title>
        <CodeBlock
          lang="typescript"
          code={`import { FAB, FABMenuItem } from '@noxlovette/material';`}
        />
      </section>

      <section id="demo" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Live Demo</Title>
        <Body class="text-md-sys-color-on-surface-variant">
          See it live, with Controls, in Storybook rather than a hand-rolled preview here.
        </Body>

        <div class="flex flex-col gap-3 sm:flex-row">
          <a
            href={storybookStoryUrl('buttons-fab--playground')}
            target="_blank"
            rel="noopener noreferrer"
            class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90"
          >
            <Icon name="widgets" />
            <div>
              <p class="md-sys-typescale-title-small">Playground</p>
              <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
                >Config, size, expanded, and label Controls.</Body
              >
            </div>
          </a>
          <a
            href={storybookStoryUrl('buttons-fab--with-menu')}
            target="_blank"
            rel="noopener noreferrer"
            class="bg-md-sys-color-surface-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90"
          >
            <Icon name="widgets" />
            <div>
              <p class="md-sys-typescale-title-small">With Menu</p>
              <Body class="text-md-sys-color-on-surface-variant text-sm"
                >A FAB that expands into a menu of related actions.</Body
              >
            </div>
          </a>
        </div>
      </section>

      <section id="basic-usage" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Basic Usage</Title>
        <Body>A regular primary FAB, and an extended variant with a label:</Body>

        <CodeBlock
          code={`<script lang="ts">
  import { FAB } from '@noxlovette/material';
<\/script>

<FAB config="primary" iconProps={{ name: 'edit' }} />

<FAB config="primary" expanded label="Compose" iconProps={{ name: 'edit' }} />`}
        />
      </section>

      <section id="fab-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>FAB Props</Title>
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
              {#each fabProps as row}
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
          {#each [{ icon: 'label', title: 'Icon-only labeling', desc: 'A non-expanded FAB has no visible text — give iconProps a symbol whose meaning is unambiguous, or prefer expanded with a label for less common actions.' }, { icon: 'menu_open', title: 'Menu dismissal', desc: "withMenu's FABMenu closes on outside click via the clickOutside action, and its icon flips to a close affordance while open." }, { icon: 'block', title: 'Disabled state', desc: 'disabled removes the FAB from the tab order and exposes the disabled attribute to assistive tech.' }] as item}
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
          href="/docs/button-icon"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          <Icon name="arrow_back" size="sm" />
          Previous: Button Icon
        </a>
        <a
          href="/docs/toggle"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          Next: Toggle
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
