<!--
@component
Kbd component is used to display keyboard shortcuts or hints.
-->
<script lang="ts">
  import clsx from 'clsx';

  import { kbd } from './theme.js';
  import type { KbdProps } from './types.js';

  let { children, position = 'absolute', class: className, ...restProps }: KbdProps = $props();

  const kbdCls = $derived(kbd({ class: clsx(className), position }));
</script>

<kbd {...restProps} class={kbdCls}>
  {@render children()}
</kbd>
