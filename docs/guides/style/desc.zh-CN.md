# 样式配置

Vexip UI 的样式由 `sass` 编写，并生成一系列预设 `css` 变量，同时结合一些规则让配置变得容易。

## 引入样式

正常情况，直接引入 `css` 样式：

```ts
import 'vexip-ui/css/index.css'
import 'vexip-ui/css/dark/index.css' // 不需要暗黑主题时无需引入
```

如果你喜欢，还可以引入 `sass` 样式：

在 `sass` 中引入：

```scss
// style/index.scss
// 在 scss 里你可以省略 index.scss
@use 'vexip-ui/style';
@use 'vexip-ui/style/dark'; // 不需要暗黑主题时无需引入
```

```ts
import './style/index.scss'
```

在 `ts` 中引入（不推荐）：

```ts
import 'vexip-ui/style/index.scss'
import 'vexip-ui/style/dark/index.scss' // 不需要暗黑主题时无需引入
```

参照内置的暗黑主题的预设样式，你可以定义自己的主题（后续可能会做一个主题生成器）。

:::info
上述方式均为引入所有样式，关于按需引入见 [快速开始](./started) 章节。
:::

## 预设变量

组件库预设了许多 `css` 变量，这些变量均以 `--vxp-` 开头：

```css
.element {
  color: var(--vxp-color-primary-base);
  border: var(--vxp-border-base);
}
```

此时你就可以打开开发者工具，查看 `:root` 中预定义的变量。

每个组件的预设变量定义在 `.vxp-[component]-vars` 类名上，其中 `[component]` 为组件的短横线命名。

组件内的预设常规变量的命名大部分遵循 `--vxp-[component]-[?element]-[color|bg-color|b-color|s-color]-[?state]` 的规则：

- `compoennt` 为组件的短横线命名
- `element` 是可选部分，为变量作用的要素
- `color` 为用于颜色属性的变量
- `bg-color` 为用于背景颜色的变量
- `b-color` 为用于边框颜色的变量
- `s-color` 为用于阴影颜色的变量
- `state` 是可选部分，为用于组件或要素在特定状态下的变量

还有部分的变量是作用于布局上的，与该规则有出入。其余的一些变量出于语义化也会与该规则有不同。

你只需要按照你喜欢的方式修改这些 css 变量即可。

## 通过 Sass 修改

### 直接引入

使用 `@use...with` 可以修改 `sass` 的变量：

```scss
// style/index.scss
@use 'vexip-ui/style' with (
  $color-map: (
    primary: (
      base: #845ef7
    )
  )
);
```

然后在入口文件引入该样式：

```ts
import './style/index.scss'

import { createApp } from 'vue'
import { install } from 'vexip-ui'

createApp(App).use(install).mount('#app')
```

具体的 `sass` 变量可以在 [源码](https://github.com/vexip-ui/vexip-ui/blob/main/style/design/variables.scss) 查找。

### 按需引入

如果你正在使用按需引入，则需要一些额外的配置，这里我们以 vite 为例，Webpack 同理。

首先需要准备一个单独的文件存放变量，并改用 `@forward...with` 修改变量：

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

然后在 `vite.config.ts` 中拓展以下内容：

```ts
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const vxpStylePresetRE = /vexip-ui\/style(?:\/dark)?\/preset/

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: (code: string, path: string) => {
          // 篡改基础样式中的变量文件的引用
          return vxpStylePresetRE.test(path)
            ? code.replace('@use \'./design/variables.scss\' as *;', '@use \'@/style/variables.scss\' as *;')
            : code
        }
      }
    }
  }
})
```

## 过渡效果

在引入了样式之后，可以直接使用 Vexip UI 内置的一些过渡效果：

```vue
<template>
  <transition name="vxp-fade">
    <div v-if="active"></div>
  </transition>
</template>
```

通用的过渡效果列表如下：

- `vxp-drop` 向下展开或向上收起
- `vxp-fade` 渐显渐隐
- `vxp-ease` 渐隐渐显并伴随微弱的放大缩小
- `vxp-move-top` 从上往下移入
- `vxp-move-right` 从右往左移入
- `vxp-move-bottom` 从下往上移入
- `vxp-move-left` 从左往右移入
- `vxp-zoom` 渐隐渐显并伴随明显的放大缩小
