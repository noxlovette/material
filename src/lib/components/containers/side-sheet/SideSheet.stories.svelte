<!--
  SideSheet is controlled with `bind:open`: it dismisses itself (close button, Esc, backdrop
  click) by setting `open` to false, and stays mounted until its exit animation finishes.
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
  let playgroundOpen = $state(false);
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class="p-6">
      <Button onclick={() => (playgroundOpen = true)}>Show side sheet</Button>
      <SideSheet headline={args.headline} bind:open={playgroundOpen}>
        <div class="flex flex-col gap-3 px-6 pb-6">
          <Body class="text-md-sys-color-on-surface-variant">
            Supplementary content and actions, anchored to the edge of the screen while the main
            content stays visible.
          </Body>
        </div>
      </SideSheet>
    </div>
  {/snippet}
</Story>
