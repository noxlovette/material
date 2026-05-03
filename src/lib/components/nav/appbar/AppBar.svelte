<!--
@component
Material 3 App Bar.

Top app bars provide content and actions related to the current screen.
They’re used for branding, screen titles, navigation, and actions.

@see https://m3.material.io/components/top-app-bar/overview
-->
<script lang="ts">
	import { appbar } from './theme.js';
	import type { AppBarProps } from './types.js';
	import clsx from 'clsx';

	let {
		children,
		title,
		subtitle,
		trailing,
		leading,
		class: className,
		showBack,
		...rest
	}: AppBarProps = $props();

	let scrollY = $state(0);
	let scrolled = $derived(scrollY > 10);

	const noTrailing = $derived(!trailing);
	const noLeading = $derived(!leading || !showBack);

	const {
		base,
		title: titleCLs,
		textContainer,
		subtitle: subtitleCls,
		leading: leadingCls,
		trailing: trailingCls
	} = $derived(appbar({ scrolled, noLeading, noTrailing }));
	const navClass = $derived(base({ class: clsx(className) }));
</script>

<svelte:window bind:scrollY />

<nav {...rest} class={navClass}>
	<div class={leadingCls()}>
		{@render leading?.()}
	</div>
	<div class={textContainer()}>
		<h1 class={titleCLs()}>
			{title}
		</h1>
		{#if subtitle}
			<p class={subtitleCls()}>{subtitle}</p>
		{/if}
	</div>
	<div class={trailingCls()}>
		{@render trailing?.()}
	</div>
</nav>
