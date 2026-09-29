<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Textarea from './Textarea.svelte';

  const { Story } = defineMeta({
    title: 'Forms/Textarea',
    component: Textarea,
    argTypes: {
      label: { control: 'text' },
      variant: { control: 'select', options: ['filled', 'outlined'] },
      rows: { control: 'number' },
      maxRows: { control: 'number' },
      disabled: { control: 'boolean' },
      error: { control: 'boolean' },
      required: { control: 'boolean' },
      characterLimit: { control: 'number' }
    },
    args: {
      label: 'Message',
      variant: 'outlined',
      rows: 3,
      disabled: false,
      error: false,
      required: false
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class="p-spacing-300 max-w-md">
      <Textarea {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Filled and outlined" asChild>
  <div class="gap-spacing-300 p-spacing-300 flex max-w-md flex-col">
    <Textarea variant="filled" label="Filled" />
    <Textarea variant="outlined" label="Outlined" />
    <Textarea
      variant="filled"
      label="Filled with value"
      value={'Line one\nLine two\nLine three\nLine four grows the field.'}
    />
    <Textarea
      variant="outlined"
      label="Outlined with value"
      value={'Line one\nLine two\nLine three\nLine four grows the field.'}
    />
  </div>
</Story>

<Story name="Growing" asChild>
  <div class="gap-spacing-300 p-spacing-300 flex max-w-md flex-col">
    <Textarea label="Grows without limit" rows={2} />
    <Textarea label="Grows to 5 lines, then scrolls" rows={2} maxRows={5} />
    <Textarea label="Fixed at 4 lines" rows={4} maxRows={4} />
  </div>
</Story>

<Story name="Character Limit" asChild>
  <div class="p-spacing-300 max-w-md">
    <Textarea label="Bio" characterLimit={160} value="">
      {#snippet supportingText()}
        Tell people a little about yourself.
      {/snippet}
    </Textarea>
  </div>
</Story>

<Story name="With Icons" asChild>
  <div class="gap-spacing-300 p-spacing-300 flex max-w-md flex-col">
    <Textarea
      label="Notes"
      leadingIconProps={{ name: 'edit_note' }}
      trailingIconProps={{ name: 'close' }}
    />
    <Textarea
      variant="filled"
      label="Notes"
      leadingIconProps={{ name: 'edit_note' }}
      trailingIconProps={{ name: 'close' }}
    />
  </div>
</Story>

<Story name="States" asChild>
  <div class="gap-spacing-300 p-spacing-300 flex max-w-md flex-col">
    <Textarea label="Required" required />
    <Textarea label="Error" error value="Not quite right">
      {#snippet supportingText()}
        Describe the problem in at least 20 characters.
      {/snippet}
    </Textarea>
    <Textarea label="Disabled" disabled value="Can't edit" />
    <Textarea variant="filled" label="Disabled filled" disabled value="Can't edit" />
  </div>
</Story>
