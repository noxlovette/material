<script lang="ts">
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
  import { Body, Title, Headline, Card, Divider, Icon, SupportingPane } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const supportingPaneProps: PropRow[] = [
    {
      prop: 'main',
      type: 'Snippet',
      default: '—',
      required: true,
      desc: 'The primary content area.'
    },
    {
      prop: 'supporting',
      type: 'Snippet',
      default: '—',
      required: true,
      desc: 'The fixed-width side panel content, e.g. a table of contents or contextual actions.'
    },
    {
      prop: 'anchor',
      type: '"viewport" | "parent"',
      default: '"parent"',
      desc: '"viewport" fixes the supporting pane to the true browser edge and scrolls it independently of main — used by this docs site\'s own "On this page" TOC. "parent" makes it sticky (position: sticky) within a relative ancestor, scrolling together with the page.'
    },
    {
      prop: 'position',
      type: '"left" | "right"',
      default: '"right"',
      desc: 'Which side the supporting pane renders on.'
    },
    {
      prop: 'centered',
      type: 'boolean',
      default: 'false',
      desc: 'Constrains the whole layout to max-w-5xl and centers it, instead of stretching to fill the width.'
    },
    {
      prop: 'collapsible',
      type: 'boolean',
      default: '—',
      desc: 'Whether to show a toggle button (desktop only) that hides/shows the supporting pane, sliding the main pane to fill the space.'
    },
    {
      prop: 'mobileSheet',
      type: 'boolean',
      default: 'false',
      desc: 'Below lg, render the supporting content as a bottom sheet opened via a floating trigger button, instead of stacking it inline.'
    },
    {
      prop: 'mobileSheetIcon',
      type: 'string',
      default: '"info"',
      desc: 'Material Symbol name for the mobile sheet trigger button.'
    },
    {
      prop: 'mobileTriggerClass',
      type: 'string',
      default: '—',
      desc: 'Extra class for the mobile trigger button, e.g. to reposition it above a Navbar.'
    },
    {
      prop: 'supportingWidth',
      type: 'number',
      default: '320',
      desc: 'Width of the supporting pane in px. Only affects layout in anchor="viewport" mode (drives a CSS custom property); "parent" mode uses the fixed lg:w-80 Tailwind class instead.'
    },
    {
      prop: 'supportingTop',
      type: 'number',
      default: '0',
      desc: 'Top offset in px for the fixed supporting pane in anchor="viewport" mode, e.g. to sit below a fixed app bar.'
    },
    {
      prop: 'gap',
      type: '"none" | "sm" | "md" | "lg"',
      default: '"md"',
      desc: 'Gap applied to the main pane.'
    },
    {
      prop: 'full',
      type: 'boolean',
      default: 'true',
      desc: 'Whether the layout stretches to min-h-dvh.'
    },
    {
      prop: 'rounded',
      type: 'boolean',
      default: 'true',
      desc: 'Rounds the top corners of the main pane on the lg breakpoint.'
    },
    {
      prop: 'mainClass',
      type: 'string',
      default: '—',
      desc: 'Extra class applied to the main pane.'
    },
    {
      prop: 'supportingClass',
      type: 'string',
      default: '—',
      desc: 'Extra class applied to the supporting pane.'
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'import', label: 'Import' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'supportingpane-props', label: 'SupportingPane Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>Supporting Pane — Ogonëk M3 Docs</title>
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
                <a href="/docs" class="hover:text-md-sys-color-primary no-underline">Layout</a>
              </li>
              <li class="mx-1 opacity-40">/</li>
              <li class="text-md-sys-color-on-surface font-medium">Supporting Pane</li>
            </ol>
          </nav>
          <span
            class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
            >Stable</span
          >
        </div>

        <Headline>Supporting Pane</Headline>
        <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
          A content area paired with a fixed-width side panel — the canonical M3 supporting-pane
          layout. This very page is built with it: the article content is the
          <code class="doc-code">main</code> snippet, and the "On this page" table of contents on
          the right is the <code class="doc-code">supporting</code> snippet.
        </Body>

        <div class="flex flex-wrap gap-2 pt-1">
          <a
            href="https://m3.material.io/foundations/layout/canonical-layouts/supporting-pane"
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
          The <code class="doc-code">SupportingPane</code> component implements the
          <a
            href="https://m3.material.io/foundations/layout/canonical-layouts/supporting-pane"
            target="_blank"
            rel="noopener noreferrer"
            class="text-md-sys-color-primary">Material Design 3 supporting-pane canonical layout</a
          >: a primary content region alongside a narrower, fixed-width panel used for related but
          secondary content — contextual actions, filters, or (as on this site) a table of contents.
        </Body>
        <Body>
          Every docs page in this library, including this one, wraps its content in <code
            class="doc-code">&lt;SupportingPane anchor="viewport" position="right"&gt;</code
          >, putting the article in <code class="doc-code">main</code> and a
          <code class="doc-code">TableOfContents</code> in <code class="doc-code">supporting</code>.
          That's the <code class="doc-code">anchor="viewport"</code> mode: the panel fixes to the
          true browser edge and scrolls independently, which is why the TOC stays put while you
          scroll the article. See the
          <a href="/docs/split-pane" class="text-md-sys-color-primary">Split Pane</a> docs for the sibling
          component's take on the same anchor-mode distinction.
        </Body>
      </section>

      <section id="import" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Import</Title>
        <CodeBlock
          lang="typescript"
          code={`import { SupportingPane } from '@noxlovette/material';`}
        />
      </section>

      <section id="demo" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Live Demo</Title>
        <Body class="text-md-sys-color-on-surface-variant">
          See it live, with Controls, in Storybook rather than a hand-rolled preview here. The
          Storybook canvas demos <code class="doc-code">anchor="parent"</code>
          (sticky-within-a-box), since <code class="doc-code">anchor="viewport"</code> — the mode this
          very page uses — only reads correctly on a real scrolling page like this one.
        </Body>

        <a
          href={storybookStoryUrl('containers-supporting-pane--playground')}
          target="_blank"
          rel="noopener noreferrer"
          class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90 sm:max-w-sm"
        >
          <Icon name="widgets" />
          <div>
            <p class="md-sys-typescale-title-small">Playground</p>
            <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
              >Open the SupportingPane story — includes Collapsible and Position Left variants.</Body
            >
          </div>
        </a>
      </section>

      <section id="basic-usage" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Basic Usage</Title>
        <Body>The pattern used by every docs page in this library:</Body>

        <CodeBlock
          code={`<script lang="ts">
  import { SupportingPane } from '@noxlovette/material';
<\/script>

<SupportingPane anchor="viewport" position="right" rounded={false} gap="none">
  {#snippet main()}
    <article>...</article>
  {/snippet}
  {#snippet supporting()}
    <aside>On this page...</aside>
  {/snippet}
</SupportingPane>`}
        />
      </section>

      <section id="supportingpane-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>SupportingPane Props</Title>
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
              {#each supportingPaneProps as row}
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
          {#each [{ icon: 'toggle_on', title: 'Collapse toggle', desc: 'The collapsible toggle button is a labelled ButtonIcon with aria-controls/aria-expanded pointing at the supporting panel, plus a tooltip.' }, { icon: 'vertical_split', title: 'Mobile sheet dialog', desc: 'When mobileSheet is enabled, the sheet renders role="dialog" aria-modal="true" with a labelled close button and a scrim that dismisses it on click.' }] as item}
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
          href="/docs/split-pane"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          <Icon name="arrow_back" size="sm" />
          Previous: Split Pane
        </a>
        <a
          href="/docs/card"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          Next: Card
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
