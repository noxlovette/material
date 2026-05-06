<!--
@component
Material 3 Select.

Select components allow users to choose one option from a list.
Powered by bits-ui for accessibility and behavior.

@see https://m3.material.io/components/menus/overview
-->
<script lang="ts" generics="T extends string | string[]">
	import { Select } from 'bits-ui';
	import { select as selectCls } from './theme.js';
	import { Icon } from '$lib/utils/index.js';
	import type { SelectProps } from './types.js';
	import clsx from 'clsx';
	import { enterExit } from '$lib/animation/enterExit.js';
	import { easeEmphasizedDecel } from '$lib/animation/easing.js';

	let {
		value = $bindable(),
		open = $bindable(false),
		disabled = false,
		items = [],
		label,
		placeholder,
		error = false,
		leadingIconProps,
		supportingText,
		triggerClass,
		contentClass,
		onchange,
		rootProps = { type: 'single' }
	}: SelectProps = $props();

	const cls = $derived(selectCls({ disabled, error }));

	const selectedLabel = $derived.by(() => {
		if (!value) return '';
		if (Array.isArray(value)) {
			return (value as string[])
				.map((v) => {
					const item = items.find((i) => i.value === v);
					return item?.label ?? item?.name ?? v;
				})
				.join(', ');
		}
		const item = items.find((i) => i.value === (value as string));
		return item?.label ?? item?.name ?? (value as string) ?? '';
	});

	let isMounted = false;
	$effect(() => {
		if (isMounted) {
			onchange?.(value as string & string[]);
		}
		isMounted = true;
	});
</script>

<Select.Root bind:value={value as never} bind:open {disabled} {...rootProps}>
	<Select.Trigger
		class={cls.trigger({ class: triggerClass })}
		aria-invalid={error}
		data-invalid={error || undefined}
	>
		{#if leadingIconProps}
			<Icon class={cls.leadingIcon()} {...leadingIconProps} />
		{/if}

		<div class={cls.inputWrapper()}>
			<span class={cls.value()}>{selectedLabel || placeholder || ''}</span>
			<span class={clsx(cls.label(), cls.labelFloating())}>
				{label}
			</span>
		</div>

		<Icon name="arrow_drop_down" class={cls.trailingIcon()} />
	</Select.Trigger>

	<Select.Portal>
		<Select.Content forceMount class={cls.content({ class: contentClass })} sideOffset={4}>
			{#snippet child({ wrapperProps, props, open })}
				{#if open}
					<div {...wrapperProps}>
						<div
							{...props}
							class="relative z-50 max-w-sm min-w-64 rounded-xl bg-md-sys-color-surface-container-high ring-1 shadow-elevation-3 ring-md-sys-color-outline/40"
							transition:enterExit={{
								duration: 200,
								easing: easeEmphasizedDecel,
								mode: 'scale'
							}}
						>
							<Select.Viewport>
								{#if items && items.length > 0}
									{#each items as item, i (i + item.value)}
										<Select.Item
											value={item.value}
											label={item.label ?? item.name}
											disabled={item.disabled}
											class={cls.item()}
										>
											{#snippet children({ selected })}
												<span class="flex-1">{item.label ?? item.name ?? item.value}</span>
												{#if selected}
													<Icon aria-hidden="true" name="check" />
												{/if}
											{/snippet}
										</Select.Item>
									{/each}
								{/if}
							</Select.Viewport>
						</div>
					</div>
				{/if}
			{/snippet}
		</Select.Content>
	</Select.Portal>

	{#if supportingText}
		<div class={cls.supportingText()}>
			<p>{@render supportingText()}</p>
		</div>
	{/if}
</Select.Root>
