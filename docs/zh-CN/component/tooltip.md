# 提示 Tooltip

用于需要在特定元素周围弹出一下拓展信息。

## 代码示例

:::demo tooltip/basis

### 基础用法

最简单的用法。

:::

:::demo tooltip/trigger

### 触发方式

设置 `trigger` 属性的值可以改变提示的触发方式。

:::

:::demo tooltip/placement

### 出现位置

通过 `placement` 属性可以设置气泡出现的位置。

:::

:::demo tooltip/no-arrow

### 无箭头

添加 `no-arrow` 属性可以禁用箭头。

:::

:::demo tooltip/raw

### 无样式

添加 `raw` 属性可以不使用内置样式直接渲染气泡内容。

:::

:::demo tooltip/trigger-width

### 使用触发器宽度

最简单的用法。

:::

:::demo tooltip/wrapper

### 包围元素

添加 `wrapper` 属性可以创建一层包围元素，传入字符串你还可以自定义渲染的标签。

:::

:::demo tooltip/reverse

### 反色主题

添加 `reverse` 属性可以启用反色主题。

:::

:::demo tooltip/virtual-el

### 外部元素

通过 `virtual` 属性，可以传入一个外部元素触发气泡提示。

:::

:::demo tooltip/position

### 手动定位

通过 `virtual` 属性，传入一个 `{ x: number, y: number }` 的对象可以手动控制气泡提示的位置。

这种方式你需要手动控制气泡提示的显隐。

:::

## API

### Tooltip 属性

| 名称            | 类型                                                              | 说明                                                                   | 默认值       | 始于    |
| --------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------ | ------- |
| visible         | `boolean`                                                         | 提示的显示状态，可以使用 `v-model` 双向绑定                            | `false`      | -       |
| trigger         | `'hover' \| 'click' \| 'focus' \| 'custom'`                       | 下拉菜单的触发方式，当为 `custom` 时，所有情景都需要手动控制 `visible` | `'hover'`    | -       |
| placement       | `Placement`                                                       | 提示出现的位置，可选值同 Popper.js                                     | `'top'`      | -       |
| outside-close   | `boolean`                                                         | 设置是否可以通过点击外部关闭                                           | `true`       | -       |
| no-hover        | `boolean`                                                         | 设置是否让提示变得无法捕捉                                             | `false`      | -       |
| tip-class       | `ClassType`                                                       | 提示内容的自定义类名                                                   | `null`       | -       |
| tip-style       | `StyleType`                                                       | 提示内容的自定义样式                                                   | `null`       | `2.0.0` |
| disabled        | `boolean`                                                         | 设置是否禁用提示，禁用后将不显示任何内容                               | `false`      | -       |
| reverse         | `boolean`                                                         | 设置气泡是否为反色主题                                                 | `false`      | `2.0.0` |
| transfer        | `boolean \| string`                                               | 设置气泡的渲染位置，设置为 `true` 时默认渲染至 `<body>`                | `false`      | -       |
| transition-name | `string`                                                          | 设置气泡的显示隐藏过渡效果                                             | `'vxp-fade'` | -       |
| wrapper         | `boolean \| string`                                               | 设置是否渲染包围元素                                                   | `false`      | `2.0.0` |
| no-arrow        | `boolean`                                                         | 设置是否禁用提示的箭头                                                 | `false`      | `2.0.0` |
| raw             | `boolean`                                                         | 设置是否不使用内置样式直接渲染提示                                     | `false`      | `2.0.0` |
| tip-alive       | `boolean`                                                         | 设置在隐藏时是否不移除提示元素                                         | `false`      | `2.0.0` |
| width           | `number \| 'trigger' \| 'auto'`                                   | 设置提示的宽度，设置为 `'trigger'` 时会使用触发器的宽度                | `'auto'`     | `2.0.0` |
| virtual         | `{ $el: HTMLElement } \| HTMLElement \| { x: number, y: number }` | 设置虚拟参考系                                                         | `null`       | `2.0.0` |

### Tooltip 事件

| 名称          | 说明                                       | 参数                 | 始于 |
| ------------- | ------------------------------------------ | -------------------- | ---- |
| toggle        | 当提示的显示状态改变时触发，返回当前的状态 | `(visible: boolean)` | -    |
| tip-enter     | 当鼠标移入提示时触发                       | -                    | -    |
| tip-leave     | 当鼠标移出提示时触发                       | -                    | -    |
| click-outside | 当点击了元素外部时触发                     | -                    | -    |
| outside-close | 当点击了元素外部进行了下拉菜单的关闭时触发 | -                    | -    |

### Tooltip 插槽

| 名称    | 说明               | 参数 | 始于 |
| ------- | ------------------ | ---- | ---- |
| default | 触发提示内容的插槽 | -    | -    |
| tip     | 提示内容的插槽     | -    | -    |
