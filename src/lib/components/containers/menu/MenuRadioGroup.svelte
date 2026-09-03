<!--
@component
Restricts a set of `MenuRadioItem`s to a single selected value at a time.

Wraps bits-ui's `DropdownMenu.RadioGroup`. Bind `value` to drive the
selection externally, or leave it uncontrolled and read `onValueChange`.

@example
```svelte
<script>
  let sortBy = $state('name');
</script>

<Menu label="Sort by">
  <MenuRadioGroup bind:value={sortBy}>
    <MenuRadioItem value="name">Name</MenuRadioItem>
    <MenuRadioItem value="date">Date modified</MenuRadioItem>
    <MenuRadioItem value="size">Size</MenuRadioItem>
  </MenuRadioGroup>
</Menu>
```

@see https://m3.material.io/components/menus/guidelines
-->
<script lang="ts">
  import { DropdownMenu } from 'bits-ui';
  import type { MenuRadioGroupProps } from './types.js';

  let {
    value = $bindable(''),
    onValueChange,
    children,
    class: className
  }: MenuRadioGroupProps = $props();
</script>

<DropdownMenu.RadioGroup bind:value {onValueChange} class={className}>
  {@render children()}
</DropdownMenu.RadioGroup>
