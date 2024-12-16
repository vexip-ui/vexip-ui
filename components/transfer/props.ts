import {
  booleanProp,
  buildProps,
  eventProp,
  iconProp,
  localeProp,
  stateProp
} from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { TransferFilter, TransferKeyConfig, TransferSlots } from './symbol'

export type RawOption = string | Record<string, any>
export type Values = (string | number)[]

export type SelectHandler = (
  type: 'source' | 'target',
  selected: { source: Values, target: Values },
  data: { source: RawOption[], target: RawOption[] }
) => void

export const transferProps = buildProps({
  state: stateProp,
  locale: localeProp('transfer'),
  options: Array as PropType<RawOption[]>,
  value: Array as PropType<Values>,
  disabled: booleanProp,
  paged: booleanProp,
  filter: {
    type: [Boolean, Function] as PropType<boolean | TransferFilter>,
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
  loadingIcon: iconProp,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  slots: Object as PropType<TransferSlots>,
  onChange: eventProp<(values: Values) => void>(),
  onSelect: eventProp<SelectHandler>()
})

export type TransferProps = ExtractPropTypes<typeof transferProps>
export type TransferCProps = ConfigurableProps<TransferProps>
