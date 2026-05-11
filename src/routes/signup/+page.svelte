<script lang="ts">
  import { superForm } from 'sveltekit-superforms';
  import {
    Textfield,
    Button,
    Card,
    Headline,
    Body,
    Checkbox,
    Dialogue,
    Snackbar
  } from '$lib/index.js';
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';

  let { data } = $props();

  let dialogueOpen = $state(false);
  let snackbarMessage = $state('');

  const { form, errors, enhance } = superForm(data.form, {
    resetForm: true,
    onUpdated({ form }) {
      if (form.valid) {
        snackbarMessage = 'Successfully signed up via inline form!';
      }
    }
  });

  const {
    form: dForm,
    errors: dErrors,
    enhance: dEnhance
  } = superForm(data.dialogueForm, {
    resetForm: true,
    onUpdated({ form }) {
      if (form.valid) {
        dialogueOpen = false;
        snackbarMessage = 'Successfully signed up via dialogue!';
      }
    }
  });
</script>

<svelte:head>
  <title>Signup | Ogonëk M3</title>
</svelte:head>

<SinglePane contentClass="gap-12 p-12 max-w-5xl mx-auto">
  <div class="flex flex-col gap-4">
    <Headline>Signup Demo</Headline>
    <Body class="max-w-2xl">
      This page demonstrates two ways of using forms: an inline card and a modal dialogue. Both use
      sveltekit-superforms for validation.
    </Body>
  </div>

  <div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
    <!-- Inline Form / Card "Modal" -->
    <Card type="outlined" class="flex flex-col gap-6 p-8">
      <div class="flex flex-col gap-2">
        <Headline size="small">Create an Account</Headline>
        <Body>Inline card form</Body>
      </div>

      <form method="POST" action="?/main" use:enhance class="flex flex-col gap-4">
        <Textfield
          name="username"
          label="Username"
          id="username"
          bind:value={$form.username}
          error={!!$errors.username}
        >
          {#snippet supportingText()}
            {$errors.username?.[0] ?? ''}
          {/snippet}
        </Textfield>

        <Textfield
          name="email"
          label="Email address"
          id="email"
          type="email"
          bind:value={$form.email}
          error={!!$errors.email}
        >
          {#snippet supportingText()}
            {$errors.email?.[0] ?? ''}
          {/snippet}
        </Textfield>

        <Textfield
          name="password"
          label="Password"
          id="password"
          type="password"
          bind:value={$form.password}
          error={!!$errors.password}
        >
          {#snippet supportingText()}
            {$errors.password?.[0] ?? ''}
          {/snippet}
        </Textfield>

        <div class="flex flex-col gap-1 pt-2">
          <Checkbox
            name="terms"
            bind:checked={$form.terms}
            labelText="I accept the terms and conditions"
          />
          {#if $errors.terms}
            <Body class="text-md-sys-color-error md-sys-typescale-body-small px-4"
              >{$errors.terms[0]}</Body
            >
          {/if}
        </div>

        <div class="mt-4 flex justify-end">
          <Button type="submit" variant="filled">Sign Up</Button>
        </div>
      </form>
    </Card>

    <!-- Dialogue Form -->
    <Card type="elevated" class="flex flex-col items-center justify-center gap-6 p-8 text-center">
      <Headline size="small">Signup via Dialogue</Headline>
      <Body>Click the button below to open the signup form in a modal dialogue.</Body>
      <Button variant="tonal" onclick={() => (dialogueOpen = true)}>Open Signup Dialogue</Button>
    </Card>

    <!-- Snackbar Test -->
    <Card type="outlined" class="flex flex-col items-center justify-center gap-6 p-8 text-center">
      <Headline size="small">Snackbar Test</Headline>
      <Body>Click the button below to trigger a snackbar notification.</Body>
      <Button
        variant="tonal"
        onclick={() => {
          snackbarMessage = `Test message at ${new Date().toLocaleTimeString()}`;
        }}>Trigger Snackbar</Button
      >
    </Card>
  </div>
</SinglePane>

<Dialogue
  bind:open={dialogueOpen}
  enhance={dEnhance}
  headline="Create an Account"
  supportingText="Fill out the details to get started."
  confirmText="Sign Up"
  confirmAction="?/dialogue"
>
  <div class="flex flex-col gap-4 pt-4">
    <Textfield
      name="username"
      label="Username"
      id="d-username"
      bind:value={$dForm.username}
      error={!!$dErrors.username}
    >
      {#snippet supportingText()}
        {$dErrors.username?.[0] ?? ''}
      {/snippet}
    </Textfield>

    <Textfield
      name="email"
      label="Email address"
      id="d-email"
      type="email"
      bind:value={$dForm.email}
      error={!!$dErrors.email}
    >
      {#snippet supportingText()}
        {$dErrors.email?.[0] ?? ''}
      {/snippet}
    </Textfield>

    <Textfield
      name="password"
      label="Password"
      id="d-password"
      type="password"
      bind:value={$dForm.password}
      error={!!$dErrors.password}
    >
      {#snippet supportingText()}
        {$dErrors.password?.[0] ?? ''}
      {/snippet}
    </Textfield>

    <div class="flex flex-col gap-1">
      <Checkbox
        name="terms"
        bind:checked={$dForm.terms}
        labelText="I accept the terms and conditions"
      />
      {#if $dErrors.terms}
        <Body class="text-md-sys-color-error md-sys-typescale-body-small px-4"
          >{$dErrors.terms[0]}</Body
        >
      {/if}
    </div>
  </div>
</Dialogue>

<Snackbar bind:message={snackbarMessage} />
