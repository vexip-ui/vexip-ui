# 服务端渲染

在服务端渲染（SSR）的场景下使用 Vexip UI，你只需要像往常一样，无需做额外的操作。

::: info
组件内部涉及到依赖浏览器环境的相关操作都做了兼容处理，如果你在使用时发现问题请随时提交 [Issue](https://github.com/vexip-ui/vexip-ui/issues)。
:::

## Nuxt 模块

如果你使用 [Nuxt](https://nuxt.com/) 作为服务端渲染框架，可以使用 [Vexip Nuxt 模块](https://github.com/vexip-ui/nuxt)，里面包含了组件、插件、指令、图标以及它们的样式的自动按需引入。

首先在你的项目中安装 `@vexip-ui/nuxt` 依赖：

```sh
# 使用 pnpm
pnpm i -D @vexip-ui/nuxt

# 使用 yarn
yarn add -D @vexip-ui/nuxt
```

如果你想要控制 Vexip UI 的版本，你也需要安装 `vexip-ui` 依赖：

```sh
# 使用 pnpm
pnpm i -D vexip-ui

# 使用 yarn
yarn add -D vexip-ui
```

在 `nuxt.config.ts` 的 `modules` 选项中添加 `@vexip-ui/nuxt`：

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

随后即可在你的 Nuxt 项目中使用 Vexip UI 了：

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
