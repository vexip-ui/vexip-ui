# Progress 进度条

## 代码示例

:::demo progress/basis

### 基础用法

最基础的用法，通过 `percentage` 属性传入一个 `0` ~ `100` 的值。

:::

:::demo progress/bubble

### 气泡提示

设置 `info-type` 属性的值可以让进度提示变为气泡提示。

:::

:::demo progress/state

### 不同状态

通过 `state` 可以设置不同的状态。

:::

:::demo progress/color

### 进度条颜色

通过 `stroke-color` 属性可以改变进度条的颜色，这将会覆盖原有的状态色。

该属性支持传入一个合法的颜色值、颜色数组或者返回前两种值的函数。

:::

:::demo progress/text

### 进度内容

通过默认插槽可以自定义进度提示的内容。

:::

:::demo progress/activated

### 激活状态

添加 `activated` 属性可以使进度条处于激活状态。

:::

## API

### 预设类型

```ts
type ProgressInfoType =
  | 'outside'
  | 'inside'
  | 'bubble'
  | 'bubble-top'
  | 'bubble-bottom'
  | 'none'

type ProgressStrokeColor =
  | string
  | [string, string]
  | ((percentage: number) => string | [string, string])
```

### Progress 属性

| 名称         | 类型                                             | 说明                                       | 默认值      | 始于     |
| ------------ | ------------------------------------------------ | ------------------------------------------ | ----------- | -------- |
| percentage   | `number`                                         | 当前的进度百分比，取值为 `0` ~ `100`       | `0`         | -        |
| state        | `'default' \| 'success' \| 'error' \| 'warning'` | 进度条的状态                               | `'default'` | `2.2.23` |
| stroke-width | `number`                                         | 进度条的填充宽度                           | `8`         | -        |
| info-type    | `ProgressInfoType`                               | 进度条信息的类型                           | `'outside'` | -        |
| stroke-color | `ProgressStrokeColor`                            | 进度条的填充颜色，传入数组时会使用线性渐变 | `null`      | -        |
| activated    | `boolean`                                        | 设置进度条是否处于激活状态                 | `false`     | `2.0.0`  |

### Progress 插槽

| 名称    | 说明                     | 参数 | 始于 |
| ------- | ------------------------ | ---- | ---- |
| default | 进度信息的自定义内容插槽 | -    | -    |
