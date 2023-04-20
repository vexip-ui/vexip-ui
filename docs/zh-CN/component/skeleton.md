# 骨架屏 Skeleton

## 代码示例

一个占位符，常用于需要等待加载的地方。

:::demo skeleton/basis

### 基础用法

将其作为行内元素使用，形成段落的效果。

:::

:::demo skeleton/activated

### 激活状态

添加 `activated` 属性可以使骨架屏处于激活状态。

:::

:::demo skeleton/group

### 骨架屏组

有时候一个个骨架屏设置属性与切换略麻烦。

:::

:::demo skeleton/loading

### 加载状态

结合 `loading` 属性在切换内容时可以方便一些。

:::

:::demo skeleton/shape

### 骨架形状

通过 `round` 和 `circle` 属性可以改变骨架屏的形状。

:::

## API

### Skeleton 属性

| 名称      | 类型                              | 说明                                                         | 默认值  | 始于 |
| --------- | --------------------------------- | ------------------------------------------------------------ | ------- | ---- |
| size      | `'small' \| 'default' \| 'large'` | 为骨架屏设置内置的大小，一般用于对齐其他组件的大小           | `null`  | -    |
| width     | `number \| string`                | 设置骨架屏的宽度，可以传入合法的 css 大小值                  | `null`  | -    |
| height    | `number \| string`                | 设置骨架屏的高度，可以传入合法的 css 大小值                  | `null`  | -    |
| repeat    | `number`                          | 设置骨架屏的重复渲染次数                                     | `1`     | -    |
| tag       | `string`                          | 设置骨架屏渲染的标签                                         | `'div'` | -    |
| activated | `boolean`                         | 设置骨架屏是否处于激活效果                                   | `false` | -    |
| image     | `boolean`                         | 设置是否为图片占位骨架屏                                     | `false` | -    |
| imageIcon | `Record<string, any>`             | 图片占位时的图标                                             | `null`  | -    |
| iconScale | `Number`                          | 图片占位时的图标缩放倍数                                     | `4`     | -    |
| round     | `boolean`                         | 设置是否为圆角骨架屏                                         | `false` | -    |
| circle    | `boolean`                         | 设置是否为圆形骨架屏，设置后 `width` 属性将失效              | `false` | -    |
| block     | `boolean`                         | 设置是否为 `block` 占位元素                                  | `false` | -    |
| spread    | `number`                          | 设置骨架屏的下边距                                           | `0`     | -    |
| loading   | `boolean`                         | 设置是否处于加载状态，再非加载状态下会直接渲染默认插槽的内容 | `true`  | -    |
