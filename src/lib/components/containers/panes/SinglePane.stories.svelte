<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SinglePane from './SinglePane.svelte';

  const { Story } = defineMeta({
    title: 'Containers/Single Pane',
    component: SinglePane,
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

<Story name="Playground">
  {#snippet template(args)}
    <SinglePane
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
    </SinglePane>
  {/snippet}
</Story>

<Story name="Centered Widths" asChild>
  <div class="flex flex-col gap-6">
    <SinglePane centered="narrow" background={false}>
      <div class="bg-md-sys-color-secondary-container rounded-lg p-4 text-sm">narrow</div>
    </SinglePane>
    <SinglePane centered="medium" background={false}>
      <div class="bg-md-sys-color-secondary-container rounded-lg p-4 text-sm">medium</div>
    </SinglePane>
    <SinglePane centered="none" background={false}>
      <div class="bg-md-sys-color-secondary-container rounded-lg p-4 text-sm">
        none (full width)
      </div>
    </SinglePane>
  </div>
</Story>
