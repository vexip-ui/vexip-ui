import Table from './table.vue'

import type { ComponentPublicInstance } from 'vue'

export { Table }
export { tableProps } from './props'
export {
  defineFilter,
  defineSorter,
  defineColumn,
  defineColumns,
  defineSummary,
  defineSummaries
} from './helper'

export type TableExposed = ComponentPublicInstance & InstanceType<typeof Table>

export type { TableProps, TableCProps } from './props'
export type {
  TableKeyConfig,
  TableIconName,
  TableIcons,
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
  TableColumnGroupOptions,
  TableCellPropFn,
  TableHeadPropFn,
  TableRowPayload,
  TableCellPayload,
  TableHeadPayload,
  TableColResizePayload,
  TableCellSpanFn,
  TableSummaryOptions,
  TableSummaryData
} from './symbol'
