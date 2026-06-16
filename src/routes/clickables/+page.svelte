<script lang="ts">
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
  import {
    ButtonIcon,
    FAB,
    FABMenuItem,
    Display,
    Title,
    Headline,
    Body,
    Label,
    Card,
    Dialogue,
    Snackbar,
    ListItem,
    Icon,
    Tooltip,
    Button,
    Menu,
    MenuItem,
    ContextMenu,
    Avatar,
    Badge,
    Popover,
    Toolbar,
    ToolbarButton,
    ToolbarGroup,
    ToolbarGroupItem,
    ToolbarDivider,
    ButtonGroup,
    ButtonGroupItem,
    LinearProgress,
    CircularProgress,
    WavyLinearProgress,
    SupportingPane,
    Pill,
    Toggle
  } from '$lib/index.js';
  import TableOfContents from '../TableOfContents.svelte';

  let showModal = $state(false);
  let showModal2 = $state(false);
  let showModal3 = $state(false);

  let snackbarMsg = $state('');
  let lastAction = $state('');
  let toolbarFormat = $state<string[]>([]);
  let toolbarAlign = $state('left');
  let segmentSingle = $state('day');
  let segmentMulti = $state<string[]>(['bold']);
  let toggleA = $state(true);
  let toggleB = $state(false);

  const toc = [
    { id: 'buttons', label: 'Buttons' },
    { id: 'tooltips', label: 'Tooltips' },
    { id: 'cards', label: 'Cards' },
    { id: 'dialogues', label: 'Dialogues' },
    { id: 'popover', label: 'Popover' },
    { id: 'toolbar', label: 'Toolbar' },
    { id: 'button-group', label: 'Button Group' },
    { id: 'menu', label: 'Menu' },
    { id: 'context-menu', label: 'Context Menu' },
    { id: 'pill', label: 'Pills' },
    { id: 'snackbar', label: 'Snackbar' },
    { id: 'progress', label: 'Progress' },
    { id: 'badges', label: 'Badges & Avatars' },
    { id: 'lists', label: 'Lists' }
  ];
</script>

<svelte:head>
  <title>Clickables | Ogonëk M3</title>
</svelte:head>

<SupportingPane>
  {#snippet main()}
    <SinglePane contentClass="p-12 gap-12">
      <!-- BUTTONS -->
      <section id="buttons" class="flex scroll-mt-4 flex-col gap-6">
        <Display>Buttons</Display>
        <Headline>Regular Buttons</Headline>
        <div class="grid grid-cols-6 items-center gap-4">
          <Button>Filled</Button>
          <Button iconProps={{ name: 'home' }}>With Icon</Button>
          <Button variant="tonal">Tonal</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
          <Button variant="elevated">Elevated</Button>
          <Toggle bind:pressed={toggleA}>Selected</Toggle>
          <Toggle bind:pressed={toggleB}>Unselected</Toggle>
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
      </section>

      <!-- TOOLTIPS -->
      <section id="tooltips" class="flex scroll-mt-4 flex-col gap-6">
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
      </section>

      <!-- CARDS -->
      <section id="cards" class="flex scroll-mt-4 flex-col gap-6">
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
      </section>

      <!-- DIALOGUES -->
      <section id="dialogues" class="flex scroll-mt-4 flex-col gap-6">
        <Display>Dialogues</Display>
        <div class="flex flex-wrap gap-4">
          <Button onclick={() => (showModal = !showModal)}>Simple Dialogue</Button>
          <Button variant="tonal" onclick={() => (showModal2 = !showModal2)}>With Headline</Button>
          <Button variant="outlined" onclick={() => (showModal3 = !showModal3)}>Long Content</Button
          >
        </div>
        <Dialogue
          enhance={() => {}}
          bind:open={showModal}
          supportingText="Не то чтобы совсем, а все ж-таки давно, жил на Руси кто-то там великий"
          class="w-2xl"
          confirmAction="?/update"
          confirmText="Подтвердить"
        />
        <Dialogue
          enhance={() => {}}
          bind:open={showModal2}
          headline="Сбросить настройки?"
          supportingText="Все изменения будут потеряны."
          confirmAction="?/update"
          confirmText="Сбросить"
        />
        <Dialogue
          bind:open={showModal3}
          enhance={() => {}}
          supportingText="Anim sunt eiusmod deserunt Lorem. Tempor dolor voluptate fugiat elit sint ipsum ea. Enim proident velit sit Lorem esse. Nostrud cupidatat ut duis aute consectetur veniam pariatur voluptate exercitation."
          confirmAction="?/update"
          headline="Длинный текст"
          confirmText="Lorem"
        />
      </section>

      <!-- POPOVER -->
      <section id="popover" class="flex scroll-mt-4 flex-col gap-6">
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
      </section>

      <!-- TOOLBAR -->
      <section id="toolbar" class="flex scroll-mt-4 flex-col gap-6">
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

          <div class="flex flex-col gap-2">
            <Label>Vibrant color</Label>
            <Toolbar color="vibrant">
              <ToolbarGroup type="multiple" value={toolbarFormat}>
                <ToolbarGroupItem value="bold" iconProps={{ name: 'format_bold' }} />
                <ToolbarGroupItem value="italic" iconProps={{ name: 'format_italic' }} />
                <ToolbarGroupItem value="underline" iconProps={{ name: 'format_underlined' }} />
              </ToolbarGroup>
              <ToolbarDivider />
              <ToolbarButton iconProps={{ name: 'undo' }} />
              <ToolbarButton iconProps={{ name: 'redo' }} />
            </Toolbar>
          </div>

          <div class="flex flex-col gap-2">
            <Label>Docked (bottom app bar with FAB)</Label>
            <Toolbar variant="docked" color="standard">
              <ToolbarButton iconProps={{ name: 'menu' }} />
              <ToolbarButton iconProps={{ name: 'search' }} />
              <ToolbarButton iconProps={{ name: 'more_vert' }} />
              {#snippet fab()}
                <FAB iconProps={{ name: 'add' }} size="regular" config="primary" />
              {/snippet}
            </Toolbar>
          </div>

          <div class="flex flex-col gap-2">
            <Label>Docked vibrant with FAB</Label>
            <Toolbar variant="docked" color="vibrant">
              <ToolbarButton iconProps={{ name: 'menu' }} />
              <ToolbarButton iconProps={{ name: 'search' }} />
              <ToolbarButton iconProps={{ name: 'more_vert' }} />
              {#snippet fab()}
                <FAB iconProps={{ name: 'edit' }} size="regular" config="tertiary" />
              {/snippet}
            </Toolbar>
          </div>
        </div>
      </section>

      <!-- BUTTON GROUP -->
      <section id="button-group" class="flex scroll-mt-4 flex-col gap-6">
        <Display>Button Group</Display>
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <Label>Single select (period)</Label>
            <ButtonGroup type="single" bind:value={segmentSingle}>
              <ButtonGroupItem value="day" label="День" />
              <ButtonGroupItem value="week" label="Неделя" />
              <ButtonGroupItem value="month" label="Месяц" />
            </ButtonGroup>
            <Body>Selected: {segmentSingle}</Body>
          </div>

          <div class="flex flex-col gap-2">
            <Label>Multiple select with icons</Label>
            <ButtonGroup type="multiple" bind:value={segmentMulti}>
              <ButtonGroupItem value="bold" label="Bold" iconProps={{ name: 'format_bold' }} />
              <ButtonGroupItem
                value="italic"
                label="Italic"
                iconProps={{ name: 'format_italic' }}
              />
              <ButtonGroupItem value="link" label="Link" iconProps={{ name: 'link' }} />
            </ButtonGroup>
            <Body>Active: {segmentMulti.join(', ') || '—'}</Body>
          </div>

          <div class="flex flex-col gap-2">
            <Label>Square shape</Label>
            <ButtonGroup type="single" bind:value={segmentSingle} shape="square">
              <ButtonGroupItem value="day" label="День" />
              <ButtonGroupItem value="week" label="Неделя" />
              <ButtonGroupItem value="month" label="Месяц" />
            </ButtonGroup>
          </div>

          <div class="flex flex-col gap-2">
            <Label>Sizes</Label>
            <div class="flex flex-col gap-3">
              <ButtonGroup type="single" bind:value={segmentSingle} size="xs">
                <ButtonGroupItem value="day" label="XS" />
                <ButtonGroupItem value="week" label="XS" />
                <ButtonGroupItem value="month" label="XS" />
              </ButtonGroup>
              <ButtonGroup type="single" bind:value={segmentSingle} size="sm">
                <ButtonGroupItem value="day" label="SM" />
                <ButtonGroupItem value="week" label="SM" />
                <ButtonGroupItem value="month" label="SM" />
              </ButtonGroup>
              <ButtonGroup type="single" bind:value={segmentSingle} size="md">
                <ButtonGroupItem value="day" label="MD" />
                <ButtonGroupItem value="week" label="MD" />
                <ButtonGroupItem value="month" label="MD" />
              </ButtonGroup>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <Label>Disabled</Label>
            <ButtonGroup type="single" value="week" disabled>
              <ButtonGroupItem value="day" label="День" />
              <ButtonGroupItem value="week" label="Неделя" />
              <ButtonGroupItem value="month" label="Месяц" />
            </ButtonGroup>
          </div>

          <div class="flex flex-col gap-2">
            <Label>Vertical</Label>
            <ButtonGroup type="single" bind:value={segmentSingle} orientation="vertical">
              <ButtonGroupItem value="day" label="День" />
              <ButtonGroupItem value="week" label="Неделя" />
              <ButtonGroupItem value="month" label="Месяц" />
            </ButtonGroup>
          </div>
        </div>
      </section>

      <!-- MENU -->
      <section id="menu" class="flex scroll-mt-4 flex-col gap-6">
        <Display>Menu</Display>
        <div class="flex gap-4">
          <Menu label="Действия">
            <MenuItem onclick={() => (lastAction = 'edit')}>Редактировать</MenuItem>
            <MenuItem onclick={() => (lastAction = 'duplicate')}>Дублировать</MenuItem>
            <MenuItem onclick={() => (lastAction = 'archive')}>Архивировать</MenuItem>
            <MenuItem helper="Безвозвратно" onclick={() => (lastAction = 'delete')}
              >Удалить</MenuItem
            >
          </Menu>
          <Menu label="Align end" align="end">
            <MenuItem onclick={() => (lastAction = 'edit')}>Редактировать</MenuItem>
            <MenuItem onclick={() => (lastAction = 'duplicate')}>Дублировать</MenuItem>
            <MenuItem onclick={() => (lastAction = 'archive')}>Архивировать</MenuItem>
            <MenuItem helper="Безвозвратно" onclick={() => (lastAction = 'delete')}
              >Удалить</MenuItem
            >
          </Menu>
        </div>
        {#if lastAction}
          <Body>Last action: {lastAction}</Body>
        {/if}
      </section>

      <!-- CONTEXT MENU -->
      <section id="context-menu" class="flex scroll-mt-4 flex-col gap-6">
        <Display>Context Menu</Display>
        <Body>Right-click the card below to see the context menu.</Body>
        <div class="flex gap-4">
          <ContextMenu
            onselect={(v) => (lastAction = `context:${v}`)}
            items={[
              { label: 'View', value: 'view', iconProps: { name: 'visibility' } },
              { label: 'Edit', value: 'edit', iconProps: { name: 'edit' } },
              {
                label: 'Share',
                value: 'share',
                iconProps: { name: 'share' },
                items: [
                  { label: 'Copy Link', value: 'copy' },
                  { label: 'Email', value: 'email' }
                ]
              },
              { separator: true },
              { label: 'Delete', value: 'delete', iconProps: { name: 'delete' } }
            ]}
          >
            <Card class="flex h-32 w-64 items-center justify-center">
              <Label>Right click me</Label>
            </Card>
          </ContextMenu>
        </div>
      </section>

      <!-- PILLS -->
      <section id="pill" class="flex scroll-mt-4 flex-col gap-6">
        <Display>Pills</Display>
        <Headline>Variants</Headline>
        <div class="flex flex-wrap items-center gap-4">
          <Pill variant="primary">Primary</Pill>
          <Pill variant="secondary">Secondary</Pill>
          <Pill variant="tertiary">Tertiary</Pill>
          <Pill variant="error">Error</Pill>
          <Pill variant="container">Container</Pill>
          <Pill variant="yellow">Yellow</Pill>
          <Pill variant="green">Green</Pill>
        </div>
      </section>

      <!-- SNACKBAR -->
      <section id="snackbar" class="flex scroll-mt-4 flex-col gap-6">
        <Display>Snackbar</Display>
        <div class="flex gap-4">
          <Button onclick={() => (snackbarMsg = 'Это уведомление исчезнет через 5 секунд')}>
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
        <Snackbar
          bind:message={snackbarMsg}
          label="OK"
          callback={() => (snackbarMsg = '')}
          showClose={false}
          fixed
        />
      </section>

      <!-- PROGRESS -->
      <section id="progress" class="flex scroll-mt-4 flex-col gap-6">
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
      </section>

      <!-- BADGES & AVATAR -->
      <section id="badges" class="flex scroll-mt-4 flex-col gap-6">
        <Display>Badges & Avatars</Display>
        <Headline>On icons</Headline>
        <div class="flex flex-wrap items-center gap-8">
          <div class="relative inline-flex">
            <ButtonIcon iconProps={{ name: 'notifications' }} variant="text" />
            <Badge size="sm" class="absolute -top-1 -right-1" />
          </div>
          <div class="relative inline-flex">
            <ButtonIcon iconProps={{ name: 'mail' }} variant="text" />
            <Badge size="lg" number={5} class="absolute -top-1 -right-1" />
          </div>
          <div class="relative inline-flex">
            <ButtonIcon iconProps={{ name: 'chat' }} variant="text" />
            <Badge size="lg" number={120} class="absolute -top-1 -right-1" />
          </div>
        </div>
        <Headline>Standalone</Headline>
        <div class="flex flex-wrap items-center gap-6">
          <div class="relative size-3">
            <Badge size="sm" />
          </div>
          <div class="relative size-4">
            <Badge size="lg" number={3} />
          </div>
          <div class="relative size-4">
            <Badge size="lg" number={99} />
          </div>
          <div class="relative size-4">
            <Badge size="lg" number={200} />
          </div>
        </div>
        <Headline>Avatars</Headline>
        <div class="flex flex-wrap items-center gap-6">
          <Avatar seed="alice" size="sm" />
          <Avatar seed="bob" size="md" />
          <Avatar seed="carol" size="lg" />
        </div>
      </section>

      <!-- LISTS -->
      <section id="lists" class="flex scroll-mt-4 flex-col gap-6">
        <Display>Lists</Display>

        <Headline>With badges</Headline>
        <div class="grid grid-cols-2 gap-4">
          <ul class="max-w-5xl">
            <ListItem headline="Inbox" supporting="3 unread messages" badge={3} href="/" />
            <ListItem
              headline="Notifications"
              supporting="Has new activity"
              badge={true}
              href="/"
            />
            <ListItem headline="Updates" supporting="99+ pending items" badge={120} href="/" />
            <ListItem headline="Archive" supporting="No new items" href="/" />
          </ul>
          <ul class="max-w-5xl">
            <ListItem
              headline="Messages"
              supporting="Badge and trailing together"
              badge={7}
              href="/"
            >
              {#snippet trailing()}
                <Icon name="mail" />
              {/snippet}
            </ListItem>
            <ListItem
              headline="Alerts"
              supporting="Dot badge with trailing icon"
              badge={true}
              href="/"
            >
              {#snippet trailing()}
                <Icon name="notifications" />
              {/snippet}
            </ListItem>
            <ListItem
              overline="Priority"
              headline="Critical system event"
              supporting="Requires immediate attention"
              badge={1}
              href="/"
            />
          </ul>
        </div>

        <Headline>Standard</Headline>
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
              <ListItem
                headline={lesson.headline}
                supporting={lesson.supporting}
                href={lesson.href}
              >
                {#snippet trailing()}
                  <Icon name="check" />
                {/snippet}
              </ListItem>
            {/each}
          </ul>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <ul class="max-w-5xl">
            <ListItem
              overline="Advanced Distributed Systems — Spring 2026"
              headline="Consensus Algorithms in Fault-Tolerant Replicated State Machines: From Paxos to Raft and Beyond"
              supporting="An exhaustive deep-dive into the theoretical underpinnings and practical trade-offs of leader-based consensus protocols, including split-brain scenarios, log compaction strategies, and membership reconfiguration under partial network partitions."
              href="/"
            />
            <ListItem
              overline="Critical Security Advisory · CVE-2026-00421"
              headline="Remote Code Execution via Deserialization of Untrusted Data in Legacy XML Processing Pipeline"
              supporting="Attackers who can supply crafted XML payloads to the public ingestion endpoint may trigger arbitrary object instantiation in the JVM heap, bypassing the existing class-allowlist filter and achieving full process-level code execution without authentication."
              href="/"
            />
            <ListItem
              overline="Q3 Roadmap · Product Strategy"
              headline="Unified Cross-Platform Identity and Access Management Rollout Across All Regional Data Centers"
              supporting="This initiative consolidates seven disparate IAM systems into a single federated provider, enforcing RBAC policies uniformly, eliminating shadow IT credential stores, and enabling real-time audit streaming to the SIEM platform."
              href="/"
            />
          </ul>
          <ul class="max-w-5xl">
            <ListItem
              headline="Investigate intermittent 503 errors on the checkout service during peak traffic — correlate with upstream Redis cluster failover events and determine whether connection-pool exhaustion or misconfigured health-check intervals are the root cause"
              supporting="Priority: P0 · Assigned to Platform Reliability · Due 2026-06-09"
              href="/"
            >
              {#snippet trailing()}
                <Icon name="bug_report" />
              {/snippet}
            </ListItem>
            <ListItem
              headline="Migrate all remaining Python 3.9 Lambda functions to 3.13 runtime, update dependency lock-files, run full regression suite, and coordinate zero-downtime deployment with the on-call rotation"
              supporting="Priority: P1 · Assigned to Backend Guild · Due 2026-06-20"
              href="/"
            >
              {#snippet trailing()}
                <Icon name="rocket_launch" />
              {/snippet}
            </ListItem>
            <ListItem
              headline="Draft and circulate the cross-functional data-retention policy covering GDPR Article 17 erasure obligations, CCPA opt-out flows, and internal audit log archival windows for legal sign-off"
              supporting="Priority: P2 · Assigned to Legal Engineering · Due 2026-07-01"
              href="/"
            >
              {#snippet trailing()}
                <Icon name="gavel" />
              {/snippet}
            </ListItem>
          </ul>
        </div>
      </section>
    </SinglePane>
  {/snippet}

  {#snippet supporting()}
    <TableOfContents sections={toc} />
  {/snippet}
</SupportingPane>
