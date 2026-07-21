<script lang="ts">
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
  import { Body, Title, Headline, Card, Divider, Icon, SupportingPane } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const dialogueProps: PropRow[] = [
    {
      prop: 'open',
      type: 'boolean',
      default: 'false',
      desc: 'Whether the dialog is visible. Bindable.'
    },
    {
      prop: 'enhance',
      type: 'any',
      default: '—',
      required: true,
      desc: "The dialog's content is a <form> submitted with method=\"POST\"; this action is applied via use:enhance. In a SvelteKit app, pass superforms' or $app/forms' enhance."
    },
    {
      prop: 'headline',
      type: 'string',
      default: '—',
      desc: 'Optional headline text rendered as the Dialog.Title.'
    },
    {
      prop: 'supportingText',
      type: 'string',
      default: '—',
      desc: 'Optional descriptive body text rendered as the Dialog.Description.'
    },
    {
      prop: 'confirmText',
      type: 'string',
      default: '—',
      required: true,
      desc: 'Label for the confirm (submit) button.'
    },
    {
      prop: 'cancelText',
      type: 'string',
      default: "'Отмена'",
      desc: 'Label for the cancel button. Note the default is the Russian word for "Cancel" (this library\'s origin project is Russian-localized) — pass an explicit value for an English UI.'
    },
    {
      prop: 'confirmAction',
      type: 'string',
      default: '—',
      desc: 'Optional form action URL for the confirm button, passed to the underlying <form action>.'
    },
    {
      prop: 'loading',
      type: 'boolean',
      default: 'false',
      desc: 'Shows a loading state on the confirm button and disables it.'
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      desc: 'Disables the confirm button.'
    },
    {
      prop: 'delegateClose',
      type: 'boolean',
      default: 'false',
      desc: 'When true, the confirm button is NOT wrapped in Dialog.Close — the consumer is responsible for closing the dialog (e.g. from a superforms onResult callback), useful to keep it open on validation failure.'
    },
    {
      prop: 'portalDisabled',
      type: 'boolean',
      default: 'false',
      desc: 'Disables the Dialog.Portal — useful when the dialog is nested inside a form that already manages its own stacking.'
    },
    {
      prop: 'minWidth',
      type: 'string',
      default: "'280px'",
      desc: 'Minimum CSS width of the dialog surface.'
    },
    {
      prop: 'maxWidth',
      type: 'string',
      default: "'560px'",
      desc: 'Maximum CSS width of the dialog surface.'
    },
    {
      prop: 'children',
      type: 'Snippet',
      default: '—',
      desc: 'Optional additional content rendered between the supporting text and the action buttons, e.g. a form field.'
    },
    {
      prop: 'contentProps',
      type: 'Dialog.ContentProps',
      default: '—',
      desc: "Additional props forwarded to bits-ui's Dialog.Content."
    },
    {
      prop: 'formProps',
      type: 'Record<string, unknown>',
      default: '—',
      desc: 'Additional props spread onto the underlying <form> element.'
    },
    {
      prop: 'class',
      type: 'string',
      default: '—',
      desc: 'Additional CSS classes for the dialog surface.'
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'naming', label: 'Naming: Dialogue vs Dialog' },
    { id: 'import', label: 'Import' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'dialogue-props', label: 'Dialogue Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>Dialog — Ogonëk M3 Docs</title>
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
              <li class="text-md-sys-color-on-surface font-medium">Dialog</li>
            </ol>
          </nav>
          <span
            class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
            >Stable</span
          >
        </div>

        <Headline>Dialog</Headline>
        <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
          Dialogs provide important information or prompt users for a decision. They disable app
          functionality behind them until confirmed, dismissed, or a required action is taken.
        </Body>

        <div class="flex flex-wrap gap-2 pt-1">
          <a
            href="https://m3.material.io/components/dialogs/overview"
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
          The component implements the
          <a
            href="https://m3.material.io/components/dialogs/overview"
            target="_blank"
            rel="noopener noreferrer"
            class="text-md-sys-color-primary">Material Design 3 Dialog</a
          >
          pattern: a modal surface with an optional headline, supporting text, custom content, and a cancel/confirm
          button pair. The overlay and surface both animate in/out with the library's shared enter/exit
          transition.
        </Body>
      </section>

      <section id="naming" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Naming: Dialogue vs Dialog</Title>
        <Body>
          The exported component name is <code class="doc-code">Dialogue</code> — the British
          spelling — even though this docs page (and the underlying M3 concept) is called "Dialog."
          This is a naming quirk of the library, not a typo:
          <code class="doc-code">import {'{'} Dialog {'}'} from '@noxlovette/material'</code> will
          fail. Always import <code class="doc-code">Dialogue</code>.
        </Body>
        <Body class="text-md-sys-color-on-surface-variant text-sm">
          Internally the component composes bits-ui's own <code class="doc-code">Dialog</code>
          primitive (<code class="doc-code">Dialog.Root</code>,
          <code class="doc-code">Dialog.Content</code>, etc.) — that's a separate, unrelated import
          from the headless library, which is part of why the wrapper needed a different name.
        </Body>
      </section>

      <section id="import" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Import</Title>
        <CodeBlock lang="typescript" code={`import { Dialogue } from '@noxlovette/material';`} />
      </section>

      <section id="demo" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Live Demo</Title>
        <Body class="text-md-sys-color-on-surface-variant">
          See it live, with Controls, in Storybook rather than a hand-rolled preview here.
        </Body>

        <a
          href={storybookStoryUrl('containers-dialogue--playground')}
          target="_blank"
          rel="noopener noreferrer"
          class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90 sm:max-w-sm"
        >
          <Icon name="widgets" />
          <div>
            <p class="md-sys-typescale-title-small">Playground</p>
            <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
              >Open the Dialogue story, plus With Extra Content and Loading Confirm variants.</Body
            >
          </div>
        </a>
      </section>

      <section id="basic-usage" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Basic Usage</Title>
        <Body>
          <code class="doc-code">enhance</code> and <code class="doc-code">confirmText</code> are required
          — the confirm button is a real form submit button, not just a click handler:
        </Body>

        <CodeBlock
          code={`<script lang="ts">
  import { Dialogue } from '@noxlovette/material';
  import { enhance } from '$app/forms';

  let open = $state(false);
<\/script>

<button onclick={() => (open = true)}>Delete file</button>

<Dialogue
  bind:open
  {enhance}
  headline="Delete this file?"
  supportingText="This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
  confirmAction="?/deleteFile"
/>`}
        />
      </section>

      <section id="dialogue-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Dialogue Props</Title>
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
              {#each dialogueProps as row}
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
          <code class="doc-code">Dialogue</code> also accepts every other bits-ui
          <code class="doc-code">Dialog.RootProps</code>, spread onto the root.
        </Body>
      </section>

      <section id="accessibility" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Accessibility</Title>
        <div class="flex flex-col gap-3">
          {#each [{ icon: 'block', title: 'Focus trap', desc: 'Focus is trapped inside the dialog while open and returned to the trigger on close, via bits-ui Dialog.Root.' }, { icon: 'label', title: 'Labelling', desc: 'headline and supportingText render as Dialog.Title and Dialog.Description, wired to aria-labelledby/aria-describedby automatically.' }, { icon: 'keyboard', title: 'Escape to dismiss', desc: 'Pressing Escape closes the dialog by default, matching modal dialog expectations.' }] as item}
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
          href="/docs/card"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          <Icon name="arrow_back" size="sm" />
          Previous: Card
        </a>
        <a
          href="/docs/menu"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          Next: Menu
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
