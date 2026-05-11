<!--
@component
Titles are smaller than headline styles and should be used for shorter, medium-emphasis text.
Follows Material 3 Title typography styles.

@see https://m3.material.io/styles/typography/overview#0384814d-f952-475a-a3a8-4447432163b8
-->
<script lang="ts">
  import clsx from 'clsx';

  import { title } from './theme.js';
  import type { TitleProps } from './types.js';

  let {
    children,
    emphasized,
    size = 'medium',
    class: className,
    ...restProps
  }: TitleProps = $props();

  let titleCls = $derived(title({ class: clsx(className), emphasized, size }));
</script>

<h3 {...restProps} class={titleCls}>
  {@render children()}
</h3>
