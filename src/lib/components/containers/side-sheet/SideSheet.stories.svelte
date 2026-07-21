<!--
  SideSheet is a content template only — a headline row with a close button, followed by
  `children`. It renders no backdrop, no fixed/absolute positioning, and no open/close
  transition of its own (unlike Dialogue and BottomSheet, which own their overlay). Consumers
  are expected to place it inside their own positioned container (e.g. a fixed aside, or a
  SplitPane right pane) — the wrapping <div> below is that story-only host, not part of the
  component.
-->
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SideSheet from './SideSheet.svelte';
  import Button from '../../buttons/Button.svelte';
  import { Body } from '$lib/index.js';

  const { Story } = defineMeta({
    title: 'Containers/Side Sheet',
    component: SideSheet,
    argTypes: {
      headline: { control: 'text' }
    },
    args: {
      headline: 'Details'
    }
  });
</script>

<script lang="ts">
  let playgroundOpen = $state(true);
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class="bg-md-sys-color-surface relative h-[420px] overflow-hidden">
      {#if playgroundOpen}
        <div
          class="bg-md-sys-color-surface-container-low shadow-elevation-1 absolute top-0 right-0 h-full w-80"
        >
          <SideSheet headline={args.headline} close={() => (playgroundOpen = false)}>
            <div class="flex flex-col gap-3 px-6 pb-6">
              <Body class="text-md-sys-color-on-surface-variant">
                Supplementary content and actions, anchored to the edge of the screen while the main
                content stays visible.
              </Body>
            </div>
          </SideSheet>
        </div>
      {:else}
        <div class="p-6">
          <Button onclick={() => (playgroundOpen = true)}>Show side sheet</Button>
        </div>
      {/if}
    </div>
  {/snippet}
</Story>
