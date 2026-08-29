<!--
  `position="absolute"` anchors Kbd to the bottom-right corner of a `relative` ancestor (and is
  hidden below the `md` breakpoint) — typically used to show a keyboard shortcut hint inside a
  search/command input. `position="relative"` renders it inline instead.
-->
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Kbd from './Kbd.svelte';

  const { Story } = defineMeta({
    title: 'Typography/Kbd',
    component: Kbd,
    argTypes: {
      position: { control: 'select', options: ['relative', 'absolute'] }
    },
    args: {
      position: 'relative'
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <Kbd position={args.position}>⌘K</Kbd>
  {/snippet}
</Story>

<Story name="Inline Shortcut" asChild>
  <p class="md-sys-typescale-body-medium text-md-sys-color-on-surface">
    Press <Kbd position="relative">⌘K</Kbd> to open the command palette.
  </p>
</Story>

<Story name="Anchored in a Search Field" asChild>
  <div
    class="relative flex h-12 w-80 items-center rounded-full bg-md-sys-color-surface-container-high px-4 md-sys-typescale-body-large text-md-sys-color-on-surface-variant"
  >
    Search...
    <Kbd position="absolute">⌘K</Kbd>
  </div>
</Story>
