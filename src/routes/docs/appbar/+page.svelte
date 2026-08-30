<script lang="ts">
  import {
    Body,
    Title,
    Headline,
    Card,
    Divider,
    Icon,
    Pane,
    PaneGrid,
    Breadcrumb
  } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const appBarProps: PropRow[] = [
    {
      prop: 'title',
      type: 'string',
      default: '—',
      required: true,
      desc: 'The screen title.'
    },
    {
      prop: 'subtitle',
      type: 'string',
      default: '—',
      desc: 'Optional subtitle rendered below the title.'
    },
    {
      prop: 'leading',
      type: 'Snippet',
      default: '—',
      desc: 'Content on the left, e.g. a back button (see showBack) or a menu icon.'
    },
    {
      prop: 'trailing',
      type: 'Snippet',
      default: '—',
      desc: 'Action icons rendered on the right.'
    },
    {
      prop: 'children',
      type: 'Snippet',
      default: '—',
      desc: 'Extra content in a full-width row below the title, e.g. a Breadcrumb trail.'
    },
    {
      prop: 'showBack',
      type: 'boolean',
      default: 'false',
      desc: 'Reserves leading space for a back button. Combine with the leading snippet to render one.'
    },
    {
      prop: 'ghost',
      type: 'boolean',
      default: 'false',
      desc: 'Renders an invisible same-height spacer after the fixed bar so content below it is not obscured.'
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'import', label: 'Import' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'breadcrumb', label: 'Breadcrumb' },
    { id: 'appbar-props', label: 'AppBar Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>App Bar — Material Docs</title>
</svelte:head>

<PaneGrid direction={{ small: 'column', large: 'row' }} gap="lg" full>
  <Pane rounded={false}>
    <header class="mb-10 flex flex-col gap-3">
      <div class="flex items-center gap-3">
        <Breadcrumb
          items={[
            { label: 'Docs', href: '/docs' },
            { label: 'Navigation', href: '/docs' },
            { label: 'App Bar' }
          ]}
        />
        <span
          class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
          >Stable</span
        >
      </div>

      <Headline>Top App Bar</Headline>
      <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
        App Bars sit at the top of the screen for branding, titles, and actions. Per the current M3
        guidance, this implementation stays visible across all window size classes — pair it with <code
          class="doc-code">railTop</code
        >
        on <code class="doc-code">Rail</code> so the rail sits below it on larger screens.
      </Body>

      <div class="flex flex-wrap gap-2 pt-1">
        <a
          href="https://m3.material.io/components/top-app-bar/overview"
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
        The <code class="doc-code">AppBar</code> component implements the
        <a
          href="https://m3.material.io/components/top-app-bar/overview"
          target="_blank"
          rel="noopener noreferrer"
          class="text-md-sys-color-primary">Material Design 3 Top App Bar</a
        >
        pattern. It listens to <code class="doc-code">window</code> scroll and switches to an elevated,
        tinted surface once the page scrolls past 10px.
      </Body>
    </section>

    <section id="import" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Import</Title>
      <CodeBlock lang="typescript" code={`import { AppBar } from '@noxlovette/material';`} />
    </section>

    <section id="demo" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Live Demo</Title>
      <Body class="text-md-sys-color-on-surface-variant">
        See it live, with Controls, in Storybook rather than a hand-rolled preview here.
      </Body>

      <div class="flex flex-col gap-3 sm:flex-row">
        <a
          href={storybookStoryUrl('navigation-app-bar--playground')}
          target="_blank"
          rel="noopener noreferrer"
          class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90"
        >
          <Icon name="widgets" />
          <div>
            <p class="md-sys-typescale-title-small">Playground</p>
            <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
              >Title, subtitle, showBack, and ghost Controls.</Body
            >
          </div>
        </a>
        <a
          href={storybookStoryUrl('navigation-app-bar--with-back-and-subtitle')}
          target="_blank"
          rel="noopener noreferrer"
          class="bg-md-sys-color-surface-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90"
        >
          <Icon name="widgets" />
          <div>
            <p class="md-sys-typescale-title-small">With Back and Subtitle</p>
            <Body class="text-md-sys-color-on-surface-variant text-sm"
              >A detail-screen bar with a back button and subtitle.</Body
            >
          </div>
        </a>
      </div>
    </section>

    <section id="basic-usage" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Basic Usage</Title>
      <Body>
        <code class="doc-code">AppBar</code> is fixed across all screen sizes; give it
        <code class="doc-code">ghost</code> so page content isn't hidden underneath it:
      </Body>

      <CodeBlock
        code={`<script lang="ts">
  import { AppBar, ButtonIcon } from '@noxlovette/material';
<\/script>

<AppBar title="Inbox" ghost>
  {#snippet trailing()}
    <ButtonIcon variant="text" iconProps={{ name: 'search' }} />
    <ButtonIcon variant="text" iconProps={{ name: 'more_vert' }} />
  {/snippet}
</AppBar>`}
      />
    </section>

    <section id="breadcrumb" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Breadcrumb</Title>
      <Body>
        <code class="doc-code">Breadcrumb</code> is designed to live inside
        <code class="doc-code">AppBar</code>, rendered via its
        <code class="doc-code">children</code>
        snippet in a full-width row below the title (this page's own header, above, is the component in
        use). M3 doesn't define a breadcrumb pattern, so it follows this repo's typescale/color-role conventions:
        <code class="doc-code">label-large</code>
        text separated by chevrons, with the current page in bold. The last item is always static text
        with
        <code class="doc-code">aria-current="page"</code>, regardless of whether it has an
        <code class="doc-code">href</code>. Text color for the current crumb (and the hover color
        for the links before it) is set with the <code class="doc-code">color</code> prop —
        <code class="doc-code">primary</code>, <code class="doc-code">secondary</code>,
        <code class="doc-code">tertiary</code>, or <code class="doc-code">surface</code> — and
        defaults to <code class="doc-code">primary</code>.
      </Body>

      <CodeBlock
        code={`<script lang="ts">
  import { AppBar, Breadcrumb } from '@noxlovette/material';
<\/script>

<AppBar title="Sample Files">
  <Breadcrumb
    items={[
      { label: 'Home', href: '/' },
      { label: 'Library', href: '/library' },
      { label: 'Sample Files' }
    ]}
  />
</AppBar>`}
      />

      <a
        href={storybookStoryUrl('navigation-breadcrumb--in-app-bar')}
        target="_blank"
        rel="noopener noreferrer"
        class="bg-md-sys-color-surface-container flex items-center gap-2 self-start rounded-2xl p-4 no-underline transition-opacity hover:opacity-90"
      >
        <Icon name="widgets" />
        <div>
          <p class="md-sys-typescale-title-small">In App Bar</p>
          <Body class="text-md-sys-color-on-surface-variant text-sm"
            >Breadcrumb rendered inside AppBar's children row.</Body
          >
        </div>
      </a>
    </section>

    <section id="appbar-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>AppBar Props</Title>
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
            {#each appBarProps as row}
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
        {#each [{ icon: 'title', title: 'Heading semantics', desc: 'The title renders as an <h1>, giving screen readers a clear page-level heading.' }, { icon: 'smartphone', title: 'Landmark', desc: 'The bar renders as a <nav> element, announced as a landmark by assistive technology.' }] as item}
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
        href="/docs/tabs"
        class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
      >
        <Icon name="arrow_back" size="sm" />
        Previous: Tabs
      </a>
      <a
        href="/docs/button"
        class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
      >
        Next: Button
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
