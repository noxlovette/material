<!--
@component
Dialogs provide important information or prompt users for a decision.

A dialog is a type of modal window that appears in front of app content
to provide critical information or ask for a decision.
Dialogs disable all app functionality when they appear, and remain
on screen until confirmed, dismissed, or a required action has been taken.

@see https://m3.material.io/components/dialogs/overview
-->
<script lang="ts">
	import { dialogue } from './theme.js';
	import type { DialogueProps } from './types.js';
	import { Dialog } from 'bits-ui';
	import Button from '../../buttons/Button.svelte';
	import clsx from 'clsx';
	import { enterExit } from '$lib/animation/enterExit.js';
	import { easeEmphasized, easeEmphasizedDecel } from '$lib/animation/easing.js';

	let {
		withState = false,
		headline,
		supportingText,
		confirmText,
		confirmAction,
		loading = false,
		children,
		class: className,
		toggle = () => {},
		...rest
	}: DialogueProps = $props();

	const { base, inner, headlineContainer, buttonContainer, supportingTextContainer } =
		$derived(dialogue());

	let isOpen = $state(false);

	$effect(() => {
		isOpen = true;
	});

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			if (withState) {
				window.history.back();
			} else {
				toggle();
			}
		}
	};

	const id = $derived(rest.id ?? undefined);
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={handleOpenChange}>
	<Dialog.Portal>
		<Dialog.Overlay forceMount>
			{#snippet child({ props, open })}
				{#if open}
					<div
						{...props}
						class={`${base()} dialogue-base`}
						transition:enterExit={{
							duration: 500,
							easing: easeEmphasizedDecel
						}}
					></div>
				{/if}
			{/snippet}
		</Dialog.Overlay>
		<div class="pointer-events-none fixed inset-0 z-40 flex items-center justify-center">
			<Dialog.Content forceMount {...rest} {id}>
				{#snippet child({ props, open })}
					{#if open}
						<div
							{...props}
							class={`${inner({ class: clsx(className) })} dialogue-inner pointer-events-auto`}
							transition:enterExit={{
								duration: 500,
								easing: easeEmphasized,
								mode: 'dialog-m3'
							}}
						>
							{#if headline}
								<Dialog.Title>
									{#snippet child({ props })}
										<h1 {...props} class={headlineContainer()}>
											{headline}
										</h1>
									{/snippet}
								</Dialog.Title>
							{/if}
							<Dialog.Description>
								{#snippet child({ props })}
									<p {...props} class={supportingTextContainer()}>
										{supportingText}
									</p>
								{/snippet}
							</Dialog.Description>

							<form method="POST">
								{@render children?.()}

								<div class={`${buttonContainer()} dialogue-buttons`}>
									<Button
										type="button"
										variant="text"
										data-cy="dialogue-cancel"
										onclick={() => (isOpen = false)}>Отмена</Button
									>
									<Button
										type="submit"
										{loading}
										variant="filled"
										formaction={confirmAction}
										data-cy="dialogue-confirm">{confirmText}</Button
									>
								</div>
							</form>
						</div>
					{/if}
				{/snippet}
			</Dialog.Content>
		</div>
	</Dialog.Portal>
</Dialog.Root>

<style>
	.dialogue-base {
		opacity: 1;
	}

	.dialogue-inner {
		--dialogue-shape: 1rem;
	}
</style>
