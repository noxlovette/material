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
    <div class="p-spacing-300 max-w-md">
      <Search {...args} />
    </div>
  {/snippet}
</Story>

<Story name="With Value" asChild>
  <div class="p-spacing-300 max-w-md">
    <Search value="Material Design" />
  </div>
</Story>

<Story name="With actions" asChild>
  <div class="gap-spacing-200 p-spacing-300 flex max-w-md flex-col">
    <Search>
      {#snippet leading()}
        <ButtonIcon variant="standard" iconProps={{ name: 'menu' }} aria-label="Menu" />
      {/snippet}
      {#snippet trailing()}
        <ButtonIcon variant="standard" iconProps={{ name: 'mic' }} aria-label="Voice search" />
        <ButtonIcon
          variant="standard"
          iconProps={{ name: 'account_circle' }}
          aria-label="Account"
        />
      {/snippet}
    </Search>
    <Search value="query" leadingIconProps={null} placeholder="No leading icon" />
  </div>
</Story>
