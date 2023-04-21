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

The advantage of template columns is that slots can be used flexibly to deal with various complex rendering situations, which is the recommended way to use them.

:::

:::demo table/style

### Preset Styles

Adding `stripe` prop to add stripe to the table.

Adding `border` prop to add a border to the table.

Adding `highlight` prop to set table row highlighting when moving in.

If you want a clean table via adding the `transparent` prop.

:::

:::demo table/attrs

### Custon Column Class

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

:::

:::demo table/fixed

### Fixed Width And Height

Set the `width` and `height` props to constrain the width and height of the table.

Set the `width` prop for a Column to specify the width of the column, and set the `fixed` prop to specify a fixed column.

:::

:::demo table/sorter

### Sort Data

Adding the `sorter` prop to the column options and setting it enables sorting.

:::

:::demo table/filter

### Filter Data

Adding the `filter` prop to the column options and setting it enables filtering.

:::

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

:::demo table/pagination

### Page Table

Combined with the Pagination component, table pagination can be implemented, which is generally used when there is a lot of data and it is not convenient to display on one page.

Link the data between Pagination and Table components can be easily done via the `current-page` and `page-size` prop.

:::

:::demo table/tree

### Tree Data

When the row data contains a valid `children` option, tree data parsing will be automatically enabled.

Can disable automatic parsing via adding `disabled-tree` prop, or specify a another target option via `key-config`.

You can also configure the indent distance for each level by setting `row-indent` prop.

:::

:::demo table/draggable

### Row Draggable

Adding the `row-draggable` prop enables row dragging.

However, this way will disable other interactions of rows. You can instead add a column which `type` prop is `'drag'` to create a separate drag handler.

:::

:::demo table/virtual

### Virtual Scroll

You should need it when there is too much data.

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

## API

### Preset Types

```ts
type Key = string | number | symbol
type Data = Record<string, any>
type TableRowPropFn<P = any> = (data: Data, index: number) => P
type TableRowDropType = 'before' | 'after' | 'none'

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
type RenderFn = (data: Data) => any
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
    options: (string | { value: Val, label?: string, active?: boolean })[],
    multiple?: false,
    active?: null | Val,
    method?: null | ((active: Val, data: D) => boolean)
  }
  | {
    able?: boolean,
    options: (string | { value: Val, label?: string, active?: boolean })[],
    multiple: true,
    active?: null | Val[],
    method?: null | ((active: Val[], data: D) => boolean)
  }

interface TableSorterOptions<D = Data> {
  able?: boolean,
  type?: null | 'asc' | 'desc',
  order?: number, // 优先级
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
  renderer?: RenderFn,
  headRenderer?: RenderFn
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

### Table Props

| Name            | Type                                                          | Description                                                                                                                                           | Default        | Since   |
| --------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------- |
| columns         | `TableColumnOptions<any, any>[]`                              | Table column configuration, refer to TableColumn properties below                                                                                     | `[]`           | -       |
| data            | `Data[]`                                                      | Table data source                                                                                                                                     | `[]`           | -       |
| data-key        | `string`                                                      | The index field of the data source, the value of this field needs to be unique in the data source                                                     | `'id'`         | -       |
| width           | `number`                                                      | The width of the table, used when there are fixed columns                                                                                             | `null`         | -       |
| height          | `number`                                                      | The height of the table, beyond which it will become scrollable                                                                                       | `null`         | -       |
| row-class       | `ClassType \| TableRowPropFn<ClassType>`                      | Custom class name for row                                                                                                                             | `null`         | -       |
| row-style       | `StyleType \| TableRowPropFn<StyleType>`                      | Custom style for row                                                                                                                                  | `null`         | `2.0.1` |
| row-attrs       | `Record<string, any> \| TableRowPropFn<Record<string, any>>`  | Custom attributes of row                                                                                                                              | `null`         | `2.0.1` |
| cell-class      | `ClassType \| TableCellPropFn<ClassType>`                     | Custom class name of cell                                                                                                                             | `null`         | `2.0.1` |
| cell-style      | `StyleType \| TableCellPropFn<StyleType>`                     | Custom style for cell                                                                                                                                 | `null`         | `2.0.1` |
| cell-attrs      | `Record<string, any> \| TableCellPropFn<Record<string, any>>` | Custom attributes of cell                                                                                                                             | `null`         | `2.0.1` |
| head-class      | `ClassType \| TableHeadPropFn<ClassType>`                     | Custom class name of the head cell                                                                                                                    | `null`         | `2.0.1` |
| head-style      | `StyleType \| TableHeadPropFn<StyleType>`                     | Custom style for head cell                                                                                                                            | `null`         | `2.0.1` |
| head-attrs      | `Record<string, any> \| TableHeadPropFn<Record<string, any>>` | Custom attributes for head cell                                                                                                                       | `null`         | `2.0.1` |
| stripe          | `boolean`                                                     | Set whether to apply zebra stripes to the table                                                                                                       | `false`        | -       |
| border          | `boolean`                                                     | Set whether the table has an outer border and a vertical border                                                                                       | `false`        | -       |
| highlight       | `boolean`                                                     | Set whether the table row is highlighted when the mouse moves in                                                                                      | `false`        | -       |
| use-y-bar       | `boolean`                                                     | Set whether the table uses vertical scroll bar                                                                                                        | `false`        | -       |
| bar-fade        | `number`                                                      | Set the fade time of the scroll bar, if it is less than `300`, turn off the fade effect                                                               | `1500`         | -       |
| scroll-delta-y  | `number`                                                      | Set the vertical scroll distance of the table                                                                                                         | `20`           | -       |
| row-draggable   | `boolean`                                                     | Set whether the table row can be dragged and sorted                                                                                                   | `false`        | -       |
| row-height      | `number`                                                      | Set the row height of the table, if not set, the table row height will be dynamically calculated                                                      | `null`         | -       |
| render-count    | `number`                                                      | Set the maximum number of rows to be rendered in the table, usually used for rendering a large amount of data, and a fixed row height needs to be set | `null`         | -       |
| scroll-class    | `ScrollClass`                                                 | Set the custom type of each scroll component of the table                                                                                             | `{}`           | -       |
| expand-renderer | `ExpandRenderFn`                                              | Set the rendering method of row expansion content                                                                                                     | `null`         | -       |
| current-page    | `number`                                                      | Set the data page currently displayed in the table                                                                                                    | `1`            | -       |
| page-size       | `number`                                                      | Set the amount of data per page of the table, when it is `0`, paging is disabled                                                                      | `0`            | -       |
| transparent     | `boolean`                                                     | Set whether the table is transparent, this property has lower priority than other built-in style properties                                           | `false`        | -       |
| empty-text      | `string`                                                      | Set the prompt when the table is empty                                                                                                                | `locale.empty` | -       |
| single-sorter   | `boolean`                                                     | After setting, it will limit the table to only one column to enable sorting                                                                           | `false`        | -       |
| single-filter   | `boolean`                                                     | After setting, it will limit the table to only one column to enable filtering                                                                         | `false`        | -       |
| locale          | `LocaleConfig['table']`                                       | Set the locale config                                                                                                                                 | `null`         | `2.1.0` |
| custom-sorter   | `boolean`                                                     | Set whether use custom sorter, will dispatch event without internal sorting if enabled                                                                | `false`        | `2.1.4` |
| custom-filter   | `boolean`                                                     | Set whether use custom filter, will dispatch event without internal filtering if enabled                                                              | `false`        | `2.1.4` |
| key-config      | `TableKeyConfig`                                              | Set the key names when parsing `data`                                                                                                                 | `{}`           | `2.1.6` |
| disabled-tree   | `boolean`                                                     | Set whether to disable automatic parsing tree data                                                                                                    | `false`        | `2.1.6` |
| row-indent      | `string \| number`                                            | Set the indent distance of each level of the tree table row                                                                                           | `'16px'`       | `2.1.6` |
| no-cascaded     | `boolean`                                                     | Enable parent and child rows to be checked independently in the tree table                                                                            | `false`        | `2.1.6` |

### Table Events

| Name             | Description                                                                                                                          | Parameters                                                                              | Since   |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ------- |
| body-scroll      | Emitted when the table is scrolled vertically, returns an object containing the scroll offset and scroll percentage                  | `(scroll: { client: number, percent: number })`                                         | -       |
| row-enter        | Emitted when the mouse moves into a row, returns row data, row index and row position index                                          | `((payload: TableRowPayload)`                                                           | -       |
| row-leave        | Emitted when the mouse moves out of the row, returns row data, row index and row position index                                      | `(payload: TableRowPayload)`                                                            | -       |
| row-click        | Emitted when a row is clicked, returns row data, row index and row position index                                                    | `(payload: TableRowPayload)`                                                            | -       |
| row-dblclick     | Emitted when a row is double-clicked, returns row data, row index and row position index                                             | `(payload: TableRowPayload)`                                                            | `2.0.1` |
| row-contextmenu  | Emitted when a row is right-clicked, returns row data, row index and row position index                                              | `(payload: TableRowPayload)`                                                            | `2.0.1` |
| row-check        | Emitted when a row checkbox is checked, returns row data, check state, row index and row position index                              | `(payload: TableRowPayload)`                                                            | -       |
| row-check-all    | Emitted when all is selected, returns whether the current state is all selected and whether it is partially selected                 | `(checked: boolean, partial: boolean)`                                                  | -       |
| row-expand       | Emitted when the expanded state of row expansion content changes, returns row data, expanded state, row index and row position index | `(payload: TableRowPayload)`                                                            | -       |
| row-drag-start   | Emitted when the row is about to start dragging, returns the data of the current row                                                 | `(data: Record<string, unknown>, event: DragEvent)`                                     | -       |
| row-drag-over    | Emitted when a row is being dragged, returns the data of the previous row                                                            | `(data: Record<string, unknown>, event: DragEvent)`                                     | -       |
| row-drop         | Emitted when a row is dropped by another dragged row, returns the data and drop type of the current row (before and after)           | `(data: Record<string, unknown>, dropType?: 'before ' \| 'after', event: DragEvent)`    | -       |
| row-drag-end     | Emitted when the row ends dragging, returns the data of the previous row and the data of all rows                                    | `(data: Record<string, unknown>, allData: Record<string, unknown>[], event: DragEvent)` | -       |
| row-filter       | Emitted when table data filtering occurs, returns the column information that participated in the filtering and the filtered data    | `(profiles: TableFilterProfile[], filteredRow: Data[])`                                 | -       |
| row-sort         | Emitted when the table data is sorted, returns the column information and sorted data that participated in the sorting               | `(profiles: SortProfile[], sortedRow: Data[])`                                          | -       |
| cell-enter       | Triggered when the mouse moves into a cell, returns row data, row index, row position index, column data and column index            | `(payload: TableCellPayload)`                                                           | `2.0.1` |
| cell-leave       | Triggered when the mouse moves out of the cell, returns row data, row index, row position index, column data and column index        | `(payload: TableCellPayload)`                                                           | `2.0.1` |
| cell-click       | Triggered when a cell is clicked, returns row data, row index, row position index, column data and column index                      | `(payload: TableCellPayload)`                                                           | `2.0.1` |
| cell-dblclick    | Triggered when a cell is double-clicked, returns row data, row index, row position index, column data and column index               | `(payload: TableCellPayload)`                                                           | `2.0.1` |
| cell-contextmenu | Triggered when a cell is right-clicked, returns row data, row index, row position index, column data and column index                | `(payload: TableCellPayload)`                                                           | `2.0.1` |
| head-enter       | Triggered when the mouse moves into the head cell, returns column data and column index                                              | `(payload: TableHeadPayload)`                                                           | `2.0.1` |
| head-leave       | Triggered when the mouse moves out of the head cell, returns column data and column index                                            | `(payload: TableHeadPayload)`                                                           | `2.0.1` |
| head-click       | Triggered when the head cell is clicked, returns column data and column index                                                        | `(payload: TableHeadPayload)`                                                           | `2.0.1` |
| head-dblclick    | Triggered when the head cell is double-clicked, returns column data and column index                                                 | `(payload: TableHeadPayload)`                                                           | `2.0.1` |
| head-contextmenu | Triggered when the head cell is right-clicked, returns column data and column index                                                  | `(payload: TableHeadPayload)`                                                           | `2.0.1` |

### Table Slots

| Name    | Description                                                                 | Parameters             | Since |
| ------- | --------------------------------------------------------------------------- | ---------------------- | ----- |
| default | Slot for table column, column should be defined using TableColumn component | -                      | -     |
| empty   | Slot for empty datatip content                                              | `{ isFixed: boolean }` | -     |

### Table Methods

| Name          | Description                                                                         | Signature                         | Since |
| ------------- | ----------------------------------------------------------------------------------- | --------------------------------- | ----- |
| clearSort     | Clear all sorts currently active in the table                                       | `() => void`                      | -     |
| clearFilter   | Clear all active filters in the current table                                       | `() => void`                      | -     |
| refresh       | Refresh the table, which will trigger the re-layout and data rendering of the table | `() => void`                      | -     |
| getSelected   | Get all selected row data                                                           | `() => Record<string, unknown>[]` | -     |
| clearSelected | Clear all selected row data                                                         | `() => void`                      | -     |

### TableColumn Props

| Name          | Type                                   | Description                                                                                                                                  | Default     | Since   |
| ------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------- |
| name          | `string`                               | The name of the column                                                                                                                       | `''`        | -       |
| key \| id-key | `string \| number`                     | Unique index of the column, use `id-key` instead of                                                                                          | `''`        | -       |
| accessor      | `(data: any, rowIndex: number) => any` | The data read method of this column, receiving row data and row position index, if not defined, it will be read from row data by index value | `null`      | -       |
| fixed         | `boolean \| 'left' \| 'right'`         | Whether it is a fixed column, optional values ​​are `left`, `right`, when set to `true`, it is fixed on the left                             | `false`     | -       |
| class-name    | `ClassType`                            | Custom class name for the cell in this column                                                                                                | `null`      | -       |
| style         | `StyleType`                            | Custom style for the column                                                                                                                  | `null`      | `2.0.1` |
| attrs         | `Record<string, any>`                  | Custom attributes for the column                                                                                                             | `null`      | `2.0.1` |
| type          | `TableColumnType`                      | Set built-in type of the column                                                                                                              | `null`      | -       |
| width         | `number`                               | Set column width                                                                                                                             | `null`      | -       |
| filter        | `TableFilterOptions<any, any>`         | Configure filter for the column                                                                                                              | `null`      | -       |
| sorter        | `boolean \| TableSorterOptions<any>`   | Configure the sorter for the column                                                                                                          | `null`      | -       |
| order         | `number`                               | The rendering order of the column                                                                                                            | `0`         | -       |
| renderer      | `ColumnRenderFn`                       | Custom render function                                                                                                                       | `null`      | -       |
| head-renderer | `HeadRenderFn`                         | Custom head render function                                                                                                                  | `null`      | -       |
| no-ellipsis   | `boolean`                              | Whether to disable the ellipsis component of the cell                                                                                        | `false`     | -       |
| checkbox-size | `'small' \| 'default' \| 'large'`      | Set the checkbox size when `type` is `'selection'`                                                                                           | `'default'` | -       |
| disable-row   | `(data: Data) => boolean`              | Set the callback function for disabled row                                                                                                   | `null`      | -       |
| truth-index   | `boolean`                              | Set whether to use row truth (global) index when `type` is `'order'`                                                                         | `false`     | -       |
| order-label   | `(index: number) => string \| number`  | When `type` is `'order'`, set the callback function to display the content of the order                                                      | `null`      | -       |
| meta-data     | `Data`                                 | Set the column metadata                                                                                                                      | `{}`        | -       |

### TableColumn Slots

| Name    | Description                    | Parameters                                                                                                      | Since |
| ------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------- | ----- |
| default | Slot for column content        | `{ row: Record<string, unknown>, rowIndex: number, column: TableColumnOptions<any, any>, columnIndex: number }` | -     |
| head    | Slot for column header content | `{ column: TableColumnOptions<any, any>, columnIndex: number }`                                                 | -     |

### TableSorter Props

| Name   | Type                               | Description                                                                         | Default | Since |
| ------ | ---------------------------------- | ----------------------------------------------------------------------------------- | ------- | ----- |
| able   | `boolean`                          | Set whether is able to sort                                                         | `false` | -     |
| type   | `'asc' \| 'desc'`                  | The sort type                                                                       | `null`  | -     |
| order  | `number`                           | Used to specify the order of each column when sorting multiple columns              | `0`     | -     |
| method | `(prev: any, next: any) => number` | The method for custom sorting, receiving data from front and back rows respectively | `null`  | -     |

### TableFilter Props

| Name     | Type                                                             | Description                                                                        | Default | Since |
| -------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------- | ----- |
| able     | `boolean`                                                        | Set whether is able to filter                                                      | `false` | -     |
| options  | `(string \| { value: any, label?: string, active?: boolean })[]` | Filter options, an object of `{ label, value }`                                    | `[]`    | -     |
| multiple | `boolean`                                                        | Whether to enable multi-condition filtering                                        | `false` | -     |
| active   | `any`                                                            | The currently filtered dependency value, which will be passed to the filter method | `null`  | -     |
| method   | `(active: any \| any[], data: any) => boolean`                   | Filter method, receiving filtered dependent values and row data                    | `null`  | -     |