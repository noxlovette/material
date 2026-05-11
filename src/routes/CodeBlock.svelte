<script lang="ts">
	let { code }: { code: string } = $props();
	let copied = $state(false);

	async function copy() {
		await navigator.clipboard.writeText(code);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="relative overflow-hidden rounded-xl bg-md-sys-color-surface-container-highest">
	<pre
		class="overflow-x-auto p-5 pr-16 font-mono text-sm leading-relaxed text-md-sys-color-on-surface">{code}</pre>
	<button
		onclick={copy}
		class="absolute top-3 right-3 rounded-md px-2 py-1 text-xs text-md-sys-color-on-surface-variant transition-colors hover:bg-md-sys-color-surface-container-high"
	>
		{copied ? 'Copied' : 'Copy'}
	</button>
</div>
