# 快速上手

:::error
Vexip UI 已支持直接按需引入，resolver 插件开发中，该章节文档已过时，请等待更新。
:::

通过该章节，您将了解到如何快速开始使用 Vexip UI。

> 在开始之前，你得掌握了 [Vue3](https://v3.cn.vuejs.org/) 的正确打开方式。

## 使用 vue-cli

> 官网已表示会全面迁移至 Vite 了，建议尽早放弃。

[Vue CLI](//cli.vuejs.org/zh/) 是一个基于 Vue.js 进行快速开发的完整系统，能够快速搭建一个满足需要的 Vue 开发环境。

### 安装脚手架

```sh
npm install -g @vue/cli
# 或者
yarn global add @vue/cli
```

### 创建项目

```sh
vue create hello-world
```

## 使用 vite

[Vite](//cn.vitejs.dev/) 是基于原生 ESM 文件系统搭建的下一代前端开发构建工具，结合插件能够快速配置 Vue 开发环境（反正就是很牛逼）。

### 使用模版创建项目

vite 无需额外安装全局依赖，只需通过 pnpm 或者 yarn 执行以下[命令](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)：

```sh
pnpm create vite hello-wrold -- --template vue
# 或者
yarn create vite hello-wrold --template vue
```

## 引入 vexip-ui

通常情况下将入引入整个组件库，如果想要减少打包体积，可以根据仅引入所需的组件。

### 完整引入

在 `src/main.js` 中替换为下面的代码：

```js
// 样式文件需要单独引入
import 'vexip-ui/dist/style.css'

import { createApp } from 'vue'
import { install } from 'vexip-ui'
import App from './App.vue'

createApp(App).use(install).mount('#app')
```

随后，即可在项目的任意地方直接使用所有组件。

### 按需引入

在不借助任何工具的情况下，可以通过以下写法按需加载组件：

```js
// 全局引入样式
import 'vexip-ui/dist/style.css'

// 或按需引入样式
import 'vexip-ui/lib/button/style.css'
import 'vexip-ui/lib/input/style.css'

import { Button } from 'vexip-ui/lib/button'
import { Input } from 'vexip-ui/lib/input'
```

下面介绍如何通过使用插件，以更简洁的方式按需引入：

```js
import { Button, Input } from 'vexip-ui'
```

#### 基于 webpack

借助 `babel` 插件 [babel-plugin-import](//github.com/ant-design/babel-plugin-import) 可以更简洁地进行按需引入。

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
        style: name => `${name}/style.css`
      }
    ]
  ]
}
```

#### 基于 vite

借助 `vite` 插件 [vite-plugin-style-import](//github.com/anncwb/vite-plugin-style-import) 可以更简洁地进行按需引入。

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
          resolveComponent: name => `vexip-ui/lib/${name}`,
          resolveStyle: name => `vexip-ui/lib/${name}/style.css`,
          transformComponentImportName: name => `{${name}}`
        }
      ]
    })
  ]
})
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

比较长，去组件那边看文档和示例更直观。

```js
export {
  // components
  Alert,
  Anchor,
  AnchorLink,
  AutoComplete,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Bubble,
  Button,
  ButtonGroup,
  Calendar,
  CalendarPane,
  Card,
  Carousel,
  CarouselItem,
  Cell,
  Checkbox,
  CheckboxGroup,
  Collapse,
  CollapsePane,
  CollapseTransition,
  ColorPicker,
  Column,
  DatePicker,
  Divider,
  Drawer,
  Dropdown,
  DropdownItem,
  DropdownList,
  Ellipsis,
  Form,
  FormItem,
  FormReset,
  FormSubmit,
  Grid,
  Highlight,
  Icon,
  Input,
  Linker,
  Masker,
  Menu,
  MenuGroup,
  MenuItem,
  Modal,
  NativeScroll,
  NumberInput,
  Option,
  OptionGroup,
  Pagination,
  Popup,
  Portal,
  Progress,
  Radio,
  RadioGroup,
  Renderer,
  ResizeObserver,
  Row,
  Scroll,
  Scrollbar,
  Select,
  Slider,
  Spin,
  Split,
  Switcher,
  TabNav,
  TabNavItem,
  TabPane,
  Table,
  TableColumn,
  Tabs,
  Tag,
  Textarea,
  TimeAgo,
  TimePicker,
  Timeline,
  TimelineItem,
  Tooltip,
  Tree,
  Upload,
  UploadFile,
  UploadList,
  VirtualList,
  Wheel,
  WheelItem,
  // plugins
  Confirm,
  Contextmenu,
  Loading,
  Message,
  Notice
}
```
