<!--
  SideSheet has no `open` prop of its own — mounting it calls the native <dialog>'s showModal()
  immediately, so visibility is controlled by conditionally rendering the component
  ({#if open}<SideSheet ...>{/if}), same as BottomSheet. `close` is a required callback the
  sheet invokes on Esc or backdrop click — the consumer is expected to flip its own `open` flag
  to false in response.
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
      {#if playgroundOpen}
        <SideSheet headline={args.headline} close={() => (playgroundOpen = false)}>
          <div class="flex flex-col gap-3 px-6 pb-6">
            <Body class="text-md-sys-color-on-surface-variant">
              Supplementary content and actions, anchored to the edge of the screen while the main
              content stays visible.
            </Body>
          </div>
        </SideSheet>
      {/if}
    </div>
  {/snippet}
</Story>
