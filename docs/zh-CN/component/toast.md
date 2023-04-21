# 吐司提示 Toast ^[Since v2.0.0](!s)

## 代码示例

:::demo toast/basis

### 基础用法

通过 `open` 方法打开一条纯文字的吐司提示。

该方法可以接收一个字符串或对象，传入字符串时将作为提示内容，传入对象可以更细粒度地控制提示属性。

:::

:::demo toast/type

### 提示类型

通过调用不同的方法，可以打开预设好的几种提示。

目前组件共内置了四种预设类型，分别调用 `success`、`warning`、`error`、`loading` 四种方法打开。

其中 `loading` 方法默认包含隐形遮罩，会阻断页面内容的交互。

:::

:::demo toast/position

### 提示位置

通过 `position` 属性可以控制吐司提示出现的位置，分别为上方、中央和下方。

:::

:::demo toast/close

### 可关闭

设置 `closable` 属性为 `true` 可以使打开的提示可通过点击关闭。

同时，这个例子展示了如何在组合式 Api 中使用 Toast 组件。

:::

:::demo toast/duration

### 修改时长

设置 `duration` 选项可以调整提示的持续时间。

当设置为 `0` 时，提示将不会自动关闭，需要添加可关闭或者手动控制关闭。

:::

:::demo toast/mask

### 隐形遮罩

设置 `closable` 属性为 `true` 可以使打开的提示可通过点击关闭。

同时，这个例子展示了如何在组合式 Api 中使用 Toast 组件。

:::

:::demo toast/icon

### 自定义图标

设置 `icon` 属性可以设置提示的图标。

通过 `iconProps` 属性可以设置提示图标的属性。

当需要更细粒度地控制图标时，可以设置 `icon` 属性为一个函数，传函数时为自定义渲染方法。

:::

:::demo toast/render

### 渲染函数

通过 `renderer` 属性可以设置提示的自定义渲染方法。

通常配合 `tsx` 使用会更好。

:::

## API

### Toast 方法

组件实例内提供了 5 种基础的打开吐司提示的方法：

- `this.$toast.open(content[, duration] | options)`
- `this.$toast.info(content[, duration] | options)`
- `this.$toast.success(content[, duration] | options)`
- `this.$toast.warning(content[, duration] | options)`
- `this.$toast.error(content[, duration] | options)`

> 在使用组合式 api 时需要 `import { Toast } from 'vexip-ui'` 后使用 `Toast.open(...)`。

此外，还提供了手动关闭吐司的方法：

- `this.$toast.close()`

在打开吐司的方法调用后会返回一个函数，该函数也可以用于手动关闭提示：

```ts
const cancel = this.$toast.open(options)

// 立即关闭吐司
cancel()
```

需要修改组件的默认属性值时，可以这样做：

```ts
this.$toast.config(options)
```

有时需要创建多个吐司管理器以便于管理各类吐司提示：

```ts
// 这是一个全新的吐司组件
const topToast = this.$toast.clone()

topToast.config({ position: 'top' })
```

或者在引入组件时进行克隆：

```ts
import { createApp } from 'vue'
import { Toast } from 'vexip-ui'

const topToast = Toast.clone()

topToast.config({ position: 'top' })
createApp().use(topToast, { property: '$topToast' })
```

### Toast 选项

| 名称           | 类型                                             | 说明                            | 默认值       | 始于     |
| -------------- | ------------------------------------------------ | ------------------------------- | ------------ | -------- |
| type           | `'success' \| 'warning' \| 'error' \| 'loading'` | 吐司提示的类型                  | `''`         | -        |
| content        | `string`                                         | 吐司提示的内容                  | `''`         | -        |
| icon           | `Record<string, any> \| (() => any)`             | 吐司提示的图标                  | `null`       | -        |
| iconProps      | `IconMinorProps`                                 | 吐司提示的图标属性              | `{}`         | -        |
| position       | `'top' \| 'center' \| 'bottom'`                  | 吐司提示的位置                  | `'center'`   | -        |
| transitionName | `string`                                         | 吐司提示的过渡效果              | `'vxp-ease'` | -        |
| closable       | `boolean`                                        | 是否可以点击关闭吐司提示        | `false`      | -        |
| maskClose      | `boolean`                                        | 是否可以点击遮罩关闭吐司提示    | `false`      | -        |
| showMask       | `boolean`                                        | 是否有隐形遮罩                  | `false`      | -        |
| maskClass      | `ClassType`                                      | 遮罩的自定义类名                | `null`       | -        |
| maskStyle      | `StyleType`                                      | 遮罩的自定义样式                | `null`       | -        |
| parseHtml      | `boolean`                                        | 是否将 `content` 作为 html 解析 | `false`      | `2.0.14` |
| onClose        | `() => void`                                     | 吐司提示关闭时的回调方法        | `null`       | -        |
