<!--
@component
Cards contain content and actions about a single subject.

Material 3 cards come in three types: elevated, filled, and outlined.
They can be used to display information, provide a way for users to interact with it,
and serve as an entry point to more detailed information.

@see https://m3.material.io/components/cards/overview
-->
<script lang="ts">
  import type { CardProps } from './types.js';
  import { card } from './theme.js';
  import clsx from 'clsx';
  import { Layer } from '$lib/utils/index.js';

  let {
    children,
    type = 'filled',
    padding = 'md',
    class: className,
    href,
    onselect,
    ondelete,
    hoverable = !!href || !!onselect || !!ondelete,
    selected = false,
    onclick: onclickProp,
    onkeydown: onkeydownProp,
    ...restProps
  }: CardProps = $props();

  const selectable = $derived(!!onselect || !!ondelete);

  const { base } = $derived(card({ type, hoverable, padding, selected }));

  const handleClick: (event: MouseEvent) => void = (event) => {
    (onclickProp as ((event: MouseEvent) => void) | undefined)?.(event);
    onselect?.();
  };

  const handleKeydown: (event: KeyboardEvent) => void = (event) => {
    (onkeydownProp as ((event: KeyboardEvent) => void) | undefined)?.(event);
    if (event.target !== event.currentTarget) return;
    if (onselect && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onselect();
    } else if (ondelete && (event.key === 'Delete' || event.key === 'Backspace')) {
      event.preventDefault();
      ondelete();
    }
  };
</script>

{#snippet content()}
  {#if hoverable}<Layer />{/if}
  {@render children?.()}
{/snippet}

{#if href}
  <a
    {href}
    class={base({ class: clsx(className) })}
    data-cy="m3-card"
    tabindex={selectable ? 0 : undefined}
    {...restProps}
    onclick={handleClick}
    onkeydown={handleKeydown}
  >
    {@render content()}
  </a>
{:else if selectable}
  <div
    class={base({ class: clsx(className) })}
    data-cy="m3-card"
    role="button"
    tabindex={0}
    aria-pressed={selected}
    {...restProps}
    onclick={handleClick}
    onkeydown={handleKeydown}
  >
    {@render content()}
  </div>
{:else}
  <div
    class={base({ class: clsx(className) })}
    data-cy="m3-card"
    {...restProps}
    onclick={handleClick}
    onkeydown={handleKeydown}
  >
    {@render content()}
  </div>
{/if}
