<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ConnectedButtonGroup from './ConnectedButtonGroup.svelte';
  import ConnectedButtonGroupItem from './ConnectedButtonGroupItem.svelte';

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  const variants = ['filled', 'tonal', 'outlined', 'elevated'] as const;

  const { Story } = defineMeta({
    title: 'Buttons/Connected Button Group',
    component: ConnectedButtonGroup,
    argTypes: {
      type: { control: 'inline-radio', options: ['single', 'multiple'] },
      variant: { control: 'select', options: variants },
      orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
      shape: { control: 'inline-radio', options: ['round', 'square'] },
      size: { control: 'select', options: sizes }
    },
    args: {
      type: 'single',
      variant: 'filled',
      orientation: 'horizontal',
      shape: 'round',
      size: 'sm'
    }
  });
</script>

<script lang="ts">
  let mode = $state('bike');
  let format = $state<string[]>(['bold']);
</script>

<Story name="Playground">
  {#snippet template(args)}
    <ConnectedButtonGroup
      {...args}
      value={args.type === 'multiple' ? [] : 'walk'}
      aria-label="Travel mode"
    >
      <ConnectedButtonGroupItem value="walk" label="Walk" iconProps={{ name: 'directions_walk' }} />
      <ConnectedButtonGroupItem value="bike" label="Bike" iconProps={{ name: 'directions_bike' }} />
      <ConnectedButtonGroupItem
        value="drive"
        label="Drive"
        iconProps={{ name: 'directions_car' }}
      />
    </ConnectedButtonGroup>
  {/snippet}
</Story>

<Story name="Colour styles" asChild>
  <div class="gap-spacing-200 p-spacing-300 flex max-w-md flex-col">
    {#each variants as variant (variant)}
      <ConnectedButtonGroup type="single" {variant} bind:value={mode} aria-label="Travel mode">
        <ConnectedButtonGroupItem value="walk" label="Walk" />
        <ConnectedButtonGroupItem value="bike" label="Bike" />
        <ConnectedButtonGroupItem value="drive" label="Drive" />
      </ConnectedButtonGroup>
    {/each}
  </div>
</Story>

<Story name="Multi-select icons" asChild>
  <div class="gap-spacing-200 p-spacing-300 flex flex-col items-start">
    <ConnectedButtonGroup type="multiple" bind:value={format} class="w-auto" aria-label="Format">
      <ConnectedButtonGroupItem
        value="bold"
        aria-label="Bold"
        iconProps={{ name: 'format_bold' }}
      />
      <ConnectedButtonGroupItem
        value="italic"
        aria-label="Italic"
        iconProps={{ name: 'format_italic' }}
      />
      <ConnectedButtonGroupItem
        value="underline"
        aria-label="Underline"
        iconProps={{ name: 'format_underlined' }}
      />
    </ConnectedButtonGroup>
  </div>
</Story>

<Story name="Sizes and shapes" asChild>
  <div class="gap-spacing-200 p-spacing-300 flex max-w-xl flex-col">
    {#each sizes as size (size)}
      <div class="gap-spacing-200 flex">
        {#each ['round', 'square'] as const as shape (shape)}
          <ConnectedButtonGroup type="single" {size} {shape} value="b">
            <ConnectedButtonGroupItem value="a" label="A" />
            <ConnectedButtonGroupItem value="b" label="B" />
            <ConnectedButtonGroupItem value="c" label="C" />
          </ConnectedButtonGroup>
        {/each}
      </div>
    {/each}
  </div>
</Story>
