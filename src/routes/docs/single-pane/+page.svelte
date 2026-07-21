<script lang="ts">
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
  import { Body, Title, Headline, Card, Divider, Icon, SupportingPane } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const singlePaneProps: PropRow[] = [
    {
      prop: 'children',
      type: 'Snippet',
      default: '—',
      required: true,
      desc: 'Content rendered inside the pane.'
    },
    {
      prop: 'centered',
      type: '"none" | "narrow" | "medium"',
      default: '"none"',
      desc: 'Caps the content width — narrow is max-w-2xl, medium is max-w-5xl — and centers it. Independent of the outer max-w-7xl wrapper.'
    },
    {
      prop: 'background',
      type: 'boolean',
      default: 'true',
      desc: 'Whether to paint the surface background color on the root element.'
    },
    {
      prop: 'full',
      type: 'boolean',
      default: 'true',
      desc: 'Whether the pane stretches to min-h-dvh, e.g. for a full-page layout.'
    },
    {
      prop: 'padding',
      type: '"none" | "sm" | "md" | "lg"',
      default: '"md"',
      desc: 'Padding applied to the inner content container, responsive across breakpoints.'
    },
    {
      prop: 'gap',
      type: '"none" | "sm" | "md" | "lg" | "xl"',
      default: '"md"',
      desc: 'Flex gap between direct children of the content container.'
    },
    {
      prop: 'rounded',
      type: 'boolean',
      default: 'true',
      desc: 'Rounds the top corners on md+ breakpoints — matches the rounded treatment of sibling panes like SplitPane/SupportingPane.'
    },
    {
      prop: 'contentClass',
      type: 'string',
      default: '—',
      desc: 'Extra class applied to the inner content container (the max-width flex column).'
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'import', label: 'Import' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'singlepane-props', label: 'SinglePane Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>Single Pane — Ogonëk M3 Docs</title>
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
              <li class="text-md-sys-color-on-surface font-medium">Single Pane</li>
            </ol>
          </nav>
          <span
            class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
            >Stable</span
          >
        </div>

        <Headline>Single Pane</Headline>
        <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
          A single-column content container: centers and caps content width, applies responsive
          padding/gap, and optionally paints the surface background. It's the simplest of the
          library's three pane primitives — no split, no side panel, just a well-behaved wrapper.
        </Body>
      </header>

      <Divider class="mb-12" />

      <section id="overview" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Overview</Title>
        <Body>
          <code class="doc-code">SinglePane</code> is a layout primitive, not a canonical M3 pattern
          with its own spec page — it's the plumbing every other pane and every docs page in this
          library is built on top of. This docs site dogfoods it directly: every
          <code class="doc-code">/docs/**</code> page (including this one) wraps its
          <code class="doc-code">main</code> snippet content in a bare
          <code class="doc-code">&lt;SinglePane&gt;</code>, relying on its default max-width and
          padding instead of hand-rolling
          <code class="doc-code">mx-auto max-w-* p-*</code> classes per route.
        </Body>
        <Body>
          Two width mechanisms stack: the outer wrapper always caps at <code class="doc-code"
            >max-w-7xl</code
          >, and the <code class="doc-code">centered</code> prop optionally caps further (<code
            class="doc-code">narrow</code
          >
          → <code class="doc-code">max-w-2xl</code>,
          <code class="doc-code">medium</code> → <code class="doc-code">max-w-5xl</code>) for
          prose-style content that reads better at a tighter measure.
        </Body>
      </section>

      <section id="import" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Import</Title>
        <CodeBlock lang="typescript" code={`import { SinglePane } from '@noxlovette/material';`} />
      </section>

      <section id="demo" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Live Demo</Title>
        <Body class="text-md-sys-color-on-surface-variant">
          See it live, with Controls, in Storybook rather than a hand-rolled preview here.
        </Body>

        <a
          href={storybookStoryUrl('containers-single-pane--playground')}
          target="_blank"
          rel="noopener noreferrer"
          class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90 sm:max-w-sm"
        >
          <Icon name="widgets" />
          <div>
            <p class="md-sys-typescale-title-small">Playground</p>
            <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
              >Open the SinglePane story and try the centered/padding/gap controls.</Body
            >
          </div>
        </a>
      </section>

      <section id="basic-usage" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Basic Usage</Title>
        <Body>
          Wrap page-level content directly — no other configuration is required for the common case:
        </Body>

        <CodeBlock
          code={`<script lang="ts">
  import { SinglePane } from '@noxlovette/material';
<\/script>

<SinglePane centered="medium">
  <h1>Page title</h1>
  <p>Body content, capped at max-w-5xl and centered.</p>
</SinglePane>`}
        />
      </section>

      <section id="singlepane-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>SinglePane Props</Title>
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
              {#each singlePaneProps as row}
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
          {#each [{ icon: 'view_agenda', title: 'Plain structure', desc: 'Renders two plain divs — no ARIA role is implied or needed; the semantics come entirely from the content you place inside.' }, { icon: 'contrast', title: 'Background contrast', desc: 'When background is true, the root paints the surface color role, keeping contrast consistent with the active theme for any content placed inside.' }] as item}
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
          href="/docs/search"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          <Icon name="arrow_back" size="sm" />
          Previous: Search
        </a>
        <a
          href="/docs/split-pane"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          Next: Split Pane
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
