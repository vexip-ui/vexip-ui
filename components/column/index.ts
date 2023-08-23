import Column from '../row/column'

import type { ComponentPublicInstance } from 'vue'

export { Column }
export { columnProps } from '../row/props'

export type ColumnExposed = ComponentPublicInstance & InstanceType<typeof Column>

export type { ColumnProps, ColumnCProps } from '../row/props'
export type { ColumnOptions } from '../row/symbol'
