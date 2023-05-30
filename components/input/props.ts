import {
  booleanProp,
  buildProps,
  classProp,
  eventProp,
  localeProp,
  sizeProp,
  stateProp
} from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { InputType } from './symbol'

type ChangeListener =
  | ((value: string | number) => void)
  | ((value: string) => void)
  | ((value: number) => void)

export const inputProps = buildProps({
  size: sizeProp,
  state: stateProp,
  locale: localeProp('input'),
  type: String as PropType<InputType>,
  prefix: Object,
  prefixColor: String,
  suffix: Object,
  suffixColor: String,
  formatter: Function as PropType<(value: string | number) => string | number>,
  value: [String, Number],
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
  // 是否显示切换 password 为明文的按钮
  plainPassword: booleanProp,
  clearable: booleanProp,
  loading: booleanProp,
  loadingIcon: Object,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  transparent: booleanProp,
  sync: booleanProp,
  onFocus: eventProp<(event: FocusEvent) => void>(),
  onBlur: eventProp<(event: FocusEvent) => void>(),
  onInput: eventProp<ChangeListener>(),
  onChange: eventProp<ChangeListener>(),
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
