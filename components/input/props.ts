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
import type { ConfigurableProps, EventListener } from '@vexip-ui/config'
import type { ChangeEvent, InputSlots, InputType } from './symbol'

export const inputProps = buildProps({
  size: sizeProp,
  state: stateProp,
  locale: localeProp('input'),
  type: String as PropType<InputType>,
  prefix: iconProp,
  prefixColor: String,
  suffix: iconProp,
  suffixColor: String,
  formatter: Function as PropType<(value: string | number) => string | number>,
  value: [String, Number],
  placeholder: String,
  autofocus: booleanProp,
  spellcheck: booleanProp,
  autocomplete: booleanStringProp,
  readonly: booleanProp,
  disabled: booleanProp,
  controlClass: classProp,
  debounce: booleanProp,
  delay: Number,
  maxLength: Number,
  before: String,
  after: String,
  /**
   * 是否显示切换 password 为明文的按钮
   */
  plainPassword: booleanProp,
  clearable: booleanProp,
  loading: booleanProp,
  loadingIcon: iconProp,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  transparent: booleanProp,
  sync: booleanProp,
  controlAttrs: Object as PropType<Record<string, any>>,
  name: String,
  slots: Object as PropType<InputSlots>,
  onFocus: eventProp<(event: FocusEvent) => void>(),
  onBlur: eventProp<(event: FocusEvent) => void>(),
  onInput: eventProp<EventListener<ChangeEvent>>(),
  onChange: eventProp<EventListener<ChangeEvent>>(),
  onEnter: eventProp(),
  onClear: eventProp(),
  onPrefixClick: eventProp<(event: MouseEvent) => void>(),
  onSuffixClick: eventProp<(event: MouseEvent) => void>(),
  onKeyDown: eventProp<(event: KeyboardEvent) => void>(),
  onKeyPress: eventProp<(event: KeyboardEvent) => void>(),
  onKeyUp: eventProp<(event: KeyboardEvent) => void>(),
  onCompositionStart: eventProp<(event: CompositionEvent) => void>(),
  onCompositionEnd: eventProp<(event: CompositionEvent) => void>(),
})

export type InputProps = ExtractPropTypes<typeof inputProps>
export type InputCProps = ConfigurableProps<InputProps>
