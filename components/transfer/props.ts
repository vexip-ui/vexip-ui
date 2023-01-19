import { buildProps, booleanProp, stateProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { TransferKeyConfig, TransferOptionState } from './symbol'

export type RawOption = string | Record<string, any>
export type Values = (string | number)[]
export type FilterHandler = (
  value: string,
  options: TransferOptionState,
  type: 'source' | 'target'
) => boolean
export type SelectHandler = (
  type: 'source' | 'target',
  selected: { source: Values, target: Values },
  data: { source: RawOption[], target: RawOption[] }
) => void

export const transferProps = buildProps({
  state: stateProp,
  options: Array as PropType<RawOption[]>,
  value: Array as PropType<Values>,
  disabled: booleanProp,
  paged: booleanProp,
  filter: {
    type: [Boolean, Function] as PropType<boolean | FilterHandler>,
    default: null
  },
  emptyText: String,
  keyConfig: Object as PropType<TransferKeyConfig>,
  optionHeight: Number,
  ignoreCase: booleanProp,
  sourceTitle: String,
  targetTitle: String,
  deepState: booleanProp,
  loading: booleanProp,
  loadingIcon: Object,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  onChange: eventProp<(values: Values) => void>(),
  onSelect: eventProp<SelectHandler>()
})

export type TransferProps = ExtractPropTypes<typeof transferProps>
export type TransferCProps = ConfigurableProps<TransferProps>
