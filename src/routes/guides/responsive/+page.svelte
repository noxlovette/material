<script lang="ts">
  import { Body } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import Code from '../Code.svelte';
  import GuidePage from '../GuidePage.svelte';
  import Section from '../Section.svelte';
  import SimpleTable from '../SimpleTable.svelte';

  const toc = [
    { id: 'tiers', label: 'Window tiers' },
    { id: 'syntax', label: 'One value or several' },
    { id: 'defaults', label: 'Responsive defaults' },
    { id: 'css', label: 'Resolved in CSS' }
  ];
</script>

<GuidePage
  title="Responsive props"
  lede="Props whose right value depends on the window size take one value per M3 window tier."
  {toc}
>
  <Section id="tiers" title="Window tiers">
    <Body>
      M3 sizes layouts by window size class. A responsive prop takes up to four tiers, mapped onto
      Tailwind's breakpoints:
    </Body>
    <SimpleTable
      headers={['Tier', 'Tailwind', 'From', 'Typical device']}
      rows={[
        ['`small`', 'no prefix', '0', 'Phone'],
        ['`medium`', '`md:`', '768px', 'Tablet, foldable'],
        ['`large`', '`lg:`', '1024px', 'Landscape tablet, laptop'],
        ['`extraLarge`', '`xl:`', '1280px', 'Desktop']
      ]}
    />
  </Section>

  <Section id="syntax" title="One value or several">
    <Body>
      A <Code>Responsive&lt;T&gt;</Code> prop takes a single value, or an object with one value per tier.
      A tier you leave out inherits from the tier below it, the way Tailwind prefixes do:
    </Body>
    <CodeBlock
      code={`<!-- Always side by side -->
<PaneGrid direction="row">…</PaneGrid>

<!-- Stacked on phones and tablets, side by side from large up -->
<PaneGrid direction={{ small: 'column', large: 'row' }}>…</PaneGrid>

<!-- A small app bar that grows to large on wide windows -->
<AppBar title="Travel" size={{ small: 'small', large: 'large' }} />`}
    />
    <Body>
      Today <Code>PaneGrid</Code>'s <Code>direction</Code>, <Code>gap</Code>,
      <Code>padding</Code> and <Code>margin</Code>, and <Code>AppBar</Code>'s
      <Code>size</Code> are responsive.
    </Body>
  </Section>

  <Section id="defaults" title="Responsive defaults">
    <Body>
      Where M3 gives per-window guidance, the default follows it instead of being one value.
      <Code>PaneGrid</Code>'s <Code>direction</Code> defaults to
      <Code>{"{ small: 'column', large: 'row' }"}</Code>: one pane until the expanded class, as in
      M3's canonical layouts. So a split that must stay side by side at every width needs
      <Code>direction="row"</Code> explicitly.
    </Body>
  </Section>

  <Section id="css" title="Resolved in CSS">
    <Body>
      Every tier becomes a breakpoint-prefixed class, so the right value applies during server
      rendering, with no <Code>matchMedia</Code>, no JavaScript and no flash when the page hydrates.
      Resizing the window switches values instantly.
    </Body>
  </Section>
</GuidePage>
