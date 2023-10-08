# Notice 通知提醒

## 代码示例

:::demo notice/basis

### 基础用法

通过 `open` 方法打开一条纯文字的提示。

该方法可以接收一个字符串或对象，传入字符串时将作为提示内容，传入对象可以更细粒度地控制提示属性，具体可选属性参考 api 说明。

组件根据 `title` 和 `content` 属性有无的情况，会分别渲染成正常、仅标题和仅内容三种状态。

:::

:::demo notice/type

### 提示类型

通过调用不同的方法，可以打开预设好的几种提示。

目前组件共内置了四种预设类型，分别调用 `info`、`success`、`warning`、 `error` 四种方法打开。

:::

:::demo notice/style

### 预设样式

设置 `color` 属性为 `true` 可以使预设类型的提示具有字体颜色。

设置 `background` 属性为 `true` 可以使预设类型的提示具有背景颜色。

当预设的颜色不满足需求时，可以传入一个有效的颜色值，实现颜色自定义。

需要独立设置标题的颜色时，可以设置 `titleColor` 属性为一个有效颜色值。

:::

:::demo notice/close

### 可关闭

设置 `closable` 属性为 `true` 可以使打开的提示可以手动关闭。

同时，这个例子展示了如何在组合式 Api 中使用 Notice 组件。

:::

:::demo notice/duration

### 修改时长

设置 `duration` 属性可以调整提示的持续时间。

当设置为 `0` 时，提示将不会自动关闭，需要添加可关闭或者手动控制关闭。

:::

:::demo notice/icon

### 自定义图标

设置 `icon` 属性可以设置提示的前置图标。

设置 `iconColor` 属性可以设置提示前置图标的颜色。

当需要更细粒度地控制图标时，可以设置 `icon` 属性为一个或函数作为自定义渲染方法。

:::

:::demo notice/render

### 渲染函数

通过 `renderer` 属性可以设置提示的自定义渲染方法。

:::

:::demo notice/position

### 自定义位置

通过 `config` 方法可以配置 `placement` 属性以改变提示出现的位置。

可选的位置共有四个，分别为右上角、右下角、左下角、左上角。

:::

## API

### Notice 方法

组件实例内提供了 5 种基础的打开提示的方法：

- `this.$notice.open(title[, content][, duration] | options)`
- `this.$notice.info(title[, content][, duration] | options)`
- `this.$notice.success(title[, content][, duration] | options)`
- `this.$notice.warning(title[, content][, duration] | options)`
- `this.$notice.error(title[, content][, duration] | options)`

以及 1 个复合的打开消息的方法：

- `this.$message.judge(state, successTitle | successOptions, errorTitle | errorOptions[, duration])`

> 在使用组合式 api 时需要 `import { Notice } from 'vexip-ui'` 后使用 `Notice.open(...)`。

此外，还提供了两个手动关闭提示的方法：

- `this.$notice.close(key)`
- `this.$notice.clear()`

> 当直接调用 `this.$notice.close()` 而不传入 key 时和 `this.$notice.clear()` 效果相同。

在打开提示的方法调用后会返回一个函数，该函数可以用于手动关闭刚刚打开的提示：

```js
const cancel = this.$notice.open(options)

// 立即关闭该提示
cancel()
```

需要修改组件的默认属性值时，可以这样做：

```js
// 除了选项值以外，还可以修改 placement 为 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' 来改变提示的位置
this.$notice.config({ placement, ...options })
```

有时需要创建多个提示管理器以便于管理各类提示：

```js
// 这是一个全新的提示组件
const myNotice = this.$notice.clone()

myNotice.config({ placement: 'bottom-right' })
```

或者在按需引入组件时进行克隆：

```js
import { createApp } from 'vue'
import { Notice } from 'vexip-ui'

const myNotice = Notice.clone()

myNotice.config({ placement: 'bottom-right' })
createApp().use(myNotice, { property: '$myNotice' })
```

### Notice 选项

| 名称       | 类型                                          | 说明                                               | 默认值  | 始于     |
| ---------- | --------------------------------------------- | -------------------------------------------------- | ------- | -------- |
| type       | `'info' \| 'success' \| 'warning' \| 'error'` | 提示的类型                                         | `''`    | -        |
| title      | `string`                                      | 提示的标题                                         | `''`    | -        |
| content    | `string`                                      | 提示的内容                                         | `''`    | -        |
| key        | `number \| string`                            | 提示的唯一索引，不设置时将使用内置的索引           | `''`    | -        |
| className  | `ClassType`                                   | 提示的自定义类名                                   | `null`  | -        |
| style      | `StyleType`                                   | 提示的内联样式                                     | `null`  | -        |
| duration   | `number`                                      | 提示的持续毫秒，设置为小于 500 时则不会自动关闭    | `4000`  | -        |
| background | `boolean \| string`                           | 是否显示背景颜色，传入有效颜色值时可以自定义颜色   | `false` | -        |
| color      | `boolean \| string`                           | 是否设置字体的颜色，传入有效颜色值时可以自定义颜色 | `false` | -        |
| titleColor | `string`                                      | 单独设置提示标题字体的颜色                         | `''`    | -        |
| closable   | `boolean`                                     | 是否有关闭按钮进行关闭                             | `false` | -        |
| icon       | `Record<string, any> \| (() => any)`          | 提示前缀的图标，传入函数时作为 render 函数渲染     | `null`  | -        |
| iconColor  | `string`                                      | 前缀图标的颜色，设置后会覆盖 `type` 的默认设置     | `''`    | -        |
| renderer   | `() => any`                                   | 使用 Vue 的 render 函数渲染自定义内容              | `null`  | -        |
| marker     | `boolean`                                     | 是否显示侧边 marker                                | `false` | -        |
| parseHtml  | `boolean`                                     | 是否将 `title` 和 `content` 作为 html 解析         | `false` | `2.0.14` |
