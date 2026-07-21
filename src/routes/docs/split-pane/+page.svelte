<script lang="ts">
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
  import { Body, Title, Headline, Card, Divider, Icon, SupportingPane } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const splitPaneProps: PropRow[] = [
    {
      prop: 'left',
      type: 'Snippet',
      default: '—',
      required: true,
      desc: 'Content for the left pane.'
    },
    {
      prop: 'right',
      type: 'Snippet',
      default: '—',
      required: true,
      desc: 'Content for the right pane.'
    },
    {
      prop: 'anchor',
      type: '"viewport" | "parent" | "sticky"',
      default: '"viewport"',
      desc: 'Positioning strategy for the left pane — see Anchor Modes below.'
    },
    {
      prop: 'resizable',
      type: 'boolean',
      default: 'true',
      desc: 'Whether the split is user-draggable. Set false for a static sidebar — hides the drag handle and skips width persistence.'
    },
    {
      prop: 'leftWidth',
      type: 'number',
      default: '396',
      desc: 'Initial left pane width in px. Bindable.'
    },
    {
      prop: 'minLeft',
      type: 'number',
      default: '280',
      desc: 'Minimum left pane width in px, enforced while dragging.'
    },
    {
      prop: 'maxLeft',
      type: 'number',
      default: '720',
      desc: 'Maximum left pane width in px, enforced while dragging.'
    },
    {
      prop: 'storageKey',
      type: 'string',
      default: '"splitpane:leftWidth"',
      desc: 'localStorage key used to persist the dragged width.'
    },
    {
      prop: 'persist',
      type: 'boolean',
      default: 'true',
      desc: 'Whether to persist and restore the width from localStorage. Ignored when resizable is false.'
    },
    {
      prop: 'onPaddingChange',
      type: '(padding: number) => void',
      default: '—',
      desc: 'Called on mount/resize/destroy with leftWidth + 80px, letting a parent adjust footer padding to avoid the fixed left pane overlapping page-end content.'
    },
    {
      prop: 'mobilePane',
      type: '"left" | "right"',
      default: '"right"',
      desc: 'Which pane is shown below the md breakpoint; both are always visible on desktop.'
    },
    {
      prop: 'full',
      type: 'boolean',
      default: 'true',
      desc: 'Whether the panes stretch to fill available height.'
    },
    {
      prop: 'rounded',
      type: 'boolean',
      default: 'true',
      desc: 'Rounds the top/bottom corners of the panes on md+ breakpoints.'
    },
    {
      prop: 'leftClass',
      type: 'string',
      default: '—',
      desc: 'Extra class applied to the left pane element.'
    },
    {
      prop: 'rightClass',
      type: 'string',
      default: '—',
      desc: 'Extra class applied to the right pane element.'
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'anchor-modes', label: 'Anchor Modes' },
    { id: 'import', label: 'Import' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'splitpane-props', label: 'SplitPane Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>Split Pane — Ogonëk M3 Docs</title>
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
              <li class="text-md-sys-color-on-surface font-medium">Split Pane</li>
            </ol>
          </nav>
          <span
            class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
            >Stable</span
          >
        </div>

        <Headline>Split Pane</Headline>
        <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
          A generic two-column layout: a left pane and a right pane, optionally user-resizable by
          dragging a handle between them. It's a positioning primitive rather than a single
          canonical M3 pattern — three <code class="doc-code">anchor</code> modes cover the different
          places a split layout can live on a page.
        </Body>
      </header>

      <Divider class="mb-12" />

      <section id="overview" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Overview</Title>
        <Body>
          M3's closest canonical layout is <a
            href="https://m3.material.io/foundations/layout/canonical-layouts/list-detail"
            target="_blank"
            rel="noopener noreferrer"
            class="text-md-sys-color-primary">list-detail</a
          >, but that pattern carries specific list/detail semantics (a selectable list driving a
          detail view). <code class="doc-code">SplitPane</code> here is deliberately more general —
          a resizable two-column primitive with no opinion about what goes in either side. This
          library's own root <code class="doc-code">Rail</code> layout and the docs secondary nav (this
          very sidebar's parent structure) are both built on it, alongside more list-detail-shaped uses.
        </Body>
      </section>

      <section id="anchor-modes" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Anchor Modes</Title>
        <Body>
          <code class="doc-code">anchor</code> picks how the left pane is positioned. Getting this wrong
          under nested layouts is the most common mistake — pick based on what already surrounds the split,
          not just what "looks right" in isolation.
        </Body>
        <div class="flex flex-col gap-3">
          <Card class="flex flex-col gap-1 p-4">
            <p class="text-md-sys-color-on-surface text-sm font-semibold">
              <code class="doc-code">viewport</code> (default)
            </p>
            <Body class="text-md-sys-color-on-surface-variant"
              >The left pane fixes to the true browser edge (<code class="doc-code"
                >position: fixed</code
              >). Use this when SplitPane is the outermost / only positioned element on the page —
              e.g. this library's root <code class="doc-code">Rail</code> layout.</Body
            >
          </Card>
          <Card class="flex flex-col gap-1 p-4">
            <p class="text-md-sys-color-on-surface text-sm font-semibold">
              <code class="doc-code">parent</code>
            </p>
            <Body class="text-md-sys-color-on-surface-variant"
              >The left pane is absolutely positioned within a <code class="doc-code">relative</code
              > ancestor. Good for embedded/contained demos (a bounded sandbox box) — it does not stay
              pinned while the page itself scrolls.</Body
            >
          </Card>
          <Card class="flex flex-col gap-1 p-4">
            <p class="text-md-sys-color-on-surface text-sm font-semibold">
              <code class="doc-code">sticky</code>
            </p>
            <Body class="text-md-sys-color-on-surface-variant"
              >Left and right sit in normal flex flow and the left pane sticks (<code
                class="doc-code">position: sticky</code
              >) as the page scrolls. Use this for a sidebar nested inside content that is already
              offset by something else — e.g. the docs secondary component-list nav, which lives
              inside the root layout's Rail-offset content column.
              <code class="doc-code">viewport</code>
              would fix it to the true left edge (underneath/behind the Rail);
              <code class="doc-code">parent</code>
              would lose the "stays visible while scrolling" behavior. Pair with
              <code class="doc-code">resizable={'{false}'}</code> for a static (non-draggable) sidebar.</Body
            >
          </Card>
        </div>
      </section>

      <section id="import" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Import</Title>
        <CodeBlock lang="typescript" code={`import { SplitPane } from '@noxlovette/material';`} />
      </section>

      <section id="demo" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Live Demo</Title>
        <Body class="text-md-sys-color-on-surface-variant">
          See it live, with Controls, in Storybook rather than a hand-rolled preview here. Separate
          stories demo the <code class="doc-code">viewport</code> and
          <code class="doc-code">sticky</code> anchor modes inside a bounded canvas.
        </Body>

        <a
          href={storybookStoryUrl('containers-split-pane--playground')}
          target="_blank"
          rel="noopener noreferrer"
          class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90 sm:max-w-sm"
        >
          <Icon name="widgets" />
          <div>
            <p class="md-sys-typescale-title-small">Playground</p>
            <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
              >Open the SplitPane story — includes Anchor Viewport and Anchor Sticky variants.</Body
            >
          </div>
        </a>
      </section>

      <section id="basic-usage" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Basic Usage</Title>
        <Body>A resizable split, anchored to the viewport:</Body>

        <CodeBlock
          code={`<script lang="ts">
  import { SplitPane } from '@noxlovette/material';
<\/script>

<SplitPane anchor="viewport" leftWidth={320} minLeft={240} maxLeft={480}>
  {#snippet left()}
    <nav>...</nav>
  {/snippet}
  {#snippet right()}
    <main>...</main>
  {/snippet}
</SplitPane>`}
        />

        <Body>A static, non-draggable sidebar nested inside already-offset content:</Body>

        <CodeBlock
          code={`<SplitPane anchor="sticky" resizable={false} leftWidth={240}>
  {#snippet left()}
    <nav>...</nav>
  {/snippet}
  {#snippet right()}
    <main>...</main>
  {/snippet}
</SplitPane>`}
        />
      </section>

      <section id="splitpane-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>SplitPane Props</Title>
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
              {#each splitPaneProps as row}
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
          {#each [{ icon: 'drag_indicator', title: 'Resize handle semantics', desc: 'The drag handle renders role="separator" aria-orientation="vertical" with aria-valuenow/min/max reflecting the current and clamped width range.' }, { icon: 'visibility_off', title: 'Desktop-only split', desc: 'The left pane and handle are hidden below the md breakpoint (hidden md:block); on mobile only one pane is shown at a time, chosen by mobilePane.' }] as item}
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
          href="/docs/single-pane"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          <Icon name="arrow_back" size="sm" />
          Previous: Single Pane
        </a>
        <a
          href="/docs/supporting-pane"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          Next: Supporting Pane
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
