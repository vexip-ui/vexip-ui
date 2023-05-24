# Server-Side Rendering

When using Vexip UI with Server-Side Rendering (SSR), you don't need to do any additional action. Just like usual.

::: info
All the operations that rely on the browser environment have compatible processing in the component internal. If you encounter any issue while using the component, please submit an [Issue](https://github.com/vexip-ui/vexip-ui/issues).
:::

## Nuxt Module

If you are using [Nuxt](https://nuxt.com/) as Server-Side Rendering framework, You can use [Vexip Nuxt Module](https://github.com/vexip-ui/nuxt) which contains automatically import components, plugins, directives, icons and their styles on demand.

Add `@vexip-ui/nuxt` dependency to your project:

```sh
# Using pnpm
pnpm i -D @vexip-ui/nuxt

# Using yarn
yarn add -D @vexip-ui/nuxt
```

If you want to control the version of Vexip UI, you need to add `vexip-ui` dependency to your project too:

```sh
# Using pnpm
pnpm i -D vexip-ui

# Using yarn
yarn add -D vexip-ui
```

Add `@vexip-ui/nuxt` to the `modules` section of `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: [
    '@vexip-ui/nuxt'
  ],
  vexipUI: {
    // Your module options
  }
})
```

That's it! You can now use Vexip UI in your Nuxt app:

```vue
<template>
  <VButton :icon="IUser" @click="handleClick">
    Button
  </VButton>
  <VIcon>
    <ISackDollar></ISackDollar>
  </VIcon>
</template>

<script setup lang="ts">
function handleClick() {
  VMessage.success('Success!')
}
</script>
```
