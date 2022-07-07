### Table Props

| Name            | Type                         | Description                                                                                                               | Default     | Since |
| --------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------- | --- |
| columns | `ColumnOptions<any, any>[]` | Table column configuration, refer to TableColumn properties below | `[]` | - |
| data | `Record<string, unknown>[]` | Table data source | `[]` | - |
| data-key | `string` | The index field of the data source, the value of this field needs to be unique in the data source | `'id'` | - |
| width | `number` | The width of the table, used when there are fixed columns | `null` | - |
| height | `number` | The height of the table, beyond which it will become scrollable | `null` | - |
| row-class | `string \| Record<string, boolean> \| ((data: Record<string, unknown>, index: number) => string \| Record<string, boolean>)` | Row customization class name, if function, accepts row data and row index, returns class name | `null` | - |
| stripe | `boolean` | Set whether to apply zebra stripes to the table | `false` | - |
| border | `boolean` | Set whether the table has an outer border and a vertical border | `false` | - |
| highlight | `boolean` | Set whether the table row is highlighted when the mouse moves in | `false` | - |
| use-y-bar | `boolean` | Set whether the table uses vertical scroll bar | `false` | - |
| bar-fade | `number` | Set the fade time of the scroll bar, if it is less than `300`, turn off the fade effect | `1500` | - |
| scroll-delta-y | `number` | Set the vertical scroll distance of the table | `20` | - |
| row-draggable | `boolean` | Set whether the table row can be dragged and sorted | `false` | - |
| row-height | `number` | Set the row height of the table, if not set, the table row height will be dynamically calculated | `null` | - |
| render-count | `number` | Set the maximum number of rows to be rendered in the table, usually used for rendering a large amount of data, and a fixed row height needs to be set | `null` | - |
| scroll-class | `{ horizontal?: string \| Record<string, boolean>, major?: string \| Record<string, boolean>, left?: string \| Record<string, boolean>, right?: string \| Record<string, boolean> }` | Set the custom type of each scroll component of the table | `{}` | - |
| expand-renderer | `(data: { leftFixed: number, rightFixed: number, row: Record<string, unknown>, rowIndex: number }) => any` | Set the rendering method of row expansion content | `null` | - |
| current-page | `number` | Set the data page currently displayed in the table | `1` | - |
| page-size | `number` | Set the amount of data per page of the table, when it is `0`, paging is disabled | `0` | - |
| transparent | `boolean` | Set whether the table is transparent, this property has lower priority than other built-in style properties | `false` | - |
| empty-text | `string` | Set the prompt when the table is empty | `locale.empty` | - |
| single-sorter | `boolean` | After setting, it will limit the table to only one column to enable sorting | `false` | - |
| single-filter | `boolean` | After setting, it will limit the table to only one column to enable filtering | `false` | - |

### Table Events

| Name              | Description                                                                         | Parameters                       | Since |
| ----------------- | ---------------------------------------------------------------------------- | -------------------------- | --- |
| body-scroll | Emitter when the table is scrolled vertically, returns an object containing the scroll offset and scroll percentage | `(scroll: { client: number, percent: number })` | - |
| row-enter | Emitter when the mouse moves into a row, returns row data, row index and row position index | `(data: Record<string, unknown>, key: string \| number \| symbol, index: number)` | - |
| row-leave | Emitter when the mouse moves out of the row, returns row data, row index and row position index | `(data: Record<string, unknown>, key: string \| number \| symbol, index: number)` | - |
| row-click | Emitter when a row is clicked, returns row data, row index and row position index | `(data: Record<string, unknown>, key: string \| number \| symbol, index: number)` | - |
| row-check | Emitter when a row checkbox is checked, returns row data, check state, row index and row position index | `(data: Record<string, unknown>, checked: boolean, key: string \| number \| symbol, index: number)` | - |
| row-check-all | Emitter when all is selected, returns whether the current state is all selected and whether it is partially selected | `(checked: boolean, partial: boolean)` | - |
| row-expand | Emitter when the expanded state of row expansion content changes, returns row data, expanded state, row index and row position index | `(data: Record<string, unknown>, expanded: boolean, key: string \| number \| symbol, index: number)` | - |
| row-drag-start | Emitter when the row is about to start dragging, returns the data of the current row | `(data: Record<string, unknown>)` | - |
| row-drag-over | Emitter when a row is being dragged, returns the data of the previous row | `(data: Record<string, unknown>)` | - |
| row-drop | Emitter when a row is dropped by another dragged row, returns the data and drop type of the current row (before and after) | `(data: Record<string, unknown>, dropType?: 'before ' \| 'after')` | - |
| row-drag-end | Emitter when the row ends dragging, returns the data of the previous row and the data of all rows | `(data: Record<string, unknown>, allData: Record<string, unknown>[])` | - |
| row-filter | Emitter when table data filtering occurs, returns the column information that participated in the filtering and the filtered data | `(profiles: { name: string, key: string \| number \| symbol, active: string \| number \| (string \| number)[] \| null, metaData?: Record<string, unknown> }[], rows: Record<string, unknown>[])` | - |
| row-sort | Emitter when the table data is sorted, returns the column information and sorted data that participated in the sorting | `(profiles: { name: string, key: string \| number \| symbol, type: 'asc' \| 'desc' \| null, metaData?: Record<string, unknown> }[], rows: Record<string, unknown>[])` | - |

### Table Slots

| Name    | Description                                        | Parameters | Since |
| ------- | ------------------------------------------- | --- | --- |
| default | Slot for table column, column should be defined using TableColumn component | - | - |
| empty | Slot for empty datatip content | `{ isFixed: boolean }` | - |

### Table Methods

| Name        | Description                                       | Signature | Since |
| ----------- | ------------------------------------------ | ---- | --- |
| clearSort | Clear all sorts currently active in the table | `() => void` | - |
| clearFilter | Clear all active filters in the current table | `() => void` | - |
| refresh | Reset the table, which will trigger the re-layout and data rendering of the table | `() => void` | - |
| getSelected | Get all selected row data | `() => Record<string, unknown>[]` | - |
| clearSelected | Clear all selected row data | `() => void` | - |

### TableColumn Props

| Name      | Type              | Description                                                                         | Default | Since |
| --------- | ----------------- | ---------------------------------------------------------------------------- | ------ | --- |
| name | `string` | The name of the column | `''` | - |
| key \| id-key | `string \| number` | Unique index of the column, use `id-key` instead of | `''` | - |
| accessor | `(data: any, rowIndex: number) => any` | The data read method of this column, receiving row data and row position index, if not defined, it will be read from row data by index value | `null` | - |
| fixed | `boolean \| 'left' \| 'right'` | Whether it is a fixed column, optional values ​​are `left`, `right`, when set to `true`, it is fixed on the left | `false` | - |
| className | `string \| Record<string, boolean>` | Custom class name for the cell in this column | `null` | - |
| type | `'order' \| 'selection' \| 'expand'` | Set built-in type of the column | `null` | - |
| width | `number` | set column width | `null` | - |
| filter | `FilterOptions<any, any>` | Configure filter for the column | `null` | - |
| sorter | `boolean \| SorterOptions<any>` | Configure the sorter for the column | `null` | - |
| order | `number` | The rendering order of the column | `0` | - |
| renderer | `(data: { row: Record<string, unknown>, rowIndex: number, column: ColumnOptions<any, any>, columnIndex: number }) => any` | Custom renderer function | `null` | - |

### TableColumn Slots

| Name    | Description                                                                       | Parameters | Since |
| ------- | -------------------------------------------------------------------------- | --- | --- |
| default | Slot for column content | `(row: Record<string, unknown>, rowIndex: number, column: ColumnOptions<any, any>, columnIndex: number)` | - |
| head | Slot for column header content | `(column: ColumnOptions<any, any>, columnIndex: number)` | - |

### TableSorter Props

| Name   | Type     | Description                                       | Default | Since |
| ------ | -------- | ------------------------------------------ | ------ | --- |
| able | `boolean` | Set whether is able to sort | `false` | - |
| type | `'asc' \| 'desc'` | The sort type | `null` | - |
| order | `number` | Used to specify the order of each column when sorting multiple columns | `0` | - |
| method | `(prev: any, next: any) => number` | The method for custom sorting, receiving data from front and back rows respectively | `null` | - |

### TableFilter Props

| Name     | Type     | Description                                         | Default | Since |
| -------- | -------- | -------------------------------------------- | ------ | --- |
| able | `boolean` | Set whether is able to filter | `false` | - |
| options | `(string \| { value: any, label?: string, active?: boolean })[]` | Filter options, an object of `{ label, value }` | `[]` | - |
| multiple | `boolean` | Whether to enable multi-condition filtering | `false` | - |
| active | `any` | The currently filtered dependency value, which will be passed to the filter method | `null` | - |
| method | `(active: any \| any[], data: any) => boolean` | Filter method, receiving filtered dependent values and row data | `null` | - |
