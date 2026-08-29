<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Pane from './Pane.svelte';

  const { Story } = defineMeta({
    title: 'Containers/Pane',
    component: Pane,
    argTypes: {
      centered: {
        control: 'select',
        options: ['none', 'narrow', 'medium']
      },
      padding: {
        control: 'select',
        options: ['none', 'sm', 'md', 'lg']
      },
      gap: {
        control: 'select',
        options: ['none', 'sm', 'md', 'lg', 'xl']
      },
      background: { control: 'boolean' },
      full: { control: 'boolean' },
      rounded: { control: 'boolean' }
    },
    args: {
      centered: 'medium',
      padding: 'md',
      gap: 'md',
      background: true,
      full: false,
      rounded: true
    }
  });
</script>

<!-- Standalone usage: a single page-level content region, the same role SinglePane used to play. -->
<Story name="Standalone">
  {#snippet template(args)}
    <Pane
      centered={args.centered}
      padding={args.padding}
      gap={args.gap}
      background={args.background}
      full={args.full}
      rounded={args.rounded}
    >
      <div class="bg-md-sys-color-surface-container-high rounded-lg p-6">Block one</div>
      <div class="bg-md-sys-color-surface-container-high rounded-lg p-6">Block two</div>
      <div class="bg-md-sys-color-surface-container-high rounded-lg p-6">Block three</div>
    </Pane>
  {/snippet}
</Story>

<Story name="Centered Widths" asChild>
  <div class="flex flex-col gap-6">
    <Pane centered="narrow" background={false}>
      <div class="bg-md-sys-color-secondary-container rounded-lg p-4 text-sm">narrow</div>
    </Pane>
    <Pane centered="medium" background={false}>
      <div class="bg-md-sys-color-secondary-container rounded-lg p-4 text-sm">medium</div>
    </Pane>
    <Pane centered="none" background={false}>
      <div class="bg-md-sys-color-secondary-container rounded-lg p-4 text-sm">
        none (full width)
      </div>
    </Pane>
  </div>
</Story>

<!--
  As a PaneGrid child: an unset `width` makes a pane flexible (grows to fill
  remaining space). See PaneGrid's own stories for direction/gap/margin/resizable
  demos — this story is scoped to Pane's own props.
-->
<Story name="As Grid Item" asChild>
  <div
    class="relative h-[280px] overflow-hidden rounded-lg border border-md-sys-color-outline-variant"
  >
    <div class="flex h-full">
      <Pane width={200} background={false} padding="sm">
        <div class="bg-md-sys-color-secondary-container h-full rounded-lg p-4 text-sm">
          width=200 (fixed)
        </div>
      </Pane>
      <Pane background={false} padding="sm">
        <div class="bg-md-sys-color-surface-container-high h-full rounded-lg p-4 text-sm">
          width unset (flexible, grows)
        </div>
      </Pane>
    </div>
  </div>
</Story>
