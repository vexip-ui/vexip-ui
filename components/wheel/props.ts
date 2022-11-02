import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const wheelProps = buildProps({
  //
})

export type WheelProps = ExtractPropTypes<typeof wheelProps>
export type WheelCProps = ConfigurableProps<WheelProps, 'viewer'>
