<script lang="ts">
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
  import { Body, Title, Headline, Card, Divider, Icon, SupportingPane } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const circularProps: PropRow[] = [
    {
      prop: 'percent',
      type: 'number | null',
      default: '—',
      desc: 'Completion percentage (0–100). Omit, or pass null, for an indeterminate spinner.'
    },
    {
      prop: 'size',
      type: 'number',
      default: '48',
      desc: 'Diameter of the indicator in pixels.'
    },
    {
      prop: 'thickness',
      type: 'number',
      default: '4',
      desc: 'Stroke thickness in pixels.'
    }
  ];

  const linearProps: PropRow[] = [
    {
      prop: 'percent',
      type: 'number | null',
      default: '—',
      desc: 'Completion percentage (0–100). Omit, or pass null, for an indeterminate bar.'
    },
    {
      prop: 'height',
      type: 'number',
      default: '4',
      desc: 'Height of the bar in pixels.'
    },
    {
      prop: 'class',
      type: 'string',
      default: '—',
      desc: 'Additional classes merged onto the track container — use this to set a width (e.g. w-full).'
    }
  ];

  const wavyProps: PropRow[] = [
    {
      prop: 'percent',
      type: 'number | null',
      default: '—',
      desc: 'Completion percentage (0–100). Omit, or pass null, for an indeterminate line.'
    },
    {
      prop: 'width',
      type: 'number',
      default: '600',
      desc: "Width of the SVG's viewBox."
    },
    {
      prop: 'height',
      type: 'number',
      default: '10',
      desc: "Height of the SVG's viewBox."
    },
    {
      prop: 'thickness',
      type: 'number',
      default: '4',
      desc: 'Stroke thickness of the wave/track lines.'
    },
    {
      prop: 'class',
      type: 'string',
      default: '—',
      desc: 'Additional classes applied to the SVG element — use this to set a rendered width.'
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'import', label: 'Import' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'circular-props', label: 'CircularProgress Props' },
    { id: 'linear-props', label: 'LinearProgress Props' },
    { id: 'wavy-props', label: 'WavyLinearProgress Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>Progress — Ogonëk M3 Docs</title>
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
              <li class="text-md-sys-color-on-surface font-medium">Progress</li>
            </ol>
          </nav>
          <span
            class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
            >Stable</span
          >
        </div>

        <Headline>Progress Indicators</Headline>
        <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
          Three separate components live under this one docs entry —
          <code class="doc-code">CircularProgress</code>,
          <code class="doc-code">LinearProgress</code>, and
          <code class="doc-code">WavyLinearProgress</code> (a custom, M3-inspired wavy variant). Each
          has its own prop set — they are not interchangeable via a shared "variant" prop — so pick the
          component that matches the shape you need.
        </Body>

        <div class="flex flex-wrap gap-2 pt-1">
          <a
            href="https://m3.material.io/components/progress-indicators/overview"
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
          All three components are built on bits-ui's <code class="doc-code">Progress.Root</code>
          for the underlying ARIA semantics, and share the same determinate/indeterminate
          convention: pass a <code class="doc-code">percent</code> between 0–100 for a determinate
          indicator, or omit it (or pass <code class="doc-code">null</code>) for an indeterminate
          one.
        </Body>
        <Body>
          <code class="doc-code">CircularProgress</code> and
          <code class="doc-code">LinearProgress</code>
          map directly to M3's
          <a
            href="https://m3.material.io/components/progress-indicators/overview"
            target="_blank"
            rel="noopener noreferrer"
            class="text-md-sys-color-primary">circular and linear progress indicators</a
          >. <code class="doc-code">WavyLinearProgress</code> is this library's own extra variant —
          a sine-wave linear indicator inspired by, but not a literal reproduction of, M3's spec; it
          renders raw SVG with the wave path computed by an internal
          <code class="doc-code">_wavy.ts</code> helper module (not part of the public API).
        </Body>
      </section>

      <section id="import" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Import</Title>
        <CodeBlock
          lang="typescript"
          code={`import { CircularProgress, LinearProgress, WavyLinearProgress } from '@noxlovette/material';`}
        />
      </section>

      <section id="demo" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Live Demo</Title>
        <Body class="text-md-sys-color-on-surface-variant">
          See all three live, with Controls, in Storybook rather than a hand-rolled preview here.
        </Body>

        <a
          href={storybookStoryUrl('feedback-progress--circular-determinate')}
          target="_blank"
          rel="noopener noreferrer"
          class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90 sm:max-w-sm"
        >
          <Icon name="widgets" />
          <div>
            <p class="md-sys-typescale-title-small">Playground</p>
            <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
              >Determinate and indeterminate stories for Circular, Linear, and Wavy.</Body
            >
          </div>
        </a>
      </section>

      <section id="basic-usage" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Basic Usage</Title>

        <CodeBlock
          code={`<script lang="ts">
  import { CircularProgress, LinearProgress, WavyLinearProgress } from '@noxlovette/material';

  let uploadPercent = $state(40);
<\/script>

<!-- Determinate -->
<CircularProgress percent={uploadPercent} />
<LinearProgress percent={uploadPercent} class="w-full" />
<WavyLinearProgress percent={uploadPercent} class="w-full" />

<!-- Indeterminate: omit percent -->
<CircularProgress />
<LinearProgress class="w-full" />
<WavyLinearProgress class="w-full" />`}
        />
      </section>

      <section id="circular-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>CircularProgress Props</Title>
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
              {#each circularProps as row}
                <tr
                  class="even:bg-md-sys-color-surface-container/30 border-md-sys-color-outline-variant/50 border-b last:border-b-0"
                >
                  <td class="p-3">
                    <code class="text-md-sys-color-primary font-mono text-xs font-semibold"
                      >{row.prop}</code
                    >
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

      <section id="linear-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>LinearProgress Props</Title>
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
              {#each linearProps as row}
                <tr
                  class="even:bg-md-sys-color-surface-container/30 border-md-sys-color-outline-variant/50 border-b last:border-b-0"
                >
                  <td class="p-3">
                    <code class="text-md-sys-color-primary font-mono text-xs font-semibold"
                      >{row.prop}</code
                    >
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

      <section id="wavy-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>WavyLinearProgress Props</Title>
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
              {#each wavyProps as row}
                <tr
                  class="even:bg-md-sys-color-surface-container/30 border-md-sys-color-outline-variant/50 border-b last:border-b-0"
                >
                  <td class="p-3">
                    <code class="text-md-sys-color-primary font-mono text-xs font-semibold"
                      >{row.prop}</code
                    >
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
          {#each [{ icon: 'accessibility_new', title: 'ARIA semantics via bits-ui', desc: 'Progress.Root supplies role="progressbar" with aria-valuenow/aria-valuemin/aria-valuemax wired to percent, and omits aria-valuenow automatically for indeterminate state.' }, { icon: 'hourglass_empty', title: 'Indeterminate still needs a label', desc: 'None of the three components render visible or accessible text describing what is loading — pair them with your own aria-label or adjacent text for screen reader users.' }, { icon: 'motion_photos_pause', title: 'Motion sensitivity', desc: 'WavyLinearProgress and indeterminate states rely on continuous animation; consider respecting prefers-reduced-motion in contexts where that matters.' }] as item}
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
          href="/docs/badge"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          <Icon name="arrow_back" size="sm" />
          Previous: Badge
        </a>
        <a
          href="/docs/display"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          Next: Display
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
