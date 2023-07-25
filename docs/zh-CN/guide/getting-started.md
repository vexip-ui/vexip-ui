# 快速上手

通过该章节，你将了解到如何快速开始使用 Vexip UI。

> 在开始之前，你需要掌握了 [Vue3](https://v3.cn.vuejs.org/) 的正确打开方式。

## 安装 Vexip UI

### 使用模版

Vexip UI 提供了一些快速开始的模版，你可以通过下面的命令使用它们：

```sh
# 使用 pnpm
pnpm create vexip

# 使用 yarn
yarn create vexip
```

然后按照提示操作即可。

你还可以通过附加选项指定模版和一些其他依赖，查看 [create-vexip](https://github.com/vexip-ui/create-vexip) 以获取更多的细节。

:::info
模版项目已经配置好相关的插件，你仍可以阅读后面的内容以了解它们是如何工作的。
:::

### 在现存的项目

在你的项目中执行：

```sh
# 使用 pnpm
pnpm add vexip-ui

# 使用 yarn
yarn add vexip-ui
```

## 直接引入

Vexip UI 本身已具备 tree-shaking 的能力，你可以在需要使用组件的地方直接引入，这样只有用到的组件才会被打包。

```vue
<template>
  <Button>Get Stared</Button>
</template>

<script setup lang="ts">
import 'vexip-ui/es/css/button'

import { Button } from 'vexip-ui'
</script>
```

不过可以看到，这种方式你需要为每个组件单独引入样式文件。

出于样式的压缩率比较高，以及便利性的考虑，你可以在顶层直接引入全部样式：

```ts
import 'vexip-ui/css/index.css'
```

如果你也完全不在意 js 的打包大小，或者说你几乎使用了所有的组件，那你可以选择全局引入整个组件库：

```ts
import 'vexip-ui/css/index.css'

import { createApp } from 'vue'
import App from './app.vue'
import { install } from 'vexip-ui'

createApp(App).use(install).mount('#app')
```

## 自动引入

在按需引入时，我们可以通过一些插件来实现样式的自动引入。

### Vite

借助 Vite 插件 [vite-plugin-style-import](https://github.com/anncwb/vite-plugin-style-import) 可以更简洁地进行按需引入。

安装插件：

```sh
pnpm i -D vite-plugin-style-import
```

在 `vite.config.ts` 中拓展以下内容：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createStyleImportPlugin } from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    vue(),
    createStyleImportPlugin({
      include: ['**/*.ts', '**/*.vue'],
      libs: [
        {
          libraryName: 'vexip-ui',
          esModule: true,
          // 引入暗黑模式基础样式
          // base: 'vexip-ui/es/css/dark',
          resolveStyle: name => `vexip-ui/es/css/${name}`
        }
      ]
    })
  ]
})
```

如果你连引入组件都觉得麻烦，那可以试试用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 和 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) 完成自动引入。

安装插件：

```sh
pnpm i -D unplugin-vue-components unplugin-auto-import @vexip-ui/plugins
```

在 `vite.config.ts` 中拓展以下内容：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VexipUIResolver } from '@vexip-ui/plugins'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        VexipUIResolver()
      ]
    }),
    AutoImport({
      resolvers: [
        VexipUIResolver()
      ]
    })
  ]
})
```

然后就可以直接像下面这样使用组件库了：

```vue
<template>
  <Button type="primary" @click="handleClick">
    Button
  </Button>
  <div
    v-loading="active"
    style="position: relative; width: 400px; padding-top: 60px; background-color: #fab00577;"
  ></div>
  <Icon><IUser></IUser></Icon>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(true)

function handleClick() {
  Message.info('Clicked Button')
}
</script>
```

:::warning
在使用自动引入的时候，图标类组件需要全部加上 `I` 前缀，例如 `User` -> `IUser`。

你可以通过 Resolver 选项的 `iconPrefix` 来修改图标的前缀。
:::

不过在仅使用 Resolver 的时候，图标类组件的使用只能通过标签的形式使用，如果你想要通过变量来使用则需要一些额外的配置：

```ts
export default defineConfig(async () => ({
  plugins: [
    vue(),
    Components({
      resolvers: [
        VexipUIResolver()
      ]
    }),
    AutoImport({
      vueTemplate: true,
      resolvers: [
        VexipUIResolver()
      ],
      imports: [
        {
          '@vexip-ui/icons': Object.keys(await import('@vexip-ui/icons'))
            // 使通过变量使用的图标类组件的名称也具有 'I' 前缀
            .map(name => name.match(/^I[0-9]/) ? name : [name, `I${name}`])
        }
      ]
    })
  ]
}))
```

Resolver 的选项可以通过编辑器的提示或者在 [这里](https://github.com/vexip-ui/vexip-ui/blob/main/common/plugins/src/unplugin-vue-components.ts#L7) 查看。

如果你还用到了 `Message` 这样的插件类组件，需要在使用前调用 `App.use` 方法进行安装，以确保可以获取应用上下文的配置：

```ts
import { createApp } from 'vue'
import App from './app.vue'

createApp(App)
  .use(Confirm)
  .use(Contextmenu)
  .use(Loading)
  .use(Message)
  .use(Notice)
  .use(Toast)
```

至此，包括图标类组件在内的所有组件都可以自动引入了。

### Webpack

:::info
上述使用 unplugin 插件的内容同样适用于 Webpack，你只需要切换插件引入的路径即可。
:::

借助 Babel 插件 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 可以更简洁地进行按需引入。

安装插件：

```sh
pnpm i -D babel-plugin-import
```

修改 `babel.config.js` 为以下内容：

```js
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'vexip-ui',
        transformToDefaultImport: false,
        customName: () => 'vexip-ui',
        styleLibraryDirectory: 'es/css',
        style: name => name
      }
    ]
  ]
}
```

由于插件的局限性，在使用暗黑模式时你需要手动引入 `vexip-ui/es/css/dark`。

## 全局类型支持

如果全局引入了组件库，在项目的 `tsconfig.json` 文件配置 `compilerOptions.types` 选项可以快速获得全局类型支持：

```json
{
  "compilerOptions": {
    "types": ["vexip-ui/types"]
  }
}
```

## 完整组件列表

你可以在 [这里](https://github.com/vexip-ui/vexip-ui/blob/main/components/index.ts#L120) 查看完整的组件列表。
