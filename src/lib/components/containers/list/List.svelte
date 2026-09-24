<script lang="ts">
  import clsx from 'clsx';
  import { list } from './theme.js';
  import { setListContext } from './context.js';
  import type { ListProps } from './types.js';

  let { variant = 'standard', class: className, children, ...restProps }: ListProps = $props();

  setListContext({
    get variant() {
      return variant;
    }
  });
</script>

<ul class={list({ variant, class: clsx(className) })} {...restProps}>
  {@render children?.()}
</ul>
