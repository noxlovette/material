<!--
  Pick a Material Symbol, set its four axes and style, and copy the <Icon> for it. Loads the full
  font for the chosen style (the app's own provider only loads a subset), and the icon list from
  catalog.json on mount so it stays out of the page bundle.
-->
<script lang="ts">
  import {
    Body,
    Button,
    Card,
    Chip,
    ConnectedButtonGroup,
    ConnectedButtonGroupItem,
    Icon,
    Label,
    MaterialSymbolsProvider,
    Pane,
    PaneGrid,
    Search,
    Slider,
    Title,
    type IconProps,
    type IconSize,
    type IconVariant,
    type MaterialSymbolName
  } from '$lib/index.js';
  import CodeBlock from '../../CodeBlock.svelte';

  const PAGE = 96;

  const sizes: { value: IconSize; label: string }[] = [
    { value: 'sm', label: '20' },
    { value: 'md', label: '24' },
    { value: 'lg', label: '40' },
    { value: 'xl', label: '48' }
  ];

  const grades = ['auto', '-25', '0', '200'] as const;

  let catalog = $state<[MaterialSymbolName, string][]>([]);
  let query = $state('');
  let category = $state<string | null>(null);
  let limit = $state(PAGE);

  let name = $state<MaterialSymbolName>('favorite');
  let variant = $state<IconVariant>('rounded');
  let size = $state<IconSize>('xl');
  let fill = $state(0);
  let wght = $state(400);
  let grade = $state<(typeof grades)[number]>('auto');

  $effect(() => {
    import('./catalog.json').then((m) => (catalog = m.default as [MaterialSymbolName, string][]));
  });

  const categories = $derived([...new Set(catalog.map(([, c]) => c))].sort());

  const matches = $derived.by(() => {
    const q = query
      .trim()
      .toLowerCase()
      .replace(/[\s-]+/g, '_');
    return catalog.filter(([n, c]) => (!category || c === category) && (!q || n.includes(q)));
  });

  const props = $derived<Pick<IconProps, 'variant' | 'fill' | 'wght' | 'grad'>>({
    variant,
    fill,
    wght,
    grad: grade === 'auto' ? 'auto' : Number(grade)
  });

  // Only the props that differ from Icon's defaults.
  const snippet = $derived.by(() => {
    const attrs = [`name="${name}"`];
    if (size !== 'md') attrs.push(`size="${size}"`);
    if (variant !== 'rounded') attrs.push(`variant="${variant}"`);
    if (fill !== 0) attrs.push(`fill={${fill}}`);
    if (wght !== 400) attrs.push(`wght={${wght}}`);
    if (grade !== 'auto') attrs.push(`grad={${grade}}`);
    return `<Icon ${attrs.join(' ')} />\n\n<!-- Icon names outside baseIcons must be loaded: -->\n<App iconProviderProps={{ extraIcons: ['${name}'] }}>`;
  });

  const reset = () => {
    limit = PAGE;
  };
</script>

<MaterialSymbolsProvider subset={false} families={[variant]} />

<div class="gap-spacing-300 flex flex-col">
  <Card type="outlined" padding="lg">
    <PaneGrid direction={{ small: 'column', medium: 'row' }} gap="md" padding="none" margin="none">
      <Pane
        full={false}
        padding="none"
        rounded={false}
        background={false}
        gap="lg"
        contentClass="items-center justify-center"
      >
        <div
          class="size-spacing-900 bg-md-sys-color-primary-container text-md-sys-color-on-primary-container flex items-center justify-center rounded-xl"
        >
          <Icon {name} {size} {...props} />
        </div>
        <Title size="medium" class="font-mono">{name}</Title>
        <Body class="text-md-sys-color-on-surface-variant">
          In a sentence <Icon {name} size="inline" {...props} /> the symbol follows the text.
        </Body>
      </Pane>

      <Pane full={false} padding="none" rounded={false} background={false} gap="lg">
        <div class="gap-spacing-100 flex flex-col">
          <Label>Style</Label>
          <ConnectedButtonGroup type="single" bind:value={variant} size="xs" aria-label="Style">
            <ConnectedButtonGroupItem value="rounded" label="Rounded" />
            <ConnectedButtonGroupItem value="outlined" label="Outlined" />
            <ConnectedButtonGroupItem value="sharp" label="Sharp" />
          </ConnectedButtonGroup>
        </div>

        <div class="gap-spacing-100 flex flex-col">
          <Label>Size (optical size, dp)</Label>
          <ConnectedButtonGroup type="single" bind:value={size} size="xs" aria-label="Size">
            {#each sizes as s (s.value)}
              <ConnectedButtonGroupItem value={s.value} label={s.label} />
            {/each}
          </ConnectedButtonGroup>
        </div>

        <div class="gap-spacing-100 flex flex-col">
          <Label>Grade</Label>
          <ConnectedButtonGroup type="single" bind:value={grade} size="xs" aria-label="Grade">
            {#each grades as g (g)}
              <ConnectedButtonGroupItem value={g} label={g === 'auto' ? 'Auto' : g} />
            {/each}
          </ConnectedButtonGroup>
        </div>

        <div class="gap-spacing-50 flex flex-col">
          <Label>Fill {fill}</Label>
          <Slider bind:value={fill} min={0} max={1} step={0.1} size="xs" aria-label="Fill" />
        </div>

        <div class="gap-spacing-50 flex flex-col">
          <Label>Weight {wght}</Label>
          <Slider bind:value={wght} min={100} max={700} step={100} size="xs" aria-label="Weight" />
        </div>
      </Pane>
    </PaneGrid>
  </Card>

  <CodeBlock code={snippet} />

  <Search bind:value={query} placeholder="Search {catalog.length || ''} icons" oninput={reset} />

  <div class="gap-spacing-100 flex flex-wrap">
    {#each categories as c (c)}
      <Chip
        variant="filter"
        selected={category === c}
        onPressedChange={(on) => {
          category = on ? c : null;
          reset();
        }}
      >
        {c}
      </Chip>
    {/each}
  </div>

  {#if catalog.length && !matches.length}
    <Body class="text-md-sys-color-on-surface-variant">
      No symbol is named like “{query}”. Names are English and use underscores, e.g.
      <span class="font-mono">shopping_cart</span>.
    </Body>
  {/if}

  <div class="gap-spacing-100 grid grid-cols-[repeat(auto-fill,minmax(6.5rem,1fr))]">
    {#each matches.slice(0, limit) as [n] (n)}
      <Card
        type="filled"
        padding="sm"
        selected={n === name}
        onselect={() => (name = n)}
        aria-label={n}
        class="gap-spacing-100 flex flex-col items-center text-center"
      >
        <Icon name={n} {...props} />
        <Label size="small" class="text-md-sys-color-on-surface-variant w-full truncate">{n}</Label>
      </Card>
    {/each}
  </div>

  {#if matches.length > limit}
    <Button variant="tonal" class="self-center" onclick={() => (limit += PAGE)}>
      Show more ({matches.length - limit} left)
    </Button>
  {/if}
</div>
