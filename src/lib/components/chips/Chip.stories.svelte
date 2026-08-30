<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Chip from './Chip.svelte';

  const { Story } = defineMeta({
    title: 'Chips/Chip',
    component: Chip,
    argTypes: {
      variant: {
        control: 'select',
        options: ['assist', 'filter', 'input', 'suggestion']
      },
      elevated: { control: 'boolean' },
      selected: { control: 'boolean' },
      disabled: { control: 'boolean' }
    },
    args: {
      variant: 'assist',
      elevated: false,
      selected: false,
      disabled: false
    }
  });

  let filterSelected = $state(true);
</script>

<Story name="Playground">Chip</Story>

<Story name="Assist" asChild>
  <div class="flex flex-wrap items-center gap-4 p-6">
    <Chip variant="assist" iconProps={{ name: 'calendar_today' }}>Set reminder</Chip>
    <Chip variant="assist" elevated iconProps={{ name: 'calendar_today' }}>Set reminder</Chip>
    <Chip variant="assist" disabled iconProps={{ name: 'calendar_today' }}>Set reminder</Chip>
  </div>
</Story>

<Story name="Filter" asChild>
  <div class="flex flex-wrap items-center gap-4 p-6">
    <Chip variant="filter" bind:selected={filterSelected}>Filter chip</Chip>
    <Chip variant="filter" iconProps={{ name: 'star' }}>Starred</Chip>
    <Chip variant="filter" elevated selected>Elevated selected</Chip>
    <Chip variant="filter" disabled>Disabled</Chip>
  </div>
</Story>

<Story name="Input" asChild>
  <div class="flex flex-wrap items-center gap-4 p-6">
    <Chip variant="input" iconProps={{ name: 'person' }} onRemove={() => {}}>Ada Lovelace</Chip>
    <Chip variant="input" onRemove={() => {}}>No avatar</Chip>
    <Chip variant="input" selected iconProps={{ name: 'person' }} onRemove={() => {}}>Selected</Chip
    >
    <Chip variant="input" disabled iconProps={{ name: 'person' }} onRemove={() => {}}>Disabled</Chip
    >
  </div>
</Story>

<Story name="Suggestion" asChild>
  <div class="flex flex-wrap items-center gap-4 p-6">
    <Chip variant="suggestion">Try this</Chip>
    <Chip variant="suggestion" elevated>Elevated</Chip>
    <Chip variant="suggestion" disabled>Disabled</Chip>
  </div>
</Story>
