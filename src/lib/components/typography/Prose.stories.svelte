<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Pane } from '../containers';

  const { Story } = defineMeta({
    title: 'Typography/Prose',
    parameters: { layout: 'padded' },
    argTypes: {
      size: {
        control: 'select',
        options: ['prose-sm', 'prose-base', 'prose-lg', 'prose-xl', 'prose-2xl']
      }
    },
    args: { size: 'prose-base' }
  });
</script>

<script lang="ts">
  import Button from '../buttons/Button.svelte';

  // Self-contained media fixture: no network dependency. This is artwork, not a UI surface.
  const landscape = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"><rect width="640" height="360" fill="#e4e4e4"/><circle cx="470" cy="95" r="45" fill="#999"/><path d="M0 360V280L190 120L360 300L490 200L640 310V360Z" fill="#666"/></svg>')}`;
  const listTypes = ['1', 'A', 'a', 'I', 'i'] as const;
  const sizes = ['prose-sm', 'prose-base', 'prose-lg', 'prose-xl', 'prose-2xl'] as const;
</script>

{#snippet inlineText()}
  <p>
    Regular text, <strong>strong emphasis</strong>, <b>visual emphasis</b>,
    <em>stress emphasis</em>,
    <i>an alternate voice</i>, and <strong><em>combined emphasis</em></strong>. A
    <a href="https://m3.material.io/"><strong>strong link</strong> with <code>inline code</code></a>
    keeps its own color. <a href="#code">An ordinary link</a> is always underlined.
  </p>
  <p>
    Use <code>const surface = 'surface-container'</code>, press <kbd>⌘</kbd> + <kbd>K</kbd>, and
    read <samp>Saved successfully</samp>. <del>Removed text</del>, <ins>inserted text</ins>,
    <s>no longer accurate</s>, <mark>highlighted text</mark>, and <small>a small annotation</small>.
    Water is H<sub>2</sub>O; an area is m<sup>2</sup>. <abbr title="Material Design 3">M3</abbr>
    respects semantics; <q>inline quotations</q> and <cite>a cited work</cite> remain authored content.
  </p>
  <p>
    A deliberately long link wraps instead of widening the article:
    <a href="https://example.com/"
      >https://example.com/a/very/long/path/that/should/not/force/the/entire/article/outside/its/container</a
    >. A line break follows here.<br />The next line stays in the same paragraph.
  </p>
{/snippet}

{#snippet headings()}
  <h1>A coherent <strong>reading</strong> experience with <code>h1</code></h1>
  <p class="lead">The introduction stays part of the article, not a second design system.</p>
  <p>
    Headings belong to what follows them. Space before a section is greater than space within it.
  </p>
  <h2>Section <strong>heading</strong> with <code>h2</code></h2>
  <p>A paragraph directly after a heading has no extra top margin.</p>
  <h3>Subsection <strong>heading</strong> with <code>h3</code></h3>
  <p>The scale gets quieter as the content becomes more specific.</p>
  <h4>Detail <strong>heading</strong> with <code>h4</code></h4>
  <p>Lower levels stay at least as readable as body copy.</p>
  <h5>Supporting <strong>heading</strong> with <code>h5</code></h5>
  <p>A softer color distinguishes supporting information.</p>
  <h6>Fine-grained <strong>heading</strong> with <code>h6</code></h6>
  <p>The last level is differentiated without tiny text or automatic uppercase.</p>
{/snippet}

{#snippet lists()}
  <h2>Lists that stay together</h2>
  <ul>
    <li>
      A tight item with <strong>emphasis</strong>, <a href="#code">a link</a>, and
      <code>code</code>.
    </li>
    <li>
      Unordered inside unordered
      <ul>
        <li>
          Second level
          <ul><li>Third level</li></ul>
        </li>
      </ul>
    </li>
    <li>
      Ordered inside unordered
      <ol>
        <li>First step</li>
        <li>Second step</li>
      </ol>
    </li>
  </ul>
  <ol>
    <li>
      Ordered inside ordered
      <ol>
        <li>First nested step</li>
        <li>Second nested step</li>
      </ol>
    </li>
    <li>
      Unordered inside ordered
      <ul>
        <li>A nested observation</li>
        <li>Another observation</li>
      </ul>
    </li>
  </ol>
  <h3>Loose lists</h3>
  <ul>
    <li>
      <p>The first paragraph belongs to this item.</p>
      <p>A second paragraph adds detail without a section-sized gap.</p>
    </li>
    <li>
      <p>Another item.</p>
      <blockquote><p>A quote inside a list.</p></blockquote>
      <pre><code>const nested = true;</code></pre>
    </li>
  </ul>
  <ol>
    <li>
      <p>An ordered item with two paragraphs.</p>
      <p>This is still the same step.</p>
    </li>
    <li><p>The next step starts cleanly.</p></li>
  </ol>
  <h3>Every ordered marker type</h3>
  {#each listTypes as type (type)}
    <ol {type} start={3}>
      <li>Marker type <code>{type}</code>, starting at three</li>
      <li>The next marker</li>
    </ol>
  {/each}
  <ol reversed start={5}>
    <li>A reversed sequence</li>
    <li value={2}>An explicit item value</li>
    <li>Continues from that value</li>
  </ol>
  <h3>Definitions</h3>
  <dl>
    <dt>Surface</dt>
    <dd>The region that holds content.</dd>
    <dt>On surface</dt>
    <dt>On surface variant</dt>
    <dd>
      <p>Related terms can share a definition.</p>
      <p>Definitions can contain multiple paragraphs.</p>
      <ul><li>And supporting lists.</li></ul>
    </dd>
    <dt>Rhythm</dt>
    <dd>Spacing that makes relationships visible.</dd>
    <dd>A second definition for the same term.</dd>
  </dl>
{/snippet}

{#snippet quotesAndCode()}
  <h2 id="code">Quotes and code</h2>
  <blockquote>
    <p>
      A quote with <strong>emphasis</strong>, <em>stress</em>,
      <a href="https://m3.material.io/">a source link</a>, and <code>inline code</code>.
    </p>
    <p>A second paragraph does not acquire synthetic quotation marks.</p>
    <blockquote><p>A nested quote keeps its own boundary.</p></blockquote>
    <ul><li>A supporting point inside the quote.</li></ul>
    <p><cite>— A note on reading rhythm</cite></p>
  </blockquote>
  <blockquote>A quote can also be plain text without a paragraph wrapper.</blockquote>
  <h3>Code preserves its whitespace</h3>
  <!-- Keyboard users must be able to scroll the overflowing code region. -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <pre role="region" tabindex="0" aria-label="Theme code example"><code
      >{`const theme = {
  surface: 'surface',
  content: 'on-surface',
};

// Long lines scroll within the block, not the page.
const message = 'This deliberately long code line should retain its whitespace and scroll horizontally inside this code block without stretching the article.';`}</code
    ></pre>
  <pre>{`A plain pre without a code child
    retains indentation too.`}</pre>
  <p>Back in a paragraph, <code>code</code> has a subtle surface—not generated backticks.</p>
{/snippet}

{#snippet tables()}
  <h2>Tabular content</h2>
  <table>
    <caption>Theme roles and their relationships</caption>
    <thead
      ><tr
        ><th scope="col"><strong>Role</strong></th><th scope="col"><code>Usage</code></th><th
          scope="col">Notes</th
        ></tr
      ></thead
    >
    <tbody>
      <tr
        ><th scope="row">Primary</th><td><a href="https://m3.material.io/">Inline links</a></td><td
          ><strong>Emphasis</strong> without a different font system.</td
        ></tr
      >
      <tr
        ><th scope="row">Surface</th><td><code>surface-container-high</code></td><td
          ><p>A cell with a paragraph.</p>
          <ul><li>And a list.</li></ul></td
        ></tr
      >
      <tr
        ><th scope="row">Outline</th><td colspan="2"
          >A spanning cell with a-long-unbroken-value-that-must-wrap-inside-the-table.</td
        ></tr
      >
    </tbody>
    <tfoot
      ><tr
        ><th scope="row">Summary</th><td colspan="2"
          >Footer cells share the same spacing and a quiet top rule.</td
        ></tr
      ></tfoot
    >
  </table>
  <h3>A table without a header</h3>
  <table>
    <tbody
      ><tr><th scope="row">One</th><td>First value</td></tr><tr
        ><th scope="row">Two</th><td>Last row has no trailing rule.</td></tr
      ></tbody
    >
  </table>
{/snippet}

{#snippet media()}
  <h2>Media and captions</h2>
  <p>A standalone image gets article spacing.</p>
  <img
    src={landscape}
    alt="A grayscale landscape with layered mountains and a sun"
    width="640"
    height="360"
  />
  <p>A picture wrapper owns the spacing; its image does not add a second gap.</p>
  <picture
    ><source media="(min-width: 48rem)" srcset={landscape} /><img
      src={landscape}
      alt="The same mountain landscape at a responsive size"
      width="640"
      height="360"
    /></picture
  >
  <figure>
    <picture
      ><img
        src={landscape}
        alt="Mountain landscape in a captioned figure"
        width="640"
        height="360"
      /></picture
    >
    <figcaption>
      A caption with <strong>emphasis</strong>, <a href="https://m3.material.io/">a source</a>, and
      <code>code</code>.
    </figcaption>
  </figure>
  <figure>
    <blockquote><p>A figure can hold a quotation, not just an image.</p></blockquote>
    <figcaption>Attribution stays close to the quoted content.</figcaption>
  </figure>
  <figure>
    <pre><code>const captioned = true;</code></pre>
    <figcaption>A captioned code listing.</figcaption>
  </figure>
  <!-- Poster-only fixture exercises video layout without fetching a remote movie. -->
  <video
    controls
    poster={landscape}
    width="640"
    height="360"
    aria-label="Poster-only video layout example"><track kind="captions" /></video
  >
  <figure>
    <video
      controls
      poster={landscape}
      width="640"
      height="360"
      aria-label="Captioned poster-only video example"><track kind="captions" /></video
    >
    <figcaption>A video and its caption share the same media rhythm.</figcaption>
  </figure>
{/snippet}

{#snippet flow()}
  <h2>Adjacent blocks</h2>
  <h3>A heading immediately after another heading</h3>
  <ul>
    <li>A list directly after a heading.</li>
    <li>No extra top gap.</li>
  </ul>
  <h3>A definition directly after a heading</h3>
  <dl>
    <dt>Connected</dt>
    <dd>Content stays with its label.</dd>
  </dl>
  <h3>A quote directly after a heading</h3>
  <blockquote><p>Not a floating island.</p></blockquote>
  <h3>A code block directly after a heading</h3>
  <pre><code>const connected = true;</code></pre>
  <hr />
  <h2>After the divider</h2>
  <p>The divider already provides the section break.</p>
  <hr />
  <p>A paragraph can follow a divider too.</p>
  <details>
    <summary>Additional HTML content</summary>
    <p>Expanded details keep normal paragraph rhythm.</p>
  </details>
  <p class="text-md-sys-color-primary">An explicit utility can override the content defaults.</p>
{/snippet}

{#snippet article()}
  {@render headings()}
  {@render inlineText()}
  {@render lists()}
  {@render quotesAndCode()}
  {@render tables()}
  {@render media()}
  {@render flow()}
{/snippet}

<Story name="Playground">
  {#snippet template(args)}
    <Pane>
      <article class="prose {args.size}">
        {@render article()}
      </article>
    </Pane>
  {/snippet}
</Story>

<Story name="Readable width" asChild>
  <Pane>
    <article class="prose">
      {@render article()}
    </article>
  </Pane>
</Story>

<Story name="Headings and inline text" asChild
  ><Pane><article class="prose">{@render headings()}{@render inlineText()}</article></Pane></Story
>
<Story name="Lists and definitions" asChild
  ><Pane><article class="prose">{@render lists()}</article></Pane></Story
>
<Story name="Quotes and code" asChild
  ><Pane><article class="prose">{@render quotesAndCode()}</article></Pane></Story
>
<Story name="Tables" asChild><Pane><article class="prose">{@render tables()}</article></Pane></Story
>
<Story name="Media and figures" asChild
  ><Pane><article class="prose">{@render media()}</article></Pane></Story
>
<Story name="Flow and boundaries" asChild
  ><Pane
    ><article class="prose">{@render flow()}</article>
    <article class="prose mt-spacing-400">
      <p>A paragraph-only article has no leading or trailing margin.</p>
    </article></Pane
  ></Story
>
<Story name="All sizes" asChild>
  <Pane>
    {#each sizes as size (size)}
      <article class="prose {size} mb-spacing-600">
        <h1>{size}</h1>
        <p class="lead">The same M3 vocabulary at a different density.</p>
        <h2>A section heading</h2>
        <p>Body copy with <strong>emphasis</strong> and <code>code</code>.</p>
        <ul>
          <li>One point</li>
          <li>Another point</li>
        </ul>
      </article>
    {/each}
  </Pane>
</Story>
<Story name="Responsive and full width" asChild
  ><Pane
    ><article class="prose prose-sm md:prose-base lg:prose-lg max-w-none">
      {@render headings()}{@render tables()}
    </article></Pane
  ></Story
>
<Story name="Embedded UI" asChild>
  <Pane
    ><article class="prose">
      <h1>Content with an embedded control</h1>
      <p>Prose stops at the UI boundary.</p>
      <div class="not-prose bg-md-sys-color-surface-container p-spacing-200 rounded-md">
        <h2 class="md-sys-typescale-title-medium">An independent UI heading</h2>
        <p class="md-sys-typescale-body-medium">
          No article margins, link styles, or heading scale leak into this island.
        </p>
        <Button>Continue</Button>
      </div>
      <h2>Back in the article</h2>
      <p>Normal reading rhythm resumes here.</p>
    </article></Pane
  >
</Story>
<Story name="Right to left" asChild
  ><Pane
    ><article class="prose" dir="rtl" lang="ar">
      <h1>محتوى مترابط</h1>
      <p>تتبع المسافات واتجاه القوائم اتجاه النص.</p>
      <p>معرّف الطلب: <bdi dir="ltr">MD-2026-1042</bdi> — <bdi dir="ltr">16 px</bdi>.</p>
      <ul>
        <li>
          العنصر الأول
          <ul><li>عنصر متداخل</li></ul>
        </li>
        <li>العنصر الثاني</li>
      </ul>
      <ol type="A">
        <li>خطوة أولى</li>
        <li>خطوة ثانية</li>
      </ol>
      <blockquote><p>يبقى الاقتباس قريبًا من المحتوى.</p></blockquote>
      <dl>
        <dt>المحتوى</dt>
        <dd>تعريف قصير للمحتوى.</dd>
      </dl>
      <table>
        <thead><tr><th scope="col">العنوان</th><th scope="col">الوصف</th></tr></thead><tbody
          ><tr><th scope="row">سطح</th><td>منطقة المحتوى</td></tr></tbody
        >
      </table>
    </article></Pane
  ></Story
>
