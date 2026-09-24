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

<nav class="gap-spacing-25 p-spacing-200 pt-spacing-600 flex flex-col">
  <p
    class="text-md-sys-color-outline mb-spacing-150 px-spacing-150 text-xs font-medium tracking-wider uppercase"
  >
    On this page
  </p>
  {#each sections as { id, label }}
    <a
      href="#{id}"
      class="px-spacing-150 py-spacing-100 rounded-lg text-sm no-underline transition-colors {activeId ===
      id
        ? 'bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container font-medium'
        : 'text-md-sys-color-on-surface-variant hover:bg-md-sys-color-surface-container-high'}"
    >
      {label}
    </a>
  {/each}
</nav>
