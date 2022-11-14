It is used to quickly create form fields when you need to collect and verify some information.

:::warning
Under the FormItem component, we promise that there is at most one top-level control component (components except the Form under the **Form** category), follow this promise, FormItem will automatically implement two-way data binding, state synchronization and so on for the control component under it.
:::

When using the `model` prop to init the Form, you can directly pass in an empty object, and the default value of the field will be auto inited inside the component, but the type still needs to be defined by yourself.

```vue
<template>
  <Form :model="model"></Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface Model {
  name: string
}

const model = reactive({} as Model)
</script>
```
