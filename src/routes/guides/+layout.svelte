<script lang="ts">
  import { page } from '$app/state';
  import { base } from '$app/paths';
  import { Icon, List, ListItem, Pane, PaneGrid } from '$lib/index.js';
  import { guides, guideHref } from './nav.js';

  const { children } = $props();
</script>

<!--
  Guides nav + content. The nav pane sticks beside the rail, on the window's colour, and only
  shows from `large` up; below that, /guides lists the same guides as cards.
-->
<PaneGrid direction={{ small: 'column', large: 'row' }} gap="none">
  <Pane width={280} sticky visibleFrom="large" rounded={false} background={false}>
    <!-- Segmented: its segments take the window's tone, so on this backgroundless pane only the
         selected pill and the hover tint show. A standard list assumes a `surface` backdrop. -->
    <nav aria-label="Guides">
      <List variant="segmented">
        <ListItem
          headline="All guides"
          href="{base}/guides"
          selected={page.url.pathname === `${base}/guides`}
        >
          {#snippet leading()}<Icon name="menu_book" size="sm" />{/snippet}
        </ListItem>
        {#each guides as guide (guide.slug)}
          <ListItem
            headline={guide.title}
            href={guideHref(guide.slug)}
            selected={page.url.pathname === guideHref(guide.slug)}
          >
            {#snippet leading()}<Icon name={guide.icon} size="sm" />{/snippet}
          </ListItem>
        {/each}
      </List>
    </nav>
  </Pane>

  <!-- The content is a `surface` pane on the `surface-container` window, beside the rail and
       the nav, which belong to the window. -->
  <!-- data-guide-content: the region the root layout fades through between guides. -->
  <Pane padding="none" data-guide-content>
    {@render children()}
  </Pane>
</PaneGrid>
