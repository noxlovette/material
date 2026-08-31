<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DateRangeField from './DateRangeField.svelte';

  const { Story } = defineMeta({
    title: 'Date/DateRangeField',
    component: DateRangeField,
    argTypes: {
      variant: { control: 'select', options: ['filled', 'outlined'] },
      disabled: { control: 'boolean' },
      error: { control: 'boolean' },
      required: { control: 'boolean' }
    },
    args: {
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
      <DateRangeField {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Outlined States" asChild>
  <div class="flex max-w-sm flex-col gap-6 p-6">
    <DateRangeField variant="outlined" />
    <DateRangeField variant="outlined" error>
      {#snippet supportingText()}
        This field is required.
      {/snippet}
    </DateRangeField>
    <DateRangeField variant="outlined" disabled />
  </div>
</Story>

<Story name="Filled States" asChild>
  <div class="flex max-w-sm flex-col gap-6 p-6">
    <DateRangeField variant="filled" />
    <DateRangeField variant="filled" error>
      {#snippet supportingText()}
        This field is required.
      {/snippet}
    </DateRangeField>
    <DateRangeField variant="filled" disabled />
  </div>
</Story>
