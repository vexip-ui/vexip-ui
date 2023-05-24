# 表格 Table

用于展示结构化二维数据。

## 代码示例

:::demo table/basis

### 基础用法

简单的数据表。

:::

:::demo table/column

### 模版列

使用 TableColumn 组件可以以模版的形式配置表格列。

模版列的优势在于，可以灵活地使用插槽以应对各种复杂的渲染情况，是推荐的使用方式。

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

:::demo table/fixed

### 固定行列

设置 `width` 和 `height` 属性可以为表格限制宽度和高度。

为 Column 设置 `width` 属性可以指定该列宽，设置 `fixed` 属性可以指定固定的列。

:::

:::demo table/sorter

### 表格排序

在列选项添加 `sorter` 属性并设置，可以启用排序功能。

如果你希望只派发排序事件而不执行内部的过滤逻辑（例如在远程排序时），可以为表格组件添加 `custom-sorter` 属性。

:::

:::demo table/filter

### 数据过滤

在列选项添加 `filter` 属性并设置，可以启用过滤功能。

如果你希望只派发过滤事件而不执行内部的逻辑（例如在远程过滤时），可以为表格组件添加 `custom-filter` 属性。

通过 TableColumn 组件的 `filter` 插槽你还可以自定义过滤器的渲染。

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

:::

:::demo table/draggable

### 行拖拽

添加 `row-draggable` 属性可以开启行拖拽功能。

不过这种方式会使得整个行只能进行拖拽交互，可以改为添加一个 `type` 属性为 `'drag'` 的列，创建一个单独的拖拽把手。

:::

:::demo table/virtual

### 虚拟滚动

数据太多的时候，你应该会需要它。

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

## API

### 预设类型

```ts
type Key = string | number | symbol
type Data = any
type TableRowPropFn<P = any> = (data: Data, index: number) => P
type TableRowDropType = 'before' | 'after' | 'none'
type TableTextAlign = 'left' | 'center' | 'right'

interface TableKeyConfig {
  id?: string,
  checked?: string,
  height?: string,
  expanded?: string
}

type Accessor<D = Data, Val extends string | number = string | number> = (
  data: D,
  index: number
) => Val
type ExpandRenderFn = (data: {
  leftFixed: number,
  rightFixed: number,
  row: Data,
  rowIndex: number
}) => any

type TableColumnType = 'order' | 'selection' | 'expand' | 'drag'

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

interface TableBaseColumn<D = Data, Val extends string | number = string | number> {
  name: string,
  key?: keyof D,
  metaData?: Data,
  fixed?: boolean | 'left' | 'right',
  className?: ClassType,
  style?: StyleType,
  attrs?: Record<string, any>,
  width?: number,
  filter?: TableFilterOptions<D, Val>,
  sorter?: boolean | TableSorterOptions<D>,
  order?: number,
  noEllipsis?: boolean,
  accessor?: Accessor<D, Val>,
  renderer?: ColumnRenderFn<D>,
  headRenderer?: HeadRenderFn,
  filterRenderer?: FilterRenderFn
}

interface TableOrderColumn<D = Data, Val extends string | number = string | number>
  extends TableBaseColumn<D, Val> {
  type: 'order',
  truthIndex?: boolean,
  orderLabel?: (index: number) => string | number
}

interface TableSelectionColumn<D = Data, Val extends string | number = string | number>
  extends TableBaseColumn<D, Val> {
  type: 'selection',
  checkboxSize?: ComponentSize,
  disableRow?: (data: Data) => boolean
}

interface TableExpandColumn<D = Data, Val extends string | number = string | number>
  extends TableBaseColumn<D, Val> {
  type: 'expand',
  disableRow?: (data: Data) => boolean
}

interface TableDragColumn<D = Data, Val extends string | number = string | number>
  extends TableBaseColumn<D, Val> {
  type: 'drag',
  disableRow?: (data: Data) => boolean
}

type TableTypeColumn<D = Data, Val extends string | number = string | number> =
  | TableOrderColumn<D, Val>
  | TableSelectionColumn<D, Val>
  | TableExpandColumn<D, Val>
type TableColumnOptions<D = Data, Val extends string | number = string | number> =
  | TableBaseColumn<D, Val>
  | TableTypeColumn<D, Val>
type ColumnWithKey<
  D = Data,
  Val extends string | number = string | number
> = TableColumnOptions<D, Val> & { key: Key }

type ColumnRenderFn = (data: {
  row: any,
  rowIndex: number,
  column: TableColumnOptions,
  columnIndex: number
}) => any
type HeadRenderFn = (data: { column: TableColumnOptions, index: number }) => any
type FilterRenderFn = (data: {
  column: TableColumnOptions,
  index: number,
  filter: Required<TableFilterOptions>,
  handleFilter: (active: any) => void
}) => any

type TableCellPropFn<P = any> = (
  data: Data,
  column: ColumnWithKey,
  rowIndex: number,
  columnIndex: number
) => P
type TableHeadPropFn<P = any> = (column: ColumnWithKey, index: number) => P

type ColumnProfile<D = Data, Val extends string | number = string | number> = Pick<
  ColumnWithKey<D, Val>,
  'name' | 'key' | 'metaData'
>
type TableFilterProfile<D = Data, Val extends string | number = string | number> = ColumnProfile<
  D,
  Val
> & {
  active: Val | Val[]
}
type TableSorterProfile<D = Data, Val extends string | number = string | number> = ColumnProfile<
  D,
  Val
> & {
  type: 'asc' | 'desc',
  order: number
}

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
```

### Table 属性

| 名称            | 类型                                                          | 说明                                                         | 默认值         | 始于    |
| --------------- | ------------------------------------------------------------- | ------------------------------------------------------------ | -------------- | ------- |
| columns         | `TableColumnOptions<any, any>[]`                              | 表格列的配置，参考下方的 TableColumn 属性                    | `[]`           | -       |
| data            | `Data[]`                                                      | 表格的数据源                                                 | `[]`           | -       |
| data-key        | `string`                                                      | 数据源的索引字段，该字段的值需要在数据源中唯一               | `'id'`         | -       |
| width           | `number`                                                      | 表格的宽度，在有固定列时使用                                 | `null`         | -       |
| height          | `number`                                                      | 表格的高度，超出这个高度时会变成可滚动状态                   | `null`         | -       |
| row-class       | `ClassType \| TableRowPropFn<ClassType>`                      | 行的自定义类名                                               | `null`         | -       |
| row-style       | `StyleType \| TableRowPropFn<StyleType>`                      | 行的自定义样式                                               | `null`         | `2.0.1` |
| row-attrs       | `Record<string, any> \| TableRowPropFn<Record<string, any>>`  | 行的自定义属性                                               | `null`         | `2.0.1` |
| cell-class      | `ClassType \| TableCellPropFn<ClassType>`                     | 单元格的自定义类名                                           | `null`         | `2.0.1` |
| cell-style      | `StyleType \| TableCellPropFn<StyleType>`                     | 单元格的自定义样式                                           | `null`         | `2.0.1` |
| cell-attrs      | `Record<string, any> \| TableCellPropFn<Record<string, any>>` | 单元格的自定义属性                                           | `null`         | `2.0.1` |
| head-class      | `ClassType \| TableHeadPropFn<ClassType>`                     | 表头单元格的自定义类名                                       | `null`         | `2.0.1` |
| head-style      | `StyleType \| TableHeadPropFn<StyleType>`                     | 表头单元格的自定义样式                                       | `null`         | `2.0.1` |
| head-attrs      | `Record<string, any> \| TableHeadPropFn<Record<string, any>>` | 表头单元格的自定义属性                                       | `null`         | `2.0.1` |
| stripe          | `boolean`                                                     | 设置表格是否应用斑马纹                                       | `false`        | -       |
| border          | `boolean`                                                     | 设置表格是否具有外边框和纵向边框                             | `false`        | -       |
| highlight       | `boolean`                                                     | 设置表格行是否在鼠标移入时高亮                               | `false`        | -       |
| use-y-bar       | `boolean`                                                     | 设置表格是否使用纵向滚动条                                   | `false`        | -       |
| bar-fade        | `number`                                                      | 设置滚动条的渐隐时间，若小于 `300` 则关闭渐隐效果            | `1500`         | -       |
| scroll-delta-y  | `number`                                                      | 设置表格纵向每次滚动的距离                                   | `20`           | -       |
| row-draggable   | `boolean`                                                     | 设置表格行是否可以拖拽排序                                   | `false`        | -       |
| row-height      | `number`                                                      | 设置表格的行高，未设置时表格行高将会动态计算                 | `null`         | -       |
| render-count    | `number`                                                      | 设置表格的最大渲染行数，通常用于大量数据渲染，需设置固定行高 | `null`         | -       |
| scroll-class    | `ScrollClass`                                                 | 设置表格各滚动组件的自定义类型                               | `{}`           | -       |
| expand-renderer | `ExpandRenderFn`                                              | 设置行拓展内容的渲染方法                                     | `null`         | -       |
| current-page    | `number`                                                      | 设置表格当前显示的数据页                                     | `1`            | -       |
| page-size       | `number`                                                      | 设置表格每页的数据量，当为 `0` 时则禁用分页                  | `0`            | -       |
| transparent     | `boolean`                                                     | 设置是否为透明表格，该属性优先级低于其他内置样式属性         | `false`        | -       |
| empty-text      | `string`                                                      | 设置表格空数据时的提示语                                     | `locale.empty` | -       |
| single-sorter   | `boolean`                                                     | 设置后将限制表格只能有一列开启排序                           | `false`        | -       |
| single-filter   | `boolean`                                                     | 设置后将限制表格只能有一列开启过滤                           | `false`        | -       |
| locale          | `LocaleConfig['table']`                                       | 设置多语言配置                                               | `null`         | `2.1.0` |
| custom-sorter   | `boolean`                                                     | 设置是否为自定义排序，开启后仅派发事件而不会进行内部排序     | `false`        | `2.1.4` |
| custom-filter   | `boolean`                                                     | 设置是否为自定义过滤，开启后仅派发事件而不会进行内部过滤     | `false`        | `2.1.4` |
| key-config      | `TableKeyConfig`                                              | 设置数据解析 `data` 时的各项键名                             | `{}`           | `2.1.6` |
| disabled-tree   | `boolean`                                                     | 设置是否禁用自动解析树形数据                                 | `false`        | `2.1.6` |
| row-indent      | `string \| number`                                            | 设置树形表格每一级的缩进距离                                 | `'16px'`       | `2.1.6` |
| no-cascaded     | `boolean`                                                     | 在树形表格中使父子节点能被独立勾选                           | `false`        | `2.1.6` |

### Table 事件

| 名称             | 说明                                                                         | 参数                                                                                    | 始于    |
| ---------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------- |
| body-scroll      | 当表格纵向滚动时触发，返回一个包含滚动偏移量和滚动百分比的对象               | `(scroll: { client: number, percent: number })`                                         | -       |
| row-enter        | 当鼠标移入了行时触发，返回行数据、行索引和行的位置索引                       | `(payload: TableRowPayload)`                                                            | -       |
| row-leave        | 当鼠标移出了行时触发，返回行数据、行索引和行的位置索引                       | `(payload: TableRowPayload)`                                                            | -       |
| row-click        | 当点击了行时触发，返回行数据、行索引和行的位置索引                           | `(payload: TableRowPayload)`                                                            | -       |
| row-dblclick     | 当双击了行时触发，返回行数据、行索引和行的位置索引                           | `(payload: TableRowPayload)`                                                            | `2.0.1` |
| row-contextmenu  | 当右击了行时触发，返回行数据、行索引和行的位置索引                           | `(payload: TableRowPayload)`                                                            | `2.0.1` |
| row-check        | 当勾选了行复选框时触发，返回行数据、勾选状态、行索引和行的位置索引           | `(payload: TableRowPayload)`                                                            | -       |
| row-check-all    | 当进行了全选时触发，返回当前是否为全选状态以及是否处于部分全选状态           | `(checked: boolean, partial: boolean)`                                                  | -       |
| row-expand       | 当行拓展内容的展开状态改变时触发，返回行数据、展开状态、行索引和行的位置索引 | `(payload: TableRowPayload)`                                                            | -       |
| row-drag-start   | 当行将要开始拖拽时触发，返回当前行的数据                                     | `(data: Record<string, unknown>, event: DragEvent)`                                     | -       |
| row-drag-over    | 当行正在拖拽时触发，返回前行的数据                                           | `(data: Record<string, unknown>, event: DragEvent)`                                     | -       |
| row-drop         | 当行被其他的拖拽行放入时触发，返回当前行的数据和放入类型（前放和后放）       | `(data: Record<string, unknown>, dropType?: 'before' \| 'after', event: DragEvent)`     | -       |
| row-drag-end     | 当行结束拖拽时触发，返回前行的数据和所有行的数据                             | `(data: Record<string, unknown>, allData: Record<string, unknown>[], event: DragEvent)` | -       |
| row-filter       | 当发生表格数据过滤时触发，返回参与了过滤的列信息与过滤后的数据               | `(profiles: TableFilterProfile[], filteredRow: Data[])`                                 | -       |
| row-sort         | 当发生表格数据排序时触发，返回参与了排序的列信息与排序后的数据               | `(profiles: SortProfile[], sortedRow: Data[])`                                          | -       |
| cell-enter       | 当鼠标移入了单元格时触发，返回行数据、行索引、行的位置索引、列数据和列索引   | `(payload: TableCellPayload)`                                                           | `2.0.1` |
| cell-leave       | 当鼠标移出了单元格时触发，返回行数据、行索引、行的位置索引、列数据和列索引   | `(payload: TableCellPayload)`                                                           | `2.0.1` |
| cell-click       | 当点击了单元格时触发，返回行数据、行索引、行的位置索引、列数据和列索引       | `(payload: TableCellPayload)`                                                           | `2.0.1` |
| cell-dblclick    | 当双击了单元格时触发，返回行数据、行索引、行的位置索引、列数据和列索引       | `(payload: TableCellPayload)`                                                           | `2.0.1` |
| cell-contextmenu | 当右击了单元格时触发，返回行数据、行索引、行的位置索引、列数据和列索引       | `(payload: TableCellPayload)`                                                           | `2.0.1` |
| head-enter       | 当鼠标移入了头部单元格时触发，返回列数据和列索引                             | `(payload: TableHeadPayload)`                                                           | `2.0.1` |
| head-leave       | 当鼠标移出了头部单元格时触发，返回列数据和列索引                             | `(payload: TableHeadPayload)`                                                           | `2.0.1` |
| head-click       | 当点击了头部单元格时触发，返回列数据和列索引                                 | `(payload: TableHeadPayload)`                                                           | `2.0.1` |
| head-dblclick    | 当双击了头部单元格时触发，返回列数据和列索引                                 | `(payload: TableHeadPayload)`                                                           | `2.0.1` |
| head-contextmenu | 当右击了头部单元格时触发，返回列数据和列索引                                 | `(payload: TableHeadPayload)`                                                           | `2.0.1` |

### Table 插槽

| 名称    | 说明                                        | 参数                 | 始于 |
| ------- | ------------------------------------------- | -------------------- | ---- |
| default | 表格列的插槽，应使用 TabelColumn 组件定义列 | -                    | -    |
| empty   | 空数据提示内容的插槽                        | `(isFixed: boolean)` | -    |

### Table 方法

| 名称          | 说明                                       | 签名                              | 始于 |
| ------------- | ------------------------------------------ | --------------------------------- | ---- |
| clearSort     | 清除表格当前激活的所有排序                 | `() => void`                      | -    |
| clearFilter   | 清除当前表格激活的所有过滤                 | `() => void`                      | -    |
| refresh       | 刷新表格，将会触发表格的重新布局及数据渲染 | `() => void`                      | -    |
| getSelected   | 获取所有被勾选的行数据                     | `() => Record<string, unknown>[]` | -    |
| clearSelected | 清除所有被勾选的行数据                     | `() => void`                      | -    |

### TableColumn 属性

| 名称            | 类型                                   | 说明                                                                         | 默认值      | 始于     |
| --------------- | -------------------------------------- | ---------------------------------------------------------------------------- | ----------- | -------- |
| name            | `string`                               | 列的名称                                                                     | `''`        | -        |
| key \| id-key   | `string \| number`                     | 列的唯一索引，使用模版列时请使用 `id-key` 代替                               | `''`        | -        |
| accessor        | `(data: any, rowIndex: number) => any` | 该列的数据读取方法，接收行数据和行位置索引，若不定义这按索引值从行数据上读取 | `null`      | -        |
| fixed           | `boolean \| 'left' \| 'right'`         | 是否为固定列，可选值为 `left`、`right`，设置为 `true` 时固定在左侧           | `false`     | -        |
| class-name      | `ClassType`                            | 该列单元格的自定义类名                                                       | `null`      | -        |
| style           | `StyleType`                            | 列的自定义样式                                                               | `null`      | `2.0.1`  |
| attrs           | `Record<string, any>`                  | 列的自定义属性                                                               | `null`      | `2.0.1`  |
| type            | `TableColumnType`                      | 设置内置特定类型列                                                           | `null`      | -        |
| width           | `number`                               | 设置列宽                                                                     | `null`      | -        |
| filter          | `TableFilterOptions<any, any>`         | 列的过滤配置器                                                               | `null`      | -        |
| sorter          | `boolean \| TableSorterOptions<any>`   | 列的排序排序器                                                               | `null`      | -        |
| order           | `number`                               | 列的渲染顺序                                                                 | `0`         | -        |
| renderer        | `ColumnRenderFn`                       | 自定义渲染函数                                                               | `null`      | -        |
| head-renderer   | `HeadRenderFn`                         | 自定义头部渲染函数                                                           | `null`      | -        |
| filter-renderer | `FilterRenderFn`                       | 自定义过滤器渲染函数                                                         | `null`      | `2.1.18` |
| no-ellipsis     | `boolean`                              | 是否禁用单元格的省略组件                                                     | `false`     | -        |
| checkbox-size   | `'small' \| 'default' \| 'large'`      | 当 `type` 为 `'selection'` 时设置复选框大小                                  | `'default'` | -        |
| disable-row     | `(data: Data) => boolean`              | 设置禁用行的回调函数                                                         | `null`      | -        |
| truth-index     | `boolean`                              | 当 `type` 为 `'order'` 时设置是否使用行真实（全局）索引                      | `false`     | -        |
| order-label     | `(index: number) => string \| number`  | 当 `type` 为 `'order'` 时设置索引显示内容的回调函数                          | `null`      | -        |
| meta-data       | `Data`                                 | 设置列的元数据                                                               | `{}`        | -        |
| text-align      | `TableTextAlign`                       | 设置列的横向对其方式                                                         | `'left'`    | `2.1.19` |

### TableColumn 插槽

| 名称    | 说明           | 参数                                                                                                                             | 始于     |
| ------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------- |
| default | 列内容的插槽   | `{ row: Record<string, unknown>, rowIndex: number, column: TableColumnOptions, columnIndex: number }`                            | -        |
| head    | 列头内容的插槽 | `{ column: TableColumnOptions, columnIndex: number }`                                                                            | -        |
| filter  | 列过滤器的插槽 | `{ column: TableColumnOptions, columnIndex: number, filter: Required<TableFilterOptions>, handleFilter: (active: any) => void }` | `2.1.18` |

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
