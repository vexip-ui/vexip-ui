import type { Data, FilterOptions, SorterOptions, TableColumnOptions } from './symbol'

export function defineFilter<D = Data, Val extends string | number = string | number>(
  filter: FilterOptions<D, Val>
) {
  return filter
}

export function defineSorter<D = Data>(sorter: SorterOptions<D>) {
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
