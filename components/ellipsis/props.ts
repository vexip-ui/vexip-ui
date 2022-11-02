import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const ellipsisProps = buildProps({
  //
})

export type EllipsisProps = ExtractPropTypes<typeof ellipsisProps>
export type EllipsisCProps = ConfigurableProps<EllipsisProps, 'viewer'>
