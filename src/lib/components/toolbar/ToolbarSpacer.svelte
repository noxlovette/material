<!--
@component
A plain marker gap between `ToolbarSection`s under `<Toolbar sections>` — visually the same
as the toolbar's normal item spacing, it does not grow, so sections stay adjacent rather than
being pushed apart to opposite edges. (For pushing trailing children to the far edge of a
single segment, use `fabSlot`/the `fab` prop instead — that's a flex-`ml-auto` push, not this.)
-->
<script lang="ts">
  import clsx from 'clsx';
  import { toolbar } from './theme.js';
  import type { ToolbarSpacerProps } from './types.js';

  let { class: className, ...restProps }: ToolbarSpacerProps = $props();

  const cls = toolbar();
</script>

<div class={cls.spacer({ class: clsx(className) })} {...restProps}></div>
