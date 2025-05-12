import Table from './table.vue'

import type { ComponentPublicInstance } from 'vue'

export { Table }
export { tableProps } from './props'
export {
  defineTableFilter,
  defineTableSorter,
  defineTableColumn,
  defineTableColumns,
  defineTableSummary,
  defineTableSummaries,

  // legacies
  defineFilter,
  defineSorter,
  defineColumn,
  defineColumns,
  defineSummary,
  defineSummaries,
} from './helper'

export type TableExposed = ComponentPublicInstance & InstanceType<typeof Table>

export type { TableProps, TableCProps } from './props'
export type {
  TableKeyConfig,
  TableIconName,
  TableIcons,
  TableSlots,
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
  TableColumnRawOptions,
  TableCellPropFn,
  TableHeadPropFn,
  TableRowPayload,
  TableCellPayload,
  TableHeadPayload,
  TableColResizePayload,
  TableCellSpanFn,
  TableSummaryOptions,
  TableSummaryData,
} from './symbol'
