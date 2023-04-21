# 虚拟列表 VirtualList

## 代码示例

:::demo virtual-list/basis

### 简单例子

渲染 `10000` 个元素的列表。

由于元素高度不固定，每个元素在渲染之后会计算一次其真实高度进行修正，所以在滚动过程中滚动条可能会有抖动。

:::

:::demo virtual-list/fixed

### 固定高度

渲染 `10000` 个元素的列表，元素的高度为固定值。

:::

## API

### VirtualList 属性

| 名称           | 类型                         | 说明                                                                         | 默认值  | 始于 |
| -------------- | ---------------------------- | ---------------------------------------------------------------------------- | ------- | ---- |
| items          | `Record<string, any>[]`      | 设置列表的数组                                                               | `[]`    | -    |
| item-size      | `number`                     | 设置元素的大小，当 `item-fixed` 为 `true` 时为元素的固定高度，否则为最小高度 | `36`    | -    |
| item-fixed     | `boolean`                    | 设置元素是否为固定高度                                                       | `false` | -    |
| id-key         | `string`                     | 设置元素的 `id` 键名                                                         | `'id'`  | -    |
| default-key-at | `number \| string \| symbol` | 设置虚拟列表默认停留在的元素的 `id`                                          | `null`  | -    |
| buffer-size    | `number`                     | 设置可视区域前后的缓冲元素个数                                               | `5`     | -    |
| list-tag       | `string`                     | 列表的渲染元素                                                               | `'div'` | -    |
| items-tag      | `string`                     | 可视区域的渲染元素                                                           | `'ul'`  | -    |
| items-attrs    | `Record<string, any>`        | 可视区域的元素的属性                                                         | `null`  | -    |
