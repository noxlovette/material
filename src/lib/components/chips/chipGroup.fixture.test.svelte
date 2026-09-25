<script lang="ts">
  import Chip from './Chip.svelte';
  import ChipGroup from './ChipGroup.svelte';

  let {
    initial,
    onReorder,
    onChipClick
  }: {
    initial: string[];
    onReorder: (items: string[]) => void;
    onChipClick: (name: string) => void;
  } = $props();

  // svelte-ignore state_referenced_locally
  let items = $state([...initial]);
</script>

<ChipGroup bind:items key={(name) => name} reorderable {onReorder} aria-label="People">
  {#snippet chip(name)}
    <Chip variant="assist" data-testid="chip-{name}" onclick={() => onChipClick(name)}>{name}</Chip>
  {/snippet}
</ChipGroup>
