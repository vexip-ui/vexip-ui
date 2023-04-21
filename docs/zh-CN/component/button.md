# 按钮 Button

基础通用组件，用于标记一组操作命令，由用户点击触发，响应用户并完成相应的业务逻辑。

## 代码示例

:::demo button/basis

### 按钮类型

通过设置 `type` 属性的值为 `primary`、`info`、`success`、`warning` 和 `error` 来创建不同样式的按钮，不设置时为默认样式。

:::

:::demo button/badge

### 内置徽标

通过 `badge` 属性可以设置内置的徽标。

:::

:::demo button/custom

### 自定义颜色

通过 `color` 属性可以定制化按钮的主题色。

:::

:::demo button/dashed

### 虚线按钮

添加 `dashed` 属性可以将按钮变成虚线边框按钮。

:::

:::demo button/disabled

### 禁用状态

添加 `disabled` 属性即可让按钮处于禁用状态。

:::

:::demo button/ghost

### 幽灵按钮

幽灵按钮将背景变为透明，常用在有色背景上（为啥叫幽灵按钮呢，我也不知道）。

:::

:::demo button/group

### 按钮组

使用按钮组可以轻松组合多个按钮，多用于一系列的功能按钮排版上。

可以统一设置按钮组大小和类型，每个按钮的类型你也可以单独设置。

:::

:::demo button/icon

### 添加图标

当需要在按钮内嵌入图标时，可以将图标组件直接传入 `icon` 属性。

如果你不嫌麻烦，直接在插槽内使用 Icon 组件也可以。

:::

:::demo button/loading

### 加载状态

添加 `loading` 属性可以让按钮处于转圈圈状态。

:::

:::demo button/simple

### 简约风格

简约风格的按钮使用浅色系色调，常用在简约风格页面上。

:::

:::demo button/size

### 按钮大小

内置了三种大小，通过 `size` 来设置。

:::

:::demo button/text

### 文本按钮

添加 `text` 属性可以让按钮看起来和普通文字无异。

配合 `tag` 属性，你可以让它看起来像是个普通的超链接。

:::

## API

### Button 属性

| 名称           | 类型                                                                    | 说明                                           | 默认值      | 始于    |
| -------------- | ----------------------------------------------------------------------- | ---------------------------------------------- | ----------- | ------- |
| type           | `'default' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'error'` | 设置按钮类型                                   | `'default'` | -       |
| simple         | `boolean`                                                               | 开启后，按钮将变为浅色系的简约风格             | `false`     | -       |
| ghost          | `boolean`                                                               | 开启后，按钮将变成背景颜色透明的样式           | `false`     | -       |
| text           | `boolean`                                                               | 设置是否为文本按钮                             | `false`     | `2.0.0` |
| dashed         | `boolean`                                                               | 设置是否为虚线边框按钮                         | `false`     | `2.0.0` |
| size           | `'small' \| 'default' \| 'large'`                                       | 按钮的大小                                     | `'default'` | -       |
| disabled       | `boolean`                                                               | 设置是否为禁用状态 设置                        | `false`     | -       |
| loading        | `boolean`                                                               | 设置是否为加载状态 设置                        | `false`     | -       |
| circle         | `boolean`                                                               | 设置是否为圆形按钮                             | `false`     | -       |
| icon           | `Record<string, any>`                                                   | 按钮的辅助图标，加载状态时会切换为加载图标     | `''`        | -       |
| loading-icon   | `Record<string, any>`                                                   | 加载状态时显示的图标，具有脉冲效果             | `Spinner`   | -       |
| loading-effect | `string`                                                                | 开启后，加载中图标原有的脉冲效果将变位旋转效果 | `false`     | -       |
| button-type    | `'button' \| 'submit' \| 'reset'`                                       | 设置原生 button 的 type 属性                   | `'button'`  | -       |
| block          | `boolean`                                                               | 是否为块级元素，设置后宽度变为 `100%`          | `false`     | -       |
| color          | `string`                                                                | 设置按钮的主题色                               | `null`      | `2.0.0` |
| tag            | `string`                                                                | 设置按钮的渲染标签                             | `'button'`  | `2.0.0` |
| no-pulse       | `boolean`                                                               | 设置是否禁用点击后的脉冲效果                   | `false`     | `2.0.0` |
| badge          | `number \| string`                                                      | 设置内置徽标内容                               | `null`      | `2.0.4` |

### Button 事件

| 名称  | 说明                                    | 参数                  | 始于 |
| ----- | --------------------------------------- | --------------------- | ---- |
| click | 左键点击按钮时触发， 返回点击的事件对象 | `(event: MouseEvent)` | -    |

### Button 插槽

| 名称    | 说明                                             | 参数 | 始于    |
| ------- | ------------------------------------------------ | ---- | ------- |
| default | 按钮的内容插槽                                   | -    | -       |
| icon    | 按钮前置图标的插槽                               | -    | `2.0.0` |
| loading | 加载图标的插槽，需要更多定制化加载图标效果时使用 | -    | -       |
