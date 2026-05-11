<script lang="ts">
  import clsx from "clsx";
  import type { IconProps } from "./types.js";

  const {
    name,
    variant = "rounded",
    fill = 0,
    wght = 400,
    grad = 0,
    opsz = 24,
    class: className = "size-6 text-[24px]",
  }: IconProps = $props();

  const wrapperClass = "inline-flex items-center justify-center leading-none";
</script>

<div class={clsx(className, wrapperClass)}>
  <span
    class="material-symbols-{variant}"
    style="font-size: 1em; font-variation-settings: 'FILL' {fill}, 'wght' {wght}, 'GRAD' {grad}, 'opsz' {opsz};"
    >{name}</span
  >
</div>
