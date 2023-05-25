import {
  booleanProp,
  buildProps,
  classProp,
  eventProp,
  localeProp,
  sizeProp,
  styleProp
} from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ClassType, ConfigurableProps, StyleType } from '@vexip-ui/config'
import type { TooltipTheme } from '@/components/tooltip'
import type {
  ColumnRenderFn,
  Data,
  DropType,
  ExpandRenderFn,
  FilterRenderFn,
  HeadRenderFn,
  TableCellPayload,
  TableCellPropFn,
  TableColumnOptions,
  TableColumnType,
  TableFilterOptions,
  TableFilterProfile,
  TableHeadPayload,
  TableHeadPropFn,
  TableKeyConfig,
  TableRowPayload,
  TableRowPropFn,
  TableSorterOptions,
  TableSorterProfile,
  TableTextAlign
} from './symbol'

export const tableProps = buildProps({
  locale: localeProp('table'),
  columns: Array as PropType<TableColumnOptions<any, any>[]>,
  data: Array as PropType<Data[]>,
  dataKey: String,
  width: [Number, String],
  height: Number,
  rowClass: [String, Object, Array, Function] as PropType<ClassType | TableRowPropFn<ClassType>>,
  rowStyle: [String, Object, Array, Function] as PropType<StyleType | TableRowPropFn<StyleType>>,
  rowAttrs: [Object, Function] as PropType<
    Record<string, any> | TableRowPropFn<Record<string, any>>
  >,
  stripe: booleanProp,
  border: booleanProp,
  highlight: booleanProp,
  useYBar: booleanProp,
  barFade: Number,
  scrollDeltaY: Number,
  rowDraggable: booleanProp,
  rowHeight: Number,
  rowMinHeight: Number,
  virtual: booleanProp,
  bufferCount: Number,
  scrollClass: Object as PropType<{
    horizontal?: ClassType,
    major?: ClassType,
    left?: ClassType,
    right?: ClassType
  }>,
  expandRenderer: Function as PropType<ExpandRenderFn>,
  currentPage: Number,
  pageSize: Number,
  transparent: booleanProp,
  emptyText: String,
  tooltipTheme: String as PropType<TooltipTheme>,
  tooltipWidth: [Number, String],
  singleSorter: booleanProp,
  singleFilter: booleanProp,
  cellClass: [String, Object, Array, Function] as PropType<ClassType | TableCellPropFn<ClassType>>,
  cellStyle: [String, Object, Array, Function] as PropType<StyleType | TableCellPropFn<StyleType>>,
  cellAttrs: [Object, Function] as PropType<
    Record<string, any> | TableCellPropFn<Record<string, any>>
  >,
  headClass: [String, Object, Array, Function] as PropType<ClassType | TableHeadPropFn<ClassType>>,
  headStyle: [String, Object, Array, Function] as PropType<StyleType | TableHeadPropFn<StyleType>>,
  headAttrs: [Object, Function] as PropType<
    Record<string, any> | TableHeadPropFn<Record<string, any>>
  >,
  customSorter: booleanProp,
  customFilter: booleanProp,
  keyConfig: Object as PropType<TableKeyConfig>,
  disabledTree: booleanProp,
  rowIndent: [String, Number],
  noCascaded: booleanProp,
  columnResizable: booleanProp,
  onBodyScroll: eventProp<(payload: { client: number, percent: number }) => void>(),
  onRowEnter: eventProp<(payload: TableRowPayload) => void>(),
  onRowLeave: eventProp<(payload: TableRowPayload) => void>(),
  onRowClick: eventProp<(payload: TableRowPayload) => void>(),
  onRowDblclick: eventProp<(payload: TableRowPayload) => void>(),
  onRowContextmenu: eventProp<(payload: TableRowPayload) => void>(),
  onRowCheck: eventProp<(payload: TableRowPayload) => void>(),
  onRowCheckAll: eventProp<(checked: boolean, partial: boolean) => void>(),
  onRowExpand: eventProp<(payload: TableRowPayload) => void>(),
  onRowDragStart: eventProp<(row: Data, event: DragEvent) => void>(),
  onRowDragOver: eventProp<(row: Data, event: DragEvent) => void>(),
  onRowDrop: eventProp<(row: Data, type: DropType, event: DragEvent) => void>(),
  onRowDragEnd: eventProp<(row: Data, allRows: Data[], event: DragEvent) => void>(),
  onRowFilter: eventProp<(profiles: TableFilterProfile[], filteredRow: Data[]) => void>(),
  onRowSort: eventProp<(profiles: TableSorterProfile[], sortedRow: Data[]) => void>(),
  onCellEnter: eventProp<(payload: TableCellPayload) => void>(),
  onCellLeave: eventProp<(payload: TableCellPayload) => void>(),
  onCellClick: eventProp<(payload: TableCellPayload) => void>(),
  onCellDblclick: eventProp<(payload: TableCellPayload) => void>(),
  onCellContextmenu: eventProp<(payload: TableCellPayload) => void>(),
  onHeadEnter: eventProp<(payload: TableHeadPayload) => void>(),
  onHeadLeave: eventProp<(payload: TableHeadPayload) => void>(),
  onHeadClick: eventProp<(payload: TableHeadPayload) => void>(),
  onHeadDblclick: eventProp<(payload: TableHeadPayload) => void>(),
  onHeadContextmenu: eventProp<(payload: TableHeadPayload) => void>()
})

export type TableProps = ExtractPropTypes<typeof tableProps>
export type TableCProps = ConfigurableProps<TableProps, 'columns' | 'data' | 'currentPage'>

export const tableColumnProps = buildProps({
  idKey: [Number, String],
  name: String,
  accessor: Function as PropType<(row: any, index: number) => any>,
  fixed: {
    type: [Boolean, String] as PropType<boolean | 'left' | 'right'>,
    default: null
  },
  className: classProp,
  class: classProp,
  style: styleProp,
  attrs: Object,
  type: String as PropType<TableColumnType>,
  width: Number,
  filter: Object as PropType<TableFilterOptions<any, any>>,
  sorter: {
    type: [Boolean, Object] as PropType<boolean | TableSorterOptions<any>>,
    default: null
  },
  renderer: Function as PropType<ColumnRenderFn>,
  headRenderer: Function as PropType<HeadRenderFn>,
  filterRenderer: Function as PropType<FilterRenderFn>,
  order: Number,
  noEllipsis: booleanProp,
  checkboxSize: sizeProp,
  disableRow: Function as PropType<(data: Data) => boolean>,
  truthIndex: booleanProp,
  orderLabel: Function as PropType<(index: number) => string | number>,
  metaData: Object as PropType<Data>,
  textAlign: String as PropType<TableTextAlign>
})

export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>
export type TableColumnCProps = ConfigurableProps<
  TableColumnProps,
  'idKey' | 'name' | 'accessor' | 'fixed' | 'type' | 'renderer' | 'headRenderer' | 'order'
>
