<script lang="ts">
  import { Select } from 'bits-ui';
  import type { Snippet } from 'svelte';

  import { select as selectCls } from './theme.js';

  let {
    children,
    class: className
  }: {
    children: Snippet;
    class?: string;
  } = $props();

  const cls = selectCls();
</script>

<Select.GroupHeading class={cls.groupLabel({ class: className })}>
  {@render children()}
</Select.GroupHeading>
