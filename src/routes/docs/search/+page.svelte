<script lang="ts">
  import { Body, Title, Headline, Card, Divider, Icon, Pane, PaneGrid } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const searchProps: PropRow[] = [
    {
      prop: 'value',
      type: 'string | null',
      default: '—',
      desc: 'The current query text. Bindable.'
    },
    {
      prop: 'placeholder',
      type: 'string',
      default: "'Search'",
      desc: 'Hint text shown in the empty field.'
    },
    {
      prop: 'elementRef',
      type: 'HTMLInputElement',
      default: '—',
      desc: 'Bindable reference to the underlying input element.'
    },
    {
      prop: 'leading',
      type: 'Snippet',
      default: '—',
      desc: 'A leading action, e.g. a menu or back icon button. Replaces the leading icon.'
    },
    {
      prop: 'trailing',
      type: 'Snippet',
      default: '—',
      desc: 'Trailing actions and/or an avatar (48dp targets, no gap), after the clear button.'
    },
    {
      prop: 'leadingIconProps',
      type: 'IconProps | null',
      default: "{ name: 'search' }",
      desc: 'Props for the decorative leading icon; null removes it (16dp inset instead).'
    },
    {
      prop: 'trailingIconProps',
      type: 'IconProps | null',
      default: "{ name: 'close' }",
      desc: 'Icon of the clear button, shown only while there is a value; null removes the button.'
    },
    {
      prop: 'trailingClick',
      type: '() => void',
      default: 'clear + refocus',
      desc: 'Click handler for the clear button. Defaults to clearing the value and refocusing the input.'
    },
    {
      prop: 'clearLabel',
      type: 'string',
      default: "'Clear search'",
      desc: 'Accessible label for the clear button.'
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'import', label: 'Import' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'search-props', label: 'Search Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>Search — Svelte Material Docs</title>
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
              <a href="/docs" class="hover:text-md-sys-color-primary no-underline">Inputs</a>
            </li>
            <li class="mx-1 opacity-40">/</li>
            <li class="text-md-sys-color-on-surface font-medium">Search</li>
          </ol>
        </nav>
        <span
          class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
          >Stable</span
        >
      </div>

      <Headline>Search</Headline>
      <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
        Search bars let users enter a query to find information within an app. This is a compact,
        pill-shaped bar (the M3 "search bar", not the full-screen "search view") with a leading
        search icon and a trailing clear button that appears once there's a value.
      </Body>

      <div class="flex flex-wrap gap-2 pt-1">
        <a
          href="https://m3.material.io/components/search/overview"
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

    <section id="overview" class="mb-12 flex scroll-mt-6 flex-col gap-4">
      <Title>Overview</Title>
      <Body>
        The <code class="doc-code">Search</code> component implements the
        <a
          href="https://m3.material.io/components/search/overview"
          target="_blank"
          rel="noopener noreferrer"
          class="text-md-sys-color-primary">Material Design 3 Search Bar</a
        >
        pattern: the contained M3 Expressive search bar: a 56dp, fully-rounded surface-container-high
        field, distinct from the filled rectangular Text Field.
      </Body>
      <Body>
        It's a plain labelled <code class="doc-code">&lt;input&gt;</code> under the hood (no bits-ui
        primitive) — pass any remaining native input attributes via
        <code class="doc-code">...restProps</code>.
      </Body>
    </section>

    <section id="import" class="mb-12 flex scroll-mt-6 flex-col gap-4">
      <Title>Import</Title>
      <CodeBlock lang="typescript" code={`import { Search } from '@noxlovette/material';`} />
    </section>

    <section id="demo" class="mb-12 flex scroll-mt-6 flex-col gap-4">
      <Title>Live Demo</Title>
      <Body class="text-md-sys-color-on-surface-variant">
        See it live, with Controls, in Storybook rather than a hand-rolled preview here.
      </Body>

      <a
        href={storybookStoryUrl('forms-search--playground')}
        target="_blank"
        rel="noopener noreferrer"
        class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90 sm:max-w-sm"
      >
        <Icon name="widgets" />
        <div>
          <p class="md-sys-typescale-title-small">Playground</p>
          <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
            >Open the Search story with Controls for placeholder and value.</Body
          >
        </div>
      </a>
    </section>

    <section id="basic-usage" class="mb-12 flex scroll-mt-6 flex-col gap-4">
      <Title>Basic Usage</Title>
      <Body>Bind <code class="doc-code">value</code> to read the query text:</Body>

      <CodeBlock
        code={`<script lang="ts">
  import { Search } from '@noxlovette/material';

  let query = $state('');
<\/script>

<Search placeholder="Search" bind:value={query} />`}
      />
    </section>

    <section id="search-props" class="mb-12 flex scroll-mt-6 flex-col gap-4">
      <Title>Search Props</Title>
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
            {#each searchProps as row}
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

    <section id="accessibility" class="mb-12 flex scroll-mt-6 flex-col gap-4">
      <Title>Accessibility</Title>
      <div class="flex flex-col gap-3">
        {#each [{ icon: 'label', title: 'Label association', desc: 'The input (type="search") is wrapped in a label tied to a unique id, so the whole bar is a tap target and several bars can share a page.' }, { icon: 'close', title: 'Clear affordance', desc: 'The clear button renders only once there is a value, is a 48dp labelled type="button" (it never submits a form), and returns focus to the input.' }, { icon: 'visibility', title: 'Focus indicator', desc: 'Keyboard focus in the input draws the M3 focus indicator on the bar: 3dp secondary outline at a 2dp offset.' }] as item}
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
        href="/docs/select"
        class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
      >
        <Icon name="arrow_back" size="sm" />
        Previous: Select
      </a>
      <a
        href="/docs/pane"
        class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
      >
        Next: Single Pane
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
