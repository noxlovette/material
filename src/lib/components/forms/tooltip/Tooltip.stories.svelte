<!--
  Tooltip only renders its content while open, and opening normally requires a real hover/focus
  interaction on the trigger. Each story below passes `isOpen={true}` so the tooltip renders open
  by default for visual review, without needing to hover in Storybook.
-->
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Tooltip from './Tooltip.svelte';
  import Button from '../../buttons/Button.svelte';

  const { Story } = defineMeta({
    title: 'Forms/Tooltip',
    component: Tooltip
  });
</script>

<Story name="Snack (Default)" asChild>
  <div class="p-24">
    <Tooltip supportingText="Add to library" isOpen={true}>
      {#snippet trigger(props)}
        <Button {...props} variant="filled" iconProps={{ name: 'add' }}>Add</Button>
      {/snippet}
    </Tooltip>
  </div>
</Story>

<Story name="Rich" asChild>
  <div class="p-24">
    <Tooltip
      variant="rich"
      style="container"
      subhead="Accessibility settings"
      supportingText="Adjust text size, contrast, and motion preferences."
      isOpen={true}
    >
      {#snippet trigger(props)}
        <Button {...props} variant="outlined">Settings</Button>
      {/snippet}
    </Tooltip>
  </div>
</Story>

<Story name="Rich — All Styles" asChild>
  <div class="flex flex-wrap gap-24 p-24">
    <Tooltip
      variant="rich"
      style="container"
      subhead="Container"
      supportingText="bg-surface-container"
      isOpen={true}
    >
      {#snippet trigger(props)}
        <Button {...props} variant="outlined">Container</Button>
      {/snippet}
    </Tooltip>
    <Tooltip
      variant="rich"
      style="primary"
      subhead="Primary"
      supportingText="bg-primary-container"
      isOpen={true}
    >
      {#snippet trigger(props)}
        <Button {...props} variant="outlined">Primary</Button>
      {/snippet}
    </Tooltip>
    <Tooltip
      variant="rich"
      style="secondary"
      subhead="Secondary"
      supportingText="bg-secondary-container"
      isOpen={true}
    >
      {#snippet trigger(props)}
        <Button {...props} variant="outlined">Secondary</Button>
      {/snippet}
    </Tooltip>
    <Tooltip
      variant="rich"
      style="tertiary"
      subhead="Tertiary"
      supportingText="bg-tertiary-container"
      isOpen={true}
    >
      {#snippet trigger(props)}
        <Button {...props} variant="outlined">Tertiary</Button>
      {/snippet}
    </Tooltip>
  </div>
</Story>
