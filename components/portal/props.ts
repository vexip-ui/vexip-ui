import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const portalProps = buildProps({
  //
})

export type PortalProps = ExtractPropTypes<typeof portalProps>
export type PortalCProps = ConfigurableProps<PortalProps, 'viewer'>
