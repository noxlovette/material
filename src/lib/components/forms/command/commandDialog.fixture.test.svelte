<script lang="ts">
  import CommandDialog from './CommandDialog.svelte';
  import CommandInput from './CommandInput.svelte';
  import CommandItem from './CommandItem.svelte';
  import CommandList from './CommandList.svelte';

  let { open = $bindable(false), picked = $bindable('') }: { open?: boolean; picked?: string } =
    $props();
</script>

<button type="button">Elsewhere</button>
<CommandDialog bind:open>
  <CommandInput placeholder="Type a command" />
  <CommandList>
    {#each ['Calendar', 'Calculator'] as item (item)}
      <CommandItem
        value={item}
        onSelect={() => {
          picked = item;
          open = false;
        }}>{item}</CommandItem
      >
    {/each}
  </CommandList>
</CommandDialog>
