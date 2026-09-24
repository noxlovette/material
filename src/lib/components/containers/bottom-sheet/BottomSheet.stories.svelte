<!--
  BottomSheet is controlled with `bind:open`. A modal sheet dismisses itself (Esc, scrim tap,
  dragging it down, activating the handle) and reports why through `close`. A standard sheet
  never dismisses itself: dragging or activating the handle toggles `expanded`.
-->
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import BottomSheet from './BottomSheet.svelte';
  import Button from '../../buttons/Button.svelte';
  import ButtonIcon from '../../buttons/ButtonIcon.svelte';
  import List from '../list/List.svelte';
  import ListItem from '../list/ListItem.svelte';
  import Icon from '$lib/utils/icon/Icon.svelte';

  const { Story } = defineMeta({
    title: 'Containers/Bottom Sheet',
    component: BottomSheet
  });

  const shareTargets = [
    { name: 'share', label: 'Share' },
    { name: 'link', label: 'Copy link' },
    { name: 'download', label: 'Download' },
    { name: 'edit', label: 'Rename' },
    { name: 'delete', label: 'Move to trash' }
  ];
</script>

<script lang="ts">
  let modalOpen = $state(false);
  let lastReason = $state('');
  let longOpen = $state(false);
  let playerOpen = $state(true);
  let playerExpanded = $state(false);
</script>

<Story name="Modal" asChild>
  <div class="flex flex-col items-start gap-2 p-6">
    <Button onclick={() => (modalOpen = true)}>Open bottom sheet</Button>
    <p class="md-sys-typescale-body-medium">
      {lastReason ? `Dismissed by: ${lastReason}` : 'Drag it down, tap the scrim, or press Esc.'}
    </p>
    <BottomSheet bind:open={modalOpen} label="File actions" close={(r) => (lastReason = r)}>
      <List class="pb-4">
        {#each shareTargets as t (t.name)}
          <ListItem headline={t.label} onclick={() => (modalOpen = false)}>
            {#snippet leading()}
              <Icon name={t.name} size="sm" />
            {/snippet}
          </ListItem>
        {/each}
      </List>
    </BottomSheet>
  </div>
</Story>

<Story name="Scrolling content" asChild>
  <div class="p-6">
    <Button onclick={() => (longOpen = true)}>Open a long sheet</Button>
    <BottomSheet bind:open={longOpen} aria-labelledby="terms-heading">
      <div class="flex flex-col gap-4 px-6 pb-6">
        <h2 id="terms-heading" class="md-sys-typescale-title-large">Terms of service</h2>
        {#each { length: 12 } as _, i (i)}
          <p class="md-sys-typescale-body-medium text-md-sys-color-on-surface-variant">
            {i + 1}. The sheet stops 72dp below the top of the window (56dp on wider windows) and
            this content scrolls inside it. The drag handle stays put.
          </p>
        {/each}
        <Button onclick={() => (longOpen = false)}>Accept</Button>
      </div>
    </BottomSheet>
  </div>
</Story>

<!-- Its own iframe on the docs page: an open, fixed-position sheet would cover the docs. -->
<Story name="Standard" asChild parameters={{ docs: { story: { inline: false, height: '36rem' } } }}>
  <div class="flex min-h-[32rem] flex-col gap-4 p-6">
    <p class="md-sys-typescale-body-large max-w-md">
      A standard sheet leaves the page usable. Drag the handle, or activate it, to expand and
      collapse the player.
    </p>
    <div class="flex gap-2">
      <Button variant="tonal" onclick={() => (playerOpen = !playerOpen)}>
        {playerOpen ? 'Hide player' : 'Show player'}
      </Button>
      <Button variant="text" onclick={() => (playerExpanded = !playerExpanded)}>
        {playerExpanded ? 'Collapse' : 'Expand'}
      </Button>
    </div>
    <BottomSheet
      variant="standard"
      bind:open={playerOpen}
      bind:expanded={playerExpanded}
      peekHeight={120}
      label="Now playing"
    >
      <div class="flex flex-col gap-6 px-6 pb-6">
        <div class="flex items-center gap-4">
          <div
            class="bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container flex size-14 items-center justify-center rounded-lg"
          >
            <Icon name="music_note" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="md-sys-typescale-title-medium">Harbour lights</p>
            <p class="md-sys-typescale-body-medium text-md-sys-color-on-surface-variant">
              The Tidelines
            </p>
          </div>
          <ButtonIcon variant="filled" iconProps={{ name: 'pause' }} aria-label="Pause" />
        </div>
        <div
          class="bg-md-sys-color-secondary-container aspect-square w-full max-w-72 self-center rounded-3xl"
        ></div>
        <div class="flex justify-center gap-4">
          <ButtonIcon iconProps={{ name: 'skip_previous' }} aria-label="Previous" />
          <ButtonIcon variant="filled" iconProps={{ name: 'pause' }} aria-label="Pause" />
          <ButtonIcon iconProps={{ name: 'skip_next' }} aria-label="Next" />
        </div>
      </div>
    </BottomSheet>
  </div>
</Story>
