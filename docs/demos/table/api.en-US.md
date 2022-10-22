### Preset Types

```ts
type Key = string | number | symbol
type Data = Record<string, unknown>
type RowPropFn<P = any> = (data: Data, index: number) => P

type Accessor<T extends string | number = string | number, D = Data> = (
  data: D,
  index: number
) => T
type ExpandRenderFn = (data: { leftFixed: number, rightFixed: number, row: Data, rowIndex: number }) => any
type ColumnRenderFn = (data: { row: Data, rowIndex: number, column: TableColumnOptions, columnIndex: number }) => any
type HeadRenderFn = (data: { column: TableColumnOptions, index: number }) => any

type TableColumnType = 'order' | 'selection' | 'expand'

type FilterOptions<T extends string | number = string | number, D = Data> =
  | {
      able: boolean,
      options: (string | { value: T, label?: string, active?: boolean })[],
      multiple?: false,
      active?: null | T,
      method?: null | ((active: T, data: D) => boolean)
    }
  | {
      able: boolean,
      options: (string | { value: T, label?: string, active?: boolean })[],
      multiple: true,
      active?: null | T[],
      method?: null | ((active: T[], data: D) => boolean)
    }

interface SorterOptions<D = Data> {
  able: boolean,
  type?: null | 'asc' | 'desc',
  order?: number, // 优先级
  method?: null | ((prev: D, next: D) => number)
}

interface BaseColumn<T extends string | number = string | number, D = Data> {
  name: string,
  key?: string | number,
  metaData?: Data,
  fixed?: boolean | 'left' | 'right',
  className?: ClassType,
  style?: StyleType,
  attrs?: Record<string, any>,
  width?: number,
  filter?: FilterOptions<T, D>,
  sorter?: boolean | SorterOptions<D>,
  order?: number,
  noEllipsis?: boolean,
  accessor?: Accessor<T, D>,
  renderer?: ColumnRenderFn,
  headRenderer?: HeadRenderFn
}

interface OrderColumn<T extends string | number = string | number, D = Data>
  extends BaseColumn<T, D> {
  type: 'order',
  truthIndex?: boolean,
  orderLabel?: (index: number) => string | number
}

interface SelectionColumn<T extends string | number = string | number, D = Data>
  extends BaseColumn<T, D> {
  type: 'selection',
  checkboxSize?: ComponentSize,
  disableRow?: (data: Data) => boolean
}

interface ExpandColumn<T extends string | number = string | number, D = Data>
  extends BaseColumn<T, D> {
  type: 'expand',
  disableRow?: (data: Data) => boolean
}

type TypeColumn<T extends string | number = string | number, D = Data> =
  | OrderColumn<T, D>
  | SelectionColumn<T, D>
  | ExpandColumn<T, D>
type TableColumnOptions<T extends string | number = string | number, D = Data> =
  | BaseColumn<T, D>
  | TypeColumn<T, D>
type ColumnWithKey<
  T extends string | number = string | number,
  D = Data
> = TableColumnOptions<T, D> & { key: Key }

interface ScrollClass {
  horizontal?: string | Record<string, boolean>,
  major?: string | Record<string, boolean>,
  left?: string | Record<string, boolean>,
  right?: string | Record<string, boolean>
}

type CellPropFn<P = any> = (data: Data, column: ColumnWithKey, rowIndex: number, columnIndex: number) => P
type HeadPropFn<P = any> = (column: ColumnWithKey, index: number) => P

type ColumnProfile<T extends string | number = string | number, D = Data> = Pick<
  ColumnWithKey<T, D>,
  'name' | 'key' | 'metaData'
>

type FilterProfile<T extends string | number = string | number, D = Data> = ColumnProfile<
  T,
  D
> & {
  active: T | T[]
}
type SorterProfile<T extends string | number = string | number, D = Data> = ColumnProfile<
  T,
  D
> & {
  type: 'asc' | 'desc'
}

interface TableRowPayload {
  row: Data,
  key: Key,
  index: number,
  event: Event
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

| Name            | Type                                                     | Description                                                                                                                                           | Default        | Since   |
| --------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------- |
| columns         | `TableColumnOptions<any, any>[]`                         | Table column configuration, refer to TableColumn properties below                                                                                     | `[]`           | -       |
| data            | `Record<string, unknown>[]`                              | Table data source                                                                                                                                     | `[]`           | -       |
| data-key        | `string`                                                 | The index field of the data source, the value of this field needs to be unique in the data source                                                     | `'id'`         | -       |
| width           | `number`                                                 | The width of the table, used when there are fixed columns                                                                                             | `null`         | -       |
| height          | `number`                                                 | The height of the table, beyond which it will become scrollable                                                                                       | `null`         | -       |
| row-class       | `ClassType \| RowPropFn<ClassType>`                      | Custom class name for row                                                                                                                             | `null`         | -       |
| row-style       | `StyleType \| RowPropFn<StyleType>`                      | Custom style for row                                                                                                                                  | `null`         | `2.0.1` |
| row-attrs       | `Record<string, any> \| RowPropFn<Record<string, any>>`  | Custom attributes of row                                                                                                                              | `null`         | `2.0.1` |
| cell-class      | `ClassType \| CellPropFn<ClassType>`                     | Custom class name of cell                                                                                                                             | `null`         | `2.0.1` |
| cell-style      | `StyleType \| CellPropFn<StyleType>`                     | Custom style for cell                                                                                                                                 | `null`         | `2.0.1` |
| cell-attrs      | `Record<string, any> \| CellPropFn<Record<string, any>>` | Custom attributes of cell                                                                                                                             | `null`         | `2.0.1` |
| head-class      | `ClassType \| HeadPropFn<ClassType>`                     | Custom class name of the head cell                                                                                                                    | `null`         | `2.0.1` |
| head-style      | `StyleType \| HeadPropFn<StyleType>`                     | Custom style for head cell                                                                                                                            | `null`         | `2.0.1` |
| head-attrs      | `Record<string, any> \| HeadPropFn<Record<string, any>>` | Custom attributes for head cell                                                                                                                       | `null`         | `2.0.1` |
| stripe          | `boolean`                                                | Set whether to apply zebra stripes to the table                                                                                                       | `false`        | -       |
| border          | `boolean`                                                | Set whether the table has an outer border and a vertical border                                                                                       | `false`        | -       |
| highlight       | `boolean`                                                | Set whether the table row is highlighted when the mouse moves in                                                                                      | `false`        | -       |
| use-y-bar       | `boolean`                                                | Set whether the table uses vertical scroll bar                                                                                                        | `false`        | -       |
| bar-fade        | `number`                                                 | Set the fade time of the scroll bar, if it is less than `300`, turn off the fade effect                                                               | `1500`         | -       |
| scroll-delta-y  | `number`                                                 | Set the vertical scroll distance of the table                                                                                                         | `20`           | -       |
| row-draggable   | `boolean`                                                | Set whether the table row can be dragged and sorted                                                                                                   | `false`        | -       |
| row-height      | `number`                                                 | Set the row height of the table, if not set, the table row height will be dynamically calculated                                                      | `null`         | -       |
| render-count    | `number`                                                 | Set the maximum number of rows to be rendered in the table, usually used for rendering a large amount of data, and a fixed row height needs to be set | `null`         | -       |
| scroll-class    | `ScrollClass`                                            | Set the custom type of each scroll component of the table                                                                                             | `{}`           | -       |
| expand-renderer | `ExpandRenderFn`                                         | Set the rendering method of row expansion content                                                                                                     | `null`         | -       |
| current-page    | `number`                                                 | Set the data page currently displayed in the table                                                                                                    | `1`            | -       |
| page-size       | `number`                                                 | Set the amount of data per page of the table, when it is `0`, paging is disabled                                                                      | `0`            | -       |
| transparent     | `boolean`                                                | Set whether the table is transparent, this property has lower priority than other built-in style properties                                           | `false`        | -       |
| empty-text      | `string`                                                 | Set the prompt when the table is empty                                                                                                                | `locale.empty` | -       |
| single-sorter   | `boolean`                                                | After setting, it will limit the table to only one column to enable sorting                                                                           | `false`        | -       |
| single-filter   | `boolean`                                                | After setting, it will limit the table to only one column to enable filtering                                                                         | `false`        | -       |

### Table Events

| Name             | Description                                                                                                                          | Parameters                                                                              | Since   |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ------- |
| body-scroll      | Emitter when the table is scrolled vertically, returns an object containing the scroll offset and scroll percentage                  | `(scroll: { client: number, percent: number })`                                         | -       |
| row-enter        | Emitter when the mouse moves into a row, returns row data, row index and row position index                                          | `((payload: TableRowPayload)`                                                           | -       |
| row-leave        | Emitter when the mouse moves out of the row, returns row data, row index and row position index                                      | `(payload: TableRowPayload)`                                                            | -       |
| row-click        | Emitter when a row is clicked, returns row data, row index and row position index                                                    | `(payload: TableRowPayload)`                                                            | -       |
| row-dblclick     | Emitter when a row is dbclicked, returns row data, row index and row position index                                                  | `(payload: TableRowPayload)`                                                            | `2.0.1` |
| row-contextmenu  | Emitter when a row is right clicked, returns row data, row index and row position index                                              | `(payload: TableRowPayload)`                                                            | `2.0.1` |
| row-check        | Emitter when a row checkbox is checked, returns row data, check state, row index and row position index                              | `(payload: Omit<TableRowPayload, 'event'> & { checked: boolean })`                      | -       |
| row-check-all    | Emitter when all is selected, returns whether the current state is all selected and whether it is partially selected                 | `(checked: boolean, partial: boolean)`                                                  | -       |
| row-expand       | Emitter when the expanded state of row expansion content changes, returns row data, expanded state, row index and row position index | `(payload: Omit<TableRowPayload, 'event'> & { expanded: boolean })`                     | -       |
| row-drag-start   | Emitter when the row is about to start dragging, returns the data of the current row                                                 | `(data: Record<string, unknown>, event: DragEvent)`                                     | -       |
| row-drag-over    | Emitter when a row is being dragged, returns the data of the previous row                                                            | `(data: Record<string, unknown>, event: DragEvent)`                                     | -       |
| row-drop         | Emitter when a row is dropped by another dragged row, returns the data and drop type of the current row (before and after)           | `(data: Record<string, unknown>, dropType?: 'before ' \| 'after', event: DragEvent)`    | -       |
| row-drag-end     | Emitter when the row ends dragging, returns the data of the previous row and the data of all rows                                    | `(data: Record<string, unknown>, allData: Record<string, unknown>[], event: DragEvent)` | -       |
| row-filter       | Emitter when table data filtering occurs, returns the column information that participated in the filtering and the filtered data    | `(profiles: FilterProfile[], filteredRow: Data[])`                                      | -       |
| row-sort         | Emitter when the table data is sorted, returns the column information and sorted data that participated in the sorting               | `(profiles: SortProfile[], sortedRow: Data[])`                                          | -       |
| cell-enter       | Triggered when the mouse moves into a cell, returns row data, row index, row position index, column data and column index            | `(payload: TableCellPayload)`                                                           | `2.0.1` |
| cell-leave       | Triggered when the mouse moves out of the cell, returns row data, row index, row position index, column data and column index        | `(payload: TableCellPayload)`                                                           | `2.0.1` |
| cell-click       | Triggered when a cell is clicked, returns row data, row index, row position index, column data and column index                      | `(payload: TableCellPayload)`                                                           | `2.0.1` |
| cell-dblclick    | Triggered when a cell is double clicked, returns row data, row index, row position index, column data and column index               | `(payload: TableCellPayload)`                                                           | `2.0.1` |
| cell-contextmenu | Triggered when a cell is right-clicked, returns row data, row index, row position index, column data and column index                | `(payload: TableCellPayload)`                                                           | `2.0.1` |
| head-enter       | Triggered when the mouse moves into the head cell, returns column data and column index                                              | `(payload: TableHeadPayload)`                                                           | `2.0.1` |
| head-leave       | Triggered when the mouse moves out of the head cell, returns column data and column index                                            | `(payload: TableHeadPayload)`                                                           | `2.0.1` |
| head-click       | Triggered when the head cell is clicked, returns column data and column index                                                        | `(payload: TableHeadPayload)`                                                           | `2.0.1` |
| head-dblclick    | Triggered when the head cell is double clicked, returns column data and column index                                                 | `(payload: TableHeadPayload)`                                                           | `2.0.1` |
| head-contextmenu | Triggered when the header cell is right-clicked, returns column data and column index                                                | `(payload: TableHeadPayload)`                                                           | `2.0.1` |

### Table Slots

| Name    | Description                                                                 | Parameters             | Since |
| ------- | --------------------------------------------------------------------------- | ---------------------- | ----- |
| default | Slot for table column, column should be defined using TableColumn component | -                      | -     |
| empty   | Slot for empty datatip content                                              | `{ isFixed: boolean }` | -     |

### Table Methods

| Name          | Description                                                                       | Signature                         | Since |
| ------------- | --------------------------------------------------------------------------------- | --------------------------------- | ----- |
| clearSort     | Clear all sorts currently active in the table                                     | `() => void`                      | -     |
| clearFilter   | Clear all active filters in the current table                                     | `() => void`                      | -     |
| refresh       | Reset the table, which will trigger the re-layout and data rendering of the table | `() => void`                      | -     |
| getSelected   | Get all selected row data                                                         | `() => Record<string, unknown>[]` | -     |
| clearSelected | Clear all selected row data                                                       | `() => void`                      | -     |

### TableColumn Props

| Name          | Type                                   | Description                                                                                                                                  | Default | Since |
| ------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----- |
| name          | `string`                               | The name of the column                                                                                                                       | `''`    | -     |
| key \| id-key | `string \| number`                     | Unique index of the column, use `id-key` instead of                                                                                          | `''`    | -     |
| accessor      | `(data: any, rowIndex: number) => any` | The data read method of this column, receiving row data and row position index, if not defined, it will be read from row data by index value | `null`  | -     |
| fixed         | `boolean \| 'left' \| 'right'`         | Whether it is a fixed column, optional values ​​are `left`, `right`, when set to `true`, it is fixed on the left                             | `false` | -     |
| className     | `string \| Record<string, boolean>`    | Custom class name for the cell in this column                                                                                                | `null`  | -     |
| type          | `'order' \| 'selection' \| 'expand'`   | Set built-in type of the column                                                                                                              | `null`  | -     |
| width         | `number`                               | set column width                                                                                                                             | `null`  | -     |
| filter        | `FilterOptions<any, any>`              | Configure filter for the column                                                                                                              | `null`  | -     |
| sorter        | `boolean \| SorterOptions<any>`        | Configure the sorter for the column                                                                                                          | `null`  | -     |
| order         | `number`                               | The rendering order of the column                                                                                                            | `0`     | -     |
| renderer      | `ColumnRenderFn`                       | Custom render function                                                                                                                       | `null`  | -     |
| head-renderer | `HeadRenderFn`                         | Custom head render function                                                                                                                  | `null`  | -     |

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
