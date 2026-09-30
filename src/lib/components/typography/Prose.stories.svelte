<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Typography/Prose',
    parameters: { layout: 'padded' },
    argTypes: {
      size: {
        control: 'select',
        options: ['prose-sm', 'prose-base', 'prose-lg', 'prose-xl']
      }
    },
    args: { size: 'prose-base' }
  });
</script>

{#snippet article()}
  <h1>Prose styles</h1>
  <p class="lead">
    A lead paragraph sets up the article. It uses the <code>on-surface-variant</code> role.
  </p>
  <p>
    Body copy with <strong>bold text</strong>, <em>italic text</em>, an
    <a href="https://m3.material.io/">inline link</a>, and <code>inline code</code>. Long passages
    should stay readable, so paragraphs keep a comfortable measure and rhythm.
  </p>

  <h2>Lists</h2>
  <ul>
    <li>Unordered item one</li>
    <li>
      Unordered item two
      <ul>
        <li>Nested item</li>
        <li>Another nested item</li>
      </ul>
    </li>
    <li>Unordered item three</li>
  </ul>
  <ol>
    <li>First step</li>
    <li>Second step</li>
    <li>Third step</li>
  </ol>

  <h3>Quote</h3>
  <blockquote>
    <p>Design is not just what it looks like and feels like. Design is how it works.</p>
  </blockquote>

  <h3>Code block</h3>
  <pre><code
      >{`const greeting = 'hello';
console.log(greeting);`}</code
    ></pre>

  <h2>Table</h2>
  <table>
    <thead>
      <tr><th>Role</th><th>Used for</th></tr>
    </thead>
    <tbody>
      <tr><td>primary</td><td>Key actions and links</td></tr>
      <tr><td>outline</td><td>Borders and bullets</td></tr>
      <tr><td>surface-container-high</td><td>Code block background</td></tr>
    </tbody>
  </table>

  <hr />

  <h4>Heading four</h4>
  <p>Closing paragraph after a divider.</p>
  <figure>
    <div class="bg-md-sys-color-surface-container-high h-32 w-full"></div>
    <figcaption>A figure caption uses the captions role.</figcaption>
  </figure>
{/snippet}

<Story name="Playground">
  {#snippet template(args)}
    <article class="prose prose-theme max-w-none {args.size}">
      {@render article()}
    </article>
  {/snippet}
</Story>

<Story name="Readable width" asChild>
  <article class="prose prose-theme">
    {@render article()}
  </article>
</Story>
