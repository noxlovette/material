<!--
  Popover owns its own open/close state internally (bits-ui Popover.Root bind:open, defaulting to
  closed) and requires a `trigger` snippet — clicking that trigger toggles it, so no external open
  state is needed here (same as Menu).
-->
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Popover from './Popover.svelte';
  import Button from '../../buttons/Button.svelte';
  import ButtonIcon from '../../buttons/ButtonIcon.svelte';
  import { Body } from '$lib/index.js';

  const { Story } = defineMeta({
    title: 'Containers/Popover',
    component: Popover,
    argTypes: {
      title: { control: 'text' },
      showClose: { control: 'boolean' },
      side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
      align: { control: 'select', options: ['start', 'center', 'end'] },
      sideOffset: { control: 'number' }
    },
    args: {
      title: 'Storage',
      showClose: true,
      side: 'bottom',
      align: 'start',
      sideOffset: 8
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class="p-24">
      <Popover
        title={args.title}
        showClose={args.showClose}
        side={args.side}
        align={args.align}
        sideOffset={args.sideOffset}
      >
        {#snippet trigger()}
          <Button variant="outlined">Show info</Button>
        {/snippet}
        <Body class="text-md-sys-color-on-surface-variant">
          75% of your storage has been used. Consider upgrading your plan.
        </Body>
      </Popover>
    </div>
  {/snippet}
</Story>

<Story name="Icon Trigger, No Title" asChild>
  <div class="p-24">
    <Popover showClose={false}>
      {#snippet trigger()}
        <ButtonIcon iconProps={{ name: 'info' }} variant="text" />
      {/snippet}
      <Body class="text-md-sys-color-on-surface-variant">
        A minimal popover with no header — just an icon trigger and body text.
      </Body>
    </Popover>
  </div>
</Story>
