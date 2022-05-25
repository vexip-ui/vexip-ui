import type { InjectionKey } from 'vue'
import type { ComponentSize } from '@vexip-ui/config'
import type { BITree } from '@vexip-ui/utils'
import type { TooltipTheme } from '@/components/tooltip'
import type { TableStore } from './store'

export type Key = string | number
export type Data = Record<string, unknown>
export type ClassType = string | Record<string, boolean>
export type RowClassFn = (data: Data, index: number) => ClassType
export type Accessor<T extends string | number = string | number, D = Data> = (
  data: D,
  index: number
) => T
export type RenderFn = (data: Data) => any

export type ColumnType = 'order' | 'selection' | 'expand'

// export interface FilterOptions {
//   able: boolean,
//   options: (string | { value: string | number, label?: string, active?: boolean })[],
//   multiple?: boolean,
//   active?: null | FilterActive,
//   method?: null | ((active: FilterActive, data: Data) => boolean)
// }

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
  key?: Key,
  metaData?: Data,
  fixed?: boolean | 'left' | 'right',
  className?: ClassType,
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
export type ColumnOptions<T extends string | number = string | number, D = Data> =
  | BaseColumn<T, D>
  | TypeColumn<T, D>
export type ColumnWithKey<T extends string | number = string | number, D = Data> = ColumnOptions<
  T,
  D
> & { key: Key }

export type ColumnProfile<T extends string | number = string | number, D = Data> = Pick<ColumnWithKey<T, D>, 'name' | 'key' | 'metaData'>

export type FilterProfile<T extends string | number = string | number, D = Data> = ColumnProfile<T, D> & {
  active: T | T[]
}
export type SorterProfile<T extends string | number = string | number, D = Data> = ColumnProfile<T, D> & {
  type: 'asc' | 'desc'
}

export interface StoreOptions {
  columns: ColumnOptions[],
  data: Data[],
  rowClass: ClassType | RowClassFn,
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
  expandRenderer: RenderFn | null
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
  virtualData: RowState[]
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
  emitRowEnter(data: Data, key: Key, index: number): void,
  emitRowLeave(data: Data, key: Key, index: number): void,
  emitRowClick(data: Data, key: Key, index: number): void,
  emitRowCheck(data: Data, checked: boolean, key: Key, index: number): void,
  emitAllRowCheck(checked: boolean, partial: boolean): void,
  emitRowExpand(data: Data, expanded: boolean, key: Key, index: number): void,
  emitRowFilter(): void,
  emitRowSort(): void,
  handleRowDragStart(rowInstance: RowInstance): void,
  handleRowDragOver(rowInstance: RowInstance, event: DragEvent): void,
  handleRowDrop(rowInstance: RowInstance): void,
  handleRowDragEnd(): void
}

export const DEFAULT_KEY_FIELD = 'id'
export const TABLE_STORE: InjectionKey<TableStore> = Symbol('TABLE_STORE') // 表格状态管理
export const TABLE_ACTION: InjectionKey<TableAction> = Symbol('TABLE_ACTION') // 表格组件的顶层 Api
