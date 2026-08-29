<!--
@component
InputMerger is a container that groups multiple input components together visually.
-->
<script lang="ts">
  import { inputMerger } from './theme.js';

  interface Props {
    /**
     * The input components to be merged.
     */
    children: import('svelte').Snippet;
    /**
     * Additional CSS classes for the container.
     */
    class?: string;
  }

  let { children, class: className = '' }: Props = $props();
</script>

<div class={inputMerger({ class: className })}>
  {@render children()}
</div>
