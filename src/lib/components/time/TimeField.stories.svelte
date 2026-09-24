<!--
  TimeField anchors its TimepickerInput overlay to the whole field via a bits-ui Popover
  (`customAnchor`), so the panel is portaled, flips above the field when there's no room below,
  and dismisses on outside click / Escape.
-->
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TimeField from './TimeField.svelte';

  const { Story } = defineMeta({
    title: 'Time/TimeField',
    tags: ['autodocs'],
    component: TimeField,
    argTypes: {
      label: { control: 'text' },
      disabled: { control: 'boolean' },
      error: { control: 'boolean' },
      required: { control: 'boolean' }
    },
    args: {
      label: 'Time',
      value: '09:30',
      disabled: false,
      error: false,
      required: false
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class="p-spacing-400 max-w-xs">
      <TimeField {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Near Bottom Edge" asChild>
  <div class="p-spacing-400 flex min-h-dvh max-w-xs flex-col justify-end">
    <TimeField label="Time" value="18:45" />
  </div>
</Story>
