import { booleanProp, buildProps, eventProp } from '@vexip-ui/config'

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
