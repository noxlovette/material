<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Search from './Search.svelte';
  import ButtonIcon from '../../buttons/ButtonIcon.svelte';

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

<Story name="With actions" asChild>
  <div class="flex max-w-md flex-col gap-4 p-6">
    <Search>
      {#snippet leading()}
        <ButtonIcon variant="text" iconProps={{ name: 'menu' }} aria-label="Menu" />
      {/snippet}
      {#snippet trailing()}
        <ButtonIcon variant="text" iconProps={{ name: 'mic' }} aria-label="Voice search" />
        <ButtonIcon variant="text" iconProps={{ name: 'account_circle' }} aria-label="Account" />
      {/snippet}
    </Search>
    <Search value="query" leadingIconProps={null} placeholder="No leading icon" />
  </div>
</Story>
