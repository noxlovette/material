<!--
@component
Toolbar provides a horizontal (or vertical) container for grouped actions.

@see https://m3.material.io/components/toolbars
-->
<script lang="ts">
  import { Toolbar } from 'bits-ui';
  import clsx from 'clsx';
  import { toolbar } from './theme.js';
  import type { ToolbarProps } from './types.js';

  let {
    children,
    orientation = 'horizontal',
    loop = true,
    class: className,
    ...restProps
  }: ToolbarProps = $props();

  const cls = $derived(toolbar({ orientation }));
</script>

<Toolbar.Root {orientation} {loop} class={cls.root({ class: clsx(className) })} {...restProps}>
  {@render children?.()}
</Toolbar.Root>
