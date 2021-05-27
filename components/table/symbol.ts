import type { VNodeChild } from 'vue'
import type { ComponentSize } from '@/common/config/props'

export type Key = string | number
export type Data = Record<string, unknown>
export type ClassType = string | Record<string, boolean>
export type RowClassFn = (data: Data, index: number) => ClassType
export type Accessor = (data: Data, index: number) => unknown
export type RenderFn = (data: Data) => VNodeChild

export type ColumnType = 'order' | 'selection' | 'expand'

export interface FilterOptions {
  able: boolean,
  multiple: boolean,
  active: null | string | number | (string | number)[],
  options: (string | { value: string | number, label?: string, active?: boolean })[],
  method: null | ((active: string | number | (string | number)[], data: Data) => boolean)
}

export interface ParsedFilterOptions extends Omit<FilterOptions, 'options'> {
  options: { value: string | number, label: string, active: boolean }[]
}

export interface SorterOptions {
  able: boolean,
  type: null | 'asc' | 'desc',
  order: number, // 优先级
  method: null | ((prev: Data, next: Data) => number)
}

export interface BaseColumn {
  name: string,
  key?: Key,
  fixed?: boolean | 'left' | 'right',
  className?: ClassType,
  width?: number,
  filter?: Partial<FilterOptions>,
  sorter?: Partial<SorterOptions>,
  order?: number,
  accessor?: Accessor,
  renderer?: RenderFn,
  headRenderer?: RenderFn
}

export interface OrderColumn extends BaseColumn {
  type: 'order',
  truthIndex?: boolean,
  orderLabel?: (index: number) => string | number
}

export interface SelectionColumn extends BaseColumn {
  type: 'selection',
  checkboxSize?: ComponentSize,
  disableRow?: (data: Data) => boolean
}

export interface ExpandColumn extends BaseColumn {
  type: 'expand',
  disableRow?: (data: Data) => boolean
}

export type TypeColumn = OrderColumn | SelectionColumn | ExpandColumn
export type ColumnOptions = BaseColumn | TypeColumn
export type ColumnWithKey = ColumnOptions & { key: Key }

export interface StoreOptions {
  columns: ColumnOptions[],
  data: Data[],
  rowClass: ClassType | RowClassFn,
  dataKey: string,
  highlight: boolean,
  renderCount: number,
  currentPage: number,
  pageSize: number,
  rowHeight: number,
  rowDraggable: boolean
}

export interface RowState {
  key: Key,
  index: number,
  hidden: boolean,
  hover: boolean,
  checked: boolean,
  height: number,
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
  sorters: Record<Key, SorterOptions>,
  filters: Record<Key, ParsedFilterOptions>,
  bodyScroll: number,
  hiddenHeight: number,
  startRow: number,
  endRow: number
}

export interface StoreGetters {
  readonly filteredData: RowState[],
  readonly processedData: RowState[],
  readonly totalRowHeight: number,
  readonly disableCheckRows: Record<Key, boolean>,
  readonly disableExpandRows: Record<Key, boolean>
}

export interface RowInstance {
  el: HTMLElement | null,
  row: RowState
}

export interface TableAction {
  increaseColumn(column: ColumnOptions): void,
  decreaseColumn(column: ColumnOptions): void,
  emitRowClick(data: Data, key: Key, index: number): void,
  emitRowCheck(data: Data, checked: boolean, key: Key, index: number): void,
  emitAllRowCheck(checked: boolean): void,
  emitRowExpand(data: Data, expanded: boolean, key: Key, index: number): void,
  emitRowFilter(): void,
  handleRowDragStart(rowInstance: RowInstance): void,
  handleRowDragOver(rowInstance: RowInstance, event: DragEvent): void,
  handleRowDrop(rowInstance: RowInstance): void,
  handleRowDragEnd(): void
}

export const DEFAULT_KEY_FIELD = 'id'
export const TABLE_STORE = Symbol('TABLE_STORE') // 表格状态管理
export const TABLE_ACTION = Symbol('TABLE_ACTION') // 表格组件的顶层 Api
