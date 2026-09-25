<script lang="ts">
  import Chip from './Chip.svelte';

  let { onRemove, disabled = false }: { onRemove: () => void; disabled?: boolean } = $props();
</script>

<Chip variant="input" {onRemove} {disabled} removeLabel="Remove Ada">Ada</Chip>
