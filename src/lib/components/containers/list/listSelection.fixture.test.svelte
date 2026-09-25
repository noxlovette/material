<script lang="ts">
  import List from './List.svelte';
  import ListItem from './ListItem.svelte';

  let { selected = [0] }: { selected?: number[] } = $props();
</script>

<List>
  {#each ['Alpha', 'Beta', 'Gamma', 'Delta'] as headline, i (headline)}
    <ListItem {headline} href="/{headline}" selected={selected.includes(i)} />
  {/each}
</List>
