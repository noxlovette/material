<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ButtonIcon from './ButtonIcon.svelte';

  const variants = ['filled', 'tonal', 'outlined', 'standard'] as const;
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  const widths = ['narrow', 'default', 'wide'] as const;

  const { Story } = defineMeta({
    title: 'Buttons/Button Icon',
    component: ButtonIcon,
    argTypes: {
      variant: { control: 'select', options: variants },
      size: { control: 'select', options: sizes },
      width: { control: 'inline-radio', options: widths },
      shape: { control: 'inline-radio', options: ['round', 'square'] },
      variation: { control: 'inline-radio', options: ['default', 'toggle'] },
      disabled: { control: 'boolean' },
      loading: { control: 'boolean' }
    },
    args: {
      variant: 'filled',
      size: 'sm',
      width: 'default',
      shape: 'round',
      variation: 'default',
      disabled: false,
      loading: false,
      tooltipContent: 'Favourite',
      iconProps: { name: 'favorite' }
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <ButtonIcon {...args} iconProps={{ name: 'favorite' }} />
  {/snippet}
</Story>

<Story name="Colour styles" asChild>
  <div
    class="gap-spacing-200 p-spacing-300 grid grid-cols-[repeat(3,auto)] items-center justify-start"
  >
    {#each variants as variant (variant)}
      <ButtonIcon {variant} tooltipContent={variant} iconProps={{ name: 'settings' }} />
      <ButtonIcon
        {variant}
        variation="toggle"
        tooltipContent="{variant} toggle, unselected"
        iconProps={{ name: 'bookmark' }}
      />
      <ButtonIcon
        {variant}
        variation="toggle"
        pressed
        tooltipContent="{variant} toggle, selected"
        iconProps={{ name: 'bookmark' }}
      />
    {/each}
  </div>
</Story>

<Story name="Sizes and widths" asChild>
  <div class="gap-spacing-200 p-spacing-300 flex flex-col items-start">
    <p class="md-sys-typescale-body-medium text-md-sys-color-on-surface-variant max-w-lg">
      Per size: narrow, default and wide round buttons (fully round on their short side, so narrow
      is a vertical pill and wide a horizontal one), then a filled square button.
    </p>
    {#each sizes as size (size)}
      <div class="gap-spacing-200 flex items-center">
        {#each widths as width (width)}
          <ButtonIcon
            {size}
            {width}
            variant="tonal"
            tooltipContent="{size} {width}"
            iconProps={{ name: 'edit' }}
          />
        {/each}
        <ButtonIcon
          {size}
          shape="square"
          tooltipContent="{size} square"
          iconProps={{ name: 'edit' }}
        />
      </div>
    {/each}
  </div>
</Story>

<Story name="Disabled" asChild>
  <div class="gap-spacing-200 p-spacing-300 flex">
    {#each variants as variant (variant)}
      <ButtonIcon {variant} disabled aria-label={variant} iconProps={{ name: 'delete' }} />
    {/each}
  </div>
</Story>
