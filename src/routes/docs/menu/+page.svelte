<script lang="ts">
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
  import { Body, Title, Headline, Card, Divider, Icon, SupportingPane } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const menuProps: PropRow[] = [
    {
      prop: 'children',
      type: 'Snippet',
      default: '—',
      required: true,
      desc: 'Content rendered inside the floating panel — typically a list of MenuItem, but any element is valid (Divider, headings, etc.).'
    },
    {
      prop: 'trigger',
      type: 'Snippet',
      default: '—',
      desc: 'Custom trigger element. When omitted, a default filled Button labelled by label is rendered.'
    },
    {
      prop: 'label',
      type: 'string',
      default: "'Open menu'",
      desc: 'Label for the default button trigger. Ignored when trigger is provided.'
    },
    {
      prop: 'align',
      type: '"start" | "center" | "end"',
      default: "'start'",
      desc: 'Alignment of the floating panel relative to the trigger.'
    },
    {
      prop: 'open',
      type: 'boolean',
      default: 'false',
      desc: 'Controlled open state. Bind to this to drive the menu externally.'
    },
    {
      prop: 'class',
      type: 'string',
      default: '—',
      desc: 'Additional CSS classes applied to the floating content panel.'
    }
  ];

  const menuItemProps: PropRow[] = [
    {
      prop: 'children',
      type: 'Snippet',
      default: '—',
      required: true,
      desc: "The item's label content."
    },
    {
      prop: 'iconProps',
      type: 'IconProps',
      default: '—',
      desc: 'Props for an optional leading icon.'
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      desc: 'Disables the item and skips it during keyboard navigation.'
    },
    {
      prop: 'onclick',
      type: '() => void',
      default: '—',
      desc: 'Callback fired on activation. Wired through bits-ui onSelect internally — do not also pass onSelect for the same interaction, or it fires twice.'
    },
    {
      prop: 'onSelect',
      type: '(event: Event) => void',
      default: '—',
      desc: 'Raw bits-ui onSelect callback, for consumers who need the event object. Takes precedence over onclick if both are passed (onclick is only used as a fallback when onSelect is undefined).'
    },
    {
      prop: 'selected',
      type: 'boolean',
      default: '—',
      desc: 'Renders the item in a selected state (tonal background) with a trailing check icon.'
    },
    {
      prop: 'helper',
      type: 'string',
      default: '—',
      desc: 'Optional supporting text line rendered below the label.'
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'import', label: 'Import' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'menu-props', label: 'Menu Props' },
    { id: 'menuitem-props', label: 'MenuItem Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>Menu — Ogonëk M3 Docs</title>
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
                <a href="/docs" class="hover:text-md-sys-color-primary no-underline">Containers</a>
              </li>
              <li class="mx-1 opacity-40">/</li>
              <li class="text-md-sys-color-on-surface font-medium">Menu</li>
            </ol>
          </nav>
          <span
            class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
            >Stable</span
          >
        </div>

        <Headline>Menu</Headline>
        <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
          A dropdown list of choices that appears on top of app content when triggered. Menu is
          split into two components: <code class="doc-code">Menu</code> (the shell — open state and
          floating panel positioning) and <code class="doc-code">MenuItem</code> (a single interactive
          row inside it).
        </Body>

        <div class="flex flex-wrap gap-2 pt-1">
          <a
            href="https://m3.material.io/components/menus/overview"
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
          <code class="doc-code">Menu</code> owns exactly two things: open/close state (bits-ui's
          <code class="doc-code">DropdownMenu.Root</code>) and the floating panel's position. It has
          no opinion about what goes inside — pass <code class="doc-code">MenuItem</code>
          components, a <code class="doc-code">Divider</code>, group headings, or any custom element
          as children.
        </Body>
        <Body>
          Use the <code class="doc-code">trigger</code> snippet to supply a fully custom trigger
          element (e.g. an icon button). When omitted, a default filled
          <code class="doc-code">Button</code>
          labelled by <code class="doc-code">label</code> is rendered.
        </Body>
        <Body class="text-md-sys-color-on-surface-variant text-sm">
          A separate <code class="doc-code">ContextMenu</code> component exists for the right-click variant,
          which stays data-driven since its items are always contextual and uniform.
        </Body>
      </section>

      <section id="import" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Import</Title>
        <CodeBlock
          lang="typescript"
          code={`import { Menu, MenuItem } from '@noxlovette/material';`}
        />
      </section>

      <section id="demo" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Live Demo</Title>
        <Body class="text-md-sys-color-on-surface-variant">
          See it live, with Controls, in Storybook rather than a hand-rolled preview here.
        </Body>

        <a
          href={storybookStoryUrl('containers-menu--playground')}
          target="_blank"
          rel="noopener noreferrer"
          class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90 sm:max-w-sm"
        >
          <Icon name="widgets" />
          <div>
            <p class="md-sys-typescale-title-small">Playground</p>
            <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
              >Open the Menu story, plus With Custom Trigger and With Selected Item variants.</Body
            >
          </div>
        </a>
      </section>

      <section id="basic-usage" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Basic Usage</Title>
        <CodeBlock
          code={`<script lang="ts">
  import { Menu, MenuItem } from '@noxlovette/material';
<\/script>

<Menu label="Options" align="end">
  <MenuItem iconProps={{ name: 'edit' }} onclick={() => console.log('edit')}>
    Edit
  </MenuItem>
  <MenuItem iconProps={{ name: 'delete' }} onclick={() => console.log('delete')}>
    Delete
  </MenuItem>
</Menu>`}
        />
      </section>

      <section id="menu-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Menu Props</Title>
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
              {#each menuProps as row}
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

      <section id="menuitem-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>MenuItem Props</Title>
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
              {#each menuItemProps as row}
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
          {#each [{ icon: 'keyboard', title: 'Keyboard navigation', desc: 'Arrow keys move through items, Enter/Space activates, Escape closes and returns focus to the trigger — all handled by bits-ui DropdownMenu primitives.' }, { icon: 'check', title: 'Selected indicator', desc: 'selected items show a check icon in addition to a colored background, avoiding a color-only signal.' }, { icon: 'block', title: 'Disabled items', desc: 'Individual items can be disabled and are skipped during keyboard navigation.' }] as item}
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
          href="/docs/dialog"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          <Icon name="arrow_back" size="sm" />
          Previous: Dialog
        </a>
        <a
          href="/docs/popover"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          Next: Popover
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
