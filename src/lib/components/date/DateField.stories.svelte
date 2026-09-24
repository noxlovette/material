<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DateField from './DateField.svelte';

  const { Story } = defineMeta({
    title: 'Date/DateField',
    tags: ['autodocs'],
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
    <div class="p-spacing-300 max-w-sm">
      <DateField {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Outlined States" asChild>
  <div class="gap-spacing-300 p-spacing-300 flex max-w-sm flex-col">
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
  <div class="gap-spacing-300 p-spacing-300 flex max-w-sm flex-col">
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
