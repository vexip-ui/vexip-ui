import type { InjectionKey } from 'vue'
import type { ComponentSize, ClassType, StyleType, LocaleConfig } from '@vexip-ui/config'
import type { BITree } from '@vexip-ui/utils'
import type { TooltipTheme } from '@/components/tooltip'
import type { TableStore } from './store'

export type Key = string | number | symbol
export type Data = Record<string, any>
export type RowPropFn<P = any> = (data: Data, index: number) => P
export type DropType = 'before' | 'after' | 'none'

export interface TableKeyConfig {
  id?: string,
  checked?: string,
  height?: string,
  expanded?: string
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

export type TableColumnType = 'order' | 'selection' | 'expand'

export type FilterOptions<D = Data, Val extends string | number = string | number> =
  | {
    able?: boolean,
    options: (string | { value: Val, label?: string, active?: boolean })[],
    multiple?: false,
    active?: null | Val,
    method?: null | ((active: Val, data: D) => boolean)
  }
  | {
    able?: boolean,
    options: (string | { value: Val, label?: string, active?: boolean })[],
    multiple: true,
    active?: null | Val[],
    method?: null | ((active: Val[], data: D) => boolean)
  }

export interface ParsedFilterOptions extends Omit<Required<FilterOptions>, 'options'> {
  options: { value: string | number, label: string, active: boolean }[]
}

export interface SorterOptions<D = Data> {
  able?: boolean,
  type?: null | 'asc' | 'desc',
  order?: number, // 优先级
  method?: null | ((prev: D, next: D) => number)
}

export type ParsedSorterOptions = Required<SorterOptions>

export interface BaseColumn<D = Data, Val extends string | number = string | number> {
  name: string,
  key?: keyof D,
  metaData?: Data,
  fixed?: boolean | 'left' | 'right',
  className?: ClassType,
  style?: StyleType,
  attrs?: Record<string, any>,
  width?: number,
  filter?: FilterOptions<D, Val>,
  sorter?: boolean | SorterOptions<D>,
  order?: number,
  noEllipsis?: boolean,
  accessor?: Accessor<D, Val>,
  renderer?: RenderFn,
  headRenderer?: RenderFn
}

export interface OrderColumn<D = Data, Val extends string | number = string | number>
  extends BaseColumn<D, Val> {
  type: 'order',
  truthIndex?: boolean,
  orderLabel?: (index: number) => string | number
}

export interface SelectionColumn<D = Data, Val extends string | number = string | number>
  extends BaseColumn<D, Val> {
  type: 'selection',
  checkboxSize?: ComponentSize,
  disableRow?: (data: Data) => boolean
}

export interface ExpandColumn<D = Data, Val extends string | number = string | number>
  extends BaseColumn<D, Val> {
  type: 'expand',
  disableRow?: (data: Data) => boolean
}

export type TypeColumn<D = Data, Val extends string | number = string | number> =
  | OrderColumn<D, Val>
  | SelectionColumn<D, Val>
  | ExpandColumn<D, Val>
export type TableColumnOptions<D = Data, Val extends string | number = string | number> =
  | BaseColumn<D, Val>
  | TypeColumn<D, Val>
export type ColumnWithKey<
  D = Data,
  Val extends string | number = string | number
> = TableColumnOptions<D, Val> & { key: Key }

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

export type ColumnProfile<D = Data, Val extends string | number = string | number> = Pick<
  ColumnWithKey<D, Val>,
  'name' | 'key' | 'metaData'
>
export type FilterProfile<D = Data, Val extends string | number = string | number> = ColumnProfile<
  D,
  Val
> & {
  active: Val | Val[]
}
export type SorterProfile<D = Data, Val extends string | number = string | number> = ColumnProfile<
  D,
  Val
> & {
  type: 'asc' | 'desc',
  order: number
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
  locale: LocaleConfig['table'],
  tooltipTheme: TooltipTheme,
  tooltipWidth: number | string,
  singleSorter: boolean,
  singleFilter: boolean,
  customSorter: boolean,
  customFilter: boolean,
  keyConfig: Required<TableKeyConfig>,
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

export interface RowInstance {
  el?: HTMLElement | null,
  row: RowState
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

export interface TableAction {
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
  handleRowDragStart(rowInstance: RowInstance, event: DragEvent): void,
  handleRowDragOver(rowInstance: RowInstance, event: DragEvent): void,
  handleRowDrop(rowInstance: RowInstance, event: DragEvent): void,
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
export const TABLE_ACTION: InjectionKey<TableAction> = Symbol('TABLE_ACTION')

export const TABLE_HEAD_KEY = Symbol('TABLE_HEAD_KEY')
