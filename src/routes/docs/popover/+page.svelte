<script lang="ts">
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
  import { Body, Title, Headline, Card, Divider, Icon, SupportingPane } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const popoverProps: PropRow[] = [
    {
      prop: 'trigger',
      type: 'Snippet',
      default: '—',
      required: true,
      desc: 'The trigger element, typically a Button or ButtonIcon.'
    },
    {
      prop: 'children',
      type: 'Snippet',
      default: '—',
      required: true,
      desc: 'The popover panel content.'
    },
    {
      prop: 'title',
      type: 'string',
      default: '—',
      desc: 'Optional heading displayed at the top of the panel.'
    },
    {
      prop: 'showClose',
      type: 'boolean',
      default: 'true',
      desc: 'Shows a close (×) button inside the panel header.'
    },
    {
      prop: 'open',
      type: 'boolean',
      default: 'false',
      desc: 'Controlled open state. Bindable.'
    },
    {
      prop: 'side',
      type: '"top" | "right" | "bottom" | "left"',
      default: "'bottom'",
      desc: 'Positioning side relative to the trigger (bits-ui Popover.ContentProps).'
    },
    {
      prop: 'align',
      type: '"start" | "center" | "end"',
      default: "'start'",
      desc: 'Alignment along the side axis.'
    },
    {
      prop: 'sideOffset',
      type: 'number',
      default: '8',
      desc: 'Gap between trigger and panel, in pixels.'
    },
    {
      prop: 'class',
      type: 'string',
      default: '—',
      desc: 'Additional CSS classes for the panel.'
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'import', label: 'Import' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'popover-props', label: 'Popover Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>Popover — Ogonëk M3 Docs</title>
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
              <li class="text-md-sys-color-on-surface font-medium">Popover</li>
            </ol>
          </nav>
          <span
            class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
            >Stable</span
          >
        </div>

        <Headline>Popover</Headline>
        <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
          Popover displays rich content in a non-modal overlay anchored to a trigger element — an
          optional title, a close button, and arbitrary children content.
        </Body>
      </header>

      <Divider class="mb-12" />

      <section id="overview" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Overview</Title>
        <Body>
          Material Design 3 doesn't publish a standalone "Popover" component page, so there is no M3
          Spec link on this page the way other docs pages have one.
          <code class="doc-code">Popover</code> is this library's own general-purpose
          anchored-overlay primitive built on bits-ui's <code class="doc-code">Popover.Root</code>.
          It sits between a few M3 concepts without being a 1:1 match to any of them: closer to the
          non-modal "rich tooltip"/dialog surfaces described under
          <a
            href="https://m3.material.io/components/dialogs/overview"
            target="_blank"
            rel="noopener noreferrer"
            class="text-md-sys-color-primary">Dialogs</a
          >
          than to a true modal Dialog (it doesn't block interaction with the rest of the page and has
          no scrim), but it's also not a hover-triggered <code class="doc-code">Tooltip</code> (this library
          ships that separately under Forms) — it's click-triggered and can hold interactive content.
        </Body>
        <Body>
          Reach for <code class="doc-code">Popover</code> for click-triggered supplementary info or
          a small set of controls anchored to a button; reach for <code class="doc-code">Menu</code>
          instead when the content is a list of selectable actions, and for
          <code class="doc-code">Dialogue</code> when the interaction should block the rest of the page
          until resolved.
        </Body>
      </section>

      <section id="import" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Import</Title>
        <CodeBlock lang="typescript" code={`import { Popover } from '@noxlovette/material';`} />
      </section>

      <section id="demo" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Live Demo</Title>
        <Body class="text-md-sys-color-on-surface-variant">
          See it live, with Controls, in Storybook rather than a hand-rolled preview here.
        </Body>

        <a
          href={storybookStoryUrl('containers-popover--playground')}
          target="_blank"
          rel="noopener noreferrer"
          class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90 sm:max-w-sm"
        >
          <Icon name="widgets" />
          <div>
            <p class="md-sys-typescale-title-small">Playground</p>
            <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
              >Open the Popover story, plus an Icon Trigger, No Title variant.</Body
            >
          </div>
        </a>
      </section>

      <section id="basic-usage" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Basic Usage</Title>
        <CodeBlock
          code={`<script lang="ts">
  import { Popover, Button, Body } from '@noxlovette/material';
<\/script>

<Popover title="Storage">
  {#snippet trigger()}
    <Button variant="outlined">Show info</Button>
  {/snippet}
  <Body>75% of your storage has been used.</Body>
</Popover>`}
        />
      </section>

      <section id="popover-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Popover Props</Title>
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
              {#each popoverProps as row}
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
          {#each [{ icon: 'keyboard', title: 'Keyboard dismissal', desc: 'Escape closes the popover and returns focus to the trigger, handled by bits-ui Popover primitives.' }, { icon: 'block', title: 'Non-modal', desc: 'Unlike Dialogue, the rest of the page remains interactive and focusable while a Popover is open — do not use it for content that must block further interaction.' }] as item}
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
          href="/docs/menu"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          <Icon name="arrow_back" size="sm" />
          Previous: Menu
        </a>
        <a
          href="/docs/bottom-sheet"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          Next: Bottom Sheet
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
