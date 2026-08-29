<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ListItem from './ListItem.svelte';
  import Icon from '$lib/utils/icon/Icon.svelte';

  const { Story } = defineMeta({
    title: 'Containers/List Item',
    component: ListItem,
    argTypes: {
      headline: { control: 'text' },
      overline: { control: 'text' },
      supporting: { control: 'text' },
      selected: { control: 'boolean' }
    },
    args: {
      headline: 'Headline',
      overline: '',
      supporting: '',
      selected: false
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <ul class="w-80">
      <ListItem
        headline={args.headline}
        overline={args.overline}
        supporting={args.supporting}
        selected={args.selected}
      />
    </ul>
  {/snippet}
</Story>

<Story name="One Line" asChild>
  <ul class="w-80">
    <ListItem headline="Headline" />
  </ul>
</Story>

<Story name="Two Line" asChild>
  <ul class="w-80">
    <ListItem headline="Headline" supporting="Supporting text that describes the item" />
  </ul>
</Story>

<Story name="Three Line" asChild>
  <ul class="w-80">
    <ListItem
      overline="Overline"
      headline="Headline"
      supporting="Supporting text that spans up to two lines before it gets clipped"
    />
  </ul>
</Story>

<Story name="With Leading Icon" asChild>
  <ul class="w-80">
    <ListItem headline="Headline" supporting="Supporting text">
      {#snippet leading()}
        <Icon name="folder" />
      {/snippet}
    </ListItem>
  </ul>
</Story>

<Story name="With Trailing and Badge" asChild>
  <ul class="w-80">
    <ListItem headline="Headline" supporting="Supporting text" badge={3}>
      {#snippet leading()}
        <Icon name="inbox" />
      {/snippet}
      {#snippet trailing()}
        <Icon name="chevron_right" />
      {/snippet}
    </ListItem>
  </ul>
</Story>

<Story name="Selected" asChild>
  <ul class="w-80">
    <ListItem headline="Headline" supporting="Supporting text" selected>
      {#snippet leading()}
        <Icon name="check_circle" />
      {/snippet}
    </ListItem>
  </ul>
</Story>

<Story name="As Link" asChild>
  <ul class="w-80">
    <ListItem headline="Headline" supporting="Navigates on click" href="#">
      {#snippet leading()}
        <Icon name="link" />
      {/snippet}
    </ListItem>
  </ul>
</Story>
