import { booleanProp, buildProps, eventProp, iconProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps, EventListener } from '@vexip-ui/config'
import type { ChangeEvent, TabNavAlign, TabNavOptions, TabNavPlacement } from './symbol'

export const tabNavProps = buildProps({
  active: [String, Number],
  card: booleanProp,
  options: Array as PropType<TabNavOptions[]>,
  align: String as PropType<TabNavAlign>,
  placement: String as PropType<TabNavPlacement>,
  closable: booleanProp,
  showAdd: booleanProp,
  onChange: eventProp<EventListener<ChangeEvent>>(),
  onAdd: eventProp(),
  onClose: eventProp<EventListener<ChangeEvent>>()
})

export type TabNavProps = ExtractPropTypes<typeof tabNavProps>
export type TabNavCProps = ConfigurableProps<TabNavProps>

export const tabNavItemProps = buildProps({
  label: [String, Number],
  disabled: booleanProp,
  icon: iconProp,
  closable: booleanProp,
  onToggle: eventProp<(active: boolean) => void>()
})

export type TabNavItemProps = ExtractPropTypes<typeof tabNavItemProps>
