import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const overflowProps = buildProps({
  //
})

export type OverflowProps = ExtractPropTypes<typeof overflowProps>
export type OverflowCProps = ConfigurableProps<OverflowProps, 'viewer'>
