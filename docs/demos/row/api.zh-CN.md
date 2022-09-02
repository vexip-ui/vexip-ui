### 预设类型

```ts
type RowGridJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
type RowGridAlign = 'top' | 'middle' | 'bottom' | 'stretch'

interface ColumnFlex {
  justify: RowGridJustify,
  align: RowGridAlign
}

interface ColumnOptions {
  span?: number,
  offset?: number,
  pull?: number,
  push?: number,
  order?: number
}
```

### Row 属性

| 名称        | 类型                                                            | 说明                                                                       | 默认值    | 始于 |
| ----------- | --------------------------------------------------------------- | -------------------------------------------------------------------------- | --------- | ---- |
| tag         | `string`                                                        | 渲染的元素名称                                                             | `'div'`   | -    |
| gap         | `number \| number[]`                                            | 栅格间隔，可以传入 `[horizontal，vertical]` 的数组                         | `0`       | -    |
| justify     | `RowGridJustify`                                                | 水平排列方式                                                               | `'start'` | -    |
| align       | `RowGridAlign`                                                  | 垂直对齐方式                                                               | `'top'`   | -    |
| column-flex | `boolean \| { justify?: RowGridJustify, align?: RowGridAlign }` | 设置其下的栅格是否为弹性布局，可以传入一个 `{ justify, align }` 进行定制化 | `false`   | -    |

### Column 属性

| 名称     | 类型                                                            | 说明                                                                                                                               | 默认值  | 始于 |
| -------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------- | ---- |
| tag      | `string`                                                        | 渲染的元素名称                                                                                                                     | `'div'` | -    |
| span     | `number`                                                        | 栅格的占位数，传入 `0` 时列为隐藏状态                                                                                              | `24`    | -    |
| offset   | `number`                                                        | 栅格的左侧偏移量，偏移的位置不可有其他栅格                                                                                         | `null`  | -    |
| push     | `number`                                                        | 栅格的右移格数                                                                                                                     | `null`  | -    |
| pull     | `number`                                                        | 栅格的左移格数                                                                                                                     | `null`  | -    |
| order    | `number`                                                        | 栅格元素的排序                                                                                                                     | `null`  | -    |
| flex     | `number \| string`                                              | `flex` 布局属性，可传入数字或一个有效的 css 长度字符串或一个有效的 `flex` 属性字符串                                               | `null`  | -    |
| xs       | `number \| ColumnOptions`                                       | 媒体查询 `<576px` 时，栅格的占位，传入一个对象时可以细粒度设置其他属性                                                             | `null`  | -    |
| sm       | `number \| ColumnOptions`                                       | 媒体查询 `≥576px` 时，栅格的占位，传入一个对象时可以细粒度设置其他属性                                                             | `null`  | -    |
| md       | `number \| ColumnOptions`                                       | 媒体查询 `≥768px` 时，栅格的占位，传入一个对象时可以细粒度设置其他属性                                                             | `null`  | -    |
| lg       | `number \| ColumnOptions`                                       | 媒体查询 `≥992px` 时，栅格的占位，传入一个对象时可以细粒度设置其他属性                                                             | `null`  | -    |
| xl       | `number \| ColumnOptions`                                       | 媒体查询 `≥1200px` 时，栅格的占位，传入一个对象时可以细粒度设置其他属性                                                            | `null`  | -    |
| xxl      | `number \| ColumnOptions`                                       | 媒体查询 `≥1600px` 时，栅格的占位，传入一个对象时可以细粒度设置其他属性                                                            | `null`  | -    |
| use-flex | `boolean \| { justify?: RowGridJustify, align?: RowGridAlign }` | 设置栅格是否为弹性布局，同时在上层开启了 `column-flex` 时，将优先栅格自身的弹性布局设置，显式地设置成 `false` 可以强制禁用弹性布局 | `null`  | -    |
