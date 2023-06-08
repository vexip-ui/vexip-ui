import type {
  Data,
  TableColumnOptions,
  TableFilterOptions,
  TableSorterOptions,
  TableSummaryOptions
} from './symbol'

export function defineFilter<D = Data, Val extends string | number = string | number>(
  filter: TableFilterOptions<D, Val>
) {
  return filter
}

export function defineSorter<D = Data>(sorter: TableSorterOptions<D>) {
  return sorter
}

export function defineColumn<D = Data, Val extends string | number = string | number>(
  column: TableColumnOptions<D, Val>
) {
  return column
}

export function defineColumns<D = Data, Val extends string | number = string | number>(
  columns: TableColumnOptions<D, Val>[]
) {
  return columns
}

export function defineSummary<D = Data, Val extends string | number = string | number>(
  summary: TableSummaryOptions<D, Val>
) {
  return summary
}

export function defineSummaries<D = Data, Val extends string | number = string | number>(
  summaries: TableSummaryOptions<D, Val>[]
) {
  return summaries
}
