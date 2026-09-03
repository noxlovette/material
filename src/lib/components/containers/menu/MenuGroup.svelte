<!--
@component
Groups related rows inside a `Menu` under an optional heading.

Wraps bits-ui's `DropdownMenu.Group` (and `DropdownMenu.GroupHeading` when
`heading` is supplied) so screen readers announce the rows as a labelled
set. Purely organizational — it renders no interactive behavior of its own.

@example
```svelte
<Menu label="Sort by">
  <MenuGroup heading="Name">
    <MenuItem>A to Z</MenuItem>
    <MenuItem>Z to A</MenuItem>
  </MenuGroup>
  <Divider class="my-1" />
  <MenuGroup heading="Date">
    <MenuItem>Newest first</MenuItem>
    <MenuItem>Oldest first</MenuItem>
  </MenuGroup>
</Menu>
```

@see https://m3.material.io/components/menus/guidelines
-->
<script lang="ts">
  import { DropdownMenu } from 'bits-ui';
  import { menu as menuCls } from './theme.js';
  import type { MenuGroupProps } from './types.js';

  let { heading, children, class: className }: MenuGroupProps = $props();

  const cls = $derived(menuCls());
</script>

<DropdownMenu.Group class={className}>
  {#if heading}
    <DropdownMenu.GroupHeading class={cls.groupHeading()}>
      {heading}
    </DropdownMenu.GroupHeading>
  {/if}
  {@render children()}
</DropdownMenu.Group>
