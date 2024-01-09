import type {
  Data,
  TableColumnOptions,
  TableFilterOptions,
  TableSorterOptions,
  TableSummaryOptions
} from './symbol'

export function defineTableFilter<D = Data, Val extends string | number = string | number>(
  filter: TableFilterOptions<D, Val>
) {
  return filter as TableFilterOptions<any, any>
}

export function defineTableSorter<D = Data>(sorter: TableSorterOptions<D>) {
  return sorter as TableSorterOptions<any>
}

export function defineTableColumn<D = Data, Val extends string | number = string | number>(
  column: TableColumnOptions<D, Val>
) {
  return column
}

export function defineTableColumns<D = Data, Val extends string | number = string | number>(
  columns: TableColumnOptions<D, Val>[]
) {
  return columns
}

export function defineTableSummary<D = Data, Val extends string | number = string | number>(
  summary: TableSummaryOptions<D, Val>
) {
  return summary
}

export function defineTableSummaries<D = Data, Val extends string | number = string | number>(
  summaries: TableSummaryOptions<D, Val>[]
) {
  return summaries
}

export {
  /** @deprecated Please use `defineTableFilter` to replace it */
  defineTableFilter as defineFilter,
  /** @deprecated Please use `defineTableSorter` to replace it */
  defineTableSorter as defineSorter,
  /** @deprecated Please use `defineTableColumn` to replace it */
  defineTableColumn as defineColumn,
  /** @deprecated Please use `defineTableColumns` to replace it */
  defineTableColumns as defineColumns,
  /** @deprecated Please use `defineTableSummary` to replace it */
  defineTableSummary as defineSummary,
  /** @deprecated Please use `defineTableSummaries` to replace it */
  defineTableSummaries as defineSummaries
}
