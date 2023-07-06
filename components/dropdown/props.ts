import {
  booleanProp,
  booleanStringProp,
  buildProps,
  classProp,
  eventProp,
  wrapProps
} from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { Placement } from '@vexip-ui/hooks'
import type { DropdownTrigger } from './symbol'

export const dropdownProps = buildProps({
  visible: booleanProp,
  placement: String as PropType<Placement>,
  outsideClose: booleanProp,
  trigger: String as PropType<DropdownTrigger>,
  label: [String, Number],
  transitionName: String,
  transfer: booleanStringProp,
  dropClass: classProp,
  appear: booleanProp,
  meta: Object as PropType<Record<string, any>>,
  alive: booleanProp,
  custom: booleanProp,
  onToggle: eventProp<(visible: boolean) => void>(),
  onSelect: eventProp<(labels: (string | number)[], metas: Array<Record<string, any>>) => void>(),
  onClickOutside: eventProp(),
  onOutsideClose: eventProp()
})

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>
export type DropdownCProps = ConfigurableProps<DropdownProps>

export const dropdownItemProps = wrapProps({
  label: {
    type: [String, Number],
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  selected: {
    type: Boolean,
    default: false
  },
  divided: {
    type: Boolean,
    default: false
  },
  reference: {
    type: Boolean,
    default: false
  },
  meta: {
    type: Object,
    default: () => ({})
  },
  onSelect: eventProp<(label: string | number) => void>()
})

export type DropdownItemProps = ExtractPropTypes<typeof dropdownItemProps>
