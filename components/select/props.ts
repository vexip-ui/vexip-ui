import {
  booleanNumberProp,
  booleanProp,
  booleanStringProp,
  buildProps,
  classProp,
  eventProp,
  localeProp,
  sizeProp,
  stateProp,
  valuesProp
} from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps, EventListener } from '@vexip-ui/config'
import type { Placement } from '@vexip-ui/hooks'
import type { TagType } from '@/components/tag'
import type {
  ChangeEvent,
  SelectBaseValue,
  SelectEvent,
  SelectFilter,
  SelectKeyConfig,
  SelectRawOption
} from './symbol'

type CustomChangeEvent =
  | ChangeEvent
  | ((value: SelectBaseValue, data: any) => void)
  | ((value: string, data: any) => void)
  | ((value: number, data: any) => void)
  | ((value: boolean, data: any) => void)
  | ((values: SelectBaseValue[], data: any[]) => void)
  | ((values: string[], data: any[]) => void)
  | ((values: number[], data: any[]) => void)
  | ((value: boolean[], data: any) => void)

export const selectProps = buildProps({
  size: sizeProp,
  state: stateProp,
  locale: localeProp('select'),
  visible: booleanProp,
  options: Array as PropType<SelectRawOption[]>,
  disabled: booleanProp,
  transitionName: String,
  outsideClose: booleanProp,
  placeholder: String,
  prefix: Object,
  prefixColor: String,
  suffix: Object,
  suffixColor: String,
  noSuffix: booleanProp,
  value: valuesProp,
  multiple: booleanProp,
  clearable: booleanProp,
  maxListHeight: Number,
  listClass: classProp,
  placement: String as PropType<Placement>,
  transfer: booleanStringProp,
  optionCheck: booleanProp,
  emptyText: String,
  staticSuffix: booleanProp,
  loading: booleanProp,
  loadingIcon: Object,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  keyConfig: Object as PropType<SelectKeyConfig>,
  filter: {
    type: [Boolean, Function] as PropType<boolean | SelectFilter>,
    default: null
  },
  ignoreCase: booleanProp,
  creatable: booleanProp,
  transparent: booleanProp,
  maxTagCount: Number,
  noRestTip: booleanProp,
  tagType: String as PropType<TagType>,
  noPreview: booleanProp,
  remote: booleanProp,
  fitPopper: booleanNumberProp,
  name: String,
  popperAlive: booleanProp,
  countLimit: Number,
  onFocus: eventProp<(event: FocusEvent) => void>(),
  onBlur: eventProp<(event: FocusEvent) => void>(),
  onToggle: eventProp<(visible: boolean) => void>(),
  onSelect: eventProp<EventListener<SelectEvent>>(),
  onCancel: eventProp<EventListener<SelectEvent>>(),
  onChange: eventProp<CustomChangeEvent>(),
  onClickOutside: eventProp(),
  onOutsideClose: eventProp(),
  onClear: eventProp(),
  onFilterInput: eventProp<(value: string) => void>()
})

export type SelectProps = ExtractPropTypes<typeof selectProps>
export type SelectCProps = ConfigurableProps<SelectProps>
