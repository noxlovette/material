<script lang="ts">
	/**
	 * Material 3 Navigation Rail Item.
	 *
	 * A single destination within a navigation rail.
	 */
	import { page } from '$app/state';
	import type { RailItemProps } from './types.js';
	import { railElement } from './theme.js';
	import { Icon, Layer } from '$lib/utils/index.js';
	import Badge from '../../badge/Badge.svelte';
	import { NavigationMenu } from 'bits-ui';

	let {
		href = '/',
		name,
		external = false,
		badge = 0,
		class: className,
		selected,
		disabled,
		collapsed = true,
		iconProps,
		...rest
	}: RailItemProps = $props();

	const isDisabled = $derived(!!disabled);
	const target = $derived(!isDisabled && external ? '_blank' : undefined);
	const rel = $derived(!isDisabled && external ? 'noopener noreferrer' : undefined);
	const hrefValue = $derived(isDisabled ? undefined : href);
	const ariaDisabled = $derived(isDisabled ? true : undefined);
	const tabIndex = $derived(isDisabled ? -1 : undefined);
	const hrefPathname = $derived.by(() => {
		try {
			return new URL(href).pathname;
		} catch {
			return href;
		}
	});
	const isActive = $derived(
		selected ||
			page.url.pathname === hrefPathname ||
			(hrefPathname !== '/' && page.url.pathname.startsWith(hrefPathname + '/'))
	);
	const {
		base,
		content,
		icon,
		iconContainer,
		label: labelClass
	} = $derived(railElement({ active: isActive, expanded: !collapsed }));
	const rootClass = $derived([base(), className].filter(Boolean).join(' '));

	function handleClick(event: MouseEvent) {
		if (isDisabled) {
			event.preventDefault();
			event.stopPropagation();
		}
	}
</script>

<NavigationMenu.Item
	class={['flex w-full items-center', collapsed && 'justify-center'].filter(Boolean).join(' ')}
>
	<NavigationMenu.Link active={isActive} href={hrefValue}>
		{#snippet child({ props })}
			<a
				{...props}
				{...rest}
				{target}
				{rel}
				aria-disabled={ariaDisabled}
				tabindex={tabIndex}
				onclick={handleClick}
				class={rootClass}
			>
				<div class={content()}>
					<div class={iconContainer()}>
						<Layer />
						<Icon
							{...iconProps}
							class={icon()}
							wght={isActive ? 600 : 400}
							fill={isActive ? 1 : 0}
						/>
						{#if badge}
							<Badge size={badge === -1 ? 'sm' : 'lg'} number={badge}></Badge>
						{/if}
					</div>
					<p class={labelClass()}>
						{name}
					</p>
				</div>
			</a>
		{/snippet}
	</NavigationMenu.Link>
</NavigationMenu.Item>
