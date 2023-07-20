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
import type { ConfigurableProps } from '@vexip-ui/config'
import type { Placement } from '@vexip-ui/hooks'
import type { TagType } from '@/components/tag'
import type { SelectFilter, SelectKeyConfig, SelectRawOption, SelectValue } from './symbol'

type SelectEvent =
  | ((value: string | number, data: any) => void)
  | ((value: string, data: any) => void)
  | ((value: number, data: any) => void)

type ChangeEvent =
  | ((value: SelectValue, data: any | any[]) => void)
  | ((value: string | number, data: any) => void)
  | ((value: string, data: any) => void)
  | ((value: number, data: any) => void)
  | ((values: (string | number)[], data: any[]) => void)
  | ((values: string[], data: any[]) => void)
  | ((values: number[], data: any[]) => void)

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
  value: valuesProp as PropType<SelectValue>,
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
  onFocus: eventProp<(event: FocusEvent) => void>(),
  onBlur: eventProp<(event: FocusEvent) => void>(),
  onToggle: eventProp<(visible: boolean) => void>(),
  onSelect: eventProp<SelectEvent>(),
  onCancel: eventProp<SelectEvent>(),
  onChange: eventProp<ChangeEvent>(),
  onClickOutside: eventProp(),
  onOutsideClose: eventProp(),
  onClear: eventProp(),
  onFilterInput: eventProp<(value: string) => void>()
})

export type SelectProps = ExtractPropTypes<typeof selectProps>
export type SelectCProps = ConfigurableProps<SelectProps>
