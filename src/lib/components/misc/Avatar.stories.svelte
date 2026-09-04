<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Avatar from './Avatar.svelte';

  const { Story } = defineMeta({
    title: 'Misc/Avatar',
    component: Avatar,
    argTypes: {
      size: { control: 'select', options: ['sm', 'md', 'lg'] },
      seed: { control: 'text' },
      dicebearStyle: { control: 'text' }
    },
    args: {
      size: 'lg',
      seed: 'ogonek'
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <Avatar size={args.size} seed={args.seed} dicebearStyle={args.dicebearStyle} />
  {/snippet}
</Story>

<Story name="Sizes" asChild>
  <div class="flex items-end gap-4">
    <Avatar size="sm" seed="small" />
    <Avatar size="md" seed="medium" />
    <Avatar size="lg" seed="large" />
  </div>
</Story>

<Story name="Generated Fallback" asChild>
  <div class="flex items-end gap-4">
    <Avatar seed="alice" />
    <Avatar seed="bob" />
    <Avatar seed="carol" />
  </div>
</Story>

<Story name="With Image" asChild>
  <div class="flex items-end gap-4">
    <Avatar src="https://picsum.photos/seed/ogonek-1/200" alt="Sample user" />
    <Avatar
      src="https://this-url-does-not-resolve.example/broken.jpg"
      alt="Broken image"
      seed="fallback"
    />
  </div>
</Story>

<Story name="Clickable" asChild>
  <Avatar seed="clickable" onclick={() => console.log('Avatar clicked')} />
</Story>

<Story name="Animated" asChild>
  <div class="flex items-end gap-4">
    <Avatar seed="alice" dicebearStyle="gaze" tags={['animation']} />
    <Avatar seed="bob" dicebearStyle="shapes" tags={['animation']} />
    <Avatar seed="carol" dicebearStyle="blobs" tags={['animation']} />
  </div>
</Story>
