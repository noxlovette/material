<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Chip from './Chip.svelte';
  import ChipGroup from './ChipGroup.svelte';

  const { Story } = defineMeta({
    title: 'Chips/Chip Group',
    component: ChipGroup,
    tags: ['autodocs']
  });
</script>

<script lang="ts">
  let people = $state([
    'Ada Lovelace',
    'Grace Hopper',
    'Alan Turing',
    'Katherine Johnson',
    'Edsger Dijkstra'
  ]);
  let filters = $state([
    { id: 'wifi', label: 'Wifi', selected: true },
    { id: 'parking', label: 'Parking', selected: false },
    { id: 'pool', label: 'Pool', selected: false },
    { id: 'gym', label: 'Gym', selected: true },
    { id: 'pets', label: 'Pets allowed', selected: false },
    { id: 'breakfast', label: 'Breakfast', selected: false }
  ]);
  let tags = $state(['Design', 'Svelte', 'Motion', 'Accessibility']);
</script>

<Story name="Reorderable input chips" asChild>
  <div class="p-spacing-300 max-w-md">
    <ChipGroup bind:items={people} key={(name) => name} reorderable aria-label="Recipients">
      {#snippet chip(name)}
        <Chip
          variant="input"
          iconProps={{ name: 'person' }}
          removeLabel="Remove {name}"
          onRemove={() => (people = people.filter((p) => p !== name))}
        >
          {name}
        </Chip>
      {/snippet}
    </ChipGroup>
  </div>
</Story>

<Story name="Reorderable filter chips" asChild>
  <div class="p-spacing-300 max-w-md">
    <ChipGroup
      bind:items={filters}
      key={(f) => f.id}
      itemLabel={(f) => f.label}
      reorderable
      aria-label="Amenities"
    >
      {#snippet chip(f)}
        <Chip variant="filter" bind:selected={f.selected}>{f.label}</Chip>
      {/snippet}
    </ChipGroup>
  </div>
</Story>

<Story name="Static set" asChild>
  <div class="p-spacing-300 max-w-md">
    <ChipGroup items={tags} key={(t) => t} aria-label="Topics">
      {#snippet chip(tag)}
        <Chip variant="assist">{tag}</Chip>
      {/snippet}
    </ChipGroup>
  </div>
</Story>
