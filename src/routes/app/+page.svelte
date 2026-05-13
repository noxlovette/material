<script>
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
  import SplitPane from '$lib/components/containers/panes/SplitPane.svelte';
</script>

<SplitPane>
  {#snippet left()}
    blabla
  {/snippet}
  {#snippet right()}
    <SinglePane>hello</SinglePane>
  {/snippet}
</SplitPane>
