<!--
  BottomSheet has no `open` prop of its own — mounting it calls the native <dialog>'s
  showModal() immediately, so visibility is controlled by conditionally rendering the component
  ({#if open}<BottomSheet ...>{/if}). `close` is a required callback the sheet invokes on Esc,
  backdrop click, or dragging the handle down below a minimum height ('esc' | 'click' | 'low') —
  the consumer is expected to flip its own `open` flag to false in response.
-->
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import BottomSheet from './BottomSheet.svelte';
  import Button from '../../buttons/Button.svelte';
  import MenuItem from '../menu-item/MenuItem.svelte';

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
    {#if playgroundOpen}
      <BottomSheet close={() => (playgroundOpen = false)}>
        <MenuItem iconProps={{ name: 'share' }}>Share</MenuItem>
        <MenuItem iconProps={{ name: 'link' }}>Copy link</MenuItem>
        <MenuItem iconProps={{ name: 'download' }}>Download</MenuItem>
      </BottomSheet>
    {/if}
  </div>
</Story>
