<script lang="ts">
  import { select as selectCls } from './theme.js';

  let {
    class: className
  }: {
    class?: string;
  } = $props();

  const cls = selectCls();
</script>

<div class={cls.separator({ class: className })} role="separator"></div>
