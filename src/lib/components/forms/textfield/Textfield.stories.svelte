<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Textfield from './Textfield.svelte';

  const { Story } = defineMeta({
    title: 'Forms/Textfield',
    component: Textfield,
    argTypes: {
      label: { control: 'text' },
      placeholder: { control: 'text' },
      variant: { control: 'select', options: ['filled', 'outlined'] },
      disabled: { control: 'boolean' },
      error: { control: 'boolean' },
      required: { control: 'boolean' },
      characterLimit: { control: 'number' }
    },
    args: {
      label: 'Label',
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
      <Textfield {...args} />
    </div>
  {/snippet}
</Story>

<Story name="With Supporting Text" asChild>
  <div class="p-spacing-300 max-w-sm">
    <Textfield label="Email">
      {#snippet supportingText()}
        We'll never share your email.
      {/snippet}
    </Textfield>
  </div>
</Story>

<Story name="With Icons" asChild>
  <div class="p-spacing-300 max-w-sm">
    <Textfield
      label="Search"
      leadingIconProps={{ name: 'search' }}
      trailingIconProps={{ name: 'close' }}
    />
  </div>
</Story>

<Story name="Character Limit" asChild>
  <div class="p-spacing-300 max-w-sm">
    <Textfield label="Bio" characterLimit={80} value="">
      {#snippet supportingText()}
        Keep it short.
      {/snippet}
    </Textfield>
  </div>
</Story>

<Story name="States" asChild>
  <div class="gap-spacing-300 p-spacing-300 flex max-w-sm flex-col">
    <Textfield label="Default" />
    <Textfield label="Required" required />
    <Textfield label="Error" error value="Invalid value">
      {#snippet supportingText()}
        This field is required.
      {/snippet}
    </Textfield>
    <Textfield label="Disabled" disabled value="Can't edit" />
  </div>
</Story>

<Story name="Outlined" asChild>
  <div class="gap-spacing-300 p-spacing-300 flex max-w-sm flex-col">
    <Textfield variant="outlined" label="Default" />
    <Textfield variant="outlined" label="With value" value="Hello" />
    <Textfield variant="outlined" label="Required" required />
    <Textfield variant="outlined" label="Error" error value="Invalid value">
      {#snippet supportingText()}
        This field is required.
      {/snippet}
    </Textfield>
    <Textfield variant="outlined" label="Disabled" disabled value="Can't edit" />
    <Textfield
      variant="outlined"
      label="Search"
      leadingIconProps={{ name: 'search' }}
      trailingIconProps={{ name: 'close' }}
    />
  </div>
</Story>
