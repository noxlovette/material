<!--
@component
Display components are the largest text on the screen, reserved for short, important text or numerals.
Follows Material 3 Display typography styles.

@see https://m3.material.io/styles/typography/overview#08f23783-0941-4c74-9844-3d0da7e74287
-->
<script lang="ts">
  import clsx from 'clsx';

  import { display } from './theme.js';
  import type { DisplayProps } from './types.js';

  let {
    children,
    emphasized,
    size = 'medium',
    class: className,
    ...restProps
  }: DisplayProps = $props();

  let displayCls = $derived(display({ class: clsx(className), emphasized, size }));
</script>

<h1 {...restProps} class={displayCls}>
  {@render children()}
</h1>
