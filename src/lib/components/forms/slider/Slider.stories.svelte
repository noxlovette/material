<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Slider from './Slider.svelte';

  const { Story } = defineMeta({
    title: 'Forms/Slider',
    component: Slider,
    argTypes: {
      value: { control: 'number' },
      min: { control: 'number' },
      max: { control: 'number' },
      step: { control: 'number' },
      disabled: { control: 'boolean' },
      showValue: { control: 'boolean' },
      size: {
        control: 'select',
        options: ['xs', 's', 'm', 'l', 'xl']
      },
      stops: { control: 'boolean' },
      endStops: { control: 'boolean' },
      vertical: { control: 'boolean' }
    },
    args: {
      value: 40,
      min: 0,
      max: 100,
      disabled: false,
      showValue: true,
      size: 'xs',
      stops: false,
      endStops: true,
      vertical: false
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class="max-w-sm p-10">
      <Slider {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Sizes" asChild>
  <div class="flex max-w-sm flex-col gap-8 p-10">
    <Slider value={30} size="xs" />
    <Slider value={30} size="s" />
    <Slider value={30} size="m" />
    <Slider value={30} size="l" />
    <Slider value={30} size="xl" />
  </div>
</Story>

<Story name="With Icons" asChild>
  <div class="max-w-sm p-10">
    <Slider
      value={60}
      size="m"
      leadingIconProps={{ name: 'volume_down' }}
      trailingIconProps={{ name: 'volume_up' }}
    />
  </div>
</Story>

<Story name="Discrete With Stops" asChild>
  <div class="max-w-sm p-10">
    <Slider value={40} step={20} stops />
  </div>
</Story>

<Story name="Disabled" asChild>
  <div class="max-w-sm p-10">
    <Slider value={40} disabled />
  </div>
</Story>
