import type { InjectionKey } from 'vue'
import type { ClassType, ComponentSize, LocaleConfig, StyleType } from '@vexip-ui/config'
import type { BITree } from '@vexip-ui/utils'
import type { TooltipTheme } from '@/components/tooltip'
import type { TableStore } from './store'

export type Key = string | number | symbol
export type Data = any
export type TableRowPropFn<P = any> = (data: Data, index: number) => P
export type TableRowDropType = 'before' | 'after' | 'inner'
export type TableTextAlign = 'left' | 'center' | 'right'
export type MouseEventType = 'Enter' | 'Leave' | 'Click' | 'Dblclick' | 'Contextmenu'
export type MoveEventType = 'Start' | 'Move' | 'End'

export const enum DropType {
  BEFORE = 'before',
  INNER = 'inner',
  AFTER = 'after'
}

export interface TableKeyConfig {
  id?: string,
  children?: string,
  checked?: string,
  height?: string,
  expanded?: string,
  treeExpanded?: string
}

export type Accessor<D = Data, Val extends string | number = string | number> = (
  data: D,
  index: number
) => Val
export type RenderFn = (data: Data) => any
export type ExpandRenderFn<D = Data> = (data: {
  leftFixed: number,
  rightFixed: number,
  row: D,
  rowIndex: number
}) => any

export type TableColumnType = 'order' | 'selection' | 'expand' | 'drag'

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

export interface TableBaseColumn<D = Data, Val extends string | number = string | number> {
  name: string,
  key: keyof D,
  type?: never,
  metaData?: Data,
  fixed?: boolean | 'left' | 'right',
  // type?: TableColumnType,
  /**
   * @deprecated Use 'class' prop to replace it
   **/
  className?: ClassType,
  class?: ClassType,
  style?: StyleType,
  attrs?: Record<string, any>,
  width?: number,
  filter?: TableFilterOptions<D, Val>,
  sorter?: boolean | TableSorterOptions<D>,
  order?: number,
  noEllipsis?: boolean,
  textAlign?: TableTextAlign,
  accessor?: Accessor<D, Val>,
  cellSpan?: CellSpanFn<D, Val>,
  renderer?: ColumnRenderFn<D, Val>,
  headRenderer?: HeadRenderFn,
  filterRenderer?: FilterRenderFn
}

export interface TableOrderColumn<D = Data, Val extends string | number = string | number>
  extends Omit<TableBaseColumn<D, Val>, 'type' | 'renderer'> {
  type: 'order',
  truthIndex?: boolean,
  orderLabel?: (index: number) => string | number
}

export interface TableSelectionColumn<D = Data, Val extends string | number = string | number>
  extends Omit<TableBaseColumn<D, Val>, 'type' | 'renderer' | 'headRenderer'> {
  type: 'selection',
  checkboxSize?: ComponentSize,
  disableRow?: (data: Data) => boolean
}

export interface TableExpandColumn<D = Data, Val extends string | number = string | number>
  extends Omit<TableBaseColumn<D, Val>, 'type' | 'renderer'> {
  type: 'expand',
  disableRow?: (data: Data) => boolean,
  renderer?: ExpandRenderFn<D>
}

export interface TableDragColumn<D = Data, Val extends string | number = string | number>
  extends Omit<TableBaseColumn<D, Val>, 'type' | 'renderer'> {
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
  Val extends string | number = string | number
> = TableColumnOptions<D, Val> & {
  key: Key,
  /** @internal */
  first?: boolean,
  /** @internal */
  last?: boolean
}

export type ColumnRenderFn<D = Data, Val extends string | number = string | number> = (data: {
  row: D,
  rowIndex: number,
  column: TableBaseColumn<D, Val>,
  columnIndex: number
}) => any
export type HeadRenderFn = (data: { column: TableColumnOptions, index: number }) => any

export type CellSpanFn<D = Data, Val extends string | number = string | number> = (data: {
  row: D,
  rowIndex: number,
  column: TableBaseColumn<D, Val>,
  columnIndex: number
}) => { colSpan?: number, rowSpan?: number } | undefined | null

export type FilterRenderFn = (data: {
  column: TableColumnOptions,
  index: number,
  filter: Required<TableFilterOptions>,
  handleFilter: (active: any) => void
}) => any

export type TableCellPropFn<P = any> = (
  data: Data,
  column: ColumnWithKey,
  rowIndex: number,
  columnIndex: number
) => P
export type TableHeadPropFn<P = any> = (column: ColumnWithKey, index: number) => P

export type ColumnProfile<D = Data, Val extends string | number = string | number> = Pick<
  ColumnWithKey<D, Val>,
  'name' | 'key' | 'metaData'
>
export type TableFilterProfile<
  D = Data,
  Val extends string | number = string | number
> = ColumnProfile<D, Val> & {
  active: Val | Val[]
}
export type TableSorterProfile<
  D = Data,
  Val extends string | number = string | number
> = ColumnProfile<D, Val> & {
  type: 'asc' | 'desc',
  order: number
}

export interface TableRowState {
  key: Key,
  index: number,
  hidden: boolean,
  hover: boolean,
  checked: boolean,
  height: number,
  borderHeight: number,
  expanded: boolean,
  expandHeight: number,
  parent?: Key,
  children: TableRowState[],
  depth: number,
  treeExpanded: boolean,
  partial: boolean,
  dragging: boolean,
  data: Data
}

export interface StoreOptions {
  columns: TableColumnOptions[],
  data: Data[],
  rowClass: ClassType | TableRowPropFn<ClassType>,
  rowStyle: StyleType | TableRowPropFn<StyleType>,
  rowAttrs: Record<string, any> | TableRowPropFn<Record<string, any>>,
  cellClass: ClassType | TableCellPropFn<ClassType>,
  cellStyle: StyleType | TableCellPropFn<StyleType>,
  cellAttrs: Record<string, any> | TableCellPropFn<Record<string, any>>,
  headClass: ClassType | TableHeadPropFn<ClassType>,
  headStyle: StyleType | TableHeadPropFn<StyleType>,
  headAttrs: Record<string, any> | TableHeadPropFn<Record<string, any>>,
  dataKey: string,
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
  colResizable: boolean,
  expandRenderer: ExpandRenderFn | null,
  cellSpan: CellSpanFn | null
}

export interface StoreState extends StoreOptions {
  columns: ColumnWithKey[],
  rowData: TableRowState[],
  width: number,
  rightFixedColumns: ColumnWithKey[],
  leftFixedColumns: ColumnWithKey[],
  rowMap: Map<Key, TableRowState>,
  idMaps: WeakMap<Data, Key>,
  checkedAll: boolean,
  partial: boolean,
  widths: Map<Key, number>,
  sorters: Map<Key, ParsedTableSorterOptions>,
  filters: Map<Key, ParsedFilterOptions>,
  resized: Set<Key>,
  bodyScroll: number,
  padTop: number,
  startRow: number,
  endRow: number,
  dragging: boolean,
  heightBITree: BITree,
  virtualData: TableRowState[],
  totalHeight: number,
  colResizing: boolean,
  resizeLeft: number
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

export interface TableActions {
  increaseColumn(column: TableColumnOptions): void,
  decreaseColumn(column: TableColumnOptions): void,
  getTableElement(): HTMLElement | undefined,
  refreshXScroll(): void,
  emitRowCheck(payload: TableRowPayload & { checked: boolean }): void,
  emitAllRowCheck(checked: boolean, partial: boolean): void,
  emitRowExpand(payload: TableRowPayload & { expanded: boolean }): void,
  emitRowFilter(): void,
  emitRowSort(): void,
  handleRowDragStart(rowInstance: TableRowInstance, event: DragEvent): void,
  handleRowDragOver(rowInstance: TableRowInstance, event: DragEvent): void,
  handleRowDrop(rowInstance: TableRowInstance, event: DragEvent): void,
  handleRowDragEnd(event: DragEvent): void,
  emitRowEvent(type: MouseEventType, payload: TableRowPayload): void,
  emitCellEvent(type: MouseEventType, payload: TableCellPayload): void,
  emitHeadEvent(type: MouseEventType, payload: TableHeadPayload): void,
  emitColResize(type: MoveEventType, payload: TableColResizePayload): void
}

export const DEFAULT_KEY_FIELD = 'id'
/**
 * 表格状态管理
 */
export const TABLE_STORE: InjectionKey<TableStore> = Symbol('TABLE_STORE')
/**
 * 表格组件的顶层 Api
 */
export const TABLE_ACTIONS: InjectionKey<TableActions> = Symbol('TABLE_ACTIONS')
export const TABLE_HEAD_KEY = Symbol('TABLE_HEAD_KEY')

export const columnTypes: TableColumnType[] = ['order', 'selection', 'expand', 'drag']
