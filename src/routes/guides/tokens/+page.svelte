<script lang="ts">
  import { Body } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import { storybookHref } from '../../storybook.js';
  import Code from '../Code.svelte';
  import GuidePage from '../GuidePage.svelte';
  import Section from '../Section.svelte';
  import SimpleTable from '../SimpleTable.svelte';

  const toc = [
    { id: 'color', label: 'Color' },
    { id: 'type', label: 'Type scale' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'shape', label: 'Shape' },
    { id: 'elevation', label: 'Elevation' },
    { id: 'motion', label: 'Motion' }
  ];

  const spacing: [number, number][] = [
    [0, 0],
    [25, 2],
    [50, 4],
    [75, 6],
    [100, 8],
    [125, 10],
    [150, 12],
    [175, 14],
    [200, 16],
    [250, 20],
    [300, 24],
    [400, 32],
    [450, 36],
    [500, 40],
    [600, 48],
    [700, 56],
    [800, 64],
    [900, 72]
  ];
</script>

<GuidePage
  title="Tokens"
  lede="M3's design tokens as Tailwind utilities, named after the token they come from."
  {toc}
>
  <Section id="color" title="Color">
    <Body>
      Every M3 color role is a Tailwind color: <Code>md.sys.color.primary</Code> is
      <Code>bg-md-sys-color-primary</Code>, <Code>text-md-sys-color-primary</Code>,
      <Code>border-md-sys-color-primary</Code> and so on, with opacity modifiers (<Code
        >bg-md-sys-color-on-surface/8</Code
      >). Pair every container with its <Code>on-*</Code>
      role.
    </Body>
  </Section>

  <Section id="type" title="Type scale">
    <Body>
      The 15 M3 type styles are single classes that set font, weight, size, line height and tracking
      together. Use them without a prefix, and don't combine them with <Code>text-*</Code>,
      <Code>leading-*</Code>, <Code>tracking-*</Code> or <Code>font-*</Code>.
    </Body>
    <SimpleTable
      headers={['Class', 'Use']}
      rows={[
        [
          '`md-sys-typescale-<role>-<size>`',
          'Baseline style: roles `display`, `headline`, `title`, `body`, `label`; sizes `large`, `medium`, `small`'
        ],
        [
          '`md-sys-typescale-emphasized-<role>-<size>`',
          'Same metrics, heavier weight: selected, active or unread states'
        ],
        ['`md-sys-typescale-label-{large,medium}-prominent`', 'The 700-weight label tokens']
      ]}
    />
    <Body>
      Line heights follow each element's <Code>lang</Code>, per M3's language-height categories. The
      <a href={storybookHref('/docs/typography-overview--docs')} class="text-md-sys-color-primary"
        >Typography</a
      > page in Storybook has the details.
    </Body>
  </Section>

  <Section id="spacing" title="Spacing">
    <Body>
      M3's spacing tokens (<Code>md.sys.measurement.space*</Code>, on an 8dp base) are registered in
      Tailwind's spacing namespace, so every spacing, sizing and inset utility takes them:
      <Code>p-spacing-200</Code>, <Code>gap-spacing-50</Code>, <Code>size-spacing-600</Code>,
      <Code>-mt-spacing-100</Code>. The library itself uses only these; Tailwind's numeric scale (<Code
        >p-4</Code
      >) still works in your app.
    </Body>
    <SimpleTable
      headers={['Class suffix', 'Token', 'Value']}
      rows={spacing.map(([n, dp]) => [`\`spacing-${n}\``, `\`space${n}\``, `${dp}dp`])}
    />
    <Body>
      The number is M3's, not Tailwind's multiplier: <Code>spacing-200</Code> is 16dp, the same as
      <Code>p-4</Code>. Stick to one scale per codebase so the two don't get mixed up.
    </Body>
    <CodeBlock code={`<div class="flex flex-col gap-spacing-200 p-spacing-300">…</div>`} />
  </Section>

  <Section id="shape" title="Shape">
    <Body>
      The M3 corner scale: <Code>rounded-xs</Code> (4dp), <Code>rounded-sm</Code> (8dp),
      <Code>rounded-md</Code> (12dp), <Code>rounded-lg</Code> (16dp), <Code>rounded-xl</Code>
      (28dp) and <Code>rounded-full</Code>.
    </Body>
  </Section>

  <Section id="elevation" title="Elevation">
    <Body>
      <Code>shadow-elevation-0</Code> to <Code>shadow-elevation-5</Code> are the M3 elevation levels,
      tinted from the scheme's shadow color. Use a higher level for surfaces that sit above their neighbours
      (menus, FABs, dialogs), not as decoration.
    </Body>
  </Section>

  <Section id="motion" title="Motion">
    <Body>
      Color and opacity changes use the spring-based transition utilities (<Code
        >transition-colors md-sys-motion-effects</Code
      >). Anything that moves or resizes runs on JS springs; see the Motion guide.
    </Body>
  </Section>
</GuidePage>
