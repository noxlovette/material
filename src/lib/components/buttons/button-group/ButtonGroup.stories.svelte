<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Button from '../Button.svelte';
  import ButtonIcon from '../ButtonIcon.svelte';
  import ButtonGroup from './ButtonGroup.svelte';

  const { Story } = defineMeta({
    title: 'Buttons/Button Group',
    component: ButtonGroup,
    argTypes: {
      orientation: {
        control: 'select',
        options: ['horizontal', 'vertical']
      },
      size: {
        control: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl']
      }
    },
    args: {
      orientation: 'horizontal',
      size: 'sm'
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <ButtonGroup orientation={args.orientation} size={args.size}>
      <Button variant="tonal">Left</Button>
      <Button variant="tonal">Center</Button>
      <Button variant="tonal">Right</Button>
    </ButtonGroup>
  {/snippet}
</Story>

<Story name="Mixed Variants and Colors" asChild>
  <div class="p-6">
    <ButtonGroup size="sm">
      <Button variant="outlined">Cancel</Button>
      <Button variant="tonal" color="secondary">Save draft</Button>
      <Button variant="filled" color="primary">Publish</Button>
    </ButtonGroup>
  </div>
</Story>

<Story name="Icon Toolbar" asChild>
  <div class="flex flex-wrap gap-8 p-6">
    <ButtonGroup size="sm">
      <ButtonIcon variant="tonal" variation="toggle" iconProps={{ name: 'mic' }} />
      <ButtonIcon variant="tonal" variation="toggle" iconProps={{ name: 'videocam' }} />
      <ButtonIcon variant="tonal" iconProps={{ name: 'more_vert' }} />
      <ButtonIcon variant="filled" color="error" iconProps={{ name: 'call_end' }} />
    </ButtonGroup>
  </div>
</Story>

<Story name="Sizes" asChild>
  <div class="flex flex-wrap items-center gap-8 p-6">
    <ButtonGroup size="xs">
      <Button size="xs" variant="tonal">XS</Button>
      <Button size="xs" variant="tonal">XS</Button>
    </ButtonGroup>
    <ButtonGroup size="md">
      <Button size="md" variant="tonal">M</Button>
      <Button size="md" variant="tonal">M</Button>
    </ButtonGroup>
    <ButtonGroup size="xl">
      <Button size="xl" variant="tonal">XL</Button>
      <Button size="xl" variant="tonal">XL</Button>
    </ButtonGroup>
  </div>
</Story>

<Story name="Vertical" asChild>
  <div class="p-6">
    <ButtonGroup orientation="vertical" size="sm">
      <Button variant="tonal">Top</Button>
      <Button variant="tonal">Middle</Button>
      <Button variant="tonal">Bottom</Button>
    </ButtonGroup>
  </div>
</Story>
