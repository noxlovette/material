import { tv, type VariantProps } from 'tailwind-variants';

export type CommandVariants = VariantProps<typeof command>;

export const command = tv({
	slots: {
		base: 'flex h-full w-full flex-col overflow-hidden rounded-2xl bg-md-sys-color-surface-container-high text-md-sys-color-on-surface shadow-elevation-3 ring-1 ring-md-sys-color-outline/20',
		inputWrapper: 'flex items-center border-b border-md-sys-color-outline-variant px-4',
		inputIcon: 'mr-3 h-5 w-5 shrink-0 text-md-sys-color-on-surface-variant',
		input:
			'flex h-12 w-full rounded-md bg-transparent py-3 text-md-sys-typescale-body-large outline-none placeholder:text-md-sys-color-on-surface-variant disabled:cursor-not-allowed disabled:opacity-50',
		list: 'max-h-[300px] overflow-y-auto overflow-x-hidden p-2 scrollbar-thin scrollbar-thumb-md-sys-color-outline-variant scrollbar-track-transparent',
		empty:
			'py-6 text-center text-md-sys-typescale-body-medium text-md-sys-color-on-surface-variant',
		group:
			'overflow-hidden p-1 text-md-sys-color-on-surface-variant [&_[data-command-group-heading]]:px-3 [&_[data-command-group-heading]]:py-2 [&_[data-command-group-heading]]:text-md-sys-typescale-label-medium [&_[data-command-group-heading]]:text-md-sys-color-on-surface-variant',
		separator: '-mx-1 h-px bg-md-sys-color-outline-variant',
		item: 'relative flex cursor-default select-none items-center rounded-lg px-3 py-3 text-md-sys-typescale-body-medium outline-none data-[selected=true]:bg-md-sys-color-secondary-container data-[selected=true]:text-md-sys-color-on-secondary-container data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 transition-colors',
		itemIcon: 'mr-3 h-5 w-5 shrink-0'
	}
});
