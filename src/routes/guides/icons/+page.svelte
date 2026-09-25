<script lang="ts">
  import { Body, Icon } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';
  import Code from '../Code.svelte';
  import GuidePage from '../GuidePage.svelte';
  import Section from '../Section.svelte';
  import SimpleTable from '../SimpleTable.svelte';
  import IconPlayground from './IconPlayground.svelte';

  const toc = [
    { id: 'playground', label: 'Playground' },
    { id: 'loading', label: 'Loading icons' },
    { id: 'styles', label: 'Styles' },
    { id: 'axes', label: 'Axes' },
    { id: 'text', label: 'Icons with text' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'localizing', label: 'Localizing' }
  ];
</script>

<GuidePage
  title="Icons"
  lede="Material Symbols from the variable icon font, with fill, weight, grade and optical size as props."
  {toc}
>
  <Section id="playground" title="Playground">
    <Body>
      Search the full Material Symbols set, set the axes, and copy the <Code>Icon</Code> for it.
    </Body>
    <IconPlayground />
  </Section>

  <Section id="loading" title="Loading icons">
    <Body>
      <Code>App</Code> loads the font through <Code>MaterialSymbolsProvider</Code>, subset to the
      icons it knows about: <Code>baseIcons</Code> plus your <Code>extraIcons</Code>. An icon
      outside that list shows its name as text, so add every name you use. Load only the style you
      use with
      <Code>families</Code>.
    </Body>
    <CodeBlock
      code={`<App iconProviderProps={{ extraIcons: ['shopping_cart', 'receipt_long'], families: ['rounded'] }}>`}
    />
    <Body>
      A page that picks icons at runtime, like the playground above, can pass <Code
        >subset={'{false}'}</Code
      > to load the whole set. That is several MB per style, so keep it to that page.
    </Body>
  </Section>

  <Section id="styles" title="Styles">
    <SimpleTable
      headers={['variant', 'Use with']}
      rows={[
        ['`outlined`', 'Dense UIs and light typography; stroke weight can mirror the text'],
        ['`rounded`', 'Rounded shapes and buttons, heavier type, curved logos (the default)'],
        ['`sharp`', 'Rectangular, 0dp-corner designs; stays crisp at small sizes']
      ]}
    />
    <Body>Use one style across a product.</Body>
  </Section>

  <Section id="axes" title="Axes">
    <SimpleTable
      headers={['Prop', 'Range', 'Guidance']}
      rows={[
        [
          '`fill`',
          '0 to 1',
          'State: 1 for selected, e.g. navigation items. Changes animate on the effects spring.'
        ],
        [
          '`wght`',
          '100 to 700',
          'Match adjacent text and keep it consistent. At 24dp, no lighter than 200 and not much heavier than 400.'
        ],
        [
          '`grad`',
          '-50 to 200',
          '`auto` (default) is 0 on light schemes and -25 on dark ones, which offsets the glow of light-on-dark icons. Use a positive grade for an active state, or match a text font’s grade.'
        ],
        [
          '`opsz`',
          '20 to 48',
          'Follows `size`, so larger icons keep a thin stroke. Use 20dp for dense desktop layouts and 40–48dp to highlight primary actions.'
        ]
      ]}
    />
  </Section>

  <Section id="text" title="Icons with text">
    <Body>
      Match the icon's size and weight to the text. <Code>size="inline"</Code> takes the text's size and
      drops the baseline by about 11.5% of it, so the symbol sits on the line like a letter
      <Icon name="favorite" size="inline" />.
    </Body>
    <CodeBlock code={`<Body>Saved to favorites <Icon name="favorite" size="inline" /></Body>`} />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <Body>
      <Code>Icon</Code> is hidden from assistive technology by default, since the ligature name would
      otherwise be read out. When an icon carries meaning with no visible text beside it, give it an
      <Code>aria-label</Code>. It then gets <Code>role="img"</Code>. Icon buttons take the label on
      the button, not the icon.
    </Body>
    <Body>
      Label abstract icons, and always label navigation items. Below 20dp, give complex or
      key-action icons a text label. A 24dp icon needs a 48dp target; with a mouse and keyboard, a
      20dp icon can use a 40dp one.
    </Body>
  </Section>

  <Section id="localizing" title="Localizing">
    <Body>
      Icons read differently across cultures: a checkout can be a cart, a bag or a basket, and red
      doesn't mean warning everywhere. Test icons with the people who will use them, and label the
      abstract ones. <Code>Icon</Code> marks its glyph <Code>translate="no"</Code>, so page
      translation doesn't turn the ligature into another word.
    </Body>
  </Section>
</GuidePage>
