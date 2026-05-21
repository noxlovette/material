<script lang="ts">
  import { onMount } from 'svelte';
  import {
    Display,
    Headline,
    Body,
    Textfield,
    DateField,
    DateRangeField,
    LoadingIndicator,
    TimepickerInput,
    Slider,
    Search,
    Checkbox,
    Switch,
    Select,
    RadioGroup,
    SupportingPane,
    Dialogue,
    Button,
    type SelectOption
  } from '$lib/index.js';
  import { nanoid } from 'nanoid';
  import type { DateValue } from '@internationalized/date';
  import type { DateRange } from '$lib/index.js';
  import TableOfContents from '../TableOfContents.svelte';
  import { superForm, defaults } from 'sveltekit-superforms';
  import { zod4 as zod } from 'sveltekit-superforms/adapters';
  import { z } from 'zod/v4';
  import SuperDebug from 'sveltekit-superforms';
  import SinglePane from '$lib/components/containers/panes/SinglePane.svelte';
  import Divider from '$lib/components/containers/divider/Divider.svelte';

  const demoSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    language: z.string(),
    notifications: z.boolean(),
    theme: z.string(),
    check: z.boolean()
  });

  const { form, errors, enhance } = superForm(defaults(zod(demoSchema)), {
    SPA: true,
    validators: zod(demoSchema)
  });

  let switchOn = $state(false);
  let switchIcons = $state(true);
  let selectValue = $state('');
  let selectInDialogue = $state('');
  let selectInDialogue2 = $state('');
  let dialogueOpen = $state(false);
  let radioValue = $state('');
  let radioValue2 = $state('en');
  let dateValue = $state<DateValue | undefined>(undefined);
  let dateRange = $state<DateRange | undefined>(undefined);

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

  const languageItems: SelectOption[] = [
    { value: 'ru', label: 'Русский' },
    { value: 'en', label: 'English' },
    { value: 'de', label: 'Deutsch' },
    { value: 'fr', label: 'Français' }
  ];
  const selectItems: SelectOption[] = [
    { type: 'group', heading: 'Languages', items: languageItems }
  ];

  const toc = [
    { id: 'text-fields', label: 'Text Fields' },
    { id: 'forms', label: 'Forms' },
    { id: 'superforms', label: 'SuperForms' },
    { id: 'command', label: 'Command' },
    { id: 'search', label: 'Search' },
    { id: 'slider', label: 'Slider' },
    { id: 'time-date', label: 'Time & Date' },
    { id: 'multipart', label: 'Multipart Upload' }
  ];
</script>

<svelte:head>
  <title>Inputs | Ogonëk M3</title>
</svelte:head>

<SupportingPane centered={false}>
  {#snippet main()}
    <!-- TEXT FIELDS -->
    <SinglePane contentClass="gap-12 p-12">
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
          <Textfield
            error
            trailingOnClick={() => console.log('meow')}
            trailingIconProps={{ name: 'warning' }}
            label="Error state"
            id="tf7"
          >
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
          <Select
            type="single"
            bind:value={selectValue}
            options={selectItems}
            placeholder="Выберите язык"
          />
          <Body>Selected: {selectValue || '—'}</Body>
        </div>

        <Headline>Select inside Dialogue</Headline>
        <Button variant="outlined" onclick={() => (dialogueOpen = true)}>Open dialogue</Button>

        <Dialogue
          bind:open={dialogueOpen}
          enhance={() => {}}
          headline="Select inside dialogue"
          supportingText="Dropdown should appear above the overlay."
          confirmText="Confirm"
        >
          <div class="flex flex-col gap-4">
            <Select
              bind:value={selectInDialogue}
              type="single"
              options={selectItems}
              placeholder="Choose…"
            />
            <Select
              bind:value={selectInDialogue2}
              options={selectItems}
              type="single"
              placeholder="Choose…"
            />
          </div>
        </Dialogue>
      </section>
      <Divider variant="wavy" />
      <!-- SUPERFORMS -->
      <section id="superforms" class="flex scroll-mt-4 flex-col gap-6">
        <Display>SuperForms</Display>
        <Body>
          Live form state via <code>SuperDebug</code>. All fields below are bound to a single
          superform store — edit any input and watch the panel update.
        </Body>
        <form method="POST" use:enhance class="flex max-w-md flex-col gap-4">
          <Textfield label="Name" id="sf-name" bind:value={$form.name} error={!!$errors.name}>
            {#snippet supportingText()}
              {$errors.name?.[0] ?? ''}
            {/snippet}
          </Textfield>
          <Textfield label="Email" id="sf-email" bind:value={$form.email} error={!!$errors.email}>
            {#snippet supportingText()}
              {$errors.email?.[0] ?? ''}
            {/snippet}
          </Textfield>
          <Select
            type="single"
            bind:value={$form.language}
            options={selectItems}
            placeholder="Language"
          />
          <label class="flex cursor-pointer items-center gap-3">
            <Switch bind:checked={$form.notifications} />
            <Body>Notifications {$form.notifications ? 'on' : 'off'}</Body>
          </label>
          <RadioGroup
            bind:value={$form.theme}
            items={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'system', label: 'System' }
            ]}
            orientation="horizontal"
          />
          <Checkbox labelText="Check" bind:checked={$form.check} />
          <Button type="submit" variant="filled">Submit</Button>
        </form>
        <SuperDebug data={$form} />
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
      <section id="loading" class="flex flex-col gap-12">
        <Display>Loading</Display>
        <LoadingIndicator />
        <LoadingIndicator container />
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
        </div>
        <DateField label="Дата" bind:value={dateValue} />
        <Body>Selected: {dateValue?.toString() ?? '—'}</Body>

        <DateRangeField bind:value={dateRange} />
        <Body>
          Range: {dateRange?.start?.toString() ?? '—'} → {dateRange?.end?.toString() ?? '—'}
        </Body>
      </section>
    </SinglePane>
  {/snippet}

  {#snippet supporting()}
    <TableOfContents sections={toc} />
  {/snippet}
</SupportingPane>
