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
		open = $bindable(false),
		headline,
		supportingText,
		confirmText,
		confirmAction,
		loading = false,
		children,
		class: className,
		toggle = () => {},
		contentProps,
		...rootRest
	}: DialogueProps = $props();

	const { base, inner, headlineContainer, buttonContainer, supportingTextContainer } =
		$derived(dialogue());
</script>

<Dialog.Root bind:open {...rootRest}>
	<Dialog.Portal>
		<Dialog.Overlay forceMount>
			{#snippet child({ props, open })}
				{#if open}
					<div
						{...props}
						class={base()}
						transition:enterExit={{
							duration: 500,
							easing: easeEmphasizedDecel
						}}
					></div>
				{/if}
			{/snippet}
		</Dialog.Overlay>
		<Dialog.Content
			class="fixed inset-0 z-40 flex items-center justify-center"
			forceMount
			{...contentProps}
		>
			{#snippet child({ props, open })}
				{#if open}
					<form
						method="POST"
						{...props}
						class={inner({ class: clsx(className) })}
						transition:enterExit={{
							duration: 500,
							easing: easeEmphasized,
							mode: 'dialog-m3'
						}}
					>
						{#if headline}
							<Dialog.Title class={headlineContainer()}>
								{headline}
							</Dialog.Title>
						{/if}
						<Dialog.Description class={supportingTextContainer()}>
							{supportingText}
						</Dialog.Description>

						{@render children?.()}

						<div class={buttonContainer()}>
							<Dialog.Close>
								<Button type="button" variant="text" data-cy="dialogue-cancel">Отмена</Button>
							</Dialog.Close>
							<Dialog.Close>
								<Button
									type="submit"
									{loading}
									variant="filled"
									formaction={confirmAction}
									data-cy="dialogue-confirm">{confirmText}</Button
								>
							</Dialog.Close>
						</div>
					</form>
				{/if}
			{/snippet}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
