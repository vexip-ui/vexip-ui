import {
  booleanProp,
  booleanStringProp,
  buildProps,
  eventProp,
  iconProp,
  localeProp,
  sizeProp,
  stateProp
} from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps, EventListener, LocaleConfig } from '@vexip-ui/config'
import type { Placement } from '@vexip-ui/hooks'
import type { Dateable } from '@vexip-ui/utils'
import type {
  DatePickerChangeEvent,
  DatePickerFormatFn,
  DatePickerType,
  DateShortcut,
  DateShortcutsPlacement,
  DateTimeType,
  TimePickerChangeEvent,
  TimeShortcut,
  TimeShortcutsPlacement,
  TimeType
} from './symbol'

export interface DatePickerShortcutEvent {
  (name: string, value: Dateable | Dateable[]): void,
  (name: string, value: Dateable): void,
  (name: string, value: Dateable[]): void
}

export const datePickerProps = buildProps({
  size: sizeProp,
  state: stateProp,
  locale: Object as PropType<Partial<LocaleConfig['calendar'] & LocaleConfig['datePicker']>>,
  type: String as PropType<DatePickerType>,
  visible: booleanProp,
  placement: String as PropType<Placement>,
  transfer: booleanStringProp,
  value: [Number, String, Date, Array] as PropType<Dateable | Dateable[]>,
  format: String,
  valueFormat: [String, Array, Function] as PropType<string | string[] | DatePickerFormatFn>,
  filler: String,
  clearable: booleanProp,
  noAction: booleanProp,
  labels: Object as PropType<Partial<Record<DateTimeType, string>>>,
  dateSeparator: String,
  timeSeparator: String,
  shortcuts: Array as PropType<DateShortcut[]>,
  disabledDate: Function as PropType<(date: Date) => boolean>,
  steps: Array as PropType<number[]>,
  ctrlSteps: Array as PropType<number[]>,
  prefix: iconProp,
  prefixColor: String,
  suffix: iconProp,
  suffixColor: String,
  noSuffix: booleanProp,
  disabled: booleanProp,
  transitionName: String,
  confirmText: String,
  cancelText: String,
  today: [Number, String, Date] as PropType<Dateable>,
  range: booleanProp,
  loading: booleanProp,
  loadingIcon: iconProp,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  min: [Number, String, Date] as PropType<Dateable>,
  max: [Number, String, Date] as PropType<Dateable>,
  outsideClose: booleanProp,
  outsideCancel: booleanProp,
  placeholder: [String, Array] as PropType<string | string[]>,
  unitReadonly: booleanProp,
  weekStart: Number,
  popperAlive: booleanProp,
  shortcutsPlacement: String as PropType<DateShortcutsPlacement>,
  onInput: eventProp<(type: DateTimeType, value: number) => void>(),
  onPlus: eventProp<(type: DateTimeType, value: number) => void>(),
  onMinus: eventProp<(type: DateTimeType, value: number) => void>(),
  onEnter: eventProp(),
  onCancel: eventProp(),
  onChange: eventProp<EventListener<DatePickerChangeEvent>>(),
  onClear: eventProp(),
  onShortcut: eventProp<DatePickerShortcutEvent>(),
  onToggle: eventProp<(visible: boolean) => void>(),
  onFocus: eventProp(),
  onBlur: eventProp(),
  onChangeCol: eventProp<(type: DateTimeType | null, inputType: 'start' | 'end') => void>(),
  onClickOutside: eventProp(),
  onOutsideClose: eventProp()
})

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
export type DatePickerCProps = ConfigurableProps<DatePickerProps>

export interface TimePickerShortcutEvent {
  (name: string, value: string | string[]): void,
  (name: string, value: string): void,
  (name: string, value: string[]): void
}

export const timePickerProps = buildProps({
  size: sizeProp,
  state: stateProp,
  locale: localeProp('timePicker'),
  visible: booleanProp,
  placement: String as PropType<Placement>,
  transfer: booleanStringProp,
  format: String,
  separator: String,
  value: [String, Array] as PropType<string | string[]>,
  filler: String,
  clearable: booleanProp,
  noAction: booleanProp,
  noArrow: booleanProp,
  pointer: booleanProp,
  candidate: Number as PropType<0 | 1 | 2 | 3>,
  steps: Array as PropType<number[]>,
  labels: Object as PropType<Partial<Record<TimeType, string>>>,
  shortcuts: Array as PropType<TimeShortcut[]>,
  range: booleanProp,
  disabled: booleanProp,
  transitionName: String,
  confirmText: String,
  cancelText: String,
  ctrlSteps: Array as PropType<number[]>,
  prefix: iconProp,
  prefixColor: String,
  suffix: iconProp,
  suffixColor: String,
  noSuffix: booleanProp,
  exchange: booleanProp,
  loading: booleanProp,
  loadingIcon: iconProp,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  min: String,
  max: String,
  outsideClose: booleanProp,
  outsideCancel: booleanProp,
  unitReadonly: booleanProp,
  popperAlive: booleanProp,
  shortcutsPlacement: String as PropType<TimeShortcutsPlacement>,
  onInput: eventProp<(type: TimeType, value: number) => void>(),
  onPlus: eventProp<(type: TimeType, value: number) => void>(),
  onMinus: eventProp<(type: TimeType, value: number) => void>(),
  onEnter: eventProp(),
  onCancel: eventProp(),
  onChange: eventProp<EventListener<TimePickerChangeEvent>>(),
  onClear: eventProp(),
  onShortcut: eventProp<TimePickerShortcutEvent>(),
  onToggle: eventProp<(visible: boolean) => void>(),
  onFocus: eventProp(),
  onBlur: eventProp(),
  onChangeCol: eventProp<(type: TimeType | null, inputType: 'start' | 'end') => void>(),
  onClickOutside: eventProp(),
  onOutsideClose: eventProp(),
  placeholder: [String, Array] as PropType<string | string[]>
})

export type TimePickerProps = ExtractPropTypes<typeof timePickerProps>
export type TimePickerCProps = ConfigurableProps<TimePickerProps>
