<script lang="ts">
  import { Body, Title, Headline, Card, Divider, Icon, SupportingPane } from '$lib/index.js';
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
    { id: 'appbar-props', label: 'AppBar Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>App Bar — Ogonëk M3 Docs</title>
</svelte:head>

<SupportingPane
  anchor="parent"
  position="right"
  collapsible={false}
  rounded={false}
  gap="none"
  mainClass="min-w-0 px-8 py-12 xl:px-12"
  supportingClass="hidden xl:block lg:w-52 lg:shrink-0"
>
  {#snippet main()}
    <header class="mb-10 flex flex-col gap-3">
      <div class="flex items-center gap-3">
        <nav class="text-md-sys-color-on-surface-variant text-sm" aria-label="Breadcrumb">
          <ol class="flex items-center gap-1">
            <li><a href="/docs" class="hover:text-md-sys-color-primary no-underline">Docs</a></li>
            <li class="mx-1 opacity-40">/</li>
            <li>
              <a href="/docs" class="hover:text-md-sys-color-primary no-underline">Navigation</a>
            </li>
            <li class="mx-1 opacity-40">/</li>
            <li class="text-md-sys-color-on-surface font-medium">App Bar</li>
          </ol>
        </nav>
        <span
          class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
          >Stable</span
        >
      </div>

      <Headline>Top App Bar</Headline>
      <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
        App Bars sit at the top of the screen for branding, titles, and actions. This implementation
        is mobile-only (<code class="doc-code">md:hidden</code>) — on larger screens the title and
        actions typically move into the <code class="doc-code">Rail</code>'s footer or a page header
        instead.
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
      <CodeBlock code={`import { AppBar } from '@noxlovette/material';`} />
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
        <code class="doc-code">AppBar</code> is fixed and mobile-only; give it
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
      class="border-md-sys-color-outline-variant flex items-center justify-start border-t pt-8"
    >
      <a
        href="/docs/tabs"
        class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
      >
        <Icon name="arrow_back" size="sm" />
        Previous: Tabs
      </a>
    </footer>
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
