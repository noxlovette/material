<script lang="ts">
  import { Body } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import { storybookHref } from '../../storybook.js';
  import Code from '../Code.svelte';
  import GuidePage from '../GuidePage.svelte';
  import Section from '../Section.svelte';

  const toc = [
    { id: 'primitives', label: 'Two primitives' },
    { id: 'single', label: 'Single pane' },
    { id: 'supporting', label: 'Supporting pane' },
    { id: 'list-detail', label: 'List-detail' },
    { id: 'resizable', label: 'Resizable split' },
    { id: 'app-bar', label: 'With an app bar' },
    { id: 'a11y', label: 'Accessibility' }
  ];

  const story = (id: string) => storybookHref(`/story/${id}`);
</script>

<GuidePage
  title="Layout"
  lede="Build M3's canonical layouts from two primitives: Pane, a content region, and PaneGrid, which arranges panes."
  {toc}
>
  <Section id="primitives" title="Two primitives">
    <Body>
      A <Code>Pane</Code> is one region: its width, whether it sticks, whether it resizes, and at which
      window sizes it shows. A <Code>PaneGrid</Code> lays out any number of panes, with
      <Code>direction</Code>, <Code>gap</Code>, <Code>padding</Code> and <Code>margin</Code>, each
      <a href="./responsive" class="text-md-sys-color-primary">responsive</a>. A pane without a
      <Code>width</Code> grows to fill the space left.
    </Body>
    <Body>
      This site is built this way: the guides nav is a sticky pane, and each guide is a content pane
      with an "On this page" pane beside it.
    </Body>
  </Section>

  <Section id="single" title="Single pane">
    <Body>
      A single-column page needs no grid. <Code>padding</Code> and <Code>gap</Code> space the content
      and adapt to the window size; <Code>contentClass</Code> caps its width:
    </Body>
    <CodeBlock
      code={`<Pane padding="lg" gap="lg" contentClass="mx-auto max-w-3xl">
  <h1>Page title</h1>
  <p>Content at a readable width.</p>
</Pane>`}
    />
  </Section>

  <Section id="supporting" title="Supporting pane">
    <Body>
      M3's <a
        href="https://m3.material.io/foundations/layout/canonical-layouts/supporting-pane"
        class="text-md-sys-color-primary">supporting pane</a
      >
      puts the main content next to a narrower panel. Give the panel a <Code>width</Code> and
      <Code>sticky</Code> so it stays in view while the main pane scrolls. Below the expanded window class
      the default <Code>direction</Code> stacks them.
    </Body>
    <CodeBlock
      code={`<PaneGrid gap="lg">
  <Pane>
    <article>…</article>
  </Pane>
  <Pane width={280} sticky>
    <aside>On this page</aside>
  </Pane>
</PaneGrid>`}
    />
    <Body>
      <Code>sticky</Code> is native <Code>position: sticky</Code>, so it works inside any scroll
      container, including one already offset by a rail. <Code>stickyTop</Code> sets the offset.
      <a href={story('containers-pane-grid--main-supporting')} class="text-md-sys-color-primary"
        >Live example</a
      >.
    </Body>
  </Section>

  <Section id="list-detail" title="List-detail">
    <Body>
      In M3's <a
        href="https://m3.material.io/foundations/layout/canonical-layouts/list-detail"
        class="text-md-sys-color-primary">list-detail</a
      >
      layout, small windows show one pane at a time. Hide the detail pane below the size where both fit
      with <Code>visibleFrom</Code>, and navigate to the detail instead:
    </Body>
    <CodeBlock
      code={`<PaneGrid>
  <Pane width={360}>
    <List>…</List>
  </Pane>
  <Pane visibleFrom="large">
    <Detail />
  </Pane>
</PaneGrid>`}
    />
    <Body>
      <a
        href={story('containers-pane-grid--list-detail-detail-hidden-on-small')}
        class="text-md-sys-color-primary">Live example</a
      >.
    </Body>
  </Section>

  <Section id="resizable" title="Resizable split">
    <Body>
      Put a <Code>PaneHandle</Code> in the grid next to a pane and give both the same
      <Code>persistKey</Code>. The handle drags the pane's width between <Code>min</Code> and
      <Code>max</Code>, snaps to M3's recommended 360dp and 412dp widths, and saves the width to
      <Code>localStorage</Code>.
    </Body>
    <CodeBlock
      code={`<PaneGrid direction="row">
  <Pane width={320} resizable persistKey="app:nav-width">
    <nav>…</nav>
  </Pane>
  <PaneHandle persistKey="app:nav-width" min={240} max={480} />
  <Pane>
    <main>…</main>
  </Pane>
</PaneGrid>`}
    />
    <Body>
      <a href={story('containers-pane-grid--resizable-split')} class="text-md-sys-color-primary"
        >Live example</a
      >.
    </Body>
  </Section>

  <Section id="app-bar" title="With an app bar">
    <Body>
      A grid with <Code>full</Code> fills the window's height, minus the app bar's height on its own:
      <Code>AppBar</Code> publishes <Code>--appbar-height</Code> and the grid reads it. For a sticky pane
      under a fixed bar, set <Code>stickyTop</Code> to the bar's height.
    </Body>
  </Section>

  <Section id="a11y" title="Accessibility">
    <Body>
      <Code>visibleFrom</Code> and <Code>hiddenFrom</Code> only change CSS <Code>display</Code>, so
      a hidden pane is hidden from assistive tech as well. The <Code>PaneHandle</Code> is a
      <Code>role="separator"</Code> whose value reflects the pane's current, minimum and maximum width.
    </Body>
  </Section>
</GuidePage>
