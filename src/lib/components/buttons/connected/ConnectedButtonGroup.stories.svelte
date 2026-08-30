<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ConnectedButtonGroup from './ConnectedButtonGroup.svelte';
  import ConnectedButtonGroupItem from './ConnectedButtonGroupItem.svelte';

  const { Story } = defineMeta({
    title: 'Buttons/Connected Button Group',
    component: ConnectedButtonGroup,
    argTypes: {
      type: {
        control: 'select',
        options: ['single', 'multiple']
      },
      orientation: {
        control: 'select',
        options: ['horizontal', 'vertical']
      },
      shape: {
        control: 'select',
        options: ['round', 'square']
      },
      size: {
        control: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl']
      }
    },
    args: {
      type: 'single',
      orientation: 'horizontal',
      shape: 'round',
      size: 'sm'
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <ConnectedButtonGroup
      type={args.type}
      orientation={args.orientation}
      shape={args.shape}
      size={args.size}
      value="left"
    >
      <ConnectedButtonGroupItem
        value="left"
        label="Left"
        iconProps={{ name: 'format_align_left' }}
      />
      <ConnectedButtonGroupItem
        value="center"
        label="Center"
        iconProps={{ name: 'format_align_center' }}
      />
      <ConnectedButtonGroupItem
        value="right"
        label="Right"
        iconProps={{ name: 'format_align_right' }}
      />
    </ConnectedButtonGroup>
  {/snippet}
</Story>

<Story name="Multi-select" asChild>
  <div class="p-6">
    <ConnectedButtonGroup type="multiple" value={['bold']}>
      <ConnectedButtonGroupItem value="bold" label="Bold" iconProps={{ name: 'format_bold' }} />
      <ConnectedButtonGroupItem
        value="italic"
        label="Italic"
        iconProps={{ name: 'format_italic' }}
      />
      <ConnectedButtonGroupItem
        value="underline"
        label="Underline"
        iconProps={{ name: 'format_underlined' }}
      />
    </ConnectedButtonGroup>
  </div>
</Story>

<Story name="Icon Only" asChild>
  <div class="p-6">
    <ConnectedButtonGroup type="single" value="list">
      <ConnectedButtonGroupItem value="list" iconProps={{ name: 'view_list' }} />
      <ConnectedButtonGroupItem value="grid" iconProps={{ name: 'grid_view' }} />
    </ConnectedButtonGroup>
  </div>
</Story>

<Story name="Square Shape" asChild>
  <div class="p-6">
    <ConnectedButtonGroup type="single" shape="square" value="list">
      <ConnectedButtonGroupItem value="list" iconProps={{ name: 'view_list' }} />
      <ConnectedButtonGroupItem value="grid" iconProps={{ name: 'grid_view' }} />
    </ConnectedButtonGroup>
  </div>
</Story>

<Story name="Sizes" asChild>
  <div class="flex flex-col gap-6 p-6">
    {#each ['xs', 'sm', 'md', 'lg', 'xl'] as const as size (size)}
      <ConnectedButtonGroup type="single" {size} value="list">
        <ConnectedButtonGroupItem value="list" iconProps={{ name: 'view_list' }} />
        <ConnectedButtonGroupItem value="grid" iconProps={{ name: 'grid_view' }} />
      </ConnectedButtonGroup>
    {/each}
  </div>
</Story>

<Story name="Vertical" asChild>
  <div class="p-6">
    <ConnectedButtonGroup type="single" orientation="vertical" value="list">
      <ConnectedButtonGroupItem value="list" label="List" iconProps={{ name: 'view_list' }} />
      <ConnectedButtonGroupItem value="grid" label="Grid" iconProps={{ name: 'grid_view' }} />
    </ConnectedButtonGroup>
  </div>
</Story>
