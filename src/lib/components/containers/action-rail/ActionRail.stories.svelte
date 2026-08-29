<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ActionRail from './ActionRail.svelte';
  import Toolbar from '../../toolbar/Toolbar.svelte';
  import ToolbarButton from '../../toolbar/ToolbarButton.svelte';
  import ToolbarDivider from '../../toolbar/ToolbarDivider.svelte';

  const { Story } = defineMeta({
    title: 'Containers/Action Rail',
    component: ActionRail,
    argTypes: {
      anchor: {
        control: 'select',
        options: ['viewport', 'parent', 'sticky']
      }
    },
    args: {
      anchor: 'parent'
    }
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class="bg-md-sys-color-surface-variant relative h-[420px] overflow-hidden rounded-2xl">
      <ActionRail anchor={args.anchor}>
        <Toolbar orientation="vertical">
          <ToolbarButton iconProps={{ name: 'edit' }} />
          <ToolbarButton iconProps={{ name: 'share' }} />
          <ToolbarDivider />
          <ToolbarButton iconProps={{ name: 'delete' }} />
        </Toolbar>
      </ActionRail>
    </div>
  {/snippet}
</Story>
