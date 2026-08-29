<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Command from './Command.svelte';
  import CommandInput from './CommandInput.svelte';
  import CommandList from './CommandList.svelte';
  import CommandEmpty from './CommandEmpty.svelte';
  import CommandGroup from './CommandGroup.svelte';
  import CommandItem from './CommandItem.svelte';
  import CommandSeparator from './CommandSeparator.svelte';
  import Icon from '$lib/utils/icon/Icon.svelte';
  import { command } from './theme.js';

  const { itemIcon } = command();

  const { Story } = defineMeta({
    title: 'Forms/Command',
    component: Command
  });
</script>

<Story name="Playground" asChild>
  <div class="w-96">
    <Command>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">
            <Icon name="calendar_today" class={itemIcon()} />
            Calendar
          </CommandItem>
          <CommandItem value="search-emoji">
            <Icon name="mood" class={itemIcon()} />
            Search Emoji
          </CommandItem>
          <CommandItem value="calculator">
            <Icon name="calculate" class={itemIcon()} />
            Calculator
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem value="profile">
            <Icon name="person" class={itemIcon()} />
            Profile
          </CommandItem>
          <CommandItem value="billing">
            <Icon name="credit_card" class={itemIcon()} />
            Billing
          </CommandItem>
          <CommandItem value="settings">
            <Icon name="settings" class={itemIcon()} />
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  </div>
</Story>

<Story name="Empty State" asChild>
  <div class="w-96">
    <Command>
      <CommandInput placeholder="Search for nothing..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
      </CommandList>
    </Command>
  </div>
</Story>

<Story name="No Icons" asChild>
  <div class="w-96">
    <Command>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Recent">
          <CommandItem value="apple">Apple</CommandItem>
          <CommandItem value="banana">Banana</CommandItem>
          <CommandItem value="cherry">Cherry</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  </div>
</Story>
