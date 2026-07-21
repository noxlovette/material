import { createCssVariablesTheme, createHighlighter, type Highlighter } from 'shiki';

// The css-variables theme emits `color: var(--shiki-token-*)` per span instead of
// baked-in hex values, so a single highlighter output can be restyled for both
// light/dark and our MD3 tokens purely in CSS — see the :global(.shiki) rules
// in CodeBlock.svelte.
const theme = createCssVariablesTheme({ name: 'css-variables', variablePrefix: '--shiki-' });

// Singleton: creating a highlighter loads wasm + grammars, so every CodeBlock
// instance on a page shares one instance instead of re-bundling its own copy.
let highlighterPromise: Promise<Highlighter> | undefined;

export function getHighlighter(): Promise<Highlighter> {
  highlighterPromise ??= createHighlighter({
    themes: [theme],
    langs: ['svelte', 'typescript', 'bash', 'css']
  });
  return highlighterPromise;
}

export type CodeLang = 'svelte' | 'typescript' | 'bash' | 'css';
