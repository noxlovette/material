<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ListItem from './ListItem.svelte';
  import List from './List.svelte';
  import { listMedia } from './theme.js';
  import Icon from '$lib/utils/icon/Icon.svelte';
  import Avatar from '../../misc/Avatar.svelte';
  import ButtonIcon from '../../buttons/ButtonIcon.svelte';

  const { Story } = defineMeta({
    title: 'Containers/List',
    component: ListItem,
    argTypes: {
      headline: { control: 'text' },
      overline: { control: 'text' },
      supporting: { control: 'text' },
      trailingText: { control: 'text' },
      selected: { control: 'boolean' },
      disabled: { control: 'boolean' }
    },
    args: {
      headline: 'Headline',
      overline: '',
      supporting: '',
      trailingText: '',
      selected: false,
      disabled: false
    }
  });

  const tracks = ['Blue in Green', 'So What', 'Freddie Freeloader', 'All Blues'];
</script>

<script lang="ts">
  let single = $state(1);
  let settings = $state(0);
  let photosExpanded = $state(true);
</script>

<Story name="Playground">
  {#snippet template(args)}
    <List class="w-80">
      <ListItem
        headline={args.headline}
        overline={args.overline}
        supporting={args.supporting}
        trailingText={args.trailingText}
        selected={args.selected}
        disabled={args.disabled}
        onclick={() => {}}
      >
        {#snippet leading()}
          <Icon name="star" size="sm" />
        {/snippet}
      </ListItem>
    </List>
  {/snippet}
</Story>

<Story name="Standard" asChild>
  <List class="w-80">
    {#each tracks as track, i (track)}
      <ListItem
        headline={track}
        trailingText="⌘{i + 1}"
        selected={single === i}
        onclick={() => (single = i)}
      >
        {#snippet leading()}
          <Icon name="music_note" size="sm" />
        {/snippet}
      </ListItem>
    {/each}
  </List>
</Story>

<Story name="Segmented" asChild>
  <div class="bg-md-sys-color-surface w-96 p-4">
    <List variant="segmented">
      {#each ['Wi-Fi', 'Bluetooth', 'Notifications', 'Display'] as label, i (label)}
        <ListItem
          headline={label}
          supporting="Supporting text"
          selected={settings === i}
          onclick={() => (settings = i)}
        >
          {#snippet leading()}
            <Icon name="settings" size="sm" />
          {/snippet}
          {#snippet trailing()}
            <Icon name="chevron_right" size="sm" />
          {/snippet}
        </ListItem>
      {/each}
    </List>
  </div>
</Story>

<Story name="Line counts" asChild>
  <List variant="segmented" class="w-96">
    <ListItem headline="One line" />
    <ListItem headline="Two lines" supporting="Supporting text that describes the item" />
    <ListItem
      overline="Overline"
      headline="Three lines"
      supporting="At 88dp and taller, leading and trailing content align to the top"
      trailingText="100+"
    >
      {#snippet leading()}
        <Icon name="inbox" size="sm" />
      {/snippet}
    </ListItem>
  </List>
</Story>

<Story name="Leading media" asChild>
  <List variant="segmented" class="w-96">
    <ListItem headline="Icon" supporting="20dp, <Icon size=&quot;sm&quot;>">
      {#snippet leading()}
        <Icon name="folder" size="sm" />
      {/snippet}
    </ListItem>
    <ListItem headline="Avatar" supporting="40dp circle">
      {#snippet leading()}
        <Avatar seed="Ada" alt="" class={listMedia({ kind: 'avatar' })} />
      {/snippet}
    </ListItem>
    <ListItem headline="Image" supporting="56dp, 8dp corners">
      {#snippet leading()}
        <div
          class="{listMedia({
            kind: 'image'
          })} from-md-sys-color-primary to-md-sys-color-tertiary bg-linear-to-br"
          aria-hidden="true"
        ></div>
      {/snippet}
    </ListItem>
    <ListItem headline="Video" supporting="100×56dp, 8dp corners">
      {#snippet leading()}
        <div
          class="{listMedia({
            kind: 'video'
          })} from-md-sys-color-secondary to-md-sys-color-primary bg-linear-to-br"
          aria-hidden="true"
        ></div>
      {/snippet}
    </ListItem>
    <ListItem headline="Large video" supporting="114×64dp, 8dp corners">
      {#snippet leading()}
        <div
          class="{listMedia({
            kind: 'videoLarge'
          })} from-md-sys-color-tertiary to-md-sys-color-secondary bg-linear-to-br"
          aria-hidden="true"
        ></div>
      {/snippet}
    </ListItem>
  </List>
</Story>

<Story name="Multi-action" asChild>
  <List class="w-96">
    {#each tracks as track (track)}
      <li class="flex items-center">
        <ListItem asChild headline={track} onclick={() => {}}>
          {#snippet leading()}
            <Icon name="music_note" size="sm" />
          {/snippet}
        </ListItem>
        <ButtonIcon
          variant="text"
          iconProps={{ name: 'more_vert' }}
          aria-label="More for {track}"
        />
      </li>
    {/each}
  </List>
</Story>

<Story name="Expand" asChild>
  <List variant="segmented" class="w-96">
    <ListItem headline="Photos" supporting="3 albums" bind:expanded={photosExpanded}>
      {#snippet leading()}
        <Icon name="image" size="sm" />
      {/snippet}
      <ListItem headline="Holidays" href="#" />
      <ListItem headline="Family" href="#" />
      <ListItem headline="Screenshots" href="#" />
    </ListItem>
    <ListItem headline="Documents" supporting="2 folders">
      {#snippet leading()}
        <Icon name="folder" size="sm" />
      {/snippet}
      <ListItem headline="Work" href="#" />
      <ListItem headline="Personal" href="#" />
    </ListItem>
    <ListItem headline="Downloads" href="#">
      {#snippet leading()}
        <Icon name="download" size="sm" />
      {/snippet}
    </ListItem>
  </List>
</Story>

<Story name="Disabled" asChild>
  <List variant="segmented" class="w-80">
    <ListItem headline="Enabled" supporting="Supporting text" onclick={() => {}} />
    <ListItem headline="Disabled" supporting="Supporting text" disabled onclick={() => {}}>
      {#snippet leading()}
        <Icon name="wifi" size="sm" />
      {/snippet}
    </ListItem>
    <ListItem
      headline="Disabled, selected"
      supporting="Supporting text"
      disabled
      selected
      onclick={() => {}}
    >
      {#snippet leading()}
        <Icon name="wifi" size="sm" />
      {/snippet}
    </ListItem>
  </List>
</Story>

<Story name="Badge" asChild>
  <List class="w-80">
    <ListItem headline="Inbox" supporting="Supporting text" badge={3} href="#">
      {#snippet leading()}
        <Icon name="inbox" size="sm" />
      {/snippet}
    </ListItem>
  </List>
</Story>
