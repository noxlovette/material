<!--
@component
An invisible, flex-growing gap. Inside a single toolbar segment, pushes trailing children
to the far edge (the same trick `fabSlot` uses internally). Between `ToolbarSection`s under
`<Toolbar sections>`, it's what pushes the independently painted clusters apart.
-->
<script lang="ts">
  import clsx from 'clsx';
  import { toolbar } from './theme.js';
  import type { ToolbarSpacerProps } from './types.js';

  let { class: className, ...restProps }: ToolbarSpacerProps = $props();

  const cls = toolbar();
</script>

<div class={cls.spacer({ class: clsx(className) })} {...restProps}></div>
