import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const viewerProps = buildProps({
  //
})

export type ViewerProps = ExtractPropTypes<typeof viewerProps>
export type ViewerCProps = ConfigurableProps<ViewerProps, 'viewer'>
