import { booleanProp, buildProps } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { CellFlex, CellOptions, GridAlign, GridJustify, LayoutProp } from './symbol'

const layoutProp = [Number, String, Array] as PropType<LayoutProp>

export const gridProps = buildProps({
  tag: String,
  gap: [Number, Array] as PropType<number | number[]>,
  rows: layoutProp,
  columns: layoutProp,
  autoRows: layoutProp,
  autoColumns: layoutProp,
  dense: booleanProp,
  justify: String as PropType<GridJustify>,
  align: String as PropType<GridAlign>,
  cellFlex: {
    type: [Boolean, Object] as PropType<boolean | Partial<CellFlex>>,
    default: null
  }
})

export type GridProps = ExtractPropTypes<typeof gridProps>
export type GridCProps = ConfigurableProps<GridProps>

const mediaProp = [Number, Object] as PropType<CellOptions>

export const cellProps = buildProps({
  tag: String,
  top: [Number, String],
  left: [Number, String],
  width: Number,
  height: Number,
  right: [Number, String],
  bottom: [Number, String],
  xs: mediaProp,
  sm: mediaProp,
  md: mediaProp,
  lg: mediaProp,
  xl: mediaProp,
  xxl: mediaProp,
  useFlex: {
    type: [Boolean, Object] as PropType<boolean | Partial<CellFlex>>,
    default: null
  }
})

export type CellProps = ExtractPropTypes<typeof cellProps>
export type CellCProps = ConfigurableProps<CellProps>
