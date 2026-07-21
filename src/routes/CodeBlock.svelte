<script lang="ts">
  import { getHighlighter, type CodeLang } from './shiki.js';

  let { code, lang = 'svelte' }: { code: string; lang?: CodeLang } = $props();
  let copied = $state(false);
  let html = $state('');

  $effect(() => {
    let cancelled = false;
    getHighlighter().then((highlighter) => {
      if (!cancelled) html = highlighter.codeToHtml(code, { lang, theme: 'css-variables' });
    });
    return () => {
      cancelled = true;
    };
  });

  async function copy() {
    await navigator.clipboard.writeText(code);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }
</script>

<div class="bg-md-sys-color-surface-container-highest relative overflow-hidden rounded-xl">
  {#if html}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -- trusted output from our own shiki call -->
    {@html html}
  {:else}
    <pre
      class="text-md-sys-color-on-surface overflow-x-auto p-5 pr-16 font-mono text-sm leading-relaxed">{code}</pre>
  {/if}
  <button
    onclick={copy}
    class="text-md-sys-color-on-surface-variant hover:bg-md-sys-color-surface-container-high absolute top-3 right-3 rounded-md px-2 py-1 text-xs transition-colors"
  >
    {copied ? 'Copied' : 'Copy'}
  </button>
</div>

<style>
  :global(.shiki) {
    overflow-x: auto;
    padding: 1.25rem 4rem 1.25rem 1.25rem;
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 0.875rem;
    line-height: 1.625;
    background-color: transparent !important;
    color: var(--shiki-color-text);

    /* Map shiki's css-variables theme tokens to MD3 color roles instead of the
       library's built-in defaults — keeps code blocks in sync with light/dark/HC themes. */
    --shiki-color-text: var(--md-sys-color-on-surface);
    --shiki-token-constant: var(--md-sys-color-tertiary);
    --shiki-token-string: var(--md-sys-color-primary);
    --shiki-token-comment: var(--md-sys-color-on-surface-variant);
    --shiki-token-keyword: var(--md-sys-color-secondary);
    --shiki-token-parameter: var(--md-sys-color-on-surface);
    --shiki-token-function: var(--md-sys-color-tertiary);
    --shiki-token-string-expression: var(--md-sys-color-primary);
    --shiki-token-punctuation: var(--md-sys-color-on-surface-variant);
    --shiki-token-link: var(--md-sys-color-primary);
  }
</style>
