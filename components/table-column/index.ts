import TableColumn from '../table/table-column'

import type { ComponentPublicInstance } from 'vue'

export { TableColumn }
export { tableColumnProps } from '../table/props'

export type TableColumnExposed = ComponentPublicInstance & InstanceType<typeof TableColumn>
export type { TableColumnProps, TableColumnCProps } from '../table/props'
