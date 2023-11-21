# Table

Used to display structured 2D data.

## Demos

:::demo table/basis

### Basis Usage

Simple data table.

:::

:::demo table/column

### Template Column

Use the TableColumn component to configure table columns.

The advantage of template columns is that slots can be used flexibly to deal with various complex rendering situations without writing render functions, which is the more recommended way of use.

:::

:::demo table/style

### Preset Styles

Adding `stripe` prop to add stripe to the table.

Adding `border` prop to add a border to the table.

Adding `highlight` prop to set table row highlighting when moving in.

If you want a clean table via adding the `transparent` prop.

:::

:::demo table/attrs

### Custom Column Class

Column attributes can be customized via the `class-name`, `style` and `attrs` fields of the column options.

Row attributes can be customized via the `row-class`, `row-style` and `row-attrs` props.

Head cell attributes can be customized via the `head-class`, `head-style` and `head-attrs` props.

Cell attributes can be customized via the `cell-class`, `cell-style` and `cell-attrs` props.

:::

:::demo table/empty

### Empty Table

The appearance without data, can be customized with the `empty` slot.

:::

:::demo table/mouse-events

### Mouse Events

Table provide various mouse events to quickly implement custom interactions.

::

:::demo table/selection

### Checkbox Column

Add a `type` prop to a column option and set its value to `'selection'` to make the column act as a checkbox.

After getting the component instance, you can call the `getSelected` method to get back the selected row data, or use `clearSelected` to clear the check.

:::

:::demo table/order

### Order Column

Add a `type` prop to the column options and set its value to `'order'` to make the column as an order column.

:::

:::demo table/expand

### Expand Content

Adding a `type` prop to the column options and setting its value to `'expand'` can make the column as an expansion column, the default slot content of the column will be rendered as the expansion template content.

:::

:::demo table/sorter

### Sort Data

Adding the `sorter` prop to the column options and setting it enables sorting.

If you want to only the sort events will be emitted (e.g. remote sort), you can add `custom-sorter` prop to Table component.

:::

:::demo table/filter

### Filter Data

Adding the `filter` prop to the column options and setting it enables filtering.

If you want to only the filter events will be emitted (e.g. remote filter), you can add `custom-filter` prop to Table component.

Also you can custom the renderer of filter via `filter` slot of TableColumn component.

:::

:::demo table/fixed

### Fixed Width And Height

Set the `width` and `height` props to constrain the width and height of the table.

Set the `width` prop for a Column to specify the width of the column, and set the `fixed` prop to specify a fixed column.

:::

:::demo table/pagination

### Page Table

Combined with the Pagination component, table pagination can be implemented, which is generally used when there is a lot of data and it is not convenient to display on one page.

Link the data between Pagination and Table components can be easily done via the `current-page` and `page-size` prop.

:::

:::demo table/draggable

### Row Draggable

Adding the `row-draggable` prop enables row dragging.

However, this way will disable other interactions of rows. You can instead add a column which `type` prop is `'drag'` to create a separate drag handler.

:::

:::demo table/virtual

### Virtual Scroll

Add the `virtual` prop to enable virtualization. You may need it when there is too much data.

:::

:::demo table/tree

### Tree Data

When the row data contains a valid `children` option, tree data parsing will be automatically enabled.

Can disable automatic parsing via adding `disabled-tree` prop, or specify a another target option via `key-config`.

You can also configure the indent distance for each level by setting `row-indent` prop.

If you want to manually specify the indented column of the tree table, you can add the `indented` prop to a Column.

:::

:::demo table/toggle-data

### Toggle Data

Some properties inside table will be recalculated automatically when the data changed.

:::

:::demo table/refresh

### Refresh Table

When Table component is placed inside some initially hidden element, and will display lazily, the width may not be calculated correctly.

At this time, you need to call the `refresh` method of the Table instance to recalculate the layout after the element is displayed.

:::

:::demo table/resize-column

### Resize Column Width

==!s|2.1.24==

Adding the `col-resizable` prop enables resize column width.

:::

:::demo table/cell-span

### Merge Cells

==!s|2.1.24==

Provide a callback function via the `cell-span` prop of column options to set the span of each cell.

If you want to merge the header, you need to set the `head-span` of column options.

:::

:::demo table/column-group

### Head Grouping

==!s|2.2.12==

This example uses the TableColumnGroup component to group table columns.

If the `columns` prop is used, it will be parsed into grouping options when the `children` prop is specified.

Note that after using grouping, only the `fixed` prop of the top-level option will take effect, and other which like the age column in the example will be invalid.

:::

:::demo table/summary

### Table Summary

==!s|2.1.24==

Similar to columns, you can define summaries via the `summaries` prop or the TableSummary component.

You can also define the summary content of a column independently via the `summary` slot of the TableColumn component.

:::

## API

### Preset Types

There are many type declarations of Table component. If you want to fully understand the relationship between them, it is recommended to get started from [source code](https://github.com/vexip-ui/vexip-ui/blob/main/components/table/symbol.ts).

```ts
type Key = string | number | symbol
type Data = any
type TableIconName = 'filter' | 'asc' | 'desc' | 'dragger' | 'expand' | 'plus' | 'minus'
type TableRowPropFn<P = any> = (data: Data, index: number) => P
type TableRowDropType = 'before' | 'after' | 'none'
type TableTextAlign = 'left' | 'center' | 'right'
type TableColumnType = 'order' | 'selection' | 'expand' | 'drag'

type TableIcons = Partial<Record<TableIconName, Record<string, any> | (() => any)>>

interface CellSpanResult {
  colSpan?: number,
  rowSpan?: number
}

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
type ExpandRenderFn<D = Data> = (data: {
  leftFixed: number,
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
> = TableColumnOptions<D, Val> & { key: Key }

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

### Table Props

| Name            | Type                                                          | Description                                                                                                                                           | Default        | Since    |
| --------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | -------- |
| columns         | `TableColumnRawOptions[]`                                     | Table columns configuration, refer to TableColumn props below                                                                                         | `[]`           | -        |
| summaries       | `TableSummaryOptions<any, any>[]`                             | Table summaries configuration, refer to TableSummary props below                                                                                      | `[]`           | `2.1.24` |
| data            | `Data[]`                                                      | Table data source                                                                                                                                     | `[]`           | -        |
| data-key        | `string`                                                      | The index field of the data source, the value of this field needs to be unique in the data source                                                     | `'id'`         | -        |
| width           | `number`                                                      | The width of the table, used when there are fixed columns                                                                                             | `null`         | -        |
| height          | `number`                                                      | The height of the table, beyond which it will become scrollable                                                                                       | `null`         | -        |
| row-class       | `ClassType \| TableRowPropFn<ClassType>`                      | Custom class name for row                                                                                                                             | `null`         | -        |
| row-style       | `StyleType \| TableRowPropFn<StyleType>`                      | Custom style for row                                                                                                                                  | `null`         | `2.0.1`  |
| row-attrs       | `Record<string, any> \| TableRowPropFn<Record<string, any>>`  | Custom attributes of row                                                                                                                              | `null`         | `2.0.1`  |
| cell-class      | `ClassType \| TableCellPropFn<ClassType>`                     | Custom class name of cell                                                                                                                             | `null`         | `2.0.1`  |
| cell-style      | `StyleType \| TableCellPropFn<StyleType>`                     | Custom style for cell                                                                                                                                 | `null`         | `2.0.1`  |
| cell-attrs      | `Record<string, any> \| TableCellPropFn<Record<string, any>>` | Custom attributes of cell                                                                                                                             | `null`         | `2.0.1`  |
| head-class      | `ClassType \| TableHeadPropFn<ClassType>`                     | Custom class name of the head cell                                                                                                                    | `null`         | `2.0.1`  |
| head-style      | `StyleType \| TableHeadPropFn<StyleType>`                     | Custom style for head cell                                                                                                                            | `null`         | `2.0.1`  |
| head-attrs      | `Record<string, any> \| TableHeadPropFn<Record<string, any>>` | Custom attributes for head cell                                                                                                                       | `null`         | `2.0.1`  |
| foot-class      | `ClassType \| TableFootPropFn<ClassType>`                     | Custom class name of the foot cell                                                                                                                    | `null`         | `2.1.24` |
| foot-style      | `StyleType \| TableFootPropFn<StyleType>`                     | Custom style for foot cell                                                                                                                            | `null`         | `2.1.24` |
| foot-attrs      | `Record<string, any> \| TableFootPropFn<Record<string, any>>` | Custom attributes for foot cell                                                                                                                       | `null`         | `2.1.24` |
| stripe          | `boolean`                                                     | Set whether to apply zebra stripes to the table                                                                                                       | `false`        | -        |
| border          | `boolean`                                                     | Set whether the table has an outer border and a vertical border                                                                                       | `false`        | -        |
| highlight       | `boolean`                                                     | Set whether the table row is highlighted when the mouse moves in                                                                                      | `false`        | -        |
| use-x-bar       | `boolean`                                                     | Set whether the table uses horizontal scroll bar                                                                                                      | `false`        | `2.1.25` |
| use-y-bar       | `boolean`                                                     | Set whether the table uses vertical scroll bar                                                                                                        | `false`        | -        |
| bar-fade        | `number`                                                      | Set the fade time of the scroll bar, if it is less than `300`, turn off the fade effect                                                               | `1500`         | -        |
| scroll-delta-y  | `number`                                                      | Set the vertical scroll distance of the table                                                                                                         | `20`           | -        |
| row-draggable   | `boolean`                                                     | Set whether the table row can be dragged and sorted                                                                                                   | `false`        | -        |
| row-height      | `number`                                                      | Set the row height of the table, if not set, the table row height will be dynamically calculated                                                      | `null`         | -        |
| render-count    | `number`                                                      | Set the maximum number of rows to be rendered in the table, usually used for rendering a large amount of data, and a fixed row height needs to be set | `null`         | -        |
| scroll-class    | `ScrollClass`                                                 | Set the custom type of each scroll component of the table                                                                                             | `{}`           | -        |
| expand-renderer | `ExpandRenderFn`                                              | Set the rendering method of row expansion content                                                                                                     | `null`         | -        |
| current-page    | `number`                                                      | Set the data page currently displayed in the table                                                                                                    | `1`            | -        |
| page-size       | `number`                                                      | Set the amount of data per page of the table, when it is `0`, paging is disabled                                                                      | `0`            | -        |
| transparent     | `boolean`                                                     | Set whether the table is transparent, this property has lower priority than other built-in style properties                                           | `false`        | -        |
| empty-text      | `string`                                                      | Set the prompt when the table is empty                                                                                                                | `locale.empty` | -        |
| single-sorter   | `boolean`                                                     | After setting, it will limit the table to only one column to enable sorting                                                                           | `false`        | -        |
| single-filter   | `boolean`                                                     | After setting, it will limit the table to only one column to enable filtering                                                                         | `false`        | -        |
| virtual         | `boolean`                                                     | Whether enable virtual scroll                                                                                                                         | `false`        | -        |
| locale          | `LocaleConfig['table']`                                       | Set the locale config                                                                                                                                 | `null`         | `2.1.0`  |
| custom-sorter   | `boolean`                                                     | Set whether use custom sorter, will dispatch event without internal sorting if enabled                                                                | `false`        | `2.1.4`  |
| custom-filter   | `boolean`                                                     | Set whether use custom filter, will dispatch event without internal filtering if enabled                                                              | `false`        | `2.1.4`  |
| key-config      | `TableKeyConfig`                                              | Set the key names when parsing `data`                                                                                                                 | `{}`           | `2.1.6`  |
| disabled-tree   | `boolean`                                                     | Set whether to disable automatic parsing tree data                                                                                                    | `false`        | `2.1.6`  |
| row-indent      | `string \| number`                                            | Set the indent distance of each level of the tree table row                                                                                           | `'16px'`       | `2.1.6`  |
| no-cascaded     | `boolean`                                                     | Enable parent and child rows to be checked independently in the tree table                                                                            | `false`        | `2.1.6`  |
| col-resizable   | `boolean`                                                     | Set whether the width of columns can be resized                                                                                                       | `false`        | `2.1.23` |
| cell-span       | `TableCellSpanFn`                                             | Set the callback function to set cell span                                                                                                            | `null`         | `2.1.24` |
| side-padding    | `number \| number[]`                                          | Set the horizontal side padding of table                                                                                                              | `0`            | `2.1.28` |
| icons           | `TableIcons`                                                  | Use to set various icons for table                                                                                                                    | `{}`           | `2.1.28` |
| border-width    | `number`                                                      | Set the border width of the table                                                                                                                     | `1`            | `2.2.12` |

### Table Events

| Name             | Description                                                                                                                          | Parameters                                                                              | Since    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | -------- |
| scroll           | Emitted when the table is scrolled, returns an object containing the scroll offset and scroll percentage                             | `(scroll: { type: 'horizontal' \| 'vertical', client: number, percent: number })`       | `2.1.25` |
| row-enter        | Emitted when the mouse moves into a row, returns row data, row index and row position index                                          | `((payload: TableRowPayload)`                                                           | -        |
| row-leave        | Emitted when the mouse moves out of the row, returns row data, row index and row position index                                      | `(payload: TableRowPayload)`                                                            | -        |
| row-click        | Emitted when a row is clicked, returns row data, row index and row position index                                                    | `(payload: TableRowPayload)`                                                            | -        |
| row-dblclick     | Emitted when a row is double-clicked, returns row data, row index and row position index                                             | `(payload: TableRowPayload)`                                                            | `2.0.1`  |
| row-contextmenu  | Emitted when a row is right-clicked, returns row data, row index and row position index                                              | `(payload: TableRowPayload)`                                                            | `2.0.1`  |
| row-check        | Emitted when a row checkbox is checked, returns row data, check state, row index and row position index                              | `(payload: TableRowPayload)`                                                            | -        |
| row-check-all    | Emitted when all is selected, returns whether the current state is all selected and whether it is partially selected                 | `(checked: boolean, partial: boolean)`                                                  | -        |
| row-expand       | Emitted when the expanded state of row expansion content changes, returns row data, expanded state, row index and row position index | `(payload: TableRowPayload)`                                                            | -        |
| row-drag-start   | Emitted when a row starts to drag, returns the data of the current row                                                               | `(data: Record<string, unknown>, event: DragEvent)`                                     | -        |
| row-drag-over    | Emitted when a row is being dragged, returns the data of the previous row                                                            | `(data: Record<string, unknown>, event: DragEvent)`                                     | -        |
| row-drop         | Emitted when a row is dropped by another dragged row, returns the data and drop type of the current row (before and after)           | `(data: Record<string, unknown>, dropType?: 'before ' \| 'after', event: DragEvent)`    | -        |
| row-drag-end     | Emitted when a row ends dragging, returns the data of the previous row and the data of all rows                                      | `(data: Record<string, unknown>, allData: Record<string, unknown>[], event: DragEvent)` | -        |
| row-filter       | Emitted when table data filtering occurs, returns the column information that participated in the filtering and the filtered data    | `(profiles: TableFilterProfile[], filteredRow: Data[])`                                 | -        |
| row-sort         | Emitted when the table data is sorted, returns the column information and sorted data that participated in the sorting               | `(profiles: SortProfile[], sortedRow: Data[])`                                          | -        |
| cell-enter       | Emitted when the mouse moves into a cell, returns row data, row index, row position index, column data and column index              | `(payload: TableCellPayload)`                                                           | `2.0.1`  |
| cell-leave       | Emitted when the mouse moves out of the cell, returns row data, row index, row position index, column data and column index          | `(payload: TableCellPayload)`                                                           | `2.0.1`  |
| cell-click       | Emitted when a cell is clicked, returns row data, row index, row position index, column data and column index                        | `(payload: TableCellPayload)`                                                           | `2.0.1`  |
| cell-dblclick    | Emitted when a cell is double-clicked, returns row data, row index, row position index, column data and column index                 | `(payload: TableCellPayload)`                                                           | `2.0.1`  |
| cell-contextmenu | Emitted when a cell is right-clicked, returns row data, row index, row position index, column data and column index                  | `(payload: TableCellPayload)`                                                           | `2.0.1`  |
| col-resize-start | Emitted when a column starts to resize, returns column data and column index                                                         | `(payload: TableColResizePayload)`                                                      | `2.1.23` |
| col-resize-move  | Emitted when a column is being resized, returns column data and column index                                                         | `(payload: TableColResizePayload)`                                                      | `2.1.23` |
| col-resize-end   | Emitted when a column ends to resize, returns column data and column index                                                           | `(payload: TableColResizePayload)`                                                      | `2.1.23` |
| head-enter       | Emitted when the mouse moves into the head cell, returns column data and column index                                                | `(payload: TableHeadPayload)`                                                           | `2.0.1`  |
| head-leave       | Emitted when the mouse moves out of the head cell, returns column data and column index                                              | `(payload: TableHeadPayload)`                                                           | `2.0.1`  |
| head-click       | Emitted when a head cell is clicked, returns column data and column index                                                            | `(payload: TableHeadPayload)`                                                           | `2.0.1`  |
| head-dblclick    | Emitted when a head cell is double-clicked, returns column data and column index                                                     | `(payload: TableHeadPayload)`                                                           | `2.0.1`  |
| head-contextmenu | Emitted when a head cell is right-clicked, returns column data and column index                                                      | `(payload: TableHeadPayload)`                                                           | `2.0.1`  |
| foot-enter       | Emitted when the mouse moves into the foot cell, returns column data and column index                                                | `(payload: TableFootPayload)`                                                           | `2.1.24` |
| foot-leave       | Emitted when the mouse moves out of the foot cell, returns column data and column index                                              | `(payload: TableFootPayload)`                                                           | `2.1.24` |
| foot-click       | Emitted when a foot cell is clicked, returns column data and column index                                                            | `(payload: TableFootPayload)`                                                           | `2.1.24` |
| foot-dblclick    | Emitted when a foot cell is double-clicked, returns column data and column index                                                     | `(payload: TableFootPayload)`                                                           | `2.1.24` |
| foot-contextmenu | Emitted when a foot cell is right-clicked, returns column data and column index                                                      | `(payload: TableFootPayload)`                                                           | `2.1.24` |

### Table Slots

| Name        | Description                                                                     | Parameters             | Since    |
| ----------- | ------------------------------------------------------------------------------- | ---------------------- | -------- |
| default     | Used to define the TableColumn and TableSummary components                      | -                      | -        |
| empty       | Slot for empty data tip content                                                 | `{ isFixed: boolean }` | -        |
| icon-[name] | Table icon slot, where `[name]` optional values please refer to `TableIconName` | -                      | `2.1.28` |

### Table Methods

| Name          | Description                                                                         | Signature                         | Since   |
| ------------- | ----------------------------------------------------------------------------------- | --------------------------------- | ------- |
| clearSort     | Clear all sorts currently active in the table                                       | `() => void`                      | -       |
| clearFilter   | Clear all active filters in the current table                                       | `() => void`                      | -       |
| refresh       | Refresh the table, which will trigger the re-layout and data rendering of the table | `() => void`                      | -       |
| getSelected   | Get all selected row data                                                           | `() => Record<string, unknown>[]` | -       |
| clearSelected | Clear all selected row data                                                         | `() => void`                      | -       |
| getData       | Get the data of the table, usually used to get the data after dragging              | `() => Data[]`                    | `2.2.6` |

### TableColumn Props

| Name             | Type                                   | Description                                                                                                                                  | Default     | Since    |
| ---------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------- |
| name             | `string`                               | The name of the column                                                                                                                       | `''`        | -        |
| key \| id-key    | `string \| number`                     | Unique index of the column, use `id-key` instead when using template column                                                                  | `''`        | -        |
| accessor         | `(data: any, rowIndex: number) => any` | The data read method of this column, receiving row data and row position index, if not defined, it will be read from row data by index value | `null`      | -        |
| fixed            | `boolean \| 'left' \| 'right'`         | Whether it is a fixed column, the optional values ​​are `left`, `right`, when set to `true`, it is fixed to the left                         | `false`     | -        |
| class            | `ClassType`                            | Custom class name for the cell in this column                                                                                                | `null`      | `2.1.19` |
| style            | `StyleType`                            | Custom style for the cell in this column                                                                                                     | `null`      | `2.0.1`  |
| attrs            | `Record<string, any>`                  | Custom attributes for the cell in this column                                                                                                | `null`      | `2.0.1`  |
| type             | `TableColumnType`                      | Set built-in type of the column                                                                                                              | `null`      | -        |
| width            | `number`                               | Set column width                                                                                                                             | `null`      | -        |
| filter           | `TableFilterOptions<any, any>`         | Configure filter for the column                                                                                                              | `null`      | -        |
| sorter           | `boolean \| TableSorterOptions<any>`   | Configure the sorter for the column                                                                                                          | `null`      | -        |
| order            | `number`                               | The rendering order of the column                                                                                                            | `0`         | -        |
| renderer         | `ColumnRenderFn`                       | Custom render function, is `ExpandRenderFn` if `type` is `'expand'`                                                                          | `null`      | -        |
| head-renderer    | `HeadRenderFn`                         | Custom head render function                                                                                                                  | `null`      | -        |
| filter-renderer  | `FilterRenderFn`                       | Custom filter render function                                                                                                                | `null`      | `2.1.18` |
| ~~no-ellipsis~~  | `boolean`                              | Whether to disable the ellipsis component of the cell                                                                                        | `false`     | -        |
| ellipsis         | `boolean`                              | Whether to use Ellipsis component for cell content                                                                                           | `false`     | `2.2.12` |
| checkbox-size    | `'small' \| 'default' \| 'large'`      | Set the checkbox size when `type` is `'selection'`                                                                                           | `'default'` | -        |
| disable-row      | `(data: Data) => boolean`              | Set the callback function for disabled row                                                                                                   | `null`      | -        |
| truth-index      | `boolean`                              | Set whether to use row truth (global) index when `type` is `'order'`                                                                         | `false`     | -        |
| order-label      | `(index: number) => string \| number`  | When `type` is `'order'`, set the callback function to display the content of the order                                                      | `null`      | -        |
| meta             | `any`                                  | Set the column metadata                                                                                                                      | `null`      | `2.1.24` |
| text-align       | `TableTextAlign`                       | Set the horizontal alignment of the column                                                                                                   | `'left'`    | `2.1.19` |
| head-span        | `number`                               | Set the head span                                                                                                                            | `1`         | `2.1.24` |
| cell-span        | `ColumnCellSpanFn<any>`                | Set the callback function to set cell span                                                                                                   | `null`      | `2.1.24` |
| no-summary       | `boolean`                              | Whether to disable automatic calculation of summary data for the column                                                                      | `false`     | `2.1.24` |
| summary-renderer | `ColumnSummaryRenderFn`                | Custom summary render function                                                                                                               | `null`      | `2.1.24` |
| indented         | `boolean`                              | Specified as the indented column of the tree table                                                                                           | `false`     | `2.2.6`  |

### TableColumn Slots

| Name    | Description                  | Parameters                          | Since    |
| ------- | ---------------------------- | ----------------------------------- | -------- |
| default | Slot for column content      | `Parameters<ColumnRenderFn>`        | -        |
| head    | Slot for column head content | `Parameters<HeadRenderFn>`          | -        |
| filter  | Slot for column filter       | `Parameters<FilterRenderFn>`        | `2.1.18` |
| summary | Slot for column summary      | `Parameters<ColumnSummaryRenderFn>` | `2.1.24` |

### TableColumnGroup Props

==!s|2.2.12==

| Name       | Type                           | Description                                                                                                                                       | Default    | Since |
| ---------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ----- |
| name       | `string`                       | The name of the column group                                                                                                                      | `''`       | -     |
| fixed      | `boolean \| 'left' \| 'right'` | Whether it is a fixed column group, the optional values are `left`, `right`, when set to `true`, it will be fixed to the left                     | `false`    | -     |
| order      | `number`                       | The rendering order of column group, works together with the `order` prop of column. The sorting between each level and each group is independent | `0`        | -     |
| ellipsis   | `boolean`                      | Whether to use Ellipsis component for head cell content                                                                                           | `false`    | -     |
| text-align | `TableTextAlign`               | Set the horizontal alignment of head cell                                                                                                         | `'center'` | -     |
| renderer   | `() => any`                    | Custom header render function                                                                                                                     | `null`     | -     |

### TableColumnGroup Slots

==!s|2.2.12==

| Name    | Description                               | Parameters | Since |
| ------- | ----------------------------------------- | ---------- | ----- |
| default | Used to define the TableColumn components | -          | -     |
| head    | Slot for column head content              | -          | -     |

### TableSummary Props

==!s|2.1.24==

| Name          | Type                  | Description                                                                   | Default | Since |
| ------------- | --------------------- | ----------------------------------------------------------------------------- | ------- | ----- |
| name          | `string`              | The name of summary                                                           | `''`    | -     |
| key \| id-key | `string \| number`    | Unique index of the summary, use `id-key` instead when using template summary | `null`  | -     |
| class         | `ClassType`           | Custom class name for the cell in this summary                                | `null`  | -     |
| style         | `StyleType`           | Custom style for the cell in this summary                                     | `null`  | -     |
| attrs         | `Record<string, any>` | Custom attributes for the cell in this summary                                | `null`  | -     |
| cell-span     | `SummaryCellSpanFn`   | Set the callback function to set cell span                                    | `null`  | -     |
| order         | `number`              | The rendering order of the summary                                            | `0`     | -     |
| above         | `boolean`             | Set whether the summary is at the top of table                                | `false` | -     |
| meta          | `any`                 | Set the summary metadata                                                      | `null`  | -     |
| renderer      | `SummaryRenderFn`     | Custom render function                                                        | `null`  | -     |

### TableSummary Slots

==!s|2.1.24==

| Name    | Description              | Parameters                    | Since |
| ------- | ------------------------ | ----------------------------- | ----- |
| default | Slot for summary content | `Parameters<SummaryRenderFn>` | -     |

### TableSorter Props

| Name   | Type                               | Description                                                                         | Default | Since |
| ------ | ---------------------------------- | ----------------------------------------------------------------------------------- | ------- | ----- |
| able   | `boolean`                          | Set whether is able to sort                                                         | `false` | -     |
| type   | `'asc' \| 'desc'`                  | The sort type                                                                       | `null`  | -     |
| order  | `number`                           | Used to specify the order of each column when sorting multiple columns              | `0`     | -     |
| method | `(prev: any, next: any) => number` | The method for custom sorting, receiving data from front and back rows respectively | `null`  | -     |

### TableFilter Props

| Name     | Type                                                             | Description                                                                        | Default     | Since    |
| -------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------- | -------- |
| able     | `boolean`                                                        | Set whether is able to filter                                                      | `false`     | -        |
| options  | `(string \| { value: any, label?: string, active?: boolean })[]` | Filter options, an object of `{ label, value }`                                    | `[]`        | -        |
| multiple | `boolean`                                                        | Whether to enable multi-condition filtering                                        | `false`     | -        |
| active   | `any`                                                            | The currently filtered dependency value, which will be passed to the filter method | `null`      | -        |
| method   | `(active: any \| any[], data: any) => boolean`                   | Filter method, receiving filtered dependent values and row data                    | `null`      | -        |
| custom   | `boolean`                                                        | Whether it is a custom filter, used with the `filter` slot of TableColumn          | `false`     | `2.1.18` |
| meta     | `any`                                                            | Custom meta data                                                                   | `undefined` | `2.1.18` |
