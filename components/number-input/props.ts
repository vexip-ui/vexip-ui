import {
  buildProps,
  booleanProp,
  sizeProp,
  stateProp,
  classProp,
  eventProp
} from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps } from '@vexip-ui/config'

export const numberInputProps = buildProps({
  size: sizeProp,
  state: stateProp,
  prefix: Object,
  prefixColor: String,
  suffix: Object,
  suffixColor: String,
  /**
   * 格式化后显示
   */
  formatter: Function as PropType<(value: number) => string>,
  value: Number,
  min: Number,
  max: Number,
  placeholder: String,
  autofocus: booleanProp,
  spellcheck: booleanProp,
  autocomplete: booleanProp,
  precision: Number,
  readonly: booleanProp,
  step: Number,
  ctrlStep: Number,
  shiftStep: Number,
  altStep: Number,
  disabled: booleanProp,
  inputClass: classProp,
  debounce: booleanProp,
  clearable: booleanProp,
  loading: booleanProp,
  loadingIcon: Object,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  sync: booleanProp,
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
  onKeyUp: eventProp<(event: KeyboardEvent) => void>()
})

export type NumberInputProps = ExtractPropTypes<typeof numberInputProps>
export type NumberInputCProps = ConfigurableProps<NumberInputProps>
