<script lang="ts">
	import { onMount } from 'svelte';
	import {
		VStack,
		ButtonIcon,
		FAB,
		FABMenuItem,
		Display,
		Title,
		Headline,
		Body,
		Label,
		Divider,
		Rail,
		RailItem,
		Card,
		Dialogue,
		Textfield,
		Snackbar,
		DateField,
		LoadingIndicator,
		TimepickerInput,
		ListItem,
		Icon,
		Multipart,
		Tooltip,
		Slider,
		Button,
		Search,
		card as cardTheme,
		Checkbox,
		Switch,
		CircularProgress,
		LinearProgress,
		WavyLinearProgress,
		TabHolder,
		Navbar,
		NavbarItem,
		Menu,
		Avatar,
		Badge,
		Select,
		Popover,
		RadioGroup,
		Toolbar,
		ToolbarButton,
		ToolbarGroup,
		ToolbarGroupItem,
		ToolbarDivider,
		ToggleGroup,
		ToggleGroupItem
	} from '$lib/index.js';
	import { nanoid } from 'nanoid';
	import type { DateValue } from '@internationalized/date';
	import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
	let showModal = $state(false);
	let showModal2 = $state(false);
	let showModal3 = $state(false);
	let railCollapsed = $state(true);
	let railCollapsedWithBadges = $state(true);

	let checkbox1 = $state(false);
	let checkbox2 = $state(true);
	let switchOn = $state(false);
	let switchIcons = $state(true);
	let activeTab = $state('lessons');
	let snackbarMsg = $state('');
	let selectedMenu = $state('');
	let selectValue = $state('');
	let radioValue = $state('');
	let radioValue2 = $state('en');
	let toolbarFormat = $state<string[]>([]);
	let toolbarAlign = $state('left');
	let segmentSingle = $state('day');
	let segmentMulti = $state<string[]>(['bold']);
	let toggle = $state(true);
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

	const tabItems = [
		{ iconProps: { name: 'book' }, name: 'Занятия', value: 'lessons', href: '#' },
		{ iconProps: { name: 'assignment' }, name: 'Задания', value: 'tasks', href: '#' },
		{ iconProps: { name: 'note_stack' }, name: 'Карточки', value: 'flashcards', href: '#' },
		{ iconProps: { name: 'calendar_month' }, name: 'Календарь', value: 'calendar', href: '#' }
	];

	const menuItems = [
		{ label: 'Редактировать', value: 'edit' },
		{ label: 'Дублировать', value: 'duplicate' },
		{ label: 'Архивировать', value: 'archive' },
		{ label: 'Удалить', value: 'delete', helper: 'Безвозвратно' }
	];

	const selectItems = [
		{ value: 'ru', label: 'Русский' },
		{ value: 'en', label: 'English' },
		{ value: 'de', label: 'Deutsch' },
		{ value: 'fr', label: 'Français' }
	];
</script>

<svelte:head>
	<title>Components | Ogonëk M3</title>
</svelte:head>
<SinglePane class="ml-24 p-12" contentClass="gap-12">
	<!-- BUTTONS -->
	<Display>Buttons</Display>
	<Headline>Regular Buttons</Headline>
	<div class="grid grid-cols-6 items-center gap-y-12">
		<Button>Filled</Button>
		<Button iconProps={{ name: 'home' }}>With Icon</Button>
		<Button variant="tonal">Tonal</Button>
		<Button variant="outlined">Outlined</Button>
		<Button variant="text">Text</Button>
		<Button variant="elevated">Elevated</Button>
		<Button
			variant="bare"
			onclick={() => {
				toggle = !toggle;
			}}
			selected={toggle}>Selected</Button
		>
		<Button variant="bare" selected={!toggle}>Unselected</Button>
		<Button size="xs">XSmall</Button>
		<Button size="sm">Small</Button>
		<Button size="lg">Large</Button>
		<Button size="xl">XLarge</Button>
	</div>
	<Headline>Button Colors</Headline>
	<div class="grid grid-cols-5 items-center gap-4">
		<Button color="primary">Primary</Button>
		<Button color="secondary">Secondary</Button>
		<Button color="tertiary">Tertiary</Button>
		<Button color="error">Error</Button>
		<Button variant="tonal" color="secondary">Tonal Secondary</Button>
		<Button variant="outlined" color="tertiary">Outline Tertiary</Button>
		<Button variant="elevated" color="secondary">Elevated Secondary</Button>
		<Button variant="text" color="error">Text Error</Button>
	</div>
	<Headline>Icon Buttons</Headline>
	<div class="flex flex-wrap items-center gap-6">
		<ButtonIcon iconProps={{ name: 'delete' }} variant="filled" />
		<ButtonIcon iconProps={{ name: 'favorite' }} variant="tonal" />
		<ButtonIcon iconProps={{ name: 'share' }} variant="outlined" />
		<ButtonIcon iconProps={{ name: 'settings' }} variant="text" />
		<ButtonIcon size="xs" iconProps={{ name: 'home' }} variant="tonal" />
		<ButtonIcon size="sm" iconProps={{ name: 'home' }} variant="tonal" />
		<ButtonIcon size="md" iconProps={{ name: 'home' }} variant="tonal" />
		<ButtonIcon size="lg" iconProps={{ name: 'home' }} variant="tonal" />
		<ButtonIcon size="xl" iconProps={{ name: 'home' }} variant="tonal" />
	</div>
	<Headline>FABs</Headline>
	<div class="flex flex-wrap items-end gap-6">
		<FAB size="small" iconProps={{ name: 'edit' }} />
		<FAB iconProps={{ name: 'edit' }} />
		<FAB size="large" iconProps={{ name: 'edit' }} />
	</div>
	<div class="flex flex-wrap items-end gap-6">
		<FAB iconProps={{ name: 'edit' }} config="primary" />
		<FAB iconProps={{ name: 'edit' }} config="secondary" />
		<FAB iconProps={{ name: 'edit' }} config="tertiary" />
	</div>
	<div class="flex flex-wrap items-end gap-6">
		<FAB label="Compose" expanded iconProps={{ name: 'edit' }} />
		<FAB label="Compose" expanded size="large" iconProps={{ name: 'edit' }} />
		<FAB withMenu iconProps={{ name: 'add' }} config="primary">
			<FABMenuItem iconProps={{ name: 'home' }}>Главная</FABMenuItem>
			<FABMenuItem iconProps={{ name: 'search' }}>Поиск</FABMenuItem>
			<FABMenuItem iconProps={{ name: 'person' }}>Профиль</FABMenuItem>
		</FAB>
	</div>

	<Divider />

	<!-- TOOLTIPS -->
	<Display>Tooltips</Display>
	<div class="flex flex-wrap items-center gap-6">
		<ButtonIcon
			tooltipContent="Наведи или сфокусируйся на иконке, чтобы увидеть текст подсказки."
			aria-label="Домой"
			iconProps={{ name: 'home' }}
		/>
		<Tooltip
			subhead="Быстрая подсказка"
			variant="rich"
			supportingText="Доступна кнопкой Tab и закрывается, когда курсор уходит."
		>
			{#snippet trigger()}
				<Button variant="outlined" iconProps={{ name: 'info' }}>Подсказка снизу</Button>
			{/snippet}
			<Button variant="text">Действие</Button>
		</Tooltip>
		<ButtonIcon tooltipContent="Еще один" iconProps={{ name: 'help' }} variant="text" />
	</div>

	<Divider />

	<!-- TYPOGRAPHY -->
	<Display>Typography</Display>
	<div class="grid grid-cols-3 items-end gap-12">
		<Display>Display</Display>
		<Headline>Headline</Headline>
		<Title>Title</Title>
		<Body>Body text for reading content at comfortable size.</Body>
		<Label>Label small</Label>
	</div>

	<Divider />

	<!-- NAVIGATION -->
	<Display>Navigation</Display>
	<Title>Rail</Title>
	<VStack>
		<Rail bind:collapsed={railCollapsed}>
			<RailItem collapsed={railCollapsed} name="Главная" href="/" iconProps={{ name: 'home' }} />
			<RailItem
				collapsed={railCollapsed}
				name="Задания"
				href="/assignments"
				iconProps={{ name: 'assignment' }}
			/>
			<RailItem
				collapsed={railCollapsed}
				name="Занятия"
				href="/lessons"
				iconProps={{ name: 'book' }}
			/>
		</Rail>
		<Rail bind:collapsed={railCollapsedWithBadges}>
			<RailItem
				collapsed={railCollapsedWithBadges}
				badge={3}
				name="Главная"
				href="/"
				iconProps={{ name: 'home' }}
			/>
			<RailItem
				collapsed={railCollapsedWithBadges}
				badge={3}
				name="Задания"
				href="/assignments"
				iconProps={{ name: 'assignment' }}
			/>
			<RailItem
				collapsed={railCollapsedWithBadges}
				badge={-1}
				name="Занятия"
				href="/lessons"
				iconProps={{ name: 'book' }}
			/>
		</Rail>
	</VStack>

	<Title>Tabs</Title>
	<TabHolder items={tabItems} bind:value={activeTab} />
	<Body>Active tab: {activeTab}</Body>

	<Title>Navbar (Bottom)</Title>
	<div class="relative h-24 overflow-hidden rounded-2xl bg-md-sys-color-surface-container">
		<Navbar>
			<NavbarItem href="/" label="Главная" iconProps={{ name: 'home' }} />
			<NavbarItem href="/lessons" label="Занятия" iconProps={{ name: 'book' }} badge={2} />
			<NavbarItem href="/tasks" label="Задания" iconProps={{ name: 'assignment' }} />
			<NavbarItem href="/profile" label="Профиль" iconProps={{ name: 'person' }} />
		</Navbar>
	</div>

	<Divider />

	<!-- CARDS -->
	<Display>Cards</Display>
	<div class="flex gap-4">
		<Card class="p-4">
			<Title>Elevated</Title>
			<Body>Default card with elevation shadow.</Body>
		</Card>
		<Card type="outlined" class="p-4">
			<Title>Outlined</Title>
			<Body>Card with an outline border.</Body>
		</Card>
		<Card type="filled" class="p-4">
			<Title>Filled</Title>
			<Body>Card with filled background.</Body>
		</Card>
	</div>

	<Divider />

	<!-- DIALOGUES -->
	<Display>Dialogues</Display>
	<div class="flex flex-wrap gap-4">
		<Button
			onclick={() => {
				showModal = !showModal;
			}}>Simple Dialogue</Button
		>
		<Button
			variant="tonal"
			onclick={() => {
				showModal2 = !showModal2;
			}}>With Headline</Button
		>
		<Button
			variant="outlined"
			onclick={() => {
				showModal3 = !showModal3;
			}}>Long Content</Button
		>
	</div>
	{#if showModal}
		<Dialogue
			withState={false}
			supportingText="Не то чтобы совсем, а все ж-таки давно, жил на Руси кто-то там великий"
			class="w-2xl"
			confirmAction="?/update"
			confirmText="Подтвердить"
			toggle={() => (showModal = !showModal)}
		/>
	{/if}
	{#if showModal2}
		<Dialogue
			withState={false}
			headline="Сбросить настройки?"
			supportingText="Все изменения будут потеряны."
			confirmAction="?/update"
			confirmText="Сбросить"
			toggle={() => (showModal2 = !showModal2)}
		/>
	{/if}
	{#if showModal3}
		<Dialogue
			withState={false}
			supportingText="Anim sunt eiusmod deserunt Lorem. Tempor dolor voluptate fugiat elit sint ipsum ea. Enim proident velit sit Lorem esse. Nostrud cupidatat ut duis aute consectetur veniam pariatur voluptate exercitation."
			confirmAction="?/update"
			headline="Длинный текст"
			confirmText="Lorem"
			toggle={() => (showModal3 = !showModal3)}
		/>
	{/if}

	<Divider />

	<!-- TEXT FIELDS -->
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

	<Divider />

	<!-- FORMS -->
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

	<Divider />

	<!-- POPOVER -->
	<Display>Popover</Display>
	<div class="flex flex-wrap items-start gap-6">
		<Popover title="Быстрые действия">
			{#snippet trigger()}
				<Button iconProps={{ name: 'tune' }}>Настройки</Button>
			{/snippet}
			<div class="flex flex-col gap-2">
				<Button variant="text" iconProps={{ name: 'edit' }}>Редактировать</Button>
				<Button variant="text" iconProps={{ name: 'share' }}>Поделиться</Button>
				<Button variant="text" color="error" iconProps={{ name: 'delete' }}>Удалить</Button>
			</div>
		</Popover>

		<Popover title="Уведомления" side="bottom" align="end">
			{#snippet trigger()}
				<ButtonIcon iconProps={{ name: 'notifications' }} variant="tonal" />
			{/snippet}
			<div class="flex flex-col gap-1">
				<Body>Новое задание добавлено</Body>
				<Body>Урок начнётся через 10 мин</Body>
			</div>
		</Popover>

		<Popover showClose={false} side="right">
			{#snippet trigger()}
				<ButtonIcon iconProps={{ name: 'info' }} variant="outlined" />
			{/snippet}
			<Body>Поповер без заголовка и без кнопки закрытия. Клик снаружи закрывает его.</Body>
		</Popover>
	</div>

	<Divider />

	<!-- TOOLBAR -->
	<Display>Toolbar</Display>
	<div class="flex flex-col gap-6">
		<div class="flex flex-col gap-2">
			<Label>Text formatting (multiple select)</Label>
			<Toolbar>
				<ToolbarGroup type="multiple" value={toolbarFormat}>
					<ToolbarGroupItem value="bold" iconProps={{ name: 'format_bold' }} />
					<ToolbarGroupItem value="italic" iconProps={{ name: 'format_italic' }} />
					<ToolbarGroupItem value="underline" iconProps={{ name: 'format_underlined' }} />
					<ToolbarGroupItem value="strikethrough" iconProps={{ name: 'strikethrough_s' }} />
				</ToolbarGroup>
				<ToolbarDivider />
				<ToolbarGroup type="single" value={toolbarAlign}>
					<ToolbarGroupItem value="left" iconProps={{ name: 'format_align_left' }} />
					<ToolbarGroupItem value="center" iconProps={{ name: 'format_align_center' }} />
					<ToolbarGroupItem value="right" iconProps={{ name: 'format_align_right' }} />
					<ToolbarGroupItem value="justify" iconProps={{ name: 'format_align_justify' }} />
				</ToolbarGroup>
				<ToolbarDivider />
				<ToolbarButton iconProps={{ name: 'undo' }} />
				<ToolbarButton iconProps={{ name: 'redo' }} />
			</Toolbar>
			<Body>Format: {toolbarFormat.join(', ') || '—'} · Align: {toolbarAlign}</Body>
		</div>

		<div class="flex flex-col gap-2">
			<Label>Vertical orientation</Label>
			<Toolbar orientation="vertical">
				<ToolbarButton iconProps={{ name: 'brush' }} />
				<ToolbarButton iconProps={{ name: 'edit' }} />
				<ToolbarButton iconProps={{ name: 'crop' }} />
				<ToolbarDivider />
				<ToolbarButton iconProps={{ name: 'zoom_in' }} />
				<ToolbarButton iconProps={{ name: 'zoom_out' }} />
			</Toolbar>
		</div>
	</div>

	<Divider />

	<!-- TOGGLE GROUP -->
	<Display>Toggle Group</Display>
	<div class="flex flex-col gap-6">
		<div class="flex flex-col gap-2">
			<Label>Single select (period)</Label>
			<ToggleGroup type="single" bind:value={segmentSingle}>
				<ToggleGroupItem value="day" label="День" />
				<ToggleGroupItem value="week" label="Неделя" />
				<ToggleGroupItem value="month" label="Месяц" />
			</ToggleGroup>
			<Body>Selected: {segmentSingle}</Body>
		</div>

		<div class="flex flex-col gap-2">
			<Label>Multiple select with icons</Label>
			<ToggleGroup type="multiple" bind:value={segmentMulti}>
				<ToggleGroupItem value="bold" label="Bold" iconProps={{ name: 'format_bold' }} />
				<ToggleGroupItem value="italic" label="Italic" iconProps={{ name: 'format_italic' }} />
				<ToggleGroupItem value="link" label="Link" iconProps={{ name: 'link' }} />
			</ToggleGroup>
			<Body>Active: {segmentMulti.join(', ') || '—'}</Body>
		</div>

		<div class="flex flex-col gap-2">
			<Label>Disabled</Label>
			<ToggleGroup type="single" value="week" disabled>
				<ToggleGroupItem value="day" label="День" />
				<ToggleGroupItem value="week" label="Неделя" />
				<ToggleGroupItem value="month" label="Месяц" />
			</ToggleGroup>
		</div>
	</div>

	<Divider />

	<!-- MENU -->
	<Display>Menu</Display>
	<div class="flex gap-4">
		<Menu
			items={menuItems}
			label="Действия"
			selected={selectedMenu}
			onselect={(v) => (selectedMenu = v)}
		/>
		<Menu
			items={menuItems}
			label="Align end"
			align="end"
			selected={selectedMenu}
			onselect={(v) => (selectedMenu = v)}
		/>
	</div>
	{#if selectedMenu}
		<Body>Selected: {selectedMenu}</Body>
	{/if}

	<Divider />

	<!-- SNACKBAR -->
	<Display>Snackbar</Display>
	<div class="flex gap-4">
		<Button
			onclick={() => {
				snackbarMsg = 'Это уведомление исчезнет через 5 секунд';
			}}
		>
			Show Snackbar
		</Button>
	</div>
	<div class="space-y-4">
		<Snackbar
			message="Long persistent message about something important that happened in the app."
			label="Dismiss"
			static
			fixed={false}
		/>
		<Snackbar message="With close button" label="Action" showClose static fixed={false} />
		<Snackbar static message="No action, no close" fixed={false} />
	</div>
	{#if snackbarMsg}
		<Snackbar
			message={snackbarMsg}
			label="OK"
			callback={() => (snackbarMsg = '')}
			showClose={false}
			fixed
		/>
	{/if}

	<Divider />

	<!-- PROGRESS -->
	<Display>Progress</Display>
	<Headline>Linear Progress</Headline>
	<div class="flex max-w-xl flex-col gap-6">
		<LinearProgress percent={30} />
		<LinearProgress percent={65} />
		<LinearProgress percent={100} />
	</div>

	<Headline>Circular Progress</Headline>
	<div class="flex flex-wrap items-center gap-6">
		<CircularProgress percent={25} />
		<CircularProgress percent={50} />
		<CircularProgress percent={75} />
		<CircularProgress percent={100} />
		<CircularProgress percent={60} size={64} thickness={6} />
		<CircularProgress percent={60} size={32} thickness={3} />
	</div>

	<Headline>Wavy Linear Progress</Headline>
	<div class="flex max-w-xl flex-col gap-4">
		<WavyLinearProgress percent={60} />
	</div>

	<Divider />

	<!-- BADGES & AVATAR -->
	<Display>Badges & Avatars</Display>
	<div class="flex flex-wrap items-center gap-8">
		<div class="relative inline-flex">
			<ButtonIcon iconProps={{ name: 'notifications' }} variant="text" />
			<Badge size="sm" number={1} class="absolute -top-1 -right-1" />
		</div>
		<div class="relative inline-flex">
			<ButtonIcon iconProps={{ name: 'mail' }} variant="text" />
			<Badge size="lg" number={5} class="absolute -top-1 -right-1" />
		</div>
		<div class="relative inline-flex">
			<ButtonIcon iconProps={{ name: 'chat' }} variant="text" />
			<Badge size="lg" number={120} class="absolute -top-1 -right-1" />
		</div>
		<Avatar seed="alice" size="sm" />
		<Avatar seed="bob" size="md" />
		<Avatar seed="carol" size="lg" />
	</div>

	<Divider />

	<!-- LISTS -->
	<Display>Lists</Display>
	<div class="grid grid-cols-2 gap-4">
		<ul class="max-w-5xl">
			{#each Array(5).fill( { headline: 'Lesson', overline: 'Interesting', supporting: 'Adipisicing ullamco veniam enim aliqua cupidatat velit deserunt ipsum.', href: '/' } ) as lesson}
				<ListItem
					headline={lesson.headline}
					overline={lesson.overline}
					supporting={lesson.supporting}
					href={lesson.href}
				/>
			{/each}
		</ul>
		<ul class="max-w-5xl">
			{#each Array(5).fill( { headline: 'Task', supporting: 'Adipisicing ullamco veniam enim aliqua cupidatat velit deserunt ipsum.', href: '/' } ) as lesson}
				<ListItem headline={lesson.headline} supporting={lesson.supporting} href={lesson.href}>
					{#snippet trailing()}
						<Icon name="check" />
					{/snippet}
				</ListItem>
			{/each}
		</ul>
	</div>

	<Divider />

	<!-- SEARCH -->
	<Display>Search</Display>
	<div class="grid grid-cols-2 gap-4">
		<Search />
		<Search trailingIconProps={{ name: 'search' }} />
	</div>

	<Divider />

	<!-- SLIDER -->
	<Display>Slider</Display>
	<div class="max-w-md">
		<Slider value={5} />
	</div>

	<Divider />

	<!-- TIME & DATE -->
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
	<Divider />

	<!-- MULTIPART -->
	<Display>Multipart Upload</Display>
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
		{#each multipartDemos as demo (demo.label)}
			<div class="space-y-3 rounded-xl bg-md-sys-color-surface-container p-6">
				<Title>{demo.label}</Title>
				<Multipart {...demo.props} />
			</div>
		{/each}
	</div>
</SinglePane>
