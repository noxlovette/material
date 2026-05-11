<script lang="ts">
    import { App } from "$lib";
  import "../app.css";
  let { children } = $props();
</script>

<App>
{@render children()}
</App>
