# Ellipsis 省略 ==!s|1.1.3==

当有一段长到放不下的文本时，可以派上用场。

## 代码示例

:::demo ellipsis/basis

### 基础用法

最简单的用法，当内容的长度超过包裹元素的宽度时，将会显示为省略内容。

并在鼠标移入时通过 Tooltip 展示完整内容。

:::

:::demo ellipsis/max-lines

### 最大行数

通过 `max-lines` 属性可以设置显示的最大行数，当该属性设置了有效值后会开启多行省略模式。

:::

## API

### Ellipsis 属性

| 名称            | 类型                | 说明                                                                                   | 默认值       | 始于     |
| --------------- | ------------------- | -------------------------------------------------------------------------------------- | ------------ | -------- |
| placement       | `Placement`         | 设置提示气泡出现的位置，可选值同 Popper.js                                             | `'top'`      | -        |
| transfer        | `boolean \| string` | 设置提示气泡渲染位置，设置为 `true` 时默认渲染至 `<body>`                              | `'body'`     | -        |
| no-hover        | `boolean`           | 设置是否让提示气泡变得无法捕捉                                                         | `false`      | -        |
| transition-name | `string`            | 设置提示气的显示隐藏过渡效果                                                           | `'vxp-fade'` | -        |
| tooltip-theme   | `string`            | 设置提示气泡的主题，可选值为 `light`、`dark`                                           | `'dark'`     | -        |
| tip-class       | `ClassType`         | 提示内容的自定义类名                                                                   | `null`       | -        |
| max-lines       | `number`            | 设置最大行数，传入一个大于 `0` 的整数后将开启多行模式，其实现基于 `-webkit-line-clamp` | `null`       | -        |
| tip-max-width   | `number \| string`  | 设置提示气泡的最大宽度                                                                 | `500`        | `2.0.13` |
| tip-disabled    | `boolean`           | 是否禁用气泡提示                                                                       | `false`      | `2.1.18` |
| shift           | `TooltipShift`      | 是否将气泡限制在可视区域内                                                             | `false`      | `2.2.12` |
