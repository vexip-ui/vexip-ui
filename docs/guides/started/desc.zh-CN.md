# 快速上手

通过该章节，你将了解到如何快速开始使用 Vexip UI。

> 在开始之前，你需要掌握了 [Vue3](https://v3.cn.vuejs.org/) 的正确打开方式。

## 安装 Vexip UI

在你的项目中执行：

```sh
# 使用 yarn
yarn add vexip-ui

# 使用 pnpm
pnpm install vexip-ui
```

## 直接引入

Vexip UI 本身已具备 tree-shaking 的能力，你可以在需要使用组件的地方直接引入，这样只有用到的组件才会被打包。

```vue
<template>
  <Button>Get Stared</Button>
</template>

<script setup lang="ts">
import 'vexip-ui/css/preset.css'
import 'vexip-ui/css/button.css'

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
import { install } from 'vexip-ui'
import App from './app.vue'

createApp(App).use(install)
```

## 自动引入

在按需引入时，我们可以通过一些插件来实现样式的自动引入。

### Vite

借助 Vite 插件 [vite-plugin-style-import](https://github.com/anncwb/vite-plugin-style-import) 可以更简洁地进行按需引入。

安装插件：

```sh
yarn add -D vite-plugin-style-import
```

在 `vite.config.ts` 中拓展以下内容：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      include: ['**/*.ts', '**/*.vue'],
      libs: [
        {
          libraryName: 'vexip-ui',
          esModule: true,
          resolveStyle: name => `vexip-ui/css/${name}.css`
        }
      ]
    })
  ]
})
```

### Webpack

借助 Babel 插件 [babel-plugin-import](//github.com/ant-design/babel-plugin-import) 可以更简洁地进行按需引入。

安装插件：

```sh
yarn add -D babel-plugin-import
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
        styleLibraryDirectory: 'css',
        style: name => `${name}.css`
      }
    ]
  ]
}
```

## 全局类型支持

如果全局引入了组件库，在项目的 `tsconfig.json` 文件配置 `compilerOptions.type` 选项可以快速获得全局类型支持：

```json
{
  "compilerOptions": {
    "types": ["vexip-ui/types"]
  }
}
```

## 完整组件列表

你可以在 [这里](https://github.com/qmhc/vexip-ui/blob/main/components/index.ts#L105) 查看完整的组件列表。
