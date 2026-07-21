<script lang="ts">
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
  import { Body, Title, Headline, Card, Divider, Icon, SupportingPane } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const buttonIconProps: PropRow[] = [
    {
      prop: 'iconProps',
      type: 'IconProps',
      default: '—',
      required: true,
      desc: 'Passed directly to the Icon component.'
    },
    {
      prop: 'variant',
      type: '"elevated" | "filled" | "tonal" | "outlined" | "text" | "bare"',
      default: '"text"',
      desc: 'Visual emphasis. "text" (the standard icon button) is the default and lowest emphasis.'
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
      desc: 'Controls height, padding, and icon size.'
    },
    {
      prop: 'width',
      type: '"default" | "narrow" | "wide"',
      default: '"default"',
      desc: '"default" keeps the button square (aspect-square); narrow/wide adjust the horizontal footprint.'
    },
    {
      prop: 'shape',
      type: '"round" | "square"',
      default: '"round"',
      desc: 'Fully rounded or slightly rounded corners.'
    },
    {
      prop: 'variation',
      type: '"default" | "toggle"',
      default: '"default"',
      desc: '"toggle" renders a Bits UI Toggle.Root with a pressed/unpressed visual state instead of a plain button.'
    },
    {
      prop: 'pressed',
      type: 'boolean',
      default: 'false',
      desc: 'Only meaningful when variation="toggle". Bindable pressed state.'
    },
    {
      prop: 'onPressedChange',
      type: '(pressed: boolean) => void',
      default: '—',
      desc: 'Only meaningful when variation="toggle". Fires when the pressed state changes.'
    },
    {
      prop: 'tooltipContent',
      type: 'string',
      default: '—',
      desc: 'Text shown in a tooltip on hover. Icon buttons have no visible label, so this is the primary way to convey the action.'
    },
    {
      prop: 'triggerSide',
      type: '"top" | "right" | "bottom" | "left"',
      default: '"top"',
      desc: 'Side of the tooltip relative to the button.'
    },
    {
      prop: 'triggerAlign',
      type: '"start" | "center" | "end"',
      default: '"center"',
      desc: 'Alignment of the tooltip relative to the button.'
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      desc: 'Disables the button.'
    },
    {
      prop: 'loading',
      type: 'boolean',
      default: 'false',
      desc: 'Shows a LoadingIndicator in place of the icon.'
    },
    {
      prop: 'href',
      type: 'string',
      default: '—',
      desc: 'Renders the button as an <a> instead of a <button>.'
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'import', label: 'Import' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'buttonicon-props', label: 'ButtonIcon Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>Button Icon — Ogonëk M3 Docs</title>
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
              <li class="text-md-sys-color-on-surface font-medium">Button Icon</li>
            </ol>
          </nav>
          <span
            class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
            >Stable</span
          >
        </div>

        <Headline>Icon Button</Headline>
        <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
          Icon buttons help people take minor actions, often used in app bars and toolbars where
          space is tight. <code class="doc-code">ButtonIcon</code> shares the same emphasis levels
          as
          <code class="doc-code">Button</code>, and can optionally act as a toggle with a pressed
          state.
        </Body>

        <div class="flex flex-wrap gap-2 pt-1">
          <a
            href="https://m3.material.io/components/icon-buttons/overview"
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
          The <code class="doc-code">ButtonIcon</code> component implements the
          <a
            href="https://m3.material.io/components/icon-buttons/overview"
            target="_blank"
            rel="noopener noreferrer"
            class="text-md-sys-color-primary">Material Design 3 Icon Buttons</a
          >
          pattern: standard, filled, tonal, and outlined emphasis levels, all icon-only.
        </Body>
        <Body>
          Because there's no visible label, always pass <code class="doc-code">tooltipContent</code>
          — it's wrapped in a <code class="doc-code">Tooltip</code> internally, giving both a visual
          hint on hover and a text alternative for assistive tech. Set
          <code class="doc-code">variation="toggle"</code> for a two-state icon button (e.g.
          bookmark, mute) — it swaps the underlying element for Bits UI's
          <code class="doc-code">Toggle.Root</code>.
        </Body>
      </section>

      <section id="import" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Import</Title>
        <CodeBlock lang="typescript" code={`import { ButtonIcon } from '@noxlovette/material';`} />
      </section>

      <section id="demo" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Live Demo</Title>
        <Body class="text-md-sys-color-on-surface-variant">
          See it live, with Controls, in Storybook rather than a hand-rolled preview here.
        </Body>

        <div class="flex flex-col gap-3 sm:flex-row">
          <a
            href={storybookStoryUrl('buttons-button-icon--playground')}
            target="_blank"
            rel="noopener noreferrer"
            class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90"
          >
            <Icon name="widgets" />
            <div>
              <p class="md-sys-typescale-title-small">Playground</p>
              <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
                >Variant, color, size, width, and variation Controls.</Body
              >
            </div>
          </a>
          <a
            href={storybookStoryUrl('buttons-button-icon--toggle')}
            target="_blank"
            rel="noopener noreferrer"
            class="bg-md-sys-color-surface-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90"
          >
            <Icon name="widgets" />
            <div>
              <p class="md-sys-typescale-title-small">Toggle</p>
              <Body class="text-md-sys-color-on-surface-variant text-sm"
                >A two-state toggle icon button.</Body
              >
            </div>
          </a>
        </div>
      </section>

      <section id="basic-usage" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Basic Usage</Title>
        <Body>Always pair the icon with tooltip text to describe the action:</Body>

        <CodeBlock
          code={`<script lang="ts">
  import { ButtonIcon } from '@noxlovette/material';
<\/script>

<ButtonIcon
  variant="tonal"
  iconProps={{ name: 'search' }}
  tooltipContent="Search"
/>

<!-- Toggle variation -->
<ButtonIcon
  variation="toggle"
  iconProps={{ name: 'bookmark' }}
  tooltipContent="Save"
/>`}
        />
      </section>

      <section id="buttonicon-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>ButtonIcon Props</Title>
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
              {#each buttonIconProps as row}
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
          {#each [{ icon: 'label', title: 'Accessible name', desc: 'tooltipContent doubles as the only visible/announced description of the action — always provide it since there is no text label.' }, { icon: 'toggle_on', title: 'Toggle semantics', desc: 'variation="toggle" uses Bits UI\'s Toggle.Root, which exposes aria-pressed for the pressed/unpressed state.' }, { icon: 'block', title: 'Disabled state', desc: 'disabled removes the button from the tab order and exposes the disabled attribute to assistive tech.' }] as item}
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
          href="/docs/button"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          <Icon name="arrow_back" size="sm" />
          Previous: Button
        </a>
        <a
          href="/docs/fab"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          Next: FAB
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
