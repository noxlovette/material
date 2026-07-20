<script lang="ts">
  import { Body, Title, Headline, Card, Divider, Icon, SupportingPane } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const tabHolderProps: PropRow[] = [
    {
      prop: 'items',
      type: 'TabProps[]',
      default: '—',
      required: true,
      desc: 'Tab items to render. Each is passed to an internal Tab component.'
    },
    {
      prop: 'value',
      type: 'string',
      default: 'items[0]?.value',
      desc: 'The currently active tab value. Bindable.'
    },
    {
      prop: 'onValueChange',
      type: '(value: string) => void',
      default: '—',
      desc: 'Callback fired when the active tab changes.'
    },
    {
      prop: 'variant',
      type: '"primary" | "secondary"',
      default: '"primary"',
      desc: 'Primary tabs show icon + label (h-16). Secondary tabs show label only (h-12).'
    },
    {
      prop: 'activationMode',
      type: '"automatic" | "manual"',
      default: '"automatic"',
      desc: 'Automatic activates a tab on arrow-key focus; manual requires Enter/Space.'
    }
  ];

  const tabProps: PropRow[] = [
    {
      prop: 'name',
      type: 'string',
      default: '—',
      required: true,
      desc: 'The tab label.'
    },
    {
      prop: 'value',
      type: 'string',
      default: '—',
      desc: 'Unique identifier — required for content-panel tabs (paired with TabContent). Omit for href-based navigation tabs.'
    },
    {
      prop: 'href',
      type: 'string',
      default: '—',
      desc: 'Renders the tab as an <a> for route navigation instead of a content-panel <button>.'
    },
    {
      prop: 'iconProps',
      type: 'IconProps',
      default: '—',
      desc: 'Icon shown above the label. Only rendered when variant is "primary".'
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      desc: 'Disables the tab trigger.'
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'import', label: 'Import' },
    { id: 'anatomy', label: 'Anatomy' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage (content panels)' },
    { id: 'nav-tabs', label: 'Navigation Tabs (href)' },
    { id: 'tabholder-props', label: 'TabHolder Props' },
    { id: 'tab-props', label: 'Tab Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>Tabs — Ogonëk M3 Docs</title>
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
            <li class="text-md-sys-color-on-surface font-medium">Tabs</li>
          </ol>
        </nav>
        <span
          class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
          >Stable</span
        >
      </div>

      <Headline>Tabs</Headline>
      <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
        Tabs organise related content across screens, data sets, or other groupings. Use
        <code class="doc-code">TabHolder</code> with <code class="doc-code">TabContent</code> for
        content-panel tabs, or with <code class="doc-code">href</code> on each item for navigation tabs.
      </Body>

      <div class="flex flex-wrap gap-2 pt-1">
        <a
          href="https://m3.material.io/components/tabs/overview"
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
        The <code class="doc-code">Tabs</code> family implements the
        <a
          href="https://m3.material.io/components/tabs/overview"
          target="_blank"
          rel="noopener noreferrer"
          class="text-md-sys-color-primary">Material Design 3 Tabs</a
        > pattern, including the sliding active indicator underneath the tab row.
      </Body>
    </section>

    <section id="import" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Import</Title>
      <CodeBlock code={`import { TabHolder, Tab, TabContent } from '@noxlovette/material';`} />
    </section>

    <section id="anatomy" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Anatomy</Title>
      <div class="flex flex-col gap-3">
        {#each [{ name: 'TabHolder', desc: 'The container. Renders the tab row from an items array and the sliding active-state indicator.' }, { name: 'Tab', desc: 'A single trigger — rendered internally by TabHolder for each item. Renders as <a> when href is set, otherwise <button>.' }, { name: 'TabContent', desc: 'A content panel matched to a Tab by value. Only used for content-panel (non-href) tabs.' }] as part}
          <Card class="p-4">
            <code class="text-md-sys-color-primary text-sm font-semibold">{part.name}</code>
            <Body class="text-md-sys-color-on-surface-variant mt-1">{part.desc}</Body>
          </Card>
        {/each}
      </div>
    </section>

    <section id="demo" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Live Demo</Title>
      <Body class="text-md-sys-color-on-surface-variant">
        See it live, with Controls, in Storybook rather than a hand-rolled preview here.
      </Body>

      <div class="flex flex-col gap-3 sm:flex-row">
        <a
          href={storybookStoryUrl('navigation-tabs--playground')}
          target="_blank"
          rel="noopener noreferrer"
          class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90"
        >
          <Icon name="widgets" />
          <div>
            <p class="md-sys-typescale-title-small">Playground</p>
            <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
              >Content-panel tabs with variant and activationMode Controls.</Body
            >
          </div>
        </a>
        <a
          href={storybookStoryUrl('navigation-tabs--navigation-tabs-href')}
          target="_blank"
          rel="noopener noreferrer"
          class="bg-md-sys-color-surface-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90"
        >
          <Icon name="widgets" />
          <div>
            <p class="md-sys-typescale-title-small">Navigation Tabs (href)</p>
            <Body class="text-md-sys-color-on-surface-variant text-sm"
              >Tabs that route between pages instead of switching panels.</Body
            >
          </div>
        </a>
      </div>
    </section>

    <section id="basic-usage" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Basic Usage (content panels)</Title>
      <Body>
        Give each item a <code class="doc-code">value</code> and pair it with a matching
        <code class="doc-code">TabContent</code>:
      </Body>

      <CodeBlock
        code={`<script lang="ts">
  import { TabHolder, TabContent } from '@noxlovette/material';

  let value = $state('flights');
<\/script>

<TabHolder
  bind:value
  items={[
    { value: 'flights', name: 'Flights', iconProps: { name: 'flight' } },
    { value: 'trips',   name: 'Trips',   iconProps: { name: 'luggage' } },
    { value: 'explore', name: 'Explore', iconProps: { name: 'explore' } }
  ]}
/>

<TabContent value="flights">Flights panel</TabContent>
<TabContent value="trips">Trips panel</TabContent>
<TabContent value="explore">Explore panel</TabContent>`}
      />
    </section>

    <section id="nav-tabs" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Navigation Tabs (href)</Title>
      <Body>
        Give each item an <code class="doc-code">href</code> instead of a
        <code class="doc-code">value</code>
        to render navigation tabs that route between pages. Omit
        <code class="doc-code">TabContent</code> entirely in this mode.
      </Body>

      <CodeBlock
        code={`<TabHolder
  items={[
    { name: 'Home',     href: '/',         iconProps: { name: 'house' } },
    { name: 'Search',   href: '/search',   iconProps: { name: 'search' } },
    { name: 'Settings', href: '/settings', iconProps: { name: 'settings' } }
  ]}
/>`}
      />
    </section>

    <section id="tabholder-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>TabHolder Props</Title>
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
            {#each tabHolderProps as row}
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

    <section id="tab-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
      <Title>Tab Props</Title>
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
            {#each tabProps as row}
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
        {#each [{ icon: 'keyboard', title: 'Keyboard navigation', desc: 'Arrow keys move focus between tabs; automatic activationMode selects on focus, manual requires Enter/Space.' }, { icon: 'visibility', title: 'Active state', desc: 'The active Tab.Trigger sets aria-selected via Bits UI Tabs, and the sliding indicator is purely visual.' }, { icon: 'block', title: 'Disabled tabs', desc: 'Disabled tabs are removed from the arrow-key focus order.' }] as item}
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
        href="/docs/navbar"
        class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
      >
        <Icon name="arrow_back" size="sm" />
        Previous: Navbar
      </a>
      <a
        href="/docs/appbar"
        class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
      >
        Next: App Bar
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
