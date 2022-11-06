import { buildProps, booleanProp, sizeProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { PaginationPlugin } from './symbol'

export const paginationProps = buildProps({
  size: sizeProp,
  total: Number,
  noBorder: booleanProp,
  background: booleanProp,
  pageSize: Number,
  sizeOptions: Array as PropType<number[]>,
  maxCount: Number,
  active: Number,
  disabled: booleanProp,
  disableItem: Function as PropType<(page: number) => boolean>,
  turnPageCount: Number,
  pageJump: booleanProp,
  pageCount: booleanProp,
  pageTotal: booleanProp,
  itemUnit: String,
  plugins: Array as PropType<(PaginationPlugin | undefined | null)[]>,
  noTitle: booleanProp,
  onChange: eventProp<(page: number) => void>(),
  onPageSizeChange: eventProp<(size: number) => void>()
})

export type PaginationProps = ExtractPropTypes<typeof paginationProps>
export type PaginationCProps = ConfigurableProps<PaginationProps, 'total'>
