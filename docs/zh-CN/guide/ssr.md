# 服务端渲染

在服务端渲染（SSR）的场景下使用 Vexip UI，你只需要像往常一样，无需做额外的操作。

::: info
组件内部涉及到依赖浏览器环境的相关操作都做了兼容处理，如果你在使用时发现问题请随时提交 [Issue](https://github.com/vexip-ui/vexip-ui/issues)。
:::

## Nuxt 模块

如果你使用 [Nuxt](https://nuxt.com/) 作为服务端渲染框架，可以使用 [Vexip Nuxt 模块](https://github.com/vexip-ui/nuxt)，里面包含了组件、插件、指令、图标以及它们的样式的自动按需引入。

你可以使用下面的命令快速创建一个包含 Vexip Nuxt 模块 Nuxt 的项目：

```sh
# 使用 pnpm
pnpm create vexip --template nuxt

# 使用 yarn
yarn create vexip --template nuxt
```

或者在你已有的项目中安装 `@vexip-ui/nuxt` 依赖：

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

### 自定义 Sass 变量

修改的方法和 [样式配置](/zh-CN/guide/style-config.html#%E9%80%9A%E8%BF%87-sass-%E4%BF%AE%E6%94%B9) 中的一样，只不过需要通过 `nuxt.config.ts` 修改 Vite 配置。

首先需要准备一个单独的文件，并改用 `@forward...with` 修改变量：

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

然后在 `nuxt.config.ts` 中拓展以下内容：

```ts
const vxpStylePresetRE = /vexip-ui\/style(?:\/dark)?\/preset/

export default defineNuxtConfig({
  modules: [
    '@vexip-ui/nuxt'
  ],
  vexipUI: {
    importStyle: 'sass'
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: (code: string, path: string) => {
            return vxpStylePresetRE.test(path)
              ? code.replace('@use \'./design/variables.scss\' as *;', '@use \'@/style/variables.scss\' as *;')
              : code
          }
        }
      }
    }
  }
})
```

### 国际化

在使用 Nuxt 模块后，由于没有使用 `app.use`，所以需要通过 ConfigProvider 组件提供国际化配置：

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
