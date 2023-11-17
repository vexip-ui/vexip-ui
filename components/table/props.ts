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
  Accessor,
  ColumnCellSpanFn,
  ColumnRenderFn,
  ColumnSummaryRenderFn,
  Data,
  DropType,
  ExpandRenderFn,
  FilterRenderFn,
  HeadRenderFn,
  SummaryCellSpanFn,
  SummaryRenderFn,
  TableCellPayload,
  TableCellPropFn,
  TableCellSpanFn,
  TableColumnRawOptions,
  TableColumnType,
  TableFilterOptions,
  TableFilterProfile,
  TableFootPayload,
  TableFootPropFn,
  TableHeadPayload,
  TableHeadPropFn,
  TableIcons,
  TableKeyConfig,
  TableRowPayload,
  TableRowPropFn,
  TableSorterOptions,
  TableSorterProfile,
  TableSummaryOptions,
  TableTextAlign
} from './symbol'

export const tableProps = buildProps({
  locale: localeProp('table'),
  columns: Array as PropType<TableColumnRawOptions[]>,
  summaries: Array as PropType<TableSummaryOptions<any, any>[]>,
  data: Array as PropType<Data[]>,
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
  useXBar: booleanProp,
  useYBar: booleanProp,
  barFade: Number,
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
  tooltipTheme: String as PropType<TooltipTheme>,
  tooltipWidth: [Number, String],
  singleSorter: booleanProp,
  singleFilter: booleanProp,
  cellClass: [String, Object, Array, Function] as PropType<
    ClassType | TableCellPropFn<any, ClassType>
  >,
  cellStyle: [String, Object, Array, Function] as PropType<
    StyleType | TableCellPropFn<any, StyleType>
  >,
  cellAttrs: [Object, Function] as PropType<
    Record<string, any> | TableCellPropFn<any, Record<string, any>>
  >,
  headClass: [String, Object, Array, Function] as PropType<ClassType | TableHeadPropFn<ClassType>>,
  headStyle: [String, Object, Array, Function] as PropType<StyleType | TableHeadPropFn<StyleType>>,
  headAttrs: [Object, Function] as PropType<
    Record<string, any> | TableHeadPropFn<Record<string, any>>
  >,
  footClass: [String, Object, Array, Function] as PropType<ClassType | TableFootPropFn<ClassType>>,
  footStyle: [String, Object, Array, Function] as PropType<StyleType | TableFootPropFn<StyleType>>,
  footAttrs: [Object, Function] as PropType<
    Record<string, any> | TableFootPropFn<Record<string, any>>
  >,
  customSorter: booleanProp,
  customFilter: booleanProp,
  keyConfig: Object as PropType<TableKeyConfig>,
  disabledTree: booleanProp,
  rowIndent: [String, Number],
  noCascaded: booleanProp,
  colResizable: booleanProp,
  cellSpan: Function as PropType<TableCellSpanFn>,
  sidePadding: [Number, Array] as PropType<number | number[]>,
  icons: Object as PropType<TableIcons>,
  onScroll:
    eventProp<
      (payload: { type: 'horizontal' | 'vertical', client: number, percent: number }) => void
    >(),
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
  onHeadContextmenu: eventProp<(payload: TableHeadPayload) => void>(),
  onColResizeStart: eventProp<(payload: TableHeadPayload) => void>(),
  onColResizeMove: eventProp<(payload: TableHeadPayload) => void>(),
  onColResizeEnd: eventProp<(payload: TableHeadPayload) => void>(),
  onFootEnter: eventProp<(payload: TableFootPayload) => void>(),
  onFootLeave: eventProp<(payload: TableFootPayload) => void>(),
  onFootClick: eventProp<(payload: TableFootPayload) => void>(),
  onFootDblclick: eventProp<(payload: TableFootPayload) => void>(),
  onFootContextmenu: eventProp<(payload: TableFootPayload) => void>()
})

export type TableProps = ExtractPropTypes<typeof tableProps>
export type TableCProps = ConfigurableProps<
  TableProps,
  'columns' | 'data' | 'currentPage' | 'summaries'
>

export const tableColumnProps = buildProps({
  idKey: [Number, String],
  name: String,
  accessor: Function as PropType<Accessor>,
  fixed: {
    type: [Boolean, String] as PropType<boolean | 'left' | 'right'>,
    default: null
  },
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
  meta: Object as PropType<any>,
  textAlign: String as PropType<TableTextAlign>,
  headSpan: Number,
  cellSpan: Function as PropType<ColumnCellSpanFn>,
  noSummary: booleanProp,
  summaryRenderer: Function as PropType<ColumnSummaryRenderFn>,
  indented: booleanProp
})

export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>
export type TableColumnCProps = ConfigurableProps<
  TableColumnProps,
  | 'idKey'
  | 'name'
  | 'accessor'
  | 'fixed'
  | 'type'
  | 'renderer'
  | 'headRenderer'
  | 'order'
  | 'headSpan'
  | 'summaryRenderer'
>

export const tableColumnGroupProps = buildProps({
  name: String,
  fixed: {
    type: [Boolean, String] as PropType<boolean | 'left' | 'right'>,
    default: null
  },
  order: Number,
  renderer: Function as PropType<() => any>
})

export type TableColumnGroupProps = ExtractPropTypes<typeof tableColumnGroupProps>
export type TableColumnGroupCProps = ConfigurableProps<TableColumnProps, 'name' | 'fixed' | 'order'>

export const tableSummaryProps = buildProps({
  idKey: [Number, String],
  name: String,
  class: classProp,
  style: styleProp,
  attrs: Object,
  cellSpan: Function as PropType<SummaryCellSpanFn>,
  order: Number,
  above: booleanProp,
  meta: Object as PropType<any>,
  renderer: Function as PropType<SummaryRenderFn>
})

export type TableSummaryProps = ExtractPropTypes<typeof tableSummaryProps>
export type TableSummaryCProps = ConfigurableProps<
  TableSummaryProps,
  'idKey' | 'name' | 'renderer' | 'colSpan' | 'order' | 'above'
>
