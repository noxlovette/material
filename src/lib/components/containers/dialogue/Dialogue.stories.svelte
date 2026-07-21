<!--
  NOTE: The exported component is `Dialogue` (British spelling) even though the M3 concept and
  this docs nav entry are both called "Dialog" — see docs/dialog for the full explanation.

  Dialogue wraps its content in a <form> (bits-ui Dialog.Content) driven by a required `enhance`
  action, mirroring SvelteKit/superforms usage. Since Storybook has no real form action to POST
  to, the stories below pass a no-op `enhance` stub that just prevents the native submit —
  consumers in a real SvelteKit app would pass superforms' `enhance` instead.

  Dialogue's `open` is bindable but there is no args-driven "Controls" story for it — clicking a
  trigger button is the natural way to open a modal, so each story wires up its own local state
  in this file's instance script (shared across the module, one flag per story).
-->
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Dialogue from './Dialogue.svelte';

  const { Story } = defineMeta({
    title: 'Containers/Dialogue',
    component: Dialogue
  });

  // Storybook has no SvelteKit form action to submit to — stub out `enhance` so submitting the
  // confirm button doesn't attempt a real network POST.
  function noopEnhance(formEl: HTMLFormElement) {
    const onSubmit = (e: SubmitEvent) => e.preventDefault();
    formEl.addEventListener('submit', onSubmit);
    return { destroy: () => formEl.removeEventListener('submit', onSubmit) };
  }
</script>

<script lang="ts">
  import Button from '../../buttons/Button.svelte';

  let playgroundOpen = $state(false);
  let extraContentOpen = $state(false);
  let loadingOpen = $state(false);
</script>

<Story name="Playground" asChild>
  <div class="p-6">
    <Button onclick={() => (playgroundOpen = true)}>Open dialog</Button>
    <Dialogue
      bind:open={playgroundOpen}
      enhance={noopEnhance}
      headline="Delete this file?"
      supportingText="This action cannot be undone. The file will be permanently removed."
      confirmText="Delete"
      cancelText="Cancel"
    />
  </div>
</Story>

<Story name="With Extra Content" asChild>
  <div class="p-6">
    <Button onclick={() => (extraContentOpen = true)}>Open dialog with content</Button>
    <Dialogue
      bind:open={extraContentOpen}
      enhance={noopEnhance}
      headline="Rename project"
      confirmText="Save"
      cancelText="Cancel"
    >
      <input
        type="text"
        value="Untitled project"
        class="border-md-sys-color-outline-variant bg-md-sys-color-surface w-full rounded-lg border px-3 py-2"
      />
    </Dialogue>
  </div>
</Story>

<Story name="Loading Confirm" asChild>
  <div class="p-6">
    <Button onclick={() => (loadingOpen = true)}>Open dialog</Button>
    <Dialogue
      bind:open={loadingOpen}
      enhance={noopEnhance}
      headline="Processing"
      supportingText="The confirm action is in a loading state."
      confirmText="Confirm"
      cancelText="Cancel"
      loading
    />
  </div>
</Story>
