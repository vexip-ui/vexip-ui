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
上述方式均为引入所有样式，关于按需引入见 [快速上手](./getting-started) 章节。
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

- `component` 为组件的短横线命名
- `element` 是可选部分，为变量作用的要素
- `color` 为用于颜色属性的变量
- `bg-color` 为用于背景颜色的变量
- `b-color` 为用于边框颜色的变量
- `s-color` 为用于阴影颜色的变量
- `state` 是可选部分，为用于组件或要素在特定状态下的变量

> 还有部分的变量是作用于布局上的，与该规则有出入，其余的一些变量出于语义化的考虑也会与该规则有不同。

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

如果你正在使用按需引入，则需要一些额外的配置，这里我们以 Vite 为例，Webpack 同理。

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

如果你还同时想独立地修改暗黑模式的预设变量，还需额外再创建一个文件：

```scss
// style/dark-variables.scss
@forward 'vexip-ui/style/dark/variables' with (
  $color-map: (
    primary: (
      base: #654ea7
    )
  )
);
```

然后在 `vite.config.ts` 中拓展以下内容：

```ts
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const vxpStylePresetRE = /vexip-ui\/style(?:\/dark)?\/preset/

const basePath = '@/style/variables.scss'
// const darkPath = '@/style/dark-variables.scss'

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
          if (vxpStylePresetRE.test(path)) {
            // if (path.includes('dark')) {
            //   return code.replace('@use \'./variables.scss\' as *;', `@use '${darkPath}' as *;`)
            // }

            return code.replace('@use \'./design/variables.scss\' as *;', `@use '${basePath}' as *;`)
          }

          return code
        }
      }
    }
  }
})
```

:::info
如果你正在使用 unplugin-vue-components，请不要忘记给 VexipUIResolver 指定 `importStyle: 'sass'` 选项。
:::

## 过渡效果

在引入了样式之后，可以直接使用 Vexip UI 内置的一些过渡效果：

```vue
<template>
  <Transition name="vxp-fade">
    <div v-if="active"></div>
  </Transition>
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

## 回退逻辑属性

为了更友好地支持国际化，Vexip UI 提供了 RTL（从右向左排版）特性，组件样式也采用了 [逻辑属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_logical_properties_and_values) 编写。

但是一些 [旧版现代浏览器](https://caniuse.com/css-logical-props) 不支持逻辑属性，为了能在这些浏览器上正常运行，需要借助 PostCSS 插件将逻辑属性还原成普通属性。

安装插件：

```sh
pnpm i -D @vexip-ui/plugins
```

在 `vite.config.ts` 中拓展以下内容：

```ts
import { defineConfig } from 'vite'
import { transformLogical } from '@vexip-ui/plugins'

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        transformLogical({
          // rtl: true,
          replace: true
        })
      ]
    }
  }
})
```

## 主题切换

Vexip UI 提供了 `useTheme` 函数，用于切换主题。这个函数来自 `@vexip-ui/hooks` 包，可以帮助你实现动态主题切换功能。

### 基本用法

```ts
import { useTheme } from '@vexip-ui/hooks'

// 在组件中使用
const { theme } = useTheme()

// theme 是一个响应式引用，表示当前激活的主题名称
console.log(theme.value)
```

### 主题注册

在使用主题切换功能前，需要先注册可用的主题：

```ts
import { addActiveThemes, setActiveThemes } from '@vexip-ui/hooks'

// 添加主题
addActiveThemes(['light', 'dark'])

// 或者使用更详细的配置
addActiveThemes([
  {
    name: 'light',
    rootClass: 'theme-light',
    varsClass: 'vxp-theme-vars-light',
  },
  {
    name: 'dark',
    rootClass: 'theme-dark',
    varsClass: 'vxp-theme-vars-dark',
  },
])

// 重置并设置主题
setActiveThemes(['light', 'dark'])
```

### 主题配置选项

每个主题可以配置以下选项：

- `name`: 主题的唯一名称
- `rootClass`: 应用于 HTML 根元素的类名，默认与 name 相同
- `varsClass`: 包含主题变量的类名，默认为 `vxp-theme-vars-${rootClass}`

### 实现主题切换

结合 Vue 的响应式系统，你可以轻松实现主题切换功能：

```vue
<template>
  <div>
    <p>当前主题: {{ theme }}</p>
    <button @click="toggleTheme">
      切换主题
    </button>
  </div>
</template>

<script setup>
import { useTheme } from '@vexip-ui/hooks'
import { watch } from 'vue'

// 注册主题
addActiveThemes(['light', 'dark'])

const { theme } = useTheme()

// 监听主题变化
watch(theme, (newTheme) => {
  console.log(`主题已切换为: ${newTheme}`)

  // 可以在这里执行其他操作，如更新本地存储
  localStorage.setItem('preferred-theme', newTheme)
})

// 切换主题函数
function toggleTheme() {
  // 根据当前主题切换
  const html = document.documentElement

  if (theme.value === 'light') {
    html.classList.remove('light')
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
    html.classList.add('light')
  }
}
</script>
```

通过这种方式，你可以轻松实现多主题切换功能，并与其他系统（如操作系统的暗黑模式）集成。

### 暗黑模式

首先你可以创建一个开关来控制 暗黑模式 的 class 类名。

> 如果您只需要暗色模式，只需在 html 上添加一个名为 dark 的类 。

```html
  <html class="dark">
    <head></head>
    <body></body>
  </html>
```

> 如果您想动态切换暗色模式，也可以使用 [useDark | VueUse](https://vueuse.org/core/useDark/) 实现。
