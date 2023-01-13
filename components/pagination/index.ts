import Pagination from './pagination.vue'

export { Pagination }
export type PaginationExposed = InstanceType<typeof Pagination>

export type { PaginationProps, PaginationCProps } from './props'
export type { PaginationPlugin } from './symbol'
