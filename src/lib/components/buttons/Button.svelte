<!--
@component
Buttons help people take actions, such as sending an email, sharing a document, or liking a comment.

- Filled: High emphasis
- Tonal: Medium-high emphasis
- Outlined: Medium emphasis
- Text: Low emphasis
- Elevated: High emphasis

@see https://m3.material.io/components/all-buttons
-->
<script lang="ts">
  import type { ButtonMDProps } from './types.js';
  import { Icon, LoadingIndicator, Layer } from '$lib/utils/index.js';
  import { button } from './theme.js';
  import clsx from 'clsx';
  import { Button, type ButtonRootProps } from 'bits-ui';

  let {
    children,
    iconProps,
    variant = 'filled',
    color = 'default',
    size = 'md',
    shape = 'round',
    disabled,
    selected,
    formaction,
    loading,
    class: className,
    ...restProps
  }: ButtonMDProps = $props();

  const { base, icon } = $derived(button({ variant, color, shape, size, selected }));
  const btnCls = $derived(base({ class: clsx(className) }));
</script>

<Button.Root
  {disabled}
  {formaction}
  class={btnCls}
  data-cy="m3-button"
  {...restProps as ButtonRootProps}
>
  {#if iconProps}
    {#if loading}
      <LoadingIndicator container={variant === 'filled'} class={icon()} />
    {:else}
      <Icon class={icon()} {...iconProps} />
      {@render children?.()}
    {/if}
  {:else if loading}
    <LoadingIndicator container={variant === 'filled'} />
  {:else}
    {@render children?.()}
  {/if}
  <Layer />
</Button.Root>
