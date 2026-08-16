<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Divider from './Divider.svelte';
  import { Body } from '$lib/index.js';

  const { Story } = defineMeta({
    title: 'Containers/Divider',
    component: Divider,
    argTypes: {
      variant: { control: 'select', options: ['full', 'inset', 'wavy'] },
      orientation: { control: 'select', options: ['horizontal', 'vertical'] }
    },
    args: {
      variant: 'full',
      orientation: 'horizontal'
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class="w-96">
      <Divider variant={args.variant} orientation={args.orientation} />
    </div>
  {/snippet}
</Story>

<Story name="Full" asChild>
  <div class="w-96">
    <Divider variant="full" />
  </div>
</Story>

<Story name="Inset" asChild>
  <div class="w-96">
    <Divider variant="inset" />
  </div>
</Story>

<Story name="Wavy" asChild>
  <div class="w-96">
    <Divider variant="wavy" />
  </div>
</Story>

<Story name="With Label" asChild>
  <div class="w-96">
    <Divider>
      {#snippet children()}
        OR
      {/snippet}
    </Divider>
  </div>
</Story>

<Story name="Vertical" asChild>
  <div class="flex h-24 items-center gap-4">
    <Body>Left</Body>
    <Divider orientation="vertical" />
    <Body>Right</Body>
  </div>
</Story>
