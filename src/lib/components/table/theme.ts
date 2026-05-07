import { tv, type VariantProps } from 'tailwind-variants';

export const table = tv({
	slots: {
		root: 'w-full border-collapse text-left md-sys-typescale-body-medium text-md-sys-color-on-surface',
		head: '',
		body: '[&_tr:last-child]:border-b-0',
		foot: 'border-t border-md-sys-color-outline-variant',
		row: 'border-b border-md-sys-color-outline-variant transition-colors',
		cell: 'px-4 py-3 align-middle',
		header:
			'px-4 py-4 align-middle md-sys-typescale-label-large text-md-sys-color-on-surface font-medium whitespace-nowrap'
	},
	variants: {
		hoverable: {
			true: {
				row: 'hover:bg-md-sys-color-on-surface/8 cursor-pointer'
			}
		},
		selected: {
			true: {
				row: 'bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container'
			}
		},
		numeric: {
			true: {
				cell: 'text-right tabular-nums',
				header: 'text-right'
			}
		},
		align: {
			left: { cell: 'text-left', header: 'text-left' },
			center: { cell: 'text-center', header: 'text-center' },
			right: { cell: 'text-right', header: 'text-right' }
		},
		sortable: {
			true: {
				header: 'group cursor-pointer select-none hover:bg-md-sys-color-on-surface/8'
			}
		},
		sorted: {
			true: {
				header: 'text-md-sys-color-primary'
			}
		},
		sticky: {
			true: {
				head: 'sticky top-0 z-10 bg-md-sys-color-surface shadow-[0_1px_0_0_var(--md-sys-color-outline-variant)]'
			}
		},
		rounded: {
			true: {
				root: 'rounded-xl ring-1 ring-md-sys-color-outline-variant',
				// top-left / top-right of the header row
				header:
					'[thead_tr:first-child_>&:first-child]:rounded-tl-xl [thead_tr:first-child_>&:last-child]:rounded-tr-xl',
				// bottom-left / bottom-right: prefer tfoot, fall back to the last tbody
				cell: '[tfoot_tr:last-child_>&:first-child]:rounded-bl-xl [tfoot_tr:last-child_>&:last-child]:rounded-br-xl [tbody:last-child_tr:last-child_>&:first-child]:rounded-bl-xl [tbody:last-child_tr:last-child_>&:last-child]:rounded-br-xl'
			}
		}
	}
});

export type TableVariants = VariantProps<typeof table>;
