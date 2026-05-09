<!--
@component
Material 3 Select.

Select components allow users to choose one option from a list.
Powered by bits-ui for accessibility and behavior.

@see https://m3.material.io/components/menus/overview
-->
<script lang="ts">
	import { Select } from 'bits-ui';
	import { select as selectCls } from './theme.js';
	import { Icon } from '$lib/utils/index.js';
	import type { SelectProps } from './types.js';
	import clsx from 'clsx';
	import { enterExit } from '$lib/animation/enterExit.js';
	import { easeEmphasized } from '$lib/animation/easing.js';

	let {
		value = $bindable(),
		open = $bindable(false),
		disabled = false,
		options = [],
		placeholder,
		error = false,
		supportingText,
		leadingIconProps,
		triggerProps,
		contentProps,
		...rootProps
	}: SelectProps = $props();

	const cls = $derived(selectCls({ disabled, error }));
</script>

<Select.Root bind:value={value as never} bind:open {disabled} {...rootProps}>
	<Select.Trigger class={cls.trigger({ class: clsx(triggerProps?.class) })} {...triggerProps}>
		{#if leadingIconProps}
			<Icon class={cls.leadingIcon()} {...leadingIconProps} />
		{/if}
		<Select.Value {placeholder} />

		<Icon name="arrow_drop_down" class={cls.dropdownIcon()} />
	</Select.Trigger>

	<Select.Portal>
		<Select.Content
			forceMount
			class={cls.content({ class: clsx('z-[100]', contentProps?.class) })}
			sideOffset={4}
			{...contentProps}
		>
			{#snippet child({ wrapperProps, props, open })}
				<div {...wrapperProps} class="z-[100]">
					{#if open}
						<div
							{...props}
							class="relative flex min-w-64 flex-col rounded-xl bg-md-sys-color-surface-container-high shadow-elevation-3 outline-none"
							transition:enterExit={{
								duration: 200,
								easing: easeEmphasized,
								mode: 'scale'
							}}
							style:max-width="min(calc(100vw - 32px), 560px)"
						>
							<Select.Viewport class="w-full">
								{#each options as item, i (i)}
									{#if item.type === 'group'}
										<Select.Group>
											{#if item.heading}
												<Select.GroupHeading class={cls.groupLabel()}>
													{item.heading}
												</Select.GroupHeading>
											{/if}
											{#each item.items as innerItem, j (j)}
												{#if innerItem.type !== 'group'}
													<Select.Item {...innerItem} class={cls.item()}>
														{#snippet children({ selected })}
															<span class="flex-1 truncate">{innerItem.label}</span>
															{#if selected}
																<Icon aria-hidden="true" name="check" class="size-5 shrink-0" />
															{/if}
														{/snippet}
													</Select.Item>
												{/if}
											{/each}
										</Select.Group>
									{:else}
										<Select.Item {...item} class={cls.item()}>
											{#snippet children({ selected })}
												<span class="flex-1 truncate">{item.label}</span>
												{#if selected}
													<Icon aria-hidden="true" name="check" class="size-5 shrink-0" />
												{/if}
											{/snippet}
										</Select.Item>
									{/if}
								{/each}
							</Select.Viewport>
						</div>
					{/if}
				</div>
			{/snippet}
		</Select.Content>
	</Select.Portal>

	{#if supportingText}
		<div class={cls.supportingText()}>
			<p>{@render supportingText()}</p>
		</div>
	{/if}
</Select.Root>
