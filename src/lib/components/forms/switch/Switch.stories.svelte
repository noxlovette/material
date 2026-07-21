<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Switch from './Switch.svelte';

  const { Story } = defineMeta({
    title: 'Forms/Switch',
    component: Switch,
    argTypes: {
      checked: { control: 'boolean' },
      disabled: { control: 'boolean' },
      icons: {
        control: 'select',
        options: ['checked', 'both', 'none']
      }
    },
    args: {
      checked: false,
      disabled: false,
      icons: 'checked'
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class="p-6">
      <Switch {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Icon Modes" asChild>
  <div class="flex flex-col gap-4 p-6">
    <Switch checked icons="checked" />
    <Switch checked icons="both" />
    <Switch checked icons="none" />
  </div>
</Story>

<Story name="States" asChild>
  <div class="flex flex-col gap-4 p-6">
    <Switch checked={false} />
    <Switch checked={true} />
    <Switch checked={false} disabled />
    <Switch checked={true} disabled />
  </div>
</Story>
