<script lang="ts">
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
  import { Body, Title, Headline, Card, Divider, Icon, SupportingPane } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const textfieldProps: PropRow[] = [
    {
      prop: 'value',
      type: 'string | number | null | DateValue',
      default: '—',
      desc: 'The current value of the text field. Bindable.'
    },
    {
      prop: 'label',
      type: 'string',
      default: '—',
      required: true,
      desc: 'The floating label text for the input.'
    },
    {
      prop: 'id',
      type: 'string',
      default: 'auto-generated',
      desc: 'The id for the input element. Auto-generated via useId() but can be replaced.'
    },
    {
      prop: 'placeholder',
      type: "''",
      default: "''",
      desc: 'Not used in M3 — the floating label replaces the placeholder pattern.'
    },
    {
      prop: 'elementRef',
      type: 'HTMLInputElement',
      default: '—',
      desc: 'Reference to the underlying HTML input element.'
    },
    {
      prop: 'supportingText',
      type: 'Snippet',
      default: '—',
      desc: 'Helper text displayed below the input.'
    },
    {
      prop: 'leadingIconProps',
      type: 'IconProps',
      default: '—',
      desc: 'Props for an optional leading icon.'
    },
    {
      prop: 'trailingIconProps',
      type: 'IconProps',
      default: '—',
      desc: 'Props for an optional trailing icon, rendered as a ButtonIcon.'
    },
    {
      prop: 'trailingIcon',
      type: 'Snippet',
      default: '—',
      desc: 'Overrides the default trailing icon button with custom content.'
    },
    {
      prop: 'characterLimit',
      type: 'number',
      default: '—',
      desc: 'Maximum character count, shown as a counter next to the supporting text.'
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      desc: 'Disables the field.'
    },
    {
      prop: 'error',
      type: 'boolean',
      default: 'false',
      desc: 'Renders the field in an error state (sets aria-invalid).'
    },
    {
      prop: 'required',
      type: 'boolean',
      default: 'false',
      desc: 'Marks the field as required and shows a trailing asterisk on the label.'
    },
    {
      prop: 'trailingOnClick',
      type: '() => void',
      default: '—',
      desc: 'Click handler for the default trailing icon button.'
    },
    {
      prop: 'inputChild',
      type: 'Snippet<[{ props }]>',
      default: '—',
      desc: 'Overrides the default <input> element entirely, e.g. to render a masked or date input.'
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'import', label: 'Import' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'textfield-props', label: 'Textfield Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>Textfield — Ogonëk M3 Docs</title>
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
                <a href="/docs" class="hover:text-md-sys-color-primary no-underline">Inputs</a>
              </li>
              <li class="mx-1 opacity-40">/</li>
              <li class="text-md-sys-color-on-surface font-medium">Textfield</li>
            </ol>
          </nav>
          <span
            class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
            >Stable</span
          >
        </div>

        <Headline>Text Field</Headline>
        <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
          Text fields let users enter and edit text. This component implements M3's filled text
          field: a floating <code class="doc-code">label</code>, an animated focus/active indicator,
          and optional leading/trailing icons and supporting text.
        </Body>

        <div class="flex flex-wrap gap-2 pt-1">
          <a
            href="https://m3.material.io/components/text-fields/overview"
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
          The <code class="doc-code">Textfield</code> component implements the
          <a
            href="https://m3.material.io/components/text-fields/overview"
            target="_blank"
            rel="noopener noreferrer"
            class="text-md-sys-color-primary">Material Design 3 Text Field</a
          >
          pattern. The <code class="doc-code">label</code> starts centered inside the field and floats
          up when the field is focused or has a value.
        </Body>
        <Body>
          Use <code class="doc-code">leadingIconProps</code>/<code class="doc-code"
            >trailingIconProps</code
          >
          for icon affordances (e.g. a clear button), and
          <code class="doc-code">supportingText</code> for helper or validation copy below the field.
        </Body>
      </section>

      <section id="import" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Import</Title>
        <CodeBlock lang="typescript" code={`import { Textfield } from '@noxlovette/material';`} />
      </section>

      <section id="demo" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Live Demo</Title>
        <Body class="text-md-sys-color-on-surface-variant">
          See it live, with Controls, in Storybook rather than a hand-rolled preview here.
        </Body>

        <a
          href={storybookStoryUrl('forms-textfield--playground')}
          target="_blank"
          rel="noopener noreferrer"
          class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90 sm:max-w-sm"
        >
          <Icon name="widgets" />
          <div>
            <p class="md-sys-typescale-title-small">Playground</p>
            <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
              >Open the Textfield story with full Controls for label, state, and character limit.</Body
            >
          </div>
        </a>
      </section>

      <section id="basic-usage" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Basic Usage</Title>
        <Body>Bind <code class="doc-code">value</code> to read and set the field's contents:</Body>

        <CodeBlock
          code={`<script lang="ts">
  import { Textfield } from '@noxlovette/material';

  let email = $state('');
<\/script>

<Textfield label="Email" bind:value={email} required>
  {#snippet supportingText()}
    We'll never share your email.
  {/snippet}
</Textfield>`}
        />
      </section>

      <section id="textfield-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Textfield Props</Title>
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
              {#each textfieldProps as row}
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
          Additional native <code class="doc-code">&lt;input&gt;</code> attributes (e.g.
          <code class="doc-code">type</code>, <code class="doc-code">maxlength</code>,
          <code class="doc-code">autocomplete</code>) pass through via
          <code class="doc-code">...restProps</code>.
        </Body>
      </section>

      <section id="accessibility" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Accessibility</Title>
        <div class="flex flex-col gap-3">
          {#each [{ icon: 'error', title: 'Invalid state', desc: 'error sets aria-invalid on the input so assistive tech announces the validation state.' }, { icon: 'asterisk', title: 'Required fields', desc: 'required sets aria-required and required on the input, and shows a visual asterisk on the label.' }, { icon: 'label', title: 'Label association', desc: 'The floating label uses a for/id pairing (auto-generated via useId when not provided) instead of aria-label.' }] as item}
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
          href="/docs/pill"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          <Icon name="arrow_back" size="sm" />
          Previous: Pill
        </a>
        <a
          href="/docs/checkbox"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          Next: Checkbox
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
