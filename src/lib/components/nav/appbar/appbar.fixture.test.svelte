<script lang="ts">
  import AppBar from './AppBar.svelte';
  import ButtonIcon from '../../buttons/ButtonIcon.svelte';
  import { Tooltip } from 'bits-ui';
</script>

<Tooltip.Provider>
  <AppBar title="Draft">
    {#snippet leading()}
      <ButtonIcon iconProps={{ name: 'arrow_back' }} aria-label="Inherited" />
    {/snippet}
    {#snippet trailing()}
      <ButtonIcon variant="filled" iconProps={{ name: 'more_vert' }} aria-label="Explicit" />
    {/snippet}
  </AppBar>
  <ButtonIcon iconProps={{ name: 'add' }} aria-label="Outside" />
</Tooltip.Provider>
