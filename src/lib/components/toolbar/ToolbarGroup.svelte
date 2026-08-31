<!--
@component
A toggle group within a Toolbar. Manages single or multiple selection.
-->
<script lang="ts">
  import { Toolbar } from 'bits-ui';
  import clsx from 'clsx';
  import { getContext } from 'svelte';
  import { toolbar, type ToolbarVariants } from './theme.js';
  import type { ToolbarGroupProps } from './types.js';

  let { children, disabled = false, class: className, ...restProps }: ToolbarGroupProps = $props();

  const toolbarCtx = getContext<{ orientation: ToolbarVariants['orientation'] } | undefined>(
    'toolbar'
  );

  const cls = $derived(toolbar({ orientation: toolbarCtx?.orientation }));
</script>

<Toolbar.Group {disabled} class={cls.group({ class: clsx(className) })} {...restProps}>
  {@render children?.()}
</Toolbar.Group>
