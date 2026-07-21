<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Search from './Search.svelte';

  const { Story } = defineMeta({
    title: 'Forms/Search',
    component: Search,
    argTypes: {
      placeholder: { control: 'text' },
      value: { control: 'text' }
    },
    args: {
      placeholder: 'Search',
      value: ''
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class="max-w-md p-6">
      <Search {...args} />
    </div>
  {/snippet}
</Story>

<Story name="With Value" asChild>
  <div class="max-w-md p-6">
    <Search value="Material Design" />
  </div>
</Story>

<Story name="Custom Icons" asChild>
  <div class="max-w-md p-6">
    <Search
      value="query"
      leadingIconProps={{ name: 'search' }}
      trailingIconProps={{ name: 'mic' }}
    />
  </div>
</Story>
