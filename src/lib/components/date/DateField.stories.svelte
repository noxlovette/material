<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DateField from './DateField.svelte';

  const { Story } = defineMeta({
    title: 'Date/DateField',
    component: DateField,
    argTypes: {
      label: { control: 'text' },
      variant: { control: 'select', options: ['filled', 'outlined'] },
      disabled: { control: 'boolean' },
      error: { control: 'boolean' },
      required: { control: 'boolean' }
    },
    args: {
      label: 'Date of birth',
      variant: 'outlined',
      disabled: false,
      error: false,
      required: false
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class="max-w-sm p-6">
      <DateField {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Outlined States" asChild>
  <div class="flex max-w-sm flex-col gap-6 p-6">
    <DateField variant="outlined" label="Default" />
    <DateField variant="outlined" label="Required" required />
    <DateField variant="outlined" label="Error" error>
      {#snippet supportingText()}
        This field is required.
      {/snippet}
    </DateField>
    <DateField variant="outlined" label="Disabled" disabled />
  </div>
</Story>

<Story name="Filled States" asChild>
  <div class="flex max-w-sm flex-col gap-6 p-6">
    <DateField variant="filled" label="Default" />
    <DateField variant="filled" label="Required" required />
    <DateField variant="filled" label="Error" error>
      {#snippet supportingText()}
        This field is required.
      {/snippet}
    </DateField>
    <DateField variant="filled" label="Disabled" disabled />
  </div>
</Story>
