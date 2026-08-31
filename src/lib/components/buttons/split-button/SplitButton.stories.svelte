<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import MenuItem from '$lib/components/containers/menu/menu-item/MenuItem.svelte';
  import SplitButton from './SplitButton.svelte';

  const { Story } = defineMeta({
    title: 'Buttons/Split Button',
    component: SplitButton,
    argTypes: {
      variant: {
        control: 'select',
        options: ['elevated', 'filled', 'tonal', 'outlined', 'text']
      },
      color: {
        control: 'select',
        options: ['default', 'primary', 'secondary', 'tertiary', 'error']
      },
      size: {
        control: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl']
      }
    },
    args: {
      variant: 'filled',
      color: 'default',
      size: 'md'
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <SplitButton variant={args.variant} color={args.color} size={args.size}>
      {#snippet children()}
        Reply
      {/snippet}
      {#snippet menuChildren()}
        <MenuItem iconProps={{ name: 'reply_all' }}>Reply all</MenuItem>
        <MenuItem iconProps={{ name: 'forward' }}>Forward</MenuItem>
      {/snippet}
    </SplitButton>
  {/snippet}
</Story>

<Story name="WithLeadingIcon" asChild>
  <div class="p-6">
    <SplitButton iconProps={{ name: 'send' }}>
      {#snippet children()}
        Send
      {/snippet}
      {#snippet menuChildren()}
        <MenuItem iconProps={{ name: 'schedule_send' }}>Send later</MenuItem>
        <MenuItem iconProps={{ name: 'drafts' }}>Save as draft</MenuItem>
      {/snippet}
    </SplitButton>
  </div>
</Story>

<Story name="Variants" asChild>
  <div class="flex flex-wrap items-center gap-6 p-6">
    {#each ['elevated', 'filled', 'tonal', 'outlined', 'text'] as const as variant (variant)}
      <SplitButton {variant}>
        {#snippet children()}
          Reply
        {/snippet}
        {#snippet menuChildren()}
          <MenuItem iconProps={{ name: 'reply_all' }}>Reply all</MenuItem>
          <MenuItem iconProps={{ name: 'forward' }}>Forward</MenuItem>
        {/snippet}
      </SplitButton>
    {/each}
  </div>
</Story>

<Story name="Sizes" asChild>
  <div class="flex flex-wrap items-center gap-6 p-6">
    {#each ['xs', 'sm', 'md', 'lg', 'xl'] as const as size (size)}
      <SplitButton {size}>
        {#snippet children()}
          Reply
        {/snippet}
        {#snippet menuChildren()}
          <MenuItem iconProps={{ name: 'reply_all' }}>Reply all</MenuItem>
          <MenuItem iconProps={{ name: 'forward' }}>Forward</MenuItem>
        {/snippet}
      </SplitButton>
    {/each}
  </div>
</Story>

<Story name="Disabled" asChild>
  <div class="p-6">
    <SplitButton disabled>
      {#snippet children()}
        Reply
      {/snippet}
      {#snippet menuChildren()}
        <MenuItem iconProps={{ name: 'reply_all' }}>Reply all</MenuItem>
        <MenuItem iconProps={{ name: 'forward' }}>Forward</MenuItem>
      {/snippet}
    </SplitButton>
  </div>
</Story>
