<script lang="ts">
  import { onMount } from 'svelte';

  let { sections }: { sections: { id: string; label: string }[] } = $props();
  let activeId = $state('');

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeId = entry.target.id;
        }
      },
      { rootMargin: '-10% 0% -80% 0%', threshold: 0 }
    );

    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  });
</script>

<nav class="flex flex-col gap-0.5 p-4 pt-12">
  <p class="text-md-sys-color-outline mb-3 px-3 text-xs font-medium tracking-wider uppercase">
    On this page
  </p>
  {#each sections as { id, label }}
    <a
      href="#{id}"
      class="rounded-lg px-3 py-2 text-sm no-underline transition-colors {activeId === id
        ? 'bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container font-medium'
        : 'text-md-sys-color-on-surface-variant hover:bg-md-sys-color-surface-container-high'}"
    >
      {label}
    </a>
  {/each}
</nav>
