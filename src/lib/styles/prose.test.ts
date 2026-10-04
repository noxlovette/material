// @vitest-environment jsdom
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';

import { compile } from 'tailwindcss';
import { beforeAll, describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const root = resolve(import.meta.dirname, '../../..');
let source: string;
let stories: string;
let css: string;

beforeAll(async () => {
  source = await readFile(resolve(root, 'src/lib/styles/prose.css'), 'utf8');
  stories = await readFile(
    resolve(root, 'src/lib/components/typography/Prose.stories.svelte'),
    'utf8'
  );
  const compiler = await compile(
    '@import "tailwindcss"; @import "./src/lib/index.css"; @import "./src/lib/styles/theme/light.css";',
    {
      base: root,
      loadStylesheet: async (id, base) => {
        const path = id.startsWith('.')
          ? resolve(base, id)
          : require.resolve(id === 'tailwindcss' ? 'tailwindcss/index.css' : id);
        return { path, base: dirname(path), content: await readFile(path, 'utf8') };
      }
    }
  );
  css = compiler.build([
    'prose',
    'prose-sm',
    'prose-base',
    'prose-lg',
    'prose-xl',
    'prose-2xl',
    'md:prose-base',
    'lg:prose-lg',
    'max-w-none',
    'text-md-sys-color-primary'
  ]);
});

describe('owned prose typography', () => {
  it('compiles every size and responsive modifier without the typography plugin', () => {
    for (const size of ['sm', 'base', 'lg', 'xl', '2xl']) {
      expect(css).toContain(`.prose-${size}`);
    }
    expect(css).toContain('.md\\:prose-base');
    expect(css).toContain('.lg\\:prose-lg');
    expect(css).not.toContain('--tw-prose');
    expect(css).not.toContain('@apply');
    expect(css).not.toContain('@utility');
    expect(css).toContain('max-width: none');
    expect(css.indexOf('.prose {')).toBeLessThan(css.indexOf('.max-w-none {'));
  });

  it('keeps body leading readable at every size, with a capped measure and no UI tracking', () => {
    for (const size of ['', '-sm', '-base', '-lg', '-xl', '-2xl']) {
      const block = source.split(`@utility prose${size} {`)[1]?.split('\n}')[0];
      expect(block).toContain('line-height: 1.6');
      expect(block).toContain('letter-spacing: normal');
    }
    expect(css).toContain('--prose-measure: 65ch');
    expect(css).toContain('max-width: var(--prose-measure)');
    expect(css).toContain('text-wrap: balance');
    expect(css).toContain('text-underline-position: from-font');
    for (const size of ['', '-sm', '-base', '-lg', '-xl', '-2xl']) {
      const block = css.split(`.prose${size} {`)[1]?.split('}')[0] ?? '';
      expect([...block.matchAll(/line-height: ([^;]+);/g)].at(-1)?.[1]).toBe('1.6');
      expect([...block.matchAll(/letter-spacing: ([^;]+);/g)].at(-1)?.[1]).toBe('normal');
    }
  });

  it('keeps heading sizes descending and resets their scale at responsive size changes', async () => {
    const typescale = await readFile(resolve(root, 'src/lib/styles/typescale.css'), 'utf8');
    for (const size of ['', '-sm', '-base', '-lg', '-xl', '-2xl']) {
      const block = css.split(`.prose${size} {`)[1]?.split('}')[0] ?? '';
      const sizes = [1, 2, 3].map((level) => {
        const token = [
          ...block.matchAll(new RegExp(`--prose-h${level}-size: var\\(([^)]+)\\)`, 'g'))
        ].at(-1)?.[1];
        expect(token).toBeDefined();
        return Number(typescale.match(new RegExp(`${token}: ([\\d.]+)rem`))?.[1]);
      });
      expect(sizes[0]).toBeGreaterThanOrEqual(sizes[1]);
      expect(sizes[1]).toBeGreaterThanOrEqual(sizes[2]);
      const bodyToken = [...block.matchAll(/font-size: var\(([^)]+)\)/g)].at(-1)?.[1];
      const bodySize = Number(typescale.match(new RegExp(`${bodyToken}: ([\\d.]+)rem`))?.[1]);
      expect(sizes[2]).toBeGreaterThan(bodySize);
      expect(source).toContain('font-size: var(--prose-h1-size)');
    }
    expect(css).toContain(
      'line-height: max(1.4em, var(--md-ref-typeface-headline-large-line-height))'
    );
  });

  it('excludes UI islands from every descendant rule, including contextual and edge rules', () => {
    const selectors = source.match(/[^{}]+(?=\{)/g) ?? [];
    const descendants = selectors.filter(
      (selector) => selector.includes(':where(.prose') || selector.includes('& :where(')
    );
    expect(descendants.length).toBeGreaterThan(35);
    for (const selector of descendants) {
      expect(selector).toMatch(/:not\(\s*:where\(\.not-prose,\s*\.not-prose \*\)\s*\)/);
      expect(selector).not.toMatch(/\)\s+:not\(\s*:where\(\.not-prose/);
    }
  });

  it('preserves code whitespace and uses authored punctuation rather than synthetic content', () => {
    expect(css).toContain('overflow-x: auto');
    expect(css).toContain('overflow-wrap: normal');
    expect(source).not.toMatch(/content:\s*['"]|open-quote|close-quote/);
    expect(source).toContain('pre code, pre samp');
    expect(stories).toContain('role="region" tabindex="0"');
  });

  it('matches authored HTML but leaves embedded UI descendants untouched', () => {
    document.body.innerHTML = `<article class="prose">
      <h1>Article heading</h1><p>Article paragraph <code>inline</code></p>
      <blockquote><p>Quote <code>quoted</code></p></blockquote>
      <pre><code>block</code></pre><figure><img alt="Fixture"><figcaption>Caption</figcaption></figure>
      <div class="not-prose"><h1>UI heading</h1><p>UI copy <code>UI code</code></p>
        <blockquote><p>UI quote</p></blockquote><pre><code>UI block</code></pre>
        <figure><figcaption>UI caption</figcaption></figure></div>
    </article>`;
    const selectors =
      (source.split('@layer components {')[1] ?? '')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .match(/[^{}]+(?=\{)/g) ?? [];
    for (const selector of selectors) {
      // jsdom's selector engine lacks CSS's case-sensitive attribute flag and ::marker.
      if (selector.includes(' s]') || selector.includes('::marker')) continue;
      for (const element of document.querySelectorAll('.not-prose, .not-prose *')) {
        expect(element.matches(selector.trim())).toBe(false);
      }
    }
    const paragraphSelector = ':where(.prose) :where(p):not(:where(.not-prose, .not-prose *))';
    expect(document.querySelectorAll(paragraphSelector)).toHaveLength(2);
    document.body.innerHTML = '';
  });

  it('covers the upstream element baseline plus additional semantic HTML in the story', () => {
    // Captured from @tailwindcss/typography 0.5.20 src/styles.js DEFAULT/base.
    // Keep this independent of the removed dependency so coverage cannot shrink silently.
    const upstream = [
      'p',
      'a',
      'strong',
      'em',
      'h1',
      'h2',
      'h3',
      'h4',
      'ul',
      'ol',
      'li',
      'dl',
      'dt',
      'dd',
      'blockquote',
      'kbd',
      'code',
      'pre',
      'table',
      'thead',
      'tbody',
      'tfoot',
      'tr',
      'th',
      'td',
      'img',
      'picture',
      'video',
      'figure',
      'figcaption',
      'hr'
    ];
    const additional = [
      'h5',
      'h6',
      'b',
      'i',
      'small',
      'samp',
      'mark',
      'del',
      'ins',
      's',
      'sub',
      'sup',
      'abbr',
      'q',
      'cite',
      'br',
      'caption',
      'details',
      'summary'
    ];
    for (const tag of [...upstream, ...additional]) {
      expect(stories).toMatch(new RegExp(`<${tag}(?:\\s|>)`));
    }
    expect(stories).toContain('class="lead"');
    expect(stories).toContain("['1', 'A', 'a', 'I', 'i']");
    expect(stories).toContain('reversed start={5}');
    expect(stories).toContain('li value={2}');
    expect(stories).toContain('class="not-prose');
    expect(stories).toContain('dir="rtl" lang="ar"');
  });
});
