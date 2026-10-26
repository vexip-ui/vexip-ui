import { buildProps } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { ColumnFlex, ColumnOptions, RowGridAlign, RowGridJustify } from './symbol'

export const rowProps = buildProps({
  tag: String,
  gap: [Number, Array] as PropType<number | number[]>,
  justify: String as PropType<RowGridJustify>,
  align: String as PropType<RowGridAlign>,
  columnFlex: {
    type: [Boolean, Object] as PropType<boolean | Partial<ColumnFlex>>,
    default: null,
  },
})

export type RowProps = ExtractPropTypes<typeof rowProps>
export type RowCProps = ConfigurableProps<RowProps>

const mediaProp = [Number, Object] as PropType<number | ColumnOptions>

export const columnProps = buildProps({
  tag: String,
  span: Number,
  offset: Number,
  push: Number,
  pull: Number,
  order: Number,
  xs: mediaProp,
  sm: mediaProp,
  md: mediaProp,
  lg: mediaProp,
  xl: mediaProp,
  xxl: mediaProp,
  flex: [Number, String],
  useFlex: {
    type: [Boolean, Object] as PropType<boolean | Partial<ColumnFlex>>,
    default: null,
  },
})

export type ColumnProps = ExtractPropTypes<typeof columnProps>
export type ColumnCProps = ConfigurableProps<ColumnProps>
