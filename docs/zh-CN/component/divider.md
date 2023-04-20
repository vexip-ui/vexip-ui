# 分割线 Divider

## 代码示例

区隔内容的分割线，用于对不同章节的文本段落进行分割或者对行内元素进行分割。

:::demo divider/basis

### 水平分割线

默认为水平分割线，可在中间加入文字。

:::

:::demo divider/text

### 文字位置

通过 `text-position` 可以改变文字所在的位置。

:::

:::demo divider/vertical

### 垂直分割线

添加 `vertical` 可以变成纵向分割线。

:::

## API

### Divider 属性

| 名称          | 类型                            | 说明                       | 默认值     | 始于 |
| ------------- | ------------------------------- | -------------------------- | ---------- | ---- |
| vertical      | `boolean`                       | 设置分割线是否为纵向       | `false`    | -    |
| dashed        | `boolean`                       | 设置分割线是否为虚线       | `false`    | -    |
| text-position | `'left' \| 'center' \| 'right'` | 设置嵌入文字的位置         | `'center'` | -    |
| primary       | `boolean`                       | 设置嵌入文字为更显眼的状态 | `false`    | -    |
