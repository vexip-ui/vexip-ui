import Cell from '../grid/cell'

import type { ComponentPublicInstance } from 'vue'

export { Cell }
export { cellProps } from '../grid/props'

export type CellExposed = ComponentPublicInstance & InstanceType<typeof Cell>

export type { CellProps, CellCProps } from '../grid/props'
export type { CellOptions } from '../grid/symbol'
