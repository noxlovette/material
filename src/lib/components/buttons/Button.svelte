<!--
@component
Buttons prompt most actions in a UI.

- Filled: final or unblocking actions (default)
- Tonal: important actions a step below filled
- Elevated: only to stand apart from a patterned background
- Outlined: attention without being primary, or a way out of a flow
- Text: optional actions

For a two-state button use `Toggle`.

@see https://m3.material.io/components/buttons/specs
-->
<script lang="ts">
  import type { ButtonProps } from './types.js';
  import { Icon, LoadingIndicator, Layer } from '$lib/utils/index.js';
  import { button, buttonColor } from './theme.js';
  import clsx from 'clsx';
  import { buttonCorners, shapeMorph } from './shapeMorph.js';
  import { Button, type ButtonRootProps } from 'bits-ui';

  let {
    children,
    iconProps,
    variant = 'filled',
    size = 'sm',
    shape = 'round',
    disabled,
    formaction,
    loading,
    class: className,
    ...restProps
  }: ButtonProps = $props();

  let ref = $state<HTMLElement | null>(null);
  $effect(() => (ref ? shapeMorph(ref, buttonCorners) : undefined));

  const cls = $derived(button({ variant, size, shape }));
  const btnCls = $derived(
    cls.base({ class: clsx(buttonColor({ variant, state: 'default' }), className) })
  );
</script>

<Button.Root
  bind:ref
  {disabled}
  {formaction}
  class={btnCls}
  aria-busy={loading || undefined}
  data-cy="m3-button"
  {...restProps as ButtonRootProps}
>
  {#if loading}
    <LoadingIndicator center={false} class={cls.icon({ class: 'text-current' })} />
  {:else if iconProps}
    <Icon {...iconProps} class={cls.icon({ class: clsx(iconProps.class) })} />
  {/if}
  {#if !loading || iconProps}
    {@render children?.()}
  {/if}
  <Layer />
</Button.Root>
