<script lang="ts">
  let { code }: { code: string } = $props();
  let copied = $state(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }
</script>

<div class="bg-md-sys-color-surface-container-highest relative overflow-hidden rounded-xl">
  <pre
    class="text-md-sys-color-on-surface overflow-x-auto p-5 pr-16 font-mono text-sm leading-relaxed">{code}</pre>
  <button
    onclick={copy}
    class="text-md-sys-color-on-surface-variant hover:bg-md-sys-color-surface-container-high absolute top-3 right-3 rounded-md px-2 py-1 text-xs transition-colors"
  >
    {copied ? 'Copied' : 'Copy'}
  </button>
</div>
