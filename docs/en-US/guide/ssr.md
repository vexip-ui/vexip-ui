# Server-Side Rendering

When using Vexip UI with Server-Side Rendering (SSR), you don't need to do any additional action. Just like usual.

::: info
All the operations that rely on the browser environment have compatible processing in the component internal. If you encounter any issue while using the component, please submit an [Issue](https://github.com/vexip-ui/vexip-ui/issues).
:::

## Nuxt Module

If you are using [Nuxt](https://nuxt.com/) as Server-Side Rendering framework, You can use [Vexip Nuxt Module](https://github.com/vexip-ui/nuxt) which contains automatically import components, plugins, directives, icons and their styles on demand.

You can use the following command to quickly create a Nuxt project that contains Vexip Nuxt Module:

```sh
# Using pnpm
pnpm create vexip --template nuxt

# Using yarn
yarn create vexip --template nuxt
```

Or add `@vexip-ui/nuxt` dependency to your existed project:

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

### Custom Sass Variables

The way is same to [Style Config](/en-US/guide/style-config.html#edit-via-sass), the only different is that you need to change config of Vite via `nuxt.config.ts`.

First, you need to prepare a separate file, and use `@forward...with` to modify variables:

```scss
// style/variables.scss
@forward 'vexip-ui/style/design' with (
  $color-map: (
    primary: (
      base: #845ef7
    )
  )
);
```

If you also want to change the dark mode style, create a separate file similarly:

```scss
// style/dark-variables.scss
@forward 'vexip-ui/style/dark/variables.scss' with (
  $content-color-map: (
    base: #fff
  )
);
```

Then add following in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: [
    '@vexip-ui/nuxt'
  ],
  vexipUI: {
    importStyle: 'sass',
    // importDarkTheme: true,
    themeVarsPath: {
      base: '@/style/variables.scss'
      // dark: '@/style/dark-variables.scss'
    }
  }
})
```

### Internationalization

After using the Nuxt module, since `app.use` is not used, locale configuration needs to be provided via the ConfigProvider component:

```vue
<template>
  <VConfigProvider :locale="enUSLocale()">
    <App></App>
  </VConfigProvider>
</template>

<script setup lang="ts">
import { enUSLocale } from 'vexip-ui'
</script>
```
