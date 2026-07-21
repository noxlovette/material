<script lang="ts">
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
  import { Body, Title, Headline, Card, Divider, Icon, SupportingPane } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const buttonProps: PropRow[] = [
    {
      prop: 'children',
      type: 'Snippet',
      default: '—',
      required: true,
      desc: 'The label content rendered inside the button.'
    },
    {
      prop: 'variant',
      type: '"elevated" | "filled" | "tonal" | "outlined" | "text" | "bare"',
      default: '"filled"',
      desc: 'Visual emphasis: elevated/filled highest, tonal medium-high, outlined medium, text/bare lowest.'
    },
    {
      prop: 'color',
      type: '"default" | "primary" | "secondary" | "tertiary" | "error"',
      default: '"default"',
      desc: 'Color role. "default" resolves to the same styling as "primary".'
    },
    {
      prop: 'size',
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      default: '"md"',
      desc: 'Controls height, padding, and typescale.'
    },
    {
      prop: 'shape',
      type: '"round" | "square"',
      default: '"round"',
      desc: 'Fully rounded or slightly rounded corners.'
    },
    {
      prop: 'iconProps',
      type: 'IconProps',
      default: '—',
      desc: 'Optional leading icon, passed directly to the Icon component.'
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      desc: 'Disables the button.'
    },
    {
      prop: 'selected',
      type: 'boolean',
      default: 'false',
      desc: 'Marks the button as selected. Combine with usage="selection" (used internally by Toggle).'
    },
    {
      prop: 'usage',
      type: '"default" | "selection"',
      default: '"default"',
      desc: 'Set to "selection" to scope selected-state styling instead of variant/color styling.'
    },
    {
      prop: 'loading',
      type: 'boolean',
      default: 'false',
      desc: 'Shows a LoadingIndicator in place of the icon/label and disables interaction.'
    },
    {
      prop: 'href',
      type: 'string',
      default: '—',
      desc: 'Renders the button as an <a> instead of a <button>.'
    },
    {
      prop: 'formaction',
      type: 'string',
      default: '—',
      desc: 'The formaction attribute, for use as a form submit button.'
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'import', label: 'Import' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'button-props', label: 'Button Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>Button — Ogonëk M3 Docs</title>
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
                <a href="/docs" class="hover:text-md-sys-color-primary no-underline">Clickables</a>
              </li>
              <li class="mx-1 opacity-40">/</li>
              <li class="text-md-sys-color-on-surface font-medium">Button</li>
            </ol>
          </nav>
          <span
            class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
            >Stable</span
          >
        </div>

        <Headline>Button</Headline>
        <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
          Buttons help people take actions, such as sending an email, sharing a document, or liking
          a comment. Five variants cover the full emphasis range, from <code class="doc-code"
            >elevated</code
          >
          and <code class="doc-code">filled</code> down to <code class="doc-code">text</code>.
        </Body>

        <div class="flex flex-wrap gap-2 pt-1">
          <a
            href="https://m3.material.io/components/buttons/overview"
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
          The <code class="doc-code">Button</code> component implements the
          <a
            href="https://m3.material.io/components/buttons/overview"
            target="_blank"
            rel="noopener noreferrer"
            class="text-md-sys-color-primary">Material Design 3 Buttons</a
          >
          pattern: five emphasis levels (elevated, filled, tonal, outlined, text), each available in any
          color role, plus a chrome-less <code class="doc-code">bare</code> variant.
        </Body>
        <Body>
          Under the hood it renders Bits UI's <code class="doc-code">Button.Root</code>, wraps
          content with the shared <code class="doc-code">Layer</code> state-layer/ripple overlay,
          and supports a leading icon, a loading state, and rendering as an
          <code class="doc-code">&lt;a&gt;</code>
          via <code class="doc-code">href</code>.
        </Body>
      </section>

      <section id="import" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Import</Title>
        <CodeBlock lang="typescript" code={`import { Button } from '@noxlovette/material';`} />
      </section>

      <section id="demo" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Live Demo</Title>
        <Body class="text-md-sys-color-on-surface-variant">
          See it live, with Controls, in Storybook rather than a hand-rolled preview here.
        </Body>

        <div class="flex flex-col gap-3 sm:flex-row">
          <a
            href={storybookStoryUrl('buttons-button--playground')}
            target="_blank"
            rel="noopener noreferrer"
            class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90"
          >
            <Icon name="widgets" />
            <div>
              <p class="md-sys-typescale-title-small">Playground</p>
              <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
                >Variant, color, size, shape, disabled, and loading Controls.</Body
              >
            </div>
          </a>
          <a
            href={storybookStoryUrl('buttons-button--variants')}
            target="_blank"
            rel="noopener noreferrer"
            class="bg-md-sys-color-surface-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90"
          >
            <Icon name="widgets" />
            <div>
              <p class="md-sys-typescale-title-small">Variants</p>
              <Body class="text-md-sys-color-on-surface-variant text-sm"
                >All six variants side by side.</Body
              >
            </div>
          </a>
        </div>
      </section>

      <section id="basic-usage" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Basic Usage</Title>
        <Body>
          Pick a variant matching the action's emphasis, and a color role matching its concept:
        </Body>

        <CodeBlock
          code={`<script lang="ts">
  import { Button } from '@noxlovette/material';
<\/script>

<Button variant="filled" color="primary" iconProps={{ name: 'send' }}>
  Send
</Button>

<Button variant="outlined" color="primary">Cancel</Button>`}
        />
      </section>

      <section id="button-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Button Props</Title>
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
              {#each buttonProps as row}
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
          {#each [{ icon: 'touch_app', title: 'Native semantics', desc: "Renders Bits UI's Button.Root as a native <button> (or <a> when href is set), giving default keyboard activation and role support." }, { icon: 'block', title: 'Disabled state', desc: 'disabled removes the button from the tab order and exposes the disabled attribute to assistive tech.' }, { icon: 'hourglass_top', title: 'Loading state', desc: "loading swaps the content for a LoadingIndicator while keeping the button's footprint stable." }] as item}
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
          href="/docs/appbar"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          <Icon name="arrow_back" size="sm" />
          Previous: App Bar
        </a>
        <a
          href="/docs/button-icon"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          Next: Button Icon
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
