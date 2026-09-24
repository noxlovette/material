<!--
@component
A header cell (`<th>`). Supports sort indicators via `sortable`, `sorted`,
and `sortDirection` props. Defaults to `scope="col"`.
-->
<script lang="ts">
  import type { TableHeaderProps } from './types.js';
  import { table } from './theme.js';
  import { Icon } from '$lib/utils/index.js';
  import clsx from 'clsx';

  let {
    children,
    numeric = false,
    align,
    sortable = false,
    sorted = false,
    sortDirection = 'asc',
    scope = 'col',
    class: className,
    ...restProps
  }: TableHeaderProps = $props();

  const { header } = $derived(table({ numeric, align, sortable, sorted }));
</script>

<th {scope} class={header({ class: clsx(className) })} {...restProps}>
  <span class="gap-spacing-50 inline-flex items-center">
    {@render children?.()}
    {#if sortable}
      <span
        class={[
          'md-sys-motion-fast-spatial transition-[opacity,transform]',
          sorted ? 'opacity-100' : 'opacity-0 group-hover:opacity-40',
          sortDirection === 'desc' ? 'rotate-180' : 'rotate-0'
        ].join(' ')}
        aria-hidden="true"
      >
        <Icon name="arrow_upward" class="size-[18px] text-[18px]" />
      </span>
    {/if}
  </span>
</th>
