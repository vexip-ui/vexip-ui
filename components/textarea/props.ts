import {
  booleanProp,
  booleanStringProp,
  buildProps,
  classProp,
  eventProp,
  iconProp,
  localeProp,
  stateProp,
} from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps } from '@vexip-ui/config'

export const textareaProps = buildProps({
  state: stateProp,
  locale: localeProp('input'),
  value: String,
  placeholder: String,
  rows: Number,
  noResize: booleanProp,
  autofocus: booleanProp,
  spellcheck: booleanProp,
  autocomplete: booleanStringProp,
  readonly: booleanProp,
  disabled: booleanProp,
  debounce: booleanProp,
  delay: Number,
  maxLength: Number,
  hideCount: booleanProp,
  loading: booleanProp,
  loadingIcon: iconProp,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  sync: booleanProp,
  controlClass: classProp,
  controlAttrs: Object as PropType<Record<string, any>>,
  name: String,
  onFocus: eventProp<(event: FocusEvent) => void>(),
  onBlur: eventProp<(event: FocusEvent) => void>(),
  onInput: eventProp<(value: string) => void>(),
  onChange: eventProp<(value: string) => void>(),
  onEnter: eventProp(),
  onKeyDown: eventProp<(event: KeyboardEvent) => void>(),
  onKeyPress: eventProp<(event: KeyboardEvent) => void>(),
  onKeyUp: eventProp<(event: KeyboardEvent) => void>(),
  onCompositionStart: eventProp<(event: CompositionEvent) => void>(),
  onCompositionEnd: eventProp<(event: CompositionEvent) => void>(),
})

export type TextareaProps = ExtractPropTypes<typeof textareaProps>
export type TextareaCProps = ConfigurableProps<TextareaProps>
