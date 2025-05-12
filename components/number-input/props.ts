import {
  booleanProp,
  booleanStringProp,
  buildProps,
  classProp,
  eventProp,
  iconProp,
  localeProp,
  sizeProp,
  stateProp,
} from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { NumberInputControlType, NumberInputEmptyType, NumberInputSlots } from './symbol'

export const numberInputProps = buildProps({
  size: sizeProp,
  state: stateProp,
  locale: localeProp('numberInput'),
  prefix: iconProp,
  prefixColor: String,
  suffix: iconProp,
  suffixColor: String,
  /**
   * 格式化后显示
   */
  formatter: Function as PropType<(value: number) => number | string>,
  value: Number,
  min: Number,
  max: Number,
  placeholder: String,
  autofocus: booleanProp,
  spellcheck: booleanProp,
  autocomplete: booleanStringProp,
  precision: Number,
  readonly: booleanProp,
  step: Number,
  ctrlStep: Number,
  shiftStep: Number,
  altStep: Number,
  disabled: booleanProp,
  controlClass: classProp,
  debounce: booleanProp,
  delay: Number,
  clearable: booleanProp,
  loading: booleanProp,
  loadingIcon: iconProp,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  sync: booleanProp,
  syncStep: booleanProp,
  controlType: String as PropType<NumberInputControlType>,
  emptyType: String as PropType<NumberInputEmptyType>,
  controlAttrs: Object as PropType<Record<string, any>>,
  name: String,
  slots: Object as PropType<NumberInputSlots>,
  onFocus: eventProp<(event: FocusEvent) => void>(),
  onBlur: eventProp<(event: FocusEvent) => void>(),
  onInput: eventProp<(value: number) => void>(),
  onChange: eventProp<(value: number) => void>(),
  onEnter: eventProp(),
  onClear: eventProp(),
  onPrefixClick: eventProp<(event: MouseEvent) => void>(),
  onSuffixClick: eventProp<(event: MouseEvent) => void>(),
  onKeyDown: eventProp<(event: KeyboardEvent) => void>(),
  onKeyPress: eventProp<(event: KeyboardEvent) => void>(),
  onKeyUp: eventProp<(event: KeyboardEvent) => void>(),
})

export type NumberInputProps = ExtractPropTypes<typeof numberInputProps>
export type NumberInputCProps = ConfigurableProps<NumberInputProps>
