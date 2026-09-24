<script lang="ts">
  import { page } from '$app/state';
  import { base } from '$app/paths';
  import { Icon, List, ListItem, Pane, PaneGrid } from '$lib/index.js';
  import { guides, guideHref } from './nav.js';

  const { children } = $props();
</script>

<!--
  Guides nav + content. The nav pane sticks inside the root layout's rail-offset column and only
  shows from `large` up; below that, /guides lists the same guides as cards.
-->
<PaneGrid direction={{ small: 'column', large: 'row' }} gap="none">
  <Pane
    width={280}
    sticky
    visibleFrom="large"
    rounded={false}
    background={false}
    class="border-md-sys-color-outline-variant border-r"
  >
    <nav aria-label="Guides">
      <List>
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

  <Pane rounded={false} background={false} padding="none">
    {@render children()}
  </Pane>
</PaneGrid>
