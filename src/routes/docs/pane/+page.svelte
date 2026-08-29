<script lang="ts">
  import { Body, Title, Headline, Card, Divider, Icon, Pane, PaneGrid } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const paneProps: PropRow[] = [
    {
      prop: 'children',
      type: 'Snippet',
      default: '—',
      required: true,
      desc: 'Content rendered inside the pane.'
    },
    {
      prop: 'width',
      type: 'number',
      default: 'undefined',
      desc: 'Fixed flex-basis in px. Omit for a flexible pane that grows to fill remaining space in its PaneGrid. Bindable — updates live while dragging when resizable.'
    },
    {
      prop: 'resizable',
      type: 'boolean',
      default: 'false',
      desc: 'Renders a drag handle on the trailing edge and lets the user resize this pane. Requires width to be set.'
    },
    { prop: 'min', type: 'number', default: '200', desc: 'Minimum width in px when resizable.' },
    { prop: 'max', type: 'number', default: '640', desc: 'Maximum width in px when resizable.' },
    {
      prop: 'persistKey',
      type: 'string',
      default: '—',
      desc: 'localStorage key to persist the dragged width under. Omit to skip persistence.'
    },
    {
      prop: 'sticky',
      type: 'boolean',
      default: 'false',
      desc: 'Sticks the pane to the top of its scroll container instead of scrolling with the page. Works inside any scrolling ancestor — the true page scroll or a bounded box — unlike a position: fixed pane, which only pins to the true viewport edge.'
    },
    {
      prop: 'stickyTop',
      type: 'number',
      default: '0',
      desc: 'Top offset in px for a sticky pane, e.g. to sit below a fixed app bar.'
    },
    {
      prop: 'visibleFrom',
      type: '"small" | "medium" | "large" | "extraLarge"',
      default: '—',
      desc: 'Hides this pane below the given breakpoint. Mutually exclusive with hiddenFrom.'
    },
    {
      prop: 'hiddenFrom',
      type: '"small" | "medium" | "large" | "extraLarge"',
      default: '—',
      desc: 'Hides this pane from the given breakpoint up. Mutually exclusive with visibleFrom.'
    },
    {
      prop: 'centered',
      type: '"none" | "narrow" | "medium"',
      default: '"none"',
      desc: 'Caps the content width — narrow is max-w-2xl, medium is max-w-5xl — and centers it.'
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
      desc: 'Whether the pane stretches to min-h-dvh.'
    },
    {
      prop: 'padding',
      type: '"none" | "sm" | "md" | "lg"',
      default: '"md"',
      desc: 'Padding applied to the inner content container.'
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
      desc: 'Rounds the top/bottom corners on md+ breakpoints.'
    },
    {
      prop: 'contentClass',
      type: 'string',
      default: '—',
      desc: 'Extra class applied to the inner content container.'
    }
  ];

  const paneGridProps: PropRow[] = [
    {
      prop: 'children',
      type: 'Snippet',
      default: '—',
      required: true,
      desc: 'Pane children — anything rendered directly inside becomes a flex item in the grid.'
    },
    {
      prop: 'direction',
      type: '"row" | "column" | Partial<Record<Breakpoint, "row" | "column">>',
      default: '"row"',
      desc: "Side by side or stacked, independently per breakpoint, e.g. {{ small: 'column', large: 'row' }}."
    },
    {
      prop: 'gap',
      type: 'SpaceSize | Partial<Record<Breakpoint, SpaceSize>>',
      default: '"md"',
      desc: 'Space between panes. SpaceSize is "none" | "sm" | "md" | "lg" | "xl".'
    },
    {
      prop: 'padding',
      type: 'SpaceSize | Partial<Record<Breakpoint, SpaceSize>>',
      default: '"none"',
      desc: "Padding on the grid's own edge."
    },
    {
      prop: 'margin',
      type: 'SpaceSize | Partial<Record<Breakpoint, SpaceSize>>',
      default: '"none"',
      desc: 'Margin around the grid.'
    },
    {
      prop: 'full',
      type: 'boolean',
      default: 'false',
      desc: 'Whether the grid stretches to min-h-dvh.'
    },
    {
      prop: 'rounded',
      type: 'boolean',
      default: 'false',
      desc: "Rounds the grid's own top corners on md+ breakpoints — most layouts round the individual Panes instead."
    },
    {
      prop: 'wrap',
      type: 'boolean',
      default: 'false',
      desc: 'Whether panes are allowed to wrap onto a new line instead of overflowing.'
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'import', label: 'Import' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'patterns', label: 'Composing Layouts' },
    { id: 'pane-props', label: 'Pane Props' },
    { id: 'panegrid-props', label: 'PaneGrid Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>Pane — Ogonëk M3 Docs</title>
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
              <a href="/docs" class="hover:text-md-sys-color-primary no-underline">Layout</a>
            </li>
            <li class="mx-1 opacity-40">/</li>
            <li class="text-md-sys-color-on-surface font-medium">Pane</li>
          </ol>
        </nav>
        <span
          class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
          >Stable</span
        >
      </div>

      <Headline>Pane</Headline>
      <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
        A single, versatile content region. Used standalone as a page-level wrapper, or nested
        inside <code class="doc-code">PaneGrid</code> — which handles how multiple Panes sit relative
        to one another — to build every layout shape this library used to hardcode as separate components
        (a resizable split, a sticky sidebar, a main + supporting-panel page).
      </Body>
    </header>

    <Divider class="mb-12" />

    <section id="overview" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Overview</Title>
      <Body>
        Earlier versions of this library shipped three separate, hardcoded layout components —
        <code class="doc-code">SinglePane</code>, <code class="doc-code">SplitPane</code>, and
        <code class="doc-code">SupportingPane</code> — one per M3 canonical layout shape.
        <code class="doc-code">Pane</code> + <code class="doc-code">PaneGrid</code> replace all
        three with two composable primitives: <code class="doc-code">Pane</code> is a single region
        (sizing, stickiness, resizing, breakpoint visibility all live here), and
        <code class="doc-code">PaneGrid</code> lays out however many Panes you give it (direction,
        gap, margin, padding — each independently responsive). This docs site dogfoods it directly:
        every
        <code class="doc-code">/docs/**</code> page, including this one, is a
        <code class="doc-code">PaneGrid</code> with a main content
        <code class="doc-code">Pane</code>
        and a sticky "On this page" <code class="doc-code">Pane</code> beside it.
      </Body>
    </section>

    <section id="import" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Import</Title>
      <CodeBlock
        lang="typescript"
        code={`import { Pane, PaneGrid } from '@noxlovette/material';`}
      />
    </section>

    <section id="demo" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Live Demo</Title>
      <Body class="text-md-sys-color-on-surface-variant">
        See both live, with Controls, in Storybook rather than a hand-rolled preview here.
      </Body>

      <div class="flex flex-col gap-3 sm:flex-row">
        <a
          href={storybookStoryUrl('containers-pane--standalone')}
          target="_blank"
          rel="noopener noreferrer"
          class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex flex-1 items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90"
        >
          <Icon name="widgets" />
          <div>
            <p class="md-sys-typescale-title-small">Pane</p>
            <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
              >Standalone usage — centered/padding/gap controls.</Body
            >
          </div>
        </a>
        <a
          href={storybookStoryUrl('containers-pane-grid--resizable-split')}
          target="_blank"
          rel="noopener noreferrer"
          class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex flex-1 items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90"
        >
          <Icon name="view_quilt" />
          <div>
            <p class="md-sys-typescale-title-small">PaneGrid</p>
            <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
              >Resizable split, sticky sidebar, main + supporting, list-detail.</Body
            >
          </div>
        </a>
      </div>
    </section>

    <section id="basic-usage" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Basic Usage</Title>
      <Body>
        Wrap page-level content directly — no <code class="doc-code">PaneGrid</code> is needed for a single-column
        page:
      </Body>

      <CodeBlock
        code={`<script lang="ts">
  import { Pane } from '@noxlovette/material';
<\/script>

<Pane centered="medium">
  <h1>Page title</h1>
  <p>Body content, capped at max-w-5xl and centered.</p>
</Pane>`}
      />
    </section>

    <section id="patterns" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Composing Layouts</Title>
      <Body>
        The three shapes the old separate components hardcoded are now just different prop
        combinations on the same two primitives.
      </Body>

      <div class="flex flex-col gap-3">
        <Card class="flex flex-col gap-1 p-4">
          <p class="text-md-sys-color-on-surface text-sm font-semibold">
            Resizable split (was <code class="doc-code">SplitPane</code>)
          </p>
          <Body class="text-md-sys-color-on-surface-variant"
            >A pane with <code class="doc-code">width</code> +
            <code class="doc-code">resizable</code> owns its own drag handle and width state — no separate
            anchor concept needed, since a fixed-width pane inside a flex row already sits exactly where
            you'd expect.</Body
          >
        </Card>
        <Card class="flex flex-col gap-1 p-4">
          <p class="text-md-sys-color-on-surface text-sm font-semibold">
            Sticky sidebar (was <code class="doc-code">SplitPane anchor="sticky"</code>)
          </p>
          <Body class="text-md-sys-color-on-surface-variant"
            >Add <code class="doc-code">sticky</code> to a fixed-width pane. Unlike the old
            <code class="doc-code">anchor="viewport"</code> mode (<code class="doc-code"
              >position: fixed</code
            >
            to the true browser edge, which breaks once anything nests it under an offset ancestor), native
            <code class="doc-code">position: sticky</code>
            works correctly inside any scrolling container — the page itself, or a bounded box — so one
            prop now covers both of the old
            <code class="doc-code">viewport</code> and <code class="doc-code">sticky</code> anchor modes.
            This very sidebar uses it.</Body
          >
        </Card>
        <Card class="flex flex-col gap-1 p-4">
          <p class="text-md-sys-color-on-surface text-sm font-semibold">
            Main + supporting panel (was <code class="doc-code">SupportingPane</code>)
          </p>
          <Body class="text-md-sys-color-on-surface-variant"
            >A <code class="doc-code">PaneGrid</code> with
            <code class="doc-code"
              >direction=&lbrace;&lbrace; small: 'column', large: 'row' &rbrace;&rbrace;</code
            >
            stacks on small viewports and moves to a row from <code class="doc-code">large</code> up
            — give the supporting <code class="doc-code">Pane</code> a fixed
            <code class="doc-code">width</code> and <code class="doc-code">sticky</code>. This
            page's own body is built this way.</Body
          >
        </Card>
      </div>

      <CodeBlock
        code={`<PaneGrid direction={{ small: 'column', large: 'row' }} gap="lg" full>
  <Pane width={320} resizable persistKey="app:nav-width">
    <nav>...</nav>
  </Pane>

  <Pane>
    <main>...</main>
  </Pane>

  <Pane width={280} sticky>
    <aside>Table of contents</aside>
  </Pane>
</PaneGrid>`}
      />
    </section>

    <section id="pane-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Pane Props</Title>
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
            {#each paneProps as row}
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

    <section id="panegrid-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>PaneGrid Props</Title>
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
            {#each paneGridProps as row}
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
        <code class="doc-code">Breakpoint</code> is
        <code class="doc-code">"small" | "medium" | "large" | "extraLarge"</code>, mapped straight
        onto Tailwind's existing <code class="doc-code">md</code> (768px),
        <code class="doc-code">lg</code>
        (1024px), and <code class="doc-code">xl</code> (1280px) breakpoints — small is the unprefixed
        mobile-first base.
      </Body>
    </section>

    <section id="accessibility" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Accessibility</Title>
      <div class="flex flex-col gap-3">
        {#each [{ icon: 'drag_indicator', title: 'Resize handle semantics', desc: 'A resizable pane\'s drag handle renders role="separator" aria-orientation="vertical" with aria-valuenow/min/max reflecting the current and clamped width range.' }, { icon: 'contrast', title: 'Background contrast', desc: 'When background is true, a pane paints the surface color role, keeping contrast consistent with the active theme for any content placed inside.' }, { icon: 'visibility_off', title: 'Breakpoint visibility', desc: "visibleFrom/hiddenFrom toggle CSS display only — hidden content is still in the DOM. Don't rely on them alone to remove content from assistive tech; pair with aria-hidden if content is truly decorative at that size." }] as item}
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
        href="/docs/card"
        class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
      >
        Next: Card
        <Icon name="arrow_forward" size="sm" />
      </a>
    </footer>
  </Pane>

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
