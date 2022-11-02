import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const maskerProps = buildProps({
  //
})

export type MaskerProps = ExtractPropTypes<typeof maskerProps>
export type MaskerCProps = ConfigurableProps<MaskerProps, 'viewer'>
