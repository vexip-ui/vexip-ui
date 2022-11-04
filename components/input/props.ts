import {
  buildProps,
  booleanProp,
  sizeProp,
  stateProp,
  classProp,
  eventProp
} from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { InputType } from './symbol'

export const inputProps = buildProps({
  size: sizeProp,
  state: stateProp,
  type: String as PropType<InputType>,
  prefix: Object,
  prefixColor: String,
  suffix: Object,
  suffixColor: String,
  formatter: Function as PropType<(value: string) => string>,
  value: String,
  placeholder: String,
  autofocus: booleanProp,
  spellcheck: booleanProp,
  autocomplete: booleanProp,
  readonly: booleanProp,
  disabled: booleanProp,
  inputClass: classProp,
  debounce: booleanProp,
  maxLength: Number,
  before: String,
  after: String,
  // 是否显示切换 passwrod 为明文的按钮
  plainPassword: booleanProp,
  clearable: booleanProp,
  loading: booleanProp,
  loadingIcon: Object,
  loadingLock: booleanProp,
  loadingSpin: booleanProp,
  transparent: booleanProp,
  sync: booleanProp,
  onFocus: eventProp<(event: FocusEvent) => void>(),
  onBlur: eventProp<(event: FocusEvent) => void>(),
  onInput: eventProp<(value: string) => void>(),
  onChange: eventProp<(value: string) => void>(),
  onEnter: eventProp(),
  onClear: eventProp(),
  onPrefixClick: eventProp<(event: MouseEvent) => void>(),
  onSuffixClick: eventProp<(event: MouseEvent) => void>(),
  onKeyDown: eventProp<(event: KeyboardEvent) => void>(),
  onKeyPress: eventProp<(event: KeyboardEvent) => void>(),
  onKeyUp: eventProp<(event: KeyboardEvent) => void>()
})

export type InputProps = ExtractPropTypes<typeof inputProps>
export type InputCProps = ConfigurableProps<InputProps>
