<script lang="ts">
  import { Button } from "$lib";
</script>

<div class="p-8 flex flex-col gap-8">
  <h1 class="text-4xl font-bold">Ogonek M3 Components</h1>

  <section class="flex flex-col gap-4">
    <h2 class="text-2xl font-semibold">Buttons</h2>
    <div class="flex gap-4">
      <Button variant="filled">Filled Button</Button>
      <Button variant="tonal">Tonal Button</Button>
      <Button variant="outlined">Outlined Button</Button>
      <Button variant="text">Text Button</Button>
    </div>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-2xl font-semibold">Usage</h2>
    <pre class="bg-gray-100 p-4 rounded-lg">
      <code>
        import { Button } from "@ogonek/m3";

        <Button variant="filled">Click me</Button>
      </code>
    </pre>
  </section>
</div>
