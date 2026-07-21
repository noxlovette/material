<script lang="ts">
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
  import { Body, Title, Headline, Card, Divider, Icon, SupportingPane } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const toggleProps: PropRow[] = [
    {
      prop: 'pressed',
      type: 'boolean',
      default: 'false',
      desc: 'Whether the toggle is currently pressed/selected. Bindable.'
    },
    {
      prop: 'onPressedChange',
      type: '(pressed: boolean) => void',
      default: '—',
      desc: 'Callback fired when the pressed state changes.'
    },
    {
      prop: 'children',
      type: 'Snippet',
      default: '—',
      desc: 'Label content inside the toggle.'
    },
    {
      prop: 'iconProps',
      type: 'IconProps',
      default: '—',
      desc: 'Optional leading icon.'
    },
    {
      prop: 'size',
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      default: '"md"',
      desc: 'Controls height, padding, and typescale (shared with Button).'
    },
    {
      prop: 'shape',
      type: '"round" | "square"',
      default: '"round"',
      desc: 'Fully rounded or slightly rounded corners.'
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      desc: 'Disables the toggle.'
    },
    {
      prop: 'loading',
      type: 'boolean',
      default: 'false',
      desc: 'Shows a LoadingIndicator in place of the icon/label.'
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'import', label: 'Import' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'toggle-props', label: 'Toggle Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>Toggle — Ogonëk M3 Docs</title>
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
              <li class="text-md-sys-color-on-surface font-medium">Toggle</li>
            </ol>
          </nav>
          <span
            class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
            >Stable</span
          >
        </div>

        <Headline>Toggle</Headline>
        <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
          A single stateful button that switches between pressed and unpressed states — for
          standalone options like "show password" or a bold/italic formatting toggle, as opposed to
          a mutually-exclusive group.
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
          Material 3 doesn't define a standalone "toggle button" component page — the selected/
          pressed button state it covers is described as part of the
          <a
            href="https://m3.material.io/components/buttons/overview"
            target="_blank"
            rel="noopener noreferrer"
            class="text-md-sys-color-primary">Buttons</a
          >
          spec. Accordingly, <code class="doc-code">Toggle</code> reuses Button's own theme under
          <code class="doc-code">usage: 'selection'</code>, giving it the same sizing and shape
          scale as <code class="doc-code">Button</code>, but with a binary pressed/unpressed visual
          state instead of variant/color styling.
        </Body>
        <Body>
          It's not restricted to icon-only content like an icon toggle button, and it doesn't
          coordinate selection across a group like <code class="doc-code">ButtonGroup</code> or a
          segmented-button row — it's a single independent on/off control. Under the hood it renders
          Bits UI's <code class="doc-code">Toggle.Root</code>.
        </Body>
      </section>

      <section id="import" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Import</Title>
        <CodeBlock lang="typescript" code={`import { Toggle } from '@noxlovette/material';`} />
      </section>

      <section id="demo" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Live Demo</Title>
        <Body class="text-md-sys-color-on-surface-variant">
          See it live, with Controls, in Storybook rather than a hand-rolled preview here.
        </Body>

        <div class="flex flex-col gap-3 sm:flex-row">
          <a
            href={storybookStoryUrl('buttons-toggle--playground')}
            target="_blank"
            rel="noopener noreferrer"
            class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90"
          >
            <Icon name="widgets" />
            <div>
              <p class="md-sys-typescale-title-small">Playground</p>
              <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
                >Size, shape, pressed, disabled, and loading Controls.</Body
              >
            </div>
          </a>
          <a
            href={storybookStoryUrl('buttons-toggle--with-icon')}
            target="_blank"
            rel="noopener noreferrer"
            class="bg-md-sys-color-surface-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90"
          >
            <Icon name="widgets" />
            <div>
              <p class="md-sys-typescale-title-small">With Icon</p>
              <Body class="text-md-sys-color-on-surface-variant text-sm"
                >Toggles combining an icon and a label.</Body
              >
            </div>
          </a>
        </div>
      </section>

      <section id="basic-usage" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Basic Usage</Title>
        <Body><code class="doc-code">pressed</code> is bindable:</Body>

        <CodeBlock
          code={`<script lang="ts">
  import { Toggle } from '@noxlovette/material';

  let bold = $state(false);
<\/script>

<Toggle bind:pressed={bold} iconProps={{ name: 'format_bold' }}>
  Bold
</Toggle>`}
        />
      </section>

      <section id="toggle-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Toggle Props</Title>
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
              {#each toggleProps as row}
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
          {#each [{ icon: 'toggle_on', title: 'Pressed state', desc: "Bits UI's Toggle.Root exposes aria-pressed, so assistive tech announces the on/off state directly." }, { icon: 'label', title: 'Icon-only toggles', desc: 'If used with iconProps and no children, give the icon an unambiguous meaning or add a visually-hidden label — there is no built-in tooltip like ButtonIcon.' }, { icon: 'block', title: 'Disabled state', desc: 'disabled removes the toggle from the tab order and exposes the disabled attribute to assistive tech.' }] as item}
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
          href="/docs/fab"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          <Icon name="arrow_back" size="sm" />
          Previous: FAB
        </a>
        <a
          href="/docs/pill"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          Next: Pill
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
