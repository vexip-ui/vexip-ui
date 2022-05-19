## API

### Grid 属性

| 属性         | 类型                      | 说明                                                                                                                                                                                           | 默认值    |
| ------------ | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| tag          | String                    | 渲染的元素名称                                                                                                                                                                                 | 'div'     |
| gap          | Number \| Array           | 栅格间隔，可以传入 `[horizontal，vertical]` 的数组                                                                                                                                             | 0         |
| rows         | Number \| String \| Array | 设置栅格的模版行，同 `grid-template-rows`，传入数字时将当作行数并使用 `repeat` 处理，数组中的数字元素默认单位为 `fr`                                                                           | 'none'    |
| columns      | Number \| String \| Array | 设置栅格的模版列，同 `grid-template-columns`，传入数字时将当作行数并使用 `repeat` 处理，数组中的数字元素默认单位为 `fr`                                                                        | 24        |
| auto-rows    | Number \| String \| Array | 设置栅格的自动行，同 `grid-auto-rows`，传入数字时以及数组中的数字元素默认单位为 `fr`                                                                                                           | 'auto'    |
| auto-columns | Number \| String \| Array | 设置栅格的自动行，同 `grid-auto-columns`，传入数字时以及数组中的数字元素默认单位为 `fr`                                                                                                        | 'auto'    |
| dense        | Boolean                   | 设置是否开启密集模式，开启后将会尽可能的填充空白位置                                                                                                                                           | false     |
| justify      | String                    | 水平排列方式，可选值为 `start`、`end`、`center`、`space-around`、`space-between`、`space-evenly`，但通常栅格都会在水平方向占满容器以至该属性不会发挥作用，除非你手动为某一些列设置了固定的宽度 | 'start'   |
| align        | String                    | 垂直对齐方式，可选值为 `top`、`middle`、`bottom`、`stretch`                                                                                                                                    | 'stretch' |
| cell-flex    | Boolean \| Object         | 设置其下的栅格是否为弹性布局，可以传入一个 `{ justify, align }` 进行定制化                                                                                                                     | false     |

### Cell 属性

| 属性     | 类型              | 说明                                                                                                                             | 默认值 |
| -------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------ |
| tag      | String            | 渲染的元素名称                                                                                                                   | 'div'  |
| top      | Number \| String  | 设置栅格的上边界，传入数字时起始值为 0                                                                                           | 'auto' |
| left     | Number \| String  | 设置栅格的左边界，传入数字时起始值为 0                                                                                           | 'auto' |
| width    | Number            | 设置栅格的宽度占位，默认为占满一行，会根据上级 Grid 的 `columns` 有不一样的默认表现                                              | null   |
| height   | Number            | 设置栅格的高度占位，默认为占一行                                                                                                 | 1      |
| right    | Number \| String  | 设置栅格的右边界，传入数字时起始值为 0，应仅用 `left`、`right` 和 `width` 中的两个属性来确定栅格的横向属性                       | ''     |
| bottom   | Number \| String  | 设置栅格的下边界，传入数字时起始值为 0，应仅用 `top`、`bottom` 和 `height` 中的两个属性来确定栅格的纵向属性                      | ''     |
| xs       | Number \| Object  | 媒体查询 `<576px` 时，栅格的宽度占位，传入一个对象时可以细粒度设置其他属性                                                       | null   |
| sm       | Number \| Object  | 媒体查询 `≥576px` 时，栅格的宽度占位，传入一个对象时可以细粒度设置其他属性                                                       | null   |
| md       | Number \| Object  | 媒体查询 `≥768px` 时，栅格的宽度占位，传入一个对象时可以细粒度设置其他属性                                                       | null   |
| lg       | Number \| Object  | 媒体查询 `≥992px` 时，栅格的宽度占位，传入一个对象时可以细粒度设置其他属性                                                       | null   |
| xl       | Number \| Object  | 媒体查询 `≥1200px` 时，栅格的宽度占位，传入一个对象时可以细粒度设置其他属性                                                      | null   |
| xxl      | Number \| Object  | 媒体查询 `≥1600px` 时，栅格的宽度占位，传入一个对象时可以细粒度设置其他属性                                                      | null   |
| use-flex | Boolean \| Object | 设置栅格是否为弹性布局，同时在上层开启了 `cell-flex` 时，将优先栅格自身的弹性布局设置，显式地设置成 `false` 可以强制禁用弹性布局 | null   |
