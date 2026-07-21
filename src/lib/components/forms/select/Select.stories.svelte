<!--
  NOTE: Select.svelte renders its Content entirely from the `options` prop — it does not
  expose a `children` snippet, so SelectItem/SelectGroup/SelectLabel/SelectSeparator cannot
  be composed as children of <Select> (unlike Navbar+NavbarItem). Those four are themed
  primitives for consumers who build a custom dropdown directly against bits-ui's
  Select.Root instead of this component. The Playground below uses the actual `options`
  API, which is how this component is meant to be driven.
-->
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Select from './Select.svelte';
  import type { SelectOption } from './types.js';

  const fruitOptions: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date', disabled: true }
  ];

  const groupedOptions: SelectOption[] = [
    {
      type: 'group',
      heading: 'Citrus',
      items: [
        { value: 'orange', label: 'Orange' },
        { value: 'lemon', label: 'Lemon' }
      ]
    },
    {
      type: 'group',
      heading: 'Berries',
      items: [
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'blueberry', label: 'Blueberry' }
      ]
    }
  ];

  const { Story } = defineMeta({
    title: 'Forms/Select',
    component: Select,
    argTypes: {
      placeholder: { control: 'text' },
      disabled: { control: 'boolean' },
      error: { control: 'boolean' }
    },
    args: {
      type: 'single',
      placeholder: 'Choose a fruit',
      disabled: false,
      error: false,
      options: fruitOptions
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class="max-w-sm p-6">
      <Select {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Grouped Options" asChild>
  <div class="max-w-sm p-6">
    <Select type="single" placeholder="Choose a fruit" options={groupedOptions} />
  </div>
</Story>

<Story name="With Leading Icon" asChild>
  <div class="max-w-sm p-6">
    <Select
      type="single"
      placeholder="Choose a fruit"
      options={fruitOptions}
      leadingIconProps={{ name: 'nutrition' }}
    />
  </div>
</Story>

<Story name="States" asChild>
  <div class="flex max-w-sm flex-col gap-6 p-6">
    <Select type="single" placeholder="Default" options={fruitOptions} />
    <Select type="single" placeholder="Error" options={fruitOptions} error value="apple" />
    <Select type="single" placeholder="Disabled" options={fruitOptions} disabled />
  </div>
</Story>
