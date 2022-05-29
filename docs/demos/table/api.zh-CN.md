## API

### 属性

| 名称            | 类型                         | 说明                                                                                                               | 默认值     |
| --------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------- |
| columns         | Array                        | 表格的列配置                                                                                                       | []         |
| data            | Array                        | 表格的数据源                                                                                                       | []         |
| data-key        | String                       | 数据源的索引字段，该字段的值需要在数据源中唯一                                                                     | 'id'       |
| width           | Number                       | 表格的宽度，在有固定列时使用                                                                                       | null       |
| height          | Number                       | 表格的高度，超出这个高度时会变成可滚动状态                                                                         | null       |
| row-class       | String \| Object \| Function | 行的自定义类名，如果为函数，则接受行数据和行索引，返回类名                                                         | null       |
| stripe          | Boolean                      | 设置表格是否应用斑马纹                                                                                             | false      |
| border          | Boolean                      | 设置表格是否具有外边框和纵向边框                                                                                   | false      |
| highlight       | Boolean                      | 设置表格行是否具有 hover 高亮                                                                                      | false      |
| use-y-bar       | Boolean                      | 设置表格是否使用纵向滚动条                                                                                         | false      |
| bar-fade        | Number                       | 设置滚动条的渐隐时间，若小于 300 则关闭渐隐效果                                                                    | 1500       |
| scroll-delta-y  | Number                       | 设置表格纵向每次滚动的距离                                                                                         | 20         |
| row-draggable   | Boolean                      | 设置表格行是否可以拖拽排序                                                                                         | false      |
| row-height      | Number                       | 设置表格的行高，未设置时表格行高将会动态计算                                                                       | null       |
| render-count    | Number                       | 设置表格的最大渲染行数，通常用于大量数据渲染，需设置固定行高                                                       | null       |
| scroll-class    | Object                       | 设置表格各滚动组件的自定义类型，格式为 `{ horizontal, major, left, right }`，每个选项都可以传入 Vue 支持的类名格式 | {}         |
| expand-renderer | Function                     | 设置行拓展内容的渲染方法，接收 `h` 函数和一个 `{ row, rowIndex }` 对象                                             | null       |
| current-page    | Number                       | 设置表格当前显示的数据页                                                                                           | 1          |
| page-size       | Number                       | 设置表格每页的数据量，当为 0 时则禁用分页                                                                          | 0          |
| transparent     | Boolean                      | 设置是否为透明表格，该属性优先级低于其他内置样式属性                                                               | false      |
| empty-text      | String                       | 设置表格空数据时的提示语                                                                                           | '暂无数据' |
| single-sorter   | Boolean                      | 设置后将限制表格只能有一列开启排序                                                                                 | false      |
| single-filter   | Boolean                      | 设置后将限制表格只能有一列开启过滤                                                                                 | false      |

### 事件

| 名称              | 说明                                                                         | 参数                       |
| ----------------- | ---------------------------------------------------------------------------- | -------------------------- |
| on-body-scroll    | 当表格纵向滚动时触发，返回一个包含滚动偏移量和滚动百分比的对象               | { client, percent }        |
| on-row-enter      | 当鼠标移入了行时触发，返回行数据、行索引和行的位置索引                       | data, key, index           |
| on-row-leave      | 当鼠标移出了行时触发，返回行数据、行索引和行的位置索引                       | data, key, index           |
| on-row-click      | 当点击了行时触发，返回行数据、行索引和行的位置索引                           | data, key, index           |
| on-row-check      | 当勾选了行复选框时触发，返回行数据、勾选状态、行索引和行的位置索引           | data, checked, key, index  |
| on-row-check-all  | 当进行了全选时触发，返回当前是否为全选状态                                   | checked                    |
| on-row-expand     | 当行拓展内容的展开状态改变时触发，返回行数据、展开状态、行索引和行的位置索引 | data, expanded, key, index |
| on-row-drag-start | 当行将要开始拖拽时触发，返回当前行的数据                                     | data                       |
| on-row-drag-over  | 当行正在拖拽时触发，返回前行的数据                                           | data                       |
| on-row-drop       | 当行被其他的拖拽行放入时触发，返回当前行的数据和放入类型（前放和后放）       | data, dropType             |
| on-row-drag-end   | 当行结束拖拽时触发，返回前行的数据和所有行的数据                             | data, allRowsData          |
| on-row-filter     | 当发生表格数据过滤时触发，返回参与了过滤的列信息与过滤后的数据               | columns, data              |
| on-row-sort       | 当发生表格数据排序时触发，返回参与了排序的列信息与排序后的数据               | columns, data              |

### 插槽

| 名称    | 说明                                        |
| ------- | ------------------------------------------- |
| default | 表格列的插槽，应使用 TabelColumn 组件定义列 |
| empty   | 空数据提示内容的插槽                        |

### 方法

| 名称        | 说明                                       | 参数 |
| ----------- | ------------------------------------------ | ---- |
| clearSort   | 清除表格当前激活的所有排序                 | -    |
| clearFilter | 清除当前表格激活的所有过滤                 | -    |
| refresh     | 重置表格，将会触发表格的重新布局及数据渲染 | -    |
| getSelected | 获取所有被勾选的行数据                     | -    |

### Column 属性

| 名称      | 类型              | 说明                                                                         | 默认值 |
| --------- | ----------------- | ---------------------------------------------------------------------------- | ------ |
| name      | String            | 类的名称                                                                     | ''     |
| key       | String \| Number  | 列的唯一索引，使用模版列时请使用 id-key 代替                                 | ''     |
| accessor  | Function          | 该列的数据读取方法，接收行数据和行位置索引，若不定义这按索引值从行数据上读取 | null   |
| fixed     | String \| Boolean | 是否为固定列，可选值为 `left`、`right`，设置为 true 时同 left                | false  |
| className | String \| Object  | 该列单元格的自定义类名                                                       | null   |
| type      | String            | 可以设置 type 为 selection 添加复选框列                                      | null   |
| width     | Number            | 设置列宽                                                                     | null   |
| filter    | Object            | 配置列的过滤器                                                               | null   |
| sorter    | Object            | 配置列的排序器                                                               | null   |
| order     | Number            | 配置列的渲染顺序                                                             | 0      |
| renderer  | Function          | 自定义渲染函数，接收一个 `{ row, rowIndex, column, columnIndex }` 对象       | null   |

### Column 插槽

| 名称    | 说明                                                                       |
| ------- | -------------------------------------------------------------------------- |
| default | 列内容的插槽，分别接收 `row`、`rowIndex`、`column`、`columnIndex` 四个参数 |
| head    | 列头内容的插槽，分别接收 `column` 和 `index` 两个参数                      |

### Sorter 属性

| 名称   | 类型     | 说明                                       | 默认值 |
| ------ | -------- | ------------------------------------------ | ------ |
| able   | Boolean  | 设置是否可以排序                           | false  |
| type   | String   | 排序的类型，可选值为 `null`、`asc`、`desc` | null   |
| order  | Number   | 在多列排序时用于规定各列的先后顺序         | 0      |
| method | Function | 自定义排序的方法，分别接收前后行数据       | null   |

### Filter 属性

| 名称     | 类型     | 说明                                         | 默认值 |
| -------- | -------- | -------------------------------------------- | ------ |
| able     | Boolean  | 设置是否可以过滤                             | false  |
| options  | Array    | 过滤的选项，元素为 `{ label, value }` 的对象 | []     |
| multiple | Boolean  | 是否开启多条件过滤                           | false  |
| active   | Any      | 当前过滤的依赖值，会传入过滤方法             | null   |
| method   | Function | 过滤的方法，接收过滤的依赖值和行数据         | null   |
