<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Search from './Search.svelte';
  import ButtonIcon from '../../buttons/ButtonIcon.svelte';
  import List from '../../containers/list/List.svelte';
  import ListItem from '../../containers/list/ListItem.svelte';
  import { Icon } from '$lib/utils/index.js';
  import type { SearchResultsProps } from './types.js';

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

<script lang="ts">
  const recent = ['Material Design 3', 'Container transform', 'Search view specs'];
  const topics = [
    'Buttons',
    'Cards',
    'Chips',
    'Dialogs',
    'Lists',
    'Menus',
    'Navigation rail',
    'Search',
    'Sheets',
    'Sliders',
    'Snackbar',
    'Tabs',
    'Text fields'
  ];

  let query = $state('');
  let open = $state(false);
  let picked = $state('');

  const matches = $derived(
    query ? topics.filter((t) => t.toLowerCase().includes(query.toLowerCase())) : recent
  );

  const submit = (q: string) => {
    picked = `search for “${q}”`;
    open = false;
  };

  const pick = (item: string) => {
    picked = item;
    query = item;
    open = false;
  };
</script>

{#snippet suggestions(listbox: SearchResultsProps)}
  <List {...listbox}>
    {#each matches as item (item)}
      <ListItem role="option" asChild headline={item} onclick={() => pick(item)}>
        {#snippet leading()}
          <Icon name={query ? 'search' : 'history'} size="sm" />
        {/snippet}
      </ListItem>
    {/each}
  </List>
{/snippet}

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

<!--
  Click or type in the bar. The view is full-screen below the medium window class and docked from
  it up: resize the viewport to see both. Arrow keys move through the suggestions; Enter picks one,
  or with nothing highlighted searches for what was typed (onsearch). / from anywhere opens it.
-->
<Story
  name="Search view"
  asChild
  parameters={{
    layout: 'fullscreen',
    docs: { story: { inline: false, height: '560px' } }
  }}
>
  <div class="gap-spacing-200 p-spacing-300 flex min-h-dvh flex-col items-center">
    <Search
      placeholder="Search components"
      bind:value={query}
      bind:open
      results={suggestions}
      onsearch={submit}
    >
      {#snippet trailing()}
        <ButtonIcon variant="standard" iconProps={{ name: 'mic' }} aria-label="Voice search" />
      {/snippet}
    </Search>
    <p class="md-sys-typescale-body-medium text-md-sys-color-on-surface-variant">
      {picked ? `Picked: ${picked}` : 'Nothing picked yet'}
    </p>
  </div>
</Story>

<Story
  name="Full-screen"
  asChild
  parameters={{
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile1' },
    docs: { story: { inline: false, height: '560px' } }
  }}
>
  <div class="p-spacing-300 flex min-h-dvh flex-col items-center">
    <Search
      placeholder="Search components"
      bind:value={query}
      layout="fullScreen"
      results={suggestions}
    />
  </div>
</Story>

<Story
  name="Docked"
  asChild
  parameters={{ layout: 'fullscreen', docs: { story: { inline: false, height: '560px' } } }}
>
  <div class="p-spacing-300 flex min-h-dvh flex-col items-center">
    <Search
      placeholder="Search components"
      bind:value={query}
      layout="docked"
      results={suggestions}
    />
  </div>
</Story>
