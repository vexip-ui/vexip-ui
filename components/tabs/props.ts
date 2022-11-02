import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const tabsProps = buildProps({
  //
})

export type TabsProps = ExtractPropTypes<typeof tabsProps>
export type TabsCProps = ConfigurableProps<TabsProps, 'viewer'>
