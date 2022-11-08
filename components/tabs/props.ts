import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { TabNavAlign, TabNavPlacement } from '@/components/tab-nav'

export const tabsProps = buildProps({
  card: booleanProp,
  active: [String, Number],
  align: String as PropType<TabNavAlign>,
  placement: String as PropType<TabNavPlacement>,
  onChange: eventProp<(active: string | number) => void>()
})

export type TabsProps = ExtractPropTypes<typeof tabsProps>
export type TabsCProps = ConfigurableProps<TabsProps>
