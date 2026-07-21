<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import FAB from './FAB.svelte';
  import FABMenuItem from './FABMenuItem.svelte';

  const { Story } = defineMeta({
    title: 'Buttons/FAB',
    component: FAB,
    argTypes: {
      config: {
        control: 'select',
        options: ['primary', 'secondary', 'tertiary']
      },
      size: {
        control: 'select',
        options: ['small', 'regular', 'large']
      },
      expanded: { control: 'boolean' },
      label: { control: 'text' },
      disabled: { control: 'boolean' },
      loading: { control: 'boolean' }
    },
    args: {
      config: 'primary',
      size: 'regular',
      expanded: false,
      label: 'Compose',
      disabled: false,
      loading: false,
      iconProps: { name: 'edit' }
    }
  });
</script>

<Story name="Playground" />

<Story name="Sizes" asChild>
  <div class="flex flex-wrap items-end gap-4 p-6">
    <FAB size="small" config="primary" iconProps={{ name: 'edit' }} />
    <FAB size="regular" config="primary" iconProps={{ name: 'edit' }} />
    <FAB size="large" config="primary" iconProps={{ name: 'edit' }} />
  </div>
</Story>

<Story name="Extended" asChild>
  <div class="flex flex-wrap items-center gap-4 p-6">
    <FAB config="primary" expanded label="Compose" iconProps={{ name: 'edit' }} />
  </div>
</Story>

<Story name="With Menu" asChild>
  <div class="relative flex h-40 items-end gap-4 p-6">
    <FAB config="primary" withMenu iconProps={{ name: 'add' }}>
      <FABMenuItem variant="primary" iconProps={{ name: 'draw' }}>Draw</FABMenuItem>
      <FABMenuItem variant="secondary" iconProps={{ name: 'image' }}>Insert Image</FABMenuItem>
      <FABMenuItem variant="tertiary" iconProps={{ name: 'mic' }}>Record</FABMenuItem>
    </FAB>
  </div>
</Story>
