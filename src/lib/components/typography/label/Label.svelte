<!--
@component
Label components are used for things like components' labels or very small text, such as captions.
Follows Material 3 Label typography styles.

@see https://m3.material.io/styles/typography/overview#0624647c-2187-4d7a-b51c-8b820a469146
-->
<script lang="ts">
  import clsx from 'clsx';

  import { label } from './theme.js';
  import type { LabelProps } from './types.js';

  let {
    children,
    size = 'medium',
    emphasized,
    class: className,
    ...restProps
  }: LabelProps = $props();
</script>

<p {...restProps} class={label({ class: clsx(className), emphasized, size })}>
  {@render children()}
</p>
