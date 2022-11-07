import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { TabNavAlign, TabNavPlacement, TabNavOptions } from './symbol'

export const tabNavProps = buildProps({
  active: [String, Number],
  card: booleanProp,
  options: Array as PropType<TabNavOptions[]>,
  align: String as PropType<TabNavAlign>,
  placement: String as PropType<TabNavPlacement>,
  onChange: eventProp<(active: string | number) => void>()
})

export type TabNavProps = ExtractPropTypes<typeof tabNavProps>
export type TabNavCProps = ConfigurableProps<TabNavProps>
