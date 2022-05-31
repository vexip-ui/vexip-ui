### Row 属性

| 名称        | 类型              | 说明                                                                             | 默认值  |
| ----------- | ----------------- | -------------------------------------------------------------------------------- | ------- |
| tag         | String            | 渲染的元素名称                                                                   | 'div'   |
| gutter      | Number \| Array   | 栅格间隔，可以传入 `[horizontal，vertical]` 的数组                               | 0       |
| justify     | String            | 水平排列方式，可选值为 `start`、`end`、`center`、`space-around`、`space-between` | 'start' |
| align       | String            | 垂直对齐方式，可选值为 `top`、`middle`、`bottom`                                 | 'top'   |
| column-flex | Boolean \| Object | 设置其下的栅格是否为弹性布局，可以传入一个 `{ justify, align }` 进行定制化       | false   |

### Column 属性

| 名称     | 类型              | 说明                                                                                                                               | 默认值 |
| -------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------ |
| tag      | String            | 渲染的元素名称                                                                                                                     | 'div'  |
| span     | Number            | 栅格的占位数，传入 0 是列为隐藏状态                                                                                                | 24     |
| offset   | Number            | 栅格的左侧偏移量，偏移的位置不可有其他栅格                                                                                         | 0      |
| push     | Number            | 栅格的右移格数                                                                                                                     | 0      |
| pull     | Number            | 栅格的左移格数                                                                                                                     | 0      |
| order    | Number            | 栅格元素的排序                                                                                                                     | 0      |
| flex     | Number \| String  | flex 布局属性，可传入数字或一个有效的 css 长度字符串或一个有效的 flex 属性字符串                                                   | null   |
| xs       | Number \| Object  | 媒体查询 `<576px` 时，栅格的占位，传入一个对象时可以细粒度设置其他属性                                                             | null   |
| sm       | Number \| Object  | 媒体查询 `≥576px` 时，栅格的占位，传入一个对象时可以细粒度设置其他属性                                                             | null   |
| md       | Number \| Object  | 媒体查询 `≥768px` 时，栅格的占位，传入一个对象时可以细粒度设置其他属性                                                             | null   |
| lg       | Number \| Object  | 媒体查询 `≥992px` 时，栅格的占位，传入一个对象时可以细粒度设置其他属性                                                             | null   |
| xl       | Number \| Object  | 媒体查询 `≥1200px` 时，栅格的占位，传入一个对象时可以细粒度设置其他属性                                                            | null   |
| xxl      | Number \| Object  | 媒体查询 `≥1600px` 时，栅格的占位，传入一个对象时可以细粒度设置其他属性                                                            | null   |
| use-flex | Boolean \| Object | 设置栅格是否为弹性布局，同时在上层开启了 `column-flex` 时，将优先栅格自身的弹性布局设置，显式地设置成 `false` 可以强制禁用弹性布局 | null   |
