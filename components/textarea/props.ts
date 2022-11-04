import { buildProps, booleanProp, stateProp, eventProp } from '@vexip-ui/config'

import type { ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const textareaProps = buildProps({
  state: stateProp,
  value: String,
  placeholder: String,
  rows: Number,
  noResize: booleanProp,
  autofocus: booleanProp,
  spellcheck: booleanProp,
  autocomplete: booleanProp,
  readonly: booleanProp,
  disabled: booleanProp,
  debounce: booleanProp,
  maxLength: Number,
  loading: booleanProp,
  loadingIcon: Object,
  loadingLock: booleanProp,
  loadingSpin: booleanProp,
  sync: booleanProp,
  onFocus: eventProp<(event: FocusEvent) => void>(),
  onBlur: eventProp<(event: FocusEvent) => void>(),
  onInput: eventProp<(value: string) => void>(),
  onChange: eventProp<(value: string) => void>(),
  onEnter: eventProp(),
  onKeyDown: eventProp<(event: KeyboardEvent) => void>(),
  onKeyPress: eventProp<(event: KeyboardEvent) => void>(),
  onKeyUp: eventProp<(event: KeyboardEvent) => void>()
})

export type TextareaProps = ExtractPropTypes<typeof textareaProps>
export type TextareaCProps = ConfigurableProps<TextareaProps>
