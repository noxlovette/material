<!--
  Snackbar is a declarative, bindable-message component, not an imperative toast() call: mount
  one instance per page/region with `bind:message`, then trigger it by assigning a string (or
  Snippet) to that bound variable from anywhere else in your app. Setting `message` back to '' —
  or letting the internal 4s auto-dismiss timer do it — hides it again. Because triggering is just
  a variable assignment, each story below wires up its own local `$state` and a button to set it,
  the same pattern used for Dialogue's bindable `open`.
-->
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Snackbar from './Snackbar.svelte';
</script>

<script lang="ts">
  import Button from '../buttons/Button.svelte';

  const { Story } = defineMeta({
    title: 'Feedback/Snackbar',
    component: Snackbar,
    argTypes: {
      label: { control: 'text' },
      showClose: { control: 'boolean' },
      static: { control: 'boolean' }
    },
    args: {
      label: 'Undo',
      showClose: true,
      static: false
    }
  });

  let playgroundMessage = $state('This is a snackbar message.');
  let triggeredMessage = $state('');
  let actionMessage = $state('Item archived.');
  let staticMessage = $state('This snackbar stays until manually dismissed.');
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class="relative flex min-h-24 items-center justify-center">
      <Snackbar
        bind:message={playgroundMessage}
        label={args.label}
        showClose={args.showClose}
        static={args.static}
        fixed={false}
      />
    </div>
  {/snippet}
</Story>

<Story name="Triggered" asChild>
  <div class="relative flex min-h-32 flex-col items-center justify-center gap-4">
    <Button
      variant="tonal"
      onclick={() => {
        triggeredMessage = `Message sent at ${new Date().toLocaleTimeString()}`;
      }}
    >
      Show Snackbar
    </Button>
    <Snackbar bind:message={triggeredMessage} label="Undo" fixed={false} />
  </div>
</Story>

<Story name="With Action" asChild>
  <div class="relative flex min-h-24 items-center justify-center">
    <Snackbar bind:message={actionMessage} label="Undo" fixed={false} />
  </div>
</Story>

<Story name="Static (No Auto-Dismiss)" asChild>
  <div class="relative flex min-h-24 items-center justify-center">
    <Snackbar bind:message={staticMessage} static showClose fixed={false} />
  </div>
</Story>
