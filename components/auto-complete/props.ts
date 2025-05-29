import {
  booleanProp,
  booleanStringProp,
  buildProps,
  eventProp,
  iconProp,
  localeProp,
  sizeProp,
  stateProp,
} from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps, EventListener } from '@vexip-ui/config'
import type { Placement } from '@vexip-ui/hooks'
import type {
  AutoCompleteFilter,
  AutoCompleteKeyConfig,
  AutoCompleteRawOption,
  AutoCompleteSlots,
  ChangeEvent,
  EnterEvent,
} from './symbol'

export const autoCompleteProps = buildProps({
  size: sizeProp,
  state: stateProp,
  locale: localeProp('input'),
  transfer: booleanStringProp,
  value: [String, Number],
  options: Array as PropType<AutoCompleteRawOption[]>,
  filter: {
    type: [Boolean, Function] as PropType<boolean | AutoCompleteFilter>,
    default: null,
  },
  prefix: iconProp,
  prefixColor: String,
  suffix: iconProp,
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
  loadingIcon: iconProp,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  transparent: booleanProp,
  debounce: booleanProp,
  delay: Number,
  keyConfig: Object as PropType<Omit<AutoCompleteKeyConfig, 'label'>>,
  showEmpty: booleanProp,
  name: String,
  popperAlive: booleanProp,
  slots: Object as PropType<AutoCompleteSlots>,
  shift: booleanProp,
  onFocus: eventProp<(event: FocusEvent) => void>(),
  onBlur: eventProp<(event: FocusEvent) => void>(),
  onSelect: eventProp<EventListener<ChangeEvent>>(),
  onInput: eventProp<(value: string) => void>(),
  onChange: eventProp<EventListener<ChangeEvent>>(),
  onToggle: eventProp<(visible: boolean) => void>(),
  onEnter: eventProp<EventListener<EnterEvent>>(),
  onClear: eventProp(),
})

export type AutoCompleteProps = ExtractPropTypes<typeof autoCompleteProps>
export type AutoCompleteCProps = ConfigurableProps<ExtractPropTypes<typeof autoCompleteProps>>
