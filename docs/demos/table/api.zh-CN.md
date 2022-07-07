### Table 属性

| 名称            | 类型                         | 说明                                                                                                               | 默认值     | 始于 |
| --------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------- | --- |
| columns         | `ColumnOptions<any, any>[]`                        | 表格列的配置，参考下方的 TableColumn 属性                                                                                                       | `[]`         | - |
| data            | `Record<string, unknown>[]`                        | 表格的数据源                                                                                                       | `[]`         | - |
| data-key        | `string`                       | 数据源的索引字段，该字段的值需要在数据源中唯一                                                                     | `'id'`       | - |
| width           | `number`                       | 表格的宽度，在有固定列时使用                                                                                       | `null`       | - |
| height          | `number`                       | 表格的高度，超出这个高度时会变成可滚动状态                                                                         | `null`       | - |
| row-class       | `string \| Record<string, boolean> \| ((data: Record<string, unknown>, index: number) => string \| Record<string, boolean>)` | 行的自定义类名，如果为函数，则接受行数据和行索引，返回类名                                                         | `null`       | - |
| stripe          | `boolean`                      | 设置表格是否应用斑马纹                                                                                             | `false`      | - |
| border          | `boolean`                      | 设置表格是否具有外边框和纵向边框                                                                                   | `false`      | - |
| highlight       | `boolean`                      | 设置表格行是否在鼠标移入时高亮                                                                                      | `false`      | - |
| use-y-bar       | `boolean`                      | 设置表格是否使用纵向滚动条                                                                                         | `false`      | - |
| bar-fade        | `number`                       | 设置滚动条的渐隐时间，若小于 `300` 则关闭渐隐效果                                                                    | `1500`       | - |
| scroll-delta-y  | `number`                       | 设置表格纵向每次滚动的距离                                                                                         | `20`         | - |
| row-draggable   | `boolean`                      | 设置表格行是否可以拖拽排序                                                                                         | `false`      | - |
| row-height      | `number`                       | 设置表格的行高，未设置时表格行高将会动态计算                                                                       | `null`       | - |
| render-count    | `number`                       | 设置表格的最大渲染行数，通常用于大量数据渲染，需设置固定行高                                                       | `null`       | - |
| scroll-class    | `{ horizontal?: string \| Record<string, boolean>, major?: string \| Record<string, boolean>, left?: string \| Record<string, boolean>, right?: string \| Record<string, boolean> }`                       | 设置表格各滚动组件的自定义类型 | `{}`         | - |
| expand-renderer | `(data: { leftFixed: number, rightFixed: number, row: Record<string, unknown>, rowIndex: number }) => any`                     | 设置行拓展内容的渲染方法                                 | `null`       | - |
| current-page    | `number`                       | 设置表格当前显示的数据页                                                                                           | `1`          | - |
| page-size       | `number`                       | 设置表格每页的数据量，当为 `0` 时则禁用分页                                                                          | `0`          | - |
| transparent     | `boolean`                      | 设置是否为透明表格，该属性优先级低于其他内置样式属性                                                               | `false`      | - |
| empty-text      | `string`                       | 设置表格空数据时的提示语                                                                                           | `locale.empty` | - |
| single-sorter   | `boolean`                      | 设置后将限制表格只能有一列开启排序                                                                                 | `false`      | - |
| single-filter   | `boolean`                      | 设置后将限制表格只能有一列开启过滤                                                                                 | `false`      | - |

### Table 事件

| 名称              | 说明                                                                         | 参数                       | 始于 |
| ----------------- | ---------------------------------------------------------------------------- | -------------------------- | --- |
| body-scroll    | 当表格纵向滚动时触发，返回一个包含滚动偏移量和滚动百分比的对象               | `(scroll: { client: number, percent: number })`        | - |
| row-enter      | 当鼠标移入了行时触发，返回行数据、行索引和行的位置索引                       | `(data: Record<string, unknown>, key: string \| number \| symbol, index: number)`           | - |
| row-leave      | 当鼠标移出了行时触发，返回行数据、行索引和行的位置索引                       | `(data: Record<string, unknown>, key: string \| number \| symbol, index: number)`           | - |
| row-click      | 当点击了行时触发，返回行数据、行索引和行的位置索引                           | `(data: Record<string, unknown>, key: string \| number \| symbol, index: number)`           | - |
| row-check      | 当勾选了行复选框时触发，返回行数据、勾选状态、行索引和行的位置索引           | `(data: Record<string, unknown>, checked: boolean, key: string \| number \| symbol, index: number)`  | - |
| row-check-all  | 当进行了全选时触发，返回当前是否为全选状态以及是否处于部分全选状态                                   | `(checked: boolean, partial: boolean)`                    | - |
| row-expand     | 当行拓展内容的展开状态改变时触发，返回行数据、展开状态、行索引和行的位置索引 | `(data: Record<string, unknown>, expanded: boolean, key: string \| number \| symbol, index: number)` | - |
| row-drag-start | 当行将要开始拖拽时触发，返回当前行的数据                                     | `(data: Record<string, unknown>)`                       | - |
| row-drag-over  | 当行正在拖拽时触发，返回前行的数据                                           | `(data: Record<string, unknown>)`                       | - |
| row-drop       | 当行被其他的拖拽行放入时触发，返回当前行的数据和放入类型（前放和后放）       | `(data: Record<string, unknown>, dropType?: 'before' \| 'after')`             | - |
| row-drag-end   | 当行结束拖拽时触发，返回前行的数据和所有行的数据                             | `(data: Record<string, unknown>, allData: Record<string, unknown>[])`          | - |
| row-filter     | 当发生表格数据过滤时触发，返回参与了过滤的列信息与过滤后的数据               | `(profiles: { name: string, key: string \| number \| symbol, active: string \| number \| (string \| number)[] \| null, metaData?: Record<string, unknown> }[], rows: Record<string, unknown>[])`              | - |
| row-sort       | 当发生表格数据排序时触发，返回参与了排序的列信息与排序后的数据               | `(profiles: { name: string, key: string \| number \| symbol, type: 'asc' \| 'desc' \| null, metaData?: Record<string, unknown> }[], rows: Record<string, unknown>[])`              | - |

### Table 插槽

| 名称    | 说明                                        | 参数 | 始于 |
| ------- | ------------------------------------------- | --- | --- |
| default | 表格列的插槽，应使用 TabelColumn 组件定义列 | - | - |
| empty   | 空数据提示内容的插槽                        | `(isFixed: boolean)` | - |

### Table 方法

| 名称        | 说明                                       | 签名 | 始于 |
| ----------- | ------------------------------------------ | ---- | --- |
| clearSort   | 清除表格当前激活的所有排序                 | `() => void`    | - |
| clearFilter | 清除当前表格激活的所有过滤                 | `() => void`    | - |
| refresh     | 重置表格，将会触发表格的重新布局及数据渲染 | `() => void`    | - |
| getSelected | 获取所有被勾选的行数据                     | `() => Record<string, unknown>[]`    | - |
| clearSelected | 清除所有被勾选的行数据                     | `() => void`    | - |

### TableColumn 属性

| 名称      | 类型              | 说明                                                                         | 默认值 | 始于 |
| --------- | ----------------- | ---------------------------------------------------------------------------- | ------ | --- |
| name      | `string`            | 列的名称                                                                     | `''`     | - |
| key \| id-key       | `string \| number`  | 列的唯一索引，使用模版列时请使用 `id-key` 代替                                 | `''`     | - |
| accessor  | `(data: any, rowIndex: number) => any`          | 该列的数据读取方法，接收行数据和行位置索引，若不定义这按索引值从行数据上读取 | `null`   | - |
| fixed     | `boolean \| 'left' \| 'right'` | 是否为固定列，可选值为 `left`、`right`，设置为 `true` 时固定在左侧                | `false`  | - |
| className | `string \| Record<string, boolean>` | 该列单元格的自定义类名                                                       | `null`   | - |
| type      | `'order' \| 'selection' \| 'expand'`            | 设置内置特定类型列                                      | `null`   | - |
| width     | `number`            | 设置列宽                                                                     | `null`   | - |
| filter    | `FilterOptions<any, any>`            | 列的过滤配置器                                                               | `null`   | - |
| sorter    | `boolean \| SorterOptions<any>`            | 列的排序排序器                                                               | `null`   | - |
| order     | `number`            | 列的渲染顺序                                                             | `0`      | - |
| renderer  | `(data: { row: Record<string, unknown>, rowIndex: number, column: ColumnOptions<any, any>, columnIndex: number }) => any`          | 自定义渲染函数       | `null`   | - |

### TableColumn 插槽

| 名称    | 说明                                                                       | 参数 | 始于 |
| ------- | -------------------------------------------------------------------------- | --- | --- |
| default | 列内容的插槽 | `(row: Record<string, unknown>, rowIndex: number, column: ColumnOptions<any, any>, columnIndex: number)` | - |
| head    | 列头内容的插槽                      | `(column: ColumnOptions<any, any>, columnIndex: number)` | - |

### TableSorter 属性

| 名称   | 类型     | 说明                                       | 默认值 | 始于 |
| ------ | -------- | ------------------------------------------ | ------ | --- |
| able   | `boolean`  | 设置是否可以排序                           | `false`  | - |
| type   | `'asc' \| 'desc'`   | 排序的类型 | `null`   | - |
| order  | `number`   | 在多列排序时用于规定各列的先后顺序         | `0`      | - |
| method | `(prev: any, next: any) => number` | 自定义排序的方法，分别接收前后行数据       | `null`   | - |

### TableFilter 属性

| 名称     | 类型     | 说明                                         | 默认值 | 始于 |
| -------- | -------- | -------------------------------------------- | ------ | --- |
| able     | `boolean`  | 设置是否可以过滤                             | `false`  | - |
| options  | `(string \| { value: any, label?: string, active?: boolean })[]`    | 过滤的选项，元素为 `{ label, value }` 的对象 | `[]`     | - |
| multiple | `boolean`  | 是否开启多条件过滤                           | `false`  | - |
| active   | `any`      | 当前过滤的依赖值，会传入过滤方法             | `null`   | - |
| method   | `(active: any \| any[], data: any) => boolean` | 过滤的方法，接收过滤的依赖值和行数据         | `null`   | - |
