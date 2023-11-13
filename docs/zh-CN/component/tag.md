# Tag 标签

## 代码示例

:::demo tag/basis

### 基础用法

通过设置 `type` 属性的值为 `primary`、`success`、`error`、`warning` 创建不同类型的标签，不设置时为默认类型。

:::

:::demo tag/circle

### 圆角标签

添加 `circle` 属性可以设置标签为圆角标签。

:::

:::demo tag/closable

### 可关闭

添加 `closable` 属性可以使标签显示关闭按钮，结合关闭事件可实现标签的增减。

:::

:::demo tag/simple

### 简约模式

添加 `simple` 属性启用简约模式，简约模式使用浅色系色调，常用在简约风格页面上。

:::

:::demo tag/size

### 调整大小

设置 `size` 属性的值可以调整标签的大小，该属性会同时调整标签的字号大小。

:::

:::demo tag/type

### 内置颜色

除了基础的状态类型外，还内置了一些颜色类型，用于快速生成各种颜色的标签。

:::

:::demo tag/custom

### 自定义颜色

通过 `color` 属性可以定制化标签的主题色。

:::

:::demo tag/extra

### 额外内容

==!s|2.1.0==

通过 `prefix` 和 `suffix` 属性可以在分别前后插入额外内容。

:::

## API

### 预设类型

```ts
type TagState = 'default' | 'primary' | 'info' | 'success' | 'error' | 'warning'

type TagNamedColor =
  | 'lime'
  | 'pink'
  | 'magenta'
  | 'tomato'
  | 'orange'
  | 'cyan'
  | 'navy'
  | 'gold'
  | 'purple'

type TagType = TagState | TagNamedColor
```

### Tag 属性

| 名称         | 类型                              | 说明                                                         | 默认值      | 始于    |
| ------------ | --------------------------------- | ------------------------------------------------------------ | ----------- | ------- |
| type         | `TagType`                         | 设置标签的类型，包含状态类型和颜色类型                       | `'default'` | -       |
| size         | `'small' \| 'default' \| 'large'` | 标签的大小，与其他组件不同的是，该属性会同时改变标签字体大小 | `'default'` | -       |
| border       | `boolean`                         | 设置标签是否具有边框                                         | `false`     | -       |
| closable     | `boolean`                         | 设置标签是否具有关闭功能                                     | `false`     | -       |
| color        | `string`                          | 设置标签的自定义颜色，其优先级高于 `type` 预设类型           | `null`      | -       |
| simple       | `boolean`                         | 设置标签是否为简约模式                                       | `false`     | -       |
| circle       | `boolean`                         | 设置标签是否为圆角标签                                       | `false`     | -       |
| prefix       | `string \| number`                | 设置标签的前置内容                                           | `''`        | `2.1.0` |
| prefix-bg    | `string`                          | 设置标签前置内容的背景颜色                                   | `''`        | `2.1.0` |
| prefix-color | `string`                          | 设置标签前置内容的颜色                                       | `''`        | `2.1.0` |
| suffix       | `string \| number`                | 设置标签的前置内容                                           | `''`        | `2.1.0` |
| suffix-bg    | `string`                          | 设置标签前置内容的背景颜色                                   | `''`        | `2.1.0` |
| suffix-color | `string`                          | 设置标签前置内容的颜色                                       | `''`        | `2.1.0` |

### Tag 事件

| 名称  | 说明                               | 参数 | 始于 |
| ----- | ---------------------------------- | ---- | ---- |
| close | 当标签可关闭，并点击关闭按钮时触发 | -    | -    |

### Tag 插槽

| 名称    | 说明           | 参数 | 始于 |
| ------- | -------------- | ---- | ---- |
| default | 标签内容的插槽 | -    | -    |
