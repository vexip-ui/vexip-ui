import TableColumnGroup from '../table/table-column-group'

import type { ComponentPublicInstance } from 'vue'

export { TableColumnGroup }
export { tableColumnGroupProps } from '../table/props'

export type TableColumnGroupExposed = ComponentPublicInstance &
InstanceType<typeof TableColumnGroup>
export type { TableColumnGroupProps, TableColumnGroupCProps } from '../table/props'
