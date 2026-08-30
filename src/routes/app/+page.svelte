<script>
  import { Pane, PaneGrid, PaneHandle } from '$lib/index.js';
</script>

<PaneGrid full>
  <Pane width={320} resizable persistKey="app:nav-width">blabla</Pane>
  <PaneHandle persistKey="app:nav-width" />
  <Pane>
    <Pane>hello</Pane>
  </Pane>
</PaneGrid>
