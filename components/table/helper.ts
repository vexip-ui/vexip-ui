export function defineFilter<T extends string | number, D>(filter: FilterOptions<T, D>) {
  return filter
}

export function defineSorter<D>(sorter: SorterOptions<D>) {
  return sorter
}

export function defineColumn<T extends string | number, D>(column: TableColumnOptions<T, D>) {
  return column
}

export function defineColumns<T extends string | number, D>(columns: TableColumnOptions<T, D>[]) {
  return columns
}
