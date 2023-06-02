import { booleanProp, buildProps, eventProp, wrapProps } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { TabNavAlign, TabNavOptions, TabNavPlacement } from './symbol'

type ChangeListener =
  | ((label: string | number) => void)
  | ((label: string) => void)
  | ((label: number) => void)

export const tabNavProps = buildProps({
  active: [String, Number],
  card: booleanProp,
  options: Array as PropType<TabNavOptions[]>,
  align: String as PropType<TabNavAlign>,
  placement: String as PropType<TabNavPlacement>,
  closable: booleanProp,
  showAdd: booleanProp,
  onChange: eventProp<ChangeListener>(),
  onAdd: eventProp(),
  onClose: eventProp<ChangeListener>()
})

export type TabNavProps = ExtractPropTypes<typeof tabNavProps>
export type TabNavCProps = ConfigurableProps<TabNavProps>

export const tabNavItemProps = wrapProps({
  label: {
    type: [String, Number],
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Object,
    default: null
  },
  closable: {
    type: Boolean,
    default: null
  },
  onToggle: eventProp<(active: boolean) => void>()
})

export type TabNavItemProps = ExtractPropTypes<typeof tabNavItemProps>
