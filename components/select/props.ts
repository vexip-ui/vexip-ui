import {
  buildProps,
  booleanProp,
  booleanStringProp,
  sizeProp,
  stateProp,
  classProp,
  eventProp
} from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { Placement } from '@vexip-ui/hooks'
import type { TagType } from '@/components/tag'
import type { SelectKeyConfig, SelectRawOption, SelectValue, SelectOptionState } from './symbol'

export const selectProps = buildProps({
  size: sizeProp,
  state: stateProp,
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
  value: [String, Number, Array] as PropType<SelectValue>,
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
  loadingSpin: booleanProp,
  keyConfig: Object as PropType<SelectKeyConfig>,
  filter: {
    type: [Boolean, Function] as PropType<
      boolean | ((value: string | number, options: SelectOptionState) => boolean)
    >,
    default: null
  },
  ignoreCase: booleanProp,
  creatable: booleanProp,
  transparent: booleanProp,
  maxTagCount: Number,
  noRestTip: booleanProp,
  tagType: String as PropType<TagType>,
  onFocus: eventProp<(event: FocusEvent) => void>(),
  onBlur: eventProp<(event: FocusEvent) => void>(),
  onToggle: eventProp<(visible: boolean) => void>(),
  onSelect: eventProp<(value: string | number, data: SelectRawOption) => void>(),
  onCancel: eventProp<(value: string | number, data: SelectRawOption) => void>(),
  onChange: eventProp<(value: SelectValue, data: SelectRawOption | SelectRawOption[]) => void>(),
  onClickOutside: eventProp(),
  onOutsideClose: eventProp(),
  onClear: eventProp()
})

export type SelectProps = ExtractPropTypes<typeof selectProps>
export type SelectCProps = ConfigurableProps<SelectProps>
