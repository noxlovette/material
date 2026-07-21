<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Textfield from './Textfield.svelte';

  const { Story } = defineMeta({
    title: 'Forms/Textfield',
    component: Textfield,
    argTypes: {
      label: { control: 'text' },
      placeholder: { control: 'text' },
      disabled: { control: 'boolean' },
      error: { control: 'boolean' },
      required: { control: 'boolean' },
      characterLimit: { control: 'number' }
    },
    args: {
      label: 'Label',
      disabled: false,
      error: false,
      required: false
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class="max-w-sm p-6">
      <Textfield {...args} />
    </div>
  {/snippet}
</Story>

<Story name="With Supporting Text" asChild>
  <div class="max-w-sm p-6">
    <Textfield label="Email">
      {#snippet supportingText()}
        We'll never share your email.
      {/snippet}
    </Textfield>
  </div>
</Story>

<Story name="With Icons" asChild>
  <div class="max-w-sm p-6">
    <Textfield
      label="Search"
      leadingIconProps={{ name: 'search' }}
      trailingIconProps={{ name: 'close' }}
    />
  </div>
</Story>

<Story name="Character Limit" asChild>
  <div class="max-w-sm p-6">
    <Textfield label="Bio" characterLimit={80} value="">
      {#snippet supportingText()}
        Keep it short.
      {/snippet}
    </Textfield>
  </div>
</Story>

<Story name="States" asChild>
  <div class="flex max-w-sm flex-col gap-6 p-6">
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
