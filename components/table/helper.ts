import type { FilterOptions, ColumnOptions } from './symbol'

export function defineFilter<T extends string | number, D>(filter: FilterOptions<T, D>) {
  return filter
}

export function defineColumn<T extends string | number, D>(column: ColumnOptions<T, D>) {
  return column
}

export function defineColumns<T extends string | number, D>(columns: ColumnOptions<T, D>[]) {
  return columns
}
