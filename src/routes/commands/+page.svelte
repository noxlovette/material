<script lang="ts">
  import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandSeparator,
    Display,
    Headline,
    Title,
    Icon,
    Button,
    SinglePane,
    SupportingPane
  } from '$lib/index.js';
  import { Dialog } from 'bits-ui';
  import { dialogue } from '$lib/components/containers/dialogue/theme.js';
  import TableOfContents from '../TableOfContents.svelte';
  import { onMount } from 'svelte';

  let open = $state(false);
  const { base, inner } = dialogue();

  onMount(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        open = !open;
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  });

  const sections = [
    { id: 'basic', label: 'Basic Usage' },
    { id: 'groups', label: 'Groups & Separators' },
    { id: 'dialogue', label: 'Dialogue Integration' }
  ];
</script>

<svelte:head>
  <title>Commands | Ogonëk M3</title>
</svelte:head>

<SupportingPane>
  {#snippet main()}
    <SinglePane contentClass="p-12 gap-12">
      <section id="basic" class="flex scroll-mt-4 flex-col gap-6">
        <Display>Commands</Display>
        <Headline>Basic Usage</Headline>
        <div class="max-w-[400px]">
          <Command class="rounded-lg border shadow-md">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Icon name="calendar_month" class="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Icon name="sentiment_satisfied" class="mr-2 h-4 w-4" />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem>
                  <Icon name="rocket_launch" class="mr-2 h-4 w-4" />
                  <span>Launch Rocket</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </section>

      <section id="groups" class="flex scroll-mt-4 flex-col gap-6">
        <Headline>Groups & Separators</Headline>
        <div class="max-w-[400px]">
          <Command class="rounded-lg border shadow-md">
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Settings">
                <CommandItem>
                  <Icon name="person" class="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <span class="ml-auto text-xs opacity-50">⌘P</span>
                </CommandItem>
                <CommandItem>
                  <Icon name="credit_card" class="mr-2 h-4 w-4" />
                  <span>Billing</span>
                  <span class="ml-auto text-xs opacity-50">⌘B</span>
                </CommandItem>
                <CommandItem>
                  <Icon name="settings" class="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <span class="ml-auto text-xs opacity-50">⌘S</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Theme">
                <CommandItem>
                  <Icon name="light_mode" class="mr-2 h-4 w-4" />
                  <span>Light</span>
                </CommandItem>
                <CommandItem>
                  <Icon name="dark_mode" class="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </CommandItem>
                <CommandItem>
                  <Icon name="desktop_windows" class="mr-2 h-4 w-4" />
                  <span>System</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </section>

      <section id="dialogue" class="flex scroll-mt-4 flex-col gap-6">
        <Headline>Dialogue Integration</Headline>
        <Title
          >Press <kbd class="bg-md-sys-color-surface-container-high rounded px-1 text-xs">⌘K</kbd> to
          open the command menu.</Title
        >
        <div class="flex">
          <Button onclick={() => (open = true)}>Open Command Menu</Button>
        </div>

        <Dialog.Root bind:open>
          <Dialog.Portal>
            <Dialog.Overlay class={base()} />
            <Dialog.Content class={inner({ class: 'max-w-[450px] overflow-hidden p-0' })}>
              <Command class="border-none shadow-none ring-0">
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>
                      <Icon name="calendar_month" class="mr-2 h-4 w-4" />
                      <span>Calendar</span>
                    </CommandItem>
                    <CommandItem>
                      <Icon name="sentiment_satisfied" class="mr-2 h-4 w-4" />
                      <span>Search Emoji</span>
                    </CommandItem>
                    <CommandItem>
                      <Icon name="rocket_launch" class="mr-2 h-4 w-4" />
                      <span>Launch Rocket</span>
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Settings">
                    <CommandItem>
                      <Icon name="person" class="mr-2 h-4 w-4" />
                      <span>Profile</span>
                      <span class="ml-auto text-xs opacity-50">⌘P</span>
                    </CommandItem>
                    <CommandItem>
                      <Icon name="credit_card" class="mr-2 h-4 w-4" />
                      <span>Billing</span>
                      <span class="ml-auto text-xs opacity-50">⌘B</span>
                    </CommandItem>
                    <CommandItem>
                      <Icon name="settings" class="mr-2 h-4 w-4" />
                      <span>Settings</span>
                      <span class="ml-auto text-xs opacity-50">⌘S</span>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </section>
    </SinglePane>
  {/snippet}

  {#snippet supporting()}
    <TableOfContents {sections} />
  {/snippet}
</SupportingPane>
