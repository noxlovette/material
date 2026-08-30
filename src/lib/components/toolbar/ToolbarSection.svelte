<!--
@component
One independently painted cluster within a `<Toolbar sections>` — gets its own bg/shape/
elevation matching the parent Toolbar's variant/color. Combine with ToolbarSpacer to split
one toolbar into two or more visually separate surfaces.
-->
<script lang="ts">
  import clsx from 'clsx';
  import { getContext } from 'svelte';
  import { toolbar, type ToolbarVariants } from './theme.js';
  import type { ToolbarSectionProps } from './types.js';

  let { children, class: className, ...restProps }: ToolbarSectionProps = $props();

  const toolbarCtx = getContext<
    | {
        color: ToolbarVariants['color'];
        orientation: ToolbarVariants['orientation'];
        variant: ToolbarVariants['variant'];
      }
    | undefined
  >('toolbar');

  const cls = $derived(
    toolbar({
      orientation: toolbarCtx?.orientation,
      variant: toolbarCtx?.variant,
      color: toolbarCtx?.color
    })
  );
</script>

<div class={cls.segment({ class: clsx(className) })} {...restProps}>
  {@render children?.()}
</div>
