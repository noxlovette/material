<script lang="ts">
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
  import { Body, Title, Headline, Card, Divider, Icon, SupportingPane } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const snackbarProps: PropRow[] = [
    {
      prop: 'message',
      type: 'string | Snippet',
      default: "''",
      desc: 'Bindable. Assign a string (or Snippet) to show the snackbar; assigning an empty string hides it. This is the trigger — there is no separate open/show prop.'
    },
    {
      prop: 'label',
      type: 'string',
      default: '—',
      desc: 'Label for an optional action button (e.g. "Undo"), rendered next to the close button.'
    },
    {
      prop: 'callback',
      type: '() => void',
      default: '—',
      desc: 'Click handler for the action button.'
    },
    {
      prop: 'showClose',
      type: 'boolean',
      default: 'true',
      desc: 'Whether to render a dismiss (X) icon button.'
    },
    {
      prop: 'static',
      type: 'boolean',
      default: 'false',
      desc: 'When true, the snackbar stays until manually dismissed instead of auto-hiding after 4 seconds.'
    },
    {
      prop: 'fixed',
      type: 'boolean',
      default: 'true',
      desc: 'When true, positions the snackbar fixed to the bottom-center of the viewport. Set false to let it flow inline within its container instead.'
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'import', label: 'Import' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'snackbar-props', label: 'Snackbar Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>Snackbar — Ogonëk M3 Docs</title>
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
                <a href="/docs" class="hover:text-md-sys-color-primary no-underline">Feedback</a>
              </li>
              <li class="mx-1 opacity-40">/</li>
              <li class="text-md-sys-color-on-surface font-medium">Snackbar</li>
            </ol>
          </nav>
          <span
            class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
            >Stable</span
          >
        </div>

        <Headline>Snackbar</Headline>
        <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
          Snackbars show a brief, low-emphasis message about an app process at the bottom of the
          screen. Unlike a typical toast library, <code class="doc-code">Snackbar</code> is not an
          imperative <code class="doc-code">toast()</code> function — it's a component you mount
          once (usually near the root of a page) with a
          <code class="doc-code">bind:message</code> prop, then trigger by assigning a string to that
          bound variable from anywhere in your app.
        </Body>

        <div class="flex flex-wrap gap-2 pt-1">
          <a
            href="https://m3.material.io/components/snackbar/overview"
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
          <code class="doc-code">Snackbar</code> implements the
          <a
            href="https://m3.material.io/components/snackbar/overview"
            target="_blank"
            rel="noopener noreferrer"
            class="text-md-sys-color-primary">Material Design 3 Snackbar</a
          >
          pattern. It watches its bindable <code class="doc-code">message</code> prop: when it
          becomes a non-empty string (or a Snippet), the snackbar slides in from the bottom; after 4
          seconds it auto-dismisses and clears <code class="doc-code">message</code> back to an
          empty string (unless <code class="doc-code">static</code> is set, in which case it waits for
          the user to click the close button).
        </Body>
        <Body>
          There is no dedicated show/open prop or store-based queue — mount one
          <code class="doc-code">Snackbar</code> per region of your UI and drive it entirely through the
          message you bind to it.
        </Body>
      </section>

      <section id="import" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Import</Title>
        <CodeBlock lang="typescript" code={`import { Snackbar } from '@noxlovette/material';`} />
      </section>

      <section id="demo" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Live Demo</Title>
        <Body class="text-md-sys-color-on-surface-variant">
          See it live, with Controls, in Storybook rather than a hand-rolled preview here.
        </Body>

        <a
          href={storybookStoryUrl('feedback-snackbar--playground')}
          target="_blank"
          rel="noopener noreferrer"
          class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90 sm:max-w-sm"
        >
          <Icon name="widgets" />
          <div>
            <p class="md-sys-typescale-title-small">Playground</p>
            <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
              >Toggle label, showClose, and static via Controls; also see the "Triggered" story for
              the click-to-show pattern.</Body
            >
          </div>
        </a>
      </section>

      <section id="basic-usage" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Basic Usage</Title>
        <Body>
          Mount <code class="doc-code">Snackbar</code> once, keep a piece of state for its message, and
          assign to that state to trigger it:
        </Body>

        <CodeBlock
          code={`<script lang="ts">
  import { Snackbar } from '@noxlovette/material';

  let snackbarMessage = $state('');
<\/script>

<button onclick={() => (snackbarMessage = 'Changes saved.')}>
  Save
</button>

<Snackbar bind:message={snackbarMessage} label="Undo" callback={undoSave} />`}
        />
      </section>

      <section id="snackbar-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Snackbar Props</Title>
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
              {#each snackbarProps as row}
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
          {#each [{ icon: 'timer', title: 'Auto-dismiss timing', desc: 'Non-static snackbars dismiss after 4 seconds — avoid the sole source of critical information here since it disappears on its own.' }, { icon: 'touch_app', title: 'Dismiss control', desc: 'showClose renders an explicit close button with aria-label="Dismiss snackbar", so users are never forced to wait out the timer.' }, { icon: 'priority_high', title: 'One at a time', desc: 'Only mount one Snackbar per region and drive it through a single message binding — stacking multiple instances is not a supported pattern.' }] as item}
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
          href="/docs/side-sheet"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          <Icon name="arrow_back" size="sm" />
          Previous: Side Sheet
        </a>
        <a
          href="/docs/badge"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          Next: Badge
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
