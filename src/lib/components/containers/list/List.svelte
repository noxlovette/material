<script lang="ts">
  import clsx from 'clsx';
  import { list } from './theme.js';
  import { setListContext } from './context.js';
  import type { ListProps } from './types.js';

  let { variant = 'standard', class: className, children, ...restProps }: ListProps = $props();

  let element = $state<HTMLElement>();

  setListContext({
    get variant() {
      return variant;
    },
    get element() {
      return element;
    },
    from: null
  });
</script>

<ul bind:this={element} class={list({ variant, class: clsx(className) })} {...restProps}>
  {@render children?.()}
</ul>
