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
export type ExpandRenderFn = (data: {
  leftFixed: number,
  rightFixed: number,
  row: Data,
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
  metaData?: Data,
  fixed?: boolean | 'left' | 'right',
  type?: TableColumnType,
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
  renderer?: ColumnRenderFn<D> | ColumnRenderFn<D>[],
  headRenderer?: HeadRenderFn,
  filterRenderer?: FilterRenderFn
}

export interface TableOrderColumn<D = Data, Val extends string | number = string | number>
  extends TableBaseColumn<D, Val> {
  type: 'order',
  truthIndex?: boolean,
  orderLabel?: (index: number) => string | number
}

export interface TableSelectionColumn<D = Data, Val extends string | number = string | number>
  extends TableBaseColumn<D, Val> {
  type: 'selection',
  checkboxSize?: ComponentSize,
  disableRow?: (data: Data) => boolean
}

export interface TableExpandColumn<D = Data, Val extends string | number = string | number>
  extends TableBaseColumn<D, Val> {
  type: 'expand',
  disableRow?: (data: Data) => boolean
}

export interface TableDragColumn<D = Data, Val extends string | number = string | number>
  extends TableBaseColumn<D, Val> {
  type: 'drag',
  disableRow?: (data: Data) => boolean
}

export type TableColumnOptions<D = Data, Val extends string | number = string | number> =
  | TableBaseColumn<D, Val>
  | TableOrderColumn<D, Val>
  | TableSelectionColumn<D, Val>
  | TableExpandColumn<D, Val>
  | TableDragColumn<D, Val>

export type ColumnWithKey<
  D = Data,
  Val extends string | number = string | number
> = TableColumnOptions<D, Val> & {
  key: Key,
  /** @internal */
  first?: boolean
}

export type ColumnRenderFn<D = any> = (data: {
  row: D,
  rowIndex: number,
  column: TableColumnOptions,
  columnIndex: number
}) => any
export type HeadRenderFn = (data: { column: TableColumnOptions, index: number }) => any
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
  expandRenderer: ExpandRenderFn | null
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
  bodyScroll: number,
  padTop: number,
  startRow: number,
  endRow: number,
  dragging: boolean,
  heightBITree: BITree,
  virtualData: TableRowState[],
  totalHeight: number
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

export interface TableActions {
  increaseColumn(column: TableColumnOptions): void,
  decreaseColumn(column: TableColumnOptions): void,
  emitRowEnter(payload: TableRowPayload): void,
  emitRowLeave(payload: TableRowPayload): void,
  emitRowClick(payload: TableRowPayload): void,
  emitRowDblclick(payload: TableRowPayload): void,
  emitRowContextmenu(payload: TableRowPayload): void,
  emitRowCheck(payload: TableRowPayload & { checked: boolean }): void,
  emitAllRowCheck(checked: boolean, partial: boolean): void,
  emitRowExpand(payload: TableRowPayload & { expanded: boolean }): void,
  emitRowFilter(): void,
  emitRowSort(): void,
  handleRowDragStart(rowInstance: TableRowInstance, event: DragEvent): void,
  handleRowDragOver(rowInstance: TableRowInstance, event: DragEvent): void,
  handleRowDrop(rowInstance: TableRowInstance, event: DragEvent): void,
  handleRowDragEnd(event: DragEvent): void,
  emitCellEnter(payload: TableCellPayload): void,
  emitCellLeave(payload: TableCellPayload): void,
  emitCellClick(payload: TableCellPayload): void,
  emitCellDblclick(payload: TableCellPayload): void,
  emitCellContextmenu(payload: TableCellPayload): void,
  emitHeadEnter(payload: TableHeadPayload): void,
  emitHeadLeave(payload: TableHeadPayload): void,
  emitHeadClick(payload: TableHeadPayload): void,
  emitHeadDblclick(payload: TableHeadPayload): void,
  emitHeadContextmenu(payload: TableHeadPayload): void
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
