import { booleanProp, buildProps, eventProp, localeProp, sizeProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { PaginationPlugin, PaginationSlots } from './symbol'

export const paginationProps = buildProps({
  size: sizeProp,
  locale: localeProp('pagination'),
  total: Number,
  noBorder: booleanProp,
  background: booleanProp,
  pageSize: Number,
  sizeOptions: Array as PropType<number[]>,
  itemCount: Number,
  active: Number,
  disabled: booleanProp,
  disableItem: Function as PropType<(page: number) => boolean>,
  turnPageCount: Number,
  itemUnit: String,
  plugins: Array as PropType<(PaginationPlugin | undefined | null)[]>,
  noTitle: booleanProp,
  itemTag: String,
  listTag: String,
  slots: Object as PropType<PaginationSlots>,
  onChange: eventProp<(page: number) => void>(),
  onPageSizeChange: eventProp<(size: number) => void>(),
})

export type PaginationProps = ExtractPropTypes<typeof paginationProps>
export type PaginationCProps = ConfigurableProps<PaginationProps, 'total'>
