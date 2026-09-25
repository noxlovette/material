<script lang="ts">
  import { getHighlighter, type CodeLang } from './shiki.js';

  let { code, lang = 'svelte' }: { code: string; lang?: CodeLang } = $props();
  let copied = $state(false);
  let html = $state('');

  $effect(() => {
    // Read the props before the await so the effect tracks them and re-highlights on change.
    const source = code;
    const language = lang;
    let cancelled = false;
    getHighlighter().then((highlighter) => {
      if (!cancelled)
        html = highlighter.codeToHtml(source, { lang: language, theme: 'css-variables' });
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
      class="text-md-sys-color-on-surface p-spacing-250 pr-spacing-800 overflow-x-auto font-mono text-sm leading-relaxed">{code}</pre>
  {/if}
  <button
    onclick={copy}
    class="text-md-sys-color-on-surface-variant hover:bg-md-sys-color-surface-container-high top-spacing-150 right-spacing-150 px-spacing-100 py-spacing-50 absolute rounded-md text-xs transition-colors"
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
    color: var(--shiki-foreground);

    /* Map shiki's css-variables theme tokens to MD3 color roles instead of the
       library's built-in defaults — keeps code blocks in sync with light/dark/HC themes. */
    --shiki-foreground: var(--color-md-sys-color-on-surface);
    --shiki-background: transparent;
    --shiki-token-constant: var(--color-md-sys-color-tertiary);
    --shiki-token-string: var(--color-md-sys-color-primary);
    --shiki-token-comment: var(--color-md-sys-color-on-surface-variant);
    --shiki-token-keyword: var(--color-md-sys-color-secondary);
    --shiki-token-parameter: var(--color-md-sys-color-on-surface);
    --shiki-token-function: var(--color-md-sys-color-tertiary);
    --shiki-token-string-expression: var(--color-md-sys-color-primary);
    --shiki-token-punctuation: var(--color-md-sys-color-on-surface-variant);
    --shiki-token-link: var(--color-md-sys-color-primary);
  }
</style>
