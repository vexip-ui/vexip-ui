# 栅格布局 Grid

## 代码示例

二维栅格布局组件，基于行和列来定义区域块，用于快捷地创建稳健的纵横交错布局。

相较于 Row 和 Column 的栅格布局，尽管 Grid 和 Cell 可以更灵活地创建复杂布局，但其局限性在于无法在 Grid 组件下混合使用其他组件。

:::demo grid/basis

### 基础用法

单行栅格布局。

使用一个 Grid 组件和一组 Cell 组件，就可以创建一个基本的栅格系统。

:::

:::demo grid/css-prop

### 定制栅格

Grid 组件的 `rows` 和 `columns` 属性，可以传入数字定制栅格的模版行和模版列的大小。

如果这还不满足你，这两属性还同时支持传入字符串和数组，传入字符串的时候将会直接赋值给对应的 `grid-template` 样式属性，传入数组时则会组装后再赋值。

注意一：数组内的数字元素默认单位为 `fr`。

注意二：Cell 组件默认宽度为 `24`，当显式地设置了 Grid 的 `columns` 属性后，如果这是一个数字，则 Cell 组件的默认宽度会与之对应，其他情况则会变为 `1`。

:::

:::demo grid/gap

### 栅格间距

通过设置 Grid 组件的 `gap` 属性，可以为栅格增加间距。

传入一个数组可以分别控制横向和纵向的间距。

:::

:::demo grid/position

### 自由布局

Cell 组件在纵横方向上分别有三个属性：`top`、`bottom`、`height` 和 `left`、`right`、`width`。

两个方向都可以通过设置其中的两个属性来为栅格定位。

:::

## API

### Grid 属性

| 名称         | 类型                                                                                                                                | 说明                                                                                                                    | 默认值      | 始于 |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------- | ---- |
| tag          | `string`                                                                                                                            | 渲染的元素名称                                                                                                          | `'div'`     | -    |
| gap          | `number \| number[]`                                                                                                                | 栅格间隔，可以传入 `[horizontal，vertical]` 的数组                                                                      | `0`         | -    |
| rows         | `number \| string \| (number \| string)[]`                                                                                          | 设置栅格的模版行，同 `grid-template-rows`，传入数字时将当作行数并使用 `repeat` 处理，数组中的数字元素默认单位为 `fr`    | `'none'`    | -    |
| columns      | `number \| string \| (number \| string)[]`                                                                                          | 设置栅格的模版列，同 `grid-template-columns`，传入数字时将当作行数并使用 `repeat` 处理，数组中的数字元素默认单位为 `fr` | `24`        | -    |
| auto-rows    | `number \| string \| (number \| string)[]`                                                                                          | 设置栅格的自动行，同 `grid-auto-rows`，传入数字时以及数组中的数字元素默认单位为 `fr`                                    | `'auto'`    | -    |
| auto-columns | `number \| string \| (number \| string)[]`                                                                                          | 设置栅格的自动行，同 `grid-auto-columns`，传入数字时以及数组中的数字元素默认单位为 `fr`                                 | `'auto'`    | -    |
| dense        | `boolean`                                                                                                                           | 设置是否开启密集模式，开启后将会尽可能的填充空白位置                                                                    | `false`     | -    |
| justify      | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'`                                               | 水平排列方式，但通常栅格都会在水平方向占满容器以至该属性不会发挥作用，除非你手动为某一些列设置了固定的宽度              | `'start'`   | -    |
| align        | `'top' \| 'middle' \| 'bottom' \| 'stretch'`                                                                                        | 垂直对齐方式                                                                                                            | `'stretch'` | -    |
| cell-flex    | `boolean \| { justify?: 'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between', align?: 'top' \| 'middle' \| 'bottom' }` | 设置其下的栅格是否为弹性布局，可以传入一个 `{ justify, align }` 进行定制化                                              | `false`     | -    |

### Cell 属性

| 名称     | 类型                                                                                                                                                  | 说明                                                                                                                             | 默认值   | 始于 |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------- | ---- |
| tag      | `string`                                                                                                                                              | 渲染的元素名称                                                                                                                   | `'div'`  | -    |
| top      | `number \| string`                                                                                                                                    | 设置栅格的上边界，传入数字时起始值为 `0`                                                                                         | `'auto'` | -    |
| left     | `number \| string`                                                                                                                                    | 设置栅格的左边界，传入数字时起始值为 `0`                                                                                         | `'auto'` | -    |
| width    | `number`                                                                                                                                              | 设置栅格的宽度占位，默认为占满一行，会根据上级 Grid 的 `columns` 有不一样的默认表现                                              | `null`   | -    |
| height   | `number`                                                                                                                                              | 设置栅格的高度占位，默认为占一行                                                                                                 | `1`      | -    |
| right    | `number \| string`                                                                                                                                    | 设置栅格的右边界，传入数字时起始值为 `0`，应仅用 `left`、`right` 和 `width` 中的两个属性来确定栅格的横向属性                     | `''`     | -    |
| bottom   | `number \| string`                                                                                                                                    | 设置栅格的下边界，传入数字时起始值为 `0`，应仅用 `top`、`bottom` 和 `height` 中的两个属性来确定栅格的纵向属性                    | `''`     | -    |
| xs       | `number \| { top?: number \| string, left?: number \| string, width?: number, height?: number, right?: number \| string, bottom?: number \| string }` | 媒体查询 `<576px` 时，栅格的宽度占位，传入一个对象时可以细粒度设置其他属性                                                       | `null`   | -    |
| sm       | `number \| { top?: number \| string, left?: number \| string, width?: number, height?: number, right?: number \| string, bottom?: number \| string }` | 媒体查询 `≥576px` 时，栅格的宽度占位，传入一个对象时可以细粒度设置其他属性                                                       | `null`   | -    |
| md       | `number \| { top?: number \| string, left?: number \| string, width?: number, height?: number, right?: number \| string, bottom?: number \| string }` | 媒体查询 `≥768px` 时，栅格的宽度占位，传入一个对象时可以细粒度设置其他属性                                                       | `null`   | -    |
| lg       | `number \| { top?: number \| string, left?: number \| string, width?: number, height?: number, right?: number \| string, bottom?: number \| string }` | 媒体查询 `≥992px` 时，栅格的宽度占位，传入一个对象时可以细粒度设置其他属性                                                       | `null`   | -    |
| xl       | `number \| { top?: number \| string, left?: number \| string, width?: number, height?: number, right?: number \| string, bottom?: number \| string }` | 媒体查询 `≥1200px` 时，栅格的宽度占位，传入一个对象时可以细粒度设置其他属性                                                      | `null`   | -    |
| xxl      | `number \| { top?: number \| string, left?: number \| string, width?: number, height?: number, right?: number \| string, bottom?: number \| string }` | 媒体查询 `≥1600px` 时，栅格的宽度占位，传入一个对象时可以细粒度设置其他属性                                                      | `null`   | -    |
| use-flex | `boolean \| { justify?: 'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between', align?: 'top' \| 'middle' \| 'bottom' }`                   | 设置栅格是否为弹性布局，同时在上层开启了 `cell-flex` 时，将优先栅格自身的弹性布局设置，显式地设置成 `false` 可以强制禁用弹性布局 | `null`   | -    |
