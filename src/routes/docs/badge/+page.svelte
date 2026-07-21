<script lang="ts">
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
  import { Body, Title, Headline, Card, Divider, Icon, SupportingPane } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import TableOfContents from '../../TableOfContents.svelte';
  import { storybookStoryUrl } from '../../storybook.js';

  type PropRow = { prop: string; type: string; default: string; required?: boolean; desc: string };

  const badgeProps: PropRow[] = [
    {
      prop: 'size',
      type: `'sm' | 'lg'`,
      default: `'lg'`,
      desc: '"sm" renders a small dot indicator with no number; "lg" renders a pill sized to fit a number.'
    },
    {
      prop: 'number',
      type: 'number',
      default: '—',
      desc: 'The count to display. Ignored when size is "sm". Values over 99 render as "99+".'
    }
  ];

  const toc = [
    { id: 'overview', label: 'Overview' },
    { id: 'import', label: 'Import' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'badge-props', label: 'Badge Props' },
    { id: 'accessibility', label: 'Accessibility' }
  ];
</script>

<svelte:head>
  <title>Badge — Ogonëk M3 Docs</title>
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
              <li class="text-md-sys-color-on-surface font-medium">Badge</li>
            </ol>
          </nav>
          <span
            class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container rounded-full px-2 py-0.5 text-xs font-medium"
            >Stable</span
          >
        </div>

        <Headline>Badge</Headline>
        <Body class="text-md-sys-color-on-surface-variant max-w-2xl">
          Badges communicate a notification count or unread status on top of another element. <code
            class="doc-code">Badge</code
          >
          renders <code class="doc-code">position: absolute</code>, so it is an overlay primitive —
          it always needs a positioned (<code class="doc-code">relative</code>) ancestor to anchor
          against, it never lays out inline on its own.
        </Body>

        <div class="flex flex-wrap gap-2 pt-1">
          <a
            href="https://m3.material.io/components/badges/overview"
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
          <code class="doc-code">Badge</code> implements the
          <a
            href="https://m3.material.io/components/badges/overview"
            target="_blank"
            rel="noopener noreferrer"
            class="text-md-sys-color-primary">Material Design 3 Badge</a
          >
          pattern: a small dot (<code class="doc-code">size="sm"</code>) for a general notification,
          or a numbered pill (<code class="doc-code">size="lg"</code>) for a specific count.
        </Body>
        <Body>
          You'll most often use it indirectly:
          <code class="doc-code">NavbarItem</code> and <code class="doc-code">RailItem</code> both
          accept a <code class="doc-code">badge</code> prop (a number, or
          <code class="doc-code">-1</code>
          for the dot variant) and render a <code class="doc-code">Badge</code> internally, already
          positioned over their icon. Reach for <code class="doc-code">Badge</code> directly only
          when overlaying a count on something those components don't cover — e.g. a custom icon
          button — in which case wrap the anchor in a <code class="doc-code">relative</code> container
          yourself, as shown below.
        </Body>
      </section>

      <section id="import" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Import</Title>
        <CodeBlock lang="typescript" code={`import { Badge } from '@noxlovette/material';`} />
      </section>

      <section id="demo" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Live Demo</Title>
        <Body class="text-md-sys-color-on-surface-variant">
          See it live, with Controls, in Storybook rather than a hand-rolled preview here.
        </Body>

        <a
          href={storybookStoryUrl('feedback-badge--playground')}
          target="_blank"
          rel="noopener noreferrer"
          class="bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container flex items-center gap-2 rounded-2xl p-4 no-underline transition-opacity hover:opacity-90 sm:max-w-sm"
        >
          <Icon name="widgets" />
          <div>
            <p class="md-sys-typescale-title-small">Playground</p>
            <Body class="text-md-sys-color-on-secondary-container/80 text-sm"
              >Control over size and number, overlaid on an icon.</Body
            >
          </div>
        </a>
      </section>

      <section id="basic-usage" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Basic Usage</Title>
        <Body>
          Wrap the anchor element in a <code class="doc-code">relative</code> container so the badge's
          absolute positioning resolves against it:
        </Body>

        <CodeBlock
          code={`<script lang="ts">
  import { Badge, Icon } from '@noxlovette/material';
<\/script>

<div class="relative inline-flex size-10 items-center justify-center">
  <Icon name="mail" />
  <Badge size="lg" number={5} />
</div>`}
        />

        <Body>Or, more commonly, let a navigation item do this for you:</Body>

        <CodeBlock
          code={`<NavbarItem label="Inbox" href="/inbox" iconProps={{ name: 'mail' }} badge={5} />
<NavbarItem label="Chat"  href="/chat"  iconProps={{ name: 'chat' }} badge={-1} />`}
        />
      </section>

      <section id="badge-props" class="mb-12 flex flex-col gap-4 scroll-mt-6">
        <Title>Badge Props</Title>
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
              {#each badgeProps as row}
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
          {#each [{ icon: 'visibility_off', title: 'Not independently announced', desc: "Badge renders a plain <div> with no ARIA role or live-region behaviour. If the count is important to announce, expose it via the anchor element's own accessible name or an aria-live region." }, { icon: 'contrast', title: 'Color contrast', desc: 'Uses the error/on-error color pair by default, which meets AA contrast against the badge background regardless of theme.' }, { icon: 'crop_free', title: 'Positioning context', desc: 'Because it is position: absolute, always verify its relative ancestor has no overflow: hidden clipping it at small viewport sizes.' }] as item}
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
          href="/docs/snackbar"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          <Icon name="arrow_back" size="sm" />
          Previous: Snackbar
        </a>
        <a
          href="/docs/progress"
          class="text-md-sys-color-primary flex items-center gap-1 text-sm no-underline hover:underline"
        >
          Next: Progress
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
