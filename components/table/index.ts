import Table from './table.vue'

export { Table }
export { tableProps } from './props'

export type TableExposed = InstanceType<typeof Table>

export { defineFilter, defineSorter, defineColumn, defineColumns } from './helper'
export type { TableProps, TableCProps } from './props'
export type {
  TableKeyConfig,
  TableRowPropFn,
  TableRowDropType,
  TableColumnType,
  TableFilterOptions,
  TableSorterOptions,
  TableFilterProfile,
  TableSorterProfile,
  TableBaseColumn,
  TableOrderColumn,
  TableSelectionColumn,
  TableExpandColumn,
  TableTypeColumn,
  TableColumnOptions,
  TableCellPropFn,
  TableHeadPropFn,
  TableRowPayload,
  TableCellPayload,
  TableHeadPayload,
  TableColResizePayload,
  TableCellSpanFn
} from './symbol'
