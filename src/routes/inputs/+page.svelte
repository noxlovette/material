<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Display,
		Title,
		Headline,
		Body,
		Label,
		Textfield,
		DateField,
		LoadingIndicator,
		TimepickerInput,
		Multipart,
		Slider,
		Search,
		Checkbox,
		Switch,
		Select,
		RadioGroup,
		SupportingPane
	} from '$lib/index.js';
	import { nanoid } from 'nanoid';
	import type { DateValue } from '@internationalized/date';
	import TableOfContents from '../TableOfContents.svelte';

	let checkbox1 = $state(false);
	let checkbox2 = $state(true);
	let switchOn = $state(false);
	let switchIcons = $state(true);
	let selectValue = $state('');
	let radioValue = $state('');
	let radioValue2 = $state('en');
	let dateValue = $state<DateValue | undefined>(undefined);

	type DemoMultipart = { label: string; props: Record<string, unknown> };
	let multipartDemos: DemoMultipart[] = $state([]);

	const createDemoFile = (
		name: string,
		size: number,
		status: 'waiting' | 'uploading' | 'complete' | 'error',
		percentComplete = 0,
		errorMessage?: string
	) => {
		const bytes = Math.round((percentComplete / 100) * size);
		return {
			id: nanoid(),
			file: new File([new Uint8Array(size)], name, {
				type: 'application/octet-stream'
			}),
			progress: {
				uploaded: status === 'complete' ? 1 : 0,
				total: 1,
				bytes,
				totalBytes: size,
				percentComplete
			},
			status,
			errorMessage
		};
	};

	onMount(() => {
		multipartDemos = [
			{
				label: 'Пустое состояние',
				props: { readonly: true }
			},
			{
				label: 'Загрузка в процессе',
				props: {
					readonly: true,
					initialUploads: [createDemoFile('Lesson video.mp4', 2_100_000, 'uploading', 42)]
				}
			},
			{
				label: 'Успех и ошибка',
				props: {
					readonly: true,
					initialUploads: [
						createDemoFile('Homework.docx', 870_000, 'complete', 100),
						createDemoFile('Screenshot.png', 430_000, 'error', 75, 'Сбой сети')
					]
				}
			}
		];
	});

	const selectItems = [
		{ value: 'ru', label: 'Русский' },
		{ value: 'en', label: 'English' },
		{ value: 'de', label: 'Deutsch' },
		{ value: 'fr', label: 'Français' }
	];

	const toc = [
		{ id: 'text-fields', label: 'Text Fields' },
		{ id: 'forms', label: 'Forms' },
		{ id: 'search', label: 'Search' },
		{ id: 'slider', label: 'Slider' },
		{ id: 'time-date', label: 'Time & Date' },
		{ id: 'multipart', label: 'Multipart Upload' }
	];
</script>

<svelte:head>
	<title>Inputs | Ogonëk M3</title>
</svelte:head>

<SupportingPane anchor="viewport" centered={false}>
	{#snippet main()}
		<div class="flex flex-col gap-16 p-12">
			<!-- TEXT FIELDS -->
			<section id="text-fields" class="flex scroll-mt-4 flex-col gap-6">
				<Display>Text Fields</Display>
				<div class="grid max-w-3xl grid-cols-2 gap-4">
					<Textfield label="Default" id="tf1" />
					<Textfield label="With value" value="Hello world" id="tf2" />
					<Textfield label="With supporting text" id="tf3">
						{#snippet supportingText()}
							Helper text goes here
						{/snippet}
					</Textfield>
					<Textfield leadingIconProps={{ name: 'search' }} label="Search" id="tf4" />
					<Textfield trailingIconProps={{ name: 'close' }} label="Clearable" id="tf5" />
					<Textfield disabled label="Disabled" value="Can't edit" id="tf6" />
					<Textfield error trailingIconProps={{ name: 'warning' }} label="Error state" id="tf7">
						{#snippet supportingText()}
							This field has an error
						{/snippet}
					</Textfield>
					<Textfield label="Character limit" characterLimit={50} value="" id="tf8" />
				</div>
			</section>

			<!-- FORMS -->
			<section id="forms" class="flex scroll-mt-4 flex-col gap-6">
				<Display>Forms</Display>
				<Headline>Checkbox</Headline>
				<div class="flex flex-wrap gap-8">
					<label class="flex cursor-pointer items-center gap-3">
						<Checkbox bind:checked={checkbox1} />
						<Body>Unchecked</Body>
					</label>
					<label class="flex cursor-pointer items-center gap-3">
						<Checkbox bind:checked={checkbox2} />
						<Body>Checked</Body>
					</label>
					<label class="flex cursor-pointer items-center gap-3">
						<Checkbox indeterminate />
						<Body>Indeterminate</Body>
					</label>
					<label class="flex cursor-pointer items-center gap-3">
						<Checkbox error />
						<Body>Error</Body>
					</label>
					<label class="flex cursor-pointer items-center gap-3 opacity-60">
						<Checkbox disabled />
						<Body>Disabled</Body>
					</label>
					<label class="flex cursor-pointer items-center gap-3 opacity-60">
						<Checkbox disabled checked />
						<Body>Disabled Checked</Body>
					</label>
				</div>

				<Headline>Switch</Headline>
				<div class="flex flex-wrap gap-8">
					<label class="flex cursor-pointer items-center gap-3">
						<Switch bind:checked={switchOn} />
						<Body>{switchOn ? 'On' : 'Off'}</Body>
					</label>
					<label class="flex cursor-pointer items-center gap-3">
						<Switch bind:checked={switchIcons} icons="both" />
						<Body>Both icons</Body>
					</label>
					<label class="flex cursor-pointer items-center gap-3">
						<Switch icons="none" />
						<Body>No icons</Body>
					</label>
					<label class="flex cursor-pointer items-center gap-3 opacity-60">
						<Switch disabled />
						<Body>Disabled</Body>
					</label>
					<label class="flex cursor-pointer items-center gap-3 opacity-60">
						<Switch disabled checked />
						<Body>Disabled On</Body>
					</label>
				</div>

				<Headline>Radio Group</Headline>
				<div class="flex flex-wrap gap-12">
					<div class="flex flex-col gap-2">
						<Body>Vertical (default)</Body>
						<RadioGroup
							bind:value={radioValue}
							items={[
								{ value: 'a', label: 'Вариант А' },
								{ value: 'b', label: 'Вариант Б', supportingText: 'С пояснением' },
								{ value: 'c', label: 'Вариант В', disabled: true }
							]}
						/>
						<Body>Selected: {radioValue || '—'}</Body>
					</div>
					<div class="flex flex-col gap-2">
						<Body>Horizontal</Body>
						<RadioGroup
							bind:value={radioValue2}
							orientation="horizontal"
							items={[
								{ value: 'ru', label: 'Русский' },
								{ value: 'en', label: 'English' },
								{ value: 'de', label: 'Deutsch' }
							]}
						/>
						<Body>Selected: {radioValue2 || '—'}</Body>
					</div>
					<div class="flex flex-col gap-2">
						<Body>Disabled group</Body>
						<RadioGroup
							disabled
							value="b"
							items={[
								{ value: 'a', label: 'Вариант А' },
								{ value: 'b', label: 'Вариант Б' }
							]}
						/>
					</div>
					<div class="flex flex-col gap-2">
						<Body>Error state</Body>
						<RadioGroup
							error
							bind:value={radioValue}
							items={[
								{ value: 'a', label: 'Вариант А' },
								{ value: 'b', label: 'Вариант Б' }
							]}
						/>
					</div>
				</div>

				<Headline>Select</Headline>
				<div class="flex max-w-md flex-wrap gap-4">
					<Select bind:value={selectValue} items={selectItems} placeholder="Выберите язык" />
					<Body>Selected: {selectValue || '—'}</Body>
				</div>
			</section>

			<!-- SEARCH -->
			<section id="search" class="flex scroll-mt-4 flex-col gap-6">
				<Display>Search</Display>
				<div class="grid grid-cols-2 gap-4">
					<Search />
					<Search trailingIconProps={{ name: 'search' }} />
				</div>
			</section>

			<!-- SLIDER -->
			<section id="slider" class="flex scroll-mt-4 flex-col gap-6">
				<Display>Slider</Display>
				<div class="max-w-md">
					<Slider value={5} />
				</div>
			</section>

			<!-- TIME & DATE -->
			<section id="time-date" class="flex scroll-mt-4 flex-col gap-6">
				<Display>Time & Date</Display>
				<div class="grid grid-cols-2 gap-4">
					<TimepickerInput
						setTime={(t) => console.debug('set time', t)}
						close={() => console.debug('closed')}
						time="09:41"
					/>
					<LoadingIndicator />
					<LoadingIndicator container />
				</div>
				<DateField label="Дата" bind:value={dateValue} />
				<Body>Selected: {dateValue?.toString() ?? '—'}</Body>
			</section>

			<!-- MULTIPART -->
			<section id="multipart" class="flex scroll-mt-4 flex-col gap-6">
				<Display>Multipart Upload</Display>
				<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
					{#each multipartDemos as demo (demo.label)}
						<div class="space-y-3 rounded-xl bg-md-sys-color-surface-container p-6">
							<Title>{demo.label}</Title>
							<Multipart {...demo.props} />
						</div>
					{/each}
				</div>
			</section>
		</div>
	{/snippet}

	{#snippet supporting()}
		<TableOfContents sections={toc} />
	{/snippet}
</SupportingPane>
