<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TabHolder from './TabHolder.svelte';
  import TabContent from './TabContent.svelte';
  import Body from '../../typography/body/Body.svelte';

  const { Story } = defineMeta({
    title: 'Navigation/Tabs',
    component: TabHolder,
    argTypes: {
      variant: {
        control: 'select',
        options: ['primary', 'secondary']
      },
      activationMode: {
        control: 'select',
        options: ['automatic', 'manual']
      }
    },
    args: {
      variant: 'primary',
      activationMode: 'automatic'
    }
  });

  const items = [
    { value: 'flights', name: 'Flights', iconProps: { name: 'flight' } },
    { value: 'trips', name: 'Trips', iconProps: { name: 'luggage' } },
    { value: 'explore', name: 'Explore', iconProps: { name: 'explore' } }
  ];
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class="flex flex-col gap-4">
      <TabHolder {...args} {items} />
      <TabContent value="flights"><Body>Flights panel content.</Body></TabContent>
      <TabContent value="trips"><Body>Trips panel content.</Body></TabContent>
      <TabContent value="explore"><Body>Explore panel content.</Body></TabContent>
    </div>
  {/snippet}
</Story>

<Story name="Navigation Tabs (href)" args={{ variant: 'primary' }}>
  {#snippet template(args)}
    <TabHolder
      {...args}
      items={[
        { value: 'home', name: 'Home', href: '#', iconProps: { name: 'house' } },
        { value: 'search', name: 'Search', href: '#', iconProps: { name: 'search' } },
        { value: 'settings', name: 'Settings', href: '#', iconProps: { name: 'settings' } }
      ]}
    />
  {/snippet}
</Story>
