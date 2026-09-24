<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Button from '../Button.svelte';
  import ButtonIcon from '../ButtonIcon.svelte';
  import Toggle from '../Toggle.svelte';
  import ButtonGroup from './ButtonGroup.svelte';

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  const { Story } = defineMeta({
    title: 'Buttons/Button Group',
    component: ButtonGroup,
    argTypes: {
      orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
      size: { control: 'select', options: sizes }
    },
    args: {
      orientation: 'horizontal',
      size: 'sm'
    }
  });
</script>

<script lang="ts">
  let playing = $state(false);
</script>

<Story name="Playground">
  {#snippet template(args)}
    <ButtonGroup orientation={args.orientation} size={args.size} aria-label="Playback">
      <Button size={args.size} variant="tonal">Back</Button>
      <Button size={args.size}>Play</Button>
      <Button size={args.size} variant="tonal">Next</Button>
    </ButtonGroup>
  {/snippet}
</Story>

<Story name="Mixed buttons" asChild>
  <div class="flex flex-col items-start gap-8 p-6">
    <ButtonGroup size="md" aria-label="Player">
      <ButtonIcon
        size="md"
        variant="tonal"
        width="wide"
        aria-label="Previous"
        iconProps={{ name: 'skip_previous' }}
      />
      <Toggle
        size="md"
        bind:pressed={playing}
        iconProps={{ name: playing ? 'pause' : 'play_arrow' }}
      >
        {playing ? 'Pause' : 'Play'}
      </Toggle>
      <ButtonIcon
        size="md"
        variant="tonal"
        width="wide"
        aria-label="Next"
        iconProps={{ name: 'skip_next' }}
      />
    </ButtonGroup>
    <ButtonGroup size="sm" aria-label="Call">
      <ButtonIcon
        variant="tonal"
        variation="toggle"
        aria-label="Mute"
        iconProps={{ name: 'mic' }}
      />
      <ButtonIcon
        variant="tonal"
        variation="toggle"
        aria-label="Camera"
        iconProps={{ name: 'videocam' }}
      />
      <ButtonIcon variant="outlined" aria-label="More" iconProps={{ name: 'more_vert' }} />
      <ButtonIcon width="wide" aria-label="End call" iconProps={{ name: 'call_end' }} />
    </ButtonGroup>
  </div>
</Story>

<Story name="Sizes" asChild>
  <div class="flex flex-col items-start gap-6 p-6">
    {#each sizes as size (size)}
      <ButtonGroup {size}>
        <Button {size} variant="tonal">One</Button>
        <Button {size}>Two</Button>
        <Button {size} variant="tonal">Three</Button>
      </ButtonGroup>
    {/each}
  </div>
</Story>

<Story name="Vertical" asChild>
  <div class="p-6">
    <ButtonGroup orientation="vertical">
      <Button variant="tonal">Top</Button>
      <Button variant="tonal">Middle</Button>
      <Button variant="tonal">Bottom</Button>
    </ButtonGroup>
  </div>
</Story>
