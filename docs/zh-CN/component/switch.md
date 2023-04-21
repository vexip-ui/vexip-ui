# 开关 Switch

用于切换两面状态。

## 代码示例

:::demo switch/basis

### 基础用法

通过 `v-model:value` 可以进行双向绑定。

:::

:::demo switch/color

### 开关底色

通过 `open-color` 和 `close-color` 可以指定开关的底色。

:::

:::demo switch/icon

### 自定义图标

通过 `open-icon` 和 `close-icon` 可以自定义手柄上的图标。

:::

:::demo switch/loading

### 加载状态

添加 `loading` 属性可以使开关处于加载中，可以配合 `on-before-change` 处理异步操作。

:::

:::demo switch/size

### 不同大小

内置三种大小，或者自定义。

:::

:::demo switch/state

### 不同状态

通过 `state` 可以设置不同的状态。

:::

:::demo switch/text

### 内嵌文字

通过 `open-text` 和 `close-text` 可以设置开关的内部文字。

:::

## API

### Switch 属性

| 名称             | 类型                                             | 说明                                                                                                      | 默认值      | 始于    |
| ---------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------- | ----------- | ------- |
| value            | `boolean`                                        | 开关的值，可以使用 `v-model` 双向绑定                                                                     | `false`     | -       |
| disabled         | `boolean`                                        | 设置是否禁用开关                                                                                          | `false`     | -       |
| size             | `'small' \| 'default' \| 'large'`                | 开关的大小                                                                                                | `'default'` | -       |
| state            | `'default' \| 'success' \| 'error' \| 'warning'` | 开关的状态                                                                                                | `'default'` | -       |
| open-color       | `string`                                         | 打开状态时开关的填充颜色                                                                                  | `''`        | -       |
| close-color      | `string`                                         | 关闭状态时开关的填充颜色                                                                                  | `''`        | -       |
| loading          | `boolean`                                        | 设置是否为加载状态                                                                                        | `false`     | -       |
| loading-icon     | `Record<string, any>`                            | 设置加载中的图标                                                                                          | `Spinner`   | `2.0.0` |
| loading-effect   | `string`                                         | 设置加载中图标的效果动画                                                                                  | `false`     | `2.0.0` |
| open-icon        | `Record<string, any>`                            | 开关打开且非加载中时的手柄内图标，使用了 `icon` 插槽后失效                                                | `null`      | -       |
| close-icon       | `Record<string, any>`                            | 开关关闭且非加载中时的手柄内图标，使用了 `icon` 插槽后失效                                                | `null`      | -       |
| open-text        | `string`                                         | 打开状态时开关的填充文字                                                                                  | `''`        | -       |
| close-text       | `string`                                         | 关闭状态时开关的填充文字                                                                                  | `''`        | -       |
| on-before-change | `(checked: boolean) => unknown`                  | 设置开关的值变化前回调，接收一个参数标将要变化为的值，支持异步函数和 Promise，返回值为 `false` 会阻止变化 | `null`      | -       |

### Switch 事件

| 名称   | 说明                                       | 参数               | 始于 |
| ------ | ------------------------------------------ | ------------------ | ---- |
| change | 当开关的状态发生变化时触发，返回当前的状态 | `(value: boolean)` | -    |

### Switch 插槽

| 名称    | 说明                     | 参数               | 始于 |
| ------- | ------------------------ | ------------------ | ---- |
| loading | 加载时图标的插槽         | -                  | -    |
| icon    | 非加载时的图标插槽       | `(value: boolean)` | -    |
| open    | 打开状态时填充内容的插槽 | -                  | -    |
| close   | 关闭状态时填充状态的插槽 | -                  | -    |
