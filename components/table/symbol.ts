import type { InjectionKey } from 'vue'
import type { ComponentSize, ClassType, StyleType } from '@vexip-ui/config'
import type { BITree } from '@vexip-ui/utils'
import type { TooltipTheme } from '@/components/tooltip'
import type { TableStore } from './store'

export type Key = string | number | symbol
export type Data = Record<string, unknown>
export type RowPropFn<P = any> = (data: Data, index: number) => P

export type Accessor<T extends string | number = string | number, D = Data> = (
  data: D,
  index: number
) => T
export type RenderFn = (data: Data) => any
export type ExpandRenderFn = (data: {
  leftFixed: number,
  rightFixed: number,
  row: Data,
  rowIndex: number
}) => any

export type TableColumnType = 'order' | 'selection' | 'expand'

export type FilterOptions<T extends string | number = string | number, D = Data> =
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

export interface ParsedFilterOptions extends Omit<Required<FilterOptions>, 'options'> {
  options: { value: string | number, label: string, active: boolean }[]
}

export interface SorterOptions<D = Data> {
  able: boolean,
  type?: null | 'asc' | 'desc',
  order?: number, // 优先级
  method?: null | ((prev: D, next: D) => number)
}

export type ParsedSorterOptions = Required<SorterOptions>

export interface BaseColumn<T extends string | number = string | number, D = Data> {
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
  renderer?: RenderFn,
  headRenderer?: RenderFn
}

export interface OrderColumn<T extends string | number = string | number, D = Data>
  extends BaseColumn<T, D> {
  type: 'order',
  truthIndex?: boolean,
  orderLabel?: (index: number) => string | number
}

export interface SelectionColumn<T extends string | number = string | number, D = Data>
  extends BaseColumn<T, D> {
  type: 'selection',
  checkboxSize?: ComponentSize,
  disableRow?: (data: Data) => boolean
}

export interface ExpandColumn<T extends string | number = string | number, D = Data>
  extends BaseColumn<T, D> {
  type: 'expand',
  disableRow?: (data: Data) => boolean
}

export type TypeColumn<T extends string | number = string | number, D = Data> =
  | OrderColumn<T, D>
  | SelectionColumn<T, D>
  | ExpandColumn<T, D>
export type TableColumnOptions<T extends string | number = string | number, D = Data> =
  | BaseColumn<T, D>
  | TypeColumn<T, D>
export type ColumnWithKey<
  T extends string | number = string | number,
  D = Data
> = TableColumnOptions<T, D> & { key: Key }

export type ColumnProfile<T extends string | number = string | number, D = Data> = Pick<
  ColumnWithKey<T, D>,
  'name' | 'key' | 'metaData'
>

export type ColumnRenderFn = (data: {
  row: any,
  rowIndex: number,
  column: TableColumnOptions,
  columnIndex: number
}) => any
export type HeadRenderFn = (data: { column: TableColumnOptions, index: number }) => any

export type CellPropFn<P = any> = (
  data: Data,
  column: ColumnWithKey,
  rowIndex: number,
  columnIndex: number
) => P
export type HeadPropFn<P = any> = (column: ColumnWithKey, index: number) => P

export type FilterProfile<T extends string | number = string | number, D = Data> = ColumnProfile<
  T,
  D
> & {
  active: T | T[]
}
export type SorterProfile<T extends string | number = string | number, D = Data> = ColumnProfile<
  T,
  D
> & {
  type: 'asc' | 'desc'
}

export interface StoreOptions {
  columns: TableColumnOptions[],
  data: Data[],
  rowClass: ClassType | RowPropFn<ClassType>,
  rowStyle: StyleType | RowPropFn<StyleType>,
  rowAttrs: Record<string, any> | RowPropFn<Record<string, any>>,
  cellClass: ClassType | CellPropFn<ClassType>,
  cellStyle: StyleType | CellPropFn<StyleType>,
  cellAttrs: Record<string, any> | CellPropFn<Record<string, any>>,
  headClass: ClassType | HeadPropFn<ClassType>,
  headStyle: StyleType | HeadPropFn<StyleType>,
  headAttrs: Record<string, any> | HeadPropFn<Record<string, any>>,
  dataKey: string,
  highlight: boolean,
  currentPage: number,
  pageSize: number,
  rowHeight: number,
  rowMinHeight: number,
  virtual: boolean,
  rowDraggable: boolean,
  emptyText: string,
  tooltipTheme: TooltipTheme,
  tooltipWidth: number | string,
  singleSorter: boolean,
  singleFilter: boolean,
  expandRenderer: ExpandRenderFn | null
}

export interface RowState {
  key: Key,
  index: number,
  hidden: boolean,
  hover: boolean,
  checked: boolean,
  height: number,
  borderHeight: number,
  expanded: boolean,
  expandHeight: number,
  data: Data
}

export interface StoreState extends StoreOptions {
  columns: ColumnWithKey[],
  rowData: RowState[],
  width: number,
  rightFixedColumns: ColumnWithKey[],
  leftFixedColumns: ColumnWithKey[],
  dataMap: Record<Key, RowState>,
  idMaps: WeakMap<Data, Key>,
  checkedAll: boolean,
  partial: boolean,
  widths: Record<Key, number>,
  sorters: Record<Key, ParsedSorterOptions>,
  filters: Record<Key, ParsedFilterOptions>,
  bodyScroll: number,
  padTop: number,
  startRow: number,
  endRow: number,
  dragging: boolean,
  heightBITree: BITree,
  virtualData: RowState[],
  totalHeight: number
}

export interface StoreGetters {
  readonly filteredData: RowState[],
  readonly processedData: RowState[],
  readonly disableCheckRows: Record<Key, boolean>,
  readonly disableExpandRows: Record<Key, boolean>
}

export interface RowInstance {
  el: HTMLElement | null,
  row: RowState
}

export interface TableRowPayload {
  row: Data,
  key: Key,
  index: number,
  event: Event
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

export interface TableAction {
  increaseColumn(column: TableColumnOptions): void,
  decreaseColumn(column: TableColumnOptions): void,
  emitRowEnter(payload: TableRowPayload): void,
  emitRowLeave(payload: TableRowPayload): void,
  emitRowClick(payload: TableRowPayload): void,
  emitRowDbclick(payload: TableRowPayload): void,
  emitRowContextmenu(payload: TableRowPayload): void,
  emitRowCheck(payload: Omit<TableRowPayload, 'event'> & { checked: boolean }): void,
  emitAllRowCheck(checked: boolean, partial: boolean): void,
  emitRowExpand(payload: Omit<TableRowPayload, 'event'> & { expanded: boolean }): void,
  emitRowFilter(): void,
  emitRowSort(): void,
  handleRowDragStart(rowInstance: RowInstance, event: DragEvent): void,
  handleRowDragOver(rowInstance: RowInstance, event: DragEvent): void,
  handleRowDrop(rowInstance: RowInstance, event: DragEvent): void,
  handleRowDragEnd(event: DragEvent): void,
  emitCellEnter(payload: TableCellPayload): void,
  emitCellLeave(payload: TableCellPayload): void,
  emitCellClick(payload: TableCellPayload): void,
  emitCellDbclick(payload: TableCellPayload): void,
  emitCellContextmenu(payload: TableCellPayload): void,
  emitHeadEnter(payload: TableHeadPayload): void,
  emitHeadLeave(payload: TableHeadPayload): void,
  emitHeadClick(payload: TableHeadPayload): void,
  emitHeadDbclick(payload: TableHeadPayload): void,
  emitHeadContextmenu(payload: TableHeadPayload): void
}

export const DEFAULT_KEY_FIELD = 'id'
export const TABLE_STORE: InjectionKey<TableStore> = Symbol('TABLE_STORE') // 表格状态管理
export const TABLE_ACTION: InjectionKey<TableAction> = Symbol('TABLE_ACTION') // 表格组件的顶层 Api
export const TABLE_HEAD_KEY = Symbol('TABLE_HEAD_KEY')
