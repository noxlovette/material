<!--
  BottomSheet is controlled with `bind:open`: it dismisses itself on Esc, backdrop click, or
  dragging the handle below a minimum height, and stays mounted until its exit animation
  finishes. The optional `close` callback reports why ('esc' | 'click' | 'low').
-->
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import BottomSheet from './BottomSheet.svelte';
  import Button from '../../buttons/Button.svelte';
  import MenuItem from '../menu/menu-item/MenuItem.svelte';

  const { Story } = defineMeta({
    title: 'Containers/Bottom Sheet',
    component: BottomSheet
  });
</script>

<script lang="ts">
  let playgroundOpen = $state(false);
</script>

<Story name="Playground" asChild>
  <div class="p-6">
    <Button onclick={() => (playgroundOpen = true)}>Open bottom sheet</Button>
    <BottomSheet bind:open={playgroundOpen}>
      <MenuItem iconProps={{ name: 'share' }}>Share</MenuItem>
      <MenuItem iconProps={{ name: 'link' }}>Copy link</MenuItem>
      <MenuItem iconProps={{ name: 'download' }}>Download</MenuItem>
    </BottomSheet>
  </div>
</Story>
