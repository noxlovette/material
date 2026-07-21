<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Checkbox from './Checkbox.svelte';

  const { Story } = defineMeta({
    title: 'Forms/Checkbox',
    component: Checkbox,
    argTypes: {
      labelText: { control: 'text' },
      checked: { control: 'boolean' },
      indeterminate: { control: 'boolean' },
      disabled: { control: 'boolean' },
      error: { control: 'boolean' }
    },
    args: {
      labelText: 'Accept terms and conditions',
      checked: false,
      indeterminate: false,
      disabled: false,
      error: false
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class="p-6">
      <Checkbox {...args} />
    </div>
  {/snippet}
</Story>

<Story name="States" asChild>
  <div class="flex flex-col gap-4 p-6">
    <Checkbox labelText="Unchecked" checked={false} />
    <Checkbox labelText="Checked" checked={true} />
    <Checkbox labelText="Indeterminate" indeterminate={true} />
    <Checkbox labelText="Error" checked={true} error />
    <Checkbox labelText="Disabled unchecked" disabled />
    <Checkbox labelText="Disabled checked" checked disabled />
  </div>
</Story>
