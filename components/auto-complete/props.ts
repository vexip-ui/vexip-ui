import {
  booleanProp,
  booleanStringProp,
  buildProps,
  eventProp,
  localeProp,
  sizeProp,
  stateProp
} from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { Placement } from '@vexip-ui/hooks'
import type { AutoCompleteFilter, AutoCompleteKeyConfig, AutoCompleteRawOption } from './symbol'

type ChangeListener =
  | ((value: string | number, data: AutoCompleteRawOption) => void)
  | ((value: string, data: AutoCompleteRawOption) => void)
  | ((value: number, data: AutoCompleteRawOption) => void)
type EnterListener =
  | ((value: string | number) => void)
  | ((value: string) => void)
  | ((value: number) => void)

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
  onSelect: eventProp<ChangeListener>(),
  onInput: eventProp<(value: string) => void>(),
  onChange: eventProp<ChangeListener>(),
  onToggle: eventProp<(visible: boolean) => void>(),
  onEnter: eventProp<EnterListener>(),
  onClear: eventProp()
})

export type AutoCompleteProps = ExtractPropTypes<typeof autoCompleteProps>
export type AutoCompleteCProps = ConfigurableProps<ExtractPropTypes<typeof autoCompleteProps>>
