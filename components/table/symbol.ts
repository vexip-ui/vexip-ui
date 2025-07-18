import type { InjectionKey, Slots } from 'vue'
import type { ClassType, ComponentSize, LocaleConfig, StyleType } from '@vexip-ui/config'
import type { BITree } from '@vexip-ui/utils'
import type { TooltipTheme } from '@/components/tooltip'
import type { TableStore } from './store'

export type Key = string | number | symbol
export type Data = any

export type MouseEventType = 'Enter' | 'Leave' | 'Click' | 'Dblclick' | 'Contextmenu'
export type MoveEventType = 'Start' | 'Move' | 'End'

export type TableIconName = 'filter' | 'asc' | 'desc' | 'dragger' | 'expand' | 'plus' | 'minus'
export type TableRowPropFn<P = any> = (data: Data, index: number) => P
export type TableRowDropType = 'before' | 'after' | 'inner'
export type TableTextAlign = 'left' | 'center' | 'right'
export type TableColumnType = 'order' | 'selection' | 'expand' | 'drag'
export type TableColResizeType = 'lazy' | 'responsive'

export type TableIcons = Partial<Record<TableIconName, Record<string, any> | (() => any)>>

export const enum DropType {
  BEFORE = 'before',
  INNER = 'inner',
  AFTER = 'after',
}

export interface CellSpanResult {
  colSpan?: number,
  rowSpan?: number
}

export interface TableKeyConfig {
  id?: string,
  children?: string,
  checked?: string,
  height?: string,
  expanded?: string,
  treeExpanded?: string
}

export interface TableSlots {
  /**
   * @internal
   */
  default?: () => any,
  empty?: (params: { isFixed: boolean }) => any
}

export type Accessor<D = Data, Val extends string | number = string | number> = (
  data: D,
  index: number
) => Val
export type ExpandRenderFn<D = Data> = (data: {
  /** @deprecated */
  leftFixed: number,
  /** @deprecated */
  rightFixed: number,
  row: D,
  rowIndex: number
}) => any
export type ColumnCellSpanFn<D = Data> = (data: {
  row: D,
  index: number,
  fixed?: 'left' | 'right'
}) => CellSpanResult | void
export type SummaryCellSpanFn<D = Data, Val extends string | number = string | number> = (data: {
  column: TableColumnOptions<D, Val>,
  index: number,
  fixed?: 'left' | 'right'
}) => CellSpanResult | void

export type TableFilterOptions<D = Data, Val extends string | number = string | number> =
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

export interface ParsedFilterOptions extends Omit<Required<TableFilterOptions>, 'options'> {
  options: { value: string | number, label: string, active: boolean }[]
}

export interface TableSorterOptions<D = Data> {
  able?: boolean,
  type?: null | 'asc' | 'desc',
  order?: number, // 优先级
  method?: null | ((prev: D, next: D) => number)
}

export type ParsedTableSorterOptions = Required<TableSorterOptions>

export interface TableSummaryData {
  sum: number,
  min: number,
  max: number
}

export type SummaryRenderFn<D = Data, Val extends string | number = string | number> = (data: {
  column: TableColumnOptions<D, Val>,
  index: number,
  rows: D[],
  meta: TableSummaryData
}) => any

export type ColumnSummaryRenderFn<
  D = Data,
  Val extends string | number = string | number,
> = (data: {
  column: TableColumnOptions<D, Val>,
  index: number,
  rows: D[],
  meta: TableSummaryData,
  summary: TableSummaryOptions<D, Val>
}) => any

export interface TableBaseColumn<D = Data, Val extends string | number = string | number> {
  key: keyof D,
  name?: string,
  type?: never,
  meta?: any,
  fixed?: boolean | 'left' | 'right',
  class?: ClassType,
  style?: StyleType,
  attrs?: Record<string, any>,
  width?: number | `${number}%`,
  minWidth?: number,
  maxWidth?: number,
  filter?: TableFilterOptions<D, Val>,
  sorter?: boolean | TableSorterOptions<D>,
  order?: number,
  ellipsis?: boolean | null,
  textAlign?: TableTextAlign,
  headSpan?: number,
  noSummary?: boolean,
  indented?: boolean,
  accessor?: Accessor<D, Val>,
  formatter?: (value: Val) => unknown,
  cellSpan?: ColumnCellSpanFn<D>,
  renderer?: ColumnRenderFn<D, Val>,
  headRenderer?: HeadRenderFn,
  filterRenderer?: FilterRenderFn,
  summaryRenderer?: ColumnSummaryRenderFn<D, Val>
}

export interface TableOrderColumn<D = Data, Val extends string | number = string | number>
  extends Omit<TableBaseColumn<D, Val>, 'key' | 'type' | 'renderer'> {
  key?: keyof D,
  type: 'order',
  truthIndex?: boolean,
  orderLabel?: (index: number) => string | number
}

export interface TableSelectionColumn<D = Data, Val extends string | number = string | number>
  extends Omit<TableBaseColumn<D, Val>, 'key' | 'type' | 'renderer' | 'headRenderer'> {
  key?: keyof D,
  type: 'selection',
  /**
   * @deprecated Use `selectionSize` instead.
   */
  checkboxSize?: ComponentSize,
  selectionSize?: ComponentSize,
  singleSelect?: boolean,
  disableRow?: (data: Data) => boolean
}

export interface TableExpandColumn<D = Data, Val extends string | number = string | number>
  extends Omit<TableBaseColumn<D, Val>, 'key' | 'type' | 'renderer'> {
  key?: keyof D,
  type: 'expand',
  disableRow?: (data: Data) => boolean,
  renderer?: ExpandRenderFn<D>
}

export interface TableDragColumn<D = Data, Val extends string | number = string | number>
  extends Omit<TableBaseColumn<D, Val>, 'key' | 'type' | 'renderer'> {
  key?: keyof D,
  type: 'drag',
  disableRow?: (data: Data) => boolean
}

export type TableTypeColumn<D = Data, Val extends string | number = string | number> =
  | TableOrderColumn<D, Val>
  | TableSelectionColumn<D, Val>
  | TableExpandColumn<D, Val>
  | TableDragColumn<D, Val>
export type TableColumnOptions<D = Data, Val extends string | number = string | number> =
  | TableBaseColumn<D, Val>
  | TableTypeColumn<D, Val>

export type ColumnWithKey<
  D = Data,
  Val extends string | number = string | number,
> = TableColumnOptions<D, Val> & {
  key: Key,
  rowSpan: number,
  /** @internal */
  index: number,
  /** @internal */
  colIndex: number,
  /** @internal */
  first?: boolean,
  /** @internal */
  last?: boolean
}

export interface TableColumnGroupOptions {
  name?: string,
  fixed?: boolean | 'left' | 'right',
  order?: number,
  ellipsis?: boolean,
  textAlign?: TableTextAlign,
  renderer?: () => any,
  children: TableColumnOptions<any, any>[]
}
export interface ColumnGroupWithKey extends TableColumnGroupOptions {
  key: Key,
  headSpan: number,
  rowSpan: number,
  /** @internal */
  colIndex: number,
  /** @internal */
  last?: boolean
}

export type ColumnRenderFn<D = Data, Val extends string | number = string | number> = (data: {
  row: D,
  rowIndex: number,
  column: TableBaseColumn<D, Val>,
  columnIndex: number
}) => any
export type HeadRenderFn<D = Data, Val extends string | number = string | number> = (data: {
  column: TableColumnOptions<D, Val>,
  index: number
}) => any
export type FilterRenderFn<D = Data, Val extends string | number = string | number> = (data: {
  column: TableColumnOptions<D, Val>,
  index: number,
  filter: Required<TableFilterOptions<D, Val>>,
  handleFilter: (active: any) => void
}) => any

export type TableCellSpanFn<D = Data, Val extends string | number = string | number> = (data: {
  row: D,
  rowIndex: number,
  column: TableColumnOptions<D, Val>,
  columnIndex: number,
  fixed?: 'left' | 'right'
}) => CellSpanResult | undefined

export type TableCellPropFn<D = Data, P = any> = (data: {
  row: D,
  rowIndex: number,
  column: ColumnWithKey,
  columnIndex: number
}) => P
export type TableHeadPropFn<P = any> = (data: {
  column: ColumnWithKey,
  index: number,
  rowIndex: number
}) => P
export type TableFootPropFn<P = any> = (data: {
  column: ColumnWithKey,
  columnIndex: number,
  summary: SummaryWithKey,
  summaryIndex: number
}) => P

export type ColumnProfile<D = Data, Val extends string | number = string | number> = Pick<
  ColumnWithKey<D, Val>,
  'name' | 'key' | 'meta'
>
export type TableFilterProfile<
  D = Data,
  Val extends string | number = string | number,
> = ColumnProfile<D, Val> & {
  active: Val | Val[]
}
export type TableSorterProfile<
  D = Data,
  Val extends string | number = string | number,
> = ColumnProfile<D, Val> & {
  type: 'asc' | 'desc',
  order: number
}

export interface TableSummaryOptions<D = Data, Val extends string | number = string | number> {
  name: string,
  key: keyof D,
  class?: ClassType,
  style?: StyleType,
  attrs?: Record<string, any>,
  order?: number,
  above?: boolean,
  meta?: Record<any, any>,
  cellSpan?: SummaryCellSpanFn<D, Val>,
  renderer?: SummaryRenderFn<D, Val>
}

export type SummaryWithKey<
  D = Data,
  Val extends string | number = string | number,
> = TableSummaryOptions<D, Val> & { key: Key }

/** @internal */
export interface TableRowState {
  key: Key,
  index: number,
  hidden: boolean,
  hover: boolean,
  checked: boolean,
  height: number,
  // borderHeight: number,
  expanded: boolean,
  expandHeight: number,
  parent?: Key,
  children: TableRowState[],
  depth: number,
  treeExpanded: boolean,
  partial: boolean,
  dragging: boolean,
  listIndex: number,
  cellHeights: Record<Key, number>,
  last: boolean,
  expandAnimate: boolean,
  data: Data
}

export interface StoreOptions {
  columns: TableColumnRawOptions[],
  summaries: TableSummaryOptions[],
  data: Data[],
  dataKey: string,
  rowClass: ClassType | TableRowPropFn<ClassType>,
  rowStyle: StyleType | TableRowPropFn<StyleType>,
  rowAttrs: Record<string, any> | TableRowPropFn<Record<string, any>>,
  cellClass: ClassType | TableCellPropFn<ClassType>,
  cellStyle: StyleType | TableCellPropFn<StyleType>,
  cellAttrs: Record<string, any> | TableCellPropFn<Record<string, any>>,
  headClass: ClassType | TableHeadPropFn<ClassType>,
  headStyle: StyleType | TableHeadPropFn<StyleType>,
  headAttrs: Record<string, any> | TableHeadPropFn<Record<string, any>>,
  footClass: ClassType | TableFootPropFn<ClassType>,
  footStyle: StyleType | TableFootPropFn<StyleType>,
  footAttrs: Record<string, any> | TableFootPropFn<Record<string, any>>,
  border: boolean,
  stripe: boolean,
  highlight: boolean,
  currentPage: number,
  pageSize: number,
  rowHeight: number,
  rowMinHeight: number,
  virtual: boolean,
  rowDraggable: boolean,
  locale: LocaleConfig['table'],
  tooltipTheme: TooltipTheme,
  tooltipWidth: number | string,
  singleSorter: boolean,
  singleFilter: boolean,
  customSorter: boolean,
  customFilter: boolean,
  keyConfig: Required<TableKeyConfig>,
  disabledTree: boolean,
  noCascaded: boolean,
  colResizable: false | TableColResizeType,
  expandRenderer: ExpandRenderFn | null,
  cellSpan: TableCellSpanFn | null,
  sidePadding: number[],
  borderWidth: number,
  dataFilter: (data: Data) => boolean,
  ellipsis: boolean
}

export type TableColumnRawOptions = TableColumnOptions<any, any> | TableColumnGroupOptions
export type ColumnRawWithKey = ColumnGroupWithKey | ColumnWithKey

export interface StoreState extends StoreOptions {
  columns: ColumnWithKey[],
  normalColumns: ColumnWithKey[],
  allColumns: ColumnRawWithKey[][],
  summaries: SummaryWithKey[],
  rowData: TableRowState[],
  treeRowData: TableRowState[],
  width: number,
  rightFixedColumns: ColumnWithKey[],
  leftFixedColumns: ColumnWithKey[],
  aboveSummaries: SummaryWithKey[],
  belowSummaries: SummaryWithKey[],
  columnMap: Map<Key, ColumnRawWithKey>,
  rowMap: Map<Key, TableRowState>,
  summaryMap: Map<Key, SummaryWithKey>,
  idMaps: WeakMap<Data, Key>,
  checkedAll: boolean,
  partial: boolean,
  widths: Map<Key, number>,
  sorters: Map<Key, ParsedTableSorterOptions>,
  filters: Map<Key, ParsedFilterOptions>,
  resized: Set<Key>,
  bodyYScroll: number,
  bodyXScroll: number,
  padTop: number,
  startRow: number,
  endRow: number,
  dragging: boolean,
  heightBITree: BITree,
  virtualData: TableRowState[],
  totalHeight: number,
  colResizing: boolean,
  resizeLeft: number,
  cellSpanMap: Map<'left' | 'default' | 'right', Map<string, Required<CellSpanResult>>>,
  collapseMap: Map<'left' | 'default' | 'right', Map<string, Set<string>>>,
  locked: boolean,
  barScrolling: boolean,
  heightTrigger: number
}

export interface TableRowInstance {
  el?: HTMLElement | null,
  row: TableRowState
}

export interface TableRowPayload {
  row: Data,
  key: Key,
  index: number,
  event: Event,
  checked?: boolean,
  expanded?: boolean
}

export interface TableCellPayload {
  row: Data,
  key: Key,
  rowIndex: number,
  column: TableColumnOptions,
  columnIndex: number,
  event: Event
}

export interface TableHeadPayload {
  column: TableColumnOptions,
  index: number,
  event: Event
}

export interface TableColResizePayload extends TableHeadPayload {
  width: number
}

export interface TableFootPayload {
  column: TableColumnOptions,
  columnIndex: number,
  summary: TableSummaryOptions,
  summaryIndex: number,
  event: Event
}

export interface TableActions {
  increaseColumn(column: TableColumnRawOptions): void,
  decreaseColumn(column: TableColumnRawOptions): void,
  increaseSummary(column: TableSummaryOptions): void,
  decreaseSummary(column: TableSummaryOptions): void,
  getTableElement(): HTMLElement | undefined,
  refreshXScroll(): void,
  emitRowCheck(payload: TableRowPayload & { checked: boolean }): void,
  emitAllRowCheck(checked: boolean, partial: boolean): void,
  emitRowExpand(payload: TableRowPayload & { expanded: boolean }): void,
  emitRowTreeExpand(payload: TableRowPayload & { expanded: boolean }): void,
  emitRowFilter(): void,
  emitRowSort(): void,
  handleRowDragStart(rowInstance: TableRowInstance, event: DragEvent): void,
  handleRowDragOver(rowInstance: TableRowInstance, event: DragEvent): void,
  handleRowDrop(rowInstance: TableRowInstance, event: DragEvent): void,
  handleRowDragEnd(event: DragEvent): void,
  emitRowEvent(type: MouseEventType, payload: TableRowPayload): void,
  emitCellEvent(type: MouseEventType, payload: TableCellPayload): void,
  emitHeadEvent(type: MouseEventType, payload: TableHeadPayload): void,
  emitFootEvent(type: MouseEventType, payload: TableFootPayload): void,
  emitColResize(type: MoveEventType, payload: TableColResizePayload): void,
  hasIcon(name: TableIconName): boolean,
  getIcon(name: TableIconName): TableIcons[TableIconName],
  renderTableSlot(payload: { name: string }): any,
  runInLocked(handler?: (...args: any[]) => any, delay?: number): Promise<void>,
  updateColumns(): void,
  setColumnProp(key: Key, prop: string, value: any): void,
  updateSummaries(): void,
  setSummaryProp(key: Key, prop: string, value: any): void
}

export interface ColumnGroupActions {
  increaseColumn(column: TableColumnRawOptions): void,
  decreaseColumn(column: TableColumnRawOptions): void
}

export const DEFAULT_KEY_FIELD = 'id'
/**
 * 表格状态管理
 */
export const TABLE_STORE = '__VXP_TABLE_STORE' as unknown as InjectionKey<TableStore>
/**
 * 表格组件的顶层 Api
 */
export const TABLE_ACTIONS = '__VXP_TABLE_ACTIONS' as unknown as InjectionKey<TableActions>
export const TABLE_SLOTS = '__VXP_TABLE_SLOTS' as unknown as InjectionKey<Slots>
export const TABLE_HEAD_PREFIX = '__vxp-table-head-'
export const TABLE_FOOT_PREFIX = '__vxp-table-foot-'

export const COLUMN_GROUP_ACTIONS =
  '__VXP_TABLE_COLUMN_GROUP_ACTIONS' as unknown as InjectionKey<ColumnGroupActions>

export const columnTypes: TableColumnType[] = ['order', 'selection', 'expand', 'drag']

export const noopFormatter = (v: any) => v
