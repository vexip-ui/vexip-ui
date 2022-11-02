import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const tabNavProps = buildProps({
  //
})

export type TabNavProps = ExtractPropTypes<typeof tabNavProps>
export type TabNavCProps = ConfigurableProps<TabNavProps, 'viewer'>
