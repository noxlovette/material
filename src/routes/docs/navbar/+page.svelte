<script lang="ts">
  import { Body, Title, Headline, Card, Divider, Icon, SupportingPane } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const navbarProps: PropRow[] = [
    {
      prop: 'children',
      type: 'Snippet',
      default: '—',
      required: true,
      desc: 'NavbarItem elements to render inside the bar.'
    },
    {
      prop: 'fab',
      type: 'Snippet',
      default: '—',
      desc: 'Optional Floating Action Button rendered above the bar, offset to avoid overlapping items.'
    },
    {
      prop: 'trailing',
      type: 'Snippet',
      default: '—',
      desc: 'Optional content rendered after the nav items, e.g. a settings shortcut.'
    },
    {
      prop: 'ghost',
      type: 'boolean',
      default: 'false',
      desc: 'Renders an invisible same-height spacer after the fixed bar so page content below it is not obscured.'
    }
  ];

  const navbarItemProps: PropRow[] = [
    {
      prop: 'href',
      type: 'string',
      default: '—',
      required: true,
      desc: 'The destination URL. Active state is derived by comparing href to the current page URL.'
    },
    {
      prop: 'label',
      type: 'string',
      default: '—',
      required: true,
      desc: 'The text label shown below the icon.'
    },
    {
      prop: 'iconProps',
      type: 'IconProps',
      default: '—',
      required: true,
      desc: 'Passed directly to the Icon component.'
    },
    {
      prop: 'badge',
      type: 'number',
      default: '0',
      desc: 'Numeric badge overlaid on the icon. Pass -1 for a dot indicator.'
    },
    {
      prop: 'selected',
      type: 'boolean',
      default: 'false',
      desc: 'Manually force the active/selected visual state.'
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'import', label: 'Import' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'navbar-props', label: 'Navbar Props' },
    { id: 'navbaritem-props', label: 'NavbarItem Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>Navbar — Ogonëk M3 Docs</title>
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
            <li class="text-md-sys-color-on-surface font-medium">Navbar</li>
          </ol>
        </nav>
        <span
          class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
          >Stable</span
        >
      </div>

      <Headline>Navigation Bar</Headline>
      <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
        Navigation Bars are Rail's mobile counterpart — a fixed bottom bar for 3–5 primary
        destinations below the <code class="doc-code">md</code> breakpoint. In this library, most
        apps don't mount it directly: <code class="doc-code">Rail</code>'s
        <code class="doc-code">withNavbar</code> prop renders it automatically.
      </Body>

      <div class="flex flex-wrap gap-2 pt-1">
        <a
          href="https://m3.material.io/components/navigation-bar/overview"
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
        The <code class="doc-code">Navbar</code> component implements the
        <a
          href="https://m3.material.io/components/navigation-bar/overview"
          target="_blank"
          rel="noopener noreferrer"
          class="text-md-sys-color-primary">Material Design 3 Navigation Bar</a
        >
        pattern: a fixed horizontal bar of <code class="doc-code">NavbarItem</code>s, each showing
        an icon and label with an active-state indicator.
      </Body>
      <Body>
        <code class="doc-code">Rail</code> renders a <code class="doc-code">Navbar</code> internally
        when <code class="doc-code">withNavbar</code> is set, using its own
        <code class="doc-code">RailItem</code> list — you rarely compose
        <code class="doc-code">Navbar</code>
        by hand unless you need a standalone mobile-only nav bar with no rail at all.
      </Body>
    </section>

    <section id="import" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Import</Title>
      <CodeBlock code={`import { Navbar, NavbarItem } from '@noxlovette/material';`} />
    </section>

    <section id="demo" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Live Demo</Title>
      <Body class="text-md-sys-color-on-surface-variant">
        See it live, with Controls, in Storybook rather than a hand-rolled preview here.
      </Body>

      <a
        href={storybookStoryUrl('navigation-navbar--playground')}
        target="_blank"
        rel="noopener noreferrer"
        class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90 sm:max-w-sm"
      >
        <Icon name="widgets" />
        <div>
          <p class="md-sys-typescale-title-small">Playground</p>
          <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
            >Open the Navbar story — previewed at a mobile viewport, matching its md:hidden
            behaviour.</Body
          >
        </div>
      </a>
    </section>

    <section id="basic-usage" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Basic Usage</Title>
      <Body>
        Prefer <code class="doc-code">Rail</code>'s <code class="doc-code">withNavbar</code> prop
        for the common case. Mount <code class="doc-code">Navbar</code> directly only for a standalone
        bottom bar:
      </Body>

      <CodeBlock
        code={`<script lang="ts">
  import { Navbar, NavbarItem } from '@noxlovette/material';
<\/script>

<Navbar ghost>
  <NavbarItem label="Home"     href="/"        iconProps={{ name: 'house' }} />
  <NavbarItem label="Messages" href="/messages" iconProps={{ name: 'mail' }} badge={5} />
  <NavbarItem label="Settings" href="/settings" iconProps={{ name: 'settings' }} />
</Navbar>`}
      />
    </section>

    <section id="navbar-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Navbar Props</Title>
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
            {#each navbarProps as row}
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

    <section id="navbaritem-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>NavbarItem Props</Title>
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
            {#each navbarItemProps as row}
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
        {#each [{ icon: 'visibility', title: 'Active state', desc: 'Active items receive aria-current="page" from the underlying NavigationMenu.Link (Bits UI).' }, { icon: 'smartphone', title: 'Landmark', desc: 'Rendered inside a NavigationMenu.List, announced by assistive tech as a navigation landmark.' }] as item}
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
        href="/docs/rail"
        class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
      >
        <Icon name="arrow_back" size="sm" />
        Previous: Rail
      </a>
      <a
        href="/docs/tabs"
        class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
      >
        Next: Tabs
        <Icon name="arrow_forward" size="sm" />
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
