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
			class={cls.content({ class: clsx(contentProps?.class) })}
			sideOffset={4}
			{...contentProps}
		>
			{#snippet child({ wrapperProps, props, open })}
				<div {...wrapperProps} class="z-50">
					<div
						{...props}
						class="relative max-w-sm min-w-64 rounded-xl bg-md-sys-color-surface-container-high shadow-elevation-3"
						style:opacity={open ? '1' : '0'}
						style:transform={open ? 'scale(1)' : 'scale(0.85)'}
						style:visibility={open ? 'visible' : 'hidden'}
						style:transition="opacity 200ms, transform 200ms, visibility 200ms"
						style:transition-timing-function="cubic-bezier(0.05, 0.7, 0.1, 1)"
					>
						<Select.Viewport>
							{#each options as item, i (i)}
								{#if item.type === 'group'}
									<Select.Group>
										{#if item.heading}
											<Select.GroupHeading class={cls.groupLabel()}>
												{item.heading}
											</Select.GroupHeading>
										{/if}
										{#each item.items as inner, i (i)}
											{#if inner.type !== 'group'}
												<Select.Item {...inner} class={cls.item()}>
													{#snippet children({ selected })}
														<span class="flex-1">{inner.label}</span>
														{#if selected}
															<Icon aria-hidden="true" name="check" />
														{/if}
													{/snippet}
												</Select.Item>
											{/if}
										{/each}
									</Select.Group>
								{:else}
									<Select.Item {...item} class={cls.item()}>
										{#snippet children({ selected })}
											<span class="flex-1">{item.label}</span>
											{#if selected}
												<Icon aria-hidden="true" name="check" />
											{/if}
										{/snippet}
									</Select.Item>
								{/if}
							{/each}
						</Select.Viewport>
					</div>
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
