<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Command from './Command.svelte';
  import CommandInput from './CommandInput.svelte';
  import CommandList from './CommandList.svelte';
  import CommandEmpty from './CommandEmpty.svelte';
  import CommandGroup from './CommandGroup.svelte';
  import CommandItem from './CommandItem.svelte';
  import CommandSeparator from './CommandSeparator.svelte';
  import CommandDialog from './CommandDialog.svelte';
  import Kbd from '../../typography/kbd/Kbd.svelte';
  import Button from '../../buttons/Button.svelte';
  import { shortcutLabel } from '$lib/utils/shortcut.js';
  import Icon from '$lib/utils/icon/Icon.svelte';

  const { Story } = defineMeta({
    title: 'Forms/Command',
    component: Command
  });
</script>

<script lang="ts">
  let paletteOpen = $state(false);
  let ran = $state('');
  const run = (name: string) => {
    ran = name;
    paletteOpen = false;
  };
</script>

<Story name="Playground" asChild>
  <div class="w-96">
    <Command>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">
            {#snippet leading()}<Icon name="calendar_today" />{/snippet}
            Calendar
          </CommandItem>
          <CommandItem value="search-emoji">
            {#snippet leading()}<Icon name="mood" />{/snippet}
            Search Emoji
          </CommandItem>
          <CommandItem value="calculator">
            {#snippet leading()}<Icon name="calculate" />{/snippet}
            Calculator
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem value="profile">
            {#snippet leading()}<Icon name="person" />{/snippet}
            Profile
          </CommandItem>
          <CommandItem value="billing">
            {#snippet leading()}<Icon name="credit_card" />{/snippet}
            Billing
          </CommandItem>
          <CommandItem value="settings">
            {#snippet leading()}<Icon name="settings" />{/snippet}
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  </div>
</Story>

<!--
  Press ⌘K (Ctrl+K off Apple platforms) anywhere in the story, or the button. Arrow keys move the
  highlight, Enter runs the command, Esc or ⌘K again closes it.
-->
<Story
  name="Dialog"
  asChild
  parameters={{ layout: 'fullscreen', docs: { story: { inline: false, height: '520px' } } }}
>
  <div
    class="gap-spacing-200 p-spacing-300 md-sys-typescale-body-medium text-md-sys-color-on-surface flex min-h-dvh flex-col items-start"
  >
    <Button variant="tonal" onclick={() => (paletteOpen = true)}>
      Open the palette <Kbd position="relative">{shortcutLabel('Mod+K')}</Kbd>
    </Button>
    <p class="text-md-sys-color-on-surface-variant">{ran ? `Ran: ${ran}` : 'Nothing run yet'}</p>
    <CommandDialog bind:open={paletteOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar" onSelect={() => run('Calendar')}>
            {#snippet leading()}<Icon name="calendar_today" />{/snippet}
            Calendar
          </CommandItem>
          <CommandItem value="calculator" onSelect={() => run('Calculator')}>
            {#snippet leading()}<Icon name="calculate" />{/snippet}
            Calculator
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem
            value="profile"
            supporting="Name, photo and email"
            onSelect={() => run('Profile')}
          >
            {#snippet leading()}<Icon name="person" />{/snippet}
            Profile
          </CommandItem>
          <CommandItem value="settings" shortcut="Mod+," onSelect={() => run('Settings')}>
            {#snippet leading()}<Icon name="settings" />{/snippet}
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
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
