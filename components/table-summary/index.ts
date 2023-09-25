import TableSummary from '../table/table-summary'

import type { ComponentPublicInstance } from 'vue'

export { TableSummary }
export { tableSummaryProps } from '../table/props'

export type TableSummaryExposed = ComponentPublicInstance & InstanceType<typeof TableSummary>
export type { TableSummaryProps, TableSummaryCProps } from '../table/props'
