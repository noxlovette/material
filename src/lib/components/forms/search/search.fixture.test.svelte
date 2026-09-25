<script lang="ts">
  import { Tooltip } from 'bits-ui';
  import Search from './Search.svelte';
  import List from '../../containers/list/List.svelte';
  import ListItem from '../../containers/list/ListItem.svelte';
  import type { SearchLayout } from './types.js';
  import type { Responsive } from '../../containers/pane/theme.js';

  let {
    open = $bindable(false),
    value = $bindable(''),
    picked = $bindable(''),
    layout
  }: {
    open?: boolean;
    value?: string;
    picked?: string;
    layout?: Responsive<SearchLayout>;
  } = $props();

  const fruits = ['Apple', 'Apricot', 'Banana'];
</script>

<Tooltip.Provider>
  <Search bind:open bind:value {layout} placeholder="Search fruit">
    {#snippet results(listbox)}
      <List {...listbox}>
        {#each fruits.filter((f) => f
            .toLowerCase()
            .includes((value ?? '').toLowerCase())) as fruit (fruit)}
          <ListItem
            role="option"
            asChild
            headline={fruit}
            onclick={() => {
              picked = fruit;
              open = false;
            }}
          />
        {/each}
      </List>
    {/snippet}
  </Search>
</Tooltip.Provider>
