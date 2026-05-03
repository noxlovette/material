<!--
@component
Menus display a list of choices on temporary surfaces.

@see https://m3.material.io/components/menus/guidelines
-->
<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import clsx from 'clsx';
	import { textfield } from '../../forms/index.js';
	import Icon from '$lib/utils/icon/Icon.svelte';
	import Button from '../../buttons/Button.svelte';
	import { enterExit } from '$lib/animation/enterExit.js';
	import { easeEmphasizedDecel } from '$lib/animation/easing.js';
	import type { MenuProps } from './types.js';
	import MenuItemComponent from '../menu-item/MenuItem.svelte';

	let {
		items = [],
		label = 'Open menu',
		selected,
		align = 'start',
		onselect,
		itemDataCyPrefix = 'menu-item',
		triggerVariant = 'button',
		triggerLabel,
		triggerValue,
		triggerLeadingIconProps,
		triggerTrailingIconProps,
		disabled = false,
		error = false,
		dataCy,
		'data-cy': dataCyAttr,
		triggerClass,
		supportingText
	}: MenuProps = $props();

	let openState = $state(false);

	const toDataCy = (value: string) => value.replace(/[^a-zA-Z0-9-_]+/g, '-');
	const triggerDataCy = $derived(dataCy ?? dataCyAttr);
	const textfieldCls = $derived(textfield({ disabled, error }));
</script>

<DropdownMenu.Root bind:open={openState}>
	<DropdownMenu.Trigger>
		{#if triggerVariant === 'textfield'}
			<div class="relative w-full">
				<button
					type="button"
					aria-expanded={openState}
					{disabled}
					data-cy={triggerDataCy}
					class={textfieldCls.base({ class: clsx('w-full', triggerClass) })}
				>
					{#if triggerLeadingIconProps}
						<Icon class={textfieldCls.leadingIcon()} {...triggerLeadingIconProps} />
					{/if}
					<div class={textfieldCls.inputWrapper()}>
						<span
							class={clsx(textfieldCls.input(), 'flex h-full items-center truncate pt-0 text-left')}
						>
							{triggerValue ?? label}
						</span>
						{#if triggerLabel}
							<span
								class={clsx(
									textfieldCls.label(),
									'top-1.5 -translate-y-1 md-sys-typescale-body-small'
								)}
							>
								{triggerLabel}
							</span>
						{/if}
					</div>
					{#if triggerTrailingIconProps}
						<Icon class={textfieldCls.trailingIcon()} {...triggerTrailingIconProps} />
					{/if}
				</button>
				{#if supportingText}
					<p
						class="flex justify-between px-4 pt-1
							md-sys-typescale-body-small
							text-md-sys-color-on-surface-variant
							peer-invalid:text-md-sys-color-error"
					>
						{supportingText}
					</p>
				{/if}
			</div>
		{:else}
			<Button
				variant="filled"
				aria-expanded={openState}
				{disabled}
				data-cy={triggerDataCy}
				class={clsx('w-max', triggerClass)}
				type="button"
			>
				{label}
			</Button>
		{/if}
	</DropdownMenu.Trigger>

	<DropdownMenu.Portal>
		<DropdownMenu.Content forceMount {align} sideOffset={4} class="z-50">
			{#snippet child({ wrapperProps, props, open })}
				{#if open}
					<div {...wrapperProps}>
						<div
							{...props}
							class="max-w-sm min-w-64 rounded-xl bg-md-sys-color-surface-container-high ring-1 shadow-elevation-3 ring-md-sys-color-outline/40"
							transition:enterExit={{
								duration: 200,
								easing: easeEmphasizedDecel,
								mode: 'scale'
							}}
						>
							{#each items as item (item.value)}
								<MenuItemComponent
									disabled={item.disabled}
									onSelect={() => onselect?.(item.value)}
									selected={item.value === selected}
									helper={item.helper}
									data-cy={`${itemDataCyPrefix}-${toDataCy(item.value)}`}
								>
									{item.label}
								</MenuItemComponent>
							{/each}
						</div>
					</div>
				{/if}
			{/snippet}
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
