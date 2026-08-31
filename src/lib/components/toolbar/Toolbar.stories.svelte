<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Toolbar from './Toolbar.svelte';
  import ToolbarButton from './ToolbarButton.svelte';
  import ToolbarDivider from './ToolbarDivider.svelte';
  import ToolbarGroup from './ToolbarGroup.svelte';
  import ToolbarGroupItem from './ToolbarGroupItem.svelte';
  import ToolbarSection from './ToolbarSection.svelte';
  import ToolbarSpacer from './ToolbarSpacer.svelte';

  const { Story } = defineMeta({
    title: 'Toolbar/Toolbar',
    component: Toolbar
  });
</script>

<Story name="Playground" asChild>
  <Toolbar>
    <ToolbarButton iconProps={{ name: 'format_bold' }} />
    <ToolbarButton iconProps={{ name: 'format_italic' }} />
    <ToolbarDivider />
    <ToolbarButton iconProps={{ name: 'format_underlined' }} />
  </Toolbar>
</Story>

<Story name="Sections">
  {#snippet template()}
    <div class="w-120">
      <Toolbar sections class="w-full">
        <ToolbarSection>
          <ToolbarButton iconProps={{ name: 'format_bold' }} />
          <ToolbarButton iconProps={{ name: 'format_italic' }} />
        </ToolbarSection>
        <ToolbarSpacer />
        <ToolbarSection>
          <ToolbarButton iconProps={{ name: 'share' }} />
          <ToolbarButton iconProps={{ name: 'settings' }} />
        </ToolbarSection>
      </Toolbar>
    </div>
  {/snippet}
</Story>

<Story name="Vertical" asChild>
  <Toolbar orientation="vertical">
    <ToolbarGroup type="single">
      <ToolbarGroupItem value="bold" iconProps={{ name: 'format_bold' }} />
      <ToolbarGroupItem value="italic" iconProps={{ name: 'format_italic' }} />
    </ToolbarGroup>
    <ToolbarDivider />
    <ToolbarButton iconProps={{ name: 'format_underlined' }} />
  </Toolbar>
</Story>

<Story name="VerticalSections">
  {#snippet template()}
    <div class="h-120">
      <Toolbar orientation="vertical" sections class="h-full">
        <ToolbarSection>
          <ToolbarButton iconProps={{ name: 'format_bold' }} />
          <ToolbarButton iconProps={{ name: 'format_italic' }} />
        </ToolbarSection>
        <ToolbarSpacer />
        <ToolbarSection>
          <ToolbarButton iconProps={{ name: 'share' }} />
          <ToolbarButton iconProps={{ name: 'settings' }} />
        </ToolbarSection>
      </Toolbar>
    </div>
  {/snippet}
</Story>
