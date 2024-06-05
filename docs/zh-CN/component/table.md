# Table 表格

用于展示结构化二维数据，可以快速实对数据进行排序、搜索、分组、编辑、分页、汇总等操作。

## 代码示例

:::demo table/basis

### 基础用法

简单的数据表。

通过 `accessor` 选项可以设置数据读取方法，通过 `formatter` 选项可以设置内容格式化方法。

:::

:::demo table/column

### 模版列

使用 TableColumn 组件可以以模版的形式配置表格列。

模版列的优势在于，可以灵活地使用插槽以应对各种复杂的渲染情况，而无需编写渲染函数，是更推荐的使用方式。

:::

:::demo table/style

### 预设样式

添加 `stripe` 属性可以为表格添加斑马纹。

添加 `border` 属性可以为表格添加边框。

添加 `highlight` 属性可以为表格行设置移入时高亮。

如果你想要一个清爽的表格，可以添加 `transparent` 属性。

:::

:::demo table/attrs

### 自定义属性

通过列选项的 `class-name`、`style` 和 `attrs` 属性可以自定义列的属性。

通过 `row-class`、`row-style` 和 `row-attrs` 属性可以自定义行的属性。

通过 `head-class`、`head-style` 和 `head-attrs` 属性可以自定义表头单元格的属性。

通过 `cell-class`、`cell-style` 和 `cell-attrs` 属性可以自定义单元格的属性。

:::

:::demo table/empty

### 空表格

没有数据时的样子，可以用 `empty` 插槽定制化。

:::

:::demo table/mouse-events

### 鼠标事件

表格提供了各种鼠标事件以快速实现自定义交互。

:::

:::demo table/selection

### 复选框列

为列选项添加 `type` 属性并设置其值为 `'selection'` 可以使该列作为复选框。

获取组件实例后，可以调用 `getSelected` 方法回去被勾选的行数据，或者通过 `clearSelected` 清空勾选。

:::

:::demo table/order

### 序号列

在列选项添加 `type` 属性并设置其值为 `'order'` 可以使该列作为序号列。

:::

:::demo table/expand

### 拓展内容

在列选项添加 `type` 属性并设置其值为 `'expand'` 可以使该列作为拓展列，该列的默认插槽内容将作为拓展模版内容渲染。

:::

:::demo table/sorter

### 表格排序

在列选项设置 `sorter` 属性，可以启用排序功能。

如果你希望只派发排序事件而不执行内部的过滤逻辑（例如在远程排序时），可以为表格组件添加 `custom-sorter` 属性。

:::

:::demo table/filter

### 数据过滤

在列选项设置 `filter` 属性，可以启用过滤功能。

如果你希望只派发过滤事件而不执行内部的逻辑（例如在远程过滤时），可以为表格组件添加 `custom-filter` 属性。

通过 TableColumn 组件的 `filter` 插槽你还可以自定义过滤器的渲染。

同时你也可以借助 Table 组件的 `data-filter` 属性定义额外的数据过滤方法。

:::

:::demo table/fixed

### 固定行列

设置 `width` 和 `height` 属性可以为表格限制宽度和高度。

为 Column 设置 `width` 属性可以指定该列宽，设置 `fixed` 属性可以指定固定的列。

:::

:::demo table/pagination

### 表格分页

结合 Pagination 组件可以实现表格分页，一般用于数据较多，不便于一页展示的情况。

通过 `current-page` 和 `page-size` 属性可以轻松做到 Pagination 和 Table 组件数据联动。

:::

:::demo table/tree

### 树形数据

当行数据中含有合法 `children` 属性时，会自动开启树形数据解析。

可以添加 `disabled-tree` 属性来禁用自动解析，或者通过 `key-config` 指定另一个目标属性。

还可以通过设置 `row-indent` 属性来配置每一级的缩进距离。

如果希望手动指定树形表格的缩进列，可以为某个 Column 添加 `indented` 属性。

:::

:::demo table/draggable

### 行拖拽

添加 `row-draggable` 属性可以开启行拖拽功能。

不过这种方式会使得整个行只能进行拖拽交互，可以改为添加一个 `type` 属性为 `'drag'` 的列，创建一个单独的拖拽把手。

拖拽后，你可以通过下面的任意一种方式获取最新的数据：

- 调用组件的 `getData` 方法获取
- 通过 `row-drag-end` 事件回调的第二个参数获取
- 通过 `update:data` 事件回调获取（意味着你可以使用 `v-model:data`）

:::

:::demo table/virtual

### 虚拟滚动

添加 `virtual` 属性开启虚拟化，数据太多的时候，你应该会需要它。

:::

:::demo table/toggle-data

### 切换数据

在数据发生变化的时候，表格内的一些指标会自动地重新计算。

:::

:::demo table/refresh

### 刷新表格

当 Table 放置一些初始隐藏的元素中，并延迟显示时，通常无法正确计算宽度。

这时需要在该元素显示后调用 Table 实例的 `refresh` 方法重新计算布局。

:::

:::demo table/resize-column

### 调整列宽

==!s|2.1.23==

添加 `col-resizable` 属性可以开启列宽缩放功能。

:::

:::demo table/cell-span

### 单元格合并

==!s|2.1.24==

通过列选项的 `cell-span` 属性提供一个回调函数，可以设置各个单元格的跨度。

如果想要合并头部，则需要在列选项设置 `head-span` 属性。

:::

:::demo table/column-group

### 表头分组

==!s|2.2.12==

示例中使用了 TableColumnGroup 组件对表格列进行分组。

如果使用 `columns` 属性，当在选项中指定了 `children` 属性后就会被解析为列分组选项。

注意，在使用列分组后，仅有第一层选项的 `fixed` 属性会生效，其他的像是示例中的年龄列的 `fixed` 属性则是无效的。

:::

:::demo table/summary

### 表格总结

==!s|2.1.24==

和列一样，你可以通过 `summaries` 属性或者 TableSummary 组件定义总结行。

你还可以通过 TableColumn 组件的 `summary` 插槽单独定义某一列的总结内容。

:::

## API

### 预设类型

Table 组件的类型定义非常之多，如果你想充分了解它们之间的关系，建议从 [源码](https://github.com/vexip-ui/vexip-ui/blob/main/components/table/symbol.ts) 入手。

```ts
type Key = string | number | symbol
type Data = any
type TableIconName = 'filter' | 'asc' | 'desc' | 'dragger' | 'expand' | 'plus' | 'minus'
type TableRowPropFn<P = any> = (data: Data, index: number) => P
type TableRowDropType = 'before' | 'after' | 'none'
type TableTextAlign = 'left' | 'center' | 'right'
type TableColumnType = 'order' | 'selection' | 'expand' | 'drag'
type TableColResizeType = 'lazy' | 'responsive'

type TableIcons = Partial<Record<TableIconName, Record<string, any> | (() => any)>>

interface CellSpanResult {
  colSpan?: number,
  rowSpan?: number
}

interface TableKeyConfig {
  id?: string,
  children?: string,
  checked?: string,
  height?: string,
  expanded?: string,
  treeExpanded?: string
}

type Accessor<D = Data, Val extends string | number = string | number> = (
  data: D,
  index: number
) => Val
type ExpandRenderFn<D = Data> = (data: {
  /** @deprecated */
  leftFixed: number,
  /** @deprecated */
  rightFixed: number,
  row: D,
  rowIndex: number
}) => any
type ColumnCellSpanFn<D = Data> = (data: {
  row: D,
  index: number,
  fixed?: 'left' | 'right'
}) => CellSpanResult | undefined
type SummaryCellSpanFn<D = Data, Val extends string | number = string | number> = (data: {
  column: TableColumnOptions<D, Val>,
  index: number,
  fixed?: 'left' | 'right'
}) => CellSpanResult | undefined

type TableFilterOptions<D = Data, Val extends string | number = string | number> =
  | {
    able?: boolean,
    custom?: false,
    options?: (string | { value: Val, label?: string, active?: boolean })[],
    multiple?: false,
    active?: null | Val,
    method?: null | ((active: Val, data: D) => boolean),
    meta?: any
  }
  | {
    able?: boolean,
    custom?: false,
    options?: (string | { value: Val, label?: string, active?: boolean })[],
    multiple: true,
    active?: null | Val[],
    method?: null | ((active: Val[], data: D) => boolean),
    meta?: any
  }
  | {
    able?: boolean,
    custom: true,
    options?: never,
    multiple?: false,
    active?: null | Val | Val[],
    method?: null | ((active: any, data: D) => boolean),
    meta?: any
  }

interface TableSorterOptions<D = Data> {
  able?: boolean,
  type?: null | 'asc' | 'desc',
  order?: number,
  method?: null | ((prev: D, next: D) => number)
}

interface TableSummaryData {
  sum: number,
  min: number,
  max: number
}

type SummaryRenderFn<D = Data, Val extends string | number = string | number> = (data: {
  column: TableColumnOptions<D, Val>,
  index: number,
  rows: D[],
  meta: TableSummaryData
}) => any

type ColumnSummaryRenderFn<
  D = Data,
  Val extends string | number = string | number
> = (data: {
  column: TableColumnOptions<D, Val>,
  index: number,
  rows: D[],
  meta: TableSummaryData,
  summary: TableSummaryOptions<D, Val>
}) => any

interface TableBaseColumn<D = Data, Val extends string | number = string | number> {
  name: string,
  key: keyof D,
  type?: never,
  meta?: any,
  fixed?: boolean | 'left' | 'right',
  class?: ClassType,
  style?: StyleType,
  attrs?: Record<string, any>,
  width?: number,
  filter?: TableFilterOptions<D, Val>,
  sorter?: boolean | TableSorterOptions<D>,
  order?: number,
  /** @deprecated */
  noEllipsis?: boolean,
  ellipsis?: boolean,
  textAlign?: TableTextAlign,
  headSpan?: number,
  noSummary?: boolean,
  accessor?: Accessor<D, Val>,
  formatter?: (value: Val) => unknown,
  cellSpan?: ColumnCellSpanFn<D>,
  renderer?: ColumnRenderFn<D, Val>,
  headRenderer?: HeadRenderFn,
  filterRenderer?: FilterRenderFn,
  summaryRenderer?: ColumnSummaryRenderFn<D, Val>
}

interface TableOrderColumn<D = Data, Val extends string | number = string | number>
  extends Omit<TableBaseColumn<D, Val>, 'type' | 'renderer'> {
  type: 'order',
  truthIndex?: boolean,
  orderLabel?: (index: number) => string | number
}

interface TableSelectionColumn<D = Data, Val extends string | number = string | number>
  extends Omit<TableBaseColumn<D, Val>, 'type' | 'renderer' | 'headRenderer'> {
  type: 'selection',
  checkboxSize?: ComponentSize,
  disableRow?: (data: Data) => boolean
}

interface TableExpandColumn<D = Data, Val extends string | number = string | number>
  extends Omit<TableBaseColumn<D, Val>, 'type' | 'renderer'> {
  type: 'expand',
  disableRow?: (data: Data) => boolean,
  renderer?: ExpandRenderFn<D>
}

interface TableDragColumn<D = Data, Val extends string | number = string | number>
  extends Omit<TableBaseColumn<D, Val>, 'type' | 'renderer'> {
  type: 'drag',
  disableRow?: (data: Data) => boolean
}

type TableTypeColumn<D = Data, Val extends string | number = string | number> =
  | TableOrderColumn<D, Val>
  | TableSelectionColumn<D, Val>
  | TableExpandColumn<D, Val>
  | TableDragColumn<D, Val>
type TableColumnOptions<D = Data, Val extends string | number = string | number> =
  | TableBaseColumn<D, Val>
  | TableTypeColumn<D, Val>

type ColumnWithKey<
  D = Data,
  Val extends string | number = string | number
> = TableColumnOptions<D, Val> & { key: Key, rowSpan: number }

interface TableColumnGroupOptions {
  name?: string,
  fixed?: boolean | 'left' | 'right',
  order?: number,
  ellipsis?: boolean,
  textAlign?: TableTextAlign,
  renderer?: () => any,
  children: TableColumnOptions<any, any>[]
}

type TableColumnRawOptions = TableColumnOptions<any, any> | TableColumnGroupOptions

type ColumnRenderFn<D = Data, Val extends string | number = string | number> = (data: {
  row: D,
  rowIndex: number,
  column: TableBaseColumn<D, Val>,
  columnIndex: number
}) => any
type HeadRenderFn<D = Data, Val extends string | number = string | number> = (data: {
  column: TableColumnOptions<D, Val>,
  index: number
}) => any
type FilterRenderFn<D = Data, Val extends string | number = string | number> = (data: {
  column: TableColumnOptions<D, Val>,
  index: number,
  filter: Required<TableFilterOptions<D, Val>>,
  handleFilter: (active: any) => void
}) => any

type TableCellSpanFn<D = Data, Val extends string | number = string | number> = (data: {
  row: D,
  rowIndex: number,
  column: TableColumnOptions<D, Val>,
  columnIndex: number,
  fixed?: 'left' | 'right'
}) => CellSpanResult | undefined

type TableCellPropFn<D = Data, P = any> = (data: {
  row: D,
  rowIndex: number,
  column: ColumnWithKey,
  columnIndex: number
}) => P
type TableHeadPropFn<P = any> = (data: { column: ColumnWithKey, index: number }) => P
type TableFootPropFn<P = any> = (data: {
  column: ColumnWithKey,
  columnIndex: number,
  summary: SummaryWithKey,
  summaryIndex: number
}) => P

type ColumnProfile<D = Data, Val extends string | number = string | number> = Pick<
  ColumnWithKey<D, Val>,
  'name' | 'key' | 'meta'
>
type TableFilterProfile<
  D = Data,
  Val extends string | number = string | number
> = ColumnProfile<D, Val> & {
  active: Val | Val[]
}
type TableSorterProfile<
  D = Data,
  Val extends string | number = string | number
> = ColumnProfile<D, Val> & {
  type: 'asc' | 'desc',
  order: number
}

interface TableSummaryOptions<D = Data, Val extends string | number = string | number> {
  name: string,
  key: keyof D,
  class?: ClassType,
  style?: StyleType,
  attrs?: Record<string, any>,
  order?: number,
  above?: boolean,
  cellSpan?: SummaryCellSpanFn<D, Val>,
  renderer?: SummaryRenderFn<D, Val>
}

type SummaryWithKey<
  D = Data,
  Val extends string | number = string | number
> = TableSummaryOptions<D, Val> & { key: Key }

interface TableRowPayload {
  row: Data,
  key: Key,
  index: number,
  event: Event,
  checked?: boolean,
  expanded?: boolean
}

interface TableCellPayload {
  row: Data,
  key: Key,
  rowIndex: number,
  column: TableColumnOptions,
  columnIndex: number,
  event: Event
}

interface TableHeadPayload {
  column: TableColumnOptions,
  index: number,
  event: Event
}

interface TableColResizePayload extends TableHeadPayload {
  width: number
}

interface TableFootPayload {
  column: TableColumnOptions,
  columnIndex: number,
  summary: TableSummaryOptions,
  summaryIndex: number,
  event: Event
}
```

### Table 属性

| 名称            | 类型                                                          | 说明                                                          | 默认值         | 始于     |
| --------------- | ------------------------------------------------------------- | ------------------------------------------------------------- | -------------- | -------- |
| columns         | `TableColumnRawOptions[]`                                     | 表格列的配置，参考下方的 TableColumn 属性                     | `[]`           | -        |
| summaries       | `TableSummaryOptions<any, any>[]`                             | 表格总结行的配置，参考下方 TableSummary 属性                  | `[]`           | `2.1.24` |
| data            | `Data[]`                                                      | 表格的数据源                                                  | `[]`           | -        |
| width           | `number`                                                      | 表格的宽度，在有固定列时使用                                  | `null`         | -        |
| height          | `number`                                                      | 表格的高度，超出这个高度时会变成可滚动状态                    | `null`         | -        |
| row-class       | `ClassType \| TableRowPropFn<ClassType>`                      | 行的自定义类名                                                | `null`         | -        |
| row-style       | `StyleType \| TableRowPropFn<StyleType>`                      | 行的自定义样式                                                | `null`         | `2.0.1`  |
| row-attrs       | `Record<string, any> \| TableRowPropFn<Record<string, any>>`  | 行的自定义属性                                                | `null`         | `2.0.1`  |
| cell-class      | `ClassType \| TableCellPropFn<ClassType>`                     | 单元格的自定义类名                                            | `null`         | `2.0.1`  |
| cell-style      | `StyleType \| TableCellPropFn<StyleType>`                     | 单元格的自定义样式                                            | `null`         | `2.0.1`  |
| cell-attrs      | `Record<string, any> \| TableCellPropFn<Record<string, any>>` | 单元格的自定义属性                                            | `null`         | `2.0.1`  |
| head-class      | `ClassType \| TableHeadPropFn<ClassType>`                     | 表头单元格的自定义类名                                        | `null`         | `2.0.1`  |
| head-style      | `StyleType \| TableHeadPropFn<StyleType>`                     | 表头单元格的自定义样式                                        | `null`         | `2.0.1`  |
| head-attrs      | `Record<string, any> \| TableHeadPropFn<Record<string, any>>` | 表头单元格的自定义属性                                        | `null`         | `2.0.1`  |
| foot-class      | `ClassType \| TableFootPropFn<ClassType>`                     | 表尾单元格的自定义类名                                        | `null`         | `2.1.24` |
| foot-style      | `StyleType \| TableFootPropFn<StyleType>`                     | 表尾单元格的自定义样式                                        | `null`         | `2.1.24` |
| foot-attrs      | `Record<string, any> \| TableFootPropFn<Record<string, any>>` | 表尾单元格的自定义属性                                        | `null`         | `2.1.24` |
| stripe          | `boolean`                                                     | 设置表格是否应用斑马纹                                        | `false`        | -        |
| border          | `boolean`                                                     | 设置表格是否具有外边框和纵向边框                              | `false`        | -        |
| highlight       | `boolean`                                                     | 设置表格行是否在鼠标移入时高亮                                | `false`        | -        |
| use-x-bar       | `boolean`                                                     | 设置表格是否使用横向滚动条                                    | `false`        | `2.1.25` |
| use-y-bar       | `boolean`                                                     | 设置表格是否使用纵向滚动条                                    | `false`        | -        |
| bar-fade        | `number`                                                      | 设置滚动条的渐隐时间，若小于 `300` 则关闭渐隐效果             | `1500`         | -        |
| scroll-delta-y  | `number`                                                      | 设置表格纵向每次滚动的距离                                    | `20`           | -        |
| row-draggable   | `boolean`                                                     | 设置表格行是否可以拖拽排序                                    | `false`        | -        |
| row-height      | `number`                                                      | 设置表格的行高，未设置时表格行高将会动态计算                  | `null`         | -        |
| render-count    | `number`                                                      | 设置表格的最大渲染行数，通常用于大量数据渲染，需设置固定行高  | `null`         | -        |
| scroll-class    | `ScrollClass`                                                 | 设置表格各滚动组件的自定义类型                                | `{}`           | -        |
| expand-renderer | `ExpandRenderFn`                                              | 设置行拓展内容的渲染方法                                      | `null`         | -        |
| current-page    | `number`                                                      | 设置表格当前显示的数据页                                      | `1`            | -        |
| page-size       | `number`                                                      | 设置表格每页的数据量，当为 `0` 时则禁用分页                   | `0`            | -        |
| transparent     | `boolean`                                                     | 设置是否为透明表格，该属性优先级低于其他内置样式属性          | `false`        | -        |
| empty-text      | `string`                                                      | 设置表格空数据时的提示语                                      | `locale.empty` | -        |
| single-sorter   | `boolean`                                                     | 设置后将限制表格只能有一列开启排序                            | `false`        | -        |
| single-filter   | `boolean`                                                     | 设置后将限制表格只能有一列开启过滤                            | `false`        | -        |
| virtual         | `boolean`                                                     | 是否开启虚拟滚动                                              | `false`        | -        |
| locale          | `LocaleConfig['table']`                                       | 设置多语言配置                                                | `null`         | `2.1.0`  |
| custom-sorter   | `boolean`                                                     | 设置是否为自定义排序，开启后仅派发事件而不会进行内部排序      | `false`        | `2.1.4`  |
| custom-filter   | `boolean`                                                     | 设置是否为自定义过滤，开启后仅派发事件而不会进行内部过滤      | `false`        | `2.1.4`  |
| key-config      | `TableKeyConfig`                                              | 设置数据解析 `data` 时的各项键名                              | `{}`           | `2.1.6`  |
| disabled-tree   | `boolean`                                                     | 设置是否禁用自动解析树形数据                                  | `false`        | `2.1.6`  |
| row-indent      | `string \| number`                                            | 设置树形表格每一级的缩进距离                                  | `'16px'`       | `2.1.6`  |
| no-cascaded     | `boolean`                                                     | 在树形表格中使父子节点能被独立勾选                            | `false`        | `2.1.6`  |
| col-resizable   | `boolean \| TableColResizeType`                               | 设置表格列的宽度是否可以调整，设置为 `true` 时等同于 `'lazy'` | `false`        | `2.1.23` |
| cell-span       | `TableCellSpanFn`                                             | 设置单元格跨度的回调函数                                      | `null`         | `2.1.24` |
| side-padding    | `number \| number[]`                                          | 设置表格两侧的内边距                                          | `0`            | `2.1.28` |
| icons           | `TableIcons`                                                  | 用于设置表格的各种图标                                        | `{}`           | `2.1.28` |
| border-width    | `number`                                                      | 设置表格的边框宽度                                            | `1`            | `2.2.12` |
| data-filter     | `(data: Data) => boolean`                                     | 设置额外的数据过滤方法                                        | `null`         | `2.2.14` |
| no-transition   | `boolean`                                                     | 是否禁用表格的过渡效果                                        | `false`        | `2.2.14` |
| ellipsis        | `boolean`                                                     | 是否为单元格内容使用省略组件                                  | `false`        | `2.2.16` |
| min-height      | `number`                                                      | 表格的最小高度，不应大于 `height`                             | `null`         | `2.3.7`  |

### Table 事件

| 名称             | 说明                                   | 参数                                                                                    | 始于     |
| ---------------- | -------------------------------------- | --------------------------------------------------------------------------------------- | -------- |
| scroll           | 当表格滚动时触发                       | `(scroll: { type: 'horizontal' \| 'vertical', client: number, percent: number })`       | `2.1.25` |
| row-enter        | 当鼠标移入了行时触发                   | `(payload: TableRowPayload)`                                                            | -        |
| row-leave        | 当鼠标移出了行时触发                   | `(payload: TableRowPayload)`                                                            | -        |
| row-click        | 当点击了行时触发                       | `(payload: TableRowPayload)`                                                            | -        |
| row-dblclick     | 当双击了行时触发                       | `(payload: TableRowPayload)`                                                            | `2.0.1`  |
| row-contextmenu  | 当右击了行时触发                       | `(payload: TableRowPayload)`                                                            | `2.0.1`  |
| row-check        | 当勾选了行复选框时触发                 | `(payload: TableRowPayload)`                                                            | -        |
| row-check-all    | 当进行了全选时触发                     | `(checked: boolean, partial: boolean)`                                                  | -        |
| row-expand       | 当行拓展内容的展开状态改变时触发       | `(payload: TableRowPayload)`                                                            | -        |
| row-tree-expand  | 当行的树展开状态改变时触发             | `(payload: TableRowPayload)`                                                            | `2.3.1`  |
| row-drag-start   | 当行将要开始拖拽时触发                 | `(data: Record<string, unknown>, event: DragEvent)`                                     | -        |
| row-drag-over    | 当行正在拖拽时触发                     | `(data: Record<string, unknown>, event: DragEvent)`                                     | -        |
| row-drop         | 当行被其他的拖拽行放入时触发           | `(data: Record<string, unknown>, dropType?: 'before' \| 'after', event: DragEvent)`     | -        |
| row-drag-end     | 当行结束拖拽时触发                     | `(data: Record<string, unknown>, allData: Record<string, unknown>[], event: DragEvent)` | -        |
| row-filter       | 当发生表格数据过滤时触发               | `(profiles: TableFilterProfile[], filteredRow: Data[])`                                 | -        |
| row-sort         | 当发生表格数据排序时触发               | `(profiles: SortProfile[], sortedRow: Data[])`                                          | -        |
| cell-enter       | 当鼠标移入了单元格时触发               | `(payload: TableCellPayload)`                                                           | `2.0.1`  |
| cell-leave       | 当鼠标移出了单元格时触发               | `(payload: TableCellPayload)`                                                           | `2.0.1`  |
| cell-click       | 当点击了单元格时触发                   | `(payload: TableCellPayload)`                                                           | `2.0.1`  |
| cell-dblclick    | 当双击了单元格时触发                   | `(payload: TableCellPayload)`                                                           | `2.0.1`  |
| cell-contextmenu | 当右击了单元格时触发                   | `(payload: TableCellPayload)`                                                           | `2.0.1`  |
| col-resize-start | 当列要开始调整宽度时触发               | `(payload: TableColResizePayload)`                                                      | `2.1.23` |
| col-resize-move  | 当列正在调整宽度时触发                 | `(payload: TableColResizePayload)`                                                      | `2.1.23` |
| col-resize-end   | 当列结束调整宽度时触发                 | `(payload: TableColResizePayload)`                                                      | `2.1.23` |
| head-enter       | 当鼠标移入了头部单元格时触发           | `(payload: TableHeadPayload)`                                                           | `2.0.1`  |
| head-leave       | 当鼠标移出了头部单元格时触发           | `(payload: TableHeadPayload)`                                                           | `2.0.1`  |
| head-click       | 当点击了头部单元格时触发               | `(payload: TableHeadPayload)`                                                           | `2.0.1`  |
| head-dblclick    | 当双击了头部单元格时触发               | `(payload: TableHeadPayload)`                                                           | `2.0.1`  |
| head-contextmenu | 当右击了头部单元格时触发               | `(payload: TableHeadPayload)`                                                           | `2.0.1`  |
| foot-enter       | 当鼠标移入了尾部单元格时触发           | `(payload: TableFootPayload)`                                                           | `2.1.24` |
| foot-leave       | 当鼠标移出了尾部单元格时触发           | `(payload: TableFootPayload)`                                                           | `2.1.24` |
| foot-click       | 当点击了尾部单元格时触发               | `(payload: TableFootPayload)`                                                           | `2.1.24` |
| foot-dblclick    | 当双击了尾部单元格时触发               | `(payload: TableFootPayload)`                                                           | `2.1.24` |
| foot-contextmenu | 当右击了尾部单元格时触发               | `(payload: TableFootPayload)`                                                           | `2.1.24` |
| update:data      | 当行结束拖拽并且数据结构发生变化时触发 | `(data: Data[])`                                                                        | `2.2.18` |

### Table 插槽

| 名称        | 说明                                                         | 参数                   | 始于     |
| ----------- | ------------------------------------------------------------ | ---------------------- | -------- |
| default     | 用于定义 TableColumn 和 TableSummary 组件                    | -                      | -        |
| empty       | 空数据提示内容的插槽                                         | `{ isFixed: boolean }` | -        |
| icon-[name] | 表格图标的插槽，其中 `[name]` 的可选值请参考 `TableIconName` | -                      | `2.1.28` |

### Table 方法

| 名称          | 说明                                       | 签名                                                            | 始于     |
| ------------- | ------------------------------------------ | --------------------------------------------------------------- | -------- |
| clearSort     | 清除表格当前激活的所有排序                 | `() => void`                                                    | -        |
| clearFilter   | 清除当前表格激活的所有过滤                 | `() => void`                                                    | -        |
| refresh       | 刷新表格，将会触发表格的重新布局及数据渲染 | `() => Promise<void>`                                           | -        |
| getSelected   | 获取所有被勾选的行数据                     | `() => Data[]`                                                  | -        |
| clearSelected | 清除所有被勾选的行数据                     | `() => void`                                                    | -        |
| getData       | 获取表格的数据，通常用于获取拖拽后的数据   | `() => Data[]`                                                  | `2.2.6`  |
| refreshData   | 刷新表格数据，会触发表格重新解析数据       | `(data?: any[]) => Promise<void>`                               | `2.2.14` |
| selectRow     | 手动勾选或取消勾选行数据                   | `(keyOrData: Key \| Record<any, any>, checked?: boolean): void` | `2.3.1`  |
| treeExpandRow | 手动展开或收起行数据                       | `(keyOrData: Key \| Record<any, any>, checked?: boolean): void` | `2.3.1`  |

### TableColumn 属性

| 名称             | 类型                                   | 说明                                                               | 默认值      | 始于     |
| ---------------- | -------------------------------------- | ------------------------------------------------------------------ | ----------- | -------- |
| name             | `string`                               | 列的名称                                                           | `''`        | -        |
| key \| id-key    | `string \| number`                     | 列的唯一索引，使用模版列时请使用 `id-key` 代替                     | `null`      | -        |
| accessor         | `(data: any, rowIndex: number) => any` | 该列的数据读取方法                                                 | `null`      | -        |
| fixed            | `boolean \| 'left' \| 'right'`         | 是否为固定列，可选值为 `left`、`right`，设置为 `true` 时固定在左侧 | `false`     | -        |
| class            | `ClassType`                            | 该列单元格的自定义类名                                             | `null`      | `2.1.19` |
| style            | `StyleType`                            | 该列单元格的自定义样式                                             | `null`      | `2.0.1`  |
| attrs            | `Record<string, any>`                  | 该列单元格的自定义属性                                             | `null`      | `2.0.1`  |
| type             | `TableColumnType`                      | 设置内置特定类型列                                                 | `null`      | -        |
| width            | `number`                               | 设置列宽                                                           | `null`      | -        |
| filter           | `TableFilterOptions<any, any>`         | 列的过滤配置器                                                     | `null`      | -        |
| sorter           | `boolean \| TableSorterOptions<any>`   | 列的排序排序器                                                     | `null`      | -        |
| order            | `number`                               | 列的渲染顺序                                                       | `0`         | -        |
| renderer         | `ColumnRenderFn`                       | 自定义渲染函数，若 `type` 为 `'expand'` 时则为 `ExpandRenderFn`    | `null`      | -        |
| head-renderer    | `HeadRenderFn`                         | 自定义头部渲染函数                                                 | `null`      | -        |
| filter-renderer  | `FilterRenderFn`                       | 自定义过滤器渲染函数                                               | `null`      | `2.1.18` |
| ellipsis         | `boolean`                              | 是否为单元格内容使用省略组件                                       | `false`     | `2.2.12` |
| checkbox-size    | `'small' \| 'default' \| 'large'`      | 当 `type` 为 `'selection'` 时设置复选框大小                        | `'default'` | -        |
| disable-row      | `(data: Data) => boolean`              | 设置禁用行的回调函数                                               | `null`      | -        |
| truth-index      | `boolean`                              | 当 `type` 为 `'order'` 时设置是否使用行真实（全局）索引            | `false`     | -        |
| order-label      | `(index: number) => string \| number`  | 当 `type` 为 `'order'` 时设置索引显示内容的回调函数                | `null`      | -        |
| meta             | `any`                                  | 设置列的元数据                                                     | `null`      | `2.1.24` |
| text-align       | `TableTextAlign`                       | 设置列的横向对其方式                                               | `'left'`    | `2.1.19` |
| head-span        | `number`                               | 设置头部跨度                                                       | `1`         | `2.1.24` |
| cell-span        | `ColumnCellSpanFn<any>`                | 设置单元格跨度的回调函数                                           | `null`      | `2.1.24` |
| no-summary       | `boolean`                              | 是否禁用自动计算列值的总结数据                                     | `false`     | `2.1.24` |
| summary-renderer | `ColumnSummaryRenderFn`                | 自定义尾部渲染函数                                                 | `null`      | `2.1.24` |
| indented         | `boolean`                              | 指定为树形表格的缩进列                                             | `false`     | `2.2.6`  |
| formatter        | `(value: any) => unknown`              | 设置单元格内容的格式化方法                                         | `null`      | `2.2.13` |

### TableColumn 插槽

| 名称    | 说明           | 参数                                | 始于     |
| ------- | -------------- | ----------------------------------- | -------- |
| default | 列内容的插槽   | `Parameters<ColumnRenderFn>`        | -        |
| head    | 列头内容的插槽 | `Parameters<HeadRenderFn>`          | -        |
| filter  | 列过滤器的插槽 | `Parameters<FilterRenderFn>`        | `2.1.18` |
| summary | 列尾内容的插槽 | `Parameters<ColumnSummaryRenderFn>` | `2.1.24` |

### TableColumnGroup 属性

==!s|2.2.12==

| 名称       | 类型                           | 说明                                                                                  | 默认值     | 始于 |
| ---------- | ------------------------------ | ------------------------------------------------------------------------------------- | ---------- | ---- |
| name       | `string`                       | 列分组的名称                                                                          | `''`       | -    |
| fixed      | `boolean \| 'left' \| 'right'` | 是否为固定列分组，可选值为 `left`、`right`，设置为 `true` 时固定在左侧                | `false`    | -    |
| order      | `number`                       | 列分组的渲染顺序，与列的 `order` 属性共同作用，每一层级、每个分组之间的排序均是独立的 | `0`        | -    |
| ellipsis   | `boolean`                      | 是否为表头单元格内容使用省略组件                                                      | `false`    | -    |
| text-align | `TableTextAlign`               | 设置表头单元格的横向对其方式                                                          | `'center'` | -    |
| renderer   | `() => any`                    | 自定义头部渲染函数                                                                    | `null`     | -    |

### TableColumnGroup 插槽

==!s|2.2.12==

| 名称    | 说明                      | 参数 | 始于 |
| ------- | ------------------------- | ---- | ---- |
| default | 用于定义 TableColumn 组件 | -    | -    |
| head    | 列头内容的插槽            | -    | -    |

### TableSummary 属性

==!s|2.1.24==

| 名称          | 类型                  | 说明                                               | 默认值  | 始于 |
| ------------- | --------------------- | -------------------------------------------------- | ------- | ---- |
| name          | `string`              | 总结行的名称                                       | `''`    | -    |
| key \| id-key | `string \| number`    | 总结行的唯一索引，使用模版列时请使用 `id-key` 代替 | `null`  | -    |
| class         | `ClassType`           | 该行单元格的自定义类名                             | `null`  | -    |
| style         | `StyleType`           | 该行单元格的自定义样式                             | `null`  | -    |
| attrs         | `Record<string, any>` | 该行单元格的自定义属性                             | `null`  | -    |
| cell-span     | `SummaryCellSpanFn`   | 设置单元格跨度的回调函数                           | `null`  | -    |
| order         | `number`              | 总结行的渲染顺序                                   | `0`     | -    |
| above         | `boolean`             | 设置总结行是否在表格上部                           | `false` | -    |
| meta          | `any`                 | 设置总结行的元数据                                 | `null`  | -    |
| renderer      | `SummaryRenderFn`     | 自定义渲染函数                                     | `null`  | -    |

### TableSummary 插槽

==!s|2.1.24==

| 名称    | 说明             | 参数                          | 始于 |
| ------- | ---------------- | ----------------------------- | ---- |
| default | 总结行内容的插槽 | `Parameters<SummaryRenderFn>` | -    |

### TableSorter 属性

| 名称   | 类型                               | 说明                                 | 默认值  | 始于 |
| ------ | ---------------------------------- | ------------------------------------ | ------- | ---- |
| able   | `boolean`                          | 设置是否可以排序                     | `false` | -    |
| type   | `'asc' \| 'desc'`                  | 排序的类型                           | `null`  | -    |
| order  | `number`                           | 在多列排序时用于规定各列的先后顺序   | `0`     | -    |
| method | `(prev: any, next: any) => number` | 自定义排序的方法，分别接收前后行数据 | `null`  | -    |

### TableFilter 属性

| 名称     | 类型                                                             | 说明                                                    | 默认值      | 始于     |
| -------- | ---------------------------------------------------------------- | ------------------------------------------------------- | ----------- | -------- |
| able     | `boolean`                                                        | 设置是否可以过滤                                        | `false`     | -        |
| options  | `(string \| { value: any, label?: string, active?: boolean })[]` | 过滤的选项，元素为 `{ label, value }` 的对象            | `[]`        | -        |
| multiple | `boolean`                                                        | 是否开启多条件过滤                                      | `false`     | -        |
| active   | `any`                                                            | 当前过滤的依赖值，会传入过滤方法                        | `null`      | -        |
| method   | `(active: any \| any[], data: any) => boolean`                   | 过滤的方法，接收过滤的依赖值和行数据                    | `null`      | -        |
| custom   | `boolean`                                                        | 是否为自定义过滤，配合 TableColumn 的 `filter` 插槽使用 | `false`     | `2.1.18` |
| meta     | `any`                                                            | 自定义元数据                                            | `undefined` | `2.1.18` |
