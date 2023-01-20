import {
  buildProps,
  booleanProp,
  booleanStringProp,
  sizeProp,
  stateProp,
  eventProp,
  localeProp
} from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { Placement } from '@vexip-ui/hooks'
import type { AutoCompleteKeyConfig, AutoCompleteRawOption, AutoCompleteFilter } from './symbol'

export const autoCompleteProps = buildProps({
  size: sizeProp,
  state: stateProp,
  locale: localeProp('input'),
  transfer: booleanStringProp,
  value: [String, Number],
  options: Array as PropType<AutoCompleteRawOption[]>,
  filter: {
    type: [Boolean, Function] as PropType<boolean | AutoCompleteFilter>,
    default: null
  },
  prefix: Object,
  prefixColor: String,
  suffix: Object,
  suffixColor: String,
  placeholder: String,
  disabled: booleanProp,
  transitionName: String,
  dropDisabled: booleanProp,
  placement: String as PropType<Placement>,
  clearable: booleanProp,
  ignoreCase: booleanProp,
  autofocus: booleanProp,
  spellcheck: booleanProp,
  loading: booleanProp,
  loadingIcon: Object,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  transparent: booleanProp,
  keyConfig: Object as PropType<Omit<AutoCompleteKeyConfig, 'label'>>,
  onSelect: eventProp<(value: string | number, data: AutoCompleteRawOption) => void>(),
  onInput: eventProp<(value: string) => void>(),
  onChange: eventProp<(value: string | number, data: AutoCompleteRawOption) => void>(),
  onToggle: eventProp<(visible: boolean) => void>(),
  onEnter: eventProp<(value: string | number) => void>(),
  onClear: eventProp()
})

export type AutoCompleteProps = ExtractPropTypes<typeof autoCompleteProps>
export type AutoCompleteCProps = ConfigurableProps<ExtractPropTypes<typeof autoCompleteProps>>
